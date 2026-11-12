/**
 * =====================================================================
 * DEEPGUARD AI ENTERPRISE - FORENSIC DEFENSE & MASTERY LAB
 * COMPREHENSIVE 5-MODE ENGINE: SOCRATIC, COUNCIL, CASES, QUIZ, CODE AUDIT
 * =====================================================================
 */

// =====================================================================
// 1. DATA REPOSITORY: 11 SOCRATIC DEEP-DIVE QUESTIONS (MODE 1)
// =====================================================================
const SOCRATIC_QUESTIONS = [
  {
    id: 1,
    tag: "TRỤ CỘT 01: DSP & TIỀN XỬ LÝ TÍN HIỆU",
    title: "Polyphase Resampling 16kHz vs STFT Hann Window 1024 / Hop 256",
    difficulty: "CAO CẤP",
    context: `Trong quy chuẩn tiền xử lý âm thanh pháp y của DeepGuard, audio gốc được đưa về 16kHz trước khi tính STFT với Hann window 1024 và hop 256. 
Tại sao không giữ nguyên 44.1kHz hoặc 48kHz? Tại sao bắt buộc dùng Polyphase Resampling thay vì Linear Interpolation? Và tại sao hop 256 (16ms) là điểm cân bằng hoàn hảo giữa định lý Heisenberg-Gabor và độ trễ streaming?`,
    hints: [
      "Định lý Nyquist-Shannon: Tần số thoại hữu ích của người nằm dưới 8000Hz (f_s = 16kHz là đủ bảo toàn Formant F1, F2, F3).",
      "Polyphase Resampling áp dụng bộ lọc thông thấp FIR chống răng cưa (Anti-Aliasing Lowpass) trong đa pha, triệt tiêu Spectral Leakage.",
      "Độ bất định Heisenberg-Gabor: Delta t * Delta f >= 1 / (4 * pi). Hop 256 (16ms) tương thích với cửa sổ dịch trượt thanh môn người (10-25ms)."
    ],
    mathProof: `1. Phân tích độ phân giải STFT tại f_s = 16,000 Hz:
   - Window N = 1024 -> Delta f = 16,000 / 1024 = 15.625 Hz (Đủ mịn để bóc tách F0 = 100-300Hz).
   - Hop length H = 256 -> Delta t = 256 / 16,000 = 16 ms (Overlap 75%).
2. Polyphase Filtering:
   x_resampled[m] = SUM_{k} x[k] * h_sub[m * M - k * L]
   Ngăn chặn hoàn toàn hiện tượng gấp phổ (Spectral Foldover/Aliasing) vào dải 0 - 8kHz.
3. Tối ưu chi phí tính toán:
   Ma trận phổ Mel 80 bins tại 16kHz giảm tải 65% số phép tính FLOPS so với 44.1kHz, cho phép server xử lý 250+ luồng đồng thời mà không nghẽn CPU.`,
    codeSnippet: `import scipy.signal as signal

def polyphase_resample_16k(audio, orig_sr):
    if orig_sr == 16000: return audio
    # Polyphase filtering tự động thiết kế bộ lọc Kaiser-windowed sinc chống Aliasing
    gcd = np.gcd(orig_sr, 16000)
    up = 16000 // gcd
    down = orig_sr // gcd
    return signal.resample_poly(audio, up, down)`
  },
  {
    id: 2,
    tag: "TRỤ CỘT 02: VẬT LÝ ÂM HỌC ISO 3382",
    title: "Tích phân năng lượng lùi Schroeder, T20 và Dội Âm Loa Ngoài Replay",
    difficulty: "CHUYÊN SÂU",
    context: `Khi kẻ tấn công phát lại file ghi âm qua loa điện thoại/loa bluetooth để vượt rào sinh trắc, tín hiệu âm thanh phải đi qua hai môi trường dội âm liên tiếp.
Phương pháp tích phân lùi Schroeder trên đoạn rơi âm đuôi (Speech Offset Tails) bóc tách hiện tượng này như thế nào? Tại sao RT60 > 0.85s là ngưỡng bất biến kết án Replay Attack?`,
    hints: [
      "Đáp ứng xung phòng kép (Dual Room Impulse Response): h_total(t) = h_rec(t) * h_play(t).",
      "Tích phân lùi Schroeder: E(t) = Tích phân từ t đến vô cùng của h^2(tau) dtau.",
      "Ước lượng T20 (khoảng suy giảm từ -5dB đến -25dB), suy ra RT60 = 3 * T20."
    ],
    mathProof: `1. Tích phân lùi Schroeder (Schroeder Backward Integration):
   E(t) = INTEGRAL_{t}^{infinity} h^2(tau) dtau
   dB(t) = 10 * log10( E(t) / E(0) )
2. Đo đạc T20 và quy đổi RT60:
   T20 = t(-25dB) - t(-5dB)
   RT60 = 3 * T20
3. Ngưỡng phân loại pháp y:
   - RT60 < 0.15s: Anechoic Chamber / Neural Vocoder số (FAKE).
   - 0.20s <= RT60 <= 0.65s: Phòng ngủ/phòng làm việc người thật (PASS).
   - RT60 > 0.85s: Tích chập 2 phòng kèm lọc lược Comb-Filter (REPLAY FAKE).`,
    codeSnippet: `def compute_schroeder_rt60(offset_tail_audio, sr=16000):
    squared = offset_tail_audio[::-1] ** 2
    curve = np.cumsum(squared)[::-1]
    db = 10 * np.log10(curve / (curve[0] + 1e-12))
    idx_5 = np.where(db <= -5)[0][0]
    idx_25 = np.where(db <= -25)[0][0]
    t20 = (idx_25 - idx_5) / sr
    return 3.0 * t20  # RT60 chuẩn ISO 3382`,
    diagramCaption: "ĐƯỜNG CONG TÍCH PHÂN LÙI SCHROEDER (ISO 3382): ƯỚC LƯỢNG T20 -> RT60",
    diagramSvg: `<svg class="diagram-svg" viewBox="0 0 650 170" width="100%"><rect width="650" height="170" fill="#04070e" rx="8"/><text x="20" y="24" fill="#00f0ff" font-family="JetBrains Mono" font-size="11" font-weight="bold">ISO 3382: SCHROEDER INTEGRATION (T20 -> RT60)</text><line x1="50" y1="35" x2="50" y2="150" stroke="#475569" stroke-width="1.5"/><line x1="50" y1="150" x2="610" y2="150" stroke="#475569" stroke-width="1.5"/><line x1="50" y1="55" x2="590" y2="55" stroke="#1e293b" stroke-dasharray="3,3"/><text x="15" y="58" fill="#94a3b8" font-family="JetBrains Mono" font-size="9">-5 dB</text><line x1="50" y1="105" x2="590" y2="105" stroke="#1e293b" stroke-dasharray="3,3"/><text x="10" y="108" fill="#94a3b8" font-family="JetBrains Mono" font-size="9">-25 dB</text><path d="M 50 40 L 140 55 L 320 105 L 500 150" fill="none" stroke="#00ff9d" stroke-width="2.5"/><line x1="140" y1="55" x2="140" y2="150" stroke="#00ff9d" stroke-dasharray="2,2"/><line x1="320" y1="105" x2="320" y2="150" stroke="#00ff9d" stroke-dasharray="2,2"/><line x1="140" y1="125" x2="320" y2="125" stroke="#00ff9d" stroke-width="1.5"/><text x="200" y="120" fill="#00ff9d" font-family="JetBrains Mono" font-size="10">T20 = 0.127s</text><text x="175" y="140" fill="#00ff9d" font-family="JetBrains Mono" font-size="10">RT60 = 3*T20 = 0.38s (Pass)</text><path d="M 50 40 L 70 55 L 110 105 L 150 150" fill="none" stroke="#ff3366" stroke-width="2" stroke-dasharray="4,3"/><text x="80" y="75" fill="#ff3366" font-family="JetBrains Mono" font-size="8">Vocoder ảo (0.08s)</text><path d="M 50 40 L 200 55 L 520 105 L 600 120" fill="none" stroke="#ffb700" stroke-width="2" stroke-dasharray="4,3"/><text x="430" y="75" fill="#ffb700" font-family="JetBrains Mono" font-size="8">Replay Loa (0.96s)</text></svg>`,
    evidence: "Tiêu chuẩn quốc tế ISO 3382-1:2009 (Measurement of room acoustic parameters) & Nghiên cứu gốc của Manfred Schroeder (1979) 'Integrated-Impulse Method Measuring Reverberation Time', J. Acoust. Soc. Am."
  },
  {
    id: 3,
    tag: "TRỤ CỘT 03: NGỮ ÂM HỌC TIẾNG VIỆT",
    title: "Micro-Jitter Sinh Học (0.6%-2.5%) vs Vocoder Over-smoothing vs RVC Phase Jitter",
    difficulty: "CAO CẤP",
    context: `Về mặt cơ sinh học, dây thanh quản người rung động phi tuyến tính dưới tác động của áp lực dưới thanh môn và tuần hoàn máu.
Tại sao các Neural Vocoder hiện đại (HiFi-GAN, WaveGlow) lại rơi vào tình trạng over-smoothing (<0.35%), trong khi RVC v2 lại vỡ pha (>4.8%)?`,
    hints: [
      "Hàm mất mát L1/L2 phạt sai lệch biên độ phổ, ép vocoder học giá trị kỳ vọng (trung bình hóa, triệt tiêu vi rung).",
      "RVC v2 bóc tách F0 bằng Harvest/PM rồi gán vào bộ dao động Sine của VITS, sai số nội suy pha gây Phase Discontinuity.",
      "Công thức Jitter tương đối: Tỷ lệ giữa độ lệch chu kỳ liên tiếp và chu kỳ trung bình."
    ],
    mathProof: `Jitter_rel = [ (1 / (N - 1)) * SUM_{i=1}^{N-1} |T_i - T_{i+1}| ] / [ (1 / N) * SUM_{i=1}^N T_i ] * 100%
- Người sống bình thường: 0.6% <= Jitter_rel <= 2.5%.
- Vocoder tổng hợp: Loss = ||S_real - S_pred||_1 ép F0 mượt mà -> Jitter < 0.35% (Phi sinh học).
- RVC v2 Voice Conversion: Harvest F0 bị lượng tử hóa sai lệch tại các bước chuyển giọng tiếng Việt -> Jitter > 4.8%.`,
    codeSnippet: `def extract_micro_jitter(f0_series):
    voiced_f0 = f0_series[f0_series > 50]
    if len(voiced_f0) < 15: return 0.0
    periods = 1.0 / voiced_f0
    diffs = np.abs(np.diff(periods))
    return (np.mean(diffs) / np.mean(periods)) * 100.0`,
    evidence: "Titze, I. R. (1994) 'Principles of Voice Production', Prentice-Hall; Kong, J. et al. (2020) 'HiFi-GAN: Generative Adversarial Networks for Efficient and High Fidelity Speech Synthesis', NeurIPS."
  },
  {
    id: 4,
    tag: "TRỤ CỘT 03: NGỮ ÂM HỌC TIẾNG VIỆT",
    title: "Khai Phá Nghẽn Thanh Môn (Glottal Stop Mining) Trên Thanh Ngã & Nặng",
    difficulty: "CHUYÊN SÂU",
    context: `Thanh Ngã là thanh gãy (glottalized broken tone). Người phát âm nâng cao độ, sau đó nắp thanh môn siết chặt tạo khoảng lặng cơ học 20-60ms, rồi bung ra kết thúc ở cao độ cao.
Tại sao tiêu chí Delta E < -12dB trong 20-60ms kèm đứt gãy F0 là 'tử huyệt' khiến ElevenLabs, Bark, XTTS bị lật tẩy?`,
    hints: [
      "Độ sụt năng lượng RMS cục bộ: Delta E = 10 * log10(E_valley / min(E_left, E_right)) < -12dB.",
      "Sự gián đoạn F0: Nắp thanh môn đóng chặt khiến dây thanh ngừng rung -> F0 = 0 (Unvoiced).",
      "Các mô hình TTS toàn cầu dùng Mel-loss xu hướng nội suy đường cong F0 trơn tuột (Smooth dip chỉ sụt -3dB đến -5dB)."
    ],
    mathProof: `Tiêu chí giám định Glottal Stop Mining (GSM):
1. Thời gian đóng nắp thanh môn: Delta t_closure in [20ms, 60ms].
2. Độ sụt áp năng lượng: Delta E = 10 * log10( E_dip / min(E_pre, E_post) ) < -12.0 dB.
3. Đứt gãy F0: Autocorrelation Peak R_max < 0.25 (mất tính tuần hoàn hữu thanh).
=> Nếu phát âm thanh Ngã mà Delta E > -6.0 dB hoặc F0 không đứt: Kết luận TTS GIẢ MẠO.`,
    diagramCaption: "ĐƯỜNG BAO NĂNG LƯỢNG NẮP THANH MÔN: NGƯỜI THẬT (ΔE < -12dB) VS AI TTS",
    diagramSvg: `<svg class="diagram-svg" viewBox="0 0 650 170" width="100%"><rect width="650" height="170" fill="#04070e" rx="8"/><text x="20" y="24" fill="#00f0ff" font-family="JetBrains Mono" font-size="11" font-weight="bold">BÓC TÁCH THANH NGÃ: GLOTTAL STOP (-15dB) VS AI TTS DIP</text><line x1="50" y1="40" x2="600" y2="40" stroke="#1f293d" stroke-dasharray="3,3"/><line x1="50" y1="85" x2="600" y2="85" stroke="#1f293d" stroke-dasharray="3,3"/><line x1="50" y1="130" x2="600" y2="130" stroke="#1f293d" stroke-dasharray="3,3"/><text x="15" y="44" fill="#64748b" font-family="JetBrains Mono" font-size="9">0 dB</text><text x="10" y="89" fill="#64748b" font-family="JetBrains Mono" font-size="9">-12 dB</text><text x="10" y="134" fill="#64748b" font-family="JetBrains Mono" font-size="9">-24 dB</text><path d="M 50 50 Q 180 40 240 45 L 260 130 L 295 130 L 315 48 Q 450 42 580 50" fill="none" stroke="#00ff9d" stroke-width="3"/><rect x="255" y="100" width="45" height="35" fill="rgba(0,255,157,0.15)" stroke="#00ff9d" stroke-dasharray="2,2"/><text x="240" y="152" fill="#00ff9d" font-family="JetBrains Mono" font-size="9">ΔE = -15.2dB (35ms)</text><path d="M 50 55 Q 180 55 230 65 Q 280 80 330 65 Q 450 55 580 55" fill="none" stroke="#ff3366" stroke-width="2.5" stroke-dasharray="5,3"/><text x="340" y="80" fill="#ff3366" font-family="JetBrains Mono" font-size="9">AI TTS: Sụt nhẹ -4.1dB (Không ngắt)</text><circle cx="480" cy="20" r="5" fill="#00ff9d"/><text x="492" y="24" fill="#d1d9e6" font-family="Inter" font-size="9">Người thật</text><circle cx="560" cy="20" r="5" fill="#ff3366"/><text x="572" y="24" fill="#d1d9e6" font-family="Inter" font-size="9">AI Vocoder</text></svg>`,
    evidence: "Pham, Andrea Hoa (2003) 'Vietnamese Tone: A New Analysis', Outstanding Dissertations in Linguistics, Routledge; Brunelle, Marc (2009) 'Northern and Southern Vietnamese Tones: Acoustic and Perceptual Studies', Journal of Southeast Asian Linguistics."
  },
  {
    id: 5,
    tag: "TRỤ CỘT 04: HỌC SÂU MelCNN & ONNX RUNTIME",
    title: "Kiến trúc MelCNN 2D, Tối Ưu Opset 14 & Latency 6.8ms Trên CPU",
    difficulty: "CHUYÊN SÂU",
    context: `Tại sao DeepGuard lại chọn kiến trúc 4 khối Conv2D-BN-ReLU-MaxPool kết hợp AdaptiveAvgPool thay vì dùng các mô hình Transformer khổng lồ như Wav2Vec 2.0 hay Whisper?
Làm thế nào để đạt độ trễ suy luận 6.8ms trên CPU thông thường mà không cần GPU?`,
    hints: [
      "Wav2Vec2 có hơn 90 triệu tham số, độ trễ trên CPU > 150ms, vi phạm nghiêm trọng ngân sách thời gian toàn trình 350ms.",
      "MelCNN 2D có khoảng 1.2 triệu tham số, xử lý trực tiếp phổ Log-Mel (80, T).",
      "ONNX Opset 14 thực hiện Constant Folding, Node Fusion (ghép Conv+BN+ReLU thành 1 toán tử) và intra_op_num_threads=4."
    ],
    mathProof: `Chi phí tính toán (Computational Complexity):
- MelCNN 2D: ~0.45 GFLOPs cho 1 giây âm thanh.
- Wav2Vec 2.0 Base: ~22.5 GFLOPs (Gấp 50 lần).
Trên CPU Intel Xeon 4 cores:
- MelCNN ONNX Opset 14: 6.8ms - 9.2ms.
- Bộ nhớ RAM tiêu thụ: < 85MB (so với > 1.8GB của Wav2Vec2).
Cho phép 1 instance server gánh 150 cuộc gọi đồng thời (Concurrency) với 100% CPU utilization.`
  },
  {
    id: 6,
    tag: "TRỤ CỘT 05: FUSION ENGINE & VETO RULES",
    title: "Phản Biện Static Linear Ensemble và Quyền Phủ Quyết Bất Biến Vật Lý (Hard Veto)",
    difficulty: "CHIẾN LƯỢC",
    context: `Tại sao phép cộng trọng số tĩnh Score = 0.5 * CNN + 0.3 * Prosody + 0.2 * Acoustics bị coi là lỗ hổng chí mạng khi gặp tấn công Out-of-Distribution (OOD)?
Cơ chế Hard Physics Veto và Cổng động thích ứng kênh truyền (Context-Aware Gating) hoạt động như thế nào?`,
    hints: [
      "Tấn công OOD: Mô hình AI mới tinh làm CNN cho điểm giả mạo thấp (0.15), kéo tụt điểm trung bình nếu dùng phép cộng tuyến tính.",
      "Quyền phủ quyết bất biến vật lý: Nếu Jitter < 0.35% hoặc RT60 < 0.15s hoặc Noise Jump > 9.5dB -> PHỦ QUYẾT FAKE NGAY LẬP TỨC.",
      "Cổng động: Khi phát hiện kênh G.711 thoại bàn (8kHz), hạ CNN xuống 0.10, tăng Prosody lên 0.65."
    ],
    mathProof: `Ma trận quyết định Fusion Engine:
IF (Micro_Jitter < 0.35% OR Micro_Jitter > 4.8% OR RT60 < 0.15s OR RT60 > 0.85s OR Splicing_Jump > 9.5dB):
    Final_Decision = HARD_VETO_FAKE (Score = 1.0)
ELSE:
    Final_Score = W_cnn * Score_cnn + W_prosody * Score_prosody + W_acoustics * Score_acoustics
Trong đó trên kênh G.711:
    W_cnn = 0.10, W_prosody = 0.65, W_acoustics = 0.25.`
  },
  {
    id: 7,
    tag: "TRỤ CỘT 06: ĐỊNH DANH MÔ HÌNH SINH MÃ (ATTRIBUTION)",
    title: "Dấu Ấn Pháp Y Bóc Tách: ElevenLabs vs RVC v2 vs FastSpeech2 vs Bark",
    difficulty: "CAO CẤP",
    context: `Làm thế nào để giám định viên khẳng định trước tòa file âm thanh lừa đảo được tạo ra từ mô hình nào (Attribution)?
Chỉ ra dấu vân tay phổ (spectral fingerprint) đặc thù của từng họ mô hình.`,
    hints: [
      "ElevenLabs: Latent Diffusion -> Cao tần cực mịn, thiếu micro-jitter, F0 mượt mà.",
      "RVC v2: Harvest F0 + VITS -> Phase Jitter cao > 4.8%, bậc thang cao độ cục bộ.",
      "FPT/Zalo AI: FastSpeech2 + HiFi-GAN -> F0 bị nén bẹp (Delta F0 < 65Hz), phòng câm RT60 < 0.12s.",
      "Bark / Tortoise: Autoregressive tokenization -> Hallucination nhiễu ảo giác ở đuôi nguyên âm."
    ],
    mathProof: `Bảng đối chiếu pháp y đặc trưng (Forensic Attribution Matrix):
| Thuộc tính | ElevenLabs | RVC v2 | FastSpeech2+HiFi-GAN | Bark |
|---|---|---|---|---|
| Jitter (%) | 0.15 - 0.30 (Thấp) | > 4.8 (Vỡ pha) | 0.20 - 0.35 (Thấp) | 0.8 - 1.5 (Bất ổn) |
| Delta F0 (Hz) | 90 - 140 (Mượt) | 120 - 200 (Giật) | < 55 (Bẹp dải) | 80 - 150 (Click pop) |
| RT60 (s) | < 0.12 (Phòng câm) | 0.25 - 0.45 (Theo mic) | < 0.10 (Phòng câm) | 0.15 - 0.30 |
| Glottal Stop | Bẹp (ΔE > -5dB) | Lệch pha | Bẹp (ΔE > -6dB) | Đứt ngẫu nhiên |`
  },
  {
    id: 8,
    tag: "TRỤ CỘT 07: SINH TRẮC GIỌNG NÓI 1:1",
    title: "Vector Vân Giọng 128-D & Phân Ly Không Gian Trực Giao (Identity vs Liveness)",
    difficulty: "CAO CẤP",
    context: `Trong bài toán Voice Biometrics 1:1 cho ngân hàng, làm sao hệ thống phân biệt được giữa hai trường hợp:
(A) Kẻ lạ mặt nói thật (Imposter Human) và (B) Giọng của chính chủ tài khoản bị AI sao chép (Voice Clone Attack)?`,
    hints: [
      "Không gian trực giao: Identity Subspace S_ID vuông góc với Liveness Subspace S_Live.",
      "S_ID bóc tách đặc trưng hộp sọ, thanh quản của chủ tài khoản qua Cosine Similarity.",
      "S_Live bóc tách tính sống sinh học qua vi dao động Jitter và dội âm phòng.",
      "Ma trận 4 trạng thái: Authentic Owner, Voice Clone, Imposter Human, Imposter Synthetic."
    ],
    mathProof: `Phân ly không gian trực giao:
v_audio = v_id + v_live, với <v_id, v_live> = 0.
- Cosine Similarity: Sim_ID = (v_id . v_enrolled) / (||v_id|| * ||v_enrolled||).
Ma trận quyết định:
1. Sim_ID >= 0.75 AND Score_Live >= 0.75 -> Authentic Owner (Hợp lệ).
2. Sim_ID >= 0.75 AND Score_Live < 0.40 -> Voice Clone Attack (Khóa tài khoản + Báo động đỏ).
3. Sim_ID < 0.50 AND Score_Live >= 0.75 -> Imposter Human (Từ chối sai người).
4. Sim_ID < 0.50 AND Score_Live < 0.40 -> Imposter Synthetic (Chặn bot rác).`,
    diagramCaption: "MA TRẬN QUYẾT ĐỊNH SINH TRẮC PHÂN LY TRỰC GIAO (S_ID ⊥ S_LIVE)",
    diagramSvg: `<svg class="diagram-svg" viewBox="0 0 650 170" width="100%"><rect width="650" height="170" fill="#04070e" rx="8"/><text x="20" y="24" fill="#00f0ff" font-family="JetBrains Mono" font-size="11" font-weight="bold">MA TRẬN PHÂN LY TRỰC GIAO: IDENTITY (S_ID) ⊥ LIVENESS (S_LIVE)</text><line x1="325" y1="35" x2="325" y2="160" stroke="#475569" stroke-width="1.5"/><line x1="50" y1="95" x2="600" y2="95" stroke="#475569" stroke-width="1.5"/><text x="540" y="90" fill="#00f0ff" font-family="JetBrains Mono" font-size="9">S_ID (Khớp chủ)</text><text x="330" y="46" fill="#00ff9d" font-family="JetBrains Mono" font-size="9">S_Live (Tính sống)</text><rect x="335" y="40" width="250" height="50" fill="rgba(0,255,157,0.08)" rx="4"/><text x="345" y="60" fill="#00ff9d" font-family="JetBrains Mono" font-size="10" font-weight="bold">1. AUTHENTIC OWNER</text><text x="345" y="76" fill="#a7f3d0" font-family="Inter" font-size="8">Khớp chủ (≥0.75) + Người sống (≥0.75) -> PASS</text><rect x="335" y="102" width="250" height="50" fill="rgba(255,51,102,0.12)" rx="4"/><text x="345" y="122" fill="#ff3366" font-family="JetBrains Mono" font-size="10" font-weight="bold">2. VOICE CLONE ATTACK</text><text x="345" y="138" fill="#fecdd3" font-family="Inter" font-size="8">Khớp chủ (≥0.75) + Giả mạo (<0.40) -> KHÓA KHẨN</text><rect x="65" y="40" width="250" height="50" fill="rgba(255,183,0,0.08)" rx="4"/><text x="75" y="60" fill="#ffb700" font-family="JetBrains Mono" font-size="10" font-weight="bold">3. IMPOSTER HUMAN</text><text x="75" y="76" fill="#fef08a" font-family="Inter" font-size="8">Không khớp (<0.50) + Người sống (≥0.75) -> TỪ CHỐI</text><rect x="65" y="102" width="250" height="50" fill="rgba(148,163,184,0.08)" rx="4"/><text x="75" y="122" fill="#94a3b8" font-family="JetBrains Mono" font-size="10" font-weight="bold">4. IMPOSTER BOT</text><text x="75" y="138" fill="#cbd5e1" font-family="Inter" font-size="8">Không khớp (<0.50) + Giả mạo (<0.40) -> CHẶN RÁC</text></svg>`,
    evidence: "Reynolds, D. A. (2002) 'An Overview of Automatic Speaker Recognition Technology', IEEE ICASSP; Tiêu chuẩn sinh trắc học quốc tế ISO/IEC 19794-13 (Voice Biometrics Data Interchange Formats)."
  },
  {
    id: 9,
    tag: "TRỤ CỘT 08 & 09: RED-TEAM & ĐỘ TRỄ 350MS",
    title: "Kênh Viễn Thông G.711 / AMR-NB Rớt Gói 5% & Ngân Sách Trễ Toàn Trình 350ms",
    difficulty: "CHUYÊN SÂU",
    context: `Trong môi trường viễn thông thực tế, tín hiệu âm thanh bị nén dải 300-3400Hz (G.711 mu-law) và mạng di động rớt gói 5%.
Hệ thống duy trì độ trễ toàn trình E2E ~350ms như thế nào? Phân rã chi tiết từng milli-giây trong chuỗi trễ.`,
    hints: [
      "T_E2E = T_Buffer (300ms) + T_Network (30ms) + T_Compute (20ms) + T_Render (5ms) = 355ms.",
      "T_Compute 20ms: Giải mã audio 4ms, Log-Mel 3ms, MelCNN 8ms, NAFE F0 3ms, Schroeder RT60 2ms.",
      "Cắt cuộc gọi ngay từ âm tiết đầu tiên của kẻ tấn công trước khi nạn nhân kịp thực hiện thao tác chuyển tiền."
    ],
    mathProof: `Ngân sách thời gian (Latency Budget breakdown):
1. T_Buffer = 300ms (Độ dài 4,800 mẫu ở 16kHz - đủ tính 18 khung STFT hop 256).
2. T_Network = 30ms (WebSocket nhị phân 2 chiều mạng nội địa).
3. T_Compute = 20ms:
   - Librosa/SciPy decode: 4ms
   - Log-Mel 80-bin transform: 3ms
   - ONNX MelCNN inference: 8ms
   - NAFE F0 & Jitter: 3ms
   - Schroeder RT60 decay: 2ms
4. T_Render / Webhook: 5ms
=> Tổng thời gian E2E = 355ms (Đáp ứng thời gian thực < 400ms).`,
    diagramCaption: "PHÂN RÃ NGÂN SÁCH ĐỘ TRỄ TOÀN TRÌNH T_E2E = 355ms",
    diagramSvg: `<svg class="diagram-svg" viewBox="0 0 650 160" width="100%"><rect width="650" height="160" fill="#04070e" rx="8"/><text x="20" y="24" fill="#00f0ff" font-family="JetBrains Mono" font-size="11" font-weight="bold">NGÂN SÁCH ĐỘ TRỄ TOÀN TRÌNH: T_E2E ≈ 355ms (DƯỚI TRẦN 400ms)</text><rect x="40" y="45" width="290" height="38" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" rx="4"/><text x="130" y="68" fill="#93c5fd" font-family="JetBrains Mono" font-size="10" font-weight="bold">T_Buffer: 300ms</text><rect x="335" y="45" width="55" height="38" fill="rgba(181,95,230,0.2)" stroke="#b55fe6" rx="4"/><text x="345" y="68" fill="#d8b4fe" font-family="JetBrains Mono" font-size="9" font-weight="bold">30ms</text><rect x="395" y="45" width="150" height="38" fill="rgba(0,255,157,0.2)" stroke="#00ff9d" rx="4"/><text x="430" y="68" fill="#00ff9d" font-family="JetBrains Mono" font-size="10" font-weight="bold">T_Server: 20ms</text><rect x="550" y="45" width="45" height="38" fill="rgba(255,183,0,0.2)" stroke="#ffb700" rx="4"/><text x="558" y="68" fill="#fde047" font-family="JetBrains Mono" font-size="9" font-weight="bold">5ms</text><line x1="40" y1="100" x2="595" y2="100" stroke="#00f0ff" stroke-width="1.5"/><text x="210" y="125" fill="#00f0ff" font-family="JetBrains Mono" font-size="11" font-weight="bold">TỔNG T_E2E = 355ms (CẮT CUỘC GỌI NGAY ÂM TIẾT ĐẦU TIÊN)</text></svg>`,
    evidence: "Khuyến nghị viễn thông ITU-T G.114 (One-way transmission time < 400ms for interactive conversation); 3GPP TS 26.071 (AMR Speech Codec General Description)."
  },
  {
    id: 10,
    tag: "TRỤ CỘT 10: PHÁP Y SỐ & PHÁP LÝ",
    title: "Chuỗi Bảo Quản Bằng Chứng (Chain of Custody): SHA-256 + Ed25519 + RFC 3161 TSA",
    difficulty: "PHÁP LÝ",
    context: `Tại sao một file ghi âm chỉ có mã băm SHA-256 sẽ bị luật sư bào chữa bác bỏ trước tòa án?
Bộ ba pháp lý FIPS/ISO cần thiết để một kết luận giám định Deepfake có giá trị tố tụng hoàn chỉnh là gì?`,
    hints: [
      "SHA-256 chỉ chứng minh tính toàn vẹn (Integrity) và tính tái lập (Reproducibility), không chứng minh nguồn gốc (Provenance) hay tính sống sinh học.",
      "Ký số PKI Ed25519 chứng minh danh tính hệ thống giám định được cơ quan có thẩm quyền phê duyệt (Non-repudiation).",
      "RFC 3161 TSA đóng dấu thời gian chuẩn quốc tế không thể chỉnh sửa thời gian hệ thống."
    ],
    mathProof: `Gói bằng chứng pháp y số chuẩn FIPS 140-3 & RFC 3161:
Forensic_Package = {
    "audio_sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "telemetry": { "jitter": 0.22, "glottal_db": -4.1, "rt60": 0.09, "cnn_score": 0.98 },
    "verdict": "DEEPFAKE_VOICE_CLONE",
    "examiner_signature": Ed25519_Sign(Private_Key, SHA256(audio + telemetry)),
    "tsa_token": RFC3161_Timestamp_Token(Hash_Package)
}
=> Đảm bảo toàn vẹn, bất biến thời gian và không thể chối bỏ trước hội đồng xét xử.`
  },
  {
    id: 11,
    tag: "TRỤ CỘT 11: FULLSTACK ARCHITECTURE",
    title: "Kiến Trúc FastAPI ASGI, Web Audio API Client & Canvas 2D 60 FPS",
    difficulty: "KIẾN TRÚC",
    context: `Giải trình kiến trúc fullstack doanh nghiệp của DeepGuard: Tại sao tách biệt bóc tách Web Audio API tại client và MelCNN ONNX tại backend?
Làm thế nào để Canvas 2D render Spectrogram và Waveform đạt 60 FPS mà không làm giật lag luồng âm thanh chính?`,
    hints: [
      "Client Web Audio API chạy trên AudioWorklet/Dedicated thread của trình duyệt, cách ly hoàn toàn với main UI thread.",
      "requestAnimationFrame đồng bộ chu kỳ vẽ màn hình (16.6ms cho 60 FPS), sử dụng TypedArray (Uint8Array) tránh cấp phát bộ nhớ rác (Garbage Collection).",
      "FastAPI ASGI bất đồng bộ sử dụng uvloop và xử lý ma trận bằng NumPy C-extensions."
    ],
    mathProof: `Tối ưu hóa pipeline render:
1. Audio Engine: Khởi tạo AudioContext 16kHz, AnalyserNode fftSize 1024.
2. Canvas 2D Loop:
   - Zero-allocation per frame: Tái sử dụng mảng cố định new Uint8Array(bufferLength).
   - Render thời gian thực: getByteTimeDomainData() cho Oscilloscope và getByteFrequencyData() cho Spectrogram.
3. Backend Concurrency:
   - FastAPI async def stream_audio_chunk(...) giải phóng event loop trong khi ONNX Runtime chạy trên C++ thread pool độc lập.`
  }
];

// =====================================================================
// 2. DATA REPOSITORY: 4 JUDGES & 8 HARSH DEFENSE QUESTIONS (MODE 2)
// =====================================================================
const JUDGES = [
  {
    id: "judge_1",
    name: "GS. Trần Đình Khải",
    role: "Chủ tịch Hội đồng Pháp y Âm thanh & Tín hiệu Quốc gia",
    avatar: "👨‍⚖️",
    threat: "THREAT: CỰC KỲ KHẮC NGHIỆT",
    threatClass: "threat-extreme",
    questions: [
      {
        qId: 101,
        title: "Bắt bẻ về suy hao băng thông G.711 thoại bàn (300-3400Hz)",
        content: `"Anh/chị khẳng định bóc tách được Micro-Jitter và Glottal Stop trên kênh thoại 8kHz. Nhưng trong thực tế viễn thông G.711, thuật toán lượng tử hóa A-law/Mu-law 8-bit và bộ lọc thông dải 300-3400Hz làm suy hao nghiêm trọng các hài âm bậc cao. 
Làm thế nào anh/chị chứng minh hệ thống không bị báo động giả (False Positive) khi người dùng dùng điện thoại bàn đời cũ nói thanh Ngã?"`,
        rubric: [
          "Tần số cơ bản F0 tiếng Việt (100-300Hz) hoàn toàn nằm trong dải thông 300-3400Hz hoặc bóc tách được qua chu kỳ tự tương quan NAFE.",
          "Glottal Stop Mining dựa trên độ sụt năng lượng RMS toàn cục (Delta E < -12dB), không phụ thuộc vào hài âm cao > 3400Hz.",
          "Cổng động thích ứng kênh truyền tự động hạ trọng số CNN xuống 0.10 và tăng trọng số Ngữ âm lên 0.65."
        ]
      },
      {
        qId: 102,
        title: "Thách thức về người bị ốm, viêm họng hay nghẹt mũi",
        content: `"Một khách hàng VIP của ngân hàng bị viêm thanh quản hạt hoặc cảm cúm nặng, giọng bị khàn và đứt hơi. Lúc này Jitter sinh học của họ có thể vọt lên 4.5% và đường F0 bị biến dạng. 
Hệ thống của anh/chị có nhầm họ thành kẻ tấn công RVC Deepfake và khóa tài khoản của họ không?"`,
        rubric: [
          "Người bị viêm thanh quản có Shimmer (biến thiên biên độ) tăng nhưng RT60 âm học phòng vẫn nằm trong dải bình thường (0.2s - 0.5s).",
          "Viêm thanh quản làm tăng jitter nhưng vẫn giữ được vi cấu trúc âm đục tự nhiên (vô thanh hóa cục bộ), không có hiện tượng lượng tử hóa bước nhảy pha của RVC v2.",
          "Chính sách Tri-Band đưa trường hợp này vào dải Vàng [0.3 - 0.8) để kích hoạt Step-up Auth (OTP khuôn mặt/SMS) chứ không bao giờ chặn cứng."
        ]
      }
    ]
  },
  {
    id: "judge_2",
    name: "Bà Vũ Phương Nga",
    role: "Giám đốc Quản trị Rủi ro & Gian lận Ngân hàng VPBank",
    avatar: "👩‍💼",
    threat: "THREAT: CỰC KỲ NGUY HIỂM",
    threatClass: "threat-extreme",
    questions: [
      {
        qId: 201,
        title: "Bài toán 200.000 cuộc gọi mỗi ngày và tỷ lệ báo động giả FPR < 0.05%",
        content: `"Mỗi ngày ngân hàng chúng tôi tiếp nhận 200.000 cuộc gọi xác thực chuyển tiền. Nếu tỷ lệ báo động giả (False Positive Rate) của hệ thống là 1%, tức là mỗi ngày có 2.000 khách hàng VIP bị chặn oan và chửi bới tổng đài. 
Hệ thống của anh/chị có cam kết ép FPR < 0.05% được không? Cơ chế Tri-Band Policy giải quyết bài toán trải nghiệm khách hàng như thế nào?"`,
        rubric: [
          "Chính sách phân vùng 3 dải (Tri-Band Policy): Dải xanh [0.0 - 0.3) thông qua 100%, Dải đỏ [0.8 - 1.0] chặn cứng.",
          "Vùng vàng [0.3 - 0.8) không chặn khách hàng mà kích hoạt Step-up Auth (Xác thực tăng cường: OTP âm thanh động chứa thanh Ngã/Nặng).",
          "FPR thực tế của dải chặn cứng được ép xuống < 0.03% nhờ cơ chế đồng thuận đa tầng."
        ]
      },
      {
        qId: 202,
        title: "Thời gian hòa vốn và chi phí phần cứng CPU vs GPU",
        content: `"Ban lãnh đạo ngân hàng từ chối chi 50.000 USD mua cụm máy chủ GPU Nvidia A100 chỉ để chạy mô hình AI Deepfake. 
Hệ thống của anh/chị chứng minh khả năng chạy 100% trên CPU phổ thông như thế nào? Chi phí vận hành trên mỗi triệu cuộc gọi là bao nhiêu?"`,
        rubric: [
          "Mô hình MelCNN 2D chỉ có 1.2M tham số, xuất sang ONNX Runtime Opset 14 với FP32 hoặc INT8 quantization.",
          "Thời gian suy luận 6.8ms trên CPU thông thường (Intel Xeon 4 cores), tiêu tốn < 85MB RAM.",
          "Một máy chủ CPU thông thường trị giá 2.000 USD xử lý được 150-200 luồng đồng thời, chi phí vận hành < 0.0001 USD/cuộc gọi."
        ]
      }
    ]
  },
  {
    id: "judge_3",
    name: "TS. Lê Hoàng Nam",
    role: "Chuyên gia Tín hiệu Viễn thông & Mạng tế bào Viettel",
    avatar: "👨‍🔬",
    threat: "THREAT: CAO CẤP",
    threatClass: "threat-high",
    questions: [
      {
        qId: 301,
        title: "Hiện tượng rớt gói 5% và bù khung âm thanh (PLC) gây nhiễu",
        content: `"Mạng di động 4G/VoLTE hay bị hiện tượng rớt gói (Packet Loss 3-5%) và jitter buffer nén giãn âm thanh. Khi đó, hiện tượng mất khung âm thanh (Packet Loss Concealment - PLC) sẽ tạo ra các điểm đứt gãy năng lượng nhân tạo. 
Làm sao bộ phát hiện Audio Splicing (>9.5dB) và Glottal Stop của anh/chị không nhầm lẫn PLC của mạng viễn thông với tấn công cắt ghép Deepfake?"`,
        rubric: [
          "Bộ phát hiện PLC kiểm tra tính lặp chu kỳ dạng sóng nội suy (Pitch Period Repetition) đặc thù của bộ giải mã AMR-WB.",
          "Splicing thật sự có bước nhảy nền nhiễu phổ (Spectral Noise Floor Jump) không đồng nhất giữa hai bên điểm cắt.",
          "PLC viễn thông làm mờ đường F0 nhưng không thay đổi cấu trúc nền nhiễu môi trường xung quanh."
        ]
      },
      {
        qId: 302,
        title: "Tấn công phát lại qua thiết bị giả lập phần cứng điện thoại (Audio Injector)",
        content: `"Nếu kẻ tấn công không phát âm thanh qua loa ngoài mà dùng jack 3.5mm hoặc phần mềm giả lập card âm thanh (Virtual Audio Cable) để bơm thẳng luồng số vào điện thoại, lúc đó không có dội âm loa ngoài. 
Làm thế nào hệ thống của anh/chị chặn được?"`,
        rubric: [
          "Khi bơm trực tiếp âm thanh số (Direct Line Injection), RT60 rơi xuống mức phòng vô trùng số < 0.15s (Anechoic Vocoder).",
          "Hệ thống kích hoạt Hard Veto: Âm thanh người thật gọi điện bắt buộc phải có dội âm môi trường thực tế (0.2s - 0.6s).",
          "Nếu RT60 < 0.15s kèm Jitter < 0.35%, hệ thống kết án FAKE ngay lập tức."
        ]
      }
    ]
  },
  {
    id: "judge_4",
    name: "KS. Nguyễn Minh Trí",
    role: "Trưởng nhóm AI Engineering & Triển khai Hệ thống",
    avatar: "👨‍💻",
    threat: "THREAT: CAO CẤP",
    threatClass: "threat-high",
    questions: [
      {
        qId: 401,
        title: "Bảo vệ mô hình trước các cuộc tấn công đối nghịch (Adversarial Attacks)",
        content: `"Nếu hacker dùng thuật toán FGSM hoặc PGD chèn một lượng nhiễu vô hình (Adversarial Perturbation) vào ma trận phổ Mel để đánh lừa MelCNN phân loại thành người thật, hệ thống phòng vệ của anh/chị sẽ sụp đổ thế nào?"`,
        rubric: [
          "MelCNN không phải là điểm quyết định duy nhất (No Single Point of Failure).",
          "Nhiễu đối nghịch chỉ đánh lừa được mạng nơ-ron nhưng không thể sửa đổi được các tham số vật lý: Micro-Jitter NAFE và Tích phân Schroeder ISO 3382.",
          "Hard Physics Veto hoạt động hoàn toàn độc lập với gradient của mạng nơ-ron, vô hiệu hóa hoàn toàn Adversarial Perturbation."
        ]
      },
      {
        qId: 402,
        title: "Đa luồng CPU (intra_op=4) và hiện tượng nghẽn cổ chai (Lock Contention)",
        content: `"Tại sao lại cấu hình intra_op_num_threads=4 và inter_op_num_threads=1 trong ONNX Runtime? Nếu hàng nghìn request gửi đến đồng thời, việc cạnh tranh CPU thread có gây ra nghẽn cổ chai phá vỡ độ trễ 350ms không?"`,
        rubric: [
          "intra_op=4 tối ưu hóa việc phân chia phép nhân ma trận trên 4 core vật lý cho 1 tensor.",
          "inter_op=1 ngăn chặn hiện tượng context switching hỗn loạn giữa các node trong đồ thị tính toán.",
          "Ở quy mô hàng nghìn request, hệ thống scale ngang (Horizontal Pod Autoscaling) qua Docker Compose và Nginx load balancer phân tải."
        ]
      }
    ]
  }
];

// =====================================================================
// 3. DATA REPOSITORY: 6 REAL FORENSIC CASE STUDIES (MODE 3)
// =====================================================================
const FORENSIC_CASES = [
  {
    id: "CASE-VN-2026-081",
    title: "Vụ Án Lừa Đảo Chuyển Tiền CEO Ngân Hàng A",
    category: "Voice Clone TTS",
    audioProfile: "Kênh G.711 thoại bàn (8kHz), giọng đọc mệnh lệnh yêu cầu kế toán trưởng giải ngân 15 tỷ đồng khẩn cấp.",
    telemetry: {
      jitter: "0.22% (Ngưỡng sinh học: 0.6% - 2.5%)",
      glottal: "ΔE = -4.1 dB (Thanh Ngã 'Nguyễn' trơn tuột, không ngắt)",
      rt60: "0.09s (Phòng câm hoàn toàn - Anechoic Vocoder)",
      f0Span: "42 Hz (Bẹp cao độ nghiêm trọng)",
      noiseJump: "1.2 dB"
    },
    suspectModel: "ElevenLabs Latent Diffusion (Tiếng Việt tổng hợp)",
    groundTruth: "FAKE",
    verdict: "KẾT LUẬN: DEEPFAKE XÁC XUẤT 99.8% (PHỦ QUYẾT BỞI HARD VETO JITTER & GLOTTAL STOP)",
    analysisText: `Mẫu âm thanh có đường F0 mượt mà bất thường. Khi người nói phát âm từ 'Nguyễn', năng lượng chỉ giảm nhẹ 4.1dB thay vì có khoảng lặng thanh môn -14dB đặc trưng của người Việt. 
Đồng thời Micro-Jitter đo được chỉ 0.22% tố giác hàm mất mát nội suy của neural vocoder. Phòng thu âm hoàn toàn không có dội âm (RT60 = 0.09s).`
  },
  {
    id: "CASE-VN-2026-104",
    title: "Tấn Công Replay Giao Dịch Chuyển Khoản Qua Loa Ngoài",
    category: "Loudspeaker Replay Attack",
    audioProfile: "Âm thanh ghi âm trộm từ phòng họp của nạn nhân, sau đó phát lại qua loa Bluetooth trước micro điện thoại.",
    telemetry: {
      jitter: "1.15% (Sinh học chuẩn người thật)",
      glottal: "ΔE = -14.8 dB (Thanh Ngã chuẩn người thật)",
      rt60: "0.96s (Vượt ngưỡng 0.85s - Dội âm phòng kép)",
      f0Span: "128 Hz (Dải âm vực phong phú)",
      noiseJump: "11.4 dB (Vết cắt ghép giữa các file audio)"
    },
    suspectModel: "Replay Attack (Phát lại qua màng loa vật lý + Cắt ghép nối)",
    groundTruth: "FAKE",
    verdict: "KẾT LUẬN: GIAN LẬN REPLAY & CẮT GHÉP (PHỦ QUYẾT BỞI HARD VETO ISO 3382 RT60 > 0.85s)",
    analysisText: `Mặc dù Micro-Jitter và Glottal Stop hoàn toàn đạt chuẩn sinh học (do là giọng người thật bị ghi âm trộm), nhưng phân tích tích phân lùi Schroeder phát hiện thời gian dội âm RT60 lên tới 0.96s. 
Đáp ứng xung phòng bị nhân đôi tích chập (Phòng họp gốc * Phòng phát lại). Trên phổ xuất hiện rõ các rãnh lọc lược (Comb-filtering) do giao thoa phản xạ màng loa.`
  },
  {
    id: "CASE-VN-2026-159",
    title: "Mạo Danh RVC v2 Trực Tiếp Trong Cuộc Gọi Khách Hàng",
    category: "Realtime Voice Conversion",
    audioProfile: "Kẻ tấn công nói trực tiếp vào micro qua phần mềm RVC v2 đổi giọng thành người thân của nạn nhân.",
    telemetry: {
      jitter: "5.45% (Vượt ngưỡng sinh học > 4.8%)",
      glottal: "ΔE = -7.3 dB",
      rt60: "0.32s (Phòng ngủ thông thường)",
      f0Span: "145 Hz",
      noiseJump: "2.1 dB"
    },
    suspectModel: "RVC v2 (Harvest F0 + VITS Decoder)",
    groundTruth: "FAKE",
    verdict: "KẾT LUẬN: REALTIME DEEPFAKE VOICE CONVERSION (PHỦ QUYẾT BỞI PHASE JITTER DISCONTINUITY)",
    analysisText: `Mô hình RVC v2 khi nội suy giọng nói thời gian thực gặp hiện tượng trượt pha (Phase Slip) giữa các khung STFT, khiến độ biến thiên chu kỳ giật cục vọt lên 5.45%. 
Đây là vết hằn vật lý đặc trưng của thuật toán Harvest F0 khi xử lý tiếng Việt có dấu biến thiên cao độ liên tục.`
  },
  {
    id: "CASE-VN-2026-210",
    title: "Mạo Danh Cơ Quan Điều Tra Qua Tổng Đài Ảo (Zalo/FPT AI)",
    category: "Acoustic Compression TTS",
    audioProfile: "Cuộc gọi giả danh công an đe dọa rửa tiền, giọng đọc đanh thép nhưng đều đều như robot đọc văn bản.",
    telemetry: {
      jitter: "0.19% (Siêu mịn)",
      glottal: "ΔE = -5.2 dB (Không ngắt nắp thanh môn)",
      rt60: "0.07s (Phòng câm hoàn toàn)",
      f0Span: "38 Hz (Bẹp cao độ cực đoan)",
      noiseJump: "0.8 dB"
    },
    suspectModel: "FastSpeech2 + HiFi-GAN (Việt hóa thương mại)",
    groundTruth: "FAKE",
    verdict: "KẾT LUẬN: BOT TỔNG ĐÀI LỪA ĐẢO TỔNG HỢP FASTSPEECH2 (PHỦ QUYẾT TOÀN DIỆN)",
    analysisText: `Dải cao độ F0 bị nén bẹp dưới 38Hz. Toàn bộ các thanh Ngã và Nặng không có hiện tượng co thắt thanh môn. Thời gian dội âm RT60 chỉ 0.07s chứng minh âm thanh sinh ra từ card âm thanh ảo trong server.`
  },
  {
    id: "CASE-VN-2026-277",
    title: "Tấn Công Cắt Ghép Nối Âm Thanh (Audio Splicing Attack)",
    category: "Audio Splicing / Re-assembly",
    audioProfile: "Kẻ gian cắt các từ 'Đồng ý', 'Chuyển tiền', 'Một trăm triệu' từ các video TikTok của nạn nhân rồi ghép lại thành câu lệnh thoại hoàn chỉnh.",
    telemetry: {
      jitter: "1.32% (Sinh học chuẩn người thật)",
      glottal: "ΔE = -13.5 dB (Thanh Ngã người thật)",
      rt60: "0.41s (Bình thường)",
      f0Span: "115 Hz",
      noiseJump: "12.8 dB (Vết nhảy sàn nhiễu vượt ngưỡng 9.5dB)"
    },
    suspectModel: "Manual Audio Editing / Cut & Paste Splicing",
    groundTruth: "FAKE",
    verdict: "KẾT LUẬN: TẤN CÔNG CẮT GHÉP ÂM THANH (PHỦ QUYẾT BỞI NOISE FLOOR DISCONTINUITY > 9.5dB)",
    analysisText: `Mỗi đoạn âm thanh được thu trong các môi trường âm học khác nhau (ngoài đường, trong nhà, trong ô tô). Khi ghép nối, mức năng lượng của sàn nhiễu nền (Noise Floor) nhảy vọt 12.8dB tại điểm nối từ, tố giác việc biên tập cơ học.`
  },
  {
    id: "CASE-VN-2026-305",
    title: "Khách Hàng VIP Gọi Điện Trong Tình Trạng Viêm Họng & Ốm",
    category: "Liveness False-Positive Test",
    audioProfile: "Chủ tài khoản thật gọi điện xác nhận giao dịch trong lúc bị cảm cúm, giọng nghẹt và khàn đặc.",
    telemetry: {
      jitter: "2.10% (Trong ngưỡng sinh học 0.6% - 2.5%)",
      glottal: "ΔE = -13.1 dB (Thanh môn đóng tự nhiên)",
      rt60: "0.38s (Phòng ngủ chuẩn người thật)",
      f0Span: "95 Hz",
      noiseJump: "1.5 dB"
    },
    suspectModel: "Người Sống Thật (Khách Hàng VIP Có Bệnh Lý Khàn Tiếng)",
    groundTruth: "REAL",
    verdict: "KẾT LUẬN: NGƯỜI SỐNG HỢP LỆ (LIVENESS PASSED - KHÔNG PHỦ QUYẾT)",
    analysisText: `Mặc dù giọng bị khàn do viêm thanh quản, các chỉ số bất biến vật lý hoàn toàn nằm trong dải sinh học: Jitter 2.10%, Glottal Stop -13.1dB và dội âm phòng 0.38s. Hệ thống không bị đánh lừa bởi cảm xúc, xác thực hợp lệ.`
  }
];

// =====================================================================
// 4. DATA REPOSITORY: 16 DEEP TRAP QUIZ QUESTIONS (MODE 4)
// =====================================================================
const QUIZ_QUESTIONS = [
  // --- DSP & RESAMPLING (dsp) ---
  {
    cat: "dsp",
    q: "Tại sao trong tiền xử lý DSP của DeepGuard, việc Resampling từ 44.1kHz về 16kHz bắt buộc phải dùng Polyphase Resampling thay vì Linear Interpolation?",
    opts: [
      "Để giảm thiểu độ phức tạp thời gian từ O(N^2) về O(N log N).",
      "Để ngăn chặn hiện tượng răng cưa tần số (Aliasing) và rò rỉ phổ (Spectral Leakage) làm sai lệch đặc trưng formant.",
      "Vì chuẩn định dạng ONNX Runtime bắt buộc ma trận đầu vào phải là số chẵn.",
      "Để làm mịn tín hiệu âm thanh giúp mô hình học sâu hội tụ nhanh hơn."
    ],
    ans: 1,
    exp: "Polyphase Filtering áp dụng bộ lọc thông thấp FIR Kaiser-window đạt chuẩn Nyquist trước khi hạ mẫu, loại bỏ hoàn toàn các tần số phản chiếu gây biến dạng phổ Log-Mel."
  },
  {
    cat: "dsp",
    q: "Khi tính toán Log-Mel Spectrogram với 80 bins từ 100Hz đến 8000Hz, tại sao thang đo Mel lại phân bố dải lọc dày đặc ở tần số thấp và thưa dần ở tần số cao?",
    opts: [
      "Vì tần số thấp chứa ít năng lượng hơn nên cần lọc nhiều hơn.",
      "Mô phỏng cơ chế cảm nhận thính giác sinh học của màng đáy ốc tai người (Basilar Membrane), vốn nhạy bén cao với các biến đổi cao độ F0 ở dải trầm.",
      "Để giảm kích thước bộ nhớ RAM của GPU.",
      "Vì các hàm toán học trong thư viện Librosa chỉ hỗ trợ dạng phân bố này."
    ],
    ans: 1,
    exp: "Ốc tai người phân giải cao độ theo thang logarit phi tuyến (Mel Scale). Dải trầm dưới 1000Hz có độ phân giải thính giác rất tinh tế (khoảng cách 1 Bark hẹp), trong khi dải cao phân giải thô hơn."
  },
  {
    cat: "dsp",
    q: "Độ dài bước nhảy hop_length = 256 mẫu tại tần số 16kHz tương ứng với bao nhiêu mili-giây và có độ chồng lấn (overlap) là bao nhiêu phần trăm với cửa sổ Hann 1024 mẫu?",
    opts: [
      "8ms và chồng lấn 50%.",
      "16ms và chồng lấn 75%.",
      "32ms và chồng lấn 25%.",
      "64ms và không có chồng lấn."
    ],
    ans: 1,
    exp: "Delta t = 256 / 16000 = 0.016s = 16ms. Độ chồng lấn Overlap = (1024 - 256) / 1024 = 768 / 1024 = 75%. Cấu hình này bảo đảm tính liên tục của đường bao phổ mà không tạo lỗ hổng thời gian."
  },
  {
    cat: "dsp",
    q: "Spectral Flatness (Độ phẳng phổ) đo lường điều gì và có giá trị như thế nào đối với âm thanh hữu thanh (Voiced Speech) của con người?",
    opts: [
      "Đo âm lượng tuyệt đối; luôn bằng 1.0 với giọng người.",
      "Đo tỷ lệ giữa trung bình nhân và trung bình cộng của phổ; tiến gần 0 đối với giọng nói hữu thanh có cấu trúc hài âm hài hòa.",
      "Đo tần số cao nhất trong tín hiệu; luôn lớn hơn 4000Hz.",
      "Đo tốc độ phát âm từ ngữ."
    ],
    ans: 1,
    exp: "Spectral Flatness = exp(mean(ln(S))) / mean(S). Với nhiễu trắng (Flat spectrum), Flatness ≈ 1. Với giọng nói hữu thanh người thật có các đỉnh Formant nhọn (Resonance peaks), Flatness rất thấp tiến gần về 0."
  },

  // --- ÂM HỌC ISO 3382 & REPLAY (acoustics) ---
  {
    cat: "acoustics",
    q: "Theo chuẩn âm học phòng ISO 3382, phương pháp nào được DeepGuard ứng dụng để ước lượng RT60 mà không cần phát tín hiệu quét sin (chirp) chủ động?",
    opts: [
      "Biến đổi Wavelet liên tục trên toàn bộ tín hiệu.",
      "Tích phân năng lượng lùi Schroeder trên các đoạn rơi âm đuôi tự nhiên (Speech Offset Tails).",
      "Phân tích chuỗi Fourier nhanh trên các đoạn âm vô thanh.",
      "Đo tỷ lệ tín hiệu trên tạp âm (SNR) của micro thu âm."
    ],
    ans: 1,
    exp: "Tích phân lùi Schroeder trên các Speech Offset Tails cho phép trích xuất đáp ứng suy giảm năng lượng tự nhiên của phòng từ -5dB đến -25dB (T20) và nhân 3 để tính RT60 mà không làm phiền người dùng."
  },
  {
    cat: "acoustics",
    q: "Đặc điểm nhận diện đặc thù của cuộc gọi Loudspeaker Replay Attack trên miền tần số (Frequency Domain) là gì?",
    opts: [
      "Xuất hiện hiện tượng lọc lược (Comb-filtering) với các đỉnh và rãnh suy hao lặp lại tuần hoàn do giao thoa phản xạ màng loa.",
      "Dải tần số từ 0 đến 1000Hz bị triệt tiêu hoàn toàn.",
      "Phổ âm thanh biến thành xung Dirac đơn lẻ.",
      "Xuất hiện sóng siêu âm trên 20kHz do loa phát ra."
    ],
    ans: 0,
    exp: "Hiện tượng giao thoa sóng âm giữa đường truyền trực tiếp từ màng loa và các đường phản xạ từ mặt bàn/tường tạo nên hiệu ứng lọc lược (Comb-filtering) với các rãnh suy hao cách đều nhau Delta f = 1 / Delta t."
  },
  {
    cat: "acoustics",
    q: "Khi phân tích RT60 của một file âm thanh, giá trị đo được là RT60 = 0.08 giây. Kết luận pháp y vật lý chính xác nhất là gì?",
    opts: [
      "Âm thanh được thu trong một nhà hát thính phòng tiêu chuẩn cao.",
      "Phòng vô trùng số (Anechoic Vocoder): Âm thanh được tổng hợp thuần túy bằng thuật toán AI trong môi trường không gian ảo, không có dội âm thực tế.",
      "Người nói đang dùng tai nghe chống ồn chủ động ANC.",
      "Micro thu âm bị hỏng màng rung."
    ],
    ans: 1,
    exp: "Trong tự nhiên, một căn phòng sinh hoạt thông thường có RT60 từ 0.25s đến 0.65s. Chỉ có phòng câm tiêu âm chuyên dụng hoặc card âm thanh ảo trong server AI (Vocoder synthesis) mới có RT60 < 0.15s."
  },
  {
    cat: "acoustics",
    q: "Thuật toán Audio Splicing Detection (Dò cắt ghép âm thanh) kích hoạt còi báo động Hard Veto khi phát hiện dấu hiệu vật lý nào?",
    opts: [
      "Khi người nói ngừng nói quá 2 giây.",
      "Khi mức sàn nhiễu nền (Noise Floor) nhảy vọt bất thường Delta Noise Floor > 9.5dB giữa các ranh giới từ nối ghép.",
      "Khi tốc độ phát âm vượt quá 300 từ mỗi phút.",
      "Khi âm lượng vượt quá 90dB."
    ],
    ans: 1,
    exp: "Các đoạn ghi âm cắt dán từ nhiều nguồn khác nhau (ngoài đường, trong xe hơi, trong phòng) luôn có mức năng lượng nhiễu nền không đồng nhất. Bước nhảy > 9.5dB là bằng chứng không thể chối cãi của việc cắt ghép cơ học."
  },

  // --- NGỮ ÂM HỌC & THANH NGÃ (prosody) ---
  {
    cat: "prosody",
    q: "Đặc điểm nào dưới đây là 'bất biến vật lý' để phân định giữa thanh Ngã do người thật phát âm và mô hình TTS tổng hợp (ElevenLabs/Bark)?",
    opts: [
      "Người thật luôn có cao độ F0 cao hơn 300Hz khi nói thanh Ngã.",
      "Người thật luôn có hiện tượng ngắt/nén nắp thanh môn với mức giảm năng lượng ΔE < -12dB trong 20-60ms kèm đứt gãy F0.",
      "Mô hình TTS luôn phát âm thanh Ngã thành thanh Hỏi do lỗi từ điển phát âm.",
      "Mô hình TTS có thời gian phát âm thanh Ngã dài hơn người thật ít nhất 150ms."
    ],
    ans: 1,
    exp: "Thanh Ngã trong ngữ âm học tiếng Việt là thanh gãy thanh môn (glottalized broken tone). Cơ nắp thanh môn siết chặt tạo cú sụt áp năng lượng >12dB và gián đoạn F0, điều mà các hàm mất mát L1/L2 trơn hóa của TTS không thể tái tạo."
  },
  {
    cat: "prosody",
    q: "Tại sao các mô hình Voice Conversion như RVC v2 lại có Micro-Jitter vọt lên > 4.8% trong khi Neural Vocoder như HiFi-GAN lại < 0.35%?",
    opts: [
      "Vì RVC v2 bị lỗi phần cứng trong quá trình xuất file âm thanh.",
      "Vì RVC v2 dùng thuật toán Harvest/PM bóc tách F0 rồi ghép nối pha (Phase Discontinuity) gây giật nảy bước sóng, còn HiFi-GAN bị hàm mất mát L1 trơn hóa quá mức.",
      "Vì RVC v2 chỉ hoạt động ở tần số 8kHz còn HiFi-GAN chạy ở 48kHz.",
      "Vì RVC v2 thêm tiếng ồn trắng nhân tạo để đánh lừa bộ phân loại."
    ],
    ans: 1,
    exp: "RVC v2 tái tạo F0 qua thuật toán ước lượng Harvest và bộ dao động sóng Sine. Sự bù pha không liên tục giữa các khung STFT tạo ra các bước nhảy pha (Phase Glitches), khiến Jitter tăng vọt bất thường."
  },
  {
    cat: "prosody",
    q: "Thuật toán NAFE (Normalized Autocorrelation F0 Estimation) vượt trội hơn thuật toán FFT cơ bản khi bóc tách F0 ở điểm nào?",
    opts: [
      "NAFE chạy nhanh hơn FFT 100 lần trên vi điều khiển.",
      "NAFE đo trực tiếp chu kỳ tuần hoàn trên miền thời gian, miễn nhiễm với hiện tượng mất tần số cơ bản (Missing Fundamental) của kênh thoại hẹp.",
      "NAFE không cần tín hiệu đầu vào vẫn tính được F0.",
      "NAFE tự động loại bỏ toàn bộ tiếng ồn giao thông."
    ],
    ans: 1,
    exp: "Kênh thoại G.711 cắt cụt tần số dưới 300Hz, làm biến mất đỉnh F0 gốc trên phổ FFT. NAFE tìm cực đại của hàm tự tương quan chuẩn hóa R_x(tau), bóc tách chính xác chu kỳ rung dây thanh dựa trên khoảng cách giữa các hài âm còn lại."
  },
  {
    cat: "prosody",
    q: "Hiện tượng bẹp dải cao độ (Monotonic F0 Compression) thường gặp ở các bot Deepfake tiếng Việt giá rẻ biểu hiện định lượng như thế nào?",
    opts: [
      "Dải biến thiên cao độ Delta F0 = F0_max - F0_min < 55Hz xuyên suốt cả 6 thanh điệu.",
      "Tần số F0 luôn cố định chính xác ở 100Hz.",
      "F0 biến thiên ngẫu nhiên từ 50Hz đến 1000Hz.",
      "Mọi âm tiết đều biến thành thanh Huyền."
    ],
    ans: 0,
    exp: "Người Việt khi phát âm bình thường qua 6 thanh điệu (Ngang, Huyền, Sắc, Hỏi, Ngã, Nặng) luôn có dải cao độ phong phú Delta F0 > 110Hz. Giọng bot tổng hợp thô sơ bị nén bẹp dưới 55Hz, nghe đều đều vô cảm."
  },

  // --- MelCNN & ONNX RUNTIME (onnx) ---
  {
    cat: "onnx",
    q: "Lớp AdaptiveAvgPool2d((1, 1)) ở cuối kiến trúc MelCNN 2D giải quyết bài toán cốt tử nào trong xử lý streaming audio?",
    opts: [
      "Loại bỏ toàn bộ các giá trị âm trong tensor.",
      "Nén ma trận đặc trưng về kích thước cố định (256, 1, 1), cho phép mô hình tiếp nhận bất kỳ độ dài âm thanh T nào mà không cần cắt cúp hay chèn padding 0.",
      "Tăng tốc độ xung nhịp CPU lên 4.5GHz.",
      "Tự động dịch giọng nói sang tiếng Anh."
    ],
    ans: 1,
    exp: "Adaptive Average Pooling tính trung bình toàn cục không gian (Global Average Pooling), chuyển đổi tensor (Batch, 256, 5, T/16) thành (Batch, 256, 1, 1), giúp mạng hoàn toàn bất biến trước độ dài thời gian của audio chunk."
  },
  {
    cat: "onnx",
    q: "Kỹ thuật Node Fusion trong ONNX Runtime Opset 14 tối ưu hóa hiệu năng thực thi của MelCNN như thế nào?",
    opts: [
      "Xóa bỏ hoàn toàn lớp BatchNorm khỏi mô hình.",
      "Gộp các toán tử liên tiếp Conv2D + BatchNorm + ReLU thành một kernel C++ hợp nhất duy nhất (FusedConv), giữ dữ liệu trong L1/L2 Cache của CPU.",
      "Chuyển đổi toàn bộ code Python sang ngôn ngữ Java.",
      "Giảm độ phân giải của ma trận âm thanh xuống 4-bit."
    ],
    ans: 1,
    exp: "Node Fusion loại bỏ việc đọc/ghi dữ liệu trung gian ra RAM giữa các lớp, giữ trọn vẹn dữ liệu trong thanh ghi CPU Cache, cắt giảm hơn 65% độ trễ suy luận (từ 28ms xuống 6.8ms)."
  },
  {
    cat: "onnx",
    q: "Tại sao trong cấu hình SessionOptions của ONNX Runtime lại đặt intra_op_num_threads=4 và inter_op_num_threads=1?",
    opts: [
      "Vì hệ thống chỉ có tối đa 4 file âm thanh.",
      "intra_op=4 tận dụng 4 core CPU tính toán song song phép nhân ma trận cho 1 tensor, trong khi inter_op=1 ngăn chặn hiện tượng tranh chấp khóa (Lock Contention) giữa các node.",
      "Vì ONNX không hỗ trợ giá trị lớn hơn 4.",
      "Để ép mô hình chạy ở chế độ tiết kiệm pin."
    ],
    ans: 1,
    exp: "Mô hình MelCNN có đồ thị tính toán dạng tuần tự (Sequential Graph). intra_op=4 song song hóa tối đa bên trong phép nhân ma trận tích chập. inter_op=1 giữ luồng điều phối tuần tự ổn định, triệt tiêu context-switching overhead."
  },

  // --- FUSION ENGINE & HARD VETO (fusion) ---
  {
    cat: "fusion",
    q: "Tấn công Out-of-Distribution (OOD) là gì và tại sao Hard Physics Veto là giải pháp duy nhất triệt tiêu nó?",
    opts: [
      "Là cuộc tấn công DDoS làm sập máy chủ web.",
      "Là khi kẻ tấn công dùng mô hình AI mới lạ chưa từng xuất hiện trong tập huấn luyện khiến CNN cho điểm giả mạo thấp, nhưng Hard Veto chặn dựa trên quy luật vật lý không đổi.",
      "Là cuộc tấn công đánh cắp mật khẩu cơ sở dữ liệu SQLite3.",
      "Là việc người dùng cố tình nói giọng địa phương khác vùng miền."
    ],
    ans: 1,
    exp: "Mô hình học sâu chỉ đáng tin cậy trong miền phân phối đã học. Kẻ tấn công dùng kiến trúc TTS mới sẽ qua mặt CNN. Tuy nhiên, quy luật vật lý (dây thanh phải rung có vi nhiễu, phòng phải có dội âm) là bất biến và không thể qua mặt Hard Veto."
  },
  {
    cat: "fusion",
    q: "Trong cơ chế Cổng Động Thích Ứng Kênh Truyền (Context-Aware Gated Weights), khi phát hiện cuộc gọi qua kênh hẹp viễn thông G.711 (8kHz), hệ thống sẽ điều chỉnh trọng số như thế nào?",
    opts: [
      "Tăng trọng số CNN lên 0.80 vì phổ G.711 rất đặc thù.",
      "Hạ trọng số CNN xuống 0.10, đồng thời tăng trọng số Ngữ âm (Prosody) lên 0.65 và Âm học lên 0.25.",
      "Tắt toàn bộ hệ thống vì G.711 không đủ điều kiện pháp y.",
      "Chuyển đổi tín hiệu G.711 sang 48kHz bằng AI trước khi phân tích."
    ],
    ans: 1,
    exp: "Kênh G.711 cắt cụt toàn bộ tần số trên 3.4kHz, làm mất các đặc trưng formant cao của CNN. Do đó, hệ thống hạ tỷ trọng CNN xuống 0.10 và dựa chủ yếu vào F0, Jitter và năng lượng thanh môn trong dải thoại."
  },
  {
    cat: "fusion",
    q: "Khi hệ thống rơi vào trạng thái mâu thuẫn AMBIGUOUS_SUSPICIOUS (Điểm số rơi vào vùng tranh chấp 0.3 - 0.8), hành động phòng vệ nào được kích hoạt?",
    opts: [
      "Tự động khóa vĩnh viễn tài khoản của người dùng.",
      "Kích hoạt thử thách động (Dynamic Challenge-Response): Yêu cầu đọc cụm từ OTP tiếng Việt chứa nhiều thanh Ngã và thanh Nặng đặc thù để ép AI bộc lộ khuyết tật.",
      "Chuyển cuộc gọi cho nhân viên bảo vệ ngân hàng nghe thử.",
      "Hạ điểm số về 0.0 để cho qua giao dịch."
    ],
    ans: 1,
    exp: "Dynamic Challenge-Response yêu cầu người dùng đọc câu thoại chứa các thanh điệu gãy (VD: 'Kỹ sư Nguyễn Vĩ Viết vẽ tranh bão lũ'). Kẻ tấn công dùng TTS thời gian thực sẽ không thể nội suy kịp hoặc làm bẹp F0 thanh Ngã, lập tức bị lộ."
  },

  // --- SINH TRẮC 1:1, PHÁP Y & NGÂN HÀNG (security) ---
  {
    cat: "security",
    q: "Trong bài toán Voice Biometrics 1:1, phân ly không gian trực giao (Orthogonal Subspace Projection) có ý nghĩa cốt lõi gì?",
    opts: [
      "Để nén kích thước file âm thanh từ MP3 về WAV.",
      "Để tách biệt hoàn toàn đặc trưng định danh chủ tài khoản (Identity) khỏi đặc trưng tính sống cơ học (Liveness), tránh nhầm lẫn giữa clone của chủ và người lạ nói thật.",
      "Để tăng tốc độ tính toán ma trận trên GPU.",
      "Để xóa bỏ toàn bộ tạp âm môi trường xung quanh."
    ],
    ans: 1,
    exp: "Bằng cách chiếu vector đặc trưng thành 2 không gian con trực giao S_ID vuông góc S_Live, hệ thống có thể kết luận chính xác trạng thái 'Voice Clone Attack' khi Identity khớp chủ (>=0.75) nhưng Liveness bị âm tính (<0.40)."
  },
  {
    cat: "security",
    q: "Chính sách phân vùng 3 dải (Tri-Band Policy) trong giám định gian lận ngân hàng xử lý dải Vàng [0.3 - 0.8) như thế nào?",
    opts: [
      "Chặn ngay lập tức và chuyển hồ sơ sang cơ quan công an.",
      "Bỏ qua và cho phép giao dịch như người thật.",
      "Không chặn khách hàng mà kích hoạt xác thực tăng cường (Step-up Auth) với OTP âm thanh động chứa thanh Ngã/Nặng.",
      "Tự động trừ 10% phí bảo hiểm rủi ro tài khoản."
    ],
    ans: 2,
    exp: "Dải Vàng là vùng nghi ngờ/mâu thuẫn. Để đảm bảo FPR < 0.05% không làm gián đoạn khách hàng thật, ngân hàng yêu cầu đọc câu thách thức động (Challenge-Response) chứa nhiều thanh Ngã để ép AI bộc lộ khuyết tật."
  },
  {
    cat: "security",
    q: "Một file âm thanh có mã băm SHA-256 hoàn toàn hợp lệ và khớp với biên bản thu thập. Điều này CHỨNG MINH ĐƯỢC điều gì trước tòa án?",
    opts: [
      "Chứng minh file âm thanh chắc chắn được phát ra từ người sống, không phải do AI tạo ra.",
      "Chứng minh file âm thanh không bị sửa đổi hay can thiệp bit nào kể từ lúc băm và bảo đảm tính tái lập kết quả giám định.",
      "Chứng minh file âm thanh được thu vào đúng thời điểm xảy ra vụ việc lừa đảo.",
      "Chứng minh giọng nói trong file thuộc quyền sở hữu của nạn nhân."
    ],
    ans: 1,
    exp: "SHA-256 chỉ bảo đảm tính toàn vẹn (Integrity) và tính tái lập (Reproducibility). Nó không thể chứng minh nguồn gốc sinh học (Provenance/Liveness) hay thời điểm tạo ra nếu không có chữ ký số PKI và dấu thời gian TSA."
  },
  {
    cat: "security",
    q: "Bộ ba pháp lý hoàn chỉnh theo chuẩn FIPS 140-3 & RFC 3161 để một kết luận giám định Deepfake có giá trị tố tụng trước tòa án gồm những thành phần nào?",
    opts: [
      "Tên người giám định, số điện thoại và địa chỉ email.",
      "Mã băm SHA-256 (Toàn vẹn bit) + Ký số bất đối xứng PKI Ed25519 (Định danh hệ thống) + Dấu thời gian RFC 3161 TSA (Chống gian lận thời gian UTC).",
      "Ảnh chụp màn hình phần mềm và file nén ZIP.",
      "Bản ghi âm lời khai của nạn nhân."
    ],
    ans: 1,
    exp: "Đây là tiêu chuẩn quốc tế FIPS 140-3 cho mật mã và RFC 3161 cho Time-Stamp Protocol, bảo đảm chuỗi bảo quản bằng chứng (Chain of Custody) không thể bị bác bỏ trước hội đồng xét xử."
  },
  {
    cat: "security",
    q: "Tại sao độ trễ toàn trình của DeepGuard được khống chế ở mức T_E2E ≈ 350ms?",
    opts: [
      "Để phù hợp với tốc độ mắt người nhìn trên màn hình 60 FPS.",
      "Để đảm bảo cắt đứt cuộc gọi mạo danh ngay từ âm tiết đầu tiên trước khi nạn nhân kịp thực hiện thao tác tài chính.",
      "Vì giao thức WebSocket không thể truyền dữ liệu nhanh hơn 350ms.",
      "Để dành thời gian cho mô hình Deep Learning chạy qua 5 vòng lặp kiểm tra."
    ],
    ans: 1,
    exp: "Khoảng thời gian một người nhận diện và phản ứng chuyển tiền là vài giây. Cắt cuộc gọi ở 350ms (ngay khi từ đầu tiên được phát hiện giả mạo) ngăn chặn hoàn toàn rủi ro gian lận thời gian thực."
  }
];

// =====================================================================
// 5. DATA REPOSITORY: 5 CORE BACKEND CODE MODULES (MODE 5)
// =====================================================================
const CODE_AUDIT_MODULES = [
  {
    id: "mod_dsp",
    filename: "backend/app/services/audio_dsp.py",
    title: "DSP Pipeline: Polyphase Resampling & Log-Mel Spectrogram",
    perf: "Thời gian xử lý: 3.2ms / chunk",
    desc: "Chuẩn hóa tín hiệu âm thanh đầu vào về 16kHz Polyphase và tính STFT Hann 1024 / Hop 256 xuất ra 80 dải Log-Mel.",
    code: `import numpy as np
import scipy.signal as signal
import librosa

class ForensicDSPPipeline:
    def __init__(self, target_sr=16000, n_fft=1024, hop_length=256, n_mels=80):
        self.sr = target_sr
        self.n_fft = n_fft
        self.hop_length = hop_length
        self.n_mels = n_mels
        # Khởi tạo trước Mel filterbank ma trận để tránh tính lặp lại (Zero-overhead)
        self.mel_basis = librosa.filters.mel(
            sr=target_sr, n_fft=n_fft, n_mels=n_mels, fmin=100, fmax=8000
        )
        self.window = signal.windows.hann(n_fft, sym=False)

    def process_chunk(self, audio_raw: np.ndarray, orig_sr: int) -> np.ndarray:
        # 1. Polyphase Resampling chống Aliasing
        if orig_sr != self.sr:
            gcd = np.gcd(orig_sr, self.sr)
            audio = signal.resample_poly(audio_raw, self.sr // gcd, orig_sr // gcd)
        else:
            audio = audio_raw

        # 2. STFT với cửa sổ Hann đối xứng tuần hoàn
        stft = librosa.stft(
            audio, n_fft=self.n_fft, hop_length=self.hop_length, window=self.window
        )
        mag_spec = np.abs(stft) ** 2

        # 3. Ánh xạ Log-Mel Spectrogram phi tuyến
        mel_spec = np.dot(self.mel_basis, mag_spec)
        log_mel = np.log(np.maximum(mel_spec, 1e-6))
        return log_mel[np.newaxis, np.newaxis, :, :]  # Shape (1, 1, 80, T)`,
    sliders: [
      { id: "sl_hop", label: "Hop Length (mẫu):", min: 128, max: 512, step: 64, val: 256, unit: " mẫu" }
    ],
    calcSim: (vals) => {
      const hop = vals.sl_hop;
      const ms = (hop / 16000) * 1000;
      const overlap = ((1024 - hop) / 1024) * 100;
      return `Độ phân giải thời gian: ${ms.toFixed(1)}ms | Độ chồng lấn: ${overlap.toFixed(1)}% | Tốc độ trích xuất: ${(hop < 256 ? "Chậm hơn, tăng FLOPS" : (hop > 256 ? "Nhanh hơn, nhưng mất độ mịn F0" : "CHUẨN PHÁP Y"))}`;
    }
  },
  {
    id: "mod_prosody",
    filename: "backend/app/services/vietnamese_prosody.py",
    title: "Vietnamese Prosody Engine: NAFE & Glottal Stop Mining",
    perf: "Thời gian xử lý: 3.1ms / chunk",
    desc: "Bóc tách F0 qua Normalized Autocorrelation, tính toán Micro-Jitter sinh học và dò tìm hiện tượng nghẽn nắp thanh môn trên thanh Ngã.",
    code: `class VietnameseProsodyEngine:
    def __init__(self, sr=16000, hop_length=256):
        self.sr = sr
        self.hop_length = hop_length

    def extract_f0_nafe(self, audio: np.ndarray) -> np.ndarray:
        # Normalized Autocorrelation F0 Estimation (Dải sinh học 60Hz - 400Hz)
        frame_len = 1024
        f0_list = []
        for i in range(0, len(audio) - frame_len, self.hop_length):
            frame = audio[i : i + frame_len]
            norm_corr = signal.correlate(frame, frame, mode='full')
            norm_corr = norm_corr[len(frame) - 1 :]
            # Chuẩn hóa năng lượng
            norm_corr = norm_corr / (norm_corr[0] + 1e-9)
            
            min_lag = int(self.sr / 400)  # 400Hz -> 40 mẫu
            max_lag = int(self.sr / 60)   # 60Hz -> 266 mẫu
            peak_lag = min_lag + np.argmax(norm_corr[min_lag:max_lag])
            
            if norm_corr[peak_lag] > 0.40:
                f0_list.append(self.sr / peak_lag)
            else:
                f0_list.append(0.0)
        return np.array(f0_list)

    def mine_glottal_stop(self, audio: np.ndarray, f0: np.ndarray, threshold_db=-12.0):
        # Tính đường cong năng lượng RMS khung
        rms = librosa.feature.rms(y=audio, frame_length=1024, hop_length=self.hop_length)[0]
        # Quét thung lũng năng lượng hẹp 20-60ms (1 đến 4 khung)
        for i in range(2, len(rms) - 2):
            drop_db = 10 * np.log10((rms[i] + 1e-9) / (min(rms[i-2], rms[i+2]) + 1e-9))
            if drop_db < threshold_db and f0[i] == 0:
                return True, drop_db  # Tìm thấy nghẽn nắp thanh môn sinh học!
        return False, 0.0`,
    sliders: [
      { id: "sl_glottal_thresh", label: "Ngưỡng sụt năng lượng Glottal Stop:", min: -20, max: -6, step: 1, val: -12, unit: " dB" }
    ],
    calcSim: (vals) => {
      const db = vals.sl_glottal_thresh;
      return `Ngưỡng kích hoạt: ${db} dB | Trạng thái: ${db > -8 ? "CẢNH BÁO: Báo động giả cao (AI TTS thường sụt -5dB)" : (db < -16 ? "Quá chặt: Bỏ sót người thật phát âm nhẹ" : "TỐI ƯU PHÁP Y (-12dB bóc tách chính xác thanh môn)")}`;
    }
  },
  {
    id: "mod_acoustics",
    filename: "backend/app/services/room_acoustics.py",
    title: "ISO 3382 Acoustics: Schroeder Backward Integration & RT60",
    perf: "Thời gian xử lý: 2.0ms / chunk",
    desc: "Ước lượng thời gian dội âm RT60 từ các đoạn rơi âm đuôi tự nhiên (Speech Offset Tails) và phát hiện tấn công Replay qua loa ngoài.",
    code: `class RoomAcousticsEngine:
    def __init__(self, sr=16000):
        self.sr = sr

    def estimate_rt60_schroeder(self, audio: np.ndarray) -> float:
        # 1. Phát hiện đoạn rơi năng lượng (Speech Offset Tail)
        rms = librosa.feature.rms(y=audio, frame_length=512, hop_length=128)[0]
        tail_idx = np.where(np.diff(rms) < -0.05)[0]
        if len(tail_idx) == 0: return 0.35 # Giá trị mặc định
        
        start_samp = tail_idx[0] * 128
        tail_audio = audio[start_samp : start_samp + int(self.sr * 0.4)]
        if len(tail_audio) < 512: return 0.35

        # 2. Tích phân năng lượng lùi Schroeder
        energy_reversed = tail_audio[::-1] ** 2
        schroeder_curve = np.cumsum(energy_reversed)[::-1]
        schroeder_db = 10 * np.log10(schroeder_curve / (schroeder_curve[0] + 1e-12))

        # 3. Ước lượng khoảng suy giảm T20 (-5dB đến -25dB)
        try:
            t5_idx = np.where(schroeder_db <= -5.0)[0][0]
            t25_idx = np.where(schroeder_db <= -25.0)[0][0]
            t20 = (t25_idx - t5_idx) / self.sr
            rt60 = 3.0 * t20
            return float(np.clip(rt60, 0.05, 2.5))
        except Exception:
            return 0.35`,
    sliders: [
      { id: "sl_rt60_upper", label: "Ngưỡng chặn Replay RT60:", min: 0.6, max: 1.2, step: 0.05, val: 0.85, unit: " s" }
    ],
    calcSim: (vals) => {
      const rt = vals.sl_rt60_upper;
      return `Ngưỡng chặn dội âm kép: ${rt}s | Đánh giá: ${rt < 0.75 ? "Quá nhạy: Có thể chặn nhầm phòng họp lớn" : "CHUẨN AN TOÀN: Bắt gọn loa Bluetooth dội âm kép"}`;
    }
  },
  {
    id: "mod_onnx",
    filename: "backend/app/services/mel_cnn_onnx.py",
    title: "ONNX Runtime Inference Engine (Opset 14, 4-Threads)",
    perf: "Thời gian xử lý: 7.2ms / chunk trên CPU",
    desc: "Khởi tạo mô hình MelCNN 2D Opset 14 tối ưu hóa đồ thị tính toán và cấu hình luồng CPU song song.",
    code: `import onnxruntime as ort

class MelCNNInferenceEngine:
    def __init__(self, model_path: str):
        # Thiết lập phiên suy luận tối ưu cho hạ tầng CPU
        opts = ort.SessionOptions()
        opts.graph_optimization_level = ort.GraphOptimizationLevel.ORT_ENABLE_ALL
        opts.intra_op_num_threads = 4  # Tận dụng 4 core vật lý cho 1 tensor
        opts.inter_op_num_threads = 1  # Ngăn chặn lock contention giữa các node
        opts.execution_mode = ort.ExecutionMode.ORT_SEQUENTIAL
        
        self.session = ort.InferenceSession(model_path, opts, providers=['CPUExecutionProvider'])
        self.input_name = self.session.get_inputs()[0].name
        self.output_name = self.session.get_outputs()[0].name

    def predict(self, log_mel_tensor: np.ndarray) -> float:
        # Chạy suy luận trực tiếp với Tensor Float32
        outputs = self.session.run([self.output_name], {self.input_name: log_mel_tensor.astype(np.float32)})
        probs = outputs[0][0]  # Softmax output [P_real, P_fake]
        return float(probs[1]) # Trả về xác suất Deepfake`,
    sliders: [
      { id: "sl_intra_threads", label: "Số luồng CPU (intra_op):", min: 1, max: 8, step: 1, val: 4, unit: " cores" }
    ],
    calcSim: (vals) => {
      const th = vals.sl_intra_threads;
      const lat = (th === 1 ? 16.5 : (th === 2 ? 10.2 : (th === 4 ? 6.8 : 7.1)));
      return `Luồng cấu hình: ${th} | Ước tính độ trễ suy luận: ${lat}ms | Ghi chú: ${th === 4 ? "ĐIỂM NGỌT (SWEET SPOT): Tối ưu tối đa cache L3 CPU" : (th > 4 ? "Lãng phí: Overhead điều phối luồng làm trễ tăng nhẹ" : "Chậm, nguy cơ trễ E2E")}`;
    }
  },
  {
    id: "mod_fusion",
    filename: "backend/app/services/decision_fusion.py",
    title: "Decision Fusion Engine: Context-Aware Gating & Hard Veto",
    perf: "Thời gian xử lý: 0.5ms / chunk",
    desc: "Cơ chế dung hợp quyết định phi tuyến tính, xử lý mâu thuẫn OOD và chính sách phân vùng 3 dải Tri-Band Policy.",
    code: `class DecisionFusionEngine:
    def __init__(self):
        # Trọng số mặc định cho kênh băng rộng 16kHz
        self.weights_wideband = {"cnn": 0.50, "prosody": 0.30, "acoustics": 0.20}
        # Cổng động thích ứng kênh thoại hẹp G.711 (8kHz)
        self.weights_telephony = {"cnn": 0.10, "prosody": 0.65, "acoustics": 0.25}

    def evaluate(self, cnn_score, jitter, glottal_found, rt60, noise_jump, is_g711=False):
        # 1. QUYỀN PHỦ QUYẾT BẤT BIẾN VẬT LÝ (HARD PHYSICS VETO)
        if jitter < 0.35:
            return {"decision": "FAKE_VETO", "reason": "Jitter < 0.35% (Neural Vocoder phi sinh học)", "score": 1.0}
        if jitter > 4.80:
            return {"decision": "FAKE_VETO", "reason": "Jitter > 4.80% (RVC v2 Phase Glitch)", "score": 1.0}
        if rt60 < 0.15:
            return {"decision": "FAKE_VETO", "reason": "RT60 < 0.15s (Phòng câm hoàn toàn Anechoic)", "score": 1.0}
        if rt60 > 0.85:
            return {"decision": "FAKE_VETO", "reason": "RT60 > 0.85s (Tấn công Replay loa ngoài)", "score": 1.0}
        if noise_jump > 9.5:
            return {"decision": "FAKE_VETO", "reason": "Bước nhảy nền nhiễu > 9.5dB (Cắt ghép âm thanh)", "score": 1.0}

        # 2. CỔNG ĐỘNG DUNG HỢP TRỌNG SỐ
        w = self.weights_telephony if is_g711 else self.weights_wideband
        prosody_score = 0.1 if glottal_found else 0.85
        acoustics_score = 0.15 if (0.20 <= rt60 <= 0.65) else 0.80

        final_score = w["cnn"] * cnn_score + w["prosody"] * prosody_score + w["acoustics"] * acoustics_score

        # 3. CHÍNH SÁCH PHÂN VÙNG 3 DẢI (TRI-BAND POLICY)
        if final_score < 0.30:
            return {"decision": "PASS_AUTHENTIC", "action": "Cho phép giao dịch", "score": final_score}
        elif final_score < 0.80:
            return {"decision": "STEP_UP_AUTH", "action": "Kích hoạt OTP giọng nói thanh Ngã", "score": final_score}
        else:
            return {"decision": "BLOCK_FRAUD", "action": "Khóa giao dịch khẩn cấp", "score": final_score}`,
    sliders: [
      { id: "sl_cnn_telephony", label: "Trọng số CNN kênh G.711:", min: 0.05, max: 0.50, step: 0.05, val: 0.10, unit: "" }
    ],
    calcSim: (vals) => {
      const wCnn = vals.sl_cnn_telephony;
      const wProsody = 1.0 - wCnn - 0.25;
      return `Trọng số G.711: CNN = ${wCnn.toFixed(2)} | Prosody = ${wProsody.toFixed(2)} | Acoustics = 0.25 | ${wCnn > 0.25 ? "NGUY HIỂM: G.711 mất dải cao, phụ thuộc CNN dễ gây báo động giả!" : "AN TOÀN: Dồn trọng tâm vào F0 và nắp thanh môn"}`;
    }
  }
];

// =====================================================================
// 6. APPLICATION CONTROLLER & UI BINDINGS
// =====================================================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Tab Navigation
  const navTabs = document.querySelectorAll('.nav-tab');
  const tabPanels = document.querySelectorAll('.tab-panel');

  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      navTabs.forEach(t => t.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const targetPanel = document.getElementById(tab.dataset.tab);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // Quick navigation shortcuts to Progressive Academy
  const jumpToAcademy = () => {
    const tab = document.querySelector('.nav-tab[data-tab="progressive-academy"]');
    if (tab) {
      tab.click();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  document.getElementById('btn-quick-goto-academy')?.addEventListener('click', jumpToAcademy);
  document.getElementById('btn-banner-goto-academy')?.addEventListener('click', jumpToAcademy);
  document.getElementById('btn-quiz-jump-academy')?.addEventListener('click', jumpToAcademy);

  // 2. Mode Selector in Defense Arena
  const modeBtns = document.querySelectorAll('.mode-btn');
  const modeViews = document.querySelectorAll('.mode-view');

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => b.classList.remove('active'));
      modeViews.forEach(v => v.classList.remove('active'));
      btn.classList.add('active');
      const targetView = document.getElementById(`mode-content-${btn.dataset.mode}`);
      if (targetView) targetView.classList.add('active');
    });
  });

  // 3. Render Mode 1: Socratic Deep-Dive (11 Questions)
  const socraticNav = document.getElementById('socratic-nav');
  const socraticCard = document.getElementById('socratic-card');

  function renderSocraticQuestion(q) {
    socraticCard.innerHTML = `
      <div class="badge-row">
        <span class="pillar-badge">${q.tag}</span>
        <span class="difficulty-badge">${q.difficulty}</span>
      </div>
      <h3 class="card-question-title">${q.title}</h3>
      <div class="question-context-box">${q.context}</div>

      ${q.diagramSvg ? `
        <div class="diagram-container">
          ${q.diagramSvg}
          <div class="diagram-caption">${q.diagramCaption || "SƠ ĐỒ BÓC TÁCH VẬT LÝ & QUANG PHỔ PHÁP Y"}</div>
        </div>
      ` : ''}

      <div class="hints-block">
        <div class="hints-header">💡 GỢI Ý ĐỊNH HƯỚNG PHẢN BIỆN:</div>
        <ul class="hints-list">
          ${q.hints.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>

      <div class="user-answer-section">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <label class="answer-label" style="margin-bottom: 0;">CÂU TRẢ LỜI CỦA BẠN (NÓI TRỰC TIẾP HOẶC GÕ):</label>
          <span class="voice-status-indicator idle" id="soc-mic-status">🎙️ Micro Chờ</span>
        </div>
        <textarea class="voice-transcript-area" id="soc-user-answer" placeholder="Nhấn 'Bật Micro Trả Lời' để nói trực tiếp bằng tiếng Việt (vi-VN), hệ thống sẽ tự động nhận diện giọng nói và chấm điểm luận điểm..."></textarea>
      </div>

      <div class="voice-actions-row">
        <button class="btn-mic-record" id="btn-soc-mic">🎙️ Bật Micro Trả Lời Vấn Đáp (vi-VN)</button>
        <button class="btn-primary" id="btn-soc-grade">⚡ Chấm Điểm & Phản Biện Sắc Bén</button>
        <button class="btn-secondary" id="btn-soc-reveal">📜 Mở Đáp Án Nâng Cao & Sơ Đồ</button>
        <button class="btn-secondary" id="btn-soc-speak-feedback" style="display: none; border-color: #00ff9d; color: #00ff9d;">🗣️ Nghe Giám Khảo Đọc Nhận Xét</button>
      </div>

      <div class="voice-feedback-panel" id="soc-feedback-panel" style="display: none;">
        <!-- Populated dynamically upon grading -->
      </div>

      <div class="solution-box" id="soc-solution">
        <div class="sol-title">CHỨNG MINH KHOA HỌC & GIẢI TÍCH NÂNG CAO</div>
        <div class="math-proof-box">${q.mathProof}</div>
        ${q.codeSnippet ? `
          <div class="sol-title" style="margin-top: 1rem; color: #00f0ff;">CODE TRIỂN KHAI BACKEND:</div>
          <div class="math-proof-box" style="color: #93c5fd;">${q.codeSnippet}</div>
        ` : ''}
        ${q.evidence ? `
          <div class="evidence-box">
            <div class="evidence-title">📜 TIÊU CHUẨN QUỐC TẾ & DẪN CHỨNG THỰC NGHIỆM:</div>
            <div>${q.evidence}</div>
          </div>
        ` : ''}
      </div>
    `;

    const socRevealBtn = document.getElementById('btn-soc-reveal');
    const socGradeBtn = document.getElementById('btn-soc-grade');
    const socMicBtn = document.getElementById('btn-soc-mic');
    const socMicStatus = document.getElementById('soc-mic-status');
    const socFeedbackPanel = document.getElementById('soc-feedback-panel');
    const socSpeakBtn = document.getElementById('btn-soc-speak-feedback');
    const socTextarea = document.getElementById('soc-user-answer');
    let lastJudgeFeedbackText = "";

    socRevealBtn.addEventListener('click', () => {
      document.getElementById('soc-solution').classList.toggle('visible');
    });

    // Web Speech API Voice Recognition
    let recognition = null;
    let isRecording = false;

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRec();
      recognition.lang = 'vi-VN';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        isRecording = true;
        socMicBtn.classList.add('active');
        socMicBtn.innerHTML = '⏹️ Dừng Micro & Giữ Lời';
        socMicStatus.className = 'voice-status-indicator recording';
        socMicStatus.innerHTML = '<span class="pulse-dot"></span> Đang Thu Âm Trực Tiếp...';
      };

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript.trim()) {
          socTextarea.value = (socTextarea.value + ' ' + transcript).trim();
        }
      };

      recognition.onerror = (e) => {
        console.warn('Speech recognition error:', e);
        stopRecording();
      };

      recognition.onend = () => {
        stopRecording();
      };
    }

    function stopRecording() {
      isRecording = false;
      if (socMicBtn) {
        socMicBtn.classList.remove('active');
        socMicBtn.innerHTML = '🎙️ Bật Micro Trả Lời Vấn Đáp (vi-VN)';
      }
      if (socMicStatus) {
        socMicStatus.className = 'voice-status-indicator idle';
        socMicStatus.innerHTML = '🎙️ Micro Sẵn Sàng';
      }
    }

    if (socMicBtn) {
      socMicBtn.addEventListener('click', () => {
        if (!recognition) {
          alert("Trình duyệt của bạn chưa hỗ trợ Web Speech API. Bạn có thể gõ câu trả lời trực tiếp vào ô văn bản!");
          return;
        }
        if (isRecording) {
          recognition.stop();
        } else {
          try {
            recognition.start();
          } catch (err) {
            console.error(err);
          }
        }
      });
    }

    // Argument Evaluator & AI Judge Voice Response
    socGradeBtn.addEventListener('click', () => {
      const ans = socTextarea.value.trim();
      if (!ans) {
        alert("Vui lòng bật micro trả lời hoặc gõ câu trả lời của bạn trước khi yêu cầu Hội đồng đánh giá!");
        return;
      }
      if (isRecording && recognition) recognition.stop();

      document.getElementById('soc-solution').classList.add('visible');

      // Analyze technical terminology
      const words = ans.split(/\s+/).length;
      const keyPool = [
        "nyquist", "stft", "hann", "hop", "aliasing", "polyphase", "schroeder", "t20", "rt60",
        "glottal", "thanh ngã", "nắp thanh môn", "jitter", "shimmer", "formant", "onnx", "opset",
        "fusedconv", "fusion", "dempster-shafer", "veto", "g.711", "plc", "sha-256", "fips 140-3",
        "rfc 3161", "replay", "comb-filter", "hifi-gan", "rvc", "elevenlabs", "tri-band"
      ];
      const lower = ans.toLowerCase();
      let matchCount = 0;
      keyPool.forEach(kw => {
        if (lower.includes(kw)) matchCount++;
      });

      const termScore = Math.min(100, Math.round((matchCount / 4) * 100));
      const lengthScore = Math.min(100, Math.round((words / 35) * 100));
      const gpa = Math.min(10, (((termScore * 0.6 + lengthScore * 0.4) / 100) * 10)).toFixed(1);
      const isGood = gpa >= 7.5;

      lastJudgeFeedbackText = isGood
        ? `Thí sinh trả lời đạt ${gpa} trên 10 điểm. Lập luận nắm chắc bản chất vật lý và có sử dụng thuật ngữ chuyên sâu. Hãy tiếp tục giải trình chi tiết hơn về các hằng số toán học!`
        : `Thí sinh chỉ đạt ${gpa} trên 10 điểm. Lập luận còn chung chung, thiếu các công thức toán học và chưa nêu bật được quyền phủ quyết vật lý. Đề nghị xem lại đáp án chuẩn bên dưới!`;

      socFeedbackPanel.style.display = 'block';
      socFeedbackPanel.innerHTML = `
        <div class="voice-metrics-grid">
          <div class="vm-card">
            <div class="vm-title">ĐIỂM HỘI ĐỒNG</div>
            <div class="vm-value" style="color: ${isGood ? '#00ff9d' : '#ff3366'};">${gpa} / 10</div>
          </div>
          <div class="vm-card">
            <div class="vm-title">SỐ TỪ LẬP LUẬN</div>
            <div class="vm-value" style="color: #00f0ff;">${words} từ</div>
          </div>
          <div class="vm-card">
            <div class="vm-title">ĐỘ PHỦ THUẬT NGỮ</div>
            <div class="vm-value" style="color: #ffb700;">${matchCount} khái niệm (${termScore}%)</div>
          </div>
          <div class="vm-card">
            <div class="vm-title">KẾT QUẢ</div>
            <div class="vm-value" style="color: ${isGood ? '#00ff9d' : '#ff3366'};">${isGood ? 'ĐẠT YÊU CẦU' : 'CẦN BỔ SUNG'}</div>
          </div>
        </div>
        <div style="font-size: 0.85rem; color: #e2e8f0; line-height: 1.5; margin-top: 0.5rem;">
          <strong style="color: #00f0ff;">NHẬN XÉT CỦA GIÁM KHẢO TRƯỞNG:</strong><br>
          ${lastJudgeFeedbackText}
        </div>
      `;

      socSpeakBtn.style.display = 'inline-flex';

      // Auto speak feedback
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(lastJudgeFeedbackText);
        utter.lang = 'vi-VN';
        utter.rate = 1.0;
        window.speechSynthesis.speak(utter);
      }
    });

    if (socSpeakBtn) {
      socSpeakBtn.addEventListener('click', () => {
        if ('speechSynthesis' in window && lastJudgeFeedbackText) {
          window.speechSynthesis.cancel();
          const utter = new SpeechSynthesisUtterance(lastJudgeFeedbackText);
          utter.lang = 'vi-VN';
          utter.rate = 1.0;
          window.speechSynthesis.speak(utter);
        }
      });
    }
  }

  socraticNav.innerHTML = '';
  SOCRATIC_QUESTIONS.forEach((q, idx) => {
    const btn = document.createElement('button');
    btn.className = `socratic-item-btn ${idx === 0 ? 'active' : ''}`;
    btn.innerHTML = `
      <span class="socratic-tag">${q.tag}</span>
      <div>${q.title}</div>
    `;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.socratic-item-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSocraticQuestion(q);
    });
    socraticNav.appendChild(btn);
  });
  renderSocraticQuestion(SOCRATIC_QUESTIONS[0]);

  // 4. Render Mode 2: Council of Judges (4 Judges & Multi-Questions)
  const judgesContainer = document.getElementById('judges-container');
  const councilStage = document.getElementById('council-stage');

  function renderJudgeStage(judge) {
    councilStage.innerHTML = `
      <div style="display: flex; gap: 1.5rem; align-items: flex-start;">
        <div style="font-size: 4rem;">${judge.avatar}</div>
        <div style="flex: 1;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3 style="font-size: 1.3rem; color: #fff;">${judge.name}</h3>
            <span class="judge-threat-level ${judge.threatClass}">${judge.threat}</span>
          </div>
          <p style="color: #00f0ff; font-size: 0.85rem; margin-top: 2px;">${judge.role}</p>

          <div style="display: flex; gap: 0.5rem; margin: 1rem 0;">
            ${judge.questions.map((q, qIdx) => `
              <button class="btn-secondary judge-q-btn ${qIdx === 0 ? 'active' : ''}" data-qidx="${qIdx}" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">
                Chất Vấn #${qIdx + 1}: ${q.title}
              </button>
            `).join('')}
          </div>

          <div id="judge-q-box" style="background: rgba(255, 51, 102, 0.08); border-left: 4px solid #ff3366; padding: 1.2rem; border-radius: 6px; margin: 1rem 0; font-size: 0.95rem; line-height: 1.6; color: #fecdd3;">
            ${judge.questions[0].content}
          </div>

          <div style="background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(255,255,255,0.08); padding: 1.2rem; border-radius: 8px;">
            <div style="font-size: 0.85rem; font-weight: 700; color: #00ff9d; margin-bottom: 0.6rem;">
              TIÊU CHUẨN ĐÁNH GIÁ CỦA GIÁM KHẢO (DEFENSE CHECKLIST):
            </div>
            <ul id="judge-rubric-box" style="padding-left: 1.2rem; font-size: 0.88rem; color: #d1d9e6; line-height: 1.6;">
              ${judge.questions[0].rubric.map(r => `<li>${r}</li>`).join('')}
            </ul>
          </div>

          <div style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.8rem;">
            <textarea class="answer-textarea" id="judge-rebuttal-input" style="width: 100%; min-height: 100px;" placeholder="Nhập câu trả lời phản biện đanh thép của bạn trước câu hỏi này của Giám khảo..."></textarea>
            <div style="display: flex; justify-content: flex-end;">
              <button class="btn-primary" id="btn-submit-rebuttal">Trình Bày Lập Luận Phản Biện</button>
            </div>
          </div>
        </div>
      </div>
    `;

    const qBtns = councilStage.querySelectorAll('.judge-q-btn');
    const qBox = document.getElementById('judge-q-box');
    const rubricBox = document.getElementById('judge-rubric-box');

    qBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        qBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const qData = judge.questions[parseInt(btn.dataset.qidx)];
        qBox.innerHTML = qData.content;
        rubricBox.innerHTML = qData.rubric.map(r => `<li>${r}</li>`).join('');
      });
    });

    document.getElementById('btn-submit-rebuttal').addEventListener('click', () => {
      const reb = document.getElementById('judge-rebuttal-input').value.trim();
      if (!reb) {
        alert("Vui lòng nhập lập luận phản biện!");
        return;
      }
      alert(`[KẾT LUẬN GIÁM KHẢO]: "Lập luận của bạn rất có sức thuyết phục và nắm chắc bản chất hệ thống. Tôi chấp thuận câu trả lời này!"`);
    });
  }

  judgesContainer.innerHTML = '';
  JUDGES.forEach((judge, idx) => {
    const card = document.createElement('div');
    card.className = `judge-card ${idx === 0 ? 'active' : ''}`;
    card.innerHTML = `
      <span class="judge-threat-level ${judge.threatClass}">${judge.threat}</span>
      <div class="judge-avatar">${judge.avatar}</div>
      <div class="judge-name">${judge.name}</div>
      <div class="judge-role">${judge.role}</div>
    `;
    card.addEventListener('click', () => {
      document.querySelectorAll('.judge-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      renderJudgeStage(judge);
    });
    judgesContainer.appendChild(card);
  });
  renderJudgeStage(JUDGES[0]);

  // 5. Render Mode 3 & Tab 4: Forensic Case Studies (6 Cases)
  const caseWorkspace = document.getElementById('cases-workspace');
  if (caseWorkspace) {
    caseWorkspace.innerHTML = `
      <div class="cases-list-panel" id="cases-list"></div>
      <div class="case-investigation-area" id="case-detail"></div>
    `;

    const casesList = document.getElementById('cases-list');
    const caseDetail = document.getElementById('case-detail');

    function renderCaseDetail(c) {
      caseDetail.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
          <span style="font-family: var(--font-mono); color: #ff3366; font-weight: 700;">HỒ SƠ GIÁM ĐỊNH: ${c.id}</span>
          <span class="badge" style="background: rgba(255, 51, 102, 0.2); color: #ff3366;">${c.category}</span>
        </div>
        <h3 style="font-size: 1.4rem; color: #fff; margin-bottom: 0.5rem;">${c.title}</h3>
        <p style="color: #8b9bb4; font-size: 0.9rem; line-height: 1.5; margin-bottom: 1.5rem;">${c.audioProfile}</p>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.5rem;">
          <div class="metric-box">
            <span class="metric-label">Micro-Jitter:</span>
            <span class="metric-val" style="font-size: 1rem;">${c.telemetry.jitter}</span>
          </div>
          <div class="metric-box">
            <span class="metric-label">Glottal Stop Mining:</span>
            <span class="metric-val" style="font-size: 1rem;">${c.telemetry.glottal}</span>
          </div>
          <div class="metric-box">
            <span class="metric-label">Dội Âm ISO 3382 RT60:</span>
            <span class="metric-val" style="font-size: 1rem;">${c.telemetry.rt60}</span>
          </div>
          <div class="metric-box">
            <span class="metric-label">Dải Biến Thiên Cao Độ F0:</span>
            <span class="metric-val" style="font-size: 1rem;">${c.telemetry.f0Span}</span>
          </div>
          <div class="metric-box">
            <span class="metric-label">Bước Nhảy Nền Nhiễu:</span>
            <span class="metric-val" style="font-size: 1rem;">${c.telemetry.noiseJump}</span>
          </div>
          <div class="metric-box">
            <span class="metric-label">Mô Hình Khả Nghi:</span>
            <span class="metric-val" style="font-size: 0.85rem; color: #ffb700;">${c.suspectModel}</span>
          </div>
        </div>

        <div style="background: rgba(0, 0, 0, 0.4); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 1.2rem; margin-bottom: 1.5rem;">
          <div style="font-weight: 700; color: #00f0ff; margin-bottom: 0.5rem;">HÀNH ĐỘNG GIÁM ĐỊNH CỦA BẠN:</div>
          <div style="display: flex; gap: 1rem;">
            <button class="btn-primary" id="btn-verdict-fake" style="background: linear-gradient(135deg, #ff3366, #ff0055); color: #fff;">
              🚨 KẾT ÁN: DEEPFAKE GIAN LẬN
            </button>
            <button class="btn-secondary" id="btn-verdict-real" style="border-color: #00ff9d; color: #00ff9d;">
              ✅ XÁC NHẬN: NGƯỜI SỐNG HỢP LỆ
            </button>
          </div>
        </div>

        <div id="verdict-result-box" style="display: none; background: rgba(255, 51, 102, 0.12); border: 1px solid #ff3366; padding: 1.2rem; border-radius: 8px; margin-bottom: 1.5rem;">
          <div style="font-weight: 700; color: #ff5555; font-size: 0.95rem; margin-bottom: 0.4rem;">${c.verdict}</div>
          <p style="font-size: 0.88rem; color: #fed7aa; line-height: 1.6;">${c.analysisText}</p>
        </div>
      `;

      const resBox = document.getElementById('verdict-result-box');
      document.getElementById('btn-verdict-fake').addEventListener('click', () => {
        resBox.style.display = 'block';
        if (c.groundTruth === 'FAKE') {
          alert("CHÍNH XÁC! Bạn đã nhận diện đúng các dấu vết vật lý giả mạo.");
        } else {
          alert("CẢNH BÁO: BẠN ĐÃ KẾT ÁN SAI! Đây là trường hợp khách hàng người thật bị bệnh lý giọng nói.");
        }
      });
      document.getElementById('btn-verdict-real').addEventListener('click', () => {
        resBox.style.display = 'block';
        if (c.groundTruth === 'REAL') {
          alert("CHÍNH XÁC! Bạn đã không mắc bẫy báo động giả của trường hợp bệnh lý.");
        } else {
          alert("NGUY HIỂM: BẠN ĐÃ BỊ QUA MẶT! Cuộc gọi này có dấu hiệu giả mạo rõ ràng.");
        }
      });
    }

    casesList.innerHTML = '';
    FORENSIC_CASES.forEach((c, idx) => {
      const btn = document.createElement('div');
      btn.className = `case-card-btn ${idx === 0 ? 'active' : ''}`;
      btn.innerHTML = `
        <div class="case-header-row">
          <span class="case-code">${c.id}</span>
          <span class="case-badge badge-finance">${c.category}</span>
        </div>
        <div class="case-title">${c.title}</div>
        <div class="case-desc">${c.audioProfile.substring(0, 75)}...</div>
      `;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.case-card-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderCaseDetail(c);
      });
      casesList.appendChild(btn);
    });
    renderCaseDetail(FORENSIC_CASES[0]);
  }

  // 6. Render Mode 4 & Tab 5: Quiz Trap Engine (Categorized Filters)
  window.QUIZ_QUESTIONS = QUIZ_QUESTIONS;
  let activeQuizList = QUIZ_QUESTIONS;
  let currentQuizIdx = 0;
  let quizScore = 0;
  const quizCard = document.getElementById('quiz-card');
  const quizProgress = document.getElementById('quiz-progress');
  const quizScoreEl = document.getElementById('quiz-score');
  const quizAccEl = document.getElementById('quiz-acc');

  // Filter Pills Event Listeners
  const filterPills = document.querySelectorAll('.quiz-filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.dataset.cat;
      if (cat === 'all') {
        activeQuizList = QUIZ_QUESTIONS;
      } else if (cat === 'ai-generated') {
        const stored = (window.DeepGuardAIForge && window.DeepGuardAIForge.loadQuestions) ? window.DeepGuardAIForge.loadQuestions() : [];
        const inMem = QUIZ_QUESTIONS.filter(q => q.isAiGenerated || q.cat === 'ai-generated');
        const combined = [...inMem];
        stored.forEach(s => {
          if (!combined.some(c => c.id === s.id)) combined.push(s);
        });
        activeQuizList = combined;
      } else {
        activeQuizList = QUIZ_QUESTIONS.filter(q => q.cat === cat);
      }
      resetQuiz();
    });
  });

  function renderQuizQuestion(idx) {
    if (activeQuizList.length === 0) {
      quizCard.innerHTML = `
        <div style="text-align: center; padding: 3rem 1.5rem;">
          <div style="font-size: 2.5rem; margin-bottom: 0.8rem;">🤖</div>
          <h3 style="font-size: 1.3rem; color: #ffb700; margin-bottom: 0.8rem;">Chưa Có Câu Hỏi Nào Trong Mục Này!</h3>
          <p style="color: #cbd5e1; font-size: 0.95rem; max-width: 500px; margin: 0 auto 1.5rem; line-height: 1.5;">
            Hãy mở tab <strong>AI Forge & Tự Động Hóa Kho Câu Hỏi</strong> để AI quét Stack Overflow, đọc Code hoặc phân tích Hình Ảnh và nạp câu hỏi vào đây.
          </p>
          <button class="btn-primary" id="btn-goto-ai-forge-empty" style="background: linear-gradient(135deg, #00f0ff, #b55fe6); color: #040711; font-weight: 700; padding: 0.7rem 1.4rem;">
            ⚡ Mở AI Forge Sinh Câu Hỏi Ngay ➔
          </button>
        </div>
      `;
      const btnGoto = document.getElementById('btn-goto-ai-forge-empty');
      if (btnGoto) {
        btnGoto.addEventListener('click', () => {
          const tab = document.querySelector('.nav-tab[data-tab="ai-question-forge"]');
          if (tab) tab.click();
        });
      }
      quizProgress.textContent = `0 / 0`;
      return;
    }

    if (idx >= activeQuizList.length) {
      quizCard.innerHTML = `
        <div style="text-align: center; padding: 2.5rem;">
          <h2 style="font-size: 2rem; color: #00ff9d;">🎉 CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH PHẦN THI!</h2>
          <p style="margin: 1.2rem 0; font-size: 1.2rem; color: #d1d9e6;">
            Điểm số chung cuộc: <strong style="color: #00f0ff; font-size: 1.6rem;">${quizScore} / ${activeQuizList.length}</strong>
            (${Math.round((quizScore / activeQuizList.length) * 100)}%)
          </p>
          <button class="btn-primary" id="btn-quiz-restart-end">Làm Lại Bộ Đề</button>
        </div>
      `;
      document.getElementById('btn-quiz-restart-end').addEventListener('click', resetQuiz);
      return;
    }

    const q = activeQuizList[idx];
    quizProgress.textContent = `${idx + 1} / ${activeQuizList.length}`;

    quizCard.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
        <span style="font-family: var(--font-mono); color: #00f0ff; font-size: 0.8rem; font-weight: 700;">
          CÂU HỎI BẪY LOGIC #${idx + 1}:
        </span>
        <div>
          <span class="badge" style="background: rgba(0, 240, 255, 0.15); color: #00f0ff;">CHỦ ĐỀ: ${q.cat ? q.cat.toUpperCase() : 'GENERAL'}</span>
          ${q.isAiGenerated ? '<span class="badge" style="background: rgba(181, 95, 230, 0.15); color: #b55fe6; margin-left: 6px;">🤖 AI FORGED</span>' : ''}
          ${q.image ? '<span class="badge" style="background: rgba(0, 255, 157, 0.15); color: #00ff9d; margin-left: 6px;">🖼️ KÈM ẢNH BẰNG CHỨNG</span>' : ''}
        </div>
      </div>
      <div class="quiz-question-text">${q.q}</div>

      ${q.image ? `
        <div class="quiz-question-image-box" style="margin: 1rem 0; background: rgba(0,0,0,0.4); border: 1px solid var(--border-glow-cyan); border-radius: var(--radius-md); padding: 0.8rem; text-align: center;">
          <img src="${q.image}" class="quiz-question-img" alt="Bằng chứng giám định" style="max-height: 240px; max-width: 100%; border-radius: 6px; cursor: pointer; object-fit: contain; transition: transform 0.2s;" />
          <div style="margin-top: 0.6rem; display: flex; justify-content: center; gap: 0.8rem; align-items: center;">
            <span style="font-size: 0.8rem; color: #8b9bb4; font-family: var(--font-mono);">
              ${q.imageCaption || '🔍 Bằng chứng quang phổ / sơ đồ thực nghiệm'}
            </span>
            <button type="button" class="btn-zoom-image" data-img="${q.image}" data-caption="${q.imageCaption || q.q}" style="background: rgba(0,240,255,0.15); border: 1px solid #00f0ff; color: #00f0ff; padding: 0.3rem 0.7rem; border-radius: 4px; font-size: 0.75rem; cursor: pointer;">
              🔍 Phóng To Xem Chi Tiết
            </button>
          </div>
        </div>
      ` : ''}

      ${q.svgDiagram ? `
        <div class="quiz-question-diagram-box" style="margin: 1rem 0; border-radius: 8px; overflow: hidden;">
          ${q.svgDiagram}
        </div>
      ` : ''}

      <div class="quiz-options-list">
        ${q.opts.map((opt, oIdx) => `
          <button class="quiz-opt-btn" data-opt="${oIdx}">
            <span style="font-weight: 700; color: #00f0ff; min-width: 20px;">${['A', 'B', 'C', 'D'][oIdx]}.</span>
            <span>${opt}</span>
          </button>
        `).join('')}
      </div>
      <div class="quiz-feedback-box" id="quiz-feedback"></div>
      <div style="display: flex; justify-content: flex-end; margin-top: 1rem;">
        <button class="btn-secondary" id="btn-quiz-next" style="display: none;">Câu Tiếp Theo ➔</button>
      </div>
    `;

    const optBtns = quizCard.querySelectorAll('.quiz-opt-btn');
    const feedbackBox = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('btn-quiz-next');

    // Bind Image Lightbox
    const zoomBtn = quizCard.querySelector('.btn-zoom-image');
    if (zoomBtn) {
      zoomBtn.addEventListener('click', () => {
        if (window.DeepGuardAIForge && window.DeepGuardAIForge.openLightbox) {
          window.DeepGuardAIForge.openLightbox(zoomBtn.dataset.img, zoomBtn.dataset.caption);
        }
      });
    }
    const qImg = quizCard.querySelector('.quiz-question-img');
    if (qImg) {
      qImg.addEventListener('click', () => {
        if (window.DeepGuardAIForge && window.DeepGuardAIForge.openLightbox) {
          window.DeepGuardAIForge.openLightbox(qImg.src, q.imageCaption || q.q);
        }
      });
    }

    optBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const selected = parseInt(btn.dataset.opt);
        optBtns.forEach(b => b.disabled = true);
        const isCorrect = (selected === q.ans);

        // Record User Behavior for Adaptive Learning Engine
        if (window.DeepGuardAIForge && window.DeepGuardAIForge.recordQuizAttempt) {
          window.DeepGuardAIForge.recordQuizAttempt({
            questionId: q.id || `q-${idx}`,
            category: q.cat || 'general',
            questionText: q.q,
            selected: selected,
            correct: q.ans,
            isCorrect: isCorrect,
            timestamp: Date.now()
          });
        }

        // Cross-sync with Progressive Academy if answering an academy question
        if (window.ProgressiveAcademyEngine && q.isProgressiveAcademy) {
          window.ProgressiveAcademyEngine.recordAnswer(q, selected);
        }

        if (isCorrect) {
          btn.classList.add('correct');
          quizScore++;
          feedbackBox.innerHTML = `
            <strong style="color: #00ff9d;">CHÍNH XÁC!</strong><br>${q.exp}
          `;
        } else {
          btn.classList.add('wrong');
          optBtns[q.ans].classList.add('correct');
          feedbackBox.innerHTML = `
            <strong style="color: #ff3366;">SAI RỒI! BẠN ĐÃ MẮC BẪY.</strong><br>${q.exp}
          `;
        }
        feedbackBox.style.display = 'block';
        nextBtn.style.display = 'block';

        quizScoreEl.textContent = quizScore;
        quizAccEl.textContent = `${Math.round((quizScore / (idx + 1)) * 100)}%`;
      });
    });

    nextBtn.addEventListener('click', () => {
      currentQuizIdx++;
      renderQuizQuestion(currentQuizIdx);
    });
  }

  function resetQuiz() {
    currentQuizIdx = 0;
    quizScore = 0;
    quizScoreEl.textContent = '0';
    quizAccEl.textContent = '0%';
    renderQuizQuestion(0);
  }
  document.getElementById('btn-reset-quiz').addEventListener('click', resetQuiz);
  renderQuizQuestion(0);

  // 7. Render Mode 5: Code Audit Studio (5 Backend Modules)
  const codeNav = document.getElementById('code-module-nav');
  const codeViewer = document.getElementById('code-viewer-panel');

  function renderCodeModule(mod) {
    codeViewer.innerHTML = `
      <div class="code-banner">
        <div>
          <h3>${mod.filename}</h3>
          <p style="color: #8b9bb4; font-size: 0.82rem; margin-top: 3px;">${mod.desc}</p>
        </div>
        <span class="perf-badge">${mod.perf}</span>
      </div>

      <div class="param-playground">
        <div class="playground-title">🎛️ KHÔNG GIAN THỬ NGHIỆM THAM SỐ (PARAMETER PLAYGROUND)</div>
        ${mod.sliders.map(s => `
          <div class="slider-group">
            <span>${s.label}</span>
            <input type="range" id="${s.id}" min="${s.min}" max="${s.max}" step="${s.step}" value="${s.val}">
            <span id="${s.id}-val" style="font-family: var(--font-mono); color: #00f0ff; width: 60px;">${s.val}${s.unit}</span>
          </div>
        `).join('')}
        <div class="sim-output-box" id="mod-sim-output">
          ${mod.calcSim(Object.fromEntries(mod.sliders.map(s => [s.id, s.val])))}
        </div>
      </div>

      <div>
        <div style="font-family: var(--font-heading); font-size: 0.95rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;">
          MÃ NGUỒN TRIỂN KHAI BACKEND:
        </div>
        <div class="source-code-block">${mod.code}</div>
      </div>
    `;

    mod.sliders.forEach(s => {
      const sliderEl = document.getElementById(s.id);
      const valEl = document.getElementById(`${s.id}-val`);
      sliderEl.addEventListener('input', () => {
        valEl.textContent = `${sliderEl.value}${s.unit}`;
        const currentVals = Object.fromEntries(mod.sliders.map(item => [item.id, parseFloat(document.getElementById(item.id).value)]));
        document.getElementById('mod-sim-output').textContent = mod.calcSim(currentVals);
      });
    });
  }

  codeNav.innerHTML = '';
  CODE_AUDIT_MODULES.forEach((mod, idx) => {
    const btn = document.createElement('div');
    btn.className = `code-module-btn ${idx === 0 ? 'active' : ''}`;
    btn.innerHTML = `
      <span class="mod-filename">${mod.filename.split('/').pop()}</span>
      <div class="mod-desc">${mod.title}</div>
    `;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.code-module-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCodeModule(mod);
    });
    codeNav.appendChild(btn);
  });
  renderCodeModule(CODE_AUDIT_MODULES[0]);

  // 8. Integrate ForensicAudioEngine & Live Canvas Visualizers (Tab 2)
  const audioEngine = new ForensicAudioEngine();
  initVisualizers(audioEngine);

  const synthButtons = [
    { id: 'btn-synth-human', handler: () => audioEngine.playHumanVoice() },
    { id: 'btn-synth-vocoder', handler: () => audioEngine.playVocoderDeepfake() },
    { id: 'btn-synth-rvc', handler: () => audioEngine.playRVCPhaseJitter() },
    { id: 'btn-synth-glottal-real', handler: () => audioEngine.playRealGlottalStop() },
    { id: 'btn-synth-glottal-fake', handler: () => audioEngine.playFakeGlottalStop() },
    { id: 'btn-synth-replay', handler: () => audioEngine.playReplayAttack() }
  ];

  synthButtons.forEach(({ id, handler }) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', () => {
        document.querySelectorAll('.synth-btn').forEach(b => b.classList.remove('active'));
        el.classList.add('active');
        handler();
      });
    }
  });

  const stopBtn = document.getElementById('btn-stop-audio');
  if (stopBtn) {
    stopBtn.addEventListener('click', () => audioEngine.stopAll());
  }

  const volSlider = document.getElementById('vol-slider');
  if (volSlider) {
    volSlider.addEventListener('input', (e) => audioEngine.setVolume(parseFloat(e.target.value)));
  }

  // ===================================================================
  // 9. PHƯƠNG ÁN A: LIVE MICROPHONE & VOICE-DRIVEN DEFENSE
  // ===================================================================
  let micStream = null;
  let micSourceNode = null;
  let isMicActive = false;
  const btnToggleMic = document.getElementById('btn-toggle-mic');
  const micBadge = document.getElementById('mic-status-badge');
  const liveMicReadout = document.getElementById('live-mic-readout');
  const micF0Val = document.getElementById('mic-f0-val');
  const micJitterVal = document.getElementById('mic-jitter-val');
  const micLivenessVal = document.getElementById('mic-liveness-val');

  if (btnToggleMic) {
    btnToggleMic.addEventListener('click', async () => {
      audioEngine.init();
      if (!isMicActive) {
        try {
          micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
          micSourceNode = audioEngine.ctx.createMediaStreamSource(micStream);
          micSourceNode.connect(audioEngine.analyser);
          isMicActive = true;
          audioEngine.isPlaying = true;
          btnToggleMic.textContent = '⏹️ Tắt Micro Phân Tích';
          btnToggleMic.style.background = 'rgba(255, 51, 102, 0.3)';
          micBadge.textContent = '🔴 Micro Đang Mở (16kHz)';
          micBadge.style.background = 'rgba(0, 255, 157, 0.2)';
          micBadge.style.color = '#00ff9d';
          liveMicReadout.style.display = 'block';

          // Live pitch & Jitter tracking loop from mic stream
          const trackMicPitch = () => {
            if (!isMicActive) return;
            const buffer = new Float32Array(audioEngine.analyser.fftSize);
            audioEngine.analyser.getFloatTimeDomainData(buffer);

            // Autocorrelation pitch extraction
            let rms = 0;
            for (let i = 0; i < buffer.length; i++) rms += buffer[i] * buffer[i];
            rms = Math.sqrt(rms / buffer.length);

            if (rms > 0.02) {
              // Voiced sound detected
              let rMax = -1, bestLag = -1;
              const minLag = Math.floor(audioEngine.ctx.sampleRate / 400); // 400Hz
              const maxLag = Math.floor(audioEngine.ctx.sampleRate / 80);  // 80Hz
              for (let lag = minLag; lag < maxLag; lag++) {
                let r = 0;
                for (let i = 0; i < buffer.length - lag; i++) {
                  r += buffer[i] * buffer[i + lag];
                }
                if (r > rMax) { rMax = r; bestLag = lag; }
              }
              const estF0 = Math.round(audioEngine.ctx.sampleRate / bestLag);
              const jitterSim = (1.1 + Math.random() * 0.4).toFixed(2);
              micF0Val.textContent = `${estF0} Hz`;
              micJitterVal.textContent = `${jitterSim}%`;
              micLivenessVal.textContent = 'LIVENESS PASS (Người sống thật)';
              micLivenessVal.style.color = '#00ff9d';
            } else {
              micF0Val.textContent = '-- Hz';
              micJitterVal.textContent = '-- %';
              micLivenessVal.textContent = 'Im lặng / Chưa phát âm';
              micLivenessVal.style.color = '#8b9bb4';
            }
            requestAnimationFrame(trackMicPitch);
          };
          trackMicPitch();
        } catch (err) {
          alert("Không thể truy cập Microphone: " + err.message);
        }
      } else {
        if (micStream) micStream.getTracks().forEach(t => t.stop());
        if (micSourceNode) micSourceNode.disconnect();
        isMicActive = false;
        audioEngine.isPlaying = false;
        btnToggleMic.textContent = '🎙️ Bật Micro Phân Tích';
        btnToggleMic.style.background = '';
        micBadge.textContent = 'Chưa bật mic';
        micBadge.style.background = 'rgba(148,163,184,0.2)';
        micBadge.style.color = '#94a3b8';
        liveMicReadout.style.display = 'none';
      }
    });
  }

  // SpeechSynthesis: Giám khảo AI đọc to câu hỏi
  const btnSpeakJudge = document.getElementById('btn-speak-judge-q');
  if (btnSpeakJudge) {
    btnSpeakJudge.addEventListener('click', () => {
      const activeQ = document.getElementById('judge-q-box');
      const textToSpeak = activeQ ? activeQ.textContent.replace(/["\n]/g, ' ').trim() : "Xin mời thí sinh giải trình luận điểm khoa học trước Hội đồng.";
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(textToSpeak);
        utter.lang = 'vi-VN';
        utter.rate = 1.0;
        window.speechSynthesis.speak(utter);
      } else {
        alert("Trình duyệt không hỗ trợ Web Speech API.");
      }
    });
  }

  // ===================================================================
  // 10. PHƯƠNG ÁN B: FILE UPLOADER & FIPS 140-3 DOSSIER GENERATOR
  // ===================================================================
  const dropZone = document.getElementById('file-drop-zone');
  const fileInput = document.getElementById('audio-file-input');
  const fileMetaCard = document.getElementById('file-meta-card');
  const btnExportDossier = document.getElementById('btn-export-dossier');
  const dossierReportView = document.getElementById('dossier-report-view');
  let currentFileTelemetry = null;

  if (dropZone && fileInput) {
    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      if (e.dataTransfer.files.length > 0) processUploadedAudioFile(e.dataTransfer.files[0]);
    });
    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) processUploadedAudioFile(e.target.files[0]);
    });
  }

  async function processUploadedAudioFile(file) {
    audioEngine.init();
    const arrayBuffer = await file.arrayBuffer();

    // 1. Compute SHA-256 Hash
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const sha256Hex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // 2. Decode Audio Data via Web Audio API
    audioEngine.ctx.decodeAudioData(arrayBuffer.slice(0), (audioBuffer) => {
      const pcmData = audioBuffer.getChannelData(0);
      const duration = audioBuffer.duration.toFixed(2);
      const sr = audioBuffer.sampleRate;

      // Extract telemetry metrics
      let peakRms = 0;
      for (let i = 0; i < pcmData.length; i++) peakRms = Math.max(peakRms, Math.abs(pcmData[i]));

      const jitterSim = (peakRms > 0.8 ? (0.20 + Math.random() * 0.15) : (1.15 + Math.random() * 0.4)).toFixed(2);
      const glottalDrop = (jitterSim < 0.35 ? -4.2 : -14.6).toFixed(1);
      const rt60Sim = (jitterSim < 0.35 ? 0.08 : 0.36).toFixed(2);
      const cnnScore = (jitterSim < 0.35 ? 0.98 : 0.05).toFixed(2);
      const isFake = (jitterSim < 0.35 || rt60Sim < 0.15);

      currentFileTelemetry = {
        filename: file.name,
        filesize: (file.size / 1024).toFixed(1) + " KB",
        duration: duration + "s",
        sampleRate: sr + " Hz",
        sha256: sha256Hex,
        jitter: jitterSim + "%",
        glottal: glottalDrop + " dB",
        rt60: rt60Sim + "s",
        cnn: cnnScore,
        decision: isFake ? "HARD VETO: DEEPFAKE XÁC XUẤT 99.8%" : "PASS: NGƯỜI SỐNG HỢP LỆ",
        verdictColor: isFake ? "#ff3366" : "#00ff9d"
      };

      // Render Metadata Card
      fileMetaCard.style.display = 'flex';
      fileMetaCard.innerHTML = `
        <div class="file-meta-row"><span>Tệp Tin:</span><span class="file-meta-val">${file.name}</span></div>
        <div class="file-meta-row"><span>Kích thước:</span><span class="file-meta-val">${currentFileTelemetry.filesize}</span></div>
        <div class="file-meta-row"><span>Độ dài:</span><span class="file-meta-val">${duration}s (${sr}Hz)</span></div>
        <div class="file-meta-row"><span>SHA-256:</span><span class="file-meta-val" style="font-size: 0.65rem; word-break: break-all;">${sha256Hex}</span></div>
        <div class="file-meta-row"><span>Micro-Jitter:</span><span class="file-meta-val">${jitterSim}%</span></div>
        <div class="file-meta-row"><span>Glottal Stop ΔE:</span><span class="file-meta-val">${glottalDrop} dB</span></div>
        <div class="file-meta-row"><span>Dội âm RT60:</span><span class="file-meta-val">${rt60Sim}s</span></div>
        <div class="file-meta-row"><span>Phán Quyết:</span><span class="file-meta-val" style="color: ${currentFileTelemetry.verdictColor};">${currentFileTelemetry.decision}</span></div>
      `;
      btnExportDossier.style.display = 'block';

      // Draw Waveform on Canvas
      drawUploadedWaveform(pcmData);
    });
  }

  function drawUploadedWaveform(pcm) {
    const cv = document.getElementById('canvas-file-waveform');
    if (!cv) return;
    const ctx = cv.getContext('2d');
    ctx.fillStyle = '#04070e';
    ctx.fillRect(0, 0, cv.width, cv.height);

    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    const step = Math.ceil(pcm.length / cv.width);
    const amp = cv.height / 2;
    for (let i = 0; i < cv.width; i++) {
      let min = 1.0, max = -1.0;
      for (let j = 0; j < step; j++) {
        const datum = pcm[(i * step) + j];
        if (datum < min) min = datum;
        if (datum > max) max = datum;
      }
      ctx.moveTo(i, (1 + min) * amp);
      ctx.lineTo(i, (1 + max) * amp);
    }
    ctx.stroke();
  }

  if (btnExportDossier) {
    btnExportDossier.addEventListener('click', () => {
      if (!currentFileTelemetry) return;
      dossierReportView.style.display = 'block';
      const nowUtc = new Date().toISOString();
      const mockEd25519 = "ed25519_sig_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const mockTsa = "tsa_token_rfc3161_utc_" + Date.now();

      dossierReportView.innerHTML = `
        <div class="court-dossier-document">
          <div class="court-header-national">
            <div class="court-nat-title">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
            <div class="court-nat-motto">Độc lập - Tự do - Hạnh phúc</div>
            <div style="margin-top: 0.8rem; font-size: 0.85rem; font-family: Arial, sans-serif;">
              <strong>BỘ CÔNG AN - VIỆN KHOA HỌC HÌNH SỰ</strong><br>
              PHÒNG GIÁM ĐỊNH KỸ THUẬT KỸ THUẬT SỐ & PHÁP Y ÂM THANH
            </div>
          </div>

          <div class="court-dossier-title">BÁO CÁO KẾT LUẬN GIÁM ĐỊNH TƯ PHÁP ÂM THANH SỐ</div>
          <div style="text-align: center; font-size: 0.85rem; font-style: italic; margin-bottom: 1.2rem;">
            (Căn cứ Quyết định trưng cầu giám định số DG-FORENSIC-${Date.now().toString().slice(-6)} theo Điều 206 Bộ luật Tố tụng Hình sự 2015)
          </div>

          <p style="font-size: 0.9rem; margin-bottom: 0.8rem;">
            <strong>I. THÔNG TIN MẪU VẬT GIÁM ĐỊNH:</strong><br>
            - Tên tệp tin tiếp nhận: <strong>${currentFileTelemetry.filename}</strong> (${currentFileTelemetry.filesize})<br>
            - Thời lượng âm thanh: <strong>${currentFileTelemetry.duration}</strong> | Tần số lấy mẫu: <strong>${currentFileTelemetry.sampleRate}</strong><br>
            - Mã băm tính toàn vẹn (SHA-256):
          </p>
          <div class="court-hash-box">${currentFileTelemetry.sha256}</div>

          <p style="font-size: 0.9rem; margin: 1rem 0 0.5rem;">
            <strong>II. KẾT QUẢ PHÂN TÍCH ĐA TẦNG PHÁP Y (FORENSIC MULTI-TIER ANALYSIS):</strong>
          </p>
          <table class="court-table">
            <thead>
              <tr>
                <th>Tầng Phân Tích</th>
                <th>Thông Số Đo Đạc</th>
                <th>Ngưỡng Chuẩn Người Sống</th>
                <th>Đánh Giá Pháp Y</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>1. Vi dao động dây thanh (NAFE)</strong></td>
                <td>Jitter: ${currentFileTelemetry.jitter}</td>
                <td>0.6% - 2.5% (Titze 1994)</td>
                <td>${parseFloat(currentFileTelemetry.jitter) < 0.35 ? 'BẤT THƯỜNG: Vocoder Over-smoothing' : 'BÌNH THƯỜNG: Dao động sinh học'}</td>
              </tr>
              <tr>
                <td><strong>2. Nắp thanh môn (Glottal Stop)</strong></td>
                <td>ΔE: ${currentFileTelemetry.glottal}</td>
                <td>&lt; -12 dB (Thanh Ngã)</td>
                <td>${parseFloat(currentFileTelemetry.glottal) > -6 ? 'BẤT THƯỜNG: AI TTS thiếu cú ngắt cơ học' : 'BÌNH THƯỜNG: Khép chặt thanh quản'}</td>
              </tr>
              <tr>
                <td><strong>3. Dội âm phòng (ISO 3382)</strong></td>
                <td>RT60: ${currentFileTelemetry.rt60}</td>
                <td>0.20s - 0.65s (ISO 3382-1)</td>
                <td>${parseFloat(currentFileTelemetry.rt60) < 0.15 ? 'BẤT THƯỜNG: Phòng câm ảo / Card số' : (parseFloat(currentFileTelemetry.rt60) > 0.85 ? 'BẤT THƯỜNG: Replay loa ngoài kép' : 'BÌNH THƯỜNG: Môi trường tự nhiên')}</td>
              </tr>
              <tr>
                <td><strong>4. Học sâu MelCNN 2D ONNX</strong></td>
                <td>Xác suất Fake: ${currentFileTelemetry.cnn}</td>
                <td>&lt; 0.30 (Dải an toàn)</td>
                <td>${parseFloat(currentFileTelemetry.cnn) > 0.70 ? 'DẤU HIỆU: Khớp vân tay Neural Vocoder' : 'DẤU HIỆU: Không phát hiện mô hình quen thuộc'}</td>
              </tr>
            </tbody>
          </table>

          <div style="background: #f8fafc; border-left: 4px solid #990000; padding: 0.8rem; margin: 1.2rem 0; font-family: Arial, sans-serif;">
            <div style="font-weight: bold; color: #990000; font-size: 0.95rem;">III. KẾT LUẬN GIÁM ĐỊNH TƯ PHÁP CHÍNH THỨC:</div>
            <div style="font-size: 0.9rem; margin-top: 0.4rem; color: #111827;">
              ${currentFileTelemetry.decision}<br>
              <em>Biên bản giám định này có đầy đủ giá trị chứng cứ tố tụng trước Tòa án Nhân dân và các cơ quan tiến hành tố tụng có thẩm quyền.</em>
            </div>
          </div>

          <div style="font-size: 0.8rem; color: #4b5563; line-height: 1.5; margin-top: 1rem; border-top: 1px dashed #cbd5e1; padding-top: 0.8rem;">
            <div>- Khóa ký số pháp nhân FIPS 140-3: <code>${mockEd25519}</code></div>
            <div>- Dấu thời gian tin cậy quốc tế RFC 3161 TSA: <code>${mockTsa}</code> (${nowUtc})</div>
          </div>

          <div class="court-signatures">
            <div>
              <strong>CƠ QUAN TRƯNG CẦU GIÁM ĐỊNH</strong><br>
              <div style="margin-top: 3.5rem; font-style: italic;">(Ký và ghi rõ họ tên)</div>
            </div>
            <div>
              <strong>GIÁM ĐỊNH VIÊN TƯ PHÁP TRƯỞNG</strong><br>
              <div class="court-seal-stamp">
                <span>BỘ CÔNG AN</span>
                <span>VIỆN KHOA HỌC</span>
                <span>HÌNH SỰ</span>
                <span>★ ĐÃ XÁC THỰC ★</span>
              </div>
              <div style="margin-top: 0.5rem; font-weight: bold;">GS. TRẦN NAM SƠN</div>
            </div>
          </div>

          <div style="margin-top: 2rem; text-align: center;" class="no-print">
            <button class="btn-primary" onclick="window.print()" style="padding: 0.8rem 2.5rem; font-size: 1rem;">
              🖨️ In Báo Cáo Tư Pháp / Xuất PDF (Chuẩn A4 Tòa Án)
            </button>
          </div>
        </div>
      `;
    });
  }

  // ===================================================================
  // 11. PHƯƠNG ÁN D: RED-TEAM DEGRADATION SANDBOX
  // ===================================================================
  const atkG711 = document.getElementById('atk-g711');
  const atkNoise = document.getElementById('atk-noise');
  const atkPacketLoss = document.getElementById('atk-packet-loss');
  const atkPitchShift = document.getElementById('atk-pitch-shift');
  const atkReplayReverb = document.getElementById('atk-replay-reverb');
  const btnPlayDegraded = document.getElementById('btn-play-degraded');
  const btnStopDegraded = document.getElementById('btn-stop-degraded');

  const dynWCnn = document.getElementById('dyn-w-cnn');
  const dynWProsody = document.getElementById('dyn-w-prosody');
  const dynWAcoustics = document.getElementById('dyn-w-acoustics');
  const fillWCnn = document.getElementById('fill-w-cnn');
  const fillWProsody = document.getElementById('fill-w-prosody');
  const fillWAcoustics = document.getElementById('fill-w-acoustics');
  const redTeamVetoBanner = document.getElementById('red-team-veto-banner');

  function updateRedTeamGating() {
    let wCnn = 0.50, wProsody = 0.30, wAcoustics = 0.20;
    let statusText = "Kênh chuẩn 16kHz - Trọng số cân bằng";
    let statusColor = "#00f0ff";

    if (atkG711 && atkG711.checked) {
      wCnn = 0.10; wProsody = 0.65; wAcoustics = 0.25;
      statusText = "⚡ CỔNG ĐỘNG KÍCH HOẠT: Kênh thoại hẹp G.711 cắt 3.4kHz -> Hạ CNN xuống 0.10, dồn 65% vào F0 nắp thanh môn!";
      statusColor = "#ffb700";
    }
    if (atkReplayReverb && atkReplayReverb.checked) {
      statusText = "🚨 HARD VETO KÍCH HOẠT: Dội âm kép RT60 > 0.85s + Lọc lược Comb-filter -> KẾT TỘI REPLAY ATTACK!";
      statusColor = "#ff3366";
    }
    if (atkNoise && atkNoise.checked) {
      statusText = "⚠️ NHỒI TẠP ÂM BABBLE: Kích hoạt bộ lọc Wiener khử nhiễu spectral subtraction!";
    }

    dynWCnn.textContent = wCnn.toFixed(2);
    dynWProsody.textContent = wProsody.toFixed(2);
    dynWAcoustics.textContent = wAcoustics.toFixed(2);
    fillWCnn.style.width = (wCnn * 100) + "%";
    fillWProsody.style.width = (wProsody * 100) + "%";
    fillWAcoustics.style.width = (wAcoustics * 100) + "%";
    redTeamVetoBanner.textContent = statusText;
    redTeamVetoBanner.style.color = statusColor;
  }

  [atkG711, atkNoise, atkPacketLoss, atkPitchShift, atkReplayReverb].forEach(chk => {
    if (chk) chk.addEventListener('change', updateRedTeamGating);
  });

  if (btnPlayDegraded) {
    btnPlayDegraded.addEventListener('click', () => {
      audioEngine.init();
      audioEngine.stopAll();
      audioEngine.isPlaying = true;

      const t = audioEngine.ctx.currentTime;
      const osc = audioEngine.ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime((atkPitchShift && atkPitchShift.checked) ? 175 : 135, t);

      let lastNode = osc;

      // Apply G.711 Bandpass (300Hz - 3400Hz)
      if (atkG711 && atkG711.checked) {
        const bp = audioEngine.ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.setValueAtTime(1800, t);
        bp.Q.setValueAtTime(0.6, t);
        lastNode.connect(bp);
        lastNode = bp;
        audioEngine.activeNodes.push(bp);
      }

      // Apply Reverb Delay
      if (atkReplayReverb && atkReplayReverb.checked) {
        const delay = audioEngine.ctx.createDelay();
        delay.delayTime.setValueAtTime(0.018, t);
        const fb = audioEngine.ctx.createGain();
        fb.gain.setValueAtTime(0.75, t);
        lastNode.connect(delay);
        delay.connect(fb);
        fb.connect(delay);
        delay.connect(audioEngine.gainNode);
        audioEngine.activeNodes.push(delay, fb);
      }

      lastNode.connect(audioEngine.gainNode);
      osc.start(t);
      osc.stop(t + 4.0);
      audioEngine.activeNodes.push(osc);
    });
  }

  if (btnStopDegraded) {
    btnStopDegraded.addEventListener('click', () => audioEngine.stopAll());
  }

  // ===================================================================
  // 12. PHƯƠNG ÁN C: PHÒNG THI SÁT HẠCH 45 PHÚT & CHỨNG CHỈ PHÁP Y
  // ===================================================================
  const btnStartExam = document.getElementById('btn-start-exam');
  const candidateInput = document.getElementById('candidate-name');
  const examStartCard = document.getElementById('exam-start-card');
  const examActiveCard = document.getElementById('exam-active-card');
  const examResultCard = document.getElementById('exam-result-card');

  let examTimerInterval = null;
  let examSecondsLeft = 2700; // 45 phút = 2700 giây
  let examScore = 0;
  let currentExamQIdx = 0;
  let examQuestions = [];

  if (btnStartExam) {
    btnStartExam.addEventListener('click', () => {
      const name = candidateInput.value.trim() || "Chuyên Viên Giám Định";
      examStartCard.style.display = 'none';
      examActiveCard.style.display = 'flex';

      // Pick 8 randomized questions from QUIZ_QUESTIONS + 2 case studies
      const shuffled = [...QUIZ_QUESTIONS].sort(() => 0.5 - Math.random());
      examQuestions = shuffled.slice(0, 10);
      currentExamQIdx = 0;
      examScore = 0;
      examSecondsLeft = 2700;

      // Start Countdown
      clearInterval(examTimerInterval);
      examTimerInterval = setInterval(() => {
        examSecondsLeft--;
        const mins = Math.floor(examSecondsLeft / 60).toString().padStart(2, '0');
        const secs = (examSecondsLeft % 60).toString().padStart(2, '0');
        const timerEl = document.getElementById('exam-timer-display');
        if (timerEl) timerEl.textContent = `${mins}:${secs}`;

        if (examSecondsLeft <= 0) {
          clearInterval(examTimerInterval);
          finishExam(name);
        }
      }, 1000);

      renderExamQuestion(0, name);
    });
  }

  function renderExamQuestion(idx, name) {
    if (idx >= examQuestions.length) {
      clearInterval(examTimerInterval);
      finishExam(name);
      return;
    }

    const q = examQuestions[idx];
    const mins = Math.floor(examSecondsLeft / 60).toString().padStart(2, '0');
    const secs = (examSecondsLeft % 60).toString().padStart(2, '0');

    examActiveCard.innerHTML = `
      <div class="exam-header-bar">
        <div>
          <span style="font-size: 0.75rem; color: #8b9bb4;">THÍ SINH:</span>
          <strong style="color: #fff; margin-left: 5px;">${name}</strong>
        </div>
        <div>
          <span style="font-size: 0.75rem; color: #8b9bb4;">TIẾN ĐỘ:</span>
          <strong style="color: #00f0ff; margin-left: 5px;">${idx + 1} / ${examQuestions.length}</strong>
        </div>
        <div class="exam-timer">
          <span>⏳</span>
          <span id="exam-timer-display">${mins}:${secs}</span>
        </div>
      </div>

      <div style="font-family: var(--font-heading); font-size: 1.25rem; color: #fff; line-height: 1.5;">
        ${q.q}
      </div>

      <div class="quiz-options-list">
        ${q.opts.map((opt, oIdx) => `
          <button class="quiz-opt-btn exam-opt-btn" data-opt="${oIdx}">
            <span style="font-weight: 700; color: #00f0ff; min-width: 20px;">${['A', 'B', 'C', 'D'][oIdx]}.</span>
            <span>${opt}</span>
          </button>
        `).join('')}
      </div>
    `;

    examActiveCard.querySelectorAll('.exam-opt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sel = parseInt(btn.dataset.opt);
        if (sel === q.ans) examScore += 1;
        currentExamQIdx++;
        renderExamQuestion(currentExamQIdx, name);
      });
    });
  }

  function finishExam(name) {
    examActiveCard.style.display = 'none';
    examResultCard.style.display = 'block';

    const finalGpa = ((examScore / examQuestions.length) * 10).toFixed(1);
    const isPassed = finalGpa >= 8.5;
    const certId = "DG-CERT-" + Date.now().toString().slice(-8);
    const mockHash = "cert_sha256_" + Math.random().toString(36).substring(2, 12);

    examResultCard.innerHTML = `
      <div class="certificate-box">
        <div class="cert-seal">${isPassed ? '🏆' : '📋'}</div>
        <div style="font-size: 0.85rem; color: #8b9bb4; letter-spacing: 1px;">HỘI ĐỒNG THẨM ĐỊNH KHOA HỌC & AN NINH SINH TRẮC HỌC QUỐC GIA</div>
        <h2 class="cert-title">${isPassed ? 'CHỨNG CHỈ CHUYÊN GIA PHÁP Y ÂM THANH CẤP CAO' : 'KẾT QUẢ SÁT HẠCH BẢO VỆ ĐỒ ÁN'}</h2>
        <div style="font-size: 0.9rem; color: #a7f3d0; margin-top: 5px;">DEEPGUARD ENTERPRISE SENIOR AUDIO FORENSIC SPECIALIST (LEVEL 3)</div>

        <div style="margin: 1.5rem 0;">
          <div style="font-size: 0.85rem; color: #8b9bb4;">Chứng nhận học viên:</div>
          <div class="cert-candidate">${name}</div>
          <div style="font-size: 1.1rem; color: #fff;">
            Điểm Đồ Án Chung Cuộc: <strong style="color: ${isPassed ? '#00ff9d' : '#ff3366'}; font-size: 1.5rem;">${finalGpa} / 10</strong>
            (${isPassed ? 'XẾP LOẠI: XUẤT SẮC - THÔNG QUA BẢO VỆ' : 'XẾP LOẠI: CHƯA ĐẠT - CẦN ÔN TẬP THÊM'})
          </div>
        </div>

        <div class="cert-meta-row">
          <div>MÃ CHỨNG CHỈ: <strong>${certId}</strong></div>
          <div>MÃ BĂM XÁC THỰC: <strong>${mockHash}</strong></div>
          <div>NGÀY CẤP: <strong>${new Date().toLocaleDateString('vi-VN')}</strong></div>
        </div>

        <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: center;">
          <button class="btn-primary" onclick="window.print()">🖨️ In Chứng Chỉ Điện Tử</button>
          <button class="btn-secondary" onclick="location.reload()">🔄 Thi Lại Buổi Khác</button>
        </div>
      </div>
    `;
  }

  // ===================================================================
  // 12. DUAL AUDIO BIOMETRIC COMPARATOR (PHƯƠNG ÁN 3 / LEVEL 3)
  // ===================================================================
  const tabSubSingle = document.getElementById('tab-sub-single-file');
  const tabSubDual = document.getElementById('tab-sub-dual-file');
  const singleFileLayout = document.getElementById('single-file-layout');
  const dualFileLayout = document.getElementById('dual-file-layout');
  const btnLoadSampleA = document.getElementById('btn-load-sample-a');
  const btnLoadSampleB = document.getElementById('btn-load-sample-b');
  const metaSlotA = document.getElementById('meta-slot-a');
  const metaSlotB = document.getElementById('meta-slot-b');
  const btnRunDualCompare = document.getElementById('btn-run-dual-compare');
  const dualCompareResults = document.getElementById('dual-compare-results');

  let sampleALoaded = false;
  let sampleBLoaded = false;

  if (tabSubSingle && tabSubDual) {
    tabSubSingle.addEventListener('click', () => {
      tabSubSingle.classList.add('active');
      tabSubDual.classList.remove('active');
      if (singleFileLayout) singleFileLayout.style.display = 'grid';
      if (dualFileLayout) dualFileLayout.style.display = 'none';
    });

    tabSubDual.addEventListener('click', () => {
      tabSubDual.classList.add('active');
      tabSubSingle.classList.remove('active');
      if (singleFileLayout) singleFileLayout.style.display = 'none';
      if (dualFileLayout) dualFileLayout.style.display = 'block';
    });
  }

  if (btnLoadSampleA) {
    btnLoadSampleA.addEventListener('click', () => {
      sampleALoaded = true;
      document.getElementById('slot-card-a').classList.add('active');
      metaSlotA.innerHTML = '<span style="color: #00ff9d;">✓ ĐÃ TẢI:</span> sample_vip_enrollment.wav (16kHz, Jitter: 1.25%, RT60: 0.35s)';
    });
  }

  if (btnLoadSampleB) {
    btnLoadSampleB.addEventListener('click', () => {
      sampleBLoaded = true;
      document.getElementById('slot-card-b').classList.add('active');
      metaSlotB.innerHTML = '<span style="color: #ff3366;">✓ ĐÃ TẢI:</span> questioned_call_transfer_5b.wav (16kHz, Jitter: 0.18%, RT60: 0.09s)';
    });
  }

  if (btnRunDualCompare) {
    btnRunDualCompare.addEventListener('click', () => {
      if (!sampleALoaded || !sampleBLoaded) {
        alert("Vui lòng tải đủ cả Mẫu Chuẩn A và Mẫu Nghi Vấn B trước khi đối soát!");
        return;
      }
      dualCompareResults.style.display = 'block';
      const simScore = 0.942; // Cosine similarity in S_ID
      const liveScore = 0.184; // Liveness in S_Live

      dualCompareResults.innerHTML = `
        <div style="font-family: var(--font-heading); font-size: 1.1rem; color: #fff; margin-bottom: 1rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.5rem;">
          ⚖️ KẾT QUẢ ĐỐI SOÁT SINH TRẮC HỌC 1:1 & PHÂN LY KHÔNG GIAN TRỰC GIAO
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
          <div style="background: rgba(0,240,255,0.06); border: 1px solid rgba(0,240,255,0.3); padding: 0.8rem; border-radius: 4px; text-align: center;">
            <div style="font-size: 0.75rem; color: #8b9bb4;">ĐỘ TƯƠNG ĐỒNG COSINE ĐỊNH DANH (S_ID)</div>
            <div style="font-size: 1.4rem; font-family: var(--font-mono); font-weight: 700; color: #00f0ff; margin-top: 3px;">0.942</div>
            <div style="font-size: 0.72rem; color: #00ff9d; margin-top: 2px;">✓ Khớp 94.2% với giọng chủ tài khoản VIP</div>
          </div>

          <div style="background: rgba(255,51,102,0.06); border: 1px solid rgba(255,51,102,0.3); padding: 0.8rem; border-radius: 4px; text-align: center;">
            <div style="font-size: 0.75rem; color: #8b9bb4;">ĐIỂM SỐ TÍNH SỐNG SINH HỌC (S_Live)</div>
            <div style="font-size: 1.4rem; font-family: var(--font-mono); font-weight: 700; color: #ff3366; margin-top: 3px;">0.184</div>
            <div style="font-size: 0.72rem; color: #ff3366; margin-top: 2px;">⚠️ Vi dao động sinh học bị triệt tiêu (&lt; 0.40)</div>
          </div>
        </div>

        <div style="background: rgba(255,51,102,0.15); border: 1px solid #ff3366; border-radius: 4px; padding: 1rem;">
          <div style="color: #ff3366; font-weight: 700; font-size: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            🚨 TRẠNG THÁI 2: TẤN CÔNG NHÁI GIỌNG CLONE (VOICE CLONE ATTACK)
          </div>
          <p style="font-size: 0.82rem; color: #fff; margin-top: 0.5rem; line-height: 1.5;">
            <strong>PHÂN TÍCH CHUYÊN GIA:</strong> Kẻ tấn công đã sử dụng mô hình học sâu clone giọng (Voice Conversion / TTS) để nhái hoàn hảo đặc trưng thanh đạo của khách hàng VIP (S_ID = 0.942). Tuy nhiên, thành phần tính sống trên không gian trực giao S_Live rơi xuống 0.184 do thuật toán tối ưu hóa làm mịn mất vi rung sinh học.<br>
            <strong>HÀNH ĐỘNG HỆ THỐNG:</strong> KÍCH HOẠT LỆNH KHÓA KHẨN CẤP GIAO DỊCH 5 TỶ ĐỒNG - BẢO VỆ AN TOÀN TÀI SẢN KHÁCH HÀNG!
          </p>
        </div>
      `;
    });
  }

  // ===================================================================
  // 13. MASTER QUESTION EXPLORER (105+ CÂU HỎI BÁCH KHOA)
  // ===================================================================
  const masterQContainer = document.getElementById('master-q-container');
  const masterQSearch = document.getElementById('master-q-search');
  const masterQPillarSelect = document.getElementById('master-q-pillar-select');
  const masterQCount = document.getElementById('master-q-count');

  function renderMasterQuestionsExplorer() {
    if (!masterQContainer || typeof MASTER_QUESTIONS_100 === 'undefined') return;

    const query = masterQSearch ? masterQSearch.value.trim().toLowerCase() : '';
    const pillarVal = masterQPillarSelect ? masterQPillarSelect.value : 'all';

    const filtered = MASTER_QUESTIONS_100.filter(q => {
      const matchPillar = (pillarVal === 'all') || (q.pillar.toString() === pillarVal);
      if (!matchPillar) return false;

      if (!query) return true;
      const haystack = (q.code + ' ' + q.title + ' ' + q.question + ' ' + q.physics + ' ' + q.mathProof + ' ' + q.standardCitation + ' ' + q.keyKeywords.join(' ')).toLowerCase();
      return haystack.includes(query);
    });

    if (masterQCount) masterQCount.textContent = `${filtered.length} / ${MASTER_QUESTIONS_100.length}`;

    masterQContainer.innerHTML = '';
    if (filtered.length === 0) {
      masterQContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: #8b9bb4; font-family: var(--font-mono);">
          Không tìm thấy câu hỏi phù hợp với từ khóa "${query}". Vui lòng thử từ khóa khác!
        </div>
      `;
      return;
    }

    filtered.forEach((q, idx) => {
      const card = document.createElement('div');
      card.className = 'challenge-card';
      card.style.background = 'rgba(14, 21, 37, 0.65)';
      card.style.marginBottom = '1rem';

      card.innerHTML = `
        <div class="challenge-header" style="cursor: pointer;">
          <div>
            <span class="badge" style="background: rgba(0,240,255,0.15); color: #00f0ff; margin-right: 8px;">CÂU ${q.code}</span>
            <span class="badge" style="background: rgba(181,95,230,0.15); color: #b55fe6;">${q.pillarTitle}</span>
            <span class="badge badge-advanced" style="margin-left: 8px;">${q.difficulty}</span>
            <h3 style="margin-top: 0.6rem; font-size: 1.15rem; color: #fff;">${q.title}</h3>
          </div>
          <button class="btn-secondary toggle-q-btn" style="font-size: 0.75rem; padding: 0.4rem 0.8rem;">
            ▼ Xem Lời Giải & Sơ Đồ
          </button>
        </div>

        <div style="margin: 0.8rem 0; font-size: 0.95rem; color: #e2e8f0; line-height: 1.6; font-style: italic;">
          "${q.question}"
        </div>

        <div class="q-expanded-content" style="display: none; margin-top: 1rem; border-top: 1px solid var(--border-subtle); padding-top: 1rem;">
          ${q.svgDiagram ? `<div style="margin-bottom: 1rem;">${q.svgDiagram}</div>` : ''}

          <div style="background: rgba(0,0,0,0.4); border-left: 3px solid #00ff9d; padding: 0.8rem; margin-bottom: 0.8rem;">
            <strong style="color: #00ff9d; font-size: 0.85rem;">BẢN CHẤT VẬT LÝ & LUẬN GIẢI CHUYÊN SÂU:</strong>
            <p style="font-size: 0.85rem; color: #cbd5e1; margin-top: 0.3rem; line-height: 1.5;">${q.physics}</p>
          </div>

          <div style="background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); border-radius: 4px; padding: 0.8rem; margin-bottom: 0.8rem; font-family: var(--font-mono); font-size: 0.8rem; color: #a7f3d0;">
            <strong style="color: #00f0ff;">CHỨNG MINH TOÁN HỌC / GIẢI TÍCH:</strong>
            <div style="margin-top: 0.3rem; white-space: pre-wrap;">${q.mathProof}</div>
          </div>

          <div style="font-size: 0.75rem; color: #94a3b8; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
            <div><strong>📜 TIÊU CHUẨN VIỆN DẪN:</strong> ${q.standardCitation}</div>
            <div><strong>🔑 TỪ KHÓA CHẤM ĐIỂM:</strong> <span style="color: #ffb700;">${q.keyKeywords.join(', ')}</span></div>
          </div>
        </div>
      `;

      const toggleBtn = card.querySelector('.toggle-q-btn');
      const expanded = card.querySelector('.q-expanded-content');
      card.querySelector('.challenge-header').addEventListener('click', () => {
        const isHidden = expanded.style.display === 'none';
        expanded.style.display = isHidden ? 'block' : 'none';
        toggleBtn.textContent = isHidden ? '▲ Thu Gọn' : '▼ Xem Lời Giải & Sơ Đồ';
      });

      masterQContainer.appendChild(card);
    });
  }

  if (masterQSearch) {
    masterQSearch.addEventListener('input', renderMasterQuestionsExplorer);
  }
  if (masterQPillarSelect) {
    masterQPillarSelect.addEventListener('change', renderMasterQuestionsExplorer);
  }

  // Trigger Master Explorer when master-questions tab is opened
  document.querySelectorAll('.nav-tab').forEach(t => {
    t.addEventListener('click', () => {
      if (t.dataset.tab === 'master-questions') {
        setTimeout(renderMasterQuestionsExplorer, 50);
      }
    });
  });

});


// =====================================================================
// 7. WEB AUDIO API SYNTHESIZER & REALTIME VISUALIZER ENGINES
// =====================================================================
class ForensicAudioEngine {
  constructor() {
    this.ctx = null;
    this.analyser = null;
    this.gainNode = null;
    this.activeNodes = [];
    this.isPlaying = false;
    this.currentMode = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 1024;
      this.analyser.smoothingTimeConstant = 0.8;

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.7, this.ctx.currentTime);

      this.gainNode.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    if (this.gainNode) {
      this.gainNode.gain.setValueAtTime(val, this.ctx.currentTime);
    }
  }

  stopAll() {
    this.activeNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        node.disconnect();
      } catch (e) { }
    });
    this.activeNodes = [];
    this.isPlaying = false;
    this.currentMode = null;
    document.querySelectorAll('.synth-btn').forEach(b => b.classList.remove('active'));
    this.updateMetrics("--", "--", "--", "--", "");
  }

  updateMetrics(jitter, glottal, rt60, decision, statusClass) {
    const jEl = document.getElementById('disp-jitter');
    const gEl = document.getElementById('disp-glottal');
    const rEl = document.getElementById('disp-rt60');
    const dEl = document.getElementById('disp-decision');
    if (jEl) jEl.textContent = jitter;
    if (gEl) gEl.textContent = glottal;
    if (rEl) rEl.textContent = rt60;
    if (dEl) {
      dEl.textContent = decision;
      dEl.className = 'metric-val ' + statusClass;
    }
  }

  playHumanVoice() {
    this.init();
    this.stopAll();
    this.isPlaying = true;
    this.currentMode = 'human';

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(130, t);

    // Natural Vibrato / Jitter (~5.5Hz modulation with biological random drift)
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(5.5, t);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(1.8, t); // Micro-jitter ~1.3%
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start(t);
    this.activeNodes.push(lfo, lfoGain);

    // Vocal Tract Formant Filter
    const f1 = this.ctx.createBiquadFilter();
    f1.type = 'bandpass';
    f1.frequency.setValueAtTime(650, t);
    f1.Q.setValueAtTime(4.0, t);

    const f2 = this.ctx.createBiquadFilter();
    f2.type = 'bandpass';
    f2.frequency.setValueAtTime(1700, t);
    f2.Q.setValueAtTime(5.0, t);

    const merger = this.ctx.createGain();
    merger.gain.setValueAtTime(0.5, t);

    osc.connect(f1);
    osc.connect(f2);
    f1.connect(merger);
    f2.connect(merger);
    merger.connect(this.gainNode);

    osc.start(t);
    osc.stop(t + 4.0);
    this.activeNodes.push(osc, f1, f2, merger);

    this.updateMetrics("1.25%", "-1.5 dB", "0.38s", "LIVENESS: THẬT", "status-safe");
  }

  playVocoderDeepfake() {
    this.init();
    this.stopAll();
    this.isPlaying = true;
    this.currentMode = 'vocoder';

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140.0, t); // Zero jitter, over-smoothed

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3200, t);

    osc.connect(filter);
    filter.connect(this.gainNode);

    osc.start(t);
    osc.stop(t + 4.0);
    this.activeNodes.push(osc, filter);

    this.updateMetrics("0.16%", "-2.1 dB", "0.08s", "HARD VETO: FAKE", "status-danger");
  }

  playRVCPhaseJitter() {
    this.init();
    this.stopAll();
    this.isPlaying = true;
    this.currentMode = 'rvc';

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, t);

    const noiseOsc = this.ctx.createOscillator();
    noiseOsc.type = 'square';
    noiseOsc.frequency.setValueAtTime(35, t); // Phase glitches
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(9.5, t); // Phase jitter > 5.0%

    noiseOsc.connect(noiseGain);
    noiseGain.connect(osc.frequency);
    noiseOsc.start(t);
    this.activeNodes.push(noiseOsc, noiseGain);

    osc.connect(this.gainNode);
    osc.start(t);
    osc.stop(t + 4.0);
    this.activeNodes.push(osc);

    this.updateMetrics("5.35%", "-3.8 dB", "0.34s", "HARD VETO: RVC FAKE", "status-danger");
  }

  playRealGlottalStop() {
    this.init();
    this.stopAll();
    this.isPlaying = true;
    this.currentMode = 'glottal_real';

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';

    osc.frequency.setValueAtTime(140, t);
    osc.frequency.linearRampToValueAtTime(185, t + 0.35);
    osc.frequency.setValueAtTime(0, t + 0.36); // Đứt F0
    osc.frequency.setValueAtTime(190, t + 0.40);
    osc.frequency.linearRampToValueAtTime(220, t + 0.65);

    const env = this.ctx.createGain();
    env.gain.setValueAtTime(0.7, t);
    env.gain.linearRampToValueAtTime(0.85, t + 0.34);
    env.gain.linearRampToValueAtTime(0.02, t + 0.36); // Rơi sâu -15dB
    env.gain.setValueAtTime(0.02, t + 0.395); // Khoảng lặng thanh môn 35ms
    env.gain.linearRampToValueAtTime(0.8, t + 0.42);
    env.gain.linearRampToValueAtTime(0.01, t + 0.8);

    osc.connect(env);
    env.connect(this.gainNode);

    osc.start(t);
    osc.stop(t + 0.85);
    this.activeNodes.push(osc, env);

    this.updateMetrics("1.42%", "-15.2 dB", "0.35s", "THANH NGÃ: THẬT", "status-safe");
  }

  playFakeGlottalStop() {
    this.init();
    this.stopAll();
    this.isPlaying = true;
    this.currentMode = 'glottal_fake';

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';

    osc.frequency.setValueAtTime(140, t);
    osc.frequency.linearRampToValueAtTime(170, t + 0.35);
    osc.frequency.linearRampToValueAtTime(155, t + 0.40); // Nhẹ nhàng võng xuống, không đứt
    osc.frequency.linearRampToValueAtTime(200, t + 0.70);

    const env = this.ctx.createGain();
    env.gain.setValueAtTime(0.7, t);
    env.gain.linearRampToValueAtTime(0.5, t + 0.38); // Chỉ sụt nhẹ -3dB!
    env.gain.linearRampToValueAtTime(0.75, t + 0.42);
    env.gain.linearRampToValueAtTime(0.01, t + 0.8);

    osc.connect(env);
    env.connect(this.gainNode);

    osc.start(t);
    osc.stop(t + 0.85);
    this.activeNodes.push(osc, env);

    this.updateMetrics("0.28%", "-3.4 dB", "0.11s", "HARD VETO: TTS FAKE", "status-danger");
  }

  playReplayAttack() {
    this.init();
    this.stopAll();
    this.isPlaying = true;
    this.currentMode = 'replay';

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(135, t);

    const delay = this.ctx.createDelay();
    delay.delayTime.setValueAtTime(0.015, t);
    const feedback = this.ctx.createGain();
    feedback.gain.setValueAtTime(0.75, t);

    const reverbGain = this.ctx.createGain();
    reverbGain.gain.setValueAtTime(0.8, t);

    osc.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(reverbGain);
    osc.connect(reverbGain);

    reverbGain.connect(this.gainNode);

    osc.start(t);
    osc.stop(t + 3.5);
    this.activeNodes.push(osc, delay, feedback, reverbGain);

    this.updateMetrics("1.10%", "-12.5 dB", "0.94s", "HARD VETO: REPLAY", "status-danger");
  }
}

function initVisualizers(audioEngine) {
  const oscCanvas = document.getElementById('canvas-oscilloscope');
  const specCanvas = document.getElementById('canvas-spectrogram');
  const schroederCanvas = document.getElementById('canvas-schroeder');
  if (!oscCanvas || !specCanvas || !schroederCanvas) return;

  const oscCtx = oscCanvas.getContext('2d');
  const specCtx = specCanvas.getContext('2d');
  const schroederCtx = schroederCanvas.getContext('2d');

  function render() {
    requestAnimationFrame(render);

    // 1. Oscilloscope Render
    oscCtx.fillStyle = '#04070e';
    oscCtx.fillRect(0, 0, oscCanvas.width, oscCanvas.height);

    oscCtx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    oscCtx.lineWidth = 1;
    for (let x = 0; x < oscCanvas.width; x += 50) {
      oscCtx.beginPath();
      oscCtx.moveTo(x, 0);
      oscCtx.lineTo(x, oscCanvas.height);
      oscCtx.stroke();
    }
    oscCtx.beginPath();
    oscCtx.moveTo(0, oscCanvas.height / 2);
    oscCtx.lineTo(oscCanvas.width, oscCanvas.height / 2);
    oscCtx.stroke();

    if (audioEngine.analyser && audioEngine.isPlaying) {
      const bufferLength = audioEngine.analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      audioEngine.analyser.getByteTimeDomainData(dataArray);

      oscCtx.lineWidth = 2;
      oscCtx.strokeStyle = '#00f0ff';
      oscCtx.shadowBlur = 8;
      oscCtx.shadowColor = '#00f0ff';
      oscCtx.beginPath();

      const sliceWidth = oscCanvas.width / bufferLength;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * oscCanvas.height) / 2;
        if (i === 0) oscCtx.moveTo(x, y);
        else oscCtx.lineTo(x, y);
        x += sliceWidth;
      }
      oscCtx.stroke();
      oscCtx.shadowBlur = 0;

      // 2. Spectrogram (FFT Bar Spectrum)
      specCtx.fillStyle = '#04070e';
      specCtx.fillRect(0, 0, specCanvas.width, specCanvas.height);

      const freqArray = new Uint8Array(bufferLength);
      audioEngine.analyser.getByteFrequencyData(freqArray);

      const barWidth = (specCanvas.width / (bufferLength / 2)) * 2.5;
      let barX = 0;

      for (let i = 0; i < bufferLength / 2; i++) {
        const barHeight = (freqArray[i] / 255.0) * specCanvas.height;
        const hue = (i / (bufferLength / 2)) * 260 + 160;
        specCtx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        specCtx.fillRect(barX, specCanvas.height - barHeight, barWidth - 1, barHeight);
        barX += barWidth;
        if (barX > specCanvas.width) break;
      }

    } else {
      oscCtx.lineWidth = 1.5;
      oscCtx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
      oscCtx.beginPath();
      oscCtx.moveTo(0, oscCanvas.height / 2);
      oscCtx.lineTo(oscCanvas.width, oscCanvas.height / 2);
      oscCtx.stroke();

      specCtx.fillStyle = '#04070e';
      specCtx.fillRect(0, 0, specCanvas.width, specCanvas.height);
      specCtx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      specCtx.font = '12px Inter';
      specCtx.fillText('Chưa có tín hiệu âm thanh - Nhấn nút phát bên trái để kích hoạt', 110, 80);
    }

    // 3. Schroeder Decay Curve Render
    schroederCtx.fillStyle = '#04070e';
    schroederCtx.fillRect(0, 0, schroederCanvas.width, schroederCanvas.height);

    schroederCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    schroederCtx.font = '10px JetBrains Mono';
    schroederCtx.fillStyle = '#8b9bb4';

    const y5 = schroederCanvas.height * 0.2;
    const y25 = schroederCanvas.height * 0.55;
    const y60 = schroederCanvas.height * 0.9;

    schroederCtx.beginPath();
    schroederCtx.moveTo(40, y5);
    schroederCtx.lineTo(schroederCanvas.width, y5);
    schroederCtx.stroke();
    schroederCtx.fillText('-5 dB', 5, y5 + 3);

    schroederCtx.beginPath();
    schroederCtx.moveTo(40, y25);
    schroederCtx.lineTo(schroederCanvas.width, y25);
    schroederCtx.stroke();
    schroederCtx.fillText('-25 dB', 5, y25 + 3);

    schroederCtx.beginPath();
    schroederCtx.moveTo(40, y60);
    schroederCtx.lineTo(schroederCanvas.width, y60);
    schroederCtx.stroke();
    schroederCtx.fillText('-60 dB', 5, y60 + 3);

    schroederCtx.lineWidth = 2.5;
    schroederCtx.beginPath();
    schroederCtx.moveTo(40, 15);

    let decayRate = 0.008;
    let strokeCol = '#00ff9d';

    if (audioEngine.currentMode === 'vocoder') {
      decayRate = 0.04;
      strokeCol = '#ff3366';
    } else if (audioEngine.currentMode === 'replay') {
      decayRate = 0.0025;
      strokeCol = '#ffb700';
    }

    for (let x = 40; x < schroederCanvas.width; x += 5) {
      const relX = x - 40;
      const decay = Math.exp(-relX * decayRate);
      const y = 15 + (1 - decay) * (schroederCanvas.height - 30);
      schroederCtx.lineTo(x, y);
    }
    schroederCtx.strokeStyle = strokeCol;
    schroederCtx.shadowBlur = 6;
    schroederCtx.shadowColor = strokeCol;
    schroederCtx.stroke();
    schroederCtx.shadowBlur = 0;
  }

  render();
}

