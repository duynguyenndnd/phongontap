/**
 * DEEPGUARD AI ENTERPRISE - ADMIN PORTAL UI
 * Bảng điều khiển Quản trị viên kiểm soát tài khoản, trạng thái đăng nhập và bộ nhớ học tập
 */

(function(window) {
  'use strict';

  let isAuthed = sessionStorage.getItem('dg_admin_authed') === 'true';
  let cachedUsers = [];
  let userMemories = {};

  function initAdminPortal() {
    renderAdminPortal();

    // Re-render when memory updates or auth changes
    if (window.DeepGuardMemory) {
      window.DeepGuardMemory.onAuthStateChanged(() => {
        if (isAuthed) refreshAdminData();
      });
      window.DeepGuardMemory.onMemoryUpdated(() => {
        if (isAuthed) refreshAdminData();
      });
    }

    // Attach listener for tab switch if present
    document.querySelectorAll('[data-tab="admin-portal"]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (isAuthed) {
          refreshAdminData();
        } else {
          renderPinScreen();
        }
      });
    });
  }

  function getContainer() {
    return document.getElementById('admin-portal');
  }

  function renderPinScreen() {
    const container = getContainer();
    if (!container) return;

    container.innerHTML = `
      <div class="admin-auth-card">
        <div class="admin-auth-icon">🛡️</div>
        <h2>BẢNG QUẢN TRỊ HỆ THỐNG DEEPGUARD</h2>
        <p class="admin-auth-desc">Khu vực kiểm soát tài khoản học viên, quản lý quyền truy cập và giám sát tiến độ ôn tập.</p>
        
        <div class="admin-pin-form">
          <label for="admin-pin-input">Mã PIN Quản Trị Viên (Mặc định: <code>admin2026</code>)</label>
          <div class="pin-input-group">
            <input type="password" id="admin-pin-input" placeholder="Nhập mã PIN Admin..." autocomplete="off">
            <button class="btn btn-primary" id="btn-admin-verify-pin">
              <span>Xác Thực Admin</span> ⚡
            </button>
          </div>
          <div id="admin-pin-error" class="admin-error-text" style="display:none;"></div>
          <div class="admin-pin-hint">
            💡 Gợi ý: Bạn có thể đổi mã PIN này sau khi đăng nhập vào bảng quản trị.
          </div>
        </div>
      </div>
    `;

    const input = document.getElementById('admin-pin-input');
    const verifyBtn = document.getElementById('btn-admin-verify-pin');
    const errorEl = document.getElementById('admin-pin-error');

    function doVerify() {
      const pin = input.value;
      if (window.DeepGuardMemory.verifyAdminKey(pin)) {
        isAuthed = true;
        sessionStorage.setItem('dg_admin_authed', 'true');
        renderAdminDashboard();
      } else {
        errorEl.textContent = '❌ Mã PIN không chính xác. Vui lòng thử lại!';
        errorEl.style.display = 'block';
        input.classList.add('input-shake');
        setTimeout(() => input.classList.remove('input-shake'), 400);
      }
    }

    verifyBtn.addEventListener('click', doVerify);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') doVerify();
    });
    input.focus();
  }

  async function renderAdminDashboard() {
    const container = getContainer();
    if (!container) return;

    container.innerHTML = `
      <div class="admin-dashboard-wrapper">
        <!-- Top Action Bar -->
        <div class="admin-header-bar">
          <div class="admin-title-group">
            <h2>🛡️ QUẢN TRỊ TRUNG TÂM DEEPGUARD</h2>
            <span class="admin-badge-live">● ADMIN CONSOLE ACTIVE</span>
          </div>
          <div class="admin-header-actions">
            <button class="btn btn-secondary btn-sm" id="btn-admin-create-user">➕ Thêm Tài Khoản</button>
            <button class="btn btn-secondary btn-sm" id="btn-admin-change-pin">🔑 Đổi Mã PIN</button>
            <button class="btn btn-secondary btn-sm" id="btn-admin-export-data">📥 Xuất Báo Cáo JSON</button>
            <button class="btn btn-secondary btn-sm btn-danger-soft" id="btn-admin-lock-session">🔒 Khóa Phiên</button>
          </div>
        </div>

        <!-- KPI Metrics Cards -->
        <div class="admin-kpi-grid">
          <div class="admin-kpi-card">
            <div class="kpi-icon">👥</div>
            <div class="kpi-info">
              <span class="kpi-label">Tổng Tài Khoản</span>
              <span class="kpi-value" id="kpi-total-users">0</span>
            </div>
          </div>
          <div class="admin-kpi-card kpi-success">
            <div class="kpi-icon">🟢</div>
            <div class="kpi-info">
              <span class="kpi-label">Đang Hoạt Động</span>
              <span class="kpi-value" id="kpi-active-users">0</span>
            </div>
          </div>
          <div class="admin-kpi-card kpi-warning">
            <div class="kpi-icon">⛔</div>
            <div class="kpi-info">
              <span class="kpi-label">Đang Bị Khóa</span>
              <span class="kpi-value" id="kpi-locked-users">0</span>
            </div>
          </div>
          <div class="admin-kpi-card kpi-cyan">
            <div class="kpi-icon">📝</div>
            <div class="kpi-info">
              <span class="kpi-label">Câu Hỏi Đã Làm</span>
              <span class="kpi-value" id="kpi-total-answers">0</span>
            </div>
          </div>
          <div class="admin-kpi-card kpi-purple">
            <div class="kpi-icon">🎖️</div>
            <div class="kpi-info">
              <span class="kpi-label">Chứng Chỉ DCFE Đã Cấp</span>
              <span class="kpi-value" id="kpi-total-certs">0</span>
            </div>
          </div>
        </div>

        <!-- Control Bar: Search and Filter -->
        <div class="admin-control-bar">
          <div class="admin-search-box">
            <span class="search-icon">🔍</span>
            <input type="text" id="admin-user-search" placeholder="Tìm theo tên đăng nhập, họ tên hoặc email...">
          </div>
          <div class="admin-filter-group">
            <label>Trạng Thái:</label>
            <select id="admin-status-filter">
              <option value="all">Tất Cả</option>
              <option value="active">Đang Hoạt Động (🟢)</option>
              <option value="locked">Bị Khóa (⛔)</option>
            </select>
          </div>
          <button class="btn btn-secondary btn-sm" id="btn-admin-refresh">🔄 Làm Mới</button>
        </div>

        <!-- Users Table -->
        <div class="admin-table-card">
          <div class="admin-table-responsive">
            <table class="admin-table" id="admin-users-table">
              <thead>
                <tr>
                  <th>Tài Khoản / Học Viên</th>
                  <th>Email</th>
                  <th>Vai Trò</th>
                  <th>Ngày Đăng Ký</th>
                  <th>Lần Đăng Nhập Cuối</th>
                  <th>Tiến Độ Ôn Tập</th>
                  <th>Trạng Thái</th>
                  <th>Thao Tác Quản Trị</th>
                </tr>
              </thead>
              <tbody id="admin-users-tbody">
                <tr><td colspan="8" class="text-center py-4">Đang tải dữ liệu học viên...</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    // Wire top header buttons
    document.getElementById('btn-admin-lock-session').addEventListener('click', () => {
      isAuthed = false;
      sessionStorage.removeItem('dg_admin_authed');
      renderPinScreen();
    });

    document.getElementById('btn-admin-refresh').addEventListener('click', refreshAdminData);
    document.getElementById('btn-admin-create-user').addEventListener('click', showCreateUserModal);
    document.getElementById('btn-admin-change-pin').addEventListener('click', showChangePinModal);
    document.getElementById('btn-admin-export-data').addEventListener('click', exportFullDatabase);

    document.getElementById('admin-user-search').addEventListener('input', filterAndRenderTable);
    document.getElementById('admin-status-filter').addEventListener('change', filterAndRenderTable);

    await refreshAdminData();
  }

  async function refreshAdminData() {
    if (!window.DeepGuardMemory) return;
    try {
      cachedUsers = await window.DeepGuardMemory.getAllUsers();
      userMemories = {};

      let totalAnswers = 0;
      let totalCerts = 0;

      for (const u of cachedUsers) {
        const mem = await window.DeepGuardMemory.getMemoryByUserId(u.user_id);
        userMemories[u.user_id] = mem;
        if (mem && mem.progress_summary) {
          totalAnswers += mem.progress_summary.total_answered || 0;
          totalCerts += (mem.certificates_earned || []).length;
        }
      }

      // Update KPI Numbers
      const totalUsersEl = document.getElementById('kpi-total-users');
      const activeUsersEl = document.getElementById('kpi-active-users');
      const lockedUsersEl = document.getElementById('kpi-locked-users');
      const answersEl = document.getElementById('kpi-total-answers');
      const certsEl = document.getElementById('kpi-total-certs');

      if (totalUsersEl) totalUsersEl.textContent = cachedUsers.length;
      if (activeUsersEl) activeUsersEl.textContent = cachedUsers.filter(u => u.status !== 'locked').length;
      if (lockedUsersEl) lockedUsersEl.textContent = cachedUsers.filter(u => u.status === 'locked').length;
      if (answersEl) answersEl.textContent = totalAnswers.toLocaleString();
      if (certsEl) certsEl.textContent = totalCerts;

      filterAndRenderTable();
    } catch (e) {
      console.error('Error refreshing admin data:', e);
    }
  }

  function filterAndRenderTable() {
    const tbody = document.getElementById('admin-users-tbody');
    if (!tbody) return;

    const searchTerm = (document.getElementById('admin-user-search')?.value || '').toLowerCase().trim();
    const statusFilter = document.getElementById('admin-status-filter')?.value || 'all';

    let filtered = cachedUsers.filter(u => {
      const matchSearch = (u.username || '').toLowerCase().includes(searchTerm) ||
                          (u.full_name || '').toLowerCase().includes(searchTerm) ||
                          (u.email || '').toLowerCase().includes(searchTerm);
      const isLocked = u.status === 'locked';
      const matchStatus = statusFilter === 'all' ||
                          (statusFilter === 'active' && !isLocked) ||
                          (statusFilter === 'locked' && isLocked);
      return matchSearch && matchStatus;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center py-6 text-muted">
            🔍 Không tìm thấy tài khoản nào khớp với bộ lọc.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(u => {
      const isLocked = u.status === 'locked';
      const mem = userMemories[u.user_id] || null;
      const answered = mem?.progress_summary?.total_answered || 0;
      const accuracy = mem?.progress_summary?.accuracy_rate || 0;
      const level = mem?.user_profile?.level || 1;
      const rank = mem?.user_profile?.rank || 'Newbie';
      const certCount = (mem?.certificates_earned || []).length;

      const createdDate = u.created_at ? new Date(u.created_at).toLocaleDateString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }) : 'N/A';
      const lastLoginDate = u.last_login ? new Date(u.last_login).toLocaleDateString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }) : 'Chưa đăng nhập';

      return `
        <tr class="${isLocked ? 'row-locked' : ''}">
          <td>
            <div class="user-cell">
              <span class="user-avatar-badge">${u.avatar || '🛡️'}</span>
              <div class="user-cell-meta">
                <span class="user-name">${escapeHtml(u.full_name || u.username)}</span>
                <span class="user-username">@${escapeHtml(u.username)}</span>
              </div>
            </div>
          </td>
          <td>
            <span class="user-email">${escapeHtml(u.email || 'Chưa cung cấp')}</span>
          </td>
          <td>
            <span class="badge-role ${u.role === 'admin' ? 'role-admin' : 'role-student'}">
              ${u.role === 'admin' ? '🛡️ Quản trị' : '🎓 Học viên'}
            </span>
          </td>
          <td><span class="cell-time">${createdDate}</span></td>
          <td><span class="cell-time">${lastLoginDate}</span></td>
          <td>
            <div class="progress-cell">
              <span class="progress-level">Lv.${level} - ${escapeHtml(rank)}</span>
              <span class="progress-stats">${answered} câu (${accuracy}% đúng)${certCount > 0 ? ` • 🎖️x${certCount}` : ''}</span>
            </div>
          </td>
          <td>
            <span class="status-badge ${isLocked ? 'status-locked' : 'status-active'}">
              ${isLocked ? '⛔ ĐÃ KHÓA' : '🟢 HOẠT ĐỘNG'}
            </span>
          </td>
          <td>
            <div class="admin-row-actions">
              <button class="btn-action-icon btn-inspect" title="Soi Bộ Nhớ Học Viên" data-user-id="${u.user_id}">
                👁️
              </button>
              <button class="btn-action-icon ${isLocked ? 'btn-unlock' : 'btn-lock'}" title="${isLocked ? 'Mở Khóa Tài Khoản' : 'Khóa Tài Khoản'}" data-user-id="${u.user_id}" data-action="${isLocked ? 'unlock' : 'lock'}">
                ${isLocked ? '🔓' : '🔒'}
              </button>
              <button class="btn-action-icon btn-reset-pw" title="Đặt Lại Mật Khẩu" data-user-id="${u.user_id}" data-username="${escapeHtml(u.username)}">
                🔑
              </button>
              <button class="btn-action-icon btn-delete" title="Xóa Tài Khoản" data-user-id="${u.user_id}" data-username="${escapeHtml(u.username)}">
                🗑️
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Attach actions
    tbody.querySelectorAll('.btn-inspect').forEach(btn => {
      btn.addEventListener('click', () => showUserMemoryModal(btn.dataset.userId));
    });

    tbody.querySelectorAll('.btn-lock, .btn-unlock').forEach(btn => {
      btn.addEventListener('click', async () => {
        const userId = btn.dataset.userId;
        const action = btn.dataset.action;
        const newStatus = action === 'lock' ? 'locked' : 'active';
        const confirmMsg = action === 'lock'
          ? 'Bạn có chắc chắn muốn KHÓA tài khoản này? Người dùng sẽ không thể đăng nhập.'
          : 'Bạn có chắc chắn muốn MỞ KHÓA cho tài khoản này?';
        if (confirm(confirmMsg)) {
          await window.DeepGuardMemory.adminSetUserStatus(userId, newStatus);
          await refreshAdminData();
        }
      });
    });

    tbody.querySelectorAll('.btn-reset-pw').forEach(btn => {
      btn.addEventListener('click', async () => {
        const userId = btn.dataset.userId;
        const username = btn.dataset.username;
        const newPw = prompt(`Nhập mật khẩu mới cho tài khoản @${username} (tối thiểu 6 ký tự):`);
        if (newPw !== null) {
          if (newPw.length < 6) {
            alert('Mật khẩu mới phải có ít nhất 6 ký tự!');
            return;
          }
          try {
            await window.DeepGuardMemory.adminResetPassword(userId, newPw);
            alert(`Đã đặt lại mật khẩu cho @${username} thành công!`);
          } catch (e) {
            alert('Lỗi: ' + e.message);
          }
        }
      });
    });

    tbody.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', async () => {
        const userId = btn.dataset.userId;
        const username = btn.dataset.username;
        if (confirm(`⚠️ CẢNH BÁO NGUY HIỂM: Bạn có chắc chắn muốn xóa vĩnh viễn tài khoản @${username} và toàn bộ bộ nhớ của tài khoản này không? Thao tác không thể hoàn tác!`)) {
          try {
            await window.DeepGuardMemory.adminDeleteUser(userId);
            alert(`Đã xóa tài khoản @${username}!`);
            await refreshAdminData();
          } catch (e) {
            alert('Lỗi: ' + e.message);
          }
        }
      });
    });
  }

  // Inspect Modal: Show deep learning metrics of a user
  async function showUserMemoryModal(userId) {
    const user = cachedUsers.find(u => u.user_id === userId);
    if (!user) return;
    const mem = userMemories[userId] || await window.DeepGuardMemory.getMemoryByUserId(userId);

    const modalId = 'admin-user-inspect-modal';
    let modal = document.getElementById(modalId);
    if (!modal) {
      modal = document.createElement('div');
      modal.id = modalId;
      modal.className = 'auth-modal-overlay';
      document.body.appendChild(modal);
    }

    const mistakes = mem?.mistake_vault || [];
    const certs = mem?.certificates_earned || [];
    const scores = mem?.pillar_radar_scores || {
      traffic_analysis: 0,
      protocol_decoding: 0,
      threat_detection: 0,
      tls_crypto: 0,
      incident_response: 0,
      forensic_audit: 0
    };

    modal.innerHTML = `
      <div class="auth-modal-dialog admin-inspect-dialog">
        <button class="modal-close-btn" id="btn-close-inspect">&times;</button>
        <div class="admin-inspect-header">
          <span class="user-avatar-large">${user.avatar || '🛡️'}</span>
          <div>
            <h3>Hồ Sơ Năng Lực: ${escapeHtml(user.full_name || user.username)}</h3>
            <p class="text-muted">@${escapeHtml(user.username)} • ID: <code>${user.user_id}</code></p>
          </div>
        </div>

        <div class="admin-inspect-body">
          <div class="inspect-stats-grid">
            <div class="inspect-stat-item">
              <span class="stat-num">${mem?.progress_summary?.total_answered || 0}</span>
              <span class="stat-desc">Tổng Câu Đã Làm</span>
            </div>
            <div class="inspect-stat-item">
              <span class="stat-num">${mem?.progress_summary?.accuracy_rate || 0}%</span>
              <span class="stat-desc">Độ Chính Xác</span>
            </div>
            <div class="inspect-stat-item">
              <span class="stat-num">${mistakes.length}</span>
              <span class="stat-desc">Lỗi Trong Mistake Vault</span>
            </div>
            <div class="inspect-stat-item">
              <span class="stat-num">${certs.length}</span>
              <span class="stat-desc">Chứng Chỉ Đã Đạt</span>
            </div>
          </div>

          <h4 class="mt-4 mb-2">📊 Điểm Đánh Giá 6 Trụ Cột Năng Lực</h4>
          <div class="pillar-score-bars">
            ${renderPillarBar('Phân Tích Băng Thông (Traffic)', scores.traffic_analysis)}
            ${renderPillarBar('Giải Mã Giao Thức (Protocols)', scores.protocol_decoding)}
            ${renderPillarBar('Phát Hiện Đe Dọa (Threats)', scores.threat_detection)}
            ${renderPillarBar('Mã Hóa & Bảo Mật TLS (Crypto)', scores.tls_crypto)}
            ${renderPillarBar('Phản Ứng Sự Cố (Incident)', scores.incident_response)}
            ${renderPillarBar('Kiểm Định Forensic (Audit)', scores.forensic_audit)}
          </div>

          <h4 class="mt-4 mb-2">⚠️ Ngân Hàng Lỗi Sai Gần Nhất (${mistakes.length})</h4>
          <div class="admin-mistakes-scroll">
            ${mistakes.length === 0 ? '<p class="text-muted text-sm">Học viên này chưa có câu hỏi nào trả lời sai.</p>' : 
              mistakes.slice(-5).reverse().map(m => `
                <div class="inspect-mistake-card">
                  <div class="mistake-card-title">Q#${m.question_id}: ${escapeHtml(m.question_text || 'Câu hỏi luyện tập')}</div>
                  <div class="mistake-card-meta">Đã sai ${m.times_failed || 1} lần • Trụ cột: ${m.pillar || 'General'}</div>
                </div>
              `).join('')
            }
          </div>
        </div>

        <div class="admin-inspect-footer">
          <button class="btn btn-secondary btn-sm" id="btn-export-single-user">📥 Tải Bộ Nhớ (.dgmem)</button>
          <button class="btn btn-primary btn-sm" id="btn-close-inspect-bottom">Đóng</button>
        </div>
      </div>
    `;

    modal.classList.add('active');

    const closeFn = () => modal.classList.remove('active');
    modal.querySelector('#btn-close-inspect').addEventListener('click', closeFn);
    modal.querySelector('#btn-close-inspect-bottom').addEventListener('click', closeFn);

    modal.querySelector('#btn-export-single-user').addEventListener('click', () => {
      const exportObj = {
        meta: {
          app: 'DeepGuard AI Enterprise',
          version: '2.0.0',
          exported_at: new Date().toISOString()
        },
        user_profile: {
          user_id: user.user_id,
          username: user.username,
          full_name: user.full_name,
          email: user.email,
          avatar: user.avatar
        },
        memory: mem
      };
      const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `deepguard_memory_${user.username}_${Date.now()}.dgmem`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  function renderPillarBar(name, score) {
    const s = Math.round(score || 0);
    return `
      <div class="pillar-bar-item">
        <div class="pillar-bar-label">
          <span>${name}</span>
          <span class="pillar-bar-val">${s}%</span>
        </div>
        <div class="pillar-bar-track">
          <div class="pillar-bar-fill" style="width: ${s}%"></div>
        </div>
      </div>
    `;
  }

  // Create User Modal
  function showCreateUserModal() {
    const modalId = 'admin-create-user-modal';
    let modal = document.getElementById(modalId);
    if (!modal) {
      modal = document.createElement('div');
      modal.id = modalId;
      modal.className = 'auth-modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="auth-modal-dialog">
        <button class="modal-close-btn" id="btn-close-create-user">&times;</button>
        <h3 class="mb-3">➕ Tạo Mới Tài Khoản Học Viên</h3>
        
        <form id="admin-create-user-form" class="auth-form" onsubmit="return false;">
          <div class="form-group">
            <label>Tên đăng nhập (*)</label>
            <input type="text" id="admin-new-username" placeholder="vd: hocvien_sec01" required>
          </div>
          <div class="form-group">
            <label>Họ và tên (*)</label>
            <input type="text" id="admin-new-fullname" placeholder="vd: Nguyễn Văn A" required>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" id="admin-new-email" placeholder="vd: hocvien@deepguard.vn">
          </div>
          <div class="form-group">
            <label>Mật khẩu khởi tạo (*, tối thiểu 6 ký tự)</label>
            <input type="password" id="admin-new-password" placeholder="Mật khẩu..." required>
          </div>
          <div class="form-group">
            <label>Vai trò</label>
            <select id="admin-new-role">
              <option value="student">🎓 Học viên</option>
              <option value="admin">🛡️ Quản trị viên</option>
            </select>
          </div>

          <div id="admin-create-error" class="admin-error-text" style="display:none;"></div>

          <div class="auth-form-actions">
            <button class="btn btn-secondary" type="button" id="btn-cancel-create">Hủy Bỏ</button>
            <button class="btn btn-primary" type="submit" id="btn-submit-create">Tạo Tài Khoản</button>
          </div>
        </form>
      </div>
    `;

    modal.classList.add('active');

    const closeFn = () => modal.classList.remove('active');
    modal.querySelector('#btn-close-create-user').addEventListener('click', closeFn);
    modal.querySelector('#btn-cancel-create').addEventListener('click', closeFn);

    const form = modal.querySelector('#admin-create-user-form');
    const errEl = modal.querySelector('#admin-create-error');

    form.addEventListener('submit', async () => {
      const username = modal.querySelector('#admin-new-username').value;
      const full_name = modal.querySelector('#admin-new-fullname').value;
      const email = modal.querySelector('#admin-new-email').value;
      const password = modal.querySelector('#admin-new-password').value;
      const role = modal.querySelector('#admin-new-role').value;

      try {
        await window.DeepGuardMemory.adminCreateUser({
          username, full_name, email, password, role
        });
        alert(`Đã tạo tài khoản @${username} thành công!`);
        closeFn();
        await refreshAdminData();
      } catch (err) {
        errEl.textContent = '❌ ' + err.message;
        errEl.style.display = 'block';
      }
    });
  }

  // Change PIN Modal
  function showChangePinModal() {
    const currentKey = window.DeepGuardMemory.getAdminKey();
    const inputCurrent = prompt('Nhập mã PIN Admin HIỆN TẠI để xác thực:');
    if (inputCurrent === null) return;
    if (inputCurrent !== currentKey) {
      alert('❌ Mã PIN hiện tại không chính xác!');
      return;
    }

    const newKey = prompt('Nhập mã PIN Admin MỚI (tối thiểu 4 ký tự):');
    if (!newKey) return;
    if (newKey.trim().length < 4) {
      alert('❌ Mã PIN mới phải có ít nhất 4 ký tự!');
      return;
    }

    window.DeepGuardMemory.setAdminKey(newKey);
    alert('✅ Đã cập nhật mã PIN Admin thành công!');
  }

  // Export full JSON database
  async function exportFullDatabase() {
    try {
      const data = await window.DeepGuardMemory.adminExportFullDatabase();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `deepguard_full_database_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert('Lỗi xuất dữ liệu: ' + e.message);
    }
  }

  function renderAdminPortal() {
    const container = getContainer();
    if (!container) return;
    if (isAuthed) {
      renderAdminDashboard();
    } else {
      renderPinScreen();
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Bootstrap when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdminPortal);
  } else {
    initAdminPortal();
  }

  window.DeepGuardAdminPortal = {
    render: renderAdminPortal,
    refresh: refreshAdminData
  };

})(window);

