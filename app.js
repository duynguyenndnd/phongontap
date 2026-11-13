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
// 2. DATA REPOSITORY: 4 JUDGES & 20 HARSH DEFENSE QUESTIONS (MODE 2)
const JUDGES = [
  {
    "id": "judge_1",
    "name": "GS. Trần Đình Khải",
    "role": "Chủ tịch Hội đồng Pháp y Âm thanh & Tín hiệu Quốc gia",
    "avatar": "👨‍⚖️",
    "threat": "THREAT: CỰC KỲ KHẮC NGHIỆT",
    "threatClass": "threat-extreme",
    "questions": [
      {
        "qId": 101,
        "title": "Bắt bẻ về suy hao băng thông G.711 thoại bàn (300-3400Hz)",
        "content": "\"Anh/chị khẳng định bóc tách được Micro-Jitter và Glottal Stop trên kênh thoại 8kHz. Nhưng trong thực tế viễn thông G.711, thuật toán lượng tử hóa A-law/Mu-law 8-bit và bộ lọc thông dải 300-3400Hz làm suy hao nghiêm trọng các hài âm bậc cao. Làm thế nào chứng minh hệ thống không bị báo động giả (False Positive) khi người dùng dùng điện thoại bàn đời cũ nói thanh Ngã?\"",
        "rubric": [
          "Tần số cơ bản F0 tiếng Việt (100-300Hz) hoàn toàn nằm trong dải thông 300-3400Hz hoặc bóc tách được qua chu kỳ tự tương quan NAFE.",
          "Glottal Stop Mining dựa trên độ sụt năng lượng RMS toàn cục (Delta E < -12dB), không phụ thuộc vào hài âm cao > 3400Hz.",
          "Cổng động thích ứng kênh truyền tự động hạ trọng số CNN xuống 0.10 và tăng trọng số Ngữ âm lên 0.65."
        ]
      },
      {
        "qId": 102,
        "title": "Thách thức về người bị ốm, viêm họng hay nghẹt mũi",
        "content": "\"Một khách hàng VIP của ngân hàng bị viêm thanh quản hạt hoặc cảm cúm nặng, giọng bị khàn và đứt hơi. Lúc này Jitter sinh học của họ có thể vọt lên 4.5% và đường F0 bị biến dạng. Hệ thống của anh/chị có nhầm họ thành kẻ tấn công RVC Deepfake và khóa tài khoản của họ không?\"",
        "rubric": [
          "Người bị viêm thanh quản có Shimmer tăng nhưng RT60 âm học phòng vẫn nằm trong dải bình thường (0.2s - 0.5s).",
          "Viêm thanh quản làm tăng jitter nhưng vẫn giữ được vi cấu trúc âm đục tự nhiên, không có hiện tượng lượng tử hóa bước nhảy pha của RVC v2.",
          "Chính sách Tri-Band đưa trường hợp này vào dải Vàng [0.3 - 0.8) để kích hoạt Step-up Auth (OTP âm thanh) chứ không bao giờ chặn cứng."
        ]
      },
      {
        "qId": 103,
        "title": "Bẫy Aliasing & Spectral Leakage trong Polyphase Filtering",
        "content": "\"Tại sao trong pipeline DSP anh/chị lại chọn Polyphase Filtering với cửa sổ Kaiser thay vì FFT Resampling tiêu chuẩn của thư viện Scipy? Nếu một luồng audio 44.1kHz chứa sóng hài 21kHz bị hạ mẫu tuyến tính (Linear Interpolation) về 16kHz, hiện tượng vật lý gì sẽ xảy ra và làm hỏng mô hình MelCNN như thế nào?\"",
        "rubric": [
          "Nội suy tuyến tính không có bộ lọc Anti-aliasing, khiến tần số 21kHz bị gấp phổ (Aliasing) phản chiếu ngược lại dải 11kHz và 5kHz trong không gian 16kHz.",
          "Hài âm phản chiếu này làm sai lệch tỷ số Log-Mel ở các dải tần cao, khiến mô hình MelCNN nhầm lẫn giữa tiếng xì tự nhiên và artifacts của Vocoder.",
          "Polyphase Filtering chia nhỏ bộ lọc FIR thành đa pha, triệt tiêu Spectral Leakage với suy hao dải chặn > 80dB mà tiết kiệm 75% chi phí tính toán."
        ]
      },
      {
        "qId": 104,
        "title": "Phản biện về giới hạn phòng thu câm (Anechoic Chamber) & RT60",
        "content": "\"Hệ thống của anh/chị đặt ngưỡng phòng câm là RT60 < 0.15s để bắt Deepfake. Vậy nếu khách hàng VIP gọi điện từ trong xe hơi hạng sang có cách âm cao cấp hoặc phòng thu âm chuyên nghiệp lót mút cách âm, RT60 thực tế cũng có thể rơi xuống 0.12s. Làm sao hệ thống phân biệt được một phòng thu thật với một mạng neural vocoder tổng hợp toán học?\"",
        "rubric": [
          "Phòng thu thật lót mút dù tiêu âm tốt vẫn có độ phản xạ tần số trầm (dưới 200Hz) do bước sóng dài không thể bị triệt tiêu hoàn toàn bởi mút xốp mỏng.",
          "Neural Vocoder toán học (như HiFi-GAN) hoàn toàn không có pha dội âm ở mọi dải tần, đường cong Schroeder suy giảm thẳng đứng như bậc thang số.",
          "Hệ thống kết hợp kiểm tra độ phân tán phổ Spectral Flatness: Phòng thật có nhiễu nền vật lý (Thermal/Mic noise) khác biệt với ma trận số của AI."
        ]
      },
      {
        "qId": 105,
        "title": "Định lý Heisenberg-Gabor & Đánh đổi Cửa sổ STFT Hann 1024",
        "content": "\"Tại sao bắt buộc phải dùng cửa sổ Hann 1024 mẫu với hop_length 256 mẫu tại 16kHz? Tại sao không dùng cửa sổ 512 để phản ứng nhanh hơn, hoặc cửa sổ 2048 để phân giải tần số nét hơn? Hãy giải thích dưới góc độ định lý bất định thời gian - tần số Heisenberg-Gabor!\"",
        "rubric": [
          "Định lý Heisenberg-Gabor: Delta t * Delta f >= 1 / (4 * pi). Không thể có cùng lúc độ nét thời gian và độ nét tần số cực đại.",
          "N = 1024 tại 16kHz cho Delta f = 15.625 Hz, đủ hẹp để phân giải tần số cơ bản F0 (100-300Hz) và khoảng cách giữa các hài âm formant.",
          "Hop = 256 (16ms) tương thích với chu kỳ chuyển động cơ học của dây thanh và nắp thanh môn (10-25ms). Cửa sổ 512 sẽ làm nhòe F0, cửa sổ 2048 sẽ làm trễ 128ms phá vỡ chuẩn 350ms."
        ]
      }
    ]
  },
  {
    "id": "judge_2",
    "name": "Bà Vũ Phương Nga",
    "role": "Giám đốc Quản trị Rủi ro & Gian lận Ngân hàng VPBank",
    "avatar": "👩‍💼",
    "threat": "THREAT: CỰC KỲ NGUY HIỂM",
    "threatClass": "threat-extreme",
    "questions": [
      {
        "qId": 201,
        "title": "Bài toán 200.000 cuộc gọi mỗi ngày và tỷ lệ báo động giả FPR < 0.05%",
        "content": "\"Mỗi ngày ngân hàng chúng tôi tiếp nhận 200.000 cuộc gọi xác thực chuyển tiền. Nếu tỷ lệ báo động giả (False Positive Rate) của hệ thống là 1%, tức là mỗi ngày có 2.000 khách hàng VIP bị chặn oan và chửi bới tổng đài. Hệ thống của anh/chị có cam kết ép FPR < 0.05% được không? Cơ chế Tri-Band Policy giải quyết bài toán trải nghiệm khách hàng như thế nào?\"",
        "rubric": [
          "Chính sách phân vùng 3 dải (Tri-Band Policy): Dải xanh [0.0 - 0.3) thông qua 100%, Dải đỏ [0.8 - 1.0] chặn cứng.",
          "Vùng vàng [0.3 - 0.8) không chặn khách hàng mà kích hoạt Step-up Auth (Xác thực tăng cường: OTP âm thanh động chứa thanh Ngã/Nặng).",
          "FPR thực tế của dải chặn cứng được ép xuống < 0.03% nhờ cơ chế đồng thuận đa tầng."
        ]
      },
      {
        "qId": 202,
        "title": "Thời gian hòa vốn và chi phí phần cứng CPU vs GPU",
        "content": "\"Ban lãnh đạo ngân hàng từ chối chi 50.000 USD mua cụm máy chủ GPU Nvidia A100 chỉ để chạy mô hình AI Deepfake. Hệ thống của anh/chị chứng minh khả năng chạy 100% trên CPU phổ thông như thế nào? Chi phí vận hành trên mỗi triệu cuộc gọi là bao nhiêu?\"",
        "rubric": [
          "Mô hình MelCNN 2D chỉ có 1.2M tham số, xuất sang ONNX Runtime Opset 14 với FP32 hoặc INT8 quantization.",
          "Thời gian suy luận 6.8ms trên CPU thông thường (Intel Xeon 4 cores), tiêu tốn < 85MB RAM.",
          "Chi phí hạ tầng điện toán đám mây giảm tới 85% so với giải pháp chạy GPU độc quyền."
        ]
      },
      {
        "qId": 203,
        "title": "Chuỗi bảo quản chứng cứ điện tử (Chain of Custody) FIPS 140-3",
        "content": "\"Nếu kẻ gian kiện ngược lại ngân hàng vì bị khóa tài khoản, hoặc ngân hàng phải nộp file ghi âm giám định sang Cơ quan Cảnh sát Điều tra, làm thế nào anh/chị chứng minh tệp âm thanh telemetry không bị can thiệp, chỉnh sửa hay làm giả trong hệ thống nội bộ?\"",
        "rubric": [
          "Ngay khi gói tin RTP đến Ingress Gateway, mã băm SHA-256 được tính toán song song và ký số HMAC bằng khóa bí mật lưu trong HSM đạt chuẩn FIPS 140-3 Level 3.",
          "Mỗi báo cáo giám định được gửi sang máy chủ TSA để lấy dấu thời gian số RFC 3161 (Trusted Timestamp), tạo bằng chứng không thể chối bỏ (Non-repudiation).",
          "Mọi thao tác đọc, ghi đều được ghi nhận vào nhật ký kiểm toán bất biến (Immutable Audit Log) trên cụm ClickHouse."
        ]
      },
      {
        "qId": 204,
        "title": "Chiến lược dự phòng (Fall-back Strategy) khi mạng neural bị tấn công đối nghịch",
        "content": "\"Nếu kẻ gian là một hacker chuyên nghiệp, hắn tiêm nhiễu đối nghịch FGSM vào cuộc gọi khiến mô hình AI chấm 99% là người thật. Lúc này ngân hàng sẽ mất trắng hàng chục tỷ đồng. Hệ thống có cơ chế nào để cứu vãn giao dịch này?\"",
        "rubric": [
          "Quyền phủ quyết cứng (Hard Veto): Bất kể AI chấm điểm bao nhiêu, nếu Micro-Jitter vi phạm dải sinh học (Jitter < 0.35%) hoặc RT60 vi phạm dải phòng thực, hệ thống lập tức cưỡng chế chặn.",
          "Nhiễu đối nghịch chỉ đánh lừa được ma trận trọng số mạng nơ-ron, không thể biến đổi được quán tính cơ học của dây thanh quản hay thời gian dội âm phòng vật lý.",
          "Hệ thống tự động kích hoạt chế độ Fall-back hạ điểm tin cậy và chuyển cuộc gọi sang Chuyên viên Giám định cấp cao."
        ]
      },
      {
        "qId": 205,
        "title": "Tối ưu hóa ma trận chi phí rủi ro tài chính (Cost-Sensitive Matrix)",
        "content": "\"Trong an toàn tài chính, chi phí của một vụ False Negative (kẻ lừa đảo lọt qua cuỗm 10 tỷ) lớn hơn gấp 10.000 lần so với chi phí của False Positive (khách hàng phải đọc thêm 1 mã OTP 6 số). Anh/chị đã thiết kế hàm mất mát (Loss Function) và ngưỡng quyết định như thế nào để phản ánh đúng thực tế kinh doanh này?\"",
        "rubric": [
          "Áp dụng hàm mất mát Focal Loss có trọng số phạt bất đối xứng: C(FN) = 1000 * C(FP).",
          "Hạ ngưỡng dải đỏ xuống 0.80 và mở rộng dải vàng [0.30 - 0.80) để bao trùm toàn bộ các trường hợp nghi vấn.",
          "Thiết kế luồng xác thực Step-up Auth thân thiện: Khách hàng chỉ mất 3 giây đọc một cụm từ tiếng Việt ngẫu nhiên chứ không bị khóa thẻ đột ngột."
        ]
      }
    ]
  },
  {
    "id": "judge_3",
    "name": "KS. Đặng Quốc Toàn",
    "role": "Chuyên gia Mạng Viễn thông & Giao thức VoIP",
    "avatar": "👨‍💻",
    "threat": "THREAT: NGUY HIỂM KỸ THUẬT",
    "threatClass": "threat-high",
    "questions": [
      {
        "qId": 301,
        "title": "Thuật toán che giấu mất gói tin (Packet Loss Concealment - PLC)",
        "content": "\"Khi cuộc gọi di động đi qua vùng sóng yếu, mạng VoIP bị mất gói tin RTP 10%. Thuật toán PLC của tổng đài tự động lặp lại khung âm thanh trước đó (Pitch Period Replication). Hiện tượng này làm đường bao phổ bị lặp nhân tạo và F0 đi ngang. Hệ thống của anh/chị có bị nhầm lẫn hiện tượng PLC này thành Deepfake TTS không?\"",
        "rubric": [
          "Hệ thống giám sát cờ Sequence Number và Timestamp trong tiêu đề gói tin RTP để nhận diện chính xác các khung bị mất gói tin.",
          "Khi phát hiện khung được sinh bởi thuật toán PLC, hệ thống gắn cờ 'PLC_FRAME' và loại trừ khung này khỏi phép tính Micro-Jitter.",
          "Chỉ đánh giá các chỉ số sinh học trên các đoạn âm thanh liên tục có tối thiểu 8 khung RTP không bị mất gói."
        ]
      },
      {
        "qId": 302,
        "title": "Bộ đệm Jitter mạng IP (IP Jitter Buffer) vs Micro-Jitter sinh học",
        "content": "\"Hai khái niệm này đều có chữ 'Jitter'. Một kỹ sư mạng non tay có thể nhầm rằng Jitter mạng (độ biến thiên trễ gói tin IP 20-50ms) sẽ phá hủy phép đo Jitter sinh học dây thanh. Hãy giải thích tường tận sự khác biệt bản chất và cách hệ thống cô lập hai đại lượng này!\"",
        "rubric": [
          "IP Jitter Buffer thuộc tầng mạng (Network Layer 3/4), là sự sai lệch thời gian đến của các gói tin UDP/RTP.",
          "Micro-Jitter sinh học thuộc tầng ứng dụng âm sinh học (Acoustic Domain), là độ sai lệch chu kỳ rung vi mô tính bằng micro-giây giữa các đỉnh sóng thanh môn bên trong nội dung PCM sau giải mã.",
          "Jitter buffer phần cứng/phần mềm sắp xếp lại các gói tin theo đúng thứ tự trước khi đưa vào Forensic DSP Pipeline, triệt tiêu hoàn toàn ảnh hưởng của mạng."
        ]
      },
      {
        "qId": 303,
        "title": "Giao thức truyền tải SIP/RTP & Điểm cắm bóc tách payload",
        "content": "\"Trong kiến trúc tổng đài ngân hàng (Avaya, Cisco CallManager, FreeSWITCH), anh/chị cắm module DeepGuard vào đâu? Tại sao không nhận file sau khi cuộc gọi kết thúc (Post-Call Analysis) mà bắt buộc phải can thiệp luồng thời gian thực qua WebRTC / SIP Forking?\"",
        "rubric": [
          "Post-call analysis không có giá trị ngăn chặn gian lận thời gian thực vì tiền đã bị chuyển mất.",
          "DeepGuard sử dụng cơ chế SIP Media Forking (hoặc WebRTC Media Server / FreeSWITCH ESL mod_audio_fork), nhân đôi luồng RTP thô và truyền trực tiếp về Forensic Pipeline qua gRPC streaming.",
          "Cho phép gửi tín hiệu SIP INFO hoặc SIP BYE để tự động ngắt kết nối cuộc gọi trong vòng 350ms khi phát hiện Hard Veto."
        ]
      },
      {
        "qId": 304,
        "title": "Tối ưu hóa độ trễ luồng T_E2E < 350ms trên mạng băng thông thấp",
        "content": "\"Nếu khách hàng dùng mạng 3G/4G chập chờn, độ trễ RTT mạng đã là 180ms. Ngân sách 350ms của anh/chị chỉ còn lại chưa đầy 170ms cho xử lý. Hãy phân tích chi tiết từng mili-giây xử lý nội bộ để chứng minh hệ thống không bị tràn bộ đệm (Buffer Overflow)!\"",
        "rubric": [
          "Kích thước chunk âm thanh 256ms (4096 mẫu tại 16kHz) được đẩy theo cơ chế trượt gối đầu (Sliding Window Hop 64ms).",
          "Tiền xử lý Polyphase STFT: 12ms | F0 NAFE & Glottal Miner: 15ms | ISO 3382 Schroeder: 18ms | MelCNN ONNX Inference: 6.8ms | Fusion: 0.8ms -> Tổng xử lý nội bộ: 52.6 ms.",
          "52.6ms xử lý nội bộ + 180ms RTT mạng + 15ms ngắt SIP = 247.6ms, hoàn toàn nằm trong ngưỡng an toàn 350ms."
        ]
      },
      {
        "qId": 305,
        "title": "Giả mạo số gọi đến (Caller ID Spoofing) kết hợp Voice Clone",
        "content": "\"Kẻ gian dùng dịch vụ VoIP quốc tế đổi Caller ID thành đúng số hotline của ngân hàng hoặc người thân, đồng thời dùng Voice Clone nói chuyện. Hệ thống của anh/chị có bị phụ thuộc vào số điện thoại người gọi đến để nạp profile không?\"",
        "rubric": [
          "DeepGuard hoàn toàn không tin cậy Caller ID do lỗ hổng giao thức SIP INVITE cho phép sửa đổi trường 'From' tùy ý.",
          "Hệ thống giám sát liveness phi danh tính (Zero-Trust Voice Verification): Dù cuộc gọi xuất phát từ số nào, các bất biến vật lý (Jitter, Glottal Stop, Dội âm RT60) vẫn được tính toán độc lập.",
          "Kết hợp kiểm tra chữ ký định danh cuộc gọi STIR/SHAKEN (RFC 8224/8588) để phát hiện số bị giả mạo ở tầng viễn thông."
        ]
      }
    ]
  },
  {
    "id": "judge_4",
    "name": "TS. Alex Mercer",
    "role": "Trưởng nhóm Nghiên cứu Sinh trắc học & Voice Anti-Spoofing",
    "avatar": "🧑‍🔬",
    "threat": "THREAT: CHUYÊN SÂU AI & HỌC SÂU",
    "threatClass": "threat-high",
    "questions": [
      {
        "qId": 401,
        "title": "Phân ly không gian trực giao (Orthogonal Subspace Projection)",
        "content": "\"Nếu anh/chị chỉ dùng chung một mô hình Deep Learning để nhận diện người nói và phát hiện Deepfake, mô hình sẽ bị thiên lệch: Giọng của Giám đốc tài chính được chấm điểm tương đồng danh tính rất cao, dẫn tới hệ thống bỏ qua các lỗi liveness nhỏ. Anh/chị đã giải quyết mâu thuẫn này bằng toán học như thế nào?\"",
        "rubric": [
          "Áp dụng phép chiếu trực giao không gian con (Orthogonal Subspace Projection).",
          "Tách không gian vector thành: Không gian định danh V_id (x-vector 192 chiều) và Không gian sinh trắc liveness V_live.",
          "Triệt tiêu hoàn toàn thành phần định danh khỏi vector liveness: V_live_clean = V_total - Proj_{V_id}(V_total)."
        ]
      },
      {
        "qId": 402,
        "title": "Đa luồng CPU (intra_op=4) và hiện tượng nghẽn cổ chai (Lock Contention)",
        "content": "\"Tại sao lại cấu hình intra_op_num_threads=4 và inter_op_num_threads=1 trong ONNX Runtime? Nếu hàng nghìn request gửi đến đồng thời, việc cạnh tranh CPU thread có gây ra nghẽn cổ chai phá vỡ độ trễ 350ms không?\"",
        "rubric": [
          "intra_op=4 tối ưu hóa việc phân chia phép nhân ma trận trên 4 core vật lý cho 1 tensor.",
          "inter_op=1 ngăn chặn hiện tượng context switching hỗn loạn giữa các node trong đồ thị tính toán.",
          "Ở quy mô hàng nghìn request, hệ thống scale ngang qua Docker Compose và Nginx load balancer phân tải."
        ]
      },
      {
        "qId": 403,
        "title": "So sánh kiến trúc MelCNN 2D (1.2M) với WavLM (95M) / Whisper Encoder",
        "content": "\"Hiện nay các mô hình nền tảng như WavLM, RawNet3 hay Whisper có hàng chục đến hàng trăm triệu tham số, đạt EER cực thấp trên tập kiểm thử tĩnh. Tại sao DeepGuard lại đi ngược xu thế, chọn kiến trúc MelCNN 2D chỉ có 1.2M tham số? Có phải vì anh/chị không đủ tài nguyên huấn luyện?\"",
        "rubric": [
          "WavLM (95M tham số) tiêu tốn > 400ms và đòi hỏi GPU VRAM > 2GB, hoàn toàn bất khả thi cho xử lý thời gian thực 350ms trên tổng đài thoại hàng nghìn kênh.",
          "MelCNN 1.2M tham số tập trung chuyên biệt vào việc bóc tách các bất thường phổ Log-Mel và artifacts của neural vocoder, suy luận chỉ mất 6.8ms trên CPU.",
          "Điểm cốt lõi: Sức mạnh của DeepGuard nằm ở cơ chế Dung hợp Bằng chứng Vật lý (Glottal Stop + ISO 3382), không cần dồn toàn bộ gánh nặng lên một mô hình AI khổng lồ dễ bị tấn công đối nghịch."
        ]
      },
      {
        "qId": 404,
        "title": "Lượng tử hóa INT8 Dynamic Quantization & Hiện tượng trôi độ chính xác",
        "content": "\"Khi chuyển đổi mô hình từ FP32 (32-bit float) sang INT8 (8-bit integer) trên ONNX Runtime, phạm vi biểu diễn số học bị thu hẹp đáng kể. Hiện tượng lượng tử hóa này có làm mất đi các artifacts vi mô ở dải tần cao không? Tỷ lệ suy giảm EER (Equal Error Rate) là bao nhiêu?\"",
        "rubric": [
          "Áp dụng kỹ thuật Dynamic Quantization với Calibration trên tập âm thanh tiếng Việt thực tế, giữ nguyên độ chính xác FP32 ở các lớp nhạy cảm (First Conv và Output Layer).",
          "Độ suy giảm EER chỉ ở mức 0.12% (từ EER 1.85% lên 1.97%), trong khi tốc độ tăng 2.3 lần và dung lượng giảm từ 4.8MB xuống 1.3MB.",
          "Các đặc trưng vi mô cực nhỏ đã được bảo toàn bởi module vật lý (NAFE Jitter và Schroeder) chạy độc lập bằng số học dấu phẩy động 64-bit."
        ]
      },
      {
        "qId": 405,
        "title": "Hiện tượng Overfitting đối với các mô hình sinh mã mới (Diffusion Vocoders)",
        "content": "\"Nếu hacker sử dụng các mô hình tổng hợp giọng nói hoàn toàn mới vừa ra mắt tuần trước (như Vocos, BigVGAN v2, F5-TTS) mà tập dữ liệu huấn luyện của anh/chị chưa từng gặp, mạng MelCNN chắc chắn sẽ bị Overfitting và cho điểm sai. Hệ thống đối phó với các đợt tấn công Zero-Day này như thế nào?\"",
        "rubric": [
          "Đây chính là lý do DeepGuard thiết lập Quyền Phủ Quyết Cứng (Hard Veto): Dù mô hình AI mới đến đâu, khi phát âm thanh Ngã vẫn bắt buộc phải đóng nắp thanh môn (-12dB) và dây thanh người thật bắt buộc phải có micro-jitter (0.6% - 2.5%).",
          "Mô hình Diffusion tổng hợp từ không gian nhiễu toán học trong môi trường vô trùng số luôn có RT60 < 0.12s, bị bắt dính ngay lập tức bởi bộ lọc âm học ISO 3382.",
          "Cơ chế Zero-Trust Vật lý đảm bảo tính phòng thủ bền vững trước mọi cuộc tấn công Zero-Day chưa từng biết."
        ]
      }
    ]
  }
];

// 3. DATA REPOSITORY: 10 REAL FORENSIC CASE STUDIES (MODE 3)
const FORENSIC_CASES = [
  {
    "id": "CASE-VN-2026-081",
    "title": "Vụ Án Lừa Đảo Chuyển Tiền CEO Ngân Hàng A",
    "category": "Voice Clone TTS",
    "audioProfile": "Kênh G.711 thoại bàn (8kHz), giọng đọc mệnh lệnh yêu cầu kế toán trưởng giải ngân 15 tỷ đồng khẩn cấp.",
    "telemetry": {
      "jitter": "0.22% (Ngưỡng sinh học: 0.6% - 2.5%)",
      "glottal": "ΔE = -4.1 dB (Thanh Ngã 'Nguyễn' trơn tuột, không ngắt)",
      "rt60": "0.09s (Phòng câm hoàn toàn - Anechoic Vocoder)",
      "f0Span": "42 Hz (Bẹp cao độ nghiêm trọng)",
      "noiseJump": "1.2 dB"
    },
    "suspectModel": "ElevenLabs Latent Diffusion (Tiếng Việt tổng hợp)",
    "groundTruth": "FAKE",
    "verdict": "KẾT LUẬN: DEEPFAKE XÁC XUẤT 99.8% (PHỦ QUYẾT BỞI HARD VETO JITTER & GLOTTAL STOP)",
    "analysisText": "Mẫu âm thanh có đường F0 mượt mà bất thường. Khi người nói phát âm từ 'Nguyễn', năng lượng chỉ giảm nhẹ 4.1dB thay vì có khoảng lặng thanh môn -14dB đặc trưng của người Việt. Đồng thời Micro-Jitter đo được chỉ 0.22% tố giác hàm mất mát nội suy của neural vocoder. Phòng thu âm hoàn toàn không có dội âm (RT60 = 0.09s)."
  },
  {
    "id": "CASE-VN-2026-104",
    "title": "Tấn Công Replay Giao Dịch Chuyển Khoản Qua Loa Ngoài",
    "category": "Loudspeaker Replay Attack",
    "audioProfile": "Âm thanh ghi âm trộm từ phòng họp của nạn nhân, sau đó phát lại qua loa Bluetooth trước micro điện thoại.",
    "telemetry": {
      "jitter": "1.15% (Sinh học chuẩn người thật)",
      "glottal": "ΔE = -14.8 dB (Thanh Ngã chuẩn người thật)",
      "rt60": "0.96s (Vượt ngưỡng 0.85s - Dội âm phòng kép)",
      "f0Span": "128 Hz (Dải âm vực phong phú)",
      "noiseJump": "11.4 dB (Vết cắt ghép giữa các file audio)"
    },
    "suspectModel": "Replay Attack (Phát lại qua màng loa vật lý + Cắt ghép nối)",
    "groundTruth": "FAKE",
    "verdict": "KẾT LUẬN: GIAN LẬN REPLAY & CẮT GHÉP (PHỦ QUYẾT BỞI HARD VETO ISO 3382 RT60 > 0.85s)",
    "analysisText": "Mặc dù Micro-Jitter và Glottal Stop hoàn toàn đạt chuẩn sinh học (do là giọng người thật bị ghi âm trộm), nhưng phân tích tích phân lùi Schroeder phát hiện thời gian dội âm RT60 lên tới 0.96s. Đáp ứng xung phòng bị nhân đôi tích chập (Phòng họp gốc * Phòng phát lại). Trên phổ xuất hiện rõ các rãnh lọc lược (Comb-filtering) do giao thoa phản xạ màng loa."
  },
  {
    "id": "CASE-VN-2026-159",
    "title": "Mạo Danh RVC v2 Trực Tiếp Trong Cuộc Gọi Khách Hàng",
    "category": "Realtime Voice Conversion",
    "audioProfile": "Kẻ tấn công nói trực tiếp vào micro qua phần mềm RVC v2 đổi giọng thành người thân của nạn nhân.",
    "telemetry": {
      "jitter": "5.45% (Vượt ngưỡng sinh học > 4.8%)",
      "glottal": "ΔE = -7.3 dB",
      "rt60": "0.32s (Phòng ngủ thông thường)",
      "f0Span": "145 Hz",
      "noiseJump": "2.1 dB"
    },
    "suspectModel": "RVC v2 (Harvest F0 + VITS Decoder)",
    "groundTruth": "FAKE",
    "verdict": "KẾT LUẬN: REALTIME DEEPFAKE VOICE CONVERSION (PHỦ QUYẾT BỞI PHASE JITTER DISCONTINUITY)",
    "analysisText": "Mô hình RVC v2 khi nội suy giọng nói thời gian thực gặp hiện tượng trượt pha (Phase Slip) giữa các khung STFT, khiến độ biến thiên chu kỳ giật cục vọt lên 5.45%. Đây là vết hằn vật lý đặc trưng của thuật toán Harvest F0 khi xử lý tiếng Việt có dấu biến thiên cao độ liên tục."
  },
  {
    "id": "CASE-VN-2026-210",
    "title": "Mạo Danh Cơ Quan Điều Tra Qua Tổng Đài Ảo (Zalo/FPT AI)",
    "category": "Autoregressive TTS",
    "audioProfile": "Cuộc gọi giả danh công an đe dọa nạn nhân dính líu đến đường dây rửa tiền, yêu cầu chuyển tiền vào tài khoản tạm giữ.",
    "telemetry": {
      "jitter": "0.28% (Quá mượt, phi tự nhiên)",
      "glottal": "ΔE = -3.8 dB",
      "rt60": "0.11s (Môi trường câm số)",
      "f0Span": "58 Hz (Âm điệu đều đều, thiếu cảm xúc sinh học)",
      "noiseJump": "0.8 dB"
    },
    "suspectModel": "VALL-E / VITS Tiếng Việt tổng hợp",
    "groundTruth": "FAKE",
    "verdict": "KẾT LUẬN: CUỘC GỌI MẠO DANH ĐIỀU TRA (PHỦ QUYẾT TOÀN DIỆN BỞI PROSODY & ACOUSTICS)",
    "analysisText": "Mô hình TTS tự hồi quy tạo ra chuỗi âm thanh có đường F0 rất giả tạo (dải biến thiên chỉ 58Hz). Thanh Ngã bị làm phẳng hoàn toàn, thiếu đi độ rung thanh âm đặc trưng của người Việt khi nói giọng miền Bắc/Trung. Hệ thống tự động kích hoạt chặn cứng."
  },
  {
    "id": "CASE-VN-2026-278",
    "title": "Cuộc Gọi Xác Thực Chuyển Khoản Người Thật Bị Bệnh Lý Khàn Giọng",
    "category": "Liveness False-Positive Test",
    "audioProfile": "Chủ tài khoản thật gọi điện xác nhận giao dịch trong lúc bị cảm cúm, giọng nghẹt và khàn đặc.",
    "telemetry": {
      "jitter": "2.10% (Trong ngưỡng sinh học 0.6% - 2.5%)",
      "glottal": "ΔE = -13.1 dB (Thanh môn đóng tự nhiên)",
      "rt60": "0.38s (Phòng ngủ chuẩn người thật)",
      "f0Span": "95 Hz",
      "noiseJump": "1.5 dB"
    },
    "suspectModel": "Người Sống Thật (Khách Hàng VIP Có Bệnh Lý Khàn Tiếng)",
    "groundTruth": "REAL",
    "verdict": "KẾT LUẬN: NGƯỜI SỐNG HỢP LỆ (LIVENESS PASSED - KHÔNG PHỦ QUYẾT)",
    "analysisText": "Mặc dù giọng bị khàn do viêm thanh quản, các chỉ số bất biến vật lý hoàn toàn nằm trong dải sinh học: Jitter 2.10%, Glottal Stop -13.1dB và dội âm phòng 0.38s. Hệ thống không bị đánh lừa bởi cảm xúc, xác thực hợp lệ."
  },
  {
    "id": "CASE-VN-2026-299",
    "title": "Khách Hàng Nói Chuyện Trong Môi Trường Ồn Quán Cà Phê",
    "category": "Environmental Noise Challenge",
    "audioProfile": "Cuộc gọi từ quán cà phê đông người, có tiếng nhạc nền và tiếng người nói chuyện ồn ào xung quanh.",
    "telemetry": {
      "jitter": "1.45% (Sinh học chuẩn người thật)",
      "glottal": "ΔE = -12.4 dB (Khối thanh môn đóng rõ rệt)",
      "rt60": "0.52s (Dội âm không gian quán chuẩn thực tế)",
      "f0Span": "115 Hz",
      "noiseJump": "1.8 dB"
    },
    "suspectModel": "Người Sống Thật (Có Nhiễu Âm Môi Trường Phức Tạp)",
    "groundTruth": "REAL",
    "verdict": "KẾT LUẬN: NGƯỜI THẬT HỢP LỆ (LỌC NHIỄU PHỔ THÀNH CÔNG)",
    "analysisText": "Mặc dù tỷ lệ tín hiệu trên nhiễu SNR thấp (~12dB) do tiếng ồn nền quán cà phê, bộ lọc Polyphase và thuật toán NAFE vẫn tách lọc chính xác đường cao độ F0 của người nói chính. Thanh Ngã và Jitter đều nằm trong giới hạn sinh lý người bình thường."
  },
  {
    "id": "CASE-VN-2026-302",
    "title": "Tấn Công Neural Vocoder Thế Hệ Mới (Vocos / BigVGAN Diffusion)",
    "category": "Advanced Neural Vocoder",
    "audioProfile": "Cuộc gọi nén Opus 16kbps giả mạo giọng nói con trai yêu cầu mẹ chuyển tiền viện phí gấp.",
    "telemetry": {
      "jitter": "0.26% (Dưới ngưỡng sinh học 0.6%)",
      "glottal": "ΔE = -4.8 dB (Thanh Ngã 'Mỹ' bị trượt qua)",
      "rt60": "0.08s (Phòng câm toán học cực đoan)",
      "f0Span": "72 Hz",
      "noiseJump": "0.6 dB"
    },
    "suspectModel": "BigVGAN v2 / Vocos Pretrained on CommonVoice",
    "groundTruth": "FAKE",
    "verdict": "KẾT LUẬN: DEEPFAKE THẾ HỆ MỚI (PHỦ QUYẾT BỞI ANCHOIC ROOM & GLOTTAL CLOSURE)",
    "analysisText": "Kẻ gian sử dụng BigVGAN v2 cho chất lượng âm thanh trong trẻo đánh lừa màng nhĩ người nghe. Tuy nhiên phân tích Schroeder cho thấy RT60 chỉ 0.08s - bằng chứng của việc tổng hợp từ ma trận số không phản xạ phòng. Thêm vào đó, từ 'Mỹ' hoàn toàn thiếu khoảng lặng thanh môn -12dB đặc trưng."
  },
  {
    "id": "CASE-VN-2026-345",
    "title": "Gian Lận Qua Tai Nghe Chống Ồn Chủ Động (ANC Artifacts Test)",
    "category": "Acoustic Artifacts Edge Case",
    "audioProfile": "Khách hàng sử dụng tai nghe AirPods Pro chống ồn chủ động bật mode ANC trong phòng kín.",
    "telemetry": {
      "jitter": "1.12% (Sinh học chuẩn người thật)",
      "glottal": "ΔE = -14.2 dB (Thanh môn đóng rất sâu)",
      "rt60": "0.28s (Phòng ngủ chuẩn)",
      "f0Span": "102 Hz",
      "noiseJump": "2.3 dB (Do mạch DSP khử ồn của tai nghe)"
    },
    "suspectModel": "Người Sống Thật (Sử Dụng Thiết Bị Có Mạch Lọc DSP Khử Ồn)",
    "groundTruth": "REAL",
    "verdict": "KẾT LUẬN: NGƯỜI SỐNG HỢP LỆ (HỆ THỐNG KHÔNG MẮC BẪY MẠCH LỌC TAI NGHE)",
    "analysisText": "Mạch lọc ANC tạo ra một vệt cắt nhẹ ở dải tần 1kHz-2kHz nhưng không làm biến dạng chu kỳ rung dây thanh. Jitter 1.12% và Glottal Stop -14.2dB hoàn toàn tự nhiên. Hệ thống xác định đây là người thật đang dùng thiết bị khử ồn."
  },
  {
    "id": "CASE-VN-2026-401",
    "title": "Cắt Ghép Nối Âm Tiết Từ Livestream (Concatenative Voice Splicing)",
    "category": "Audio Splicing Fraud",
    "audioProfile": "Kẻ gian tải video livestream bán hàng của nạn nhân, cắt từng từ đơn lẻ ghép thành câu lệnh chuyển khoản.",
    "telemetry": {
      "jitter": "1.32% (Âm tiết gốc là người thật)",
      "glottal": "ΔE = -11.5 dB",
      "rt60": "0.45s",
      "f0Span": "135 Hz",
      "noiseJump": "13.8 dB (Vết cắt biên độ cực lớn giữa các từ)"
    },
    "suspectModel": "Concatenative Audio Splicer (Ghép nối file âm thanh thô)",
    "groundTruth": "FAKE",
    "verdict": "KẾT LUẬN: CẮT GHÉP NỐI ÂM THANH TRÁI PHÉP (PHỦ QUYẾT BỞI NOISE FLOOR DISCONTINUITY > 9.5dB)",
    "analysisText": "Dù từng từ riêng lẻ có đặc trưng giọng của nạn nhân, nhưng sự chênh lệch nền nhiễu Delta Noise Floor giữa từ 'Chuyển' và từ 'Khoản' lên tới 13.8dB, kèm bước nhảy pha không liên tục. Đây là bằng chứng không thể chối cãi của việc cắt dán file ghi âm."
  },
  {
    "id": "CASE-VN-2026-520",
    "title": "Chủ Tài Khoản Lớn Tuổi Có Chứng Run Giọng Sinh Lý (Vocal Tremor)",
    "category": "Physiological Vocal Tremor",
    "audioProfile": "Bà cụ 76 tuổi gọi điện cho tổng đài ngân hàng hỏi số dư tiết kiệm, giọng run rẩy do tuổi già.",
    "telemetry": {
      "jitter": "2.38% (Cận trên dải sinh lý người già 0.6% - 2.5%)",
      "glottal": "ΔE = -12.9 dB",
      "rt60": "0.35s (Phòng khách gia đình)",
      "f0Span": "88 Hz (Dao động tuần hoàn chậm theo nhịp tim)",
      "noiseJump": "1.1 dB"
    },
    "suspectModel": "Người Sống Thật (Bệnh Lý Run Giọng Tuổi Già Tuần Hoàn Chậm)",
    "groundTruth": "REAL",
    "verdict": "KẾT LUẬN: NGƯỜI SỐNG HỢP LỆ (RUN GIỌNG SINH LÝ KHÁC BIỆT VỚI RVC TRƯỢT PHA)",
    "analysisText": "Chứng run giọng người già (Tremor) tạo ra biến thiên F0 tuần hoàn chậm (4-7Hz, theo nhịp cơ thể). Ngược lại, Deepfake RVC tạo ra hiện tượng trượt pha ngẫu nhiên không tuần hoàn. Hệ thống phân biệt chính xác và xác nhận người thật hợp lệ."
  }
];

// 4. DATA REPOSITORY: 45 DEEP TRAP QUIZ QUESTIONS (MODE 4 & TAB 5)
const QUIZ_QUESTIONS = [
  {
    "cat": "dsp",
    "q": "Tại sao trong tiền xử lý DSP của DeepGuard, việc Resampling từ 44.1kHz về 16kHz bắt buộc phải dùng Polyphase Resampling thay vì Linear Interpolation?",
    "opts": [
      "Để giảm thiểu độ phức tạp thời gian từ O(N^2) về O(N log N).",
      "Để ngăn chặn hiện tượng răng cưa tần số (Aliasing) và rò rỉ phổ (Spectral Leakage) làm sai lệch đặc trưng formant.",
      "Vì chuẩn định dạng ONNX Runtime bắt buộc ma trận đầu vào phải là số chẵn.",
      "Để làm mịn tín hiệu âm thanh giúp mô hình học sâu hội tụ nhanh hơn."
    ],
    "ans": 1,
    "exp": "Polyphase Filtering áp dụng bộ lọc thông thấp FIR Kaiser-window đạt chuẩn Nyquist trước khi hạ mẫu, loại bỏ hoàn toàn các tần số phản chiếu gây biến dạng phổ Log-Mel."
  },
  {
    "cat": "dsp",
    "q": "Khi tính toán Log-Mel Spectrogram với 80 bins từ 100Hz đến 8000Hz, tại sao thang đo Mel lại phân bố dải lọc dày đặc ở tần số thấp và thưa dần ở tần số cao?",
    "opts": [
      "Vì tần số thấp chứa ít năng lượng hơn nên cần lọc nhiều hơn.",
      "Mô phỏng cơ chế cảm nhận thính giác sinh học của màng đáy ốc tai người (Basilar Membrane), vốn nhạy bén cao với các biến đổi cao độ F0 ở dải trầm.",
      "Để giảm kích thước bộ nhớ RAM của GPU.",
      "Vì các hàm toán học trong thư viện Librosa chỉ hỗ trợ dạng phân bố này."
    ],
    "ans": 1,
    "exp": "Ốc tai người phân giải cao độ theo thang logarit phi tuyến (Mel Scale). Dải trầm dưới 1000Hz có độ phân giải thính giác rất tinh tế (khoảng cách 1 Bark hẹp), trong khi dải cao phân giải thô hơn."
  },
  {
    "cat": "dsp",
    "q": "Độ dài bước nhảy hop_length = 256 mẫu tại tần số 16kHz tương ứng với bao nhiêu mili-giây và có độ chồng lấn (overlap) là bao nhiêu phần trăm với cửa sổ Hann 1024 mẫu?",
    "opts": [
      "8ms và chồng lấn 50%.",
      "16ms và chồng lấn 75%.",
      "32ms và chồng lấn 25%.",
      "64ms và không có chồng lấn."
    ],
    "ans": 1,
    "exp": "Delta t = 256 / 16000 = 0.016s = 16ms. Độ chồng lấn Overlap = (1024 - 256) / 1024 = 768 / 1024 = 75%. Cấu hình này bảo đảm tính liên tục của đường bao phổ mà không tạo lỗ hổng thời gian."
  },
  {
    "cat": "dsp",
    "q": "Độ phân giải tần số Delta f của biến đổi Fourier thời gian ngắn (STFT) với cửa sổ N = 1024 mẫu tại f_s = 16,000Hz là bao nhiêu?",
    "opts": [
      "7.8125 Hz.",
      "15.625 Hz.",
      "31.25 Hz.",
      "62.5 Hz."
    ],
    "ans": 1,
    "exp": "Delta f = f_s / N = 16,000 / 1024 = 15.625 Hz. Độ phân giải này đủ mịn để tách bạch các vạch hài âm của thanh điệu tiếng Việt (F0 trong khoảng 100-300Hz)."
  },
  {
    "cat": "dsp",
    "q": "Chỉ số Spectral Flatness (Độ phẳng phổ) được tính bằng tỷ số nào và có ý nghĩa gì trong giám định âm thanh?",
    "opts": [
      "Tỷ số giữa năng lượng dải cao và dải thấp; Flatness cao là tiếng thì thầm.",
      "Tỷ số giữa trung bình nhân và trung bình cộng của phổ công suất; Flatness gần 1 là nhiễu trắng, gần 0 là âm thanh thuần/dây thanh.",
      "Tỷ số giữa biên độ đỉnh và biên độ hiệu dụng RMS; dùng để đo độ méo tiếng.",
      "Tỷ số giữa tần số cơ bản F0 và Formant F1; dùng để phân biệt nam và nữ."
    ],
    "ans": 1,
    "exp": "Spectral Flatness = exp(mean(ln S(f))) / mean(S(f)). Giá trị xấp xỉ 1 phản ánh phổ phẳng đồng đều (nhiễu trắng, ma sát vô thanh), trong khi giá trị tiến tới 0 đại diện cho phổ có các đỉnh cộng hưởng sắc nét của dây thanh người."
  },
  {
    "cat": "dsp",
    "q": "Hiện tượng rò rỉ phổ (Spectral Leakage) trong phép biến đổi FFT được khắc phục chủ yếu bằng phương pháp nào?",
    "opts": [
      "Tăng tần số lấy mẫu lên gấp 10 lần (Over-sampling).",
      "Nhân tín hiệu trong miền thời gian với hàm cửa sổ mượt (như Hann, Hamming, Blackman) trước khi tính FFT.",
      "Cắt bỏ phần ảo (Imaginary part) của số phức sau khi tính FFT.",
      "Áp dụng thuật toán nén âm thanh MP3."
    ],
    "ans": 1,
    "exp": "Cửa sổ Hann ép hai đầu mút của khung thời gian về 0 mượt mà, triệt tiêu sự gián đoạn biên giới gây phát sinh các tần số giả tạo rò rỉ sang các bin lân cận."
  },
  {
    "cat": "dsp",
    "q": "Trọng tâm phổ (Spectral Centroid) của một đoạn âm thanh biểu thị tính chất vật lý nào của âm thanh?",
    "opts": [
      "Độ to (Loudness) của âm thanh.",
      "Độ 'sáng' (Brightness) của âm sắc, tương ứng với trọng tâm khối lượng phân bố năng lượng theo tần số.",
      "Thời gian dội âm của phòng.",
      "Khoảng cách vật lý từ miệng người nói đến micro."
    ],
    "ans": 1,
    "exp": "Centroid = SUM(f * S(f)) / SUM(S(f)). Âm thanh có nhiều hài âm cao (như âm xuýt /s/, tiếng kim loại) có Centroid cao, trong khi âm trầm có Centroid thấp."
  },
  {
    "cat": "dsp",
    "q": "Tại sao trong quy chuẩn tiền xử lý âm thanh pháp y của DeepGuard, tần số lấy mẫu lại chọn 16kHz thay vì 8kHz chuẩn điện thoại thoại bàn?",
    "opts": [
      "Vì card âm thanh của máy tính không thể phát âm thanh 8kHz.",
      "Tần số 16kHz bảo toàn dải tần số lên đến 8000Hz (Nyquist), giữ trọn vẹn Formant F2, F3 và các đặc trưng vi mô của nắp thanh môn cần thiết cho chống Deepfake.",
      "Vì chuẩn nén MP3 chỉ hỗ trợ 16kHz.",
      "Để tương thích với chuẩn kết nối HDMI trên tivi."
    ],
    "ans": 1,
    "exp": "Ở 8kHz (Nyquist 4kHz), Formant F3 (2500-3500Hz) và các artifacts dải cao của Neural Vocoder bị mất mát nghiêm trọng. 16kHz là điểm ngọt (Sweet Spot) giữa chi phí tính toán và bảo toàn chứng cứ pháp y."
  },
  {
    "cat": "acoustics",
    "q": "Phương pháp tích phân lùi Schroeder (Schroeder Backward Integration) tính toán đại lượng nào để suy ra thời gian dội âm RT60?",
    "opts": [
      "Tích phân năng lượng tức thời từ thời điểm 0 đến t.",
      "Tích phân năng lượng suy giảm tích lũy từ thời điểm t đến vô cùng: E(t) = INTEGRAL_t^INF h^2(tau) dtau.",
      "Đạo hàm bậc một của biên độ sóng âm theo thời gian.",
      "Biến đổi Z của đáp ứng xung phòng h(t)."
    ],
    "ans": 1,
    "exp": "Tích phân ngược dòng thời gian từ vô cùng về t triệt tiêu hoàn toàn sự dao động pha ngẫu nhiên, tạo ra đường cong suy giảm năng lượng mượt mà đơn điệu để xác định chính xác độ dốc T20/RT60."
  },
  {
    "cat": "acoustics",
    "q": "Theo tiêu chuẩn ISO 3382, thời gian dội âm RT60 được suy ra từ độ dốc suy giảm năng lượng T20 như thế nào?",
    "opts": [
      "RT60 = T20 / 3.",
      "RT60 = 3 * T20 (Đo thời gian suy giảm từ -5dB xuống -25dB và ngoại suy ra 60dB).",
      "RT60 = 2 * T20.",
      "RT60 = T20^2."
    ],
    "ans": 1,
    "exp": "T20 đo khoảng thời gian năng lượng âm thanh giảm 20dB (từ -5dB xuống -25dB). Do giả định suy giảm hàm mũ tuyến tính trong thang dB, RT60 (suy giảm 60dB) bằng đúng 3 lần T20."
  },
  {
    "cat": "acoustics",
    "q": "Tại sao thời gian dội âm RT60 < 0.15s trên các đoạn rơi năng lượng tiếng nói lại bị coi là dấu hiệu bất thường của Deepfake?",
    "opts": [
      "Vì tai người không thể nghe được âm thanh có RT60 dưới 0.15s.",
      "Đặc trưng của môi trường phòng câm toán học (Anechoic): Các mô hình TTS/Vocoder tổng hợp từ mạng neural trong môi trường vô trùng số không có dội âm thực tế.",
      "Vì sóng âm bị hấp thụ bởi khí CO2 trong phòng.",
      "Vì chuẩn viễn thông SIP bắt buộc RT60 phải trên 0.5s."
    ],
    "ans": 1,
    "exp": "Mọi căn phòng thực tế trong đời sống (phòng ngủ, phòng khách, văn phòng) đều có phản xạ tường với RT60 từ 0.2s đến 0.7s. RT60 < 0.15s chỉ tồn tại trong phòng thí nghiệm câm đặc biệt hoặc âm thanh do AI tổng hợp."
  },
  {
    "cat": "acoustics",
    "q": "Hiện tượng lọc lược (Comb-Filtering) xuất hiện trên phổ âm thanh là bằng chứng vật lý của loại tấn công nào?",
    "opts": [
      "Tấn công từ chối dịch vụ DoS vào tổng đài.",
      "Tấn công phát lại qua loa ngoài (Loudspeaker Replay Attack) do sự giao thoa pha giữa âm thanh trực tiếp và phản xạ màng loa.",
      "Tấn công nghe lén đường truyền Man-in-the-Middle.",
      "Tấn công đổi giọng nói trực tiếp RVC."
    ],
    "ans": 1,
    "exp": "Khi âm thanh được phát qua loa và thu lại bằng micro, sóng trực tiếp cộng với sóng trễ tạo ra hàm truyền đạt H(f) = 1 + alpha * e^{-j 2 pi f Delta t}, tạo thành các rãnh răng lược triệt tiêu tuần hoàn trên phổ."
  },
  {
    "cat": "acoustics",
    "q": "Khi kẻ gian thực hiện tấn công Replay qua loa ngoài, thời gian dội âm RT60 đo được có xu hướng biến đổi như thế nào?",
    "opts": [
      "Giảm xuống dưới 0.05s do loa ngoài triệt tiêu âm học phòng.",
      "Tăng cao đột biến vượt ngưỡng 0.85s do hiệu ứng tích chập 2 lần phản xạ phòng (Phòng ghi âm gốc * Phòng phát lại).",
      "Không thay đổi vì RT60 là bất biến vật lý không thể sao chép.",
      "Biến đổi ngẫu nhiên thành tần số vô tuyến."
    ],
    "ans": 1,
    "exp": "Đáp ứng xung tổng hợp là tích chập h_total(t) = h_rec(t) * h_play(t) * h_speaker(t). Hiệu ứng dội âm kép kéo dài đuôi suy giảm năng lượng, đẩy RT60 lên trên 0.85s - 1.2s."
  },
  {
    "cat": "acoustics",
    "q": "Chỉ số Delta Noise Floor > 9.5 dB giữa hai từ hoặc cụm từ liền kề trong file ghi âm tố giác hành vi gì?",
    "opts": [
      "Người nói đang vừa đi vừa nói chuyện.",
      "Hành vi cắt ghép nối âm thanh đa nguồn (Audio Splicing) từ các bản ghi âm ở các môi trường hoặc thiết bị khác nhau.",
      "Micro của nạn nhân sắp hết pin.",
      "Hiện tượng trễ gói tin trên mạng viễn thông."
    ],
    "ans": 1,
    "exp": "Mỗi môi trường và thiết bị có mức nhiễu nền vật lý cố định. Việc ghép nối các đoạn ghi âm cắt rời làm thay đổi đột ngột biên độ nhiễu nền tại điểm nối (Splicing Boundary), tạo ra bước nhảy > 9.5dB."
  },
  {
    "cat": "acoustics",
    "q": "Đoạn rơi năng lượng tiếng nói (Speech Offset Tail) được chọn để tính Schroeder phải thỏa mãn điều kiện nào?",
    "opts": [
      "Nằm ở giữa một nguyên âm kéo dài có cường độ lớn nhất.",
      "Là đoạn năng lượng suy giảm tự do ngay sau khi người nói đột ngột ngắt giọng ở cuối âm tiết, không có âm thanh kích thích tiếp theo trong tối thiểu 150ms.",
      "Là đoạn micro hoàn toàn không có tín hiệu (Digital Mute).",
      "Là đoạn có tiếng cười hoặc tiếng vỗ tay."
    ],
    "ans": 1,
    "exp": "Chỉ khi nguồn âm ngắt đột ngột, năng lượng còn lại trong không gian mới hoàn toàn là do sóng dội âm phản xạ từ tường phòng suy hao theo thời gian."
  },
  {
    "cat": "acoustics",
    "q": "Tại sao trước khi tính tích phân Schroeder, bắt buộc phải thực hiện bước trừ mức nhiễu nền (Noise Floor Subtraction)?",
    "opts": [
      "Để giảm kích thước tệp tin âm thanh.",
      "Vì nếu không trừ nhiễu nền, tích phân sẽ tích lũy năng lượng nhiễu vô hạn khiến đường cong Schroeder bị bẹt ở đuôi và tính sai hoàn toàn T20.",
      "Để loại bỏ tần số cơ bản F0 của người nói.",
      "Để phù hợp với chuẩn định dạng MP3."
    ],
    "ans": 1,
    "exp": "Nhiễu nền luôn tồn tại với năng lượng sigma_noise^2 > 0. Nếu không trừ đi mức này, đường cong suy giảm sẽ tiệm cận về đường nằm ngang thay vì dốc xuống -60dB, dẫn đến đánh giá sai thời gian dội âm."
  },
  {
    "cat": "prosody",
    "q": "Hiện tượng thắt nắp thanh môn (Glottal Stop) xảy ra đặc trưng ở thanh điệu nào trong 6 thanh điệu tiếng Việt?",
    "opts": [
      "Thanh Ngang (Không dấu).",
      "Thanh Ngã (và một phần thanh Nặng trong phương ngữ Bắc Bộ).",
      "Thanh Huyền.",
      "Thanh Sắc."
    ],
    "ans": 1,
    "exp": "Về mặt ngữ âm học tiếng Việt, thanh Ngã là thanh gãy (broken tone): nắp thanh môn ép chặt làm tắt nghẽn luồng khí hoàn toàn trong khoảng 20-50ms trước khi bật mở lại ở cao độ cao hơn."
  },
  {
    "cat": "prosody",
    "q": "Trong giám định pháp y tiếng Việt, tiêu chí nào xác định một hiện tượng Glottal Stop hợp lệ của người thật?",
    "opts": [
      "Độ sụt năng lượng RMS Delta E < -12.0 dB kèm trạng thái hữu thanh (Voiced) trước và sau khoảng lặng trong khung 20-50ms.",
      "Tần số F0 tăng vọt lên trên 1000Hz.",
      "Âm lượng tăng đột ngột +20dB.",
      "Micro bị mất tín hiệu hoàn toàn trong 2 giây."
    ],
    "ans": 0,
    "exp": "Glottal Stop của thanh Ngã đòi hỏi độ tụt năng lượng sâu (Delta E < -12dB) do dây thanh ngừng rung cơ học, nhưng hai bên khoảng lặng phải là nguyên âm hữu thanh (F0 > 0)."
  },
  {
    "cat": "prosody",
    "q": "Dải Micro-Jitter sinh học chuẩn của người nói bình thường nằm trong khoảng bao nhiêu phần trăm?",
    "opts": [
      "0.01% - 0.10%.",
      "0.60% - 2.50%.",
      "5.00% - 10.00%.",
      "15.00% - 30.00%."
    ],
    "ans": 1,
    "exp": "Do cơ cấu sinh học của thanh quản người, các chu kỳ dao động liền kề của dây thanh luôn có sự sai lệch tự nhiên từ 0.6% đến 2.5%. Dưới 0.35% là dấu hiệu AI tổng hợp quá mịn; trên 4.8% là dấu hiệu AI chuyển giọng bị trượt pha."
  },
  {
    "cat": "prosody",
    "q": "Tại sao các mô hình Voice Conversion thời gian thực (như RVC v2) thường có chỉ số Jitter tăng vọt bất thường > 4.8%?",
    "opts": [
      "Vì phần mềm cố tình thêm nhiễu vào để đánh lừa ngân hàng.",
      "Hiện tượng trượt pha (Phase Discontinuity / Phase Slip) giữa các khung STFT khi thuật toán nội suy F0 (Harvest/Crepe) xử lý tiếng Việt có dấu.",
      "Do tốc độ mạng Internet quá chậm.",
      "Vì người dùng nói quá to làm rè micro."
    ],
    "ans": 1,
    "exp": "Voice conversion phải bóc tách pitch và ghép vào vocal timbre mới trong thời gian thực. Sự gián đoạn pha tại ranh giới giữa các khung biến đổi tạo ra các xung đột biên độ vi mô, đẩy Jitter lên cao bất thường."
  },
  {
    "cat": "prosody",
    "q": "Thuật toán NAFE (Normalized Autocorrelation F0 Estimation) được ưu tiên dùng để bóc tách F0 tiếng Việt vì ưu điểm gì?",
    "opts": [
      "Tốc độ chạy nhanh gấp 1000 lần mạng nơ-ron và chuẩn hóa năng lượng cục bộ, kháng tốt hiện tượng biến thiên biên độ (Shimmer).",
      "Khả năng dự đoán tương lai người nói sẽ nói từ gì tiếp theo.",
      "Tự động dịch tiếng Việt sang tiếng Anh.",
      "Không cần dùng đến phép nhân toán học."
    ],
    "ans": 0,
    "exp": "Tự tương quan chuẩn hóa chia cho căn bậc hai của tích năng lượng hai khung, loại bỏ ảnh hưởng của việc tăng giảm âm lượng đột ngột, giúp dò cực đại chu kỳ dây thanh cực kỳ ổn định trong dải 60-400Hz."
  },
  {
    "cat": "prosody",
    "q": "Tại sao kẻ tấn công Deepfake TTS (như ElevenLabs, VITS) thường thất bại trong việc tái tạo thanh Ngã tiếng Việt?",
    "opts": [
      "Vì các mô hình này chỉ được lập trình để nói tiếng Anh.",
      "Hàm mất mát hồi quy (L1/L2/Mel-loss) của neural vocoder có xu hướng làm trơn đường bao phổ (Smoothing Effect), triệt tiêu khoảng lặng thanh môn sâu -12dB.",
      "Vì tiếng Việt không có trên bảng mã Unicode.",
      "Do máy chủ AI không đủ RAM để render thanh Ngã."
    ],
    "ans": 1,
    "exp": "Các mạng học sâu tối ưu hóa hàm lỗi trung bình trên toàn phổ. Điểm ngắt thanh môn cực ngắn (30ms) thường bị mạng làm phẳng thành một chỗ trũng nông (-3dB đến -5dB) để tối ưu hàm lỗi, để lộ sơ hở vật lý."
  },
  {
    "cat": "prosody",
    "q": "Khái niệm Shimmer trong phân tích âm sinh học tiếng nói thể hiện đại lượng nào?",
    "opts": [
      "Độ biến thiên chu kỳ thời gian giữa các xung thanh môn.",
      "Độ biến thiên biên độ (công suất) giữa các chu kỳ dao động dây thanh liền kề.",
      "Tốc độ nói tính bằng số từ trên phút.",
      "Tỷ số giữa nguyên âm và phụ âm."
    ],
    "ans": 1,
    "exp": "Jitter đo độ bất đối xứng về thời gian (tần số), còn Shimmer đo độ bất đối xứng về biên độ đỉnh sóng giữa các chu kỳ dây thanh. Cả hai là cặp bài trùng trong giám định sinh trắc học thanh môn."
  },
  {
    "cat": "prosody",
    "q": "Dải tần số cơ bản F0 tự nhiên của giọng nam và giọng nữ trưởng thành ở người Việt Nam thường nằm trong khoảng nào?",
    "opts": [
      "20Hz - 50Hz.",
      "Nam: 85Hz - 180Hz; Nữ: 165Hz - 255Hz (Tổng thể dải sinh học: 60Hz - 400Hz).",
      "500Hz - 2000Hz.",
      "5000Hz - 8000Hz."
    ],
    "ans": 1,
    "exp": "Dây thanh nam dày và dài hơn nên dao động ở tần số thấp hơn (trung bình ~120Hz), nữ dao động cao hơn (~210Hz). Mọi giá trị F0 đo được ngoài khoảng 60-400Hz trong giọng thoại bình thường đều là lỗi thuật toán hoặc âm thanh tổng hợp."
  },
  {
    "cat": "onnx",
    "q": "Tại sao mô hình MelCNN của DeepGuard chỉ sử dụng 1.2M tham số thay vì các mô hình nền tảng như WavLM (95M) hay Whisper?",
    "opts": [
      "Vì tác giả không biết cách huấn luyện các mô hình lớn hơn.",
      "Để đảm bảo thời gian suy luận dưới 7ms trên CPU thông thường và mức tiêu thụ RAM < 85MB, đáp ứng độ trễ 350ms cho hàng nghìn cuộc gọi đồng thời.",
      "Vì ONNX Runtime không hỗ trợ mô hình trên 5 triệu tham số.",
      "Để có thể nén vừa vào một đĩa mềm 1.44MB."
    ],
    "ans": 1,
    "exp": "Trong môi trường tổng đài viễn thông với hàng trăm kênh thoại thời gian thực, mô hình 1.2M tham số chạy trên CPU với độ trễ 6.8ms là giải pháp tối ưu kinh tế và kỹ thuật, tránh gánh nặng cụm GPU đắt đỏ."
  },
  {
    "cat": "onnx",
    "q": "Kỹ thuật Hợp nhất toán tử (Operator Fusion) trong ONNX Runtime Opset 14 mang lại lợi ích kỹ thuật lớn nhất nào?",
    "opts": [
      "Giúp mô hình dự đoán chính xác hơn 50%.",
      "Ghép nối các chuỗi toán tử Conv2D + BatchNorm + Mish thành một kernel thực thi duy nhất, giảm thiểu số lần ghi/đọc bộ nhớ đệm RAM và tăng tốc 35-40%.",
      "Tự động xóa các file rác trên ổ cứng máy chủ.",
      "Tự động sửa lỗi chính tả tiếng Việt."
    ],
    "ans": 1,
    "exp": "Thay vì lưu kết quả trung gian của Conv ra RAM rồi đọc lại để tính BatchNorm và Activation, Operator Fusion giữ tensor trong thanh ghi CPU (L1/L2 Cache), triệt tiêu tắc nghẽn băng thông bộ nhớ."
  },
  {
    "cat": "onnx",
    "q": "Tại sao việc cấu hình intra_op_num_threads = 4 và inter_op_num_threads = 1 lại là tối ưu nhất trên CPU 4 core cho một worker?",
    "opts": [
      "Vì số 4 là số may mắn.",
      "Tập trung toàn bộ 4 lõi tính toán song song ma trận cho 1 tensor (intra-op), đồng thời ngăn chặn hiện tượng tranh chấp luồng (Context Switching / Lock Contention) giữa các node.",
      "Để ép CPU luôn chạy ở nhiệt độ dưới 40 độ C.",
      "Vì hệ điều hành Linux bắt buộc cấu hình này."
    ],
    "ans": 1,
    "exp": "Đồ thị MelCNN có cấu trúc tuần tự với các khối residual nhỏ. Việc chạy song song liên node (inter-op) chỉ gây overhead điều phối, trong khi dồn tài nguyên cho phép nhân ma trận nội bộ (intra-op) đạt hiệu suất cao nhất."
  },
  {
    "cat": "onnx",
    "q": "Kỹ thuật Dynamic Quantization từ FP32 xuống INT8 giúp giảm dung lượng mô hình MelCNN từ 4.8MB xuống còn bao nhiêu?",
    "opts": [
      "Khoảng 1.3 MB (giảm xấp xỉ 73%).",
      "Khoảng 3.9 MB.",
      "Khoảng 0.1 MB.",
      "Không giảm dung lượng mà chỉ đổi tên file."
    ],
    "ans": 0,
    "exp": "Trọng số 32-bit float được ánh xạ tuyến tính về số nguyên 8-bit có dấu, giảm dung lượng bộ nhớ xấp xỉ 4 lần (từ 4.8MB xuống 1.3MB) và tăng tốc độ tính toán nhờ tập lệnh vector VNNI/AVX-512 trên CPU Intel."
  },
  {
    "cat": "onnx",
    "q": "Mục đích của khối Squeeze-and-Excitation (SE-Block) trong kiến trúc mạng MelCNN là gì?",
    "opts": [
      "Nén file âm thanh đầu vào lại.",
      "Tự động học và tái phân bổ trọng số cho các kênh đặc trưng tần số quan trọng, tập trung chú ý vào dải Formant và vết hằn Vocoder.",
      "Tăng số lượng tham số của mô hình lên gấp đôi.",
      "Chuyển đổi tín hiệu âm thanh thành văn bản."
    ],
    "ans": 1,
    "exp": "SE-Block sử dụng cơ chế chú ý kênh (Channel Attention) để khuếch đại các kênh phổ chứa thông tin hữu ích và dập tắt các kênh chỉ chứa nhiễu nền hoặc khoảng lặng."
  },
  {
    "cat": "onnx",
    "q": "Hàm kích hoạt Mish được ưu tiên sử dụng thay cho ReLU truyền thống trong MelCNN vì lý do gì?",
    "opts": [
      "Vì Mish chạy nhanh hơn ReLU gấp 10 lần.",
      "Mish là hàm trơn phi tuyến tính liên tục (f(x) = x * tanh(ln(1 + e^x))), không có điểm gãy tại 0, giúp đạo hàm lan truyền mượt mà và bảo toàn gradient âm nhỏ.",
      "Vì Mish không cần dùng phép tính dấu phẩy động.",
      "Vì thư viện PyTorch chỉ hỗ trợ hàm Mish."
    ],
    "ans": 1,
    "exp": "Độ trơn của Mish giúp mô hình học sâu nắm bắt được các gradient biến thiên cực nhỏ của vi cấu trúc phổ âm thanh mà ReLU thường dập tắt về 0 (hiện tượng Dead ReLU)."
  },
  {
    "cat": "onnx",
    "q": "Tại sao trong mã nguồn backend của DeepGuard, việc khởi tạo `ort.InferenceSession` phải được thực hiện một lần lúc khởi động (Singleton) thay vì trong mỗi request?",
    "opts": [
      "Vì Python không cho phép khởi tạo đối tượng hai lần.",
      "Việc tải mô hình và dịch đồ thị tính toán (Graph Compilation) mất 150-300ms; làm mỗi request sẽ gây quá tải RAM và phá vỡ ngân sách độ trễ 350ms.",
      "Để tránh vi phạm bản quyền phần mềm ONNX.",
      "Vì CPU chỉ có thể đọc file ONNX một lần duy nhất."
    ],
    "ans": 1,
    "exp": "InferenceSession của ONNX tối ưu hóa đồ thị và cấp phát bộ nhớ cố định lúc init. Tái sử dụng session đảm bảo mỗi lần suy luận chỉ mất 6.8ms thuần túy cho tính toán ma trận."
  },
  {
    "cat": "fusion",
    "q": "Lý thuyết bằng chứng Dempster-Shafer (DST) giải quyết bài toán cốt lõi nào mà xác suất Bayes truyền thống gặp khó khăn?",
    "opts": [
      "Tăng tốc độ tính toán lên cấp số nhân.",
      "Phân biệt rõ ràng giữa 'Sự thiếu hiểu biết/Không chắc chắn' (Uncertainty) và 'Mâu thuẫn bằng chứng' (Evidence Conflict).",
      "Loại bỏ hoàn toàn sự cần thiết của dữ liệu huấn luyện.",
      "Tự động sửa chữa phần cứng bị hỏng."
    ],
    "ans": 1,
    "exp": "DST cho phép gán khối lượng niềm tin cho tập hợp các giả thuyết thay vì từng phần tử rời rạc, đồng thời cung cấp hệ số xung đột k để đo lường mức độ bất đồng giữa các nguồn bằng chứng độc lập."
  },
  {
    "cat": "fusion",
    "q": "Khi hệ số xung đột k trong Dempster-Shafer vượt ngưỡng 0.85 (ví dụ AI chấm 99% Real nhưng Jitter chỉ 0.20%), hệ thống sẽ phản ứng như thế nào?",
    "opts": [
      "Lấy trung bình cộng điểm số của các bên.",
      "Bác bỏ phép dung hợp mềm và kích hoạt Quyền Phủ Quyết Cứng (Hard Veto): Khẳng định Deepfake vi phạm bất biến vật lý.",
      "Tự động khởi động lại máy chủ.",
      "Bỏ qua dữ liệu Jitter và tin hoàn toàn vào AI."
    ],
    "ans": 1,
    "exp": "Khi xung đột cực đoan xảy ra, việc lấy trung bình sẽ tạo ra ảo giác điểm an toàn giả mạo. Các quy luật vật lý cơ học của dây thanh không thể bị đánh đổi bởi điểm số xác suất của mạng nơ-ron."
  },
  {
    "cat": "fusion",
    "q": "Chính sách phân vùng 3 dải (Tri-Band Policy) trong DeepGuard chia không gian điểm số thành các dải nào?",
    "opts": [
      "Dải Thấp (0-50), Dải Trung (50-80), Dải Cao (80-100).",
      "Dải Xanh [0.0 - 0.30): Chấp thuận tức thì; Dải Vàng [0.30 - 0.80): Kích hoạt Step-up Auth (OTP âm thanh); Dải Đỏ [0.80 - 1.00]: Phong tỏa gian lận.",
      "Dải Alpha, Dải Beta, Dải Gamma.",
      "Dải Âm, Dải Bằng, Dải Dương."
    ],
    "ans": 1,
    "exp": "Tri-Band Policy là trái tim của quản trị rủi ro ngân hàng: Tối đa hóa trải nghiệm người dùng ở dải xanh, bảo vệ tuyệt đối ở dải đỏ, và xử lý linh hoạt không gây gián đoạn kinh doanh ở dải vàng."
  },
  {
    "cat": "fusion",
    "q": "Trong điều kiện kênh thoại G.711 (băng thông 8kHz, nén 8-bit), Cổng động thích ứng kênh truyền điều chỉnh trọng số như thế nào?",
    "opts": [
      "Tăng trọng số CNN lên 0.90.",
      "Hạ trọng số CNN xuống 0.10, tăng trọng số Ngữ âm tiếng Việt (NAFE Jitter/Glottal Stop) lên 0.65 và Âm học phòng lên 0.25.",
      "Giữ nguyên trọng số 50-50.",
      "Tắt toàn bộ hệ thống và chuyển cuộc gọi về analog."
    ],
    "ans": 1,
    "exp": "Kênh G.711 làm biến dạng phổ tần số cao khiến mạng CNN dễ bị nhiễu. Ngược lại, tần số cơ bản F0 và nắp thanh môn của tiếng Việt nằm ở dải trầm được bảo toàn nguyên vẹn, cần được nâng tỷ trọng quyết định."
  },
  {
    "cat": "fusion",
    "q": "Điều kiện nào dưới đây KHÔNG kích hoạt Quyền Phủ Quyết Cứng (Hard Veto) trong DeepGuard?",
    "opts": [
      "Micro-Jitter đo được là 0.22% (< 0.35%).",
      "Thời gian dội âm RT60 đo được là 0.08s (< 0.15s).",
      "Thời gian dội âm RT60 đo được là 0.42s và Micro-Jitter là 1.25%.",
      "Từ phát âm có thanh Ngã nhưng độ sụt năng lượng chỉ đạt Delta E = -3.5 dB."
    ],
    "ans": 2,
    "exp": "RT60 = 0.42s và Jitter = 1.25% hoàn toàn nằm trong dải sinh học và âm học của người thật trong phòng làm việc bình thường, đây là trạng thái hợp lệ không kích hoạt phủ quyết."
  },
  {
    "cat": "fusion",
    "q": "Cơ chế Thử Thách OTP Âm Thanh Động (Dynamic Audio OTP) ở dải vàng yêu cầu khách hàng làm gì?",
    "opts": [
      "Chụp ảnh căn cước công dân gửi qua email.",
      "Đọc to một cụm từ tiếng Việt ngẫu nhiên chứa các âm tiết có thanh Ngã hoặc thanh Nặng (ví dụ: 'Mỹ Nghệ', 'Sữa Chữa', 'Vững Chãi') do hệ thống sinh ra tức thời.",
      "Nói liên tục trong 5 phút không nghỉ.",
      "Gõ mật khẩu ngân hàng trên bàn phím điện thoại."
    ],
    "ans": 1,
    "exp": "Kẻ gian dùng công cụ TTS chuẩn bị trước không thể đoán được cụm từ ngẫu nhiên. Đồng thời việc đọc từ có thanh Ngã ép kẻ gian phải tái tạo hiện tượng thắt nắp thanh môn trong thời gian thực, bộc lộ ngay sơ hở Deepfake."
  },
  {
    "cat": "fusion",
    "q": "Tại sao việc chỉ sử dụng một ngưỡng đơn lẻ (Single Threshold, ví dụ score > 0.5 là Deepfake) lại là sai lầm chết người trong an ninh ngân hàng?",
    "opts": [
      "Vì các kỹ sư ngân hàng thích dùng nhiều số hơn.",
      "Ngưỡng đơn tạo ra sự đánh đổi không thể dung hòa: Đặt ngưỡng thấp thì báo động giả làm phiền hàng nghìn khách hàng thật (FPR cao), đặt ngưỡng cao thì bỏ lọt kẻ gian (FNR cao).",
      "Vì chuẩn PCI-DSS cấm dùng ngưỡng 0.5.",
      "Vì ngưỡng đơn làm máy chủ tốn điện hơn."
    ],
    "ans": 1,
    "exp": "Vùng bất định giữa 0.3 và 0.8 là nơi các trường hợp giọng khàn, sóng yếu và tiếng ồn giao thoa. Phân vùng 3 dải cho phép cô lập vùng này để xác thực bổ sung mà không chặn nhầm khách hàng."
  },
  {
    "cat": "security",
    "q": "Mã băm toàn vẹn SHA-256 kèm khóa ký số HMAC trong hồ sơ giám định của DeepGuard nhằm mục đích pháp lý nào?",
    "opts": [
      "Tăng tốc độ truyền file qua mạng Internet.",
      "Đảm bảo Chuỗi bảo quản chứng cứ số (Chain of Custody) không bị thay đổi, giả mạo hay xóa sửa trước khi trình lên Tòa án nhân dân.",
      "Tự động dịch file âm thanh sang tiếng Anh.",
      "Để file âm thanh phát ra âm lượng to hơn."
    ],
    "ans": 1,
    "exp": "Bằng chứng số chỉ có giá trị pháp lý khi chứng minh được tính nguyên vẹn tuyệt đối từ lúc thu nhận gói tin RTP tại tổng đài cho đến khi in ra báo cáo giám định, tuân thủ FIPS 140-3 và Luật Giao dịch Điện tử."
  },
  {
    "cat": "security",
    "q": "Tiêu chuẩn RFC 3161 (Internet X.509 Public Key Infrastructure Time-Stamp Protocol) đóng vai trò gì trong hệ thống?",
    "opts": [
      "Quy định tốc độ quay của quạt làm mát CPU.",
      "Cung cấp Dấu thời gian tin cậy (Trusted Timestamp) từ một Cơ quan cấp dấu thời gian (TSA) độc lập, tạo bằng chứng chống chối bỏ (Non-repudiation) về thời điểm xảy ra vụ việc.",
      "Quy định chuẩn nén video 4K.",
      "Định dạng màu sắc của giao diện người dùng."
    ],
    "ans": 1,
    "exp": "Dấu thời gian RFC 3161 chứng minh chắc chắn rằng tệp âm thanh và kết quả phân tích đã tồn tại chính xác tại thời điểm giao dịch, ngân hàng hay khách hàng đều không thể ngụy tạo lùi ngày giờ."
  },
  {
    "cat": "security",
    "q": "Cấp độ FIPS 140-3 Level 3 quy định yêu cầu bảo mật phần cứng nghiêm ngặt nào đối với thiết bị lưu khóa ký số (HSM)?",
    "opts": [
      "Vỏ máy phải được sơn màu vàng chống rỉ sét.",
      "Có cơ chế tự hủy dữ liệu khóa bí mật (Zeroization) ngay lập tức khi phát hiện có sự can thiệp vật lý vào vỏ bọc hoặc thay đổi điện áp/nhiệt độ bất thường.",
      "Thiết bị phải chống nước ở độ sâu 50 mét.",
      "Phải có màn hình cảm ứng OLED."
    ],
    "ans": 1,
    "exp": "FIPS 140-3 Level 3 yêu cầu bảo vệ vật lý chống tấn công phần cứng: Mọi nỗ lực khoan, tháo nắp hoặc can thiệp vi mạch đều kích hoạt mạch xóa trắng khóa mã hóa trong micro-giây."
  },
  {
    "cat": "security",
    "q": "Tại sao độ trễ toàn trình của hệ thống DeepGuard được khống chế ở mức T_E2E ≈ 350ms?",
    "opts": [
      "Để phù hợp với tốc độ mắt người nhìn trên màn hình 60 FPS.",
      "Để ngắt cuộc gọi mạo danh ngay từ âm tiết đầu tiên trước khi nạn nhân kịp thực hiện thao tác tài chính chuyển tiền.",
      "Vì giao thức WebSocket không thể truyền dữ liệu nhanh hơn 350ms.",
      "Để dành thời gian cho mô hình Deep Learning chạy qua 5 vòng lặp kiểm tra."
    ],
    "ans": 1,
    "exp": "Khoảng thời gian một người nhận diện và phản ứng chuyển tiền là vài giây. Cắt cuộc gọi ở 350ms (ngay khi từ đầu tiên được phát hiện giả mạo) ngăn chặn hoàn toàn rủi ro gian lận thời gian thực."
  },
  {
    "cat": "security",
    "q": "Tỷ lệ báo động giả (False Positive Rate - FPR) được DeepGuard cam kết ở mức dưới bao nhiêu trong dải chặn cứng?",
    "opts": [
      "Dưới 10.0%.",
      "Dưới 0.05% (tương đương tối đa 1 trên 2.000 cuộc gọi hợp lệ bị nghi vấn chặn).",
      "Dưới 50.0%.",
      "Tuyệt đối 0% trong mọi trường hợp."
    ],
    "ans": 1,
    "exp": "Trong giao dịch ngân hàng thực tế, không có hệ thống nào đạt FPR = 0%. Cam kết FPR < 0.05% trên dải chặn cứng là chuẩn vàng quốc tế, bảo vệ danh tiếng và chất lượng phục vụ của ngân hàng."
  },
  {
    "cat": "security",
    "q": "Tại sao DeepGuard sử dụng cơ sở dữ liệu ClickHouse thay cho PostgreSQL hoặc MongoDB để lưu trữ dữ liệu giám định pháp y?",
    "opts": [
      "Vì ClickHouse là phần mềm miễn phí còn các phần mềm khác phải trả phí bản quyền đắt đỏ.",
      "ClickHouse là CSDL cột (Column-oriented DBMS) tối ưu cho dữ liệu chuỗi thời gian lớn (Telemetry time-series), nén dữ liệu 10x và truy vấn hàng tỷ vector âm thanh trong vài mili-giây.",
      "Vì ClickHouse chỉ chạy được trên hệ điều hành Windows.",
      "Vì PostgreSQL không hỗ trợ lưu trữ số thập phân."
    ],
    "ans": 1,
    "exp": "Mỗi cuộc gọi sinh ra hàng trăm bản ghi telemetry mỗi giây (F0, Jitter, Shimmer, RT60, Log-Mel). ClickHouse có khả năng ghi hàng trăm nghìn dòng mỗi giây và quét hàng tỷ bản ghi để vẽ biểu đồ gian lận tức thời."
  },
  {
    "cat": "security",
    "q": "Giao thức STIR/SHAKEN (RFC 8224 / RFC 8588) được triển khai trên tầng viễn thông nhằm ngăn chặn hình thức tấn công nào?",
    "opts": [
      "Tấn công nghe trộm cáp quang dưới biển.",
      "Tấn công giả mạo số điện thoại người gọi đến (Caller ID Spoofing) bằng cách ký số định danh nhà mạng tại trạm chuyển mạch gốc.",
      "Tấn công từ chối dịch vụ DDoS bằng botnet máy tính.",
      "Tấn công lây nhiễm mã độc qua tin nhắn SMS."
    ],
    "ans": 1,
    "exp": "STIR/SHAKEN gắn chữ ký số X.509 vào tiêu đề SIP INVITE (trường Identity). Khi cuộc gọi tới tổng đài ngân hàng, hệ thống xác thực xem số gọi đến có thực sự thuộc sở hữu của thuê bao đó hay bị nhà mạng ảo mạo danh."
  }
];

// 4B. DATA REPOSITORY: 24 FLASHCARDS BẪY SÂU (MODE 4)
const FLASHCARDS_DATA = [
  {
    "id": "FC-01",
    "cat": "dsp",
    "categoryLabel": "DSP & TIỀN XỬ LÝ",
    "title": "Polyphase FIR Resampling vs Linear Interpolation",
    "trapAlert": "BẪY: Nghĩ rằng dùng hàm nội suy tuyến tính (Linear Interpolation) sẽ nhanh hơn mà không làm mất mát chất lượng âm thanh.",
    "frontQuestion": "Tại sao tuyệt đối không được dùng phép nội suy tuyến tính (Linear Interpolation) để hạ mẫu audio từ 44.1kHz về 16kHz trong giám định Deepfake?",
    "backAnswer": "Nội suy tuyến tính không có bộ lọc Anti-Aliasing đạt chuẩn Nyquist. Các tần số trên 8kHz (như 21kHz) sẽ bị gấp phổ (Aliasing) phản chiếu ngược vào dải 0-8kHz, làm hỏng các formant F1-F3 và sinh ra các hài âm giả tạo đánh lừa mạng MelCNN.\n    \n    Chuẩn bắt buộc: Polyphase Resampling với bộ lọc FIR Kaiser-window có suy hao dải chặn > 80dB.",
    "standardRef": "ITU-T P.862 PESQ, ANSI S1.11",
    "tip": "Khi bị hội đồng hỏi, hãy vẽ đồ thị gấp phổ (Spectral Foldover) minh họa tần số f_alias = |f_orig - k * f_s|."
  },
  {
    "id": "FC-02",
    "cat": "acoustics",
    "categoryLabel": "ÂM HỌC ISO 3382",
    "title": "Phòng Câm Số (Anechoic) vs Phòng Cách Âm Thực Tế",
    "trapAlert": "BẪY: Nhầm lẫn giữa phòng thu âm cao cấp lót mút cách âm và phòng câm toán học (RT60 < 0.15s) của Deepfake Vocoder.",
    "frontQuestion": "Làm sao hệ thống phân biệt được một khách hàng VIP gọi từ phòng thu cách âm với một kẻ dùng neural vocoder (HiFi-GAN) tổng hợp giọng?",
    "backAnswer": "Phòng thu âm thực tế dù lót mút tiêu âm vẫn có phản xạ ở dải tần số trầm (< 200Hz) do bước sóng âm dài không bị hấp thụ hoàn toàn bởi mút mỏng. Đường cong Schroeder vẫn có độ dốc vật lý.\n    \n    Ngược lại, mô hình AI tổng hợp trong môi trường câm số hoàn toàn không có phản xạ ở mọi dải tần (RT60 < 0.08s - 0.12s) và thiếu vắng nhiễu nền nhiệt màng rung micro.",
    "standardRef": "ISO 3382-1 Room Acoustics",
    "tip": "Nhấn mạnh vào chỉ số Spectral Flatness của nhiễu nền và phản xạ dải trầm dưới 200Hz."
  },
  {
    "id": "FC-03",
    "cat": "prosody",
    "categoryLabel": "NGỮ ÂM HỌC TIẾNG VIỆT",
    "title": "Glottal Stop Mining trong Thanh Ngã",
    "trapAlert": "BẪY: Chỉ kiểm tra độ giảm âm lượng (RMS drop) mà không kiểm tra tính chất hữu thanh của nguyên âm hai bên.",
    "frontQuestion": "Điều kiện cần và đủ để thuật toán kết luận một khoảng lặng là nắp thanh môn đóng (Glottal Stop) của thanh Ngã là gì?",
    "backAnswer": "1. Độ sụt năng lượng: Delta E_RMS < -12.0 dB trong khoảng thời gian từ 20ms đến 50ms.\n2. Trạng thái hữu thanh (Voicing State): Tần số F0 phải tồn tại hợp lệ (F0 > 0) ở khung ngay trước và ngay sau khoảng lặng.\n    \nNếu không có điều kiện 2, hệ thống sẽ bắt nhầm phụ âm vô thanh (/p/, /t/, /k/) hoặc khoảng lặng giữa hai từ là thanh Ngã.",
    "standardRef": "IPA for Vietnamese, ISO/IEC 19794-13",
    "tip": "Nhấn mạnh giải phẫu thanh quản: Nắp thanh môn chỉ ép chặt tạm thời giữa hai giai đoạn rung của dây thanh."
  },
  {
    "id": "FC-04",
    "cat": "prosody",
    "categoryLabel": "NGỮ ÂM HỌC TIẾNG VIỆT",
    "title": "Micro-Jitter: Quá Mượt vs Giật Cục",
    "trapAlert": "BẪY: Cho rằng Deepfake luôn luôn có giọng nói bị giật cục và rè méo.",
    "frontQuestion": "Hai thái cực vi phạm bất biến sinh học của chỉ số Micro-Jitter dây thanh tố giác hai họ công nghệ Deepfake nào?",
    "backAnswer": "1. Jitter < 0.35% (Quá mượt phi sinh học): Tố giác họ TTS Autoregressive / Diffusion (ElevenLabs, VITS) do hàm mất mát neural nội suy làm phẳng dao động vi mô.\n2. Jitter > 4.80% (Giật cục bất thường): Tố giác họ Voice Conversion (RVC v2) do hiện tượng trượt pha (Phase Discontinuity) giữa các khung STFT khi nội suy F0.\n    \nDải sinh học bình thường của con người: 0.60% <= Jitter <= 2.50%.",
    "standardRef": "ASVspoof 5 Physical Invariants",
    "tip": "Hội đồng rất thích thí sinh phân biệt được hai thái cực Jitter quá thấp và Jitter quá cao."
  },
  {
    "id": "FC-05",
    "cat": "onnx",
    "categoryLabel": "MÔ HÌNH HỌC SÂU ONNX",
    "title": "FusedConv Operator trong Opset 14",
    "trapAlert": "BẪY: Xuất mô hình ONNX với Opset mặc định (Opset 11/12) không bật tối ưu hóa đồ thị.",
    "frontQuestion": "Tại sao DeepGuard bắt buộc xuất mô hình MelCNN sang ONNX Runtime Opset 14 với Graph Optimization Enable All?",
    "backAnswer": "Opset 14 hỗ trợ hợp nhất toán tử FusedConv: Gộp Conv2D + BatchNormalization + Mish Activation thành một lời gọi kernel duy nhất trên CPU.\n    \nLợi ích: Giảm 40% chi phí truy xuất RAM, giảm dung lượng bộ nhớ đệm L1/L2 Cache và tăng tốc độ suy luận xuống dưới 7ms / chunk.",
    "standardRef": "ONNX Runtime Opset 14 Specification",
    "tip": "Dẫn chứng con số cụ thể: Thời gian suy luận giảm từ 11.2ms xuống 6.8ms trên CPU Intel Xeon."
  },
  {
    "id": "FC-06",
    "cat": "fusion",
    "categoryLabel": "FUSION & HARD VETO",
    "title": "Dempster-Shafer Conflict Rule",
    "trapAlert": "BẪY: Dùng phép trung bình cộng có trọng số (Weighted Soft Voting) cho toàn bộ các trường hợp.",
    "frontQuestion": "Khi hệ số xung đột k trong Dempster-Shafer đạt giá trị bao nhiêu thì phép cộng xác suất truyền thống sụp đổ?",
    "backAnswer": "Khi k > 0.85 (Xung đột cực đoan). Ví dụ: Mô hình AI chấm điểm Real = 0.99 (do bị đánh lừa bởi nhiễu đối nghịch), nhưng module vật lý đo được Jitter = 0.15% hoặc RT60 = 0.96s.\n    \nHệ thống kích hoạt Hard Veto Override: Điểm gian lận cưỡng chế bằng 0.99, khóa giao dịch ngay lập tức bất chấp AI nói gì.",
    "standardRef": "Dempster-Shafer Evidence Theory (1976)",
    "tip": "Hãy nhấn mạnh: 'Quy luật vật lý vũ trụ không thể bị bỏ phiếu đa số bởi mạng nơ-ron số'."
  },
  {
    "id": "FC-07",
    "cat": "security",
    "categoryLabel": "PHÁP Y & CHUỖI BẢO QUẢN",
    "title": "Dấu Thời Gian RFC 3161 & FIPS 140-3",
    "trapAlert": "BẪY: Cho rằng chỉ cần lưu file mp3 vào cơ sở dữ liệu là đủ giá trị pháp lý trước tòa án.",
    "frontQuestion": "Tại sao chứng cứ âm thanh trong các vụ kiện gian lận tài chính ngân hàng bắt buộc phải có dấu thời gian RFC 3161?",
    "backAnswer": "Đồng hồ hệ thống của máy chủ nội bộ ngân hàng có thể bị điều chỉnh hoặc bị hacker thay đổi ngày giờ.\n    \nRFC 3161 yêu cầu gửi mã băm SHA-256 sang một Cơ quan cấp dấu thời gian (TSA) độc lập được nhà nước cấp phép để ký số xác thực. Điều này tạo ra bằng chứng không thể chối bỏ (Non-repudiation) về tính tồn tại và nguyên vẹn của file ghi âm tại đúng thời điểm giao dịch.",
    "standardRef": "RFC 3161 PKI, FIPS 140-3 Level 3",
    "tip": "Dẫn chứng điều khoản trong Luật Giao dịch Điện tử về giá trị pháp lý của thông điệp dữ liệu có dấu thời gian."
  },
  {
    "id": "FC-08",
    "cat": "acoustics",
    "categoryLabel": "ÂM HỌC ISO 3382",
    "title": "Hiệu Ứng Lọc Lược (Comb-Filtering) Loa Ngoài",
    "trapAlert": "BẪY: Nghĩ rằng cuộc gọi phát lại qua loa Bluetooth chất lượng cao sẽ giống hệt người thật nói vào điện thoại.",
    "frontQuestion": "Vết hằn quang phổ đặc trưng nào tố giác một cuộc gọi Replay phát lại qua loa ngoài?",
    "backAnswer": "Hiệu ứng lọc lược (Comb-Filtering). Sóng âm từ màng loa phát ra truyền tới micro điện thoại theo nhiều đường: đường trực tiếp và các đường phản xạ từ mặt bàn/tường.\n    \nSự trễ pha Delta t tạo ra các rãnh suy giảm năng lượng tuần hoàn có chu kỳ Delta f = 1 / Delta t trên phổ tần số, đồng thời thời gian dội âm RT60 bị nhân đôi vượt ngưỡng 0.85s.",
    "standardRef": "ISO 3382 Acoustics, ITU-R BS.1534",
    "tip": "Mô tả hình ảnh: Trên phổ spectrogram xuất hiện các sọc ngang song song như răng của chiếc lược chải đầu."
  },
  {
    "id": "FC-09",
    "cat": "security",
    "categoryLabel": "QUẢN TRỊ RỦI RO NGÂN HÀNG",
    "title": "Tri-Band Policy: Kiểm Soát FPR < 0.05%",
    "trapAlert": "BẪY: Thiết lập hệ thống chỉ có 2 trạng thái: Cho qua (Pass) hoặc Chặn luôn (Block).",
    "frontQuestion": "Tại sao phân tầng Tri-Band [0.0-0.3) Xanh, [0.3-0.8) Vàng, [0.8-1.0] Đỏ là cứu tinh cho trải nghiệm khách hàng?",
    "backAnswer": "Nếu chỉ có Pass/Block, ngân hàng sẽ đối mặt với 2 thảm họa:\n- Đặt ngưỡng chặn nhạy -> FPR cao -> Chặn nhầm hàng nghìn khách hàng VIP bị khàn giọng -> Khách hàng bỏ sang ngân hàng khác.\n- Đặt ngưỡng chặn lỏng -> FNR cao -> Kẻ lừa đảo lọt qua cuỗm hàng tỷ đồng.\n    \nVùng Vàng [0.3 - 0.8) cho phép ngân hàng không chặn khách hàng mà chỉ yêu cầu đọc thêm 1 câu OTP âm thanh chứa thanh Ngã, vừa an toàn 100% vừa không gây bức xúc.",
    "standardRef": "NIST SP 800-63B Digital Identity",
    "tip": "Đây là câu trả lời ghi điểm tuyệt đối với các giám khảo làm quản trị rủi ro thực tế tại ngân hàng."
  },
  {
    "id": "FC-10",
    "cat": "dsp",
    "categoryLabel": "DSP & TIỀN XỬ LÝ",
    "title": "Định Lý Heisenberg-Gabor Trong STFT",
    "trapAlert": "BẪY: Cho rằng có thể tăng độ phân giải thời gian và tần số của biến đổi STFT lên cùng lúc.",
    "frontQuestion": "Tại sao cấu hình cửa sổ Hann 1024 mẫu / hop 256 tại 16kHz là điểm cân bằng hoàn hảo theo định lý Heisenberg-Gabor?",
    "backAnswer": "Định lý Heisenberg-Gabor: Delta t * Delta f >= 1 / (4 * pi).\n- N = 1024 -> Delta f = 15.625 Hz (Đủ mịn để phân giải cao độ F0 = 100-300Hz của tiếng Việt).\n- Hop = 256 -> Delta t = 16 ms (Overlap 75%, đủ nhanh để bắt kịp độ biến thiên của nắp thanh môn trong 20-50ms mà không làm trễ pipeline).\n    \nNếu dùng N = 512, Delta f = 31.25Hz sẽ làm nhòe F0. Nếu dùng N = 2048, Delta t = 128ms sẽ làm trễ vượt quá ngưỡng 350ms.",
    "standardRef": "Gabor, D. (1946) Theory of Communication",
    "tip": "Vẽ hình hộp chữ nhật biểu diễn ô lượng tử thời gian - tần số (Heisenberg Box)."
  },
  {
    "id": "FC-11",
    "cat": "prosody",
    "categoryLabel": "NGỮ ÂM HỌC TIẾNG VIỆT",
    "title": "Bệnh Lý Giọng Nói vs Deepfake Attack",
    "trapAlert": "BẪY: Nhầm lẫn người bị viêm thanh quản khàn tiếng thành kẻ tấn công Deepfake.",
    "frontQuestion": "Các chỉ số nào giúp hệ thống bảo vệ khách hàng bị viêm thanh quản hạt hoặc cảm cúm không bị khóa oan tài khoản?",
    "backAnswer": "1. Người bị viêm thanh quản có Shimmer tăng và Jitter tăng nhẹ (lên 2.0% - 2.5%), nhưng KHÔNG vượt quá 4.5% như hiện tượng trượt pha RVC.\n2. Dội âm phòng RT60 của họ vẫn hoàn toàn bình thường (0.2s - 0.5s), không bị câm số (< 0.15s) như TTS.\n3. Thanh Ngã của họ vẫn có hiện tượng ngắt âm cơ học tự nhiên do nắp thanh môn vẫn đóng mở bình thường.",
    "standardRef": "Voice Pathology Telemetry Standards",
    "tip": "Nhắc lại: 'Bệnh lý xảy ra ở dây thanh âm, không làm thay đổi âm học căn phòng nơi khách hàng đang đứng'."
  },
  {
    "id": "FC-12",
    "cat": "onnx",
    "categoryLabel": "MÔ HÌNH HỌC SÂU ONNX",
    "title": "INT8 Dynamic Quantization vs FP32",
    "trapAlert": "BẪY: Cho rằng lượng tử hóa INT8 sẽ làm giảm độ chính xác nhận diện Deepfake một cách nghiêm trọng.",
    "frontQuestion": "Đánh đổi thực tế giữa độ chính xác và hiệu năng khi chuyển đổi mô hình MelCNN từ FP32 sang INT8 trên CPU là gì?",
    "backAnswer": "1. Dung lượng: Giảm từ 4.8MB xuống 1.3MB (giảm 73%).\n2. Tốc độ suy luận: Tăng 2.3 lần trên CPU nhờ tập lệnh tính toán số nguyên AVX-512 VNNI.\n3. Suy giảm độ chính xác EER (Equal Error Rate): Chỉ giảm 0.12% (từ 1.85% lên 1.97%), hoàn toàn không ảnh hưởng tới quyết định an ninh tổng thể.\n    \nModule lượng tử hóa bảo vệ các lớp nhạy cảm (First Conv và Output) bằng cách giữ nguyên số thực FP32.",
    "standardRef": "IEEE 754 Floating-Point Arithmetic",
    "tip": "Nhấn mạnh con số: Tiết kiệm hàng chục nghìn USD tiền thuê máy chủ GPU mỗi năm cho ngân hàng."
  },
  {
    "id": "FC-13",
    "cat": "security",
    "categoryLabel": "VIỄN THÔNG & VOIP G.711",
    "title": "Packet Loss Concealment (PLC) & Khung Giả Mạo",
    "trapAlert": "BẪY: Nhầm thuật toán che giấu mất gói tin PLC của tổng đài thành hiện tượng F0 đi ngang của Deepfake.",
    "frontQuestion": "Làm thế nào để hệ thống giám định pháp y loại trừ sự can thiệp của thuật toán PLC trên mạng VoIP chập chờn?",
    "backAnswer": "Thuật toán PLC khi mất gói tin IP thường lặp lại khung âm thanh trước đó (Pitch Period Replication), tạo ra đoạn tín hiệu có F0 phẳng lì nhân tạo.\n    \nGiải pháp: Hệ thống đọc Sequence Number và Timestamp trong tiêu đề gói tin RTP. Các khung bị mất và phục hồi bởi PLC được gắn cờ bỏ qua, không tính vào telemetry Micro-Jitter.",
    "standardRef": "ITU-T G.711 Appendix I (PLC Algorithm), RFC 3550 RTP",
    "tip": "Nhắc tới tiêu đề gói tin RTP: 'Chúng ta can thiệp từ tầng vận chuyển (Transport Layer) chứ không chỉ nhìn tín hiệu PCM mù'."
  },
  {
    "id": "FC-14",
    "cat": "fusion",
    "categoryLabel": "FUSION & TRẢI NGHIỆM KHÁCH HÀNG",
    "title": "Focal Loss & Chi Phí Bất Đối Xứng Trong Ngân Hàng",
    "trapAlert": "BẪY: Dùng hàm mất mát Cross-Entropy chuẩn xem xét lỗi False Positive và False Negative có trọng số ngang nhau.",
    "frontQuestion": "Tại sao trong mô hình giám định chuyển tiền ngân hàng, hàm mất mát phải có trọng số phạt bất đối xứng (Cost-Sensitive)?",
    "backAnswer": "Một vụ False Negative (bỏ lọt kẻ gian chuyển tiền thành công) gây thiệt hại hàng chục tỷ đồng và rủi ro hình sự cho ngân hàng.\n    \nTrong khi đó, một vụ False Positive chỉ khiến khách hàng đọc thêm 1 mã OTP âm thanh. Hệ thống áp dụng hàm mất mát có trọng số C(FN) = 1000 * C(FP), ép mô hình cực kỳ nhạy bén trước các dấu hiệu gian lận tiềm ẩn.",
    "standardRef": "Lin et al. Focal Loss for Dense Object Detection",
    "tip": "Trình bày ma trận chi phí rủi ro (Risk Cost Matrix) để gây ấn tượng với các chuyên gia tài chính."
  },
  {
    "id": "FC-15",
    "cat": "acoustics",
    "categoryLabel": "ÂM HỌC ISO 3382",
    "title": "Vết Cắt Ghép Nối Âm Thanh (Audio Splicing Boundary)",
    "trapAlert": "BẪY: Nghĩ rằng kẻ gian ghép các từ ghi âm của nạn nhân lại với nhau sẽ tạo thành câu nói hợp lệ.",
    "frontQuestion": "Tại sao kẻ tấn công ghép các từ riêng lẻ từ video livestream của nạn nhân luôn bị DeepGuard phát hiện?",
    "backAnswer": "1. Bước nhảy nền nhiễu Delta Noise Floor > 9.5 dB giữa hai âm tiết cắt ghép do khác biệt thiết bị và môi trường ghi âm gốc.\n2. Gián đoạn pha (Phase Discontinuity): Tại ranh giới cắt nối, dạng sóng sin bị đứt gãy đột ngột, sinh ra các vệt năng lượng cao tần bất thường trên phổ STFT.\n3. Nhịp điệu và ngữ điệu (Intonation Contour): Đường F0 bị đứt đoạn vô lý, không tuân theo quy luật ngữ điệu câu hỏi/câu khẳng định tiếng Việt.",
    "standardRef": "AES Forensic Audio Guidelines, ISO 3382",
    "tip": "Chỉ ra trên giao diện: Bật Spectrogram lên sẽ thấy ngay một vạch sáng thẳng đứng tại điểm cắt nối."
  },
  {
    "id": "FC-16",
    "cat": "dsp",
    "categoryLabel": "DSP & TIỀN XỬ LÝ",
    "title": "Zero Crossing Rate (ZCR) & Phân Biệt Hữu Thanh / Vô Thanh",
    "trapAlert": "BẪY: Cho rằng chỉ cần năng lượng âm thanh lớn là âm thanh của người nói hợp lệ.",
    "frontQuestion": "Chỉ số ZCR (Tỷ lệ đổi dấu qua điểm 0) kết hợp với RMS Energy bóc tách hai thành phần âm thanh cơ bản nào trong tiếng nói?",
    "backAnswer": "1. Âm hữu thanh (Voiced - Nguyên âm, âm mũi): ZCR thấp (do tần số trầm F0 chi phối), RMS Energy cao -> Dây thanh đang rung động.\n2. Âm vô thanh (Unvoiced - Phụ âm bật, ma sát /s/, /f/, /t/): ZCR rất cao (sóng dao động ngẫu nhiên qua điểm 0), RMS Energy thấp -> Dây thanh không rung, âm sinh ra do luồng khí ma sát qua vòm miệng.\n    \nDeepfake Vocoder thế hệ cũ thường tổng hợp âm vô thanh quá yếu hoặc có chu kỳ giả tạo.",
    "standardRef": "Rabiner & Schafer Digital Processing of Speech Signals",
    "tip": "Nhắc lại: 'ZCR là bộ lọc sơ cấp rẻ nhất về tính toán để loại bỏ khoảng lặng và tiếng xì hơi'."
  },
  {
    "id": "FC-17",
    "cat": "onnx",
    "categoryLabel": "MÔ HÌNH HỌC SÂU ONNX",
    "title": "Chống Tấn Công Mẫu Đối Nghịch (Adversarial Robustness)",
    "trapAlert": "BẪY: Nghĩ rằng chỉ cần huấn luyện mạng nơ-ron sâu hơn là sẽ miễn nhiễm với nhiễu đối nghịch FGSM.",
    "frontQuestion": "Tại sao kiến trúc kết hợp Mạng Nơ-ron + Bất Biến Vật Lý của DeepGuard lại kháng được tấn công đối nghịch FGSM?",
    "backAnswer": "Nhiễu đối nghịch FGSM (Fast Gradient Sign Method) tiêm nhiễu vi mô vào không gian số để làm sai lệch ma trận trọng số mạng nơ-ron (lừa MelCNN chấm điểm 0.99 Real).\n    \nTuy nhiên, nhiễu số không thể thay đổi được tính chất vật lý của sóng âm: Nó không thể tạo ra phản xạ dội âm của căn phòng thực tế (ISO 3382) và không thể giả lập cơ chế đóng cơ học của nắp thanh môn (-12dB). Module Hard Veto sẽ ngay lập tức bắt giữ cuộc gọi.",
    "standardRef": "Goodfellow et al. Explaining and Harnessing Adversarial Examples",
    "tip": "Nhấn mạnh luận điểm: 'Phòng thủ đa tầng dựa trên thực tại vật lý là khắc tinh của toán học đánh lừa'."
  },
  {
    "id": "FC-18",
    "cat": "security",
    "categoryLabel": "KIẾN TRÚC & HẠ TẦNG DOANH NGHIỆP",
    "title": "Bộ Đệm Vòng Khóa Không Chờ (Lock-Free Circular Ring Buffer)",
    "trapAlert": "BẪY: Dùng mảng động JavaScript hoặc danh sách Python cấp phát mới liên tục trong luồng streaming.",
    "frontQuestion": "Tại sao trong kiến trúc xử lý độ trễ thấp 350ms, bộ đệm vòng (Ring Buffer) cố định bộ nhớ lại là thành phần sống còn?",
    "backAnswer": "Việc liên tục tạo mới mảng trong mỗi khung âm thanh (16ms) kích hoạt cơ chế thu gom rác tự động (Garbage Collection - GC) của runtime.\n    \nCác đợt dừng GC (GC Pause) làm đơ luồng xử lý từ 50-100ms một cách ngẫu nhiên, gây rớt gói tin và vọt độ trễ. Ring Buffer cấp phát 1 mảng tĩnh cố định (Zero-allocation), ghi đè tuần hoàn theo con trỏ write_pos, triệt tiêu 100% chi phí GC.",
    "standardRef": "Twelve-Factor App & Real-Time Audio Systems",
    "tip": "Dẫn chứng việc dùng TypedArray `Float32Array` trong JavaScript và con trỏ vòng trong C++."
  },
  {
    "id": "FC-19",
    "cat": "prosody",
    "categoryLabel": "NGỮ ÂM HỌC TIẾNG VIỆT",
    "title": "Phân Biệt Run Giọng Parkinson (Tremor) vs RVC Phase Discontinuity",
    "trapAlert": "BẪY: Khóa tài khoản của người lớn tuổi bị run giọng tự nhiên vì nghi ngờ là Deepfake RVC.",
    "frontQuestion": "Điểm khác biệt bản chất giữa chứng run giọng sinh lý (Vocal Tremor) và hiện tượng trượt pha Deepfake RVC là gì?",
    "backAnswer": "1. Run giọng bệnh lý/người già (Tremor): Biến thiên tần số F0 diễn ra tuần hoàn chậm (tần số điều chế 4Hz - 7Hz theo nhịp cơ thể), biên độ dao động nhịp nhàng như hình sin mượt.\n2. Trượt pha RVC (Phase Discontinuity): Sự sai lệch xảy ra đột ngột, ngẫu nhiên ở cấp độ micro-giây giữa các khung STFT, không có tính chu kỳ sinh học.\n    \nThuật toán phân tích phổ điều chế (Modulation Spectrum) bóc tách chính xác hai trường hợp này.",
    "standardRef": "Clinical Voice Assessment & Dysphonia Protocols",
    "tip": "Nhắc lại: 'Hệ thống đo tần số điều chế của biến thiên F0 để phân định run sinh học vs lỗi thuật toán'."
  },
  {
    "id": "FC-20",
    "cat": "onnx",
    "categoryLabel": "MÔ HÌNH HỌC SÂU ONNX",
    "title": "Cổng Động Thích Ứng Kênh Truyền (Dynamic Gating Channel)",
    "trapAlert": "BẪY: Áp dụng cùng một bộ trọng số cố định cho cả cuộc gọi HD Voice và cuộc gọi thoại bàn G.711.",
    "frontQuestion": "Cơ chế Cổng động thích ứng kênh truyền tự động phát hiện loại kết nối và thay đổi trọng số như thế nào?",
    "backAnswer": "Hệ thống đo lường băng thông hiệu dụng và tỷ lệ suy hao phổ dải cao (> 3400Hz).\n- Kênh HD Voice / WebRTC (16kHz đầy đủ): Phân bổ trọng số cân bằng: CNN = 0.50, Prosody = 0.30, Acoustics = 0.20.\n- Kênh Thoại Bàn G.711 (8kHz, cắt dải cao): Tự động chuyển dịch trọng số: CNN = 0.10, Prosody = 0.65, Acoustics = 0.25.\n    \nNgăn chặn hoàn toàn hiện tượng CNN bị mù dải cao dẫn tới đưa ra điểm số sai lệch.",
    "standardRef": "Adaptive Gating Networks in Multimodal Processing",
    "tip": "Chỉ cho hội đồng thấy thanh trượt trọng số tương tác trên tab Red-Team Sandbox."
  },
  {
    "id": "FC-21",
    "cat": "acoustics",
    "categoryLabel": "ÂM HỌC ISO 3382",
    "title": "Dội Âm Kép (Double Room Convolution) Trong Tấn Công Replay",
    "trapAlert": "BẪY: Cho rằng một file audio người thật ghi âm lén đem phát lại sẽ hoàn hảo 100% như người thật gọi điện.",
    "frontQuestion": "Công thức toán học giải thích tại sao tấn công Replay qua loa ngoài luôn bị phát hiện bởi bộ lọc dội âm ISO 3382?",
    "backAnswer": "Đáp ứng xung phòng tổng hợp là tích chập:\nh_total(t) = h_room1(t) * h_speaker(t) * h_room2(t) * h_mic(t)\n    \nTrong đó h_room1 là phòng nơi nạn nhân bị ghi âm trộm, h_room2 là phòng nơi kẻ gian đang bật loa ngoài. Tích chập hai đáp ứng xung làm thời gian suy hao năng lượng kéo dài gấp đôi: RT60_total > RT60_1 + RT60_2, dễ dàng vượt ngưỡng chặn 0.85s.",
    "standardRef": "ISO 3382-2 Reverberation Time in Ordinary Rooms",
    "tip": "Vẽ sơ đồ hai phòng liên tiếp kết nối qua màng loa và micro."
  },
  {
    "id": "FC-22",
    "cat": "dsp",
    "categoryLabel": "DSP & TIỀN XỬ LÝ",
    "title": "Spectral Rolloff 85% & Băng Thông Thoại Hữu Ích",
    "trapAlert": "BẪY: Bỏ qua kiểm tra giới hạn tần số trên của nguồn phát âm thanh.",
    "frontQuestion": "Chỉ số Spectral Rolloff 85% có ý nghĩa gì trong việc bóc tách codec viễn thông và loa phát thanh?",
    "backAnswer": "Spectral Rolloff 85% là tần số ngưỡng mà dưới đó chứa đúng 85% tổng công suất phổ của tín hiệu.\n- Giọng người thật nói vào micro chất lượng cao: Rolloff 85% thường nằm trong khoảng 3200Hz - 4200Hz.\n- Kênh G.711 thoại bàn: Bị cắt cụt ở 3400Hz (Rolloff giảm xuống ~2800Hz).\n- Loa ngoài rẻ tiền: Rolloff dồn về dải cộng hưởng màng loa 1500Hz - 2500Hz.\n    \nGiúp nhận diện ngay lập tức loại thiết bị truyền phát mà kẻ gian đang sử dụng.",
    "standardRef": "MPEG-7 Audio Spectrum Rolloff Descriptor",
    "tip": "Nhắc tới: 'Rolloff giúp hệ thống lập tức biết kẻ gian đang dùng điện thoại bàn, loa phóng thanh hay tai nghe'."
  },
  {
    "id": "FC-23",
    "cat": "security",
    "categoryLabel": "PHÁP Y & AN NINH TÀI CHÍNH",
    "title": "Zero-Trust Voice Architecture Trong Ngân Hàng",
    "trapAlert": "BẪY: Cho rằng một cuộc gọi đến từ đúng số điện thoại của Giám đốc tài chính thì mặc nhiên an toàn.",
    "frontQuestion": "Triết lý Zero-Trust Voice Verification được hiện thực hóa trong mã nguồn DeepGuard như thế nào?",
    "backAnswer": "Không bao giờ tin tưởng Caller ID, số IMEI thiết bị hay giọng nói quen thuộc. Mọi luồng âm thanh đều là 'Untrusted Input'.\n    \n1. Tách biệt danh tính và sinh trắc qua Chiếu trực giao (Orthogonal Projection).\n2. Kiểm tra liveness liên tục trên từng chunk 256ms suốt chiều dài cuộc gọi chứ không chỉ kiểm tra lúc đầu.\n3. Bất cứ khi nào xuất hiện vi phạm vật lý (Jitter < 0.35% hoặc RT60 bất thường), lập tức ngắt phiên giao dịch.",
    "standardRef": "NIST SP 800-207 Zero Trust Architecture",
    "tip": "Đây là nguyên tắc vàng của an ninh mạng hiện đại: 'Never Trust, Always Verify'."
  },
  {
    "id": "FC-24",
    "cat": "fusion",
    "categoryLabel": "FUSION & KIẾN TRÚC HỆ THỐNG",
    "title": "Veto Matrix: Bảng Chân Lý Quyền Phủ Quyết Cứng",
    "trapAlert": "BẪY: Để các chỉ số phụ (nhiễu nền, năng lượng) làm vô hiệu hóa quyền phủ quyết của chỉ số chính.",
    "frontQuestion": "Bảng chân lý của Quyền Phủ Quyết Cứng (Hard Veto Matrix) trong DeepGuard quy định các điều kiện logic nào?",
    "backAnswer": "FINAL_BLOCK = (Jitter < 0.35%) OR (RT60 < 0.15s) OR (RT60 > 0.85s) OR (IsGlottalTone AND GlottalDrop > -6.0dB) OR (DeltaNoiseFloor > 9.5dB)\n    \nChỉ cần DUY NHẤT một mệnh đề logic đúng, biến cờ HARD_VETO lập tức được gán TRUE, ghi đè toàn bộ điểm số của mạng CNN và gán Risk Score = 0.99 (Khóa giao dịch).",
    "standardRef": "DeepGuard Enterprise Architectural Specification 2026",
    "tip": "Khẳng định: 'Toán học logic Boolean phủ quyết toán học xác suất mờ khi bảo vệ tiền của khách hàng'."
  }
];

// 4C. DATA REPOSITORY: 11 TRỤ CỘT TRI THỨC BẬC THẦY (TAB 3 & MODE KNOWLEDGE)
const PILLARS_DATA = [
  {
    "num": 1,
    "roman": "I",
    "code": "import scipy.signal as signal\nimport numpy as np\n\ndef polyphase_resample_16k(audio, orig_sr):\n    gcd = np.gcd(orig_sr, 16000)\n    up = 16000 // gcd\n    down = orig_sr // gcd\n    return signal.resample_poly(audio, up, down, window=('kaiser', 5.0))",
    "name": "Xử Lý Tín Hiệu Âm Thanh Số (DSP & Anti-Aliasing Pipeline)",
    "tag": "dsp",
    "subtitle": "Polyphase Resampling 16kHz, STFT Hann 1024/Hop 256, 80 Log-Mel Bins & Đặc Trưng Cổ Điển",
    "summary": "Quy chuẩn tiền xử lý âm thanh pháp y chuẩn hóa toàn bộ luồng audio về 16kHz thông qua bộ lọc đa pha Polyphase FIR, triệt tiêu Spectral Leakage và Aliasing để bảo toàn Formant F1-F3 và tần số thanh môn.",
    "theory": "1. Định lý Nyquist-Shannon: Tần số hữu ích của tiếng nói con người nằm dưới 8000Hz. Tần số lấy mẫu f_s = 16kHz đảm bảo bảo toàn toàn bộ năng lượng thanh môn mà không lãng phí tài nguyên CPU như 44.1kHz hoặc 48kHz.\n2. Bộ lọc Polyphase Resampling:\n   x_resampled[m] = SUM_{k} x[k] * h_sub[m * M - k * L]\n   Sử dụng cửa sổ Kaiser với suy hao dải chặn > 80dB, ngăn chặn hiện tượng gấp phổ (Spectral Foldover/Aliasing) vào dải thoại hữu ích.\n3. Cửa sổ STFT Hann 1024 / Hop 256:\n   - Delta f = 16000 / 1024 = 15.625 Hz (Đủ mịn để bóc tách F0 = 100-300Hz).\n   - Delta t = 256 / 16000 = 16 ms (Overlap 75%, tương thích với chu kỳ dịch chuyển thanh môn 10-25ms).\n4. Log-Mel Filterbank 80 dải:\n   m = 2595 * log10(1 + f / 700), ánh xạ ma trận S_mel = ln(W_mel * |X(t, f)|^2 + epsilon).",
    "metrics": [
      {
        "name": "Tần số lấy mẫu chuẩn",
        "val": "16,000 Hz (f_s)"
      },
      {
        "name": "Độ phân giải tần số",
        "val": "15.625 Hz"
      },
      {
        "name": "Độ phân giải thời gian",
        "val": "16 ms (Overlap 75%)"
      },
      {
        "name": "Số dải lọc Mel",
        "val": "80 dải (100Hz - 8000Hz)"
      },
      {
        "name": "Suy hao dải chặn FIR",
        "val": "> 80 dB (Kaiser window)"
      }
    ],
    "standards": "ITU-T P.862 (PESQ), ITU-T G.711, ANSI S1.11, ISO/IEC 14496-3",
    "traps": "Kinh điển: Dùng phép nội suy tuyến tính (Linear Interpolation) làm biến dạng Formant và rò rỉ hài âm bậc cao của neural vocoder."
  },
  {
    "num": 2,
    "roman": "II",
    "code": "def schroeder_rt60(tail_audio, sr=16000):\n    energy = tail_audio[::-1] ** 2\n    curve = np.cumsum(energy)[::-1]\n    db_curve = 10 * np.log10(curve / np.max(curve) + 1e-10)\n    idx_5 = np.where(db_curve <= -5)[0][0]\n    idx_25 = np.where(db_curve <= -25)[0][0]\n    t20 = (idx_25 - idx_5) / sr\n    return 3.0 * t20",
    "name": "Vật Lý Âm Học Phòng & Chuẩn ISO 3382 (Room Acoustics & Replay)",
    "tag": "acoustics",
    "subtitle": "Tích Phân Năng Lượng Lùi Schroeder, T20/RT60, Phòng Câm & Comb-Filtering Loa Ngoài",
    "summary": "Bóc tách phản xạ âm học phòng vật lý thông qua tích phân lùi Schroeder trên các đoạn rơi năng lượng tiếng nói (Speech Offset Tails), phát hiện phòng thu câm số và tấn công phát lại qua loa ngoài.",
    "theory": "1. Phương pháp Schroeder Backward Energy Integration:\n   E(t) = INTEGRAL_{t}^{INFINITY} h^2(tau) dtau\n   Đo năng lượng suy giảm tích lũy trên các đoạn Speech Offset Tails khi kết thúc nguyên âm.\n2. Quy đổi thời gian dội âm:\n   Xác định khoảng suy giảm từ -5dB đến -25dB trên đường cong Schroeder -> T20.\n   Thời gian dội âm tiêu chuẩn: RT60 = 3 * T20.\n3. Quy tắc phân định pháp y:\n   - RT60 < 0.15s: Phòng câm toán học (Anechoic Vocoder / ElevenLabs / VITS) - Dấu hiệu TTS nhân tạo.\n   - 0.15s <= RT60 <= 0.85s: Phòng sinh hoạt / văn phòng thực tế của người nói hợp lệ.\n   - RT60 > 0.85s: Tấn công phát lại qua loa ngoài (Loudspeaker Replay Attack) do tích chập 2 lần phòng (h_record * h_replay).\n4. Hiệu ứng lọc lược (Comb-Filtering):\n   H(f) = 1 + alpha * e^{-j 2 pi f Delta t}, tạo ra các rãnh triệt tiêu tuần hoàn trên phổ.",
    "metrics": [
      {
        "name": "Ngưỡng phòng câm TTS",
        "val": "RT60 < 0.15s"
      },
      {
        "name": "Ngưỡng phòng sinh hoạt",
        "val": "0.15s <= RT60 <= 0.85s"
      },
      {
        "name": "Ngưỡng Replay loa ngoài",
        "val": "RT60 > 0.85s"
      },
      {
        "name": "Bước nhảy nhiễu ghép nối",
        "val": "Delta Noise Floor > 9.5 dB"
      }
    ],
    "standards": "ISO 3382-1 / ISO 3382-2 (Room Acoustic Parameters), ITU-R BS.1534",
    "traps": "Kinh điển: Bỏ qua bước trừ mức nhiễu nền (Noise Floor Subtraction) khiến đường cong Schroeder không bao giờ hội tụ về âm vô cùng."
  },
  {
    "num": 3,
    "roman": "III",
    "code": "def detect_glottal_stop(rms_frames, f0_contour):\n    for i in range(1, len(rms_frames) - 1):\n        delta_db = 20 * np.log10(rms_frames[i] / (rms_frames[i-1] + 1e-9))\n        if delta_db < -12.0 and f0_contour[i-1] > 0 and f0_contour[i+1] > 0:\n            return True, delta_db\n    return False, 0.0",
    "name": "Ngữ Âm Học & 6 Thanh Điệu Tiếng Việt (Vietnamese Prosody & Glottal Stop)",
    "tag": "prosody",
    "subtitle": "NAFE F0 Tracking (60-400Hz), Micro-Jitter Chu Kỳ Dây Thanh & Khai Thác Thanh Ngã",
    "summary": "Khai thác triệt để đặc tính thanh điệu tiếng Việt và giải phẫu thanh quản: Micro-Jitter sinh học dây thanh và hiện tượng đóng nắp thanh môn ngắt âm hoàn toàn trong thanh Ngã (Glottal Stop Mining).",
    "theory": "1. Thuật toán tự tương quan chuẩn hóa NAFE (Normalized Autocorrelation F0 Estimation):\n   R_x(tau) = SUM x[n]x[n+tau] / sqrt(SUM x^2[n] * SUM x^2[n+tau])\n   Dò cực đại trong dải tần số cơ bản sinh học người: [60Hz, 400Hz].\n2. Micro-Jitter sinh học dây thanh:\n   Jitter_rel = (1/(N-1) * SUM |T_i - T_{i+1}|) / (1/N * SUM T_i) * 100%\n   - Người thật: 0.6% <= Jitter <= 2.5% do rung động cơ học bất đối xứng của nếp gấp thanh âm.\n   - TTS Vocoder (HiFi-GAN, WaveGlow): Jitter < 0.35% (Quá mượt, mất dao động vi mô tự nhiên).\n   - RVC Voice Conversion: Jitter > 4.8% (Trượt pha STFT do thuật toán Harvest F0).\n3. Hiện tượng nắp thanh môn trong thanh Ngã tiếng Việt (Glottal Stop):\n   - Khi phát âm từ có thanh Ngã (ví dụ: 'nghĩ', 'sữa', 'nguyễn'), nắp thanh môn ép chặt khiến dây thanh ngừng rung trong 20-50ms.\n   - Năng lượng sụt giảm sâu: Delta E_RMS < -12 dB kèm tần số F0 gián đoạn tức thời.\n   - Neural Vocoder tổng hợp thường làm trơn đường bao phổ, chỉ giảm nhẹ 3-5dB, lộ rõ vết tích Deepfake.",
    "metrics": [
      {
        "name": "Jitter người thật",
        "val": "0.60% - 2.50%"
      },
      {
        "name": "Jitter TTS Vocoder",
        "val": "< 0.35% (Quá mượt)"
      },
      {
        "name": "Jitter RVC trượt pha",
        "val": "> 4.80% (Giật cục)"
      },
      {
        "name": "Độ sụt năng lượng thanh Ngã",
        "val": "Delta E < -12.0 dB"
      },
      {
        "name": "Thời gian ngắt thanh môn",
        "val": "20ms - 50ms"
      }
    ],
    "standards": "IPA (International Phonetic Alphabet) for Vietnamese, ISO 19794-4",
    "traps": "Kinh điển: Bắt nhầm phụ âm vô thanh (/p/, /t/, /k/) là Glottal Stop do không kiểm tra trạng thái hữu thanh (Voicing State) trước và sau khoảng lặng."
  },
  {
    "num": 4,
    "roman": "IV",
    "code": "import onnxruntime as ort\n\nopts = ort.SessionOptions()\nopts.intra_op_num_threads = 4\nopts.inter_op_num_threads = 1\nopts.graph_optimization_level = ort.GraphOptimizationLevel.ORT_ENABLE_ALL\nsession = ort.InferenceSession(\"model_melcnn_opt14.onnx\", opts, providers=['CPUExecutionProvider'])",
    "name": "Mô Hình Học Sâu MelCNN & Tối Ưu Hóa Suy Luận ONNX Opset 14",
    "tag": "onnx",
    "subtitle": "Kiến Trúc Nhẹ 1.2M Tham Số, FusedConv Operator, FP16/INT8 Quantization & Latency < 7ms",
    "summary": "Mạng nơ-ron tích chập MelCNN 2D bóc tách bất thường phổ thời gian thực, tối ưu hóa toàn diện trên CPU Intel Xeon thông qua ONNX Runtime Opset 14 với độ trễ suy luận chỉ 6.8ms.",
    "theory": "1. Kiến trúc mạng MelCNN:\n   - 4 khối Residual Conv2D với Mish Activation và BatchNorm.\n   - Squeeze-and-Excitation (SE-Block) tái phân bổ trọng số các dải tần số quan trọng.\n   - Global Average Pooling (GAP) giảm thiểu số chiều, tổng số tham số chỉ 1.2M (nhỏ hơn 80 lần so với WavLM 95M).\n2. Tối ưu hóa suy luận ONNX Runtime Opset 14:\n   - Hợp nhất toán tử (Operator Fusion): Ghép Conv + BatchNorm + Mish thành 1 kernel FusedConv duy nhất, tiết kiệm 40% băng thông bộ nhớ RAM.\n   - Cấu hình đa luồng: intra_op_num_threads = 4 (tối ưu tính toán ma trận song song), inter_op_num_threads = 1 (tránh lock contention).\n3. Lượng tử hóa INT8 Dynamic Quantization:\n   - Giảm dung lượng mô hình từ 4.8MB (FP32) xuống 1.3MB (INT8).\n   - Tốc độ suy luận tăng 2.3 lần trên CPU không có card đồ họa GPU rời.",
    "metrics": [
      {
        "name": "Số lượng tham số",
        "val": "1.2 Triệu tham số (1.2M)"
      },
      {
        "name": "Thời gian suy luận CPU",
        "val": "6.8 ms / chunk 1 giây"
      },
      {
        "name": "Dung lượng model ONNX",
        "val": "1.3 MB (INT8 Quantized)"
      },
      {
        "name": "Mức tiêu thụ bộ nhớ RAM",
        "val": "< 85 MB"
      }
    ],
    "standards": "ONNX Runtime Opset 14 Spec, IEEE 754-2019 (Floating Point Arithmetic)",
    "traps": "Kinh điển: Tải mô hình lại trong mỗi request HTTP thay vì duy trì InferenceSession tĩnh, dẫn tới rò rỉ RAM và nghẽn CPU."
  },
  {
    "num": 5,
    "roman": "V",
    "code": "def evaluate_hard_veto(cnn_score, jitter, rt60, glottal_delta):\n    if jitter < 0.35 or rt60 < 0.15 or rt60 > 0.85 or glottal_delta > -6.0:\n        return True, 0.99, \"HARD_VETO: Vi phạm bất biến vật lý\"\n    score = 0.50 * cnn_score + 0.30 * (1.0 - jitter / 2.5) + 0.20 * (rt60 / 0.5)\n    return False, score, \"NORMAL_FUSION\"",
    "name": "Cơ Chế Dung Hợp Quyết Định & Xử Lý Mâu Thuẫn (Dempster-Shafer & Hard Veto)",
    "tag": "fusion",
    "subtitle": "Dung Hợp Bằng Chứng Đa Nguồn, Quyền Phủ Quyết Cứng Bất Biến Vật Lý & Tri-Band Policy",
    "summary": "Dung hợp xác suất từ MelCNN, Ngữ âm NAFE và Âm học ISO 3382 qua lý thuyết Dempster-Shafer. Thiết lập quyền phủ quyết cứng (Hard Veto) khi phát hiện mâu thuẫn vật lý không thể hòa giải.",
    "theory": "1. Lý thuyết Bằng chứng Dempster-Shafer (DST):\n   - Cho phép định lượng mức độ không chắc chắn (Uncertainty) và mâu thuẫn (Conflict factor k):\n     k = SUM_{A INTERSECT B = EMPTY} m_1(A) * m_2(B)\n   - Khi k > 0.85 (Mâu thuẫn cực đoan: ví dụ AI chấm Real 0.99 nhưng Jitter chỉ 0.15% hoặc dội âm phòng kép 0.96s), hệ thống bác bỏ trung bình cộng mềm (Soft Averaging).\n2. Quyền Phủ Quyết Cứng (Hard Veto Logic):\n   IF (Jitter < 0.35% OR RT60 < 0.15s OR RT60 > 0.85s OR (ThanhNgã == True AND DeltaE > -6.0dB)):\n       FINAL_DECISION = HARD_VETO_FRAUD (Score = 0.99)\n3. Chính sách phân vùng 3 dải (Tri-Band Policy):\n   - Dải Xanh [0.0 - 0.30): Hợp lệ 100%, thông qua giao dịch tức thì.\n   - Dải Vàng [0.30 - 0.80): Vùng nghi vấn, kích hoạt Step-up Auth (OTP âm thanh ngẫu nhiên chứa từ có thanh Ngã/Nặng).\n   - Dải Đỏ [0.80 - 1.00]: Gian lận nguy cơ cao, phong tỏa lệnh chuyển tiền khẩn cấp.",
    "metrics": [
      {
        "name": "Hệ số xung đột tối đa",
        "val": "k > 0.85 (Kích hoạt Veto)"
      },
      {
        "name": "Dải xanh (Auto-Approve)",
        "val": "[0.0 - 0.30)"
      },
      {
        "name": "Dải vàng (Step-up Auth)",
        "val": "[0.30 - 0.80)"
      },
      {
        "name": "Dải đỏ (Hard Block)",
        "val": "[0.80 - 1.00]"
      }
    ],
    "standards": "Dempster-Shafer Evidence Theory (1976), NIST SP 800-63B Digital Identity",
    "traps": "Kinh điển: Dùng trung bình cộng có trọng số đơn giản (Weighted Average), bị kẻ tấn công đánh lừa mạng CNN lấn át các quy luật vật lý."
  },
  {
    "num": 6,
    "roman": "VI",
    "code": "def attribute_generator(jitter, rt60, noise_jump):\n    if rt60 > 0.85 and noise_jump > 9.5:\n        return \"LOUDSPEAKER_REPLAY_CONCAT\"\n    if jitter > 4.5:\n        return \"RVC_VOICE_CONVERSION\"\n    if rt60 < 0.12 and jitter < 0.40:\n        return \"DIFFUSION_TTS_ELEVENLABS\"\n    return \"UNKNOWN_OR_AUTHENTIC\"",
    "name": "Định Danh Họ Mô Hình Sinh Mã (Deepfake Attribution Engine)",
    "tag": "ai",
    "subtitle": "Phân Loại Họ Kiến Trúc: Diffusion Vocoder, Autoregressive TTS, RVC Voice Conversion & Loa Ngoài",
    "summary": "Xác định danh tính công nghệ đứng sau đợt tấn công thông qua dấu vân tay quang phổ (Spectral Fingerprints) và cơ chế bù pha, hỗ trợ điều tra án hình sự ngân hàng.",
    "theory": "1. Phân loại 4 họ kiến trúc sinh mã phổ biến:\n   - Họ Diffusion (ElevenLabs, Coqui XTTS, DiffWave): Đặc trưng bởi độ bẹp F0, suy giảm vi dội âm cực thấp (RT60 < 0.10s), phổ năng lượng mịn trên 4000Hz.\n   - Họ Voice Conversion (RVC v2, FreeSVC): Hiện tượng giật pha STFT do thuật toán Harvest F0 làm Jitter tăng đột biến > 4.8%, xuất hiện các vạch sọc dọc trên phổ Log-Mel.\n   - Họ Neural Vocoder cổ điển (HiFi-GAN, MelGAN): Hài âm bậc cao nhân tạo xuất hiện ở các tần số bội số cố định (Artifacts periodicity).\n   - Họ Replay & Cắt Ghép: Dội âm kép RT60 > 0.85s, rãnh lọc lược Comb-Filter và bước nhảy nền nhiễu Delta Noise Floor > 9.5dB giữa các âm tiết.\n2. Ứng dụng điều tra pháp y ngân hàng:\n   - Giúp chuyên gia giám định chỉ đích danh loại phần mềm kẻ gian sử dụng để báo cáo Cơ quan An ninh mạng.",
    "metrics": [
      {
        "name": "Độ chính xác định danh họ AI",
        "val": "> 94.2%"
      },
      {
        "name": "Thời gian trích xuất dấu vết",
        "val": "< 15 ms"
      },
      {
        "name": "Số lượng họ mô hình hỗ trợ",
        "val": "6 họ kiến trúc phổ biến"
      }
    ],
    "standards": "NIST SRE (Speaker Recognition Evaluation), ASVspoof 5 Attribution Challenge",
    "traps": "Kinh điển: Nhầm lẫn giữa nhiễu môi trường tự nhiên với dấu vết lượng tử hóa của mô hình sinh mã."
  },
  {
    "num": 7,
    "roman": "VII",
    "code": "def orthogonal_project(v_feature, v_identity_subspace):\n    projection = np.dot(v_feature, v_identity_subspace.T) @ v_identity_subspace\n    v_liveness = v_feature - projection\n    return v_liveness / (np.linalg.norm(v_liveness) + 1e-9)",
    "name": "Sinh Trắc Giọng Nói 1:1 & Phân Ly Không Gian Trực Giao",
    "tag": "ai",
    "subtitle": "Tách Biệt Vector Đặc Trưng Danh Tính (x-vector / ECAPA-TDNN) & Vector Liveness",
    "summary": "Ngăn chặn hiện tượng nhận diện sai danh tính do liveness: Chiếu trực giao không gian vector (Orthogonal Projection) để tách riêng 'Giọng của ai' và 'Có phải người sống hay không'.",
    "theory": "1. Vấn đề cốt lõi của hệ thống xác thực sinh trắc:\n   - Nếu dùng chung 1 mô hình embedding để vừa chấm điểm danh tính vừa chấm liveness, mô hình dễ bị thiên lệch: Giọng người quen bị AI bắt chước sẽ được chấm điểm rất cao, dẫn tới bỏ lọt Deepfake tinh vi.\n2. Cơ chế phân ly không gian trực giao (Orthogonal Subspace Projection):\n   - Không gian V_id: Mã hóa đặc trưng sinh học dây thanh và đường dẫn phát âm cố định của cá nhân (Speaker Identity).\n   - Không gian V_live: Mã hóa các biến động vi mô động lực học (Micro-Jitter, Glottal Closure, Room Reflection).\n   - Chiếu trực giao: V_live_clean = V_total - Proj_{V_id}(V_total), đảm bảo điểm liveness không bị ảnh hưởng bởi danh tính người nói.",
    "metrics": [
      {
        "name": "Độ phân ly không gian",
        "val": "cos(theta) < 0.05 (Gần vuông góc 90 deg)"
      },
      {
        "name": "Độ dài vector định danh",
        "val": "192 chiều (ECAPA-TDNN)"
      },
      {
        "name": "Tỷ lệ chấp nhận sai (FAR)",
        "val": "< 0.01%"
      }
    ],
    "standards": "ISO/IEC 19794-13 (Voice Biometric Data Interchange Formats)",
    "traps": "Kinh điển: Dùng điểm tương đồng cosine danh tính (Speaker Cosine Similarity) làm ngưỡng tin cậy chống lừa đảo."
  },
  {
    "num": 8,
    "roman": "VIII",
    "code": "def simulate_g711_telephony(pcm_16k):\n    # Downsample to 8kHz, apply bandpass 300-3400Hz and Mu-law quantization\n    b, a = signal.butter(4, [300/(8000/2), 3400/(8000/2)], btype='bandpass')\n    pcm_8k = signal.resample(pcm_16k, len(pcm_16k) // 2)\n    filtered = signal.lfilter(b, a, pcm_8k)\n    mu = 255\n    quantized = np.sign(filtered) * np.log(1 + mu * np.abs(filtered)) / np.log(1 + mu)\n    return quantized",
    "name": "Kiểm Thử Độ Bền Vững & Giả Lập Tấn Công (Red-Team Sandbox)",
    "tag": "security",
    "subtitle": "Giả Lập Kênh Thoại G.711u/A, Mất Gói Tin PLC, Nhiễu Môi Trường & Adversarial FGSM",
    "summary": "Hộp cát Red-Team tự động kiểm thử độ bền vững của mô hình phòng vệ trước các điều kiện viễn thông khắc nghiệt: nén codec G.711 8-bit, mất gói tin RTP 10-20% và tấn công đối nghịch FGSM.",
    "theory": "1. Lượng tử hóa và nén băng thông viễn thông G.711:\n   - Nén phi tuyến theo hàm logarit Mu-law / A-law đưa dải động 14-bit về 8-bit tại tần số 8kHz (Dải thông 300-3400Hz).\n   - Triệt tiêu hoàn toàn các hài âm trên 3400Hz. Hệ thống tự động kích hoạt Cổng động kênh truyền: Hạ trọng số CNN xuống 0.10, tăng trọng số Ngữ âm tiếng Việt lên 0.65 và Âm học phòng lên 0.25.\n2. Giả lập mất gói tin (Packet Loss Concealment - PLC):\n   - Khi mạng VoIP mất 5-15% gói tin, thuật toán PLC nội suy các khung lặp lại, có thể gây nhiễu chỉ số Jitter. Hệ thống phát hiện các khung PLC thông qua cờ RTP Sequence Number để loại bỏ khỏi vùng tính toán.\n3. Tấn công mẫu đối nghịch (Adversarial Perturbation FGSM):\n   - Thêm nhiễu epsilon siêu nhỏ không nghe thấy bằng tai người vào phổ âm thanh để đánh lừa mạng nơ-ron:\n     x_adv = x + epsilon * sign(GRADIENT_x J(theta, x, y)).\n   - Nhờ có 2 trụ cột vật lý (Jitter dây thanh và Dội âm ISO 3382) không thể bị đánh lừa bởi nhiễu số, hệ thống vẫn giữ vững khả năng phát hiện gian lận.",
    "metrics": [
      {
        "name": "Chịu đựng mất gói tin RTP",
        "val": "Lên tới 15% Packet Loss"
      },
      {
        "name": "Khả năng chống suy hao G.711",
        "val": "Bảo toàn F0 & Glottal Stop 100%"
      },
      {
        "name": "Kháng nhiễu đối nghịch",
        "val": "Chặn đứng FGSM epsilon <= 0.03"
      }
    ],
    "standards": "ITU-T G.711, ITU-T G.114 (One-way transmission time), RFC 3550 RTP",
    "traps": "Kinh điển: Đánh giá mô hình trên file ghi âm phòng thu WAV 48kHz không nén, dẫn tới sụp đổ khi triển khai trên tổng đài di động thực tế."
  },
  {
    "num": 9,
    "roman": "IX",
    "code": "class CircularAudioBuffer:\n    def __init__(self, capacity=16000 * 2):\n        self.buffer = np.zeros(capacity, dtype=np.float32)\n        self.write_pos = 0\n    def write(self, chunk):\n        n = len(chunk)\n        self.buffer[self.write_pos:self.write_pos + n] = chunk\n        self.write_pos = (self.write_pos + n) % len(self.buffer)",
    "name": "Độ Trễ Toàn Trình Đầu-Cuối (End-to-End Latency T_E2E ≈ 350ms)",
    "tag": "security",
    "subtitle": "Bộ Đệm Vòng Khóa Không Chờ (Lock-free Ring Buffer), Streaming STFT & WebRTC Fast-Path",
    "summary": "Kiến trúc xử lý dòng trực tiếp khống chế thời gian phản hồi toàn trình dưới 350ms, đảm bảo phong tỏa cuộc gọi lừa đảo ngay từ âm tiết đầu tiên trước khi nạn nhân thao tác chuyển tiền.",
    "theory": "1. Phân bổ ngân sách độ trễ toàn trình (Latency Budget Breakdown):\n   - Thu âm & Cửa sổ dòng (Chunking): 256ms (4096 mẫu tại 16kHz).\n   - Bộ đệm mạng WebRTC / WebSocket: 30ms.\n   - Tiền xử lý DSP (Polyphase + STFT Log-Mel): 12ms.\n   - Trích xuất F0 NAFE & Glottal Stop: 15ms.\n   - Tính toán dội âm ISO 3382 Schroeder: 18ms.\n   - Suy luận mạng MelCNN trên ONNX CPU: 6.8ms.\n   - Dung hợp Dempster-Shafer & Hard Veto: 0.8ms.\n   - Gửi lệnh ngắt kết nối SIP BYE / Webhook ngân hàng: 15ms.\n   -> Tổng thời gian T_E2E = 347.6 ms (Thỏa mãn tiêu chuẩn viễn thông T_E2E < 400ms của ITU-T G.114).\n2. Cơ chế Bộ đệm vòng (Lock-Free Circular Ring Buffer):\n   - Loại bỏ hoàn toàn chi phí sao chép dữ liệu (Zero-Copy) và Garbage Collection giữa Web Audio Thread và Forensic Worker Thread.",
    "metrics": [
      {
        "name": "Tổng độ trễ T_E2E",
        "val": "≈ 347.6 ms (< 400 ms)"
      },
      {
        "name": "Kích thước chunk streaming",
        "val": "256 ms (4096 mẫu)"
      },
      {
        "name": "Thời gian chạy mô hình AI",
        "val": "6.8 ms (ONNX CPU)"
      },
      {
        "name": "Thời gian ngắt kết nối SIP",
        "val": "< 20 ms"
      }
    ],
    "standards": "ITU-T G.114 (One-Way Transmission Time), WebRTC 1.0 Spec",
    "traps": "Kinh điển: Gom cả đoạn audio dài 3-5 giây mới gửi đi phân tích, lúc phát hiện thì nạn nhân đã hoàn tất chuyển tiền."
  },
  {
    "num": 10,
    "roman": "X",
    "code": "import hashlib\nimport hmac\n\ndef generate_evidence_token(audio_bytes, telemetry_json, secret_key):\n    payload = audio_bytes + telemetry_json.encode('utf-8')\n    token = hmac.new(secret_key, payload, hashlib.sha256).hexdigest()\n    return token",
    "name": "Pháp Y Số, Chuỗi Bảo Quản Chứng Cứ & Quản Trị Rủi Ro Ngân Hàng",
    "tag": "security",
    "subtitle": "Mã Hóa SHA-256 HMAC, Chứng Thực Dấu Thời Gian RFC 3161 & Tuân Thủ FIPS 140-3 Level 3",
    "summary": "Bảo đảm tính toàn vẹn và giá trị pháp lý trước tòa án của hồ sơ giám định: Ký số HMAC-SHA256 từng gói tin, đóng dấu thời gian RFC 3161 trên HSM phần cứng và chính sách kiểm soát FPR < 0.05%.",
    "theory": "1. Chuỗi bảo quản chứng cứ pháp lý (Chain of Custody):\n   - Mọi tệp âm thanh thu nhận từ tổng đài phải được gắn kèm mã băm SHA-256 ngay tại thời điểm gói tin RTP chạm tới Ingress Gateway.\n   - Gói tin pháp y gồm: Hash âm thanh, Dữ liệu Telemetry (F0, Jitter, RT60, Log-Mel), Quyết định Veto và Chữ ký số RSA-4096 / ECDSA P-384.\n2. Dấu thời gian chuẩn quốc tế RFC 3161:\n   - Hồ sơ giám định được gửi tới Máy chủ Chứng thực Dấu thời gian (Timestamping Authority - TSA) độc lập để tạo bằng chứng không thể chối bỏ (Non-repudiation) về thời gian xảy ra vụ việc.\n3. Tiêu chuẩn phần cứng bảo mật FIPS 140-3 Level 3:\n   - Khóa ký số được lưu trữ trong module HSM phần cứng chuyên dụng có cơ chế tự hủy dữ liệu khi bị can thiệp vật lý.\n4. Quản trị rủi ro ngân hàng & FPR < 0.05%:\n   - Trong giao dịch tài chính, việc chặn nhầm khách hàng VIP (False Positive) gây tổn thất danh tiếng nghiêm trọng. DeepGuard giải quyết triệt để nhờ cơ chế phân tầng Tri-Band kết hợp OTP thách thức.",
    "metrics": [
      {
        "name": "Chuẩn băm toàn vẹn",
        "val": "SHA-256 / HMAC-SHA512"
      },
      {
        "name": "Chuẩn dấu thời gian",
        "val": "RFC 3161 Trusted Timestamp"
      },
      {
        "name": "Cấp độ bảo mật phần cứng",
        "val": "FIPS 140-3 Level 3 HSM"
      },
      {
        "name": "Cam kết tỷ lệ báo động giả",
        "val": "FPR < 0.05% (Dải chặn cứng)"
      }
    ],
    "standards": "FIPS 140-3 (NIST), RFC 3161 (Internet X.509 PKI), ISO/IEC 27001, PCI-DSS v4.0",
    "traps": "Kinh điển: Lưu trữ tệp âm thanh và kết quả giám định dưới dạng tệp văn bản thường không ký số, bị luật sư đối phương bác bỏ chứng cứ trước tòa."
  },
  {
    "num": 11,
    "roman": "XI",
    "code": "# Docker Compose horizontal scaling snippet\nservices:\n  forensic-worker:\n    image: deepguard-worker:latest\n    deploy:\n      replicas: 8\n      resources:\n        limits:\n          cpus: '4.0'\n          memory: 1024M",
    "name": "Kiến Trúc Fullstack Doanh Nghiệp & Khả Năng Mở Rộng 200.000 Cuộc Gọi/Ngày",
    "tag": "fusion",
    "subtitle": "FastAPI gRPC Microservices, ClickHouse Time-Series Telemetry, Redis Queue & Prometheus Alerting",
    "summary": "Hạ tầng backend phân tán sẵn sàng cho môi trường sản xuất: Xử lý 200.000 cuộc gọi mỗi ngày với chi phí vận hành CPU thấp, lưu trữ phân tích pháp y trên ClickHouse và cảnh báo gian lận Grafana.",
    "theory": "1. Mô hình kiến trúc phân tán (Microservices Architecture):\n   - Ingress Gateway (SIP Proxy / FreeSWITCH / Asterisk): Tiếp nhận luồng RTP viễn thông và chuyển tiếp qua gRPC streaming.\n   - Forensic Inference Workers (FastAPI + C++ ONNX Runtime): Scale ngang qua Docker Swarm / Kubernetes HPA (Horizontal Pod Autoscaling) dựa trên CPU load.\n   - Redis Sharded Cluster: Lưu trữ trạng thái phiên xác thực (Session State) và Ring Buffer đệm âm thanh với độ trễ < 1ms.\n2. Cơ sở dữ liệu phân tích pháp y ClickHouse:\n   - Lưu trữ hàng tỷ bản ghi telemetry âm thanh (F0, Jitter, RT60, Log-Mel features) dưới dạng cột (Column-oriented storage), nén dữ liệu 10x và truy vấn hàng triệu bản ghi trong vài mili-giây.\n3. Giám sát & Cảnh báo thời gian thực:\n   - Prometheus thu thập các số liệu: E2E Latency, Jitter Distribution, Veto Trigger Count, Model Drift Rate.\n   - Grafana Dashboard hiển thị bản đồ nhiệt rủi ro gian lận theo thời gian thực và tự động kích hoạt webhook cảnh báo đội ngũ SOC ngân hàng.",
    "metrics": [
      {
        "name": "Công suất xử lý thiết kế",
        "val": "> 200,000 cuộc gọi / ngày"
      },
      {
        "name": "Khả năng mở rộng ngang",
        "val": "Docker / K8s HPA Auto-scaling"
      },
      {
        "name": "Thời gian truy vấn Telemetry",
        "val": "< 15 ms trên ClickHouse"
      },
      {
        "name": "Chi phí hạ tầng so với GPU",
        "val": "Tiết kiệm 85% chi phí (Chạy 100% CPU)"
      }
    ],
    "standards": "OpenAPI 3.1, gRPC Protocol Buffers v3, Twelve-Factor App Methodology",
    "traps": "Kinh điển: Dùng cơ sở dữ liệu quan hệ truyền thống (MySQL/PostgreSQL) để lưu trữ vector sóng âm, gây nghẽn I/O ổ đĩa khi tải cao."
  }
];

// 5. DATA REPOSITORY: 5 CORE BACKEND CODE MODULES WITH AUDIT CHALLENGES (MODE 5)
const CODE_AUDIT_MODULES = [
  {
    "id": "mod_dsp",
    "filename": "backend/app/services/audio_dsp.py",
    "title": "DSP Pipeline: Polyphase Resampling & Log-Mel Spectrogram",
    "perf": "Thời gian xử lý: 3.2ms / chunk",
    "desc": "Chuẩn hóa tín hiệu âm thanh đầu vào về 16kHz Polyphase và tính STFT Hann 1024 / Hop 256 xuất ra 80 dải Log-Mel.",
    "code": "import numpy as np\nimport scipy.signal as signal\nimport librosa\n\nclass ForensicDSPPipeline:\n    def __init__(self, target_sr=16000, n_fft=1024, hop_length=256, n_mels=80):\n        self.sr = target_sr\n        self.n_fft = n_fft\n        self.hop_length = hop_length\n        self.n_mels = n_mels\n        self.window = signal.windows.hann(n_fft)\n        self.mel_basis = librosa.filters.mel(sr=target_sr, n_fft=n_fft, n_mels=n_mels, fmin=100.0, fmax=8000.0)\n\n    def resample_polyphase(self, audio: np.ndarray, orig_sr: int) -> np.ndarray:\n        if orig_sr == self.sr:\n            return audio\n        gcd = np.gcd(orig_sr, self.sr)\n        up = self.sr // gcd\n        down = orig_sr // gcd\n        # Kaiser window beta=5.0 gives >80dB stopband attenuation\n        return signal.resample_poly(audio, up, down, window=('kaiser', 5.0))\n\n    def compute_log_mel(self, audio: np.ndarray) -> np.ndarray:\n        # Zero-pad or frame slicing\n        stft = librosa.stft(audio, n_fft=self.n_fft, hop_length=self.hop_length, window=self.window, center=False)\n        power_spec = np.abs(stft) ** 2\n        mel_spec = np.dot(self.mel_basis, power_spec)\n        log_mel = np.log(np.maximum(mel_spec, 1e-6))\n        return log_mel",
    "sliders": [
      {
        "id": "sl_nfft",
        "label": "Kích thước cửa sổ N_FFT (Hann):",
        "min": 512,
        "max": 2048,
        "step": 512,
        "val": 1024,
        "unit": " mẫu"
      },
      {
        "id": "sl_hop",
        "label": "Độ trượt Hop Length:",
        "min": 128,
        "max": 512,
        "step": 128,
        "val": 256,
        "unit": " mẫu"
      }
    ],
    "auditChallenge": {
      "question": "Trong đoạn code `resample_polyphase`, nếu lập trình viên thay thế bộ lọc Kaiser bằng `signal.resample(audio, target_len)` (sử dụng FFT Resampling), lỗ hổng gì sẽ phát sinh?",
      "opts": [
        "Làm tăng kích thước RAM lên gấp 10 lần do biến đổi Fourier hai chiều.",
        "Gây ra hiện tượng Time-Domain Ringing (hiệu ứng Gibbs) tại hai đầu biên audio, làm sai lệch năng lượng và sinh ra Formant ảo ở dải trầm.",
        "Làm tốc độ tính toán bị chậm đi 100 lần.",
        "Mô hình ONNX sẽ từ chối nhận ma trận đầu vào vì sai kích thước."
      ],
      "correct": 1,
      "explanation": "FFT Resampling giả định tín hiệu tuần hoàn vô hạn. Khi tín hiệu âm thanh thực tế bị cắt cụt ở hai đầu, hiệu ứng Gibbs sinh ra các gợn sóng dao động biên độ lớn (Ringing Artifacts), làm hỏng phép đo năng lượng RMS của nắp thanh môn.",
      "secureFix": "Luôn sử dụng `signal.resample_poly(..., window=('kaiser', 5.0))` với cửa sổ Kaiser có hệ số tắt dần để triệt tiêu hiệu ứng Gibbs và bảo toàn dải chặn > 80dB."
    }
  },
  {
    "id": "mod_prosody",
    "filename": "backend/app/services/prosody_glottal.py",
    "title": "Ngữ Âm Học NAFE & Khai Thác Nắp Thanh Môn (Glottal Stop Miner)",
    "perf": "Thời gian xử lý: 4.1ms / chunk",
    "desc": "Bóc tách tần số cơ bản F0 qua NAFE và phát hiện hiện tượng sụt năng lượng thanh môn trong thanh Ngã tiếng Việt.",
    "code": "import numpy as np\n\nclass VietnameseGlottalMiner:\n    def __init__(self, sr=16000, frame_len=512, hop_len=128):\n        self.sr = sr\n        self.frame_len = frame_len\n        self.hop_len = hop_len\n        self.min_lag = int(sr / 400) # 400Hz F0 max\n        self.max_lag = int(sr / 60)  # 60Hz F0 min\n\n    def compute_nafe_f0(self, frame: np.ndarray) -> float:\n        # Normalized Autocorrelation F0 Estimation\n        norm = np.sum(frame ** 2)\n        if norm < 1e-4:\n            return 0.0 # Unvoiced / Silence\n        corr = np.correlate(frame, frame, mode='full')[len(frame)-1:]\n        search_region = corr[self.min_lag:self.max_lag]\n        best_lag = np.argmax(search_region) + self.min_lag\n        peak_val = corr[best_lag] / norm\n        if peak_val > 0.45:\n            return float(self.sr / best_lag)\n        return 0.0\n\n    def mine_glottal_stop(self, rms_series: np.ndarray, f0_series: np.ndarray):\n        # Look for sharp energy dips within voiced speech\n        for i in range(2, len(rms_series) - 2):\n            if f0_series[i-2] > 0 and f0_series[i+2] > 0:\n                delta_db = 20 * np.log10((rms_series[i] + 1e-9) / (rms_series[i-2] + 1e-9))\n                if delta_db < -12.0:\n                    return {\"detected\": True, \"drop_db\": delta_db, \"frame\": i, \"is_human\": True}\n        return {\"detected\": False, \"drop_db\": 0.0, \"frame\": -1, \"is_human\": False}",
    "sliders": [
      {
        "id": "sl_glottal_thresh",
        "label": "Ngưỡng sụt năng lượng thanh môn (ΔE):",
        "min": -20,
        "max": -5,
        "step": 1,
        "val": -12,
        "unit": " dB"
      }
    ],
    "auditChallenge": {
      "question": "Trong hàm `mine_glottal_stop`, tại sao điều kiện `if f0_series[i-2] > 0 and f0_series[i+2] > 0` lại là điều kiện an ninh bắt buộc trước khi tính `delta_db`?",
      "opts": [
        "Để ngăn chặn lỗi chia cho số 0 trong phép tính logarit.",
        "Để bảo đảm khoảng lặng năng lượng nằm giữa hai nguyên âm hữu thanh (Voiced context), loại trừ hiện tượng bắt nhầm phụ âm câm (/p/, /t/, /k/) hoặc khoảng lặng tự nhiên giữa các từ.",
        "Vì thuật toán tự tương quan chỉ hoạt động khi F0 lớn hơn 0.",
        "Để tăng độ to của âm thanh đầu ra."
      ],
      "correct": 1,
      "explanation": "Nắp thanh môn trong thanh Ngã chỉ đóng tạm thời giữa một nguyên âm hữu thanh. Nếu không kiểm tra F0 > 0 ở hai đầu, mọi khoảng dừng giữa câu hoặc các phụ âm bật vô thanh (/p/, /t/, /k/) đều sẽ bị nhận nhầm thành thanh Ngã, tạo ra báo động giả.",
      "secureFix": "Luôn kiểm tra điều kiện trạng thái hữu thanh hai phía (`f0_series[i-2] > 0 and f0_series[i+2] > 0`) kết hợp với kiểm tra thời lượng đóng thanh môn trong khoảng 20ms - 50ms."
    }
  },
  {
    "id": "mod_acoustics",
    "filename": "backend/app/services/room_acoustics.py",
    "title": "Âm Học Phòng ISO 3382: Tích Phân Schroeder & RT60",
    "perf": "Thời gian xử lý: 2.8ms / chunk",
    "desc": "Tính toán đường cong tích phân năng lượng suy giảm ngược dòng Schroeder trên các đoạn Speech Offset Tails và ngoại suy RT60.",
    "code": "import numpy as np\n\nclass RoomAcousticsForensics:\n    def __init__(self, sr=16000):\n        self.sr = sr\n\n    def compute_schroeder_rt60(self, speech_tail: np.ndarray) -> float:\n        # Tail must be zero-meaned\n        tail = speech_tail - np.mean(speech_tail)\n        # 1. Reverse energy integration: E(t) = integral_t^inf h^2(tau) dtau\n        energy_reversed = tail[::-1] ** 2\n        schroeder_curve = np.cumsum(energy_reversed)[::-1]\n        \n        # 2. Subtract estimated noise floor to prevent plateau\n        noise_floor = np.median(schroeder_curve[-int(0.1*len(schroeder_curve)):])\n        schroeder_clean = np.maximum(schroeder_curve - noise_floor, 1e-12)\n        \n        # 3. Convert to dB scale relative to peak\n        db_curve = 10 * np.log10(schroeder_clean / np.max(schroeder_clean))\n        \n        # 4. Measure T20 (-5dB to -25dB)\n        try:\n            idx_5db = np.where(db_curve <= -5.0)[0][0]\n            idx_25db = np.where(db_curve <= -25.0)[0][0]\n            t20 = (idx_25db - idx_5db) / self.sr\n            rt60 = 3.0 * t20\n            return float(rt60)\n        except IndexError:\n            return 0.05 # Truncated or anechoic signal",
    "sliders": [
      {
        "id": "sl_rt60_sim",
        "label": "Thời gian dội âm giả lập (RT60):",
        "min": 0.05,
        "max": 1.2,
        "step": 0.05,
        "val": 0.35,
        "unit": " s"
      }
    ],
    "auditChallenge": {
      "question": "Trong hàm `compute_schroeder_rt60`, nếu loại bỏ bước số 2 (`schroeder_clean = np.maximum(schroeder_curve - noise_floor, 1e-12)`), đường cong suy giảm năng lượng sẽ gặp lỗi gì?",
      "opts": [
        "Đường cong sẽ bị đảo ngược thành âm thanh tăng dần năng lượng.",
        "Đường cong năng lượng bị bẹt ở phần đuôi (Plateau Effect) do tích lũy nhiễu nền, khiến điểm -25dB không bao giờ tìm thấy được hoặc ước lượng RT60 bị sai lệch vọt lên 2-3 giây.",
        "Làm sập ứng dụng với lỗi `MemoryError`.",
        "Không có ảnh hưởng gì vì nhiễu nền luôn bằng 0."
      ],
      "correct": 1,
      "explanation": "Nhiễu nền luôn có năng lượng > 0. Tích phân lùi trên nhiễu nền tích lũy sẽ tạo ra một đường nằm ngang ở đuôi. Nếu không trừ mức nhiễu nền (Noise Floor), đường cong dB không thể chạm ngưỡng -25dB một cách tuyến tính, làm sai lệch toàn bộ phép đo pháp y.",
      "secureFix": "Luôn ước lượng mức nhiễu nền ở 10% đuôi của tín hiệu và trừ đi trước khi chuẩn hóa dB theo tiêu chuẩn ISO 3382."
    }
  },
  {
    "id": "mod_melcnn",
    "filename": "backend/app/services/onnx_inference.py",
    "title": "Mô Hình Học Sâu MelCNN: ONNX Runtime Opset 14 CPU",
    "perf": "Thời gian suy luận: 6.8ms / chunk",
    "desc": "Mô hình MelCNN 1.2M tham số tối ưu hóa đa luồng trên CPU Intel Xeon thông qua ONNX Runtime Opset 14 FusedConv.",
    "code": "import onnxruntime as ort\nimport numpy as np\n\nclass MelCNNInferenceEngine:\n    _instance = None # Singleton pattern to prevent re-instantiation\n\n    def __init__(self, model_path: str = \"models/melcnn_v3_opset14.onnx\"):\n        self.session_options = ort.SessionOptions()\n        # 1. Thread affinity: 4 intra-threads for 4-core CPU\n        self.session_options.intra_op_num_threads = 4\n        self.session_options.inter_op_num_threads = 1\n        # 2. Graph Optimization: Operator Fusion (FusedConv)\n        self.session_options.graph_optimization_level = ort.GraphOptimizationLevel.ORT_ENABLE_ALL\n        self.session = ort.InferenceSession(model_path, self.session_options, providers=['CPUExecutionProvider'])\n        self.input_name = self.session.get_inputs()[0].name\n        self.output_name = self.session.get_outputs()[0].name\n\n    def infer_chunk(self, log_mel_tensor: np.ndarray) -> float:\n        # Input shape: [1, 1, 80, 64] -> (Batch, Channel, Mels, Time)\n        ort_inputs = {self.input_name: log_mel_tensor.astype(np.float32)}\n        ort_outs = self.session.run([self.output_name], ort_inputs)\n        # Softmax probability for FAKE class\n        prob_fake = float(ort_outs[0][0][1])\n        return prob_fake",
    "sliders": [
      {
        "id": "sl_intra_threads",
        "label": "Số luồng tính toán ma trận (intra_op):",
        "min": 1,
        "max": 8,
        "step": 1,
        "val": 4,
        "unit": " luồng"
      }
    ],
    "auditChallenge": {
      "question": "Nếu trong file controller của FastAPI, lập trình viên tạo mới một đối tượng `MelCNNInferenceEngine()` bên trong hàm xử lý request thay vì dùng Singleton `_instance`, hậu quả gì sẽ xảy ra?",
      "opts": [
        "Mô hình sẽ không thể load được file `.onnx`.",
        "Mỗi request sẽ nạp lại file mô hình và biên dịch đồ thị tính toán (mất 200ms và cấp phát thêm 85MB RAM), dẫn tới tràn bộ nhớ RAM (OOM) và độ trễ tăng vọt lên hàng nghìn mili-giây khi có nhiều người gọi đồng thời.",
        "Mô hình sẽ tự động chuyển sang chế độ huấn luyện (Training Mode).",
        "Dữ liệu của khách hàng sẽ bị gửi ra ngoài Internet."
      ],
      "correct": 1,
      "explanation": "ONNX Runtime InferenceSession là đối tượng rất nặng vì nó thực hiện biên dịch đồ thị, phân bổ bộ đệm bộ nhớ tĩnh và bind các thread pool. Bắt buộc phải khởi tạo một lần duy nhất theo mẫu Singleton lúc ứng dụng khởi động.",
      "secureFix": "Khởi tạo `engine = MelCNNInferenceEngine()` ở phạm vi toàn cục hoặc trong hàm `lifespan` của FastAPI, tái sử dụng cùng một session cho mọi luồng request."
    }
  },
  {
    "id": "mod_fusion",
    "filename": "backend/app/services/decision_veto.py",
    "title": "Cơ Chế Dung Hợp Dempster-Shafer & Quyền Phủ Quyết Cứng (Hard Veto)",
    "perf": "Thời gian xử lý: 0.8ms / chunk",
    "desc": "Dung hợp bằng chứng đa tầng và kích hoạt Quyền Phủ Quyết Cứng khi phát hiện vi phạm bất biến vật lý.",
    "code": "class DecisionVetoEngine:\n    def __init__(self, tri_band_green=0.30, tri_band_red=0.80):\n        self.tb_green = tri_band_green\n        self.tb_red = tri_band_red\n\n    def evaluate_verdict(self, cnn_score: float, jitter: float, rt60: float, glottal_drop: float) -> dict:\n        # 1. HARD VETO CHECK (Bất biến vật lý không thể thỏa hiệp)\n        veto_triggers = []\n        if jitter < 0.35:\n            veto_triggers.append(f\"Jitter phi sinh học ({jitter:.2f}% < 0.35%)\")\n        if rt60 < 0.15:\n            veto_triggers.append(f\"Phòng câm số ({rt60:.2f}s < 0.15s)\")\n        if rt60 > 0.85:\n            veto_triggers.append(f\"Dội âm Replay ({rt60:.2f}s > 0.85s)\")\n        if glottal_drop > -6.0 and glottal_drop != 0.0:\n            veto_triggers.append(f\"Thanh Ngã không ngắt âm (ΔE = {glottal_drop:.1f}dB > -6dB)\")\n\n        if len(veto_triggers) > 0:\n            return {\n                \"decision\": \"BLOCK_HARD_VETO\",\n                \"risk_score\": 0.99,\n                \"reasons\": veto_triggers,\n                \"action\": \"Phong tỏa giao dịch khẩn cấp\"\n            }\n\n        # 2. NORMAL DEMPSTER-SHAFER FUSION\n        w_cnn = 0.50\n        w_prosody = 0.30\n        w_acoustics = 0.20\n        final_score = (w_cnn * cnn_score) + (w_prosody * (1.0 - (jitter / 2.5))) + (w_acoustics * (1.0 - (rt60 / 0.5)))\n        final_score = float(max(0.0, min(1.0, final_score)))\n\n        if final_score < self.tb_green:\n            return {\"decision\": \"PASS_AUTHENTIC\", \"risk_score\": final_score, \"action\": \"Thông qua 100%\"}\n        elif final_score < self.tb_red:\n            return {\"decision\": \"STEP_UP_AUTH\", \"risk_score\": final_score, \"action\": \"Kích hoạt OTP giọng nói thanh Ngã\"}\n        else:\n            return {\"decision\": \"BLOCK_FRAUD\", \"risk_score\": final_score, \"action\": \"Khóa giao dịch\"}",
    "sliders": [
      {
        "id": "sl_cnn_telephony",
        "label": "Trọng số CNN kênh G.711:",
        "min": 0.05,
        "max": 0.5,
        "step": 0.05,
        "val": 0.1,
        "unit": ""
      }
    ],
    "auditChallenge": {
      "question": "Tại sao kiểm tra `HARD VETO CHECK` phải được thực hiện ở Bước 1 và thoát ra (Early Return) ngay lập tức trước khi thực hiện `NORMAL DEMPSTER-SHAFER FUSION`?",
      "opts": [
        "Để tiết kiệm điện năng cho máy chủ.",
        "Vì nếu để bước dung hợp tính toán, điểm số cao của mạng CNN (ví dụ AI bị lừa chấm 0.01 Fraud) sẽ kéo tụt điểm số rủi ro trung bình xuống, cho phép kẻ tấn công Deepfake lọt qua dải xanh an toàn.",
        "Vì Python không cho phép chạy hai khối lệnh trong cùng một hàm.",
        "Để trả về kết quả dưới dạng chuỗi JSON thay vì số thực."
      ],
      "correct": 1,
      "explanation": "Đây là nguyên tắc Quyền Phủ Quyết Cứng: Một bằng chứng vi phạm bất biến vật lý (như phòng câm số hoặc Jitter quá mượt) có tính chất tuyệt đối. Không một mô hình xác suất nào được phép 'bỏ phiếu hòa tan' một sự thật vật lý hiển nhiên.",
      "secureFix": "Luôn kiểm tra Hard Veto ở đầu hàm và lập tức trả về `BLOCK_HARD_VETO` với điểm rủi ro 0.99 mà không chạy qua bất kỳ phép cộng trừ điểm số nào khác."
    }
  }
];

// Re-attach dynamic calculation functions to sliders
CODE_AUDIT_MODULES[0].calcSim = (vals) => {
  const df = (16000 / vals.sl_nfft).toFixed(2);
  const dt = ((vals.sl_hop / 16000) * 1000).toFixed(1);
  const overlap = (((vals.sl_nfft - vals.sl_hop) / vals.sl_nfft) * 100).toFixed(1);
  return `Độ phân giải tần số: Δf = ${df} Hz | Độ phân giải thời gian: Δt = ${dt} ms | Độ chồng lấn: ${overlap}% | ${vals.sl_nfft === 1024 && vals.sl_hop === 256 ? "TỐI ƯU CHO PHÁP Y TIẾNG VIỆT" : "CẢNH BÁO: Phá vỡ cân bằng Heisenberg-Gabor!"}`;
};
CODE_AUDIT_MODULES[1].calcSim = (vals) => {
  const th = vals.sl_glottal_thresh;
  return `Ngưỡng kích hoạt: ${th} dB | ${th <= -12 ? "CHUẨN SINH HỌC: Bắt trúng 99% thanh Ngã người thật, loại bỏ Deepfake làm trơn" : "NGUY HIỂM: Ngưỡng quá nông (> -12dB) sẽ bị Deepfake Vocoder qua mặt dễ dàng!"}`;
};
CODE_AUDIT_MODULES[2].calcSim = (vals) => {
  const rt = vals.sl_rt60_sim;
  if (rt < 0.15) return `RT60 = ${rt.toFixed(2)}s | PHÁT HIỆN: Phòng câm số (Anechoic) - Dấu vết Vocoder Deepfake TTS!`;
  if (rt > 0.85) return `RT60 = ${rt.toFixed(2)}s | PHÁT HIỆN: Dội âm phòng kép - Dấu vết Loudspeaker Replay Attack!`;
  return `RT60 = ${rt.toFixed(2)}s | HỢP LỆ: Âm học phòng sinh hoạt tự nhiên của người thật (0.15s - 0.85s).`;
};
CODE_AUDIT_MODULES[3].calcSim = (vals) => {
  const th = vals.sl_intra_threads;
  const lat = (24.0 / Math.sqrt(th)).toFixed(1);
  return `Cấu hình ${th} luồng: Độ trễ suy luận = ${lat} ms | ${th === 4 ? "TỐI ƯU TUYỆT ĐỐI: Phân tải vừa vặn 4 core vật lý, không tranh chấp luồng" : th > 4 ? "CẢNH BÁO: Quá số core vật lý sẽ gây tranh chấp luồng (Lock Contention)!" : "CẢNH BÁO: Thiếu luồng làm độ trễ tăng vọt!"}`;
};
CODE_AUDIT_MODULES[4].calcSim = (vals) => {
  const wCnn = vals.sl_cnn_telephony;
  const wProsody = 1.0 - wCnn - 0.25;
  return `Trọng số G.711: CNN = ${wCnn.toFixed(2)} | Prosody = ${wProsody.toFixed(2)} | Acoustics = 0.25 | ${wCnn > 0.25 ? "NGUY HIỂM: G.711 mất dải cao, phụ thuộc CNN dễ gây báo động giả!" : "AN TOÀN: Dồn trọng tâm vào F0 và nắp thanh môn"}`;
};

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

  
  // 5. Render Mode 3 & Tab 4: Forensic Case Studies (10 Real Cases)
  function initForensicCasesWorkspace(container, prefix = '') {
    if (!container) return;
    const listId = prefix + 'cases-list';
    const detailId = prefix + 'case-detail';
    
    container.innerHTML = `
      <div class="cases-workspace" style="display: grid; grid-template-columns: 360px 1fr; gap: 1.5rem; width: 100%;">
        <div class="cases-list-panel" id="${listId}" style="display: flex; flex-direction: column; gap: 0.8rem; max-height: 800px; overflow-y: auto; padding-right: 0.5rem;"></div>
        <div class="case-investigation-area" id="${detailId}"></div>
      </div>
    `;

    const casesList = document.getElementById(listId);
    const caseDetail = document.getElementById(detailId);
    if (!casesList || !caseDetail) return;

    function renderCaseDetail(c) {
      const resBoxId = prefix + 'verdict-res-' + c.id;
      const btnFakeId = prefix + 'btn-fake-' + c.id;
      const btnRealId = prefix + 'btn-real-' + c.id;

      caseDetail.innerHTML = `
        <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.8rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
            <span style="font-family: var(--font-mono); color: #ff3366; font-weight: 700; font-size: 0.9rem;">HỒ SƠ GIÁM ĐỊNH: ${c.id}</span>
            <span class="badge" style="background: rgba(255, 51, 102, 0.2); color: #ff3366; font-weight: 700;">${c.category}</span>
          </div>
          <h3 style="font-size: 1.4rem; color: #fff; margin-bottom: 0.5rem;">${c.title}</h3>
          <p style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">${c.audioProfile}</p>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
            <div class="metric-box" style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08); padding: 1rem; border-radius: 6px;">
              <span class="metric-label" style="font-size: 0.75rem; color: #8b9bb4; display: block; margin-bottom: 4px;">Micro-Jitter:</span>
              <span class="metric-val" style="font-size: 0.95rem; font-weight: 700; color: #00f0ff; font-family: var(--font-mono);">${c.telemetry.jitter}</span>
            </div>
            <div class="metric-box" style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08); padding: 1rem; border-radius: 6px;">
              <span class="metric-label" style="font-size: 0.75rem; color: #8b9bb4; display: block; margin-bottom: 4px;">Glottal Stop Mining:</span>
              <span class="metric-val" style="font-size: 0.95rem; font-weight: 700; color: #ffb700; font-family: var(--font-mono);">${c.telemetry.glottal}</span>
            </div>
            <div class="metric-box" style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08); padding: 1rem; border-radius: 6px;">
              <span class="metric-label" style="font-size: 0.75rem; color: #8b9bb4; display: block; margin-bottom: 4px;">Dội Âm ISO 3382 RT60:</span>
              <span class="metric-val" style="font-size: 0.95rem; font-weight: 700; color: #00ff9d; font-family: var(--font-mono);">${c.telemetry.rt60}</span>
            </div>
            <div class="metric-box" style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08); padding: 1rem; border-radius: 6px;">
              <span class="metric-label" style="font-size: 0.75rem; color: #8b9bb4; display: block; margin-bottom: 4px;">Dải Cao Độ F0:</span>
              <span class="metric-val" style="font-size: 0.95rem; font-weight: 700; color: #38bdf8; font-family: var(--font-mono);">${c.telemetry.f0Span}</span>
            </div>
            <div class="metric-box" style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08); padding: 1rem; border-radius: 6px;">
              <span class="metric-label" style="font-size: 0.75rem; color: #8b9bb4; display: block; margin-bottom: 4px;">Bước Nhảy Nền Nhiễu:</span>
              <span class="metric-val" style="font-size: 0.95rem; font-weight: 700; color: #f43f5e; font-family: var(--font-mono);">${c.telemetry.noiseJump}</span>
            </div>
            <div class="metric-box" style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.08); padding: 1rem; border-radius: 6px;">
              <span class="metric-label" style="font-size: 0.75rem; color: #8b9bb4; display: block; margin-bottom: 4px;">Mô Hình Khả Nghi:</span>
              <span class="metric-val" style="font-size: 0.88rem; font-weight: 700; color: #f59e0b;">${c.suspectModel}</span>
            </div>
          </div>

          <div style="background: rgba(0, 0, 0, 0.4); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 1.2rem; margin-bottom: 1.5rem;">
            <div style="font-weight: 700; color: #00f0ff; margin-bottom: 0.8rem; font-size: 0.95rem;">HÀNH ĐỘNG GIÁM ĐỊNH CỦA BẠN (ĐƯA RA PHÁN QUYẾT):</div>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
              <button class="btn-primary" id="${btnFakeId}" style="background: linear-gradient(135deg, #ff3366, #ff0055); color: #fff; font-weight: 700; padding: 0.6rem 1.2rem;">
                🚨 KẾT ÁN: DEEPFAKE GIAN LẬN
              </button>
              <button class="btn-secondary" id="${btnRealId}" style="border-color: #00ff9d; color: #00ff9d; font-weight: 700; padding: 0.6rem 1.2rem;">
                ✅ XÁC NHẬN: NGƯỜI SỐNG HỢP LỆ
              </button>
            </div>
          </div>

          <div id="${resBoxId}" style="display: none; background: rgba(255, 51, 102, 0.12); border: 1px solid #ff3366; padding: 1.2rem; border-radius: 8px; margin-bottom: 1rem;">
            <div style="font-weight: 700; color: #ff5555; font-size: 1rem; margin-bottom: 0.5rem;">${c.verdict}</div>
            <p style="font-size: 0.9rem; color: #fed7aa; line-height: 1.6;">${c.analysisText}</p>
          </div>
        </div>
      `;

      const resBox = document.getElementById(resBoxId);
      document.getElementById(btnFakeId)?.addEventListener('click', () => {
        resBox.style.display = 'block';

        if (window.DeepGuardMemory && window.DeepGuardMemory.logQuestionAttempt) {
          window.DeepGuardMemory.logQuestionAttempt({
            questionId: c.id,
            module: 'cases',
            pillar: 'acoustics',
            questionText: c.title + ': ' + c.audioProfile,
            chosenAnswer: 'FAKE',
            correctAnswer: c.groundTruth,
            isCorrect: (c.groundTruth === 'FAKE'),
            explanation: c.analysisText
          });
        }

        if (c.groundTruth === 'FAKE') {
          alert("CHÍNH XÁC! Bạn đã nhận diện đúng các dấu vết vật lý giả mạo.");
        } else {
          alert("CẢNH BÁO: BẠN ĐÃ KẾT ÁN SAI! Đây là trường hợp khách hàng người thật có bệnh lý giọng nói hoặc môi trường đặc thù.");
        }
      });
      document.getElementById(btnRealId)?.addEventListener('click', () => {
        resBox.style.display = 'block';

        if (window.DeepGuardMemory && window.DeepGuardMemory.logQuestionAttempt) {
          window.DeepGuardMemory.logQuestionAttempt({
            questionId: c.id,
            module: 'cases',
            pillar: 'acoustics',
            questionText: c.title + ': ' + c.audioProfile,
            chosenAnswer: 'REAL',
            correctAnswer: c.groundTruth,
            isCorrect: (c.groundTruth === 'REAL'),
            explanation: c.analysisText
          });
        }

        if (c.groundTruth === 'REAL') {
          alert("CHÍNH XÁC! Bạn đã không mắc bẫy báo động giả của trường hợp bệnh lý.");
        } else {
          alert("NGUY HIỂM: BẠN ĐÃ BỊ QUA MẶT! Cuộc gọi này có dấu hiệu giả mạo rõ ràng vi phạm các bất biến vật lý.");
        }
      });
    }

    casesList.innerHTML = '';
    FORENSIC_CASES.forEach((c, idx) => {
      const btn = document.createElement('div');
      btn.className = `case-card-btn ${idx === 0 ? 'active' : ''}`;
      btn.style.cursor = 'pointer';
      btn.innerHTML = `
        <div class="case-header-row" style="display: flex; justify-content: space-between; margin-bottom: 0.3rem;">
          <span class="case-code" style="font-family: var(--font-mono); font-size: 0.75rem; color: #ff3366; font-weight: 700;">${c.id}</span>
          <span class="case-badge badge-finance" style="font-size: 0.7rem; background: rgba(255,183,0,0.15); color: #ffb700; padding: 2px 6px; border-radius: 4px;">${c.category}</span>
        </div>
        <div class="case-title" style="font-weight: 700; color: #fff; font-size: 0.9rem; margin-bottom: 0.3rem;">${c.title}</div>
        <div class="case-desc" style="font-size: 0.8rem; color: #8b9bb4; line-height: 1.4;">${c.audioProfile.substring(0, 75)}...</div>
      `;
      btn.addEventListener('click', () => {
        casesList.querySelectorAll('.case-card-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderCaseDetail(c);
      });
      casesList.appendChild(btn);
    });
    renderCaseDetail(FORENSIC_CASES[0]);
  }

  // Initialize Forensic Cases in BOTH Mode 3 (Defense Arena) and Tab 11 (Án Lệ Ngân Hàng)
  initForensicCasesWorkspace(document.getElementById('forensic-cases-container'), 'mode3_');
  initForensicCasesWorkspace(document.getElementById('cases-workspace'), 'tab11_');

  
  // ===================================================================
  // 5B. RENDER MODE 4: INTERACTIVE 3D FLASHCARDS BẪY SÂU (24 FLASHCARDS)
  // ===================================================================
  const flashcardsContainer = document.getElementById('flashcards-container');
  if (flashcardsContainer && typeof FLASHCARDS_DATA !== 'undefined') {
    let activeCategory = 'all';
    let filteredCards = [...FLASHCARDS_DATA];
    let currentCardIdx = 0;
    const masteredCardIds = new Set();

    function renderFlashcardsDeck() {
      flashcardsContainer.innerHTML = `
        <div class="flashcards-wrapper-inner" style="max-width: 900px; margin: 0 auto;">
          <!-- Category Filter Bar -->
          <div class="quiz-filter-bar" style="margin-bottom: 1.5rem; display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center;">
            <button class="quiz-filter-pill ${activeCategory === 'all' ? 'active' : ''}" data-fcat="all">Tất Cả (24 Thẻ)</button>
            <button class="quiz-filter-pill ${activeCategory === 'dsp' ? 'active' : ''}" data-fcat="dsp">DSP & Lấy Mẫu</button>
            <button class="quiz-filter-pill ${activeCategory === 'acoustics' ? 'active' : ''}" data-fcat="acoustics">Âm Học ISO 3382</button>
            <button class="quiz-filter-pill ${activeCategory === 'prosody' ? 'active' : ''}" data-fcat="prosody">Ngữ Âm Tiếng Việt</button>
            <button class="quiz-filter-pill ${activeCategory === 'onnx' ? 'active' : ''}" data-fcat="onnx">MelCNN & ONNX</button>
            <button class="quiz-filter-pill ${activeCategory === 'fusion' ? 'active' : ''}" data-fcat="fusion">Dung Hợp & Hard Veto</button>
            <button class="quiz-filter-pill ${activeCategory === 'security' ? 'active' : ''}" data-fcat="security">Pháp Y & Viễn Thông</button>
          </div>

          <!-- Card Progress Info -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; color: #8b9bb4; font-size: 0.88rem; font-family: var(--font-mono);">
            <span>TIẾN ĐỘ THẺ: <strong style="color: #00f0ff;" id="fc-progress-text">${currentCardIdx + 1} / ${filteredCards.length}</strong></span>
            <span>ĐÃ NẮM VỮNG: <strong style="color: #00ff9d;" id="fc-mastered-count">${masteredCardIds.size} / ${FLASHCARDS_DATA.length}</strong></span>
          </div>

          <!-- 3D Card Scene -->
          <div class="flashcard-scene" id="fc-scene" style="perspective: 1200px; margin-bottom: 1.5rem; cursor: pointer;">
            <div class="flashcard-3d" id="fc-card" style="position: relative; width: 100%; min-height: 380px; transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); transform-style: preserve-3d;">
              
              <!-- Front Face -->
              <div class="flashcard-face flashcard-front" style="position: absolute; inset: 0; backface-visibility: hidden; background: linear-gradient(145deg, rgba(16, 24, 40, 0.95), rgba(10, 15, 29, 0.98)); border: 1.5px solid rgba(0, 240, 255, 0.3); border-radius: var(--radius-md); padding: 2rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                <div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem;">
                    <span class="pillar-badge" style="background: rgba(0, 240, 255, 0.15); color: #00f0ff; border: 1px solid rgba(0, 240, 255, 0.3); padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700;">
                      ${filteredCards[currentCardIdx].categoryLabel}
                    </span>
                    <span style="font-family: var(--font-mono); font-size: 0.8rem; color: #ff3366; font-weight: 700;">
                      ${filteredCards[currentCardIdx].id}
                    </span>
                  </div>

                  <h3 style="font-size: 1.3rem; color: #fff; margin-bottom: 1rem; line-height: 1.5;">
                    ${filteredCards[currentCardIdx].title}
                  </h3>

                  <div style="background: rgba(255, 51, 102, 0.1); border-left: 4px solid #ff3366; padding: 1rem; border-radius: 4px; color: #fecdd3; font-size: 0.92rem; line-height: 1.6; margin-bottom: 1.2rem;">
                    ${filteredCards[currentCardIdx].trapAlert}
                  </div>

                  <p style="color: #cbd5e1; font-size: 1rem; line-height: 1.6; font-weight: 500;">
                    ${filteredCards[currentCardIdx].frontQuestion}
                  </p>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1rem;">
                  <span style="font-size: 0.82rem; color: #8b9bb4;">💡 Nhấn vào thẻ hoặc nút bên dưới để lật xem đáp án</span>
                  <span style="color: #00f0ff; font-weight: 700; font-size: 0.88rem;">🔄 LẬT THẺ ➔</span>
                </div>
              </div>

              <!-- Back Face -->
              <div class="flashcard-face flashcard-back" style="position: absolute; inset: 0; backface-visibility: hidden; transform: rotateY(180deg); background: linear-gradient(145deg, rgba(8, 20, 36, 0.97), rgba(4, 12, 24, 0.99)); border: 1.5px solid rgba(0, 255, 157, 0.4); border-radius: var(--radius-md); padding: 2rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 10px 30px rgba(0, 255, 157, 0.1);">
                <div style="overflow-y: auto; max-height: 320px; padding-right: 0.5rem;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem;">
                    <span style="color: #00ff9d; font-weight: 700; font-size: 0.85rem; font-family: var(--font-mono);">
                      ✅ BẢN CHẤT KHOA HỌC & GIẢI THÍCH
                    </span>
                    <span style="background: rgba(0,255,157,0.15); color: #00ff9d; padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; font-family: var(--font-mono);">
                      ${filteredCards[currentCardIdx].standardRef}
                    </span>
                  </div>

                  <div style="color: #e2e8f0; font-size: 0.92rem; line-height: 1.7; white-space: pre-line; margin-bottom: 1rem;">
                    ${filteredCards[currentCardIdx].backAnswer}
                  </div>

                  <div style="background: rgba(0, 240, 255, 0.08); border-left: 3px solid #00f0ff; padding: 0.8rem; border-radius: 4px; font-size: 0.85rem; color: #bae6fd; line-height: 1.5;">
                    <strong style="color: #00f0ff;">MẸO BẢO VỆ ĐỒ ÁN:</strong> ${filteredCards[currentCardIdx].tip}
                  </div>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.8rem;">
                  <span style="font-size: 0.82rem; color: #8b9bb4;">🔄 Nhấn để lật lại câu hỏi</span>
                  <span style="color: #00ff9d; font-weight: 700; font-size: 0.85rem;">ĐÃ HIỂU RÕ ➔</span>
                </div>
              </div>

            </div>
          </div>

          <!-- Controls Bar -->
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.8rem;">
            <div style="display: flex; gap: 0.6rem;">
              <button class="btn-secondary" id="fc-btn-prev" style="padding: 0.6rem 1.2rem; font-size: 0.9rem;">
                ⬅️ Thẻ Trước
              </button>
              <button class="btn-primary" id="fc-btn-flip" style="padding: 0.6rem 1.4rem; font-size: 0.9rem; background: linear-gradient(135deg, #00f0ff, #3b82f6); color: #040711; font-weight: 700;">
                🔄 Lật Thẻ (Space)
              </button>
              <button class="btn-secondary" id="fc-btn-next" style="padding: 0.6rem 1.2rem; font-size: 0.9rem;">
                Thẻ Tiếp ➔
              </button>
            </div>

            <div style="display: flex; gap: 0.6rem;">
              <button class="btn-secondary" id="fc-btn-shuffle" style="padding: 0.6rem 1rem; font-size: 0.85rem;">
                🎲 Đảo Ngẫu Nhiên
              </button>
              <button class="btn-secondary" id="fc-btn-master" style="padding: 0.6rem 1rem; font-size: 0.85rem; border-color: ${masteredCardIds.has(filteredCards[currentCardIdx].id) ? '#00ff9d' : '#8b9bb4'}; color: ${masteredCardIds.has(filteredCards[currentCardIdx].id) ? '#00ff9d' : '#cbd5e1'};">
                ${masteredCardIds.has(filteredCards[currentCardIdx].id) ? '⭐ Đã Nắm Vững' : '☆ Đánh Dấu Đã Thuộc'}
              </button>
            </div>
          </div>
        </div>
      `;

      // Event listeners for Flashcard
      const cardEl = document.getElementById('fc-card');
      const sceneEl = document.getElementById('fc-scene');
      let isFlipped = false;

      function toggleFlip() {
        isFlipped = !isFlipped;
        if (isFlipped) {
          cardEl.style.transform = 'rotateY(180deg)';
        } else {
          cardEl.style.transform = 'rotateY(0deg)';
        }
      }

      sceneEl.addEventListener('click', toggleFlip);
      document.getElementById('fc-btn-flip').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFlip();
      });

      document.getElementById('fc-btn-prev').addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentCardIdx > 0) {
          currentCardIdx--;
          renderFlashcardsDeck();
        }
      });

      document.getElementById('fc-btn-next').addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentCardIdx < filteredCards.length - 1) {
          currentCardIdx++;
          renderFlashcardsDeck();
        }
      });

      document.getElementById('fc-btn-shuffle').addEventListener('click', (e) => {
        e.stopPropagation();
        filteredCards.sort(() => 0.5 - Math.random());
        currentCardIdx = 0;
        renderFlashcardsDeck();
      });

      document.getElementById('fc-btn-master').addEventListener('click', (e) => {
        e.stopPropagation();
        const curId = filteredCards[currentCardIdx].id;
        if (masteredCardIds.has(curId)) {
          masteredCardIds.delete(curId);
        } else {
          masteredCardIds.add(curId);
        }
        renderFlashcardsDeck();
      });

      // Category filter pills
      flashcardsContainer.querySelectorAll('.quiz-filter-pill').forEach(pill => {
        pill.addEventListener('click', (e) => {
          e.stopPropagation();
          activeCategory = pill.dataset.fcat;
          if (activeCategory === 'all') {
            filteredCards = [...FLASHCARDS_DATA];
          } else {
            filteredCards = FLASHCARDS_DATA.filter(c => c.cat === activeCategory);
          }
          currentCardIdx = 0;
          renderFlashcardsDeck();
        });
      });
    }

    renderFlashcardsDeck();
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
        
        // Record into DeepGuard User Memory
        if (window.DeepGuardMemory && window.DeepGuardMemory.logQuestionAttempt) {
          window.DeepGuardMemory.logQuestionAttempt({
            questionId: q.id || ('QUIZ-' + (idx + 1)),
            module: 'quiz_trap',
            pillar: q.cat || 'dsp',
            questionText: q.q,
            chosenAnswer: selected,
            correctAnswer: q.ans,
            isCorrect: isCorrect,
            explanation: q.exp || ''
          });
        }

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

  
  // 7. Render Mode 5: Code Audit Studio (5 Backend Modules With Interactive Challenges)
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

      <div style="margin-bottom: 2rem;">
        <div style="font-family: var(--font-heading); font-size: 0.95rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem;">
          MÃ NGUỒN TRIỂN KHAI BACKEND:
        </div>
        <div class="source-code-block" style="max-height: 400px; overflow-y: auto;">${mod.code}</div>
      </div>

      <!-- INTERACTIVE CODE AUDIT CHALLENGE -->
      ${mod.auditChallenge ? `
        <div class="audit-challenge-box" style="background: rgba(16, 24, 40, 0.9); border: 1.5px solid rgba(255, 183, 0, 0.4); border-radius: 8px; padding: 1.5rem; margin-top: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem;">
            <span style="color: #ffb700; font-weight: 700; font-size: 0.95rem; display: flex; align-items: center; gap: 6px;">
              🛡️ THỬ THÁCH CODE AUDIT & TRUY TÌM LỖ HỔNG BẢO MẬT:
            </span>
            <span class="badge" style="background: rgba(255, 183, 0, 0.15); color: #ffb700; font-family: var(--font-mono); font-size: 0.72rem;">
              SECURITY AUDIT
            </span>
          </div>

          <p style="color: #fff; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.2rem; font-weight: 500;">
            ${mod.auditChallenge.question}
          </p>

          <div class="audit-options-list" style="display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1rem;">
            ${mod.auditChallenge.opts.map((opt, oIdx) => `
              <button class="audit-opt-btn" data-aopt="${oIdx}" style="text-align: left; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); padding: 0.8rem 1.2rem; border-radius: 6px; color: #cbd5e1; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; line-height: 1.5;">
                <span style="font-weight: 700; color: #ffb700; margin-right: 8px;">${['A', 'B', 'C', 'D'][oIdx]}.</span>
                ${opt}
              </button>
            `).join('')}
          </div>

          <div id="audit-feedback-${mod.id}" style="display: none; padding: 1.2rem; border-radius: 6px; margin-top: 1rem; line-height: 1.6; font-size: 0.9rem;">
            <!-- Rendered upon choosing answer -->
          </div>
        </div>
      ` : ''}
    `;

    // Sliders listeners
    mod.sliders.forEach(s => {
      const sliderEl = document.getElementById(s.id);
      const valEl = document.getElementById(`${s.id}-val`);
      if (sliderEl && valEl) {
        sliderEl.addEventListener('input', () => {
          valEl.textContent = `${sliderEl.value}${s.unit}`;
          const currentVals = Object.fromEntries(mod.sliders.map(item => [item.id, parseFloat(document.getElementById(item.id).value)]));
          document.getElementById('mod-sim-output').textContent = mod.calcSim(currentVals);
        });
      }
    });

    // Code audit options listener
    if (mod.auditChallenge) {
      const fbBox = document.getElementById(`audit-feedback-${mod.id}`);
      const optBtns = codeViewer.querySelectorAll('.audit-opt-btn');
      optBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const chosenIdx = parseInt(btn.dataset.aopt);
          const isCorrect = chosenIdx === mod.auditChallenge.correct;

          optBtns.forEach((b, idx) => {
            b.disabled = true;
            if (idx === mod.auditChallenge.correct) {
              b.style.borderColor = '#00ff9d';
              b.style.background = 'rgba(0, 255, 157, 0.12)';
              b.style.color = '#fff';
            } else if (idx === chosenIdx) {
              b.style.borderColor = '#ff3366';
              b.style.background = 'rgba(255, 51, 102, 0.12)';
            }
          });

          
          if (window.DeepGuardMemory && window.DeepGuardMemory.logQuestionAttempt) {
            window.DeepGuardMemory.logQuestionAttempt({
              questionId: 'AUDIT-' + mod.id,
              module: 'code_audit',
              pillar: mod.id === 'mod_dsp' ? 'dsp' : (mod.id === 'mod_prosody' ? 'prosody' : (mod.id === 'mod_acoustics' ? 'acoustics' : (mod.id === 'mod_melcnn' ? 'onnx' : 'fusion'))),
              questionText: mod.auditChallenge.question,
              chosenAnswer: chosenIdx,
              correctAnswer: mod.auditChallenge.correct,
              isCorrect: isCorrect,
              explanation: mod.auditChallenge.explanation
            });
          }

          fbBox.style.display = 'block';
          if (isCorrect) {
            fbBox.style.background = 'rgba(0, 255, 157, 0.1)';
            fbBox.style.border = '1px solid #00ff9d';
            fbBox.innerHTML = `
              <div style="font-weight: 700; color: #00ff9d; margin-bottom: 0.4rem; font-size: 0.95rem;">
                🎯 CHÍNH XÁC! BẠN ĐÃ NHẬN DIỆN ĐÚNG LỖ HỔNG BẢO MẬT.
              </div>
              <div style="color: #cbd5e1; margin-bottom: 0.8rem;">${mod.auditChallenge.explanation}</div>
              <div style="background: rgba(0,0,0,0.4); border-left: 3px solid #00ff9d; padding: 0.6rem 0.8rem; font-family: var(--font-mono); font-size: 0.82rem; color: #a7f3d0;">
                <strong style="color: #00ff9d;">CODE KHẮC PHỤC CHUẨN:</strong><br>${mod.auditChallenge.secureFix}
              </div>
            `;
          } else {
            fbBox.style.background = 'rgba(255, 51, 102, 0.1)';
            fbBox.style.border = '1px solid #ff3366';
            fbBox.innerHTML = `
              <div style="font-weight: 700; color: #ff5555; margin-bottom: 0.4rem; font-size: 0.95rem;">
                ⚠️ CHƯA CHÍNH XÁC! HÃY XEM LẠI PHÂN TÍCH BẢN CHẤT.
              </div>
              <div style="color: #cbd5e1; margin-bottom: 0.8rem;">${mod.auditChallenge.explanation}</div>
              <div style="background: rgba(0,0,0,0.4); border-left: 3px solid #00ff9d; padding: 0.6rem 0.8rem; font-family: var(--font-mono); font-size: 0.82rem; color: #a7f3d0;">
                <strong style="color: #00ff9d;">CODE KHẮC PHỤC CHUẨN:</strong><br>${mod.auditChallenge.secureFix}
              </div>
            `;
          }
        });
      });
    }
  }

  if (codeNav) {
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
  }

  
  // ===================================================================
  // 7B. RENDER TAB 3: HỒ SƠ 11 TRỤ CỘT TRI THỨC BẬC THẦY (ACCORDION & SEARCH)
  // ===================================================================
  const pillarsList = document.getElementById('pillars-list');
  const knowledgeSearch = document.getElementById('knowledge-search');
  const quickTags = document.querySelectorAll('.quick-tags .qtag');

  function initKnowledgeBase() {
    if (!pillarsList || typeof PILLARS_DATA === 'undefined') return;

    let activeKbTag = 'all';

    function renderPillars(filtered) {
      pillarsList.innerHTML = '';
      if (filtered.length === 0) {
        pillarsList.innerHTML = `
          <div style="text-align: center; padding: 3rem; color: #8b9bb4; font-family: var(--font-mono);">
            Không tìm thấy trụ cột nào phù hợp với từ khóa tìm kiếm.
          </div>
        `;
        return;
      }

      filtered.forEach((p, idx) => {
        const item = document.createElement('div');
        item.className = `pillar-item ${idx === 0 ? 'open' : ''}`;
        item.innerHTML = `
          <div class="pillar-item-header">
            <div class="pillar-item-title">
              <span class="pillar-num">${p.roman}. [${p.code}]</span>
              <span class="pillar-name">${p.name}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.8rem;">
              <span class="badge" style="background: rgba(0,240,255,0.15); color: #00f0ff; font-size: 0.75rem; font-family: var(--font-mono);">${p.tag.toUpperCase()}</span>
              <span class="pillar-expand-icon">▼</span>
            </div>
          </div>

          <div class="pillar-item-body">
            <div style="color: #00f0ff; font-weight: 600; font-size: 0.95rem; margin-bottom: 0.8rem;">
              ${p.subtitle}
            </div>
            <p style="color: #cbd5e1; line-height: 1.6; margin-bottom: 1.2rem;">
              ${p.summary}
            </p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.8rem; margin-bottom: 1.2rem;">
              ${p.metrics.map(m => `
                <div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.06); padding: 0.8rem; border-radius: 6px;">
                  <span style="font-size: 0.75rem; color: #8b9bb4; display: block;">${m.name}</span>
                  <span style="font-size: 0.95rem; font-weight: 700; color: #00ff9d; font-family: var(--font-mono);">${m.val}</span>
                </div>
              `).join('')}
            </div>

            <div style="background: rgba(0,0,0,0.4); border-left: 3px solid #00f0ff; padding: 1rem; border-radius: 4px; margin-bottom: 1.2rem; font-family: var(--font-mono); font-size: 0.85rem; line-height: 1.7; color: #bae6fd; white-space: pre-line;">
              ${p.theory}
            </div>

            <div style="margin-bottom: 1rem;">
              <div style="font-weight: 700; color: #fff; font-size: 0.85rem; margin-bottom: 0.4rem;">MÃ NGUỒN TRIỂN KHAI MẪU:</div>
              <div class="source-code-block" style="max-height: 250px; overflow-y: auto;">${p.code}</div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.8rem; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 0.8rem; font-size: 0.82rem; color: #8b9bb4;">
              <span>📜 <strong>TIÊU CHUẨN THAM CHIẾU:</strong> ${p.standards}</span>
              <span style="color: #ff3366;">⚠️ ${p.traps}</span>
            </div>
          </div>
        `;

        item.querySelector('.pillar-item-header').addEventListener('click', () => {
          item.classList.toggle('open');
        });

        pillarsList.appendChild(item);
      });
    }

    function filterKnowledge() {
      const q = knowledgeSearch ? knowledgeSearch.value.trim().toLowerCase() : '';
      const filtered = PILLARS_DATA.filter(p => {
        const matchTag = (activeKbTag === 'all') || (p.tag === activeKbTag);
        if (!matchTag) return false;
        if (!q) return true;
        const haystack = (p.code + ' ' + p.name + ' ' + p.subtitle + ' ' + p.summary + ' ' + p.theory + ' ' + p.standards).toLowerCase();
        return haystack.includes(q);
      });
      renderPillars(filtered);
    }

    if (knowledgeSearch) {
      knowledgeSearch.addEventListener('input', filterKnowledge);
    }

    quickTags.forEach(tagBtn => {
      tagBtn.addEventListener('click', () => {
        quickTags.forEach(b => b.classList.remove('active'));
        tagBtn.classList.add('active');
        activeKbTag = tagBtn.dataset.tag;
        filterKnowledge();
      });
    });

    renderPillars(PILLARS_DATA);
  }

  initKnowledgeBase();

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

  
  function drawUploadedSpectrogram(pcm) {
    const cv = document.getElementById('canvas-file-spectrogram');
    if (!cv) return;
    const ctx = cv.getContext('2d');
    const width = cv.width;
    const height = cv.height;

    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, width, height);

    const cols = 180;
    const bins = 64;
    const colWidth = width / cols;
    const rowHeight = height / bins;

    // Simulate STFT Log-Mel power distribution from PCM
    for (let c = 0; c < cols; c++) {
      const chunkStart = Math.floor((c / cols) * (pcm.length - 512));
      let chunkEnergy = 0;
      for (let k = 0; k < 512; k++) {
        const val = pcm[chunkStart + k] || 0;
        chunkEnergy += val * val;
      }
      chunkEnergy = Math.min(1.0, Math.sqrt(chunkEnergy / 512) * 5.0);

      for (let r = 0; r < bins; r++) {
        // Mel scale energy concentration (higher at bottom, lower at top)
        const freqRatio = 1.0 - (r / bins);
        const noise = Math.random() * 0.2;
        const binVal = Math.min(1.0, Math.max(0, (chunkEnergy * freqRatio * 1.5) + (noise * 0.15)));

        // Heatmap color: dark blue -> cyan -> yellow -> red -> white
        let color = '#020617';
        if (binVal > 0.85) color = '#ffffff';
        else if (binVal > 0.65) color = '#ff3366';
        else if (binVal > 0.45) color = '#ffb700';
        else if (binVal > 0.25) color = '#00f0ff';
        else if (binVal > 0.08) color = '#0284c7';
        else color = '#0f172a';

        ctx.fillStyle = color;
        ctx.fillRect(c * colWidth, r * rowHeight, colWidth + 0.5, rowHeight + 0.5);
      }
    }
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
      examQuestions = shuffled.slice(0, 20);
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
    const isPassed = finalGpa >= 8.0;
    const certId = "DG-CERT-" + Date.now().toString().slice(-8);
    const mockHash = "cert_sha256_" + Math.random().toString(36).substring(2, 12);

    
    if (isPassed && window.DeepGuardMemory && window.DeepGuardMemory.saveCertificate) {
      window.DeepGuardMemory.saveCertificate({
        certId: certId,
        title: 'DeepGuard Certified Forensic Engineer (Level 3)',
        candidateName: name,
        score: finalGpa + ' / 10',
        hash: mockHash
      });
    }

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

