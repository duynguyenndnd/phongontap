/**
 * =====================================================================
 * DEEPGUARD AI ENTERPRISE - MEMORY & AUTHENTICATION ENGINE
 * MULTI-TIER STORAGE ARCHITECTURE: INDEXEDDB + LOCALSTORAGE + BACKUP
 * =====================================================================
 */

(function (window) {
  'use strict';

  const DB_NAME = 'DeepGuard_MemoryDB';
  const DB_VERSION = 1;
  const STORAGE_KEY_CURRENT_USER = 'dg_current_user_session';
  const STORAGE_KEY_GUEST_MEMORY = 'dg_guest_memory_vault';

  // Fallback memory structure for new accounts
  function createDefaultMemoryState(userId, username, fullName, avatar) {
    return {
      user_profile: {
        user_id: userId,
        username: username,
        full_name: fullName || username,
        avatar: avatar || '👨‍💻',
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
        streak_days: 1,
        last_active_date: new Date().toISOString().split('T')[0],
        total_study_time_seconds: 0,
        current_rank: 'Tập Sự Giám Định (Level 1)',
        level_exp: 0
      },
      progress_summary: {
        total_answered: 0,
        total_correct: 0,
        accuracy_rate: 0.0,
        modules: {
          socratic: 0,
          council: 0,
          cases: 0,
          flashcards_mastered: 0,
          code_audit: 0,
          progressive_l1: 0,
          progressive_l2: 0,
          progressive_l3: 0,
          quiz_trap: 0,
          exam_attempts: 0
        }
      },
      pillar_radar_scores: {
        dsp: 0.0,
        acoustics: 0.0,
        prosody: 0.0,
        onnx: 0.0,
        fusion: 0.0,
        security: 0.0
      },
      pillar_counts: {
        dsp: { total: 0, correct: 0 },
        acoustics: { total: 0, correct: 0 },
        prosody: { total: 0, correct: 0 },
        onnx: { total: 0, correct: 0 },
        fusion: { total: 0, correct: 0 },
        security: { total: 0, correct: 0 }
      },
      mistake_vault: [], // Array of { id, module, text, chosenOpt, correctOpt, explanation, attempts, lastAttempt, isResolved }
      attempts_history: [], // Recent 150 attempts
      certificates_earned: [] // Array of certificates
    };
  }

  // SHA-256 Hashing helper using Web Crypto API
  async function hashPassword(password, salt) {
    const text = (password + ':' + salt);
    if (window.crypto && window.crypto.subtle) {
      const msgBuffer = new TextEncoder().encode(text);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    // Fallback simple hash for older environments
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) - hash) + text.charCodeAt(i);
      hash |= 0;
    }
    return 'fallback_' + Math.abs(hash).toString(16);
  }

  function generateUUID() {
    return 'dg_u_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 9);
  }

  class DeepGuardMemoryEngine {
    constructor() {
      this.db = null;
      this.currentUser = null;
      this.currentMemory = null;
      this.authListeners = [];
      this.memoryListeners = [];
      this.studyTimer = null;
      this.init();
    }

    async init() {
      await this.initIndexedDB();
      this.restoreSession();
      this.startStudyTimer();
    }

    // Initialize IndexedDB with object stores for Users and Memory
    initIndexedDB() {
      return new Promise((resolve) => {
        if (!window.indexedDB) {
          console.warn('[MemoryEngine] IndexedDB not supported, falling back to LocalStorage.');
          resolve(false);
          return;
        }

        const request = window.indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains('users')) {
            const userStore = db.createObjectStore('users', { keyPath: 'user_id' });
            userStore.createIndex('username', 'username', { unique: true });
          }
          if (!db.objectStoreNames.contains('memory_vault')) {
            db.createObjectStore('memory_vault', { keyPath: 'user_id' });
          }
        };

        request.onsuccess = (e) => {
          this.db = e.target.result;
          resolve(true);
        };

        request.onerror = (e) => {
          console.error('[MemoryEngine] IndexedDB open error:', e);
          resolve(false);
        };
      });
    }

    // Restore login session from LocalStorage
    async restoreSession() {
      try {
        const sessionRaw = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
        if (sessionRaw) {
          const session = JSON.parse(sessionRaw);
          if (session && session.user_id) {
            const user = await this.getUserById(session.user_id);
            if (user) {
              this.currentUser = user;
              this.currentMemory = await this.getMemoryByUserId(user.user_id);
              this.updateStreak();
              this.notifyAuthChanged();
              this.notifyMemoryChanged();
              return;
            }
          }
        }
      } catch (err) {
        console.warn('[MemoryEngine] Session restore error:', err);
      }

      // Default to Guest Memory
      this.initGuestSession();
    }

    initGuestSession() {
      this.currentUser = {
        user_id: 'guest_user',
        username: 'guest',
        full_name: 'Học Viên Khách (Chưa Đăng Nhập)',
        avatar: '👤',
        is_guest: true
      };
      const guestRaw = localStorage.getItem(STORAGE_KEY_GUEST_MEMORY);
      if (guestRaw) {
        try {
          this.currentMemory = JSON.parse(guestRaw);
        } catch (e) {
          this.currentMemory = createDefaultMemoryState('guest_user', 'guest', 'Khách Thử Nghiệm', '👤');
        }
      } else {
        this.currentMemory = createDefaultMemoryState('guest_user', 'guest', 'Khách Thử Nghiệm', '👤');
      }
      this.updateStreak();
      this.notifyAuthChanged();
      this.notifyMemoryChanged();
    }

    // Authentication: Register
    async register(username, fullName, email, password, avatar = '👨‍💻') {
      const cleanUsername = username.trim().toLowerCase();
      if (!cleanUsername || cleanUsername.length < 3) {
        throw new Error('Tên đăng nhập phải có ít nhất 3 ký tự!');
      }
      if (!password || password.length < 6) {
        throw new Error('Mật khẩu bảo mật phải có tối thiểu 6 ký tự!');
      }

      const existing = await this.getUserByUsername(cleanUsername);
      if (existing) {
        throw new Error(`Tên đăng nhập "${cleanUsername}" đã được sử dụng. Vui lòng chọn tên khác!`);
      }

      const salt = Math.random().toString(36).substring(2, 10);
      const hash = await hashPassword(password, salt);
      const userId = generateUUID();

      const newUser = {
        user_id: userId,
        username: cleanUsername,
        full_name: fullName.trim() || cleanUsername,
        email: email.trim(),
        salt: salt,
        password_hash: hash,
        avatar: avatar,
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString()
      };

      // Create initial memory state
      let initialMemory = createDefaultMemoryState(userId, cleanUsername, newUser.full_name, avatar);

      // If guest has answered questions, inherit them into new account!
      if (this.currentMemory && this.currentMemory.progress_summary.total_answered > 0) {
        initialMemory.progress_summary = JSON.parse(JSON.stringify(this.currentMemory.progress_summary));
        initialMemory.pillar_radar_scores = JSON.parse(JSON.stringify(this.currentMemory.pillar_radar_scores));
        initialMemory.pillar_counts = JSON.parse(JSON.stringify(this.currentMemory.pillar_counts));
        initialMemory.mistake_vault = JSON.parse(JSON.stringify(this.currentMemory.mistake_vault));
        initialMemory.attempts_history = JSON.parse(JSON.stringify(this.currentMemory.attempts_history));
        initialMemory.certificates_earned = JSON.parse(JSON.stringify(this.currentMemory.certificates_earned));
      }

      await this.saveUser(newUser);
      await this.saveMemory(initialMemory);

      this.currentUser = newUser;
      this.currentMemory = initialMemory;
      localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify({ user_id: userId, username: cleanUsername }));

      this.notifyAuthChanged();
      this.notifyMemoryChanged();
      return newUser;
    }

    // Authentication: Login
    async login(username, password, rememberMe = true) {
      const cleanUsername = username.trim().toLowerCase();
      const user = await this.getUserByUsername(cleanUsername);
      if (!user) {
        throw new Error('Tài khoản không tồn tại trên hệ thống!');
      }

      const hash = await hashPassword(password, user.salt);
      if (hash !== user.password_hash) {
        throw new Error('Mật khẩu không chính xác. Vui lòng kiểm tra lại!');
      }

      user.last_login = new Date().toISOString();
      await this.saveUser(user);

      this.currentUser = user;
      this.currentMemory = await this.getMemoryByUserId(user.user_id) || createDefaultMemoryState(user.user_id, user.username, user.full_name, user.avatar);
      
      this.updateStreak();

      if (rememberMe) {
        localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify({ user_id: user.user_id, username: user.username }));
      } else {
        sessionStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify({ user_id: user.user_id, username: user.username }));
      }

      this.notifyAuthChanged();
      this.notifyMemoryChanged();
      return user;
    }

    // Authentication: Logout
    logout() {
      localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
      sessionStorage.removeItem(STORAGE_KEY_CURRENT_USER);
      this.initGuestSession();
    }

    // Update Profile details
    async updateProfile(updates) {
      if (!this.currentUser || this.currentUser.is_guest) {
        throw new Error('Vui lòng đăng nhập để thay đổi thông tin cá nhân!');
      }

      if (updates.full_name) {
        this.currentUser.full_name = updates.full_name.trim();
        this.currentMemory.user_profile.full_name = this.currentUser.full_name;
      }
      if (updates.avatar) {
        this.currentUser.avatar = updates.avatar;
        this.currentMemory.user_profile.avatar = updates.avatar;
      }
      if (updates.new_password) {
        const salt = Math.random().toString(36).substring(2, 10);
        this.currentUser.salt = salt;
        this.currentUser.password_hash = await hashPassword(updates.new_password, salt);
      }

      await this.saveUser(this.currentUser);
      await this.saveMemory(this.currentMemory);

      this.notifyAuthChanged();
      this.notifyMemoryChanged();
      return this.currentUser;
    }

    // ===================================================================
    // CORE MEMORY LOGGING & ADAPTIVE TRACKING
    // ===================================================================
    async logQuestionAttempt(data) {
      if (!this.currentMemory) return;

      const {
        questionId,
        module, // e.g. 'quiz-trap', 'progressive-l1', 'cases', 'code-audit', 'socratic', 'exam'
        pillar, // 'dsp', 'acoustics', 'prosody', 'onnx', 'fusion', 'security'
        questionText,
        chosenAnswer,
        correctAnswer,
        isCorrect,
        explanation
      } = data;

      const mem = this.currentMemory;
      mem.progress_summary.total_answered++;
      if (isCorrect) {
        mem.progress_summary.total_correct++;
        mem.user_profile.level_exp += 15;
      } else {
        mem.user_profile.level_exp += 3;
      }

      // Update accuracy
      mem.progress_summary.accuracy_rate = parseFloat(
        ((mem.progress_summary.total_correct / mem.progress_summary.total_answered) * 100).toFixed(1)
      );

      // Update rank title based on EXP
      const exp = mem.user_profile.level_exp;
      if (exp > 2500) mem.user_profile.current_rank = 'Giám Định Viên Trưởng Cấp Cao (Level 5)';
      else if (exp > 1500) mem.user_profile.current_rank = 'Chuyên Viên Giám Định Bậc 4 (Level 4)';
      else if (exp > 800) mem.user_profile.current_rank = 'Chuyên Viên Giám Định Bậc 3 (Level 3)';
      else if (exp > 300) mem.user_profile.current_rank = 'Kỹ Thuật Viên Giám Định (Level 2)';
      else mem.user_profile.current_rank = 'Tập Sự Giám Định (Level 1)';

      // Update module counter
      if (module && mem.progress_summary.modules[module] !== undefined) {
        mem.progress_summary.modules[module]++;
      }

      // Update Pillar Radar Scores
      if (pillar && mem.pillar_counts[pillar]) {
        mem.pillar_counts[pillar].total++;
        if (isCorrect) mem.pillar_counts[pillar].correct++;
        const pTotal = mem.pillar_counts[pillar].total;
        const pCorr = mem.pillar_counts[pillar].correct;
        mem.pillar_radar_scores[pillar] = parseFloat(((pCorr / pTotal) * 100).toFixed(1));
      }

      // Update Mistake Vault
      const nowIso = new Date().toISOString();
      const existingMistakeIdx = mem.mistake_vault.findIndex(m => m.id === questionId);

      if (!isCorrect) {
        if (existingMistakeIdx !== -1) {
          mem.mistake_vault[existingMistakeIdx].attempts++;
          mem.mistake_vault[existingMistakeIdx].lastSelectedOpt = chosenAnswer;
          mem.mistake_vault[existingMistakeIdx].lastAttempt = nowIso;
          mem.mistake_vault[existingMistakeIdx].isResolved = false;
        } else {
          mem.mistake_vault.push({
            id: questionId,
            module: module || 'general',
            pillar: pillar || 'dsp',
            text: questionText,
            chosenOpt: chosenAnswer,
            correctOpt: correctAnswer,
            explanation: explanation || '',
            attempts: 1,
            lastAttempt: nowIso,
            isResolved: false
          });
        }
      } else {
        // If answered correctly and was in mistake vault, mark resolved!
        if (existingMistakeIdx !== -1) {
          mem.mistake_vault[existingMistakeIdx].isResolved = true;
          mem.mistake_vault[existingMistakeIdx].resolvedAt = nowIso;
        }
      }

      // Log to recent attempts history (limit to 150 entries)
      mem.attempts_history.unshift({
        questionId,
        module,
        pillar,
        isCorrect,
        timestamp: nowIso
      });
      if (mem.attempts_history.length > 150) {
        mem.attempts_history.pop();
      }

      await this.saveMemory(mem);
      this.notifyMemoryChanged();
    }

    // Save earned Certificate
    async saveCertificate(certData) {
      if (!this.currentMemory) return;
      this.currentMemory.certificates_earned.push({
        cert_id: certData.certId || ('DG-CERT-' + Date.now().toString().slice(-8)),
        title: certData.title || 'DeepGuard Certified Forensic Engineer (Level 3)',
        candidate_name: certData.candidateName || this.currentUser.full_name,
        score: certData.score || '9.0 / 10',
        issued_at: new Date().toISOString(),
        verification_hash: certData.hash || ('mock_hash_' + Math.random().toString(36).substring(2, 10))
      });
      await this.saveMemory(this.currentMemory);
      this.notifyMemoryChanged();
    }

    // Streak tracker (calculates continuous study days)
    updateStreak() {
      if (!this.currentMemory) return;
      const prof = this.currentMemory.user_profile;
      const today = new Date().toISOString().split('T')[0];
      const lastActive = prof.last_active_date;

      if (!lastActive) {
        prof.last_active_date = today;
        prof.streak_days = 1;
        return;
      }

      if (lastActive === today) {
        return; // Already counted today
      }

      const lastDate = new Date(lastActive);
      const curDate = new Date(today);
      const diffDays = Math.round((curDate - lastDate) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        prof.streak_days = (prof.streak_days || 1) + 1;
      } else if (diffDays > 1) {
        prof.streak_days = 1; // Streak reset if missed a day
      }
      prof.last_active_date = today;
      this.saveMemory(this.currentMemory);
    }

    startStudyTimer() {
      if (this.studyTimer) clearInterval(this.studyTimer);
      this.studyTimer = setInterval(() => {
        if (this.currentMemory && document.visibilityState === 'visible') {
          this.currentMemory.user_profile.total_study_time_seconds += 10;
          // Silently persist every 30 seconds
          if (this.currentMemory.user_profile.total_study_time_seconds % 30 === 0) {
            this.saveMemory(this.currentMemory);
          }
        }
      }, 10000);
      if (this.studyTimer && this.studyTimer.unref) {
        this.studyTimer.unref();
      }
    }

    // ===================================================================
    // PORTABLE MEMORY BACKUP & RESTORE (.dgmem / JSON)
    // ===================================================================
    exportMemoryBackup() {
      if (!this.currentMemory) return null;
      const payload = {
        app_name: 'DeepGuard AI Enterprise',
        schema_version: '2.0',
        exported_at: new Date().toISOString(),
        user_id: this.currentUser ? this.currentUser.user_id : 'guest',
        username: this.currentUser ? this.currentUser.username : 'guest',
        memory_state: this.currentMemory
      };
      return JSON.stringify(payload, null, 2);
    }

    async importMemoryBackup(jsonString) {
      try {
        const parsed = JSON.parse(jsonString);
        if (!parsed.memory_state || !parsed.memory_state.progress_summary) {
          throw new Error('Tệp thẻ nhớ không đúng định dạng DeepGuard Memory (.dgmem)!');
        }

        const imported = parsed.memory_state;
        if (this.currentUser && !this.currentUser.is_guest) {
          imported.user_profile.user_id = this.currentUser.user_id;
          imported.user_profile.username = this.currentUser.username;
          imported.user_profile.full_name = this.currentUser.full_name;
        }

        this.currentMemory = imported;
        await this.saveMemory(this.currentMemory);
        this.notifyMemoryChanged();
        return true;
      } catch (err) {
        console.error('[MemoryEngine] Import error:', err);
        throw err;
      }
    }

    // ===================================================================
    // INDEXEDDB & LOCALSTORAGE PERSISTENCE HELPERS
    // ===================================================================
    saveUser(user) {
      return new Promise((resolve) => {
        if (this.db) {
          try {
            const tx = this.db.transaction('users', 'readwrite');
            const store = tx.objectStore('users');
            store.put(user);
            tx.oncomplete = () => resolve(true);
            tx.onerror = () => {
              this.saveUserFallback(user);
              resolve(true);
            };
            return;
          } catch (e) {
            console.warn('[MemoryEngine] IDB User save error:', e);
          }
        }
        this.saveUserFallback(user);
        resolve(true);
      });
    }

    saveUserFallback(user) {
      try {
        const users = JSON.parse(localStorage.getItem('dg_users_store') || '{}');
        users[user.user_id] = user;
        localStorage.setItem('dg_users_store', JSON.stringify(users));
      } catch (e) {
        console.warn('Fallback save error:', e);
      }
    }

    getUserById(userId) {
      return new Promise((resolve) => {
        if (this.db) {
          try {
            const tx = this.db.transaction('users', 'readonly');
            const store = tx.objectStore('users');
            const req = store.get(userId);
            req.onsuccess = () => resolve(req.result || null);
            req.onerror = () => resolve(this.getUserByIdFallback(userId));
            return;
          } catch (e) {}
        }
        resolve(this.getUserByIdFallback(userId));
      });
    }

    getUserByIdFallback(userId) {
      try {
        const users = JSON.parse(localStorage.getItem('dg_users_store') || '{}');
        return users[userId] || null;
      } catch (e) {
        return null;
      }
    }

    getUserByUsername(username) {
      return new Promise((resolve) => {
        const clean = username.trim().toLowerCase();
        if (this.db) {
          try {
            const tx = this.db.transaction('users', 'readonly');
            const store = tx.objectStore('users');
            const index = store.index('username');
            const req = index.get(clean);
            req.onsuccess = () => resolve(req.result || null);
            req.onerror = () => resolve(this.getUserByUsernameFallback(clean));
            return;
          } catch (e) {}
        }
        resolve(this.getUserByUsernameFallback(clean));
      });
    }

    getUserByUsernameFallback(username) {
      try {
        const users = JSON.parse(localStorage.getItem('dg_users_store') || '{}');
        for (const k in users) {
          if (users[k].username === username) return users[k];
        }
      } catch (e) {}
      return null;
    }

    saveMemory(mem) {
      return new Promise((resolve) => {
        if (mem.user_profile.user_id === 'guest_user') {
          localStorage.setItem(STORAGE_KEY_GUEST_MEMORY, JSON.stringify(mem));
          resolve(true);
          return;
        }

        if (this.db) {
          try {
            const tx = this.db.transaction('memory_vault', 'readwrite');
            const store = tx.objectStore('memory_vault');
            store.put(mem);
            tx.oncomplete = () => resolve(true);
            tx.onerror = () => {
              this.saveMemoryFallback(mem);
              resolve(true);
            };
            return;
          } catch (e) {}
        }
        this.saveMemoryFallback(mem);
        resolve(true);
      });
    }

    saveMemoryFallback(mem) {
      try {
        const memories = JSON.parse(localStorage.getItem('dg_memory_store') || '{}');
        memories[mem.user_profile.user_id] = mem;
        localStorage.setItem('dg_memory_store', JSON.stringify(memories));
      } catch (e) {}
    }

    getMemoryByUserId(userId) {
      return new Promise((resolve) => {
        if (userId === 'guest_user') {
          const guestRaw = localStorage.getItem(STORAGE_KEY_GUEST_MEMORY);
          resolve(guestRaw ? JSON.parse(guestRaw) : null);
          return;
        }

        if (this.db) {
          try {
            const tx = this.db.transaction('memory_vault', 'readonly');
            const store = tx.objectStore('memory_vault');
            const req = store.get(userId);
            req.onsuccess = () => resolve(req.result || null);
            req.onerror = () => resolve(this.getMemoryFallback(userId));
            return;
          } catch (e) {}
        }
        resolve(this.getMemoryFallback(userId));
      });
    }

    getMemoryFallback(userId) {
      try {
        const memories = JSON.parse(localStorage.getItem('dg_memory_store') || '{}');
        return memories[userId] || null;
      } catch (e) {
        return null;
      }
    }

    // Listeners for UI updates
    onAuthStateChanged(fn) {
      this.authListeners.push(fn);
      if (this.currentUser) fn(this.currentUser);
    }

    notifyAuthChanged() {
      this.authListeners.forEach(fn => {
        try { fn(this.currentUser); } catch (e) { console.error(e); }
      });
    }

    onMemoryUpdated(fn) {
      this.memoryListeners.push(fn);
      if (this.currentMemory) fn(this.currentMemory);
    }

    notifyMemoryChanged() {
      this.memoryListeners.forEach(fn => {
        try { fn(this.currentMemory); } catch (e) { console.error(e); }
      });
    }
  }

  // Expose global instance and class
  window.DeepGuardMemoryEngine = DeepGuardMemoryEngine;
  window.DeepGuardMemory = new DeepGuardMemoryEngine();

})(window);
