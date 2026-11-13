/**
 * =====================================================================
 * DEEPGUARD AI ENTERPRISE - MEMORY HUB & AUTH UI CONTROLLER
 * VISUAL RADAR CHART, MISTAKE VAULT, CREDENTIAL LOCKER, BACKUP/RESTORE
 * =====================================================================
 */

(function (window, document) {
  'use strict';

  // 1. RADAR CHART DRAWER ON HTML5 CANVAS
  function drawCompetencyRadar(canvasId, scores) {
    const cv = document.getElementById(canvasId);
    if (!cv) return;
    const ctx = cv.getContext('2d');
    const w = cv.width;
    const h = cv.height;
    const cx = w / 2;
    const cy = h / 2;
    const r = Math.min(cx, cy) - 50;

    ctx.clearRect(0, 0, w, h);

    const axes = [
      { key: 'dsp', label: '1. DSP & Lấy Mẫu' },
      { key: 'acoustics', label: '2. Âm Học ISO 3382' },
      { key: 'prosody', label: '3. Ngữ Âm & Thanh Ngã' },
      { key: 'onnx', label: '4. MelCNN & ONNX' },
      { key: 'fusion', label: '5. Dung Hợp & Hard Veto' },
      { key: 'security', label: '6. Quản Trị & Pháp Lý' }
    ];

    const totalAxes = axes.length;
    const angleStep = (Math.PI * 2) / totalAxes;

    // Draw concentric hexagonal grid lines (20%, 40%, 60%, 80%, 100%)
    const levels = [0.2, 0.4, 0.6, 0.8, 1.0];
    levels.forEach(lvl => {
      ctx.beginPath();
      ctx.strokeStyle = lvl === 1.0 ? 'rgba(0, 240, 255, 0.35)' : 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = lvl === 1.0 ? 1.5 : 1;
      for (let i = 0; i < totalAxes; i++) {
        const a = i * angleStep - Math.PI / 2;
        const x = cx + Math.cos(a) * r * lvl;
        const y = cy + Math.sin(a) * r * lvl;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // Percentage label on top axis
      ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
      ctx.font = '9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`${Math.round(lvl * 100)}%`, cx, cy - r * lvl - 3);
    });

    // Draw radiating axis lines and labels
    axes.forEach((axis, i) => {
      const a = i * angleStep - Math.PI / 2;
      const xEnd = cx + Math.cos(a) * r;
      const yEnd = cy + Math.sin(a) * r;

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.moveTo(cx, cy);
      ctx.lineTo(xEnd, yEnd);
      ctx.stroke();

      // Outer label positioning
      const labelDist = r + 25;
      const lx = cx + Math.cos(a) * labelDist;
      const ly = cy + Math.sin(a) * labelDist;

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '11px sans-serif';
      ctx.textAlign = (Math.abs(Math.cos(a)) < 0.1) ? 'center' : (Math.cos(a) > 0 ? 'left' : 'right');
      ctx.textBaseline = (Math.abs(Math.sin(a)) < 0.1) ? 'middle' : (Math.sin(a) > 0 ? 'top' : 'bottom');
      
      const sc = scores[axis.key] || 0;
      ctx.fillText(`${axis.label}`, lx, ly);

      ctx.fillStyle = sc >= 80 ? '#00ff9d' : (sc >= 50 ? '#00f0ff' : '#ffb700');
      ctx.font = 'bold 10px monospace';
      ctx.fillText(`(${sc.toFixed(0)}%)`, lx, ly + (Math.sin(a) > 0 ? 12 : -12));
    });

    // Draw User Competency Data Polygon
    ctx.beginPath();
    axes.forEach((axis, i) => {
      const a = i * angleStep - Math.PI / 2;
      const val = Math.max(0.08, Math.min(1.0, (scores[axis.key] || 0) / 100));
      const px = cx + Math.cos(a) * r * val;
      const py = cy + Math.sin(a) * r * val;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.closePath();

    // Fill with glowing gradient
    const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, r);
    grad.addColorStop(0, 'rgba(0, 240, 255, 0.45)');
    grad.addColorStop(0.7, 'rgba(0, 240, 255, 0.2)');
    grad.addColorStop(1, 'rgba(181, 95, 230, 0.1)');
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 12;
    ctx.stroke();
    ctx.shadowBlur = 0; // reset

    // Draw vertex dots
    axes.forEach((axis, i) => {
      const a = i * angleStep - Math.PI / 2;
      const val = Math.max(0.08, Math.min(1.0, (scores[axis.key] || 0) / 100));
      const px = cx + Math.cos(a) * r * val;
      const py = cy + Math.sin(a) * r * val;

      ctx.beginPath();
      ctx.arc(px, py, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#040711';
      ctx.fill();
      ctx.strokeStyle = '#00ff9d';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }

  // 2. RENDER MEMORY HUB UI
  function renderMemoryHub() {
    const container = document.getElementById('user-memory-hub');
    if (!container || !window.DeepGuardMemory) return;

    const mem = window.DeepGuardMemory.currentMemory;
    const user = window.DeepGuardMemory.currentUser;
    if (!mem || !user) return;

    const prof = mem.user_profile;
    const prog = mem.progress_summary;
    const radar = mem.pillar_radar_scores;
    const mistakes = mem.mistake_vault || [];
    const certs = mem.certificates_earned || [];

    // Study time formatted (hours, mins)
    const hours = Math.floor(prof.total_study_time_seconds / 3600);
    const mins = Math.floor((prof.total_study_time_seconds % 3600) / 60);
    const timeFormatted = `${hours > 0 ? hours + ' giờ ' : ''}${mins} phút`;

    container.innerHTML = `
      <div class="memory-hub-container" style="max-width: 1200px; margin: 0 auto; padding: 1.5rem 0;">
        
        <!-- PROFILE HERO BANNER -->
        <div class="memory-profile-card" style="background: linear-gradient(135deg, rgba(16, 24, 40, 0.95), rgba(10, 15, 29, 0.98)); border: 1px solid rgba(0, 240, 255, 0.3); border-radius: var(--radius-lg); padding: 1.8rem; margin-bottom: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.5); position: relative; overflow: hidden;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1.5rem;">
            
            <!-- Left: Avatar & Identity -->
            <div style="display: flex; gap: 1.2rem; align-items: center;">
              <div style="font-size: 3.5rem; background: rgba(0, 240, 255, 0.1); border: 2px solid #00f0ff; width: 85px; height: 85px; display: flex; align-items: center; justify-content: center; border-radius: 50%; box-shadow: 0 0 20px rgba(0,240,255,0.25);">
                ${prof.avatar || '👨‍💻'}
              </div>
              <div>
                <div style="display: flex; align-items: center; gap: 0.8rem; flex-wrap: wrap;">
                  <h2 style="font-size: 1.6rem; color: #fff; margin: 0;">${prof.full_name}</h2>
                  ${user.is_guest 
                    ? '<span class="badge" style="background: rgba(255, 183, 0, 0.15); color: #ffb700; border: 1px solid #ffb700;">Chế độ Khách (Chưa Đăng Nhập)</span>'
                    : '<span class="badge" style="background: rgba(0, 255, 157, 0.15); color: #00ff9d; border: 1px solid #00ff9d;">Học Viên Chính Thức</span>'
                  }
                </div>
                <div style="font-family: var(--font-mono); color: #00f0ff; font-size: 0.9rem; margin-top: 4px;">
                  @${prof.username} • ${prof.current_rank}
                </div>
                <div style="font-size: 0.82rem; color: #8b9bb4; margin-top: 4px;">
                  Bắt đầu luyện tập từ: ${new Date(prof.created_at).toLocaleDateString('vi-VN')}
                </div>
              </div>
            </div>

            <!-- Right: Actions & Streak -->
            <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
              <div style="background: rgba(255, 51, 102, 0.12); border: 1px solid #ff3366; padding: 0.6rem 1.2rem; border-radius: var(--radius-md); text-align: center;">
                <div style="font-size: 0.72rem; color: #ff80a0; text-transform: uppercase; font-weight: 700;">CHUỖI HỌC LIÊN TỤC</div>
                <div style="font-size: 1.4rem; color: #fff; font-weight: 700;">🔥 ${prof.streak_days || 1} Ngày</div>
              </div>

              ${user.is_guest ? `
                <button class="btn-primary" id="btn-profile-login-prompt" style="background: linear-gradient(135deg, #00f0ff, #b55fe6); color: #040711; font-weight: 700; padding: 0.7rem 1.4rem;">
                  🔑 Đăng Ký Tài Khoản Lưu Lâu Dài
                </button>
              ` : `
                <button class="btn-secondary" id="btn-profile-logout" style="border-color: #ff3366; color: #ff3366; font-size: 0.85rem; padding: 0.5rem 1rem;">
                  🚪 Đăng Xuất
                </button>
              `}
            </div>

          </div>

          <!-- Progress Bar & Quick Stats -->
          <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.08);">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem;">
              
              <div class="stat-mini-box" style="background: rgba(0,0,0,0.3); padding: 0.9rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
                <div style="font-size: 0.75rem; color: #8b9bb4;">CÂU HỎI ĐÃ LÀM</div>
                <div style="font-size: 1.3rem; font-weight: 700; color: #00f0ff; margin-top: 2px;">
                  ${prog.total_answered} câu
                </div>
              </div>

              <div class="stat-mini-box" style="background: rgba(0,0,0,0.3); padding: 0.9rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
                <div style="font-size: 0.75rem; color: #8b9bb4;">TỶ LỆ CHÍNH XÁC</div>
                <div style="font-size: 1.3rem; font-weight: 700; color: #00ff9d; margin-top: 2px;">
                  ${prog.accuracy_rate}%
                </div>
              </div>

              <div class="stat-mini-box" style="background: rgba(0,0,0,0.3); padding: 0.9rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
                <div style="font-size: 0.75rem; color: #8b9bb4;">THỜI GIAN LUYỆN TẬP</div>
                <div style="font-size: 1.3rem; font-weight: 700; color: #ffb700; margin-top: 2px;">
                  ${timeFormatted}
                </div>
              </div>

              <div class="stat-mini-box" style="background: rgba(0,0,0,0.3); padding: 0.9rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
                <div style="font-size: 0.75rem; color: #8b9bb4;">ĐIỂM KINH NGHIỆM EXP</div>
                <div style="font-size: 1.3rem; font-weight: 700; color: #b55fe6; margin-top: 2px;">
                  ${prof.level_exp} EXP
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- 2-COLUMN MAIN CONTENT: RADAR & MISTAKE VAULT -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;" class="memory-grid-2col">
          
          <!-- LEFT: 6-PILLAR COMPETENCY RADAR -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.8rem; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <h3 style="font-size: 1.15rem; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
                  <span>🎯</span> BIỂU ĐỒ NĂNG LỰC 6 CHIỀU (RADAR CHART)
                </h3>
                <span class="badge" style="background: rgba(0, 240, 255, 0.15); color: #00f0ff;">LIVE REALTIME</span>
              </div>
              <p style="color: #8b9bb4; font-size: 0.85rem; line-height: 1.5; margin-bottom: 1.2rem;">
                Tự động tổng hợp từ mọi câu hỏi, bài tập và phán quyết bạn đã thực hiện trên toàn hệ thống.
              </p>
            </div>

            <div style="display: flex; justify-content: center; align-items: center; margin: 1rem 0;">
              <canvas id="canvas-radar-competency" width="380" height="380" style="max-width: 100%; height: auto;"></canvas>
            </div>

            <div style="background: rgba(0,0,0,0.3); border-radius: 6px; padding: 0.8rem; font-size: 0.8rem; color: #cbd5e1; line-height: 1.5; text-align: center;">
              💡 <strong>Mẹo thăng cấp:</strong> Điểm trụ cột nào dưới 70%, hãy mở Tab <strong>Trắc Nghiệm Bẫy Sâu</strong> hoặc <strong>Ôn Tập Nhập Môn</strong> để rèn luyện thêm!
            </div>
          </div>

          <!-- RIGHT: MISTAKE VAULT (SỔ TAY PHỤC THÙ) -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.8rem; display: flex; flex-direction: column;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <h3 style="font-size: 1.15rem; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
                <span>⚡</span> SỔ TAY BẪY SAI (MISTAKE VAULT)
              </h3>
              <span class="badge" style="background: rgba(255, 51, 102, 0.15); color: #ff3366; font-weight: 700;">
                ${mistakes.filter(m => !m.isResolved).length} CÂU CẦN PHỤC THÙ
              </span>
            </div>
            <p style="color: #8b9bb4; font-size: 0.85rem; line-height: 1.5; margin-bottom: 1.2rem;">
              Hệ thống ghi nhớ các câu hỏi bạn từng trả lời sai để luyện tập ngắt quãng (Spaced Repetition).
            </p>

            <div class="mistake-list" style="flex: 1; overflow-y: auto; max-height: 380px; display: flex; flex-direction: column; gap: 0.8rem; padding-right: 0.4rem;">
              ${mistakes.length === 0 ? `
                <div style="text-align: center; padding: 3rem 1rem; color: #8b9bb4;">
                  <div style="font-size: 2.5rem; margin-bottom: 0.8rem;">🎉</div>
                  <strong style="color: #00ff9d; display: block; margin-bottom: 0.4rem;">Tuyệt vời! Bạn chưa có câu hỏi nào bị sai.</strong>
                  <span>Hãy tiếp tục thử thách với Đấu Trường Bảo Vệ hoặc Trắc Nghiệm Bẫy Sâu!</span>
                </div>
              ` : mistakes.map((m, mIdx) => `
                <div class="mistake-item-card" style="background: rgba(0,0,0,0.35); border: 1px solid ${m.isResolved ? 'rgba(0, 255, 157, 0.3)' : 'rgba(255, 51, 102, 0.3)'}; border-radius: 6px; padding: 1rem;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                    <span style="font-family: var(--font-mono); font-size: 0.72rem; color: #ff3366; font-weight: 700;">
                      ${m.module.toUpperCase()} • ${m.id}
                    </span>
                    <span class="badge" style="font-size: 0.68rem; background: ${m.isResolved ? 'rgba(0,255,157,0.15)' : 'rgba(255,51,102,0.15)'}; color: ${m.isResolved ? '#00ff9d' : '#ff3366'};">
                      ${m.isResolved ? '✅ ĐÃ PHỤC THÙ' : `⚠️ SAI ${m.attempts} LẦN`}
                    </span>
                  </div>
                  <div style="color: #fff; font-size: 0.88rem; font-weight: 500; line-height: 1.4; margin-bottom: 0.6rem;">
                    ${m.text}
                  </div>
                  ${m.explanation ? `
                    <div style="font-size: 0.8rem; color: #cbd5e1; background: rgba(0,0,0,0.3); padding: 0.5rem 0.7rem; border-radius: 4px; line-height: 1.4; border-left: 2px solid #00f0ff; margin-bottom: 0.6rem;">
                      <strong style="color: #00f0ff;">Lời giải:</strong> ${m.explanation.substring(0, 140)}...
                    </div>
                  ` : ''}
                  <div style="display: flex; justify-content: flex-end;">
                    <button class="btn-secondary btn-retry-mistake" data-mid="${m.id}" data-mmod="${m.module}" style="padding: 0.35rem 0.8rem; font-size: 0.78rem; border-color: #00f0ff; color: #00f0ff;">
                      ⚡ Ôn Lại Câu Này ➔
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

        <!-- FULL WIDTH: CREDENTIAL LOCKER & CERTIFICATES -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.8rem; margin-bottom: 2rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
            <div>
              <h3 style="font-size: 1.15rem; color: #fff; margin: 0; display: flex; align-items: center; gap: 8px;">
                <span>🎓</span> KHO CHỨNG CHỈ SÁT HẠCH DCFE (CREDENTIAL VAULT)
              </h3>
              <p style="color: #8b9bb4; font-size: 0.85rem; margin-top: 3px;">
                Chứng chỉ điện tử cấp sau khi vượt qua bài thi sát hạch 45 phút (Đạt từ 8.0/10 điểm trở lên).
              </p>
            </div>
            <button class="btn-primary" id="btn-goto-exam-tab" style="padding: 0.5rem 1rem; font-size: 0.85rem; background: linear-gradient(135deg, #00ff9d, #00f0ff); color: #040711; font-weight: 700;">
              🎓 Thi Sát Hạch Ngay
            </button>
          </div>

          <div class="certs-list" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1rem;">
            ${certs.length === 0 ? `
              <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #8b9bb4; background: rgba(0,0,0,0.25); border-radius: 8px;">
                Bạn chưa có chứng chỉ nào. Hãy vào Tab <strong>"Thi Sát Hạch 45 Phút"</strong> để hoàn thành bài thi và nhận chứng chỉ chính thức!
              </div>
            ` : certs.map(c => `
              <div class="cert-item-card" style="background: linear-gradient(135deg, rgba(4, 20, 36, 0.9), rgba(6, 12, 24, 0.95)); border: 1px solid rgba(0, 255, 157, 0.35); border-radius: 8px; padding: 1.2rem; box-shadow: 0 4px 20px rgba(0,255,157,0.08);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                  <span style="font-family: var(--font-mono); color: #00ff9d; font-size: 0.78rem; font-weight: 700;">${c.cert_id}</span>
                  <span style="font-size: 0.72rem; color: #8b9bb4;">${new Date(c.issued_at).toLocaleDateString('vi-VN')}</span>
                </div>
                <h4 style="color: #fff; font-size: 1rem; margin-bottom: 0.5rem;">${c.title}</h4>
                <div style="font-size: 0.85rem; color: #cbd5e1; margin-bottom: 0.8rem;">
                  Học viên: <strong style="color: #fff;">${c.candidate_name}</strong> • Điểm: <strong style="color: #00ff9d;">${c.score}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; font-family: var(--font-mono); font-size: 0.7rem; color: #8b9bb4; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.6rem;">
                  <span>HASH: ${c.verification_hash ? c.verification_hash.substring(0, 16) : 'N/A'}...</span>
                  <button class="btn-secondary btn-print-cert" style="font-size: 0.72rem; padding: 2px 8px; border-color: #00ff9d; color: #00ff9d;">In Chứng Chỉ 🖨️</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- BACKUP / RESTORE UTILITY BAR -->
        <div style="background: rgba(0, 0, 0, 0.4); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.2rem 1.8rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div>
            <div style="font-weight: 700; color: #fff; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
              💾 SAO LƯU & DI CHUYỂN BỘ NHỚ (PORTABLE MEMORY BACKUP)
            </div>
            <div style="font-size: 0.82rem; color: #8b9bb4; margin-top: 2px;">
              Xuất tệp thẻ nhớ cá nhân (.dgmem) để sao lưu hoặc mang sang thiết bị khác (Laptop/Điện thoại) mà không lo mất dữ liệu.
            </div>
          </div>

          <div style="display: flex; gap: 0.8rem; align-items: center;">
            <input type="file" id="input-import-memory" accept=".dgmem,.json" style="display: none;" />
            <button class="btn-secondary" id="btn-export-memory" style="font-size: 0.85rem; padding: 0.5rem 1rem; border-color: #00f0ff; color: #00f0ff;">
              📥 Xuất Thẻ Nhớ (.dgmem)
            </button>
            <button class="btn-secondary" id="btn-trigger-import-memory" style="font-size: 0.85rem; padding: 0.5rem 1rem; border-color: #ffb700; color: #ffb700;">
              📤 Nạp Thẻ Nhớ
            </button>
          </div>
        </div>

      </div>
    `;

    // Render Canvas Radar
    setTimeout(() => {
      drawCompetencyRadar('canvas-radar-competency', radar);
    }, 50);

    // Attach Event Listeners inside Memory Hub
    const btnPromptLogin = document.getElementById('btn-profile-login-prompt');
    if (btnPromptLogin) {
      btnPromptLogin.addEventListener('click', () => {
        openAuthModal('register');
      });
    }

    const btnLogout = document.getElementById('btn-profile-logout');
    if (btnLogout) {
      btnLogout.addEventListener('click', () => {
        if (confirm('Bạn có chắc chắn muốn đăng xuất khỏi tài khoản này?')) {
          window.DeepGuardMemory.logout();
        }
      });
    }

    const btnGotoExam = document.getElementById('btn-goto-exam-tab');
    if (btnGotoExam) {
      btnGotoExam.addEventListener('click', () => {
        const tab = document.querySelector('.nav-tab[data-tab="certification-exam"]');
        if (tab) tab.click();
      });
    }

    // Export Memory Button
    const btnExport = document.getElementById('btn-export-memory');
    if (btnExport) {
      btnExport.addEventListener('click', () => {
        const json = window.DeepGuardMemory.exportMemoryBackup();
        if (!json) return;
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const uname = user.username || 'guest';
        const dateStr = new Date().toISOString().split('T')[0];
        a.href = url;
        a.download = `deepguard_memory_${uname}_${dateStr}.dgmem`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        alert('Đã xuất tệp thẻ nhớ thành công! Bạn có thể lưu giữ file này để khôi phục tiến độ bất cứ lúc nào.');
      });
    }

    // Import Memory Button
    const btnTriggerImport = document.getElementById('btn-trigger-import-memory');
    const inputImport = document.getElementById('input-import-memory');
    if (btnTriggerImport && inputImport) {
      btnTriggerImport.addEventListener('click', () => inputImport.click());
      inputImport.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (event) => {
          try {
            await window.DeepGuardMemory.importMemoryBackup(event.target.result);
            alert('Nạp thẻ nhớ thành công! Toàn bộ tiến độ và điểm số đã được đồng bộ.');
          } catch (err) {
            alert('Lỗi nạp file thẻ nhớ: ' + err.message);
          }
        };
        reader.readAsText(file);
      });
    }

    // Retry Mistake Button
    container.querySelectorAll('.btn-retry-mistake').forEach(btn => {
      btn.addEventListener('click', () => {
        const mid = btn.dataset.mid;
        const mmod = btn.dataset.mmod;
        if (mmod === 'quiz-trap' || mmod.startsWith('quiz')) {
          const tab = document.querySelector('.nav-tab[data-tab="quiz-trap"]');
          if (tab) tab.click();
        } else if (mmod.startsWith('progressive')) {
          const tab = document.querySelector('.nav-tab[data-tab="progressive-academy"]');
          if (tab) tab.click();
        } else {
          const tab = document.querySelector('.nav-tab[data-tab="defense-arena"]');
          if (tab) tab.click();
        }
      });
    });

    // Print Cert Button
    container.querySelectorAll('.btn-print-cert').forEach(btn => {
      btn.addEventListener('click', () => window.print());
    });
  }

  // 3. AUTH MODAL CONTROLLER & HEADER WIDGET
  function updateHeaderAuthWidget(user) {
    const btnOpenAuth = document.getElementById('btn-open-auth-modal');
    const userBadge = document.getElementById('header-user-badge');
    const userAvatar = document.getElementById('header-user-avatar');
    const userName = document.getElementById('header-user-name');
    const userStreak = document.getElementById('header-user-streak');

    if (!btnOpenAuth || !userBadge) return;

    if (user && !user.is_guest) {
      btnOpenAuth.style.display = 'none';
      userBadge.style.display = 'flex';
      if (userAvatar) userAvatar.textContent = user.avatar || '👨‍💻';
      if (userName) userName.textContent = user.full_name || user.username;
      if (userStreak && window.DeepGuardMemory.currentMemory) {
        userStreak.textContent = `🔥 ${window.DeepGuardMemory.currentMemory.user_profile.streak_days || 1} ngày`;
      }
    } else {
      btnOpenAuth.style.display = 'inline-flex';
      userBadge.style.display = 'none';
    }
  }

  function openAuthModal(defaultTab = 'login') {
    const modal = document.getElementById('auth-modal');
    if (!modal) return;
    modal.classList.add('visible');

    const tabLogin = document.getElementById('auth-tab-btn-login');
    const tabReg = document.getElementById('auth-tab-btn-register');
    const formLogin = document.getElementById('auth-form-login');
    const formReg = document.getElementById('auth-form-register');
    const errBox = document.getElementById('auth-error-msg');
    if (errBox) errBox.style.display = 'none';

    if (defaultTab === 'register') {
      tabLogin.classList.remove('active');
      tabReg.classList.add('active');
      formLogin.style.display = 'none';
      formReg.style.display = 'flex';
    } else {
      tabLogin.classList.add('active');
      tabReg.classList.remove('active');
      formLogin.style.display = 'flex';
      formReg.style.display = 'none';
    }
  }

  function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.remove('visible');
  }

  function initAuthModalEvents() {
    const modal = document.getElementById('auth-modal');
    if (!modal) return;

    const btnOpenAuth = document.getElementById('btn-open-auth-modal');
    if (btnOpenAuth) {
      btnOpenAuth.addEventListener('click', () => openAuthModal('login'));
    }

    const btnCloseModal = document.getElementById('auth-modal-close-btn');
    if (btnCloseModal) {
      btnCloseModal.addEventListener('click', closeAuthModal);
    }

    // Switch tabs inside modal
    const tabLogin = document.getElementById('auth-tab-btn-login');
    const tabReg = document.getElementById('auth-tab-btn-register');
    const formLogin = document.getElementById('auth-form-login');
    const formReg = document.getElementById('auth-form-register');
    const errBox = document.getElementById('auth-error-msg');

    if (tabLogin && tabReg) {
      tabLogin.addEventListener('click', () => {
        tabLogin.classList.add('active');
        tabReg.classList.remove('active');
        formLogin.style.display = 'flex';
        formReg.style.display = 'none';
        if (errBox) errBox.style.display = 'none';
      });
      tabReg.addEventListener('click', () => {
        tabReg.classList.add('active');
        tabLogin.classList.remove('active');
        formReg.style.display = 'flex';
        formLogin.style.display = 'none';
        if (errBox) errBox.style.display = 'none';
      });
    }

    // Login submit
    if (formLogin) {
      formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        const uname = document.getElementById('login-username').value;
        const pass = document.getElementById('login-password').value;
        const remember = document.getElementById('login-remember')?.checked;

        try {
          await window.DeepGuardMemory.login(uname, pass, remember);
          closeAuthModal();
          alert(`Đăng nhập thành công! Chào mừng trở lại, ${window.DeepGuardMemory.currentUser.full_name}.`);
        } catch (err) {
          if (errBox) {
            errBox.style.display = 'block';
            errBox.textContent = err.message;
          } else {
            alert(err.message);
          }
        }
      });
    }

    // Register submit
    if (formReg) {
      formReg.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fullname = document.getElementById('reg-fullname').value;
        const uname = document.getElementById('reg-username').value;
        const email = document.getElementById('reg-email').value;
        const pass = document.getElementById('reg-password').value;
        const passConfirm = document.getElementById('reg-password-confirm').value;
        const avatar = document.querySelector('input[name="reg-avatar"]:checked')?.value || '👨‍💻';

        if (pass !== passConfirm) {
          if (errBox) {
            errBox.style.display = 'block';
            errBox.textContent = 'Mật khẩu xác nhận không khớp!';
          } else {
            alert('Mật khẩu xác nhận không khớp!');
          }
          return;
        }

        try {
          await window.DeepGuardMemory.register(uname, fullname, email, pass, avatar);
          closeAuthModal();
          alert(`Chúc mừng! Tài khoản ${uname} đã được tạo thành công.`);
        } catch (err) {
          if (errBox) {
            errBox.style.display = 'block';
            errBox.textContent = err.message;
          } else {
            alert(err.message);
          }
        }
      });
    }

    // Quick jump to Memory Hub from header
    const btnQuickMemory = document.getElementById('btn-quick-goto-memory');
    if (btnQuickMemory) {
      btnQuickMemory.addEventListener('click', () => {
        const tab = document.querySelector('.nav-tab[data-tab="user-memory-hub"]');
        if (tab) tab.click();
      });
    }
  }

  // 4. AUTO-ATTACH TO DOM CONTENT LOADED
  document.addEventListener('DOMContentLoaded', () => {
    initAuthModalEvents();

    if (window.DeepGuardMemory) {
      window.DeepGuardMemory.onAuthStateChanged((user) => {
        updateHeaderAuthWidget(user);
        renderMemoryHub();
      });

      window.DeepGuardMemory.onMemoryUpdated(() => {
        renderMemoryHub();
      });
    }

    // Render when switching to Memory Tab
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        if (tab.dataset.tab === 'user-memory-hub') {
          setTimeout(renderMemoryHub, 50);
        }
      });
    });
  });

  window.openAuthModal = openAuthModal;
  window.renderMemoryHub = renderMemoryHub;

})(window, document);

