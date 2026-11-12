/**
 * DEEPGUARD AI ENTERPRISE - MASTER QUESTION REPOSITORY
 * 105 COMPREHENSIVE DEFENSE & FORENSIC QUESTIONS
 */

const MASTER_QUESTIONS_100 = [
  {
    "id": 11,
    "code": "1.1",
    "pillar": 1,
    "pillarTitle": "Phân Khu 1: Xử Lý Tín Hiệu Âm Thanh Số (DSP Foundations)",
    "title": "Tần số lấy mẫu tối ưu 16kHz & Định lý Nyquist-Shannon",
    "difficulty": "CƠ BẢN",
    "question": "Tại sao 16kHz là tần số chuẩn tuyệt đối cho giám định pháp y tiếng nói thay vì 44.1kHz hay 48kHz?",
    "physics": "Tần số thoại người hữu ích < 7500Hz. F_Nyquist = 8000Hz là đủ trọn vẹn 4 formant F1-F4. Giảm 66.7% FLOPS so với 48kHz.",
    "mathProof": "f_Nyquist = f_s / 2 = 8,000 Hz. FLOPS giảm theo tỷ lệ bậc 1 với độ dài chuỗi STFT.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">DSP PIPELINE: 16kHz POLYPHASE -> STFT (1024/256) -> LOG-MEL 80 BINS</text><line x1=\"50\" y1=\"120\" x2=\"600\" y2=\"120\" stroke=\"#334155\" stroke-width=\"1.5\"/><path d=\"M 50 120 Q 90 20 130 120 T 210 120 T 290 120 T 370 120 T 450 120 T 530 120\" fill=\"none\" stroke=\"#00f0ff\" stroke-width=\"2.5\"/><text x=\"50\" y=\"145\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\">Cửa sổ Hann 1024 mẫu (64ms)</text><text x=\"400\" y=\"145\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"9\">Bước nhảy hop 256 (16ms - Overlap 75%)</text></svg>",
    "standardCitation": "ITU-T G.722 Wideband Standard, ASVspoof 2021 Benchmark Guidelines.",
    "keyKeywords": [
      "Nyquist",
      "16kHz",
      "Formant",
      "FLOPS",
      "Nyquist-Shannon"
    ]
  },
  {
    "id": 12,
    "code": "1.2",
    "pillar": 1,
    "pillarTitle": "Phân Khu 1: Xử Lý Tín Hiệu Âm Thanh Số (DSP Foundations)",
    "title": "Polyphase Resampling vs Linear Interpolation",
    "difficulty": "CAO CẤP",
    "question": "Tại sao cấm dùng Linear Interpolation khi hạ mẫu từ 44.1kHz về 16kHz trong pháp y?",
    "physics": "Nội suy tuyến tính có đáp ứng sinc^2 suy hao dải chặn chỉ -26dB, gây hiện tượng răng cưa Aliasing gập tần số cao vào dải 0-8kHz. Polyphase lọc FIR đạt suy hao > 80dB.",
    "mathProof": "x_resampled[m] = SUM_{k} x[k] * h_sub[m*M - k*L]. Độ suy hao Stopband Attenuation > 80dB.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">DSP PIPELINE: 16kHz POLYPHASE -> STFT (1024/256) -> LOG-MEL 80 BINS</text><line x1=\"50\" y1=\"120\" x2=\"600\" y2=\"120\" stroke=\"#334155\" stroke-width=\"1.5\"/><path d=\"M 50 120 Q 90 20 130 120 T 210 120 T 290 120 T 370 120 T 450 120 T 530 120\" fill=\"none\" stroke=\"#00f0ff\" stroke-width=\"2.5\"/><text x=\"50\" y=\"145\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\">Cửa sổ Hann 1024 mẫu (64ms)</text><text x=\"400\" y=\"145\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"9\">Bước nhảy hop 256 (16ms - Overlap 75%)</text></svg>",
    "standardCitation": "Oppenheim & Schafer, 'Discrete-Time Signal Processing', Prentice Hall.",
    "keyKeywords": [
      "Polyphase",
      "Linear Interpolation",
      "Aliasing",
      "Stopband",
      "Răng cưa"
    ]
  },
  {
    "id": 13,
    "code": "1.3",
    "pillar": 1,
    "pillarTitle": "Phân Khu 1: Xử Lý Tín Hiệu Âm Thanh Số (DSP Foundations)",
    "title": "Cửa sổ Hann 1024 mẫu & Hop 256 mẫu",
    "difficulty": "TRUNG CẤP",
    "question": "Cửa sổ Hann 1024 và hop 256 thỏa hiệp với Nguyên lý bất định Heisenberg-Gabor thế nào?",
    "physics": "Delta t * Delta f >= 1/(4*pi). N=1024 cho độ phân giải tần số 15.625Hz (bắt được F0=85-300Hz), hop 256 cho độ phân giải thời gian 16ms (bắt trọn cú siết nắp thanh môn 20-60ms).",
    "mathProof": "Delta f = 16000 / 1024 = 15.625 Hz; Delta t = 256 / 16000 = 16 ms. Overlap = (1024-256)/1024 = 75%.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">DSP PIPELINE: 16kHz POLYPHASE -> STFT (1024/256) -> LOG-MEL 80 BINS</text><line x1=\"50\" y1=\"120\" x2=\"600\" y2=\"120\" stroke=\"#334155\" stroke-width=\"1.5\"/><path d=\"M 50 120 Q 90 20 130 120 T 210 120 T 290 120 T 370 120 T 450 120 T 530 120\" fill=\"none\" stroke=\"#00f0ff\" stroke-width=\"2.5\"/><text x=\"50\" y=\"145\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\">Cửa sổ Hann 1024 mẫu (64ms)</text><text x=\"400\" y=\"145\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"9\">Bước nhảy hop 256 (16ms - Overlap 75%)</text></svg>",
    "standardCitation": "Heisenberg, W. (1927); Gabor, D. (1946) 'Theory of Communication'.",
    "keyKeywords": [
      "Heisenberg",
      "Gabor",
      "Hann",
      "Hop",
      "15.625Hz",
      "16ms"
    ]
  },
  {
    "id": 14,
    "code": "1.4",
    "pillar": 1,
    "pillarTitle": "Phân Khu 1: Xử Lý Tín Hiệu Âm Thanh Số (DSP Foundations)",
    "title": "Bộ lọc tiền nhấn Pre-emphasis (α = 0.97)",
    "difficulty": "TRUNG CẤP",
    "question": "Mục đích vật lý của bộ lọc FIR tiền nhấn y[n] = x[n] - 0.97*x[n-1] là gì?",
    "physics": "Bức xạ âm thanh từ môi miệng làm suy giảm năng lượng tần số cao với tốc độ -6dB/octave. Pre-emphasis làm phẳng phổ (spectral flattening), tăng SNR cho các formant cao F3-F4.",
    "mathProof": "H(z) = 1 - alpha * z^(-1), alpha = 0.97. Bù trừ độ dốc suy hao bức xạ môi miệng +6dB/octave.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">DSP PIPELINE: 16kHz POLYPHASE -> STFT (1024/256) -> LOG-MEL 80 BINS</text><line x1=\"50\" y1=\"120\" x2=\"600\" y2=\"120\" stroke=\"#334155\" stroke-width=\"1.5\"/><path d=\"M 50 120 Q 90 20 130 120 T 210 120 T 290 120 T 370 120 T 450 120 T 530 120\" fill=\"none\" stroke=\"#00f0ff\" stroke-width=\"2.5\"/><text x=\"50\" y=\"145\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\">Cửa sổ Hann 1024 mẫu (64ms)</text><text x=\"400\" y=\"145\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"9\">Bước nhảy hop 256 (16ms - Overlap 75%)</text></svg>",
    "standardCitation": "Fant, G. (1960) 'Acoustic Theory of Speech Production'.",
    "keyKeywords": [
      "Pre-emphasis",
      "0.97",
      "Bức xạ môi",
      "Formant",
      "-6dB/octave"
    ]
  },
  {
    "id": 15,
    "code": "1.5",
    "pillar": 1,
    "pillarTitle": "Phân Khu 1: Xử Lý Tín Hiệu Âm Thanh Số (DSP Foundations)",
    "title": "Log-Mel Filterbank 80 Bins (100Hz - 8000Hz)",
    "difficulty": "TRUNG CẤP",
    "question": "Tại sao dùng thang đo Mel phi tuyến 80 bins thay vì thang tần số tuyến tính Hertz?",
    "physics": "Ốc tai người cảm nhận cao độ theo hàm logarit phi tuyến (dưới 1000Hz tuyến tính, trên 1000Hz theo logarit). Mel scale mô phỏng chính xác màng đáy ốc tai (basilar membrane).",
    "mathProof": "Mel(f) = 2595 * log10(1 + f / 700). 80 bộ lọc tam giác phủ kín từ 100Hz đến 8000Hz.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">DSP PIPELINE: 16kHz POLYPHASE -> STFT (1024/256) -> LOG-MEL 80 BINS</text><line x1=\"50\" y1=\"120\" x2=\"600\" y2=\"120\" stroke=\"#334155\" stroke-width=\"1.5\"/><path d=\"M 50 120 Q 90 20 130 120 T 210 120 T 290 120 T 370 120 T 450 120 T 530 120\" fill=\"none\" stroke=\"#00f0ff\" stroke-width=\"2.5\"/><text x=\"50\" y=\"145\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\">Cửa sổ Hann 1024 mẫu (64ms)</text><text x=\"400\" y=\"145\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"9\">Bước nhảy hop 256 (16ms - Overlap 75%)</text></svg>",
    "standardCitation": "Stevens, S. S., Volkmann, J., & Newman, E. B. (1937) 'A Scale for the Measurement of Pitch'.",
    "keyKeywords": [
      "Mel",
      "80 Bins",
      "Ốc tai",
      "Màng đáy",
      "Log-Mel"
    ]
  },
  {
    "id": 16,
    "code": "1.6",
    "pillar": 1,
    "pillarTitle": "Phân Khu 1: Xử Lý Tín Hiệu Âm Thanh Số (DSP Foundations)",
    "title": "STFT vs Continuous Wavelet Transform (CWT)",
    "difficulty": "CHUYÊN GIA",
    "question": "Khi nào STFT vượt trội hơn Wavelet trong bóc tách deepfake voice?",
    "physics": "STFT cho lưới thời gian - tần số đồng nhất (Uniform Grid), phù hợp trực tiếp với các phép tích chập Conv2D chuẩn của mạng nơ-ron học sâu. CWT phức tạp tính toán và khó lượng tử hóa ONNX.",
    "mathProof": "X(t, f) = INTEGRAL x(tau) * w(tau - t) * e^(-j*2*pi*f*tau) dtau. Độ phức tạp O(N log N) với FFT.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">DSP PIPELINE: 16kHz POLYPHASE -> STFT (1024/256) -> LOG-MEL 80 BINS</text><line x1=\"50\" y1=\"120\" x2=\"600\" y2=\"120\" stroke=\"#334155\" stroke-width=\"1.5\"/><path d=\"M 50 120 Q 90 20 130 120 T 210 120 T 290 120 T 370 120 T 450 120 T 530 120\" fill=\"none\" stroke=\"#00f0ff\" stroke-width=\"2.5\"/><text x=\"50\" y=\"145\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\">Cửa sổ Hann 1024 mẫu (64ms)</text><text x=\"400\" y=\"145\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"9\">Bước nhảy hop 256 (16ms - Overlap 75%)</text></svg>",
    "standardCitation": "Mallat, S. (2008) 'A Wavelet Tour of Signal Processing'.",
    "keyKeywords": [
      "STFT",
      "Wavelet",
      "CWT",
      "Lưới đồng nhất",
      "Conv2D"
    ]
  },
  {
    "id": 17,
    "code": "1.7",
    "pillar": 1,
    "pillarTitle": "Phân Khu 1: Xử Lý Tín Hiệu Âm Thanh Số (DSP Foundations)",
    "title": "Tác động của Zero-Padding trong FFT",
    "difficulty": "TRUNG CẤP",
    "question": "Zero-padding có làm tăng độ phân giải tần số vật lý của tín hiệu không?",
    "physics": "Không. Zero-padding chỉ làm mịn đường vẽ phổ bằng cách nội suy hàm sinc trên miền tần số (sinc interpolation), không tạo thêm bất kỳ thông tin tần số mới nào.",
    "mathProof": "Delta f_physical = f_s / N_actual. Zero-padding lên N_pad chỉ làm giảm bước vẽ d_f = f_s / N_pad.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">DSP PIPELINE: 16kHz POLYPHASE -> STFT (1024/256) -> LOG-MEL 80 BINS</text><line x1=\"50\" y1=\"120\" x2=\"600\" y2=\"120\" stroke=\"#334155\" stroke-width=\"1.5\"/><path d=\"M 50 120 Q 90 20 130 120 T 210 120 T 290 120 T 370 120 T 450 120 T 530 120\" fill=\"none\" stroke=\"#00f0ff\" stroke-width=\"2.5\"/><text x=\"50\" y=\"145\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\">Cửa sổ Hann 1024 mẫu (64ms)</text><text x=\"400\" y=\"145\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"9\">Bước nhảy hop 256 (16ms - Overlap 75%)</text></svg>",
    "standardCitation": "Proakis, J. G., & Manolakis, D. G. 'Digital Signal Processing'.",
    "keyKeywords": [
      "Zero-padding",
      "Nội suy",
      "Độ phân giải vật lý",
      "Sinc"
    ]
  },
  {
    "id": 18,
    "code": "1.8",
    "pillar": 1,
    "pillarTitle": "Phân Khu 1: Xử Lý Tín Hiệu Âm Thanh Số (DSP Foundations)",
    "title": "Hiện tượng rò rỉ phổ (Spectral Leakage) & Các hàm cửa sổ",
    "difficulty": "TRUNG CẤP",
    "question": "Tại sao cửa sổ chữ nhật (Rectangular) bị cấm ngặt nghèo trong phân tích phổ âm thanh?",
    "physics": "Cửa sổ chữ nhật có búp sóng phụ (sidelobe) chỉ suy giảm -13dB, làm rò rỉ năng lượng của tần số mạnh sang che lấp hoàn toàn các tần số yếu lân cận. Hann đạt -31dB, Blackman đạt -58dB.",
    "mathProof": "Sidelobe Attenuation: Rectangular = -13dB; Hann = -31dB; Blackman = -58dB; Kaiser (beta=8) = -80dB.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">DSP PIPELINE: 16kHz POLYPHASE -> STFT (1024/256) -> LOG-MEL 80 BINS</text><line x1=\"50\" y1=\"120\" x2=\"600\" y2=\"120\" stroke=\"#334155\" stroke-width=\"1.5\"/><path d=\"M 50 120 Q 90 20 130 120 T 210 120 T 290 120 T 370 120 T 450 120 T 530 120\" fill=\"none\" stroke=\"#00f0ff\" stroke-width=\"2.5\"/><text x=\"50\" y=\"145\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\">Cửa sổ Hann 1024 mẫu (64ms)</text><text x=\"400\" y=\"145\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"9\">Bước nhảy hop 256 (16ms - Overlap 75%)</text></svg>",
    "standardCitation": "Harris, F. J. (1978) 'On the Use of Windows for Harmonic Analysis with Discrete Fourier Transform'.",
    "keyKeywords": [
      "Rò rỉ phổ",
      "Spectral Leakage",
      "Sidelobe",
      "Búp sóng phụ",
      "Hann"
    ]
  },
  {
    "id": 19,
    "code": "1.9",
    "pillar": 1,
    "pillarTitle": "Phân Khu 1: Xử Lý Tín Hiệu Âm Thanh Số (DSP Foundations)",
    "title": "Khôi phục pha (Phase Retrieval) & Thuật toán Griffin-Lim",
    "difficulty": "CHUYÊN GIA",
    "question": "Tại sao các tệp âm thanh khôi phục bằng Griffin-Lim dễ dàng bị DeepGuard kết án 100% FAKE?",
    "physics": "Griffin-Lim ước lượng pha bằng cách chiếu lặp đi lặp lại giữa miền thời gian và tần số, sinh ra hiện tượng rỗng pha ngẫu nhiên và nhiễu kim loại (metallic robotic artifact).",
    "mathProof": "x^(i+1) = iSTFT( |X| * exp( j * angle( STFT(x^(i)) ) ) ). Khuyết pha làm mất tính kết hợp sóng âm (phase coherence).",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">DSP PIPELINE: 16kHz POLYPHASE -> STFT (1024/256) -> LOG-MEL 80 BINS</text><line x1=\"50\" y1=\"120\" x2=\"600\" y2=\"120\" stroke=\"#334155\" stroke-width=\"1.5\"/><path d=\"M 50 120 Q 90 20 130 120 T 210 120 T 290 120 T 370 120 T 450 120 T 530 120\" fill=\"none\" stroke=\"#00f0ff\" stroke-width=\"2.5\"/><text x=\"50\" y=\"145\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\">Cửa sổ Hann 1024 mẫu (64ms)</text><text x=\"400\" y=\"145\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"9\">Bước nhảy hop 256 (16ms - Overlap 75%)</text></svg>",
    "standardCitation": "Griffin, D., & Lim, J. (1984) 'Signal Estimation from Modified Short-Time Fourier Transform'.",
    "keyKeywords": [
      "Griffin-Lim",
      "Pha",
      "Phase Retrieval",
      "Metallic",
      "Robot"
    ]
  },
  {
    "id": 110,
    "code": "1.10",
    "pillar": 1,
    "pillarTitle": "Phân Khu 1: Xử Lý Tín Hiệu Âm Thanh Số (DSP Foundations)",
    "title": "Hiện tượng méo cắt đỉnh biên độ (Dynamic Range Clipping)",
    "difficulty": "TRUNG CẤP",
    "question": "Khi kẻ tấn công khuếch đại tín hiệu vượt quá 0dBFS, phổ tín hiệu biến dạng thế nào?",
    "physics": "Clipping tạo ra các sóng vuông giả tạo, sinh ra vô số họa âm bậc lẻ (odd harmonics) trải dài vô tận lên tận dải cao tần, làm sập bộ bóc tách năng lượng formant.",
    "mathProof": "y[n] = sign(x[n]) * min(|x[n]|, 1.0). Chuỗi Fourier của sóng xén đỉnh chứa các thành phần (2k+1)*f0 với biên độ 1/(2k+1).",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">DSP PIPELINE: 16kHz POLYPHASE -> STFT (1024/256) -> LOG-MEL 80 BINS</text><line x1=\"50\" y1=\"120\" x2=\"600\" y2=\"120\" stroke=\"#334155\" stroke-width=\"1.5\"/><path d=\"M 50 120 Q 90 20 130 120 T 210 120 T 290 120 T 370 120 T 450 120 T 530 120\" fill=\"none\" stroke=\"#00f0ff\" stroke-width=\"2.5\"/><text x=\"50\" y=\"145\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\">Cửa sổ Hann 1024 mẫu (64ms)</text><text x=\"400\" y=\"145\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"9\">Bước nhảy hop 256 (16ms - Overlap 75%)</text></svg>",
    "standardCitation": "ITU-R BS.1770-4 'Algorithms to Measure Audio Programme Loudness'.",
    "keyKeywords": [
      "Clipping",
      "0dBFS",
      "Họa âm bậc lẻ",
      "Cắt đỉnh",
      "Méo"
    ]
  },
  {
    "id": 21,
    "code": "2.1",
    "pillar": 2,
    "pillarTitle": "Phân Khu 2: Vật Lý Âm Học Phòng ISO 3382 & Tấn Công Replay",
    "title": "Tích phân lùi Schroeder (Schroeder Backward Integration)",
    "difficulty": "CAO CẤP",
    "question": "Trình bày nguồn gốc giải tích của Tích phân lùi Schroeder và lý do nó vượt trội hơn bình phương xung?",
    "physics": "Bình phương đáp ứng xung h^2(t) bị nhiễu loạn do giao thoa pha ngẫu nhiên. Tích phân lùi E(t) = ∫_t^∞ h^2(τ)dτ loại bỏ toàn bộ thăng giáng, tạo đường dốc suy giảm trơn tuyệt đối.",
    "mathProof": "E(t) = INTEGRAL_{t}^{infinity} h^2(tau) dtau; L(t) = 10 * log10( E(t) / E(0) ).",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">ISO 3382: SCHROEDER INTEGRATION (T20 -> RT60)</text><line x1=\"50\" y1=\"35\" x2=\"50\" y2=\"140\" stroke=\"#475569\" stroke-width=\"1.5\"/><line x1=\"50\" y1=\"140\" x2=\"600\" y2=\"140\" stroke=\"#475569\" stroke-width=\"1.5\"/><line x1=\"50\" y1=\"60\" x2=\"580\" y2=\"60\" stroke=\"#1e293b\" stroke-dasharray=\"3,3\"/><text x=\"15\" y=\"63\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\">-5dB</text><line x1=\"50\" y1=\"105\" x2=\"580\" y2=\"105\" stroke=\"#1e293b\" stroke-dasharray=\"3,3\"/><text x=\"10\" y=\"108\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\">-25dB</text><path d=\"M 50 45 L 140 60 L 320 105 L 480 140\" fill=\"none\" stroke=\"#00ff9d\" stroke-width=\"2.5\"/><text x=\"180\" y=\"125\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">T20 = 0.127s -> RT60 = 3*T20 = 0.38s (Pass Liveness)</text></svg>",
    "standardCitation": "Schroeder, M. R. (1979) 'Integrated-Impulse Method Measuring Reverberation Time', JASA.",
    "keyKeywords": [
      "Schroeder",
      "Tích phân lùi",
      "E(t)",
      "Trơn",
      "ISO 3382"
    ]
  },
  {
    "id": 22,
    "code": "2.2",
    "pillar": 2,
    "pillarTitle": "Phân Khu 2: Vật Lý Âm Học Phòng ISO 3382 & Tấn Công Replay",
    "title": "Đo đạc T20 và quy đổi RT60 theo chuẩn ISO 3382",
    "difficulty": "TRUNG CẤP",
    "question": "Tại sao DeepGuard đo T20 thay vì đo trực tiếp T60 hay T30?",
    "physics": "Trong cuộc gọi thực tế, SNR hiếm khi vượt quá 35-45dB. Sau khi rơi 30dB âm thanh đã chạm sàn nhiễu môi trường. Đo T20 (-5dB đến -25dB) nằm hoàn toàn trong vùng tín hiệu sạch.",
    "mathProof": "RT60 = 3 * T20 = 3 * (t_{-25dB} - t_{-5dB}). Chuẩn hóa theo mục 5.2 của ISO 3382-1:2009.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">ISO 3382: SCHROEDER INTEGRATION (T20 -> RT60)</text><line x1=\"50\" y1=\"35\" x2=\"50\" y2=\"140\" stroke=\"#475569\" stroke-width=\"1.5\"/><line x1=\"50\" y1=\"140\" x2=\"600\" y2=\"140\" stroke=\"#475569\" stroke-width=\"1.5\"/><line x1=\"50\" y1=\"60\" x2=\"580\" y2=\"60\" stroke=\"#1e293b\" stroke-dasharray=\"3,3\"/><text x=\"15\" y=\"63\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\">-5dB</text><line x1=\"50\" y1=\"105\" x2=\"580\" y2=\"105\" stroke=\"#1e293b\" stroke-dasharray=\"3,3\"/><text x=\"10\" y=\"108\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\">-25dB</text><path d=\"M 50 45 L 140 60 L 320 105 L 480 140\" fill=\"none\" stroke=\"#00ff9d\" stroke-width=\"2.5\"/><text x=\"180\" y=\"125\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">T20 = 0.127s -> RT60 = 3*T20 = 0.38s (Pass Liveness)</text></svg>",
    "standardCitation": "ISO 3382-1:2009 'Measurement of Room Acoustic Parameters'.",
    "keyKeywords": [
      "T20",
      "RT60",
      "3*T20",
      "-5dB",
      "-25dB",
      "ISO 3382"
    ]
  },
  {
    "id": 23,
    "code": "2.3",
    "pillar": 2,
    "pillarTitle": "Phân Khu 2: Vật Lý Âm Học Phòng ISO 3382 & Tấn Công Replay",
    "title": "Hiện tượng lọc lược (Comb-Filtering) trong Replay Attack",
    "difficulty": "CAO CẤP",
    "question": "Sóng âm phát lại qua loa tạo ra hiện tượng giao thoa lọc lược trên phổ như thế nào?",
    "physics": "Sóng truyền theo 2 đường: trực tiếp và phản xạ với độ trễ tau. Giao thoa tạo ra các rãnh suy hao tuần hoàn delta_f = 1/tau trên phổ biên độ.",
    "mathProof": "|H(f)|^2 = 1 + alpha^2 + 2*alpha*cos(2*pi*f*tau). f_notch = (2k+1)/(2*tau).",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">ISO 3382: SCHROEDER INTEGRATION (T20 -> RT60)</text><line x1=\"50\" y1=\"35\" x2=\"50\" y2=\"140\" stroke=\"#475569\" stroke-width=\"1.5\"/><line x1=\"50\" y1=\"140\" x2=\"600\" y2=\"140\" stroke=\"#475569\" stroke-width=\"1.5\"/><line x1=\"50\" y1=\"60\" x2=\"580\" y2=\"60\" stroke=\"#1e293b\" stroke-dasharray=\"3,3\"/><text x=\"15\" y=\"63\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\">-5dB</text><line x1=\"50\" y1=\"105\" x2=\"580\" y2=\"105\" stroke=\"#1e293b\" stroke-dasharray=\"3,3\"/><text x=\"10\" y=\"108\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\">-25dB</text><path d=\"M 50 45 L 140 60 L 320 105 L 480 140\" fill=\"none\" stroke=\"#00ff9d\" stroke-width=\"2.5\"/><text x=\"180\" y=\"125\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">T20 = 0.127s -> RT60 = 3*T20 = 0.38s (Pass Liveness)</text></svg>",
    "standardCitation": "Kuhl, W. (1965) 'Comb Filter Effect in Room Acoustics'.",
    "keyKeywords": [
      "Comb-filtering",
      "Lọc lược",
      "Replay",
      "tau",
      "f_notch"
    ]
  },
  {
    "id": 24,
    "code": "2.4",
    "pillar": 2,
    "pillarTitle": "Phân Khu 2: Vật Lý Âm Học Phòng ISO 3382 & Tấn Công Replay",
    "title": "Thời gian suy giảm sớm (Early Decay Time - EDT)",
    "difficulty": "CHUYÊN GIA",
    "question": "EDT (-0dB đến -10dB quy đổi 6x) phản ánh điều gì khác biệt so với RT60?",
    "physics": "EDT phản ánh cảm nhận chủ quan của tai người về độ vang trong 100ms đầu tiên do các phản xạ sớm (early reflections), rất nhạy cảm với khoảng cách từ miệng tới micro.",
    "mathProof": "EDT = 6 * (t_{-10dB} - t_{0dB}). Khác với RT60 vốn đo trường khuếch tán muộn (late diffuse field).",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">ISO 3382: SCHROEDER INTEGRATION (T20 -> RT60)</text><line x1=\"50\" y1=\"35\" x2=\"50\" y2=\"140\" stroke=\"#475569\" stroke-width=\"1.5\"/><line x1=\"50\" y1=\"140\" x2=\"600\" y2=\"140\" stroke=\"#475569\" stroke-width=\"1.5\"/><line x1=\"50\" y1=\"60\" x2=\"580\" y2=\"60\" stroke=\"#1e293b\" stroke-dasharray=\"3,3\"/><text x=\"15\" y=\"63\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\">-5dB</text><line x1=\"50\" y1=\"105\" x2=\"580\" y2=\"105\" stroke=\"#1e293b\" stroke-dasharray=\"3,3\"/><text x=\"10\" y=\"108\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\">-25dB</text><path d=\"M 50 45 L 140 60 L 320 105 L 480 140\" fill=\"none\" stroke=\"#00ff9d\" stroke-width=\"2.5\"/><text x=\"180\" y=\"125\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">T20 = 0.127s -> RT60 = 3*T20 = 0.38s (Pass Liveness)</text></svg>",
    "standardCitation": "Jordan, V. L. (1970) 'Acoustical Design of Concert Halls'.",
    "keyKeywords": [
      "EDT",
      "Early Decay",
      "Phản xạ sớm",
      "RT60",
      "6*T10"
    ]
  },
  {
    "id": 25,
    "code": "2.5",
    "pillar": 2,
    "pillarTitle": "Phân Khu 2: Vật Lý Âm Học Phòng ISO 3382 & Tấn Công Replay",
    "title": "Tỷ lệ năng lượng trực tiếp trên dội âm (DRR)",
    "difficulty": "TRUNG CẤP",
    "question": "DRR (Direct-to-Reverberant Ratio) giúp bóc mẽ việc kẻ tấn công dí sát loa vào micro ra sao?",
    "physics": "Khi dí sát loa vào micro, DRR > 20dB (sóng trực tiếp áp đảo hoàn toàn), trong khi cuộc gọi tự nhiên có người cầm điện thoại cách 5-15cm luôn có DRR từ 6dB đến 14dB.",
    "mathProof": "DRR = 10 * log10( INTEGRAL_{0}^{t_d} h^2(t) dt / INTEGRAL_{t_d}^{infinity} h^2(t) dt ), t_d = 2.5ms.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">ISO 3382: SCHROEDER INTEGRATION (T20 -> RT60)</text><line x1=\"50\" y1=\"35\" x2=\"50\" y2=\"140\" stroke=\"#475569\" stroke-width=\"1.5\"/><line x1=\"50\" y1=\"140\" x2=\"600\" y2=\"140\" stroke=\"#475569\" stroke-width=\"1.5\"/><line x1=\"50\" y1=\"60\" x2=\"580\" y2=\"60\" stroke=\"#1e293b\" stroke-dasharray=\"3,3\"/><text x=\"15\" y=\"63\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\">-5dB</text><line x1=\"50\" y1=\"105\" x2=\"580\" y2=\"105\" stroke=\"#1e293b\" stroke-dasharray=\"3,3\"/><text x=\"10\" y=\"108\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\">-25dB</text><path d=\"M 50 45 L 140 60 L 320 105 L 480 140\" fill=\"none\" stroke=\"#00ff9d\" stroke-width=\"2.5\"/><text x=\"180\" y=\"125\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">T20 = 0.127s -> RT60 = 3*T20 = 0.38s (Pass Liveness)</text></svg>",
    "standardCitation": "Zahorik, P. (2002) 'Direct-to-reverberant energy ratio sensitivity'.",
    "keyKeywords": [
      "DRR",
      "Direct-to-Reverberant",
      "Dí sát loa",
      "Trực tiếp",
      "Dội âm"
    ]
  },
  {
    "id": 26,
    "code": "2.6",
    "pillar": 2,
    "pillarTitle": "Phân Khu 2: Vật Lý Âm Học Phòng ISO 3382 & Tấn Công Replay",
    "title": "Độ trong âm thanh C50 (Clarity Index)",
    "difficulty": "TRUNG CẤP",
    "question": "Chỉ số C50 phân định âm thanh phòng họp và phòng câm ảo như thế nào?",
    "physics": "C50 so sánh năng lượng trong 50ms đầu với phần còn lại. Phòng câm ảo có C50 > 30dB (hoàn toàn không có năng lượng sau 50ms), kích hoạt Hard Veto phòng câm.",
    "mathProof": "C50 = 10 * log10( INTEGRAL_{0}^{50ms} h^2(t) dt / INTEGRAL_{50ms}^{infinity} h^2(t) dt ).",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">ISO 3382: SCHROEDER INTEGRATION (T20 -> RT60)</text><line x1=\"50\" y1=\"35\" x2=\"50\" y2=\"140\" stroke=\"#475569\" stroke-width=\"1.5\"/><line x1=\"50\" y1=\"140\" x2=\"600\" y2=\"140\" stroke=\"#475569\" stroke-width=\"1.5\"/><line x1=\"50\" y1=\"60\" x2=\"580\" y2=\"60\" stroke=\"#1e293b\" stroke-dasharray=\"3,3\"/><text x=\"15\" y=\"63\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\">-5dB</text><line x1=\"50\" y1=\"105\" x2=\"580\" y2=\"105\" stroke=\"#1e293b\" stroke-dasharray=\"3,3\"/><text x=\"10\" y=\"108\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\">-25dB</text><path d=\"M 50 45 L 140 60 L 320 105 L 480 140\" fill=\"none\" stroke=\"#00ff9d\" stroke-width=\"2.5\"/><text x=\"180\" y=\"125\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">T20 = 0.127s -> RT60 = 3*T20 = 0.38s (Pass Liveness)</text></svg>",
    "standardCitation": "ISO 3382-1 Mục A.2 'Speech Clarity'.",
    "keyKeywords": [
      "C50",
      "Clarity",
      "50ms",
      "Phòng câm",
      "ISO 3382"
    ]
  },
  {
    "id": 27,
    "code": "2.7",
    "pillar": 2,
    "pillarTitle": "Phân Khu 2: Vật Lý Âm Học Phòng ISO 3382 & Tấn Công Replay",
    "title": "Đáp ứng xung phòng kép (Dual Room Impulse Response)",
    "difficulty": "CAO CẤP",
    "question": "Chứng minh toán học tại sao Replay Attack làm RT60 tăng vọt > 0.85s?",
    "physics": "Tín hiệu đi qua 2 phòng: phòng thu âm gốc và phòng phát lại. Đáp ứng xung tổng là tích chập: h_total = h1 * h2. Thời gian dội âm tổng RT60_total xấp xỉ bằng căn bậc hai hoặc lớn hơn max(RT60_1, RT60_2).",
    "mathProof": "h_total(t) = h_{rec}(t) * h_{play}(t). Trên miền Laplace: H_total(s) = H_rec(s) * H_play(s).",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">ISO 3382: SCHROEDER INTEGRATION (T20 -> RT60)</text><line x1=\"50\" y1=\"35\" x2=\"50\" y2=\"140\" stroke=\"#475569\" stroke-width=\"1.5\"/><line x1=\"50\" y1=\"140\" x2=\"600\" y2=\"140\" stroke=\"#475569\" stroke-width=\"1.5\"/><line x1=\"50\" y1=\"60\" x2=\"580\" y2=\"60\" stroke=\"#1e293b\" stroke-dasharray=\"3,3\"/><text x=\"15\" y=\"63\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\">-5dB</text><line x1=\"50\" y1=\"105\" x2=\"580\" y2=\"105\" stroke=\"#1e293b\" stroke-dasharray=\"3,3\"/><text x=\"10\" y=\"108\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\">-25dB</text><path d=\"M 50 45 L 140 60 L 320 105 L 480 140\" fill=\"none\" stroke=\"#00ff9d\" stroke-width=\"2.5\"/><text x=\"180\" y=\"125\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">T20 = 0.127s -> RT60 = 3*T20 = 0.38s (Pass Liveness)</text></svg>",
    "standardCitation": "ASVspoof 2017/2019 Physical Access (PA) Evaluation Protocols.",
    "keyKeywords": [
      "Dual RIR",
      "Tích chập",
      "Replay",
      "h_total",
      "> 0.85s"
    ]
  },
  {
    "id": 28,
    "code": "2.8",
    "pillar": 2,
    "pillarTitle": "Phân Khu 2: Vật Lý Âm Học Phòng ISO 3382 & Tấn Công Replay",
    "title": "Suy hao truyền sóng trong không khí theo tần số (ISO 9613-1)",
    "difficulty": "CHUYÊN GIA",
    "question": "Sự suy hao âm thanh dải cao tần trong không khí tố cáo khoảng cách phát lại thế nào?",
    "physics": "Tần số cao > 4kHz bị không khí hấp thụ mạnh theo độ ẩm và nhiệt độ. Tệp âm thanh bị Replay qua không gian xa sẽ mất toàn bộ năng lượng dải 6-8kHz so với nguồn phát trực tiếp.",
    "mathProof": "alpha_air(f) = f^2 * [ 1.84e-11 * (T/T0)^0.5 + (T/T0)^(-2.5) * ( ... ) ]. Độ dốc suy hao tăng theo bình phương tần số f^2.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">ISO 3382: SCHROEDER INTEGRATION (T20 -> RT60)</text><line x1=\"50\" y1=\"35\" x2=\"50\" y2=\"140\" stroke=\"#475569\" stroke-width=\"1.5\"/><line x1=\"50\" y1=\"140\" x2=\"600\" y2=\"140\" stroke=\"#475569\" stroke-width=\"1.5\"/><line x1=\"50\" y1=\"60\" x2=\"580\" y2=\"60\" stroke=\"#1e293b\" stroke-dasharray=\"3,3\"/><text x=\"15\" y=\"63\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\">-5dB</text><line x1=\"50\" y1=\"105\" x2=\"580\" y2=\"105\" stroke=\"#1e293b\" stroke-dasharray=\"3,3\"/><text x=\"10\" y=\"108\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\">-25dB</text><path d=\"M 50 45 L 140 60 L 320 105 L 480 140\" fill=\"none\" stroke=\"#00ff9d\" stroke-width=\"2.5\"/><text x=\"180\" y=\"125\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">T20 = 0.127s -> RT60 = 3*T20 = 0.38s (Pass Liveness)</text></svg>",
    "standardCitation": "ISO 9613-1:1993 'Acoustics - Attenuation of sound during propagation outdoors'.",
    "keyKeywords": [
      "ISO 9613",
      "Hấp thụ không khí",
      "Suy hao cao tần",
      "Khoảng cách"
    ]
  },
  {
    "id": 29,
    "code": "2.9",
    "pillar": 2,
    "pillarTitle": "Phân Khu 2: Vật Lý Âm Học Phòng ISO 3382 & Tấn Công Replay",
    "title": "Giả lập phòng câm ảo (Anechoic Chamber Detection)",
    "difficulty": "CAO CẤP",
    "question": "Tại sao RT60 < 0.15s lại bị coi là bằng chứng tội phạm công nghệ cao?",
    "physics": "Không có phòng ngủ hay phòng làm việc nào trong đời thực có RT60 < 0.15s (trừ phòng thí nghiệm vô trùng triệu đô). Âm thanh có RT60 < 0.15s chỉ có thể sinh ra từ card âm thanh ảo của Deepfake bot.",
    "mathProof": "P(Real | RT60 < 0.15s) < 0.0001. Hệ thống kích hoạt HARD VETO: VIRTUAL ANECHOIC CHAMBER.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">ISO 3382: SCHROEDER INTEGRATION (T20 -> RT60)</text><line x1=\"50\" y1=\"35\" x2=\"50\" y2=\"140\" stroke=\"#475569\" stroke-width=\"1.5\"/><line x1=\"50\" y1=\"140\" x2=\"600\" y2=\"140\" stroke=\"#475569\" stroke-width=\"1.5\"/><line x1=\"50\" y1=\"60\" x2=\"580\" y2=\"60\" stroke=\"#1e293b\" stroke-dasharray=\"3,3\"/><text x=\"15\" y=\"63\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\">-5dB</text><line x1=\"50\" y1=\"105\" x2=\"580\" y2=\"105\" stroke=\"#1e293b\" stroke-dasharray=\"3,3\"/><text x=\"10\" y=\"108\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\">-25dB</text><path d=\"M 50 45 L 140 60 L 320 105 L 480 140\" fill=\"none\" stroke=\"#00ff9d\" stroke-width=\"2.5\"/><text x=\"180\" y=\"125\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">T20 = 0.127s -> RT60 = 3*T20 = 0.38s (Pass Liveness)</text></svg>",
    "standardCitation": "Vorländer, M. (2008) 'Auralization: Fundamentals of Acoustics', Springer.",
    "keyKeywords": [
      "Anechoic",
      "Phòng câm",
      "< 0.15s",
      "Card ảo",
      "Hard Veto"
    ]
  },
  {
    "id": 210,
    "code": "2.10",
    "pillar": 2,
    "pillarTitle": "Phân Khu 2: Vật Lý Âm Học Phòng ISO 3382 & Tấn Công Replay",
    "title": "Hiệu ứng Micro-Doppler từ chuyển động cơ thể",
    "difficulty": "CHUYÊN GIA",
    "question": "Người thật nói chuyện luôn dịch chuyển nhẹ đầu. Dấu vết Micro-Doppler xuất hiện ở đâu?",
    "physics": "Chuyển động đầu với vận tốc v=0.05m/s tạo ra độ dịch Doppler f_d = f0 * (v/c) ≈ 0.2-0.5Hz trên các vạch họa âm cao. Deepfake phát từ loa cố định có f_d = 0 tuyệt đối.",
    "mathProof": "Delta f_D = f_c * (2*v / c) * cos(theta). Quan sát được trên phổ STFT phân giải siêu mịn (N=4096).",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">ISO 3382: SCHROEDER INTEGRATION (T20 -> RT60)</text><line x1=\"50\" y1=\"35\" x2=\"50\" y2=\"140\" stroke=\"#475569\" stroke-width=\"1.5\"/><line x1=\"50\" y1=\"140\" x2=\"600\" y2=\"140\" stroke=\"#475569\" stroke-width=\"1.5\"/><line x1=\"50\" y1=\"60\" x2=\"580\" y2=\"60\" stroke=\"#1e293b\" stroke-dasharray=\"3,3\"/><text x=\"15\" y=\"63\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\">-5dB</text><line x1=\"50\" y1=\"105\" x2=\"580\" y2=\"105\" stroke=\"#1e293b\" stroke-dasharray=\"3,3\"/><text x=\"10\" y=\"108\" fill=\"#94a3b8\" font-family=\"JetBrains Mono\" font-size=\"9\">-25dB</text><path d=\"M 50 45 L 140 60 L 320 105 L 480 140\" fill=\"none\" stroke=\"#00ff9d\" stroke-width=\"2.5\"/><text x=\"180\" y=\"125\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">T20 = 0.127s -> RT60 = 3*T20 = 0.38s (Pass Liveness)</text></svg>",
    "standardCitation": "Chen, V. C. (2011) 'The Micro-Doppler Effect in Radar and Acoustics', Artech House.",
    "keyKeywords": [
      "Micro-Doppler",
      "Dịch chuyển đầu",
      "Loa cố định",
      "Họa âm"
    ]
  },
  {
    "id": 31,
    "code": "3.1",
    "pillar": 3,
    "pillarTitle": "Phân Khu 3: Ngữ Âm Học Tiếng Việt, 6 Thanh Điệu & Bất Biến Nắp Thanh Môn",
    "title": "Đặc trưng âm học của 6 thanh điệu tiếng Việt",
    "difficulty": "TRUNG CẤP",
    "question": "Mô tả đường bao F0 và phân loại ngữ âm học của 6 thanh điệu tiếng Việt?",
    "physics": "Ngang (bằng phẳng F0~220Hz), Huyền (trầm hạ 200->150Hz), Sắc (vút cao 210->280Hz), Hỏi (lượn xuống-lên), Ngã (gãy, siết nắp thanh môn), Nặng (ngắt cụt đột ngột).",
    "mathProof": "F0_contour(t) được mô hình hóa bằng đường cong Bezier bậc 3 hoặc hàm đa thức Legendre 4 tham số.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">NGỮ ÂM HỌC TIẾNG VIỆT: ĐỨT NĂNG LƯỢNG NẮP THANH MÔN TRÊN THANH NGÃ</text><line x1=\"50\" y1=\"130\" x2=\"600\" y2=\"130\" stroke=\"#334155\" stroke-width=\"1.5\"/><path d=\"M 50 110 Q 150 50 220 70 L 250 125 L 310 125 L 340 50 Q 420 30 550 40\" fill=\"none\" stroke=\"#00ff9d\" stroke-width=\"2.5\"/><rect x=\"250\" y=\"35\" width=\"60\" height=\"95\" fill=\"rgba(255,51,102,0.15)\" stroke=\"#ff3366\" stroke-dasharray=\"2,2\"/><text x=\"252\" y=\"30\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">Nắp thanh môn siết ngắt (ΔE &lt; -12dB)</text></svg>",
    "standardCitation": "Đỗ Thế Dũng (1988) 'Vietnamese Tones: Acoustic Analysis and Synthesis'; Nguyễn Văn Lợi & Edmondson (1997).",
    "keyKeywords": [
      "6 thanh điệu",
      "Ngang",
      "Huyền",
      "Sắc",
      "Hỏi",
      "Ngã",
      "Nặng"
    ]
  },
  {
    "id": 32,
    "code": "3.2",
    "pillar": 3,
    "pillarTitle": "Phân Khu 3: Ngữ Âm Học Tiếng Việt, 6 Thanh Điệu & Bất Biến Nắp Thanh Môn",
    "title": "Bất biến nắp thanh môn (Glottal Stop) trên thanh Ngã",
    "difficulty": "CAO CẤP",
    "question": "Cơ chế siết chặt nắp thanh môn trên thanh Ngã tạo ra hiện tượng gì trên phổ và năng lượng?",
    "physics": "Giai đoạn giữa thanh Ngã, nắp thanh quản đóng cơ học hoàn toàn trong 20-60ms: F0 bị đứt gãy, năng lượng sụt giảm ΔE < -12dB. AI TTS chỉ hạ nhẹ -3dB nên bị lật tẩy.",
    "mathProof": "Delta E_{glottal} = 10 * log10( E_{creak} / E_{vowel} ) < -12 dB trong cửa sổ Delta t in [20, 60] ms.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">NGỮ ÂM HỌC TIẾNG VIỆT: ĐỨT NĂNG LƯỢNG NẮP THANH MÔN TRÊN THANH NGÃ</text><line x1=\"50\" y1=\"130\" x2=\"600\" y2=\"130\" stroke=\"#334155\" stroke-width=\"1.5\"/><path d=\"M 50 110 Q 150 50 220 70 L 250 125 L 310 125 L 340 50 Q 420 30 550 40\" fill=\"none\" stroke=\"#00ff9d\" stroke-width=\"2.5\"/><rect x=\"250\" y=\"35\" width=\"60\" height=\"95\" fill=\"rgba(255,51,102,0.15)\" stroke=\"#ff3366\" stroke-dasharray=\"2,2\"/><text x=\"252\" y=\"30\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">Nắp thanh môn siết ngắt (ΔE &lt; -12dB)</text></svg>",
    "standardCitation": "Vũ Thanh Phương (1982) 'Acoustic and Perceptual Study of Vietnamese Tones'.",
    "keyKeywords": [
      "Thanh Ngã",
      "Nắp thanh môn",
      "Glottal Stop",
      "ΔE < -12dB",
      "Broken Tone"
    ]
  },
  {
    "id": 33,
    "code": "3.3",
    "pillar": 3,
    "pillarTitle": "Phân Khu 3: Ngữ Âm Học Tiếng Việt, 6 Thanh Điệu & Bất Biến Nắp Thanh Môn",
    "title": "Công thức tính Micro-Jitter dây thanh sinh học",
    "difficulty": "CAO CẤP",
    "question": "Tại sao dây thanh người luôn có Jitter 0.6% - 2.5% mà Vocoder không bắt chước được?",
    "physics": "Dây thanh rung theo khí động - đàn hồi phi tuyến, nhịp tim mao mạch tạo vi thăng giáng ngẫu nhiên. Vocoder tối ưu hàm loss L1/L2 làm mịn hóa cực đoan (Jitter < 0.35%).",
    "mathProof": "Jitter_{rel} = [ SUM_{i=1}^{N-1} |T_i - T_{i+1}| / (N-1) ] / [ SUM_{i=1}^N T_i / N ] * 100%.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">NGỮ ÂM HỌC TIẾNG VIỆT: ĐỨT NĂNG LƯỢNG NẮP THANH MÔN TRÊN THANH NGÃ</text><line x1=\"50\" y1=\"130\" x2=\"600\" y2=\"130\" stroke=\"#334155\" stroke-width=\"1.5\"/><path d=\"M 50 110 Q 150 50 220 70 L 250 125 L 310 125 L 340 50 Q 420 30 550 40\" fill=\"none\" stroke=\"#00ff9d\" stroke-width=\"2.5\"/><rect x=\"250\" y=\"35\" width=\"60\" height=\"95\" fill=\"rgba(255,51,102,0.15)\" stroke=\"#ff3366\" stroke-dasharray=\"2,2\"/><text x=\"252\" y=\"30\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">Nắp thanh môn siết ngắt (ΔE &lt; -12dB)</text></svg>",
    "standardCitation": "Titze, I. R. (1994) 'Principles of Voice Production', Prentice-Hall.",
    "keyKeywords": [
      "Micro-Jitter",
      "0.6%-2.5%",
      "Vocoder",
      "L1/L2 Loss",
      "Titze"
    ]
  },
  {
    "id": 34,
    "code": "3.4",
    "pillar": 3,
    "pillarTitle": "Phân Khu 3: Ngữ Âm Học Tiếng Việt, 6 Thanh Điệu & Bất Biến Nắp Thanh Môn",
    "title": "Chỉ số Shimmer (Biến thiên biên độ chu kỳ)",
    "difficulty": "TRUNG CẤP",
    "question": "Shimmer đo lường điều gì và phối hợp với Jitter thế nào trong phân loại liveness?",
    "physics": "Shimmer đo độ bất ổn biên độ đỉnh giữa các chu kỳ thanh môn kế tiếp. Người sống có Shimmer 1.5% - 5.0%. AI deepfake thường có Shimmer < 0.8% hoặc bị răng cưa bất thường.",
    "mathProof": "Shimmer_{rel} = [ SUM_{i=1}^{N-1} |A_i - A_{i+1}| / (N-1) ] / [ SUM_{i=1}^N A_i / N ] * 100%.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">NGỮ ÂM HỌC TIẾNG VIỆT: ĐỨT NĂNG LƯỢNG NẮP THANH MÔN TRÊN THANH NGÃ</text><line x1=\"50\" y1=\"130\" x2=\"600\" y2=\"130\" stroke=\"#334155\" stroke-width=\"1.5\"/><path d=\"M 50 110 Q 150 50 220 70 L 250 125 L 310 125 L 340 50 Q 420 30 550 40\" fill=\"none\" stroke=\"#00ff9d\" stroke-width=\"2.5\"/><rect x=\"250\" y=\"35\" width=\"60\" height=\"95\" fill=\"rgba(255,51,102,0.15)\" stroke=\"#ff3366\" stroke-dasharray=\"2,2\"/><text x=\"252\" y=\"30\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">Nắp thanh môn siết ngắt (ΔE &lt; -12dB)</text></svg>",
    "standardCitation": "Baken, R. J. (2000) 'Clinical Measurement of Speech and Voice', Singular Publishing.",
    "keyKeywords": [
      "Shimmer",
      "Biên độ",
      "1.5%-5.0%",
      "Liveness",
      "Đỉnh xung"
    ]
  },
  {
    "id": 35,
    "code": "3.5",
    "pillar": 3,
    "pillarTitle": "Phân Khu 3: Ngữ Âm Học Tiếng Việt, 6 Thanh Điệu & Bất Biến Nắp Thanh Môn",
    "title": "Lý thuyết Nguồn - Bộ Lọc (Source-Filter Theory)",
    "difficulty": "CAO CẤP",
    "question": "Mô hình hóa tiếng nói theo Gunnar Fant: Tách bạch nguồn thanh quản và ống thanh đạo thế nào?",
    "physics": "Âm thanh S(f) = U(f) * H(f) * R(f): U(f) là luồng khí thanh môn (Jitter, F0), H(f) là cộng hưởng thanh đạo (Formant), R(f) là bức xạ môi. Deepfake thường ghép nối sai lệch giữa U(f) và H(f).",
    "mathProof": "S(f) = U_glottal(f) * H_tract(f) * R_lip(f). Phép giải tích nghịch (Inverse Filtering) bóc tách U_glottal(t).",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">NGỮ ÂM HỌC TIẾNG VIỆT: ĐỨT NĂNG LƯỢNG NẮP THANH MÔN TRÊN THANH NGÃ</text><line x1=\"50\" y1=\"130\" x2=\"600\" y2=\"130\" stroke=\"#334155\" stroke-width=\"1.5\"/><path d=\"M 50 110 Q 150 50 220 70 L 250 125 L 310 125 L 340 50 Q 420 30 550 40\" fill=\"none\" stroke=\"#00ff9d\" stroke-width=\"2.5\"/><rect x=\"250\" y=\"35\" width=\"60\" height=\"95\" fill=\"rgba(255,51,102,0.15)\" stroke=\"#ff3366\" stroke-dasharray=\"2,2\"/><text x=\"252\" y=\"30\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">Nắp thanh môn siết ngắt (ΔE &lt; -12dB)</text></svg>",
    "standardCitation": "Fant, G. (1960) 'Acoustic Theory of Speech Production', Mouton & Co.",
    "keyKeywords": [
      "Source-Filter",
      "Gunnar Fant",
      "U_glottal",
      "H_tract",
      "Inverse Filtering"
    ]
  },
  {
    "id": 36,
    "code": "3.6",
    "pillar": 3,
    "pillarTitle": "Phân Khu 3: Ngữ Âm Học Tiếng Việt, 6 Thanh Điệu & Bất Biến Nắp Thanh Môn",
    "title": "Tam giác nguyên âm và Formant F1, F2, F3",
    "difficulty": "TRUNG CẤP",
    "question": "F1 và F2 phản ánh vị trí hình học nào của lưỡi và khoang miệng?",
    "physics": "F1 tỷ lệ nghịch với độ nâng của lưỡi (vòm họng mở rộng -> F1 tăng). F2 tỷ lệ thuận với vị trí trước/sau của thân lưỡi (lưỡi đưa ra trước -> F2 tăng).",
    "mathProof": "Formant Tracking: F1 in [200, 1000] Hz; F2 in [600, 2800] Hz. Bóc tách qua Linear Predictive Coding (LPC).",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">NGỮ ÂM HỌC TIẾNG VIỆT: ĐỨT NĂNG LƯỢNG NẮP THANH MÔN TRÊN THANH NGÃ</text><line x1=\"50\" y1=\"130\" x2=\"600\" y2=\"130\" stroke=\"#334155\" stroke-width=\"1.5\"/><path d=\"M 50 110 Q 150 50 220 70 L 250 125 L 310 125 L 340 50 Q 420 30 550 40\" fill=\"none\" stroke=\"#00ff9d\" stroke-width=\"2.5\"/><rect x=\"250\" y=\"35\" width=\"60\" height=\"95\" fill=\"rgba(255,51,102,0.15)\" stroke=\"#ff3366\" stroke-dasharray=\"2,2\"/><text x=\"252\" y=\"30\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">Nắp thanh môn siết ngắt (ΔE &lt; -12dB)</text></svg>",
    "standardCitation": "Peterson, G. E., & Barney, H. L. (1952) 'Control Methods Used in a Study of the Vowels'.",
    "keyKeywords": [
      "Formant",
      "F1",
      "F2",
      "Lưỡi",
      "Khoang miệng",
      "LPC"
    ]
  },
  {
    "id": 37,
    "code": "3.7",
    "pillar": 3,
    "pillarTitle": "Phân Khu 3: Ngữ Âm Học Tiếng Việt, 6 Thanh Điệu & Bất Biến Nắp Thanh Môn",
    "title": "Hiện tượng vô thanh hóa và tiếng xì thanh môn (Aspiration)",
    "difficulty": "TRUNG CẤP",
    "question": "Các phụ âm vô thanh /p/, /t/, /k/, /s/ được xử lý thế nào để tránh tính nhầm Jitter?",
    "physics": "Phụ âm vô thanh không có chu kỳ rung thanh môn (F0=0). Thuật toán NAFE sử dụng bộ phát hiện VAD và bộ lọc Harmonicity để loại trừ triệt để đoạn vô thanh trước khi tính Jitter.",
    "mathProof": "Harmonic-to-Noise Ratio (HNR) = 10 * log10( E_{harm} / E_{noise} ). Chỉ tính Jitter khi HNR > 12 dB.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">NGỮ ÂM HỌC TIẾNG VIỆT: ĐỨT NĂNG LƯỢNG NẮP THANH MÔN TRÊN THANH NGÃ</text><line x1=\"50\" y1=\"130\" x2=\"600\" y2=\"130\" stroke=\"#334155\" stroke-width=\"1.5\"/><path d=\"M 50 110 Q 150 50 220 70 L 250 125 L 310 125 L 340 50 Q 420 30 550 40\" fill=\"none\" stroke=\"#00ff9d\" stroke-width=\"2.5\"/><rect x=\"250\" y=\"35\" width=\"60\" height=\"95\" fill=\"rgba(255,51,102,0.15)\" stroke=\"#ff3366\" stroke-dasharray=\"2,2\"/><text x=\"252\" y=\"30\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">Nắp thanh môn siết ngắt (ΔE &lt; -12dB)</text></svg>",
    "standardCitation": "Boersma, P. (1993) 'Accurate Short-Term Analysis of the Fundamental Frequency', Praat.",
    "keyKeywords": [
      "Vô thanh",
      "HNR",
      "VAD",
      "Harmonicity",
      "Praat"
    ]
  },
  {
    "id": 38,
    "code": "3.8",
    "pillar": 3,
    "pillarTitle": "Phân Khu 3: Ngữ Âm Học Tiếng Việt, 6 Thanh Điệu & Bất Biến Nắp Thanh Môn",
    "title": "Tỷ lệ mở thanh môn (Open Quotient - OQ)",
    "difficulty": "CHUYÊN GIA",
    "question": "Chỉ số OQ đo thời gian nắp thanh môn mở trên tổng chu kỳ rung. Vocoder sai lệch thế nào?",
    "physics": "OQ = T_open / T_total. Người nói bình thường OQ in [0.4, 0.7]. Vocoder thường sử dụng xung kích thích đơn giản (Rosenberg pulse) làm OQ cố định, thiếu tính linh hoạt tự nhiên.",
    "mathProof": "OQ = (t_{closure} - t_{opening}) / T_0. Ước lượng qua đạo hàm luồng khí thanh môn (dEGG / dLuồng khí).",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">NGỮ ÂM HỌC TIẾNG VIỆT: ĐỨT NĂNG LƯỢNG NẮP THANH MÔN TRÊN THANH NGÃ</text><line x1=\"50\" y1=\"130\" x2=\"600\" y2=\"130\" stroke=\"#334155\" stroke-width=\"1.5\"/><path d=\"M 50 110 Q 150 50 220 70 L 250 125 L 310 125 L 340 50 Q 420 30 550 40\" fill=\"none\" stroke=\"#00ff9d\" stroke-width=\"2.5\"/><rect x=\"250\" y=\"35\" width=\"60\" height=\"95\" fill=\"rgba(255,51,102,0.15)\" stroke=\"#ff3366\" stroke-dasharray=\"2,2\"/><text x=\"252\" y=\"30\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">Nắp thanh môn siết ngắt (ΔE &lt; -12dB)</text></svg>",
    "standardCitation": "Holmberg, E. B., et al. (1988) 'Glottal Airflow and Transglottal Air Pressure', JASA.",
    "keyKeywords": [
      "Open Quotient",
      "OQ",
      "Thanh môn mở",
      "Rosenberg",
      "dEGG"
    ]
  },
  {
    "id": 39,
    "code": "3.9",
    "pillar": 3,
    "pillarTitle": "Phân Khu 3: Ngữ Âm Học Tiếng Việt, 6 Thanh Điệu & Bất Biến Nắp Thanh Môn",
    "title": "Bản chất toán học của Over-smoothing trong Neural Vocoder",
    "difficulty": "CAO CẤP",
    "question": "Tại sao hàm loss L1 trên phổ Mel ép vocoder phải sinh ra giọng trơn nhẵn phi tự nhiên?",
    "physics": "L1 loss phạt khoảng cách trung bình: E[||S - S_hat||_1]. Nghiệm tối ưu toán học của L1 loss khi có nhiễu ngẫu nhiên là giá trị trung vị (median). Điều này triệt tiêu hoàn toàn vi rung sinh học.",
    "mathProof": "arg min_{S_hat} E[ |S - S_hat| ] = Median(S). Mất toàn bộ thăng giáng sinh học phi tuyến.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">NGỮ ÂM HỌC TIẾNG VIỆT: ĐỨT NĂNG LƯỢNG NẮP THANH MÔN TRÊN THANH NGÃ</text><line x1=\"50\" y1=\"130\" x2=\"600\" y2=\"130\" stroke=\"#334155\" stroke-width=\"1.5\"/><path d=\"M 50 110 Q 150 50 220 70 L 250 125 L 310 125 L 340 50 Q 420 30 550 40\" fill=\"none\" stroke=\"#00ff9d\" stroke-width=\"2.5\"/><rect x=\"250\" y=\"35\" width=\"60\" height=\"95\" fill=\"rgba(255,51,102,0.15)\" stroke=\"#ff3366\" stroke-dasharray=\"2,2\"/><text x=\"252\" y=\"30\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">Nắp thanh môn siết ngắt (ΔE &lt; -12dB)</text></svg>",
    "standardCitation": "Kong, J., et al. (2020) 'HiFi-GAN: Generative Adversarial Networks for Speech Synthesis', NeurIPS.",
    "keyKeywords": [
      "Over-smoothing",
      "L1 Loss",
      "Median",
      "Trung vị",
      "HiFi-GAN"
    ]
  },
  {
    "id": 310,
    "code": "3.10",
    "pillar": 3,
    "pillarTitle": "Phân Khu 3: Ngữ Âm Học Tiếng Việt, 6 Thanh Điệu & Bất Biến Nắp Thanh Môn",
    "title": "Sai số nội suy F0 trong RVC v2 gây Jitter > 4.8%",
    "difficulty": "CAO CẤP",
    "question": "Cơ chế nào của Harvest algorithm trong RVC v2 làm vỡ pha khi chuyển giọng tiếng Việt?",
    "physics": "Harvest bóc tách F0 theo cửa sổ trượt nhưng khi giọng tiếng Việt lướt tone nhanh (như thanh Sắc/Ngã), việc lượng tử hóa F0 bị trễ pha (phase lag), dẫn đến bộ tạo sóng sin bị giật nảy pha.",
    "mathProof": "Phase Discontinuity: Delta phi = |phi(t) - phi_target(t)| > pi/2 tại ranh giới khung, tạo Jitter > 4.8%.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">NGỮ ÂM HỌC TIẾNG VIỆT: ĐỨT NĂNG LƯỢNG NẮP THANH MÔN TRÊN THANH NGÃ</text><line x1=\"50\" y1=\"130\" x2=\"600\" y2=\"130\" stroke=\"#334155\" stroke-width=\"1.5\"/><path d=\"M 50 110 Q 150 50 220 70 L 250 125 L 310 125 L 340 50 Q 420 30 550 40\" fill=\"none\" stroke=\"#00ff9d\" stroke-width=\"2.5\"/><rect x=\"250\" y=\"35\" width=\"60\" height=\"95\" fill=\"rgba(255,51,102,0.15)\" stroke=\"#ff3366\" stroke-dasharray=\"2,2\"/><text x=\"252\" y=\"30\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">Nắp thanh môn siết ngắt (ΔE &lt; -12dB)</text></svg>",
    "standardCitation": "Morise, M. (2017) 'Harvest: A High-Pitch Accuracy F0 Estimation Algorithm', Speech Communication.",
    "keyKeywords": [
      "RVC v2",
      "Harvest",
      "Vỡ pha",
      "Phase Discontinuity",
      "Jitter > 4.8%"
    ]
  },
  {
    "id": 41,
    "code": "4.1",
    "pillar": 4,
    "pillarTitle": "Phân Khu 4: Học Sâu MelCNN 2D & Tối Ưu Hóa ONNX Opset 14",
    "title": "Kiến trúc chi tiết 4 Block của MelCNN 2D",
    "difficulty": "TRUNG CẤP",
    "question": "Mô tả dòng chảy tensor qua 4 khối Conv2D-BatchNorm-ReLU-MaxPool của MelCNN?",
    "physics": "Input (1, 80, T) -> Block 1 (32, 40, T/2) -> Block 2 (64, 20, T/4) -> Block 3 (128, 10, T/8) -> Block 4 (256, 5, T/16) -> AdaptiveAvgPool -> Dense (2 lớp phân loại).",
    "mathProof": "Tổng tham số: ~1.2M params. Receptive field bao phủ 64 khung phổ (1.02s âm thanh).",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">ONNX OPSET 14: KERNEL FUSION (CONV2D + BATCHNORM + RELU -> FUSEDCONV)</text><rect x=\"50\" y=\"45\" width=\"130\" height=\"70\" fill=\"rgba(0,240,255,0.1)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"65\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"11\">Conv2D (k=3)</text><text x=\"190\" y=\"85\" fill=\"#00f0ff\" font-size=\"14\">→</text><rect x=\"215\" y=\"45\" width=\"130\" height=\"70\" fill=\"rgba(0,255,157,0.1)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"245\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"11\">BatchNorm</text><text x=\"355\" y=\"85\" fill=\"#00ff9d\" font-size=\"14\">→</text><rect x=\"380\" y=\"45\" width=\"220\" height=\"70\" fill=\"rgba(181,95,230,0.15)\" stroke=\"#b55fe6\" rx=\"4\"/><text x=\"400\" y=\"80\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"11\">FusedConv (OpSet 14)</text><text x=\"400\" y=\"98\" fill=\"#b55fe6\" font-family=\"JetBrains Mono\" font-size=\"9\">28ms -> 6.8ms (Zero L2 Cache Spill)</text></svg>",
    "standardCitation": "He, K., et al. (2016) 'Deep Residual Learning for Image Recognition'; Audio Spectrogram CNNs.",
    "keyKeywords": [
      "MelCNN",
      "4 Block",
      "Conv2D",
      "BatchNorm",
      "1.2M params"
    ]
  },
  {
    "id": 42,
    "code": "4.2",
    "pillar": 4,
    "pillarTitle": "Phân Khu 4: Học Sâu MelCNN 2D & Tối Ưu Hóa ONNX Opset 14",
    "title": "Cơ chế AdaptiveAvgPool2d((1, 1)) nhận diện độ dài tùy biến",
    "difficulty": "CAO CẤP",
    "question": "Tại sao AdaptiveAvgPool2d((1, 1)) cho phép xử lý âm thanh bất kỳ độ dài mà không cần đệm số 0?",
    "physics": "Lớp này tự động tính kích thước cửa sổ kernel k = (H_in, W_in) để nén toàn bộ ma trận đặc trưng không gian (5, T/16) về đúng vector 1D (256, 1, 1), triệt tiêu sự phụ thuộc vào T.",
    "mathProof": "Output = (1 / (H * W)) * SUM_{h=1}^H SUM_{w=1}^W X[c, h, w]. Không cần Zero-padding nhân tạo.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">ONNX OPSET 14: KERNEL FUSION (CONV2D + BATCHNORM + RELU -> FUSEDCONV)</text><rect x=\"50\" y=\"45\" width=\"130\" height=\"70\" fill=\"rgba(0,240,255,0.1)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"65\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"11\">Conv2D (k=3)</text><text x=\"190\" y=\"85\" fill=\"#00f0ff\" font-size=\"14\">→</text><rect x=\"215\" y=\"45\" width=\"130\" height=\"70\" fill=\"rgba(0,255,157,0.1)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"245\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"11\">BatchNorm</text><text x=\"355\" y=\"85\" fill=\"#00ff9d\" font-size=\"14\">→</text><rect x=\"380\" y=\"45\" width=\"220\" height=\"70\" fill=\"rgba(181,95,230,0.15)\" stroke=\"#b55fe6\" rx=\"4\"/><text x=\"400\" y=\"80\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"11\">FusedConv (OpSet 14)</text><text x=\"400\" y=\"98\" fill=\"#b55fe6\" font-family=\"JetBrains Mono\" font-size=\"9\">28ms -> 6.8ms (Zero L2 Cache Spill)</text></svg>",
    "standardCitation": "PyTorch Adaptive Pooling Documentation & Lin, M. (2013) 'Network in Network'.",
    "keyKeywords": [
      "AdaptiveAvgPool2d",
      "Độ dài tùy biến",
      "Zero-padding",
      "Global Average Pooling"
    ]
  },
  {
    "id": 43,
    "code": "4.3",
    "pillar": 4,
    "pillarTitle": "Phân Khu 4: Học Sâu MelCNN 2D & Tối Ưu Hóa ONNX Opset 14",
    "title": "Tối ưu hóa đồ thị ONNX Opset 14 (Node Fusion & Constant Folding)",
    "difficulty": "CAO CẤP",
    "question": "Làm thế nào ONNX Opset 14 giảm thời gian suy luận từ 28ms xuống 6.8ms trên CPU?",
    "physics": "Gộp Conv2D + BatchNorm + ReLU thành toán tử đơn FusedConv trong một kernel C++. Constant folding gộp trước trọng số bias và variance trong static export.",
    "mathProof": "FusedConv(X, W_fused, B_fused) = max(0, X * W_fused + B_fused). Tiết kiệm 3 lần đọc/ghi DRAM.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">ONNX OPSET 14: KERNEL FUSION (CONV2D + BATCHNORM + RELU -> FUSEDCONV)</text><rect x=\"50\" y=\"45\" width=\"130\" height=\"70\" fill=\"rgba(0,240,255,0.1)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"65\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"11\">Conv2D (k=3)</text><text x=\"190\" y=\"85\" fill=\"#00f0ff\" font-size=\"14\">→</text><rect x=\"215\" y=\"45\" width=\"130\" height=\"70\" fill=\"rgba(0,255,157,0.1)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"245\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"11\">BatchNorm</text><text x=\"355\" y=\"85\" fill=\"#00ff9d\" font-size=\"14\">→</text><rect x=\"380\" y=\"45\" width=\"220\" height=\"70\" fill=\"rgba(181,95,230,0.15)\" stroke=\"#b55fe6\" rx=\"4\"/><text x=\"400\" y=\"80\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"11\">FusedConv (OpSet 14)</text><text x=\"400\" y=\"98\" fill=\"#b55fe6\" font-family=\"JetBrains Mono\" font-size=\"9\">28ms -> 6.8ms (Zero L2 Cache Spill)</text></svg>",
    "standardCitation": "ONNX Runtime Graph Optimizations Whitepaper, Microsoft (2023).",
    "keyKeywords": [
      "ONNX",
      "Opset 14",
      "FusedConv",
      "Constant Folding",
      "6.8ms"
    ]
  },
  {
    "id": 44,
    "code": "4.4",
    "pillar": 4,
    "pillarTitle": "Phân Khu 4: Học Sâu MelCNN 2D & Tối Ưu Hóa ONNX Opset 14",
    "title": "Cấu hình luồng intra_op=4 và inter_op=1",
    "difficulty": "CHUYÊN GIA",
    "question": "Tại sao lại đặt intra_op=4 và inter_op=1 thay vì ngược lại trong ONNX Runtime?",
    "physics": "MelCNN có cấu trúc mạng tuần tự (sequential). Intra-op chia nhỏ phép nhân ma trận trên 4 core CPU vật lý. Inter-op=1 tránh xung đột khóa lock tranh chấp tài nguyên bộ nhớ.",
    "mathProof": "Parallel GEMM OpenMP efficiency: Speedup S(4) = 4 / (1 + 0.1*(4-1)) ≈ 3.07x so với chạy đơn luồng.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">ONNX OPSET 14: KERNEL FUSION (CONV2D + BATCHNORM + RELU -> FUSEDCONV)</text><rect x=\"50\" y=\"45\" width=\"130\" height=\"70\" fill=\"rgba(0,240,255,0.1)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"65\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"11\">Conv2D (k=3)</text><text x=\"190\" y=\"85\" fill=\"#00f0ff\" font-size=\"14\">→</text><rect x=\"215\" y=\"45\" width=\"130\" height=\"70\" fill=\"rgba(0,255,157,0.1)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"245\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"11\">BatchNorm</text><text x=\"355\" y=\"85\" fill=\"#00ff9d\" font-size=\"14\">→</text><rect x=\"380\" y=\"45\" width=\"220\" height=\"70\" fill=\"rgba(181,95,230,0.15)\" stroke=\"#b55fe6\" rx=\"4\"/><text x=\"400\" y=\"80\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"11\">FusedConv (OpSet 14)</text><text x=\"400\" y=\"98\" fill=\"#b55fe6\" font-family=\"JetBrains Mono\" font-size=\"9\">28ms -> 6.8ms (Zero L2 Cache Spill)</text></svg>",
    "standardCitation": "Intel oneDNN Performance Guide for Multi-Core Architectures.",
    "keyKeywords": [
      "intra_op=4",
      "inter_op=1",
      "Lock contention",
      "GEMM",
      "OpenMP"
    ]
  },
  {
    "id": 45,
    "code": "4.5",
    "pillar": 4,
    "pillarTitle": "Phân Khu 4: Học Sâu MelCNN 2D & Tối Ưu Hóa ONNX Opset 14",
    "title": "Lượng tử hóa INT8 (Post-Training Quantization)",
    "difficulty": "CAO CẤP",
    "question": "Cơ chế lượng tử hóa FP32 sang INT8 và vai trò của phân kỳ KL (KL-Divergence) trong hiệu chuẩn?",
    "physics": "Chuyển dải số thực float32 (-inf, inf) thành int8 [-128, 127] với hệ số tỉ lệ Scale và Zero-point. Hiệu chuẩn KL divergence tìm ngưỡng cắt ngưỡng T để giảm thiểu mất mát phân phối xác suất.",
    "mathProof": "q = round( x / Scale ) + ZeroPoint. KL(P || Q) = SUM P(i) * log( P(i) / Q(i) ) -> min.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">ONNX OPSET 14: KERNEL FUSION (CONV2D + BATCHNORM + RELU -> FUSEDCONV)</text><rect x=\"50\" y=\"45\" width=\"130\" height=\"70\" fill=\"rgba(0,240,255,0.1)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"65\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"11\">Conv2D (k=3)</text><text x=\"190\" y=\"85\" fill=\"#00f0ff\" font-size=\"14\">→</text><rect x=\"215\" y=\"45\" width=\"130\" height=\"70\" fill=\"rgba(0,255,157,0.1)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"245\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"11\">BatchNorm</text><text x=\"355\" y=\"85\" fill=\"#00ff9d\" font-size=\"14\">→</text><rect x=\"380\" y=\"45\" width=\"220\" height=\"70\" fill=\"rgba(181,95,230,0.15)\" stroke=\"#b55fe6\" rx=\"4\"/><text x=\"400\" y=\"80\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"11\">FusedConv (OpSet 14)</text><text x=\"400\" y=\"98\" fill=\"#b55fe6\" font-family=\"JetBrains Mono\" font-size=\"9\">28ms -> 6.8ms (Zero L2 Cache Spill)</text></svg>",
    "standardCitation": "Jacob, B., et al. (2018) 'Quantization and Training of Neural Networks for Efficient Integer-Arithmetic-Only Inference'.",
    "keyKeywords": [
      "INT8",
      "Lượng tử hóa",
      "KL-Divergence",
      "Scale",
      "Zero-point"
    ]
  },
  {
    "id": 46,
    "code": "4.6",
    "pillar": 4,
    "pillarTitle": "Phân Khu 4: Học Sâu MelCNN 2D & Tối Ưu Hóa ONNX Opset 14",
    "title": "Khối kích hoạt Squeeze-and-Excitation (SE Block)",
    "difficulty": "TRUNG CẤP",
    "question": "SE Block giúp mạng chú ý đến các kênh formant quan trọng như thế nào?",
    "physics": "Squeeze nén không gian bằng Global Pooling. Excitation dùng 2 lớp Linear + Sigmoid để học trọng số kênh w_c in [0, 1]. Kênh chứa dải tần thanh môn quan trọng sẽ được khuếch đại tự động.",
    "mathProof": "s = sigma( W_2 * ReLU( W_1 * z ) ); X_scaled = s_c * X_c.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">ONNX OPSET 14: KERNEL FUSION (CONV2D + BATCHNORM + RELU -> FUSEDCONV)</text><rect x=\"50\" y=\"45\" width=\"130\" height=\"70\" fill=\"rgba(0,240,255,0.1)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"65\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"11\">Conv2D (k=3)</text><text x=\"190\" y=\"85\" fill=\"#00f0ff\" font-size=\"14\">→</text><rect x=\"215\" y=\"45\" width=\"130\" height=\"70\" fill=\"rgba(0,255,157,0.1)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"245\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"11\">BatchNorm</text><text x=\"355\" y=\"85\" fill=\"#00ff9d\" font-size=\"14\">→</text><rect x=\"380\" y=\"45\" width=\"220\" height=\"70\" fill=\"rgba(181,95,230,0.15)\" stroke=\"#b55fe6\" rx=\"4\"/><text x=\"400\" y=\"80\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"11\">FusedConv (OpSet 14)</text><text x=\"400\" y=\"98\" fill=\"#b55fe6\" font-family=\"JetBrains Mono\" font-size=\"9\">28ms -> 6.8ms (Zero L2 Cache Spill)</text></svg>",
    "standardCitation": "Hu, J., Shen, L., & Sun, G. (2018) 'Squeeze-and-Excitation Networks', CVPR.",
    "keyKeywords": [
      "SE Block",
      "Squeeze-and-Excitation",
      "Trọng số kênh",
      "Attention"
    ]
  },
  {
    "id": 47,
    "code": "4.7",
    "pillar": 4,
    "pillarTitle": "Phân Khu 4: Học Sâu MelCNN 2D & Tối Ưu Hóa ONNX Opset 14",
    "title": "Phòng vệ trước tấn công đối nghịch (Adversarial FGSM/PGD)",
    "difficulty": "CHUYÊN GIA",
    "question": "Tại sao nhiễu đối nghịch PGD đánh lừa được MelCNN nhưng bất lực trước Hard Physics Veto?",
    "physics": "Nhiễu PGD tối ưu hóa gradient trên không gian tensor ảnh phổ MelCNN nhưng không thể can thiệp vào định luật dao động cơ học của dây thanh và tích phân dội âm ISO 3382.",
    "mathProof": "x_adv = clip( x + epsilon * sign( grad_x L(theta, x, y) ) ). Hard Veto không dùng gradient.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">ONNX OPSET 14: KERNEL FUSION (CONV2D + BATCHNORM + RELU -> FUSEDCONV)</text><rect x=\"50\" y=\"45\" width=\"130\" height=\"70\" fill=\"rgba(0,240,255,0.1)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"65\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"11\">Conv2D (k=3)</text><text x=\"190\" y=\"85\" fill=\"#00f0ff\" font-size=\"14\">→</text><rect x=\"215\" y=\"45\" width=\"130\" height=\"70\" fill=\"rgba(0,255,157,0.1)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"245\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"11\">BatchNorm</text><text x=\"355\" y=\"85\" fill=\"#00ff9d\" font-size=\"14\">→</text><rect x=\"380\" y=\"45\" width=\"220\" height=\"70\" fill=\"rgba(181,95,230,0.15)\" stroke=\"#b55fe6\" rx=\"4\"/><text x=\"400\" y=\"80\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"11\">FusedConv (OpSet 14)</text><text x=\"400\" y=\"98\" fill=\"#b55fe6\" font-family=\"JetBrains Mono\" font-size=\"9\">28ms -> 6.8ms (Zero L2 Cache Spill)</text></svg>",
    "standardCitation": "Madry, A., et al. (2018) 'Towards Deep Learning Models Resistant to Adversarial Attacks', ICLR.",
    "keyKeywords": [
      "PGD",
      "FGSM",
      "Adversarial",
      "Đối nghịch",
      "Hard Veto"
    ]
  },
  {
    "id": 48,
    "code": "4.8",
    "pillar": 4,
    "pillarTitle": "Phân Khu 4: Học Sâu MelCNN 2D & Tối Ưu Hóa ONNX Opset 14",
    "title": "Trường tiếp nhận (Receptive Field) của MelCNN",
    "difficulty": "TRUNG CẤP",
    "question": "Tính toán trường tiếp nhận của mạng tích chập 4 block trên trục thời gian?",
    "physics": "Kernel 3x3, stride 1, MaxPool 2x2 ở mỗi tầng. RF = 1 + SUM (k_l - 1) * s_cumul. Tại tầng 4, RF đạt 62 khung phổ (~992ms), đủ dài để bao quát 2-3 âm tiết tiếng Việt trọn vẹn.",
    "mathProof": "RF_l = RF_{l-1} + (k_l - 1) * Product_{i=1}^{l-1} s_i.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">ONNX OPSET 14: KERNEL FUSION (CONV2D + BATCHNORM + RELU -> FUSEDCONV)</text><rect x=\"50\" y=\"45\" width=\"130\" height=\"70\" fill=\"rgba(0,240,255,0.1)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"65\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"11\">Conv2D (k=3)</text><text x=\"190\" y=\"85\" fill=\"#00f0ff\" font-size=\"14\">→</text><rect x=\"215\" y=\"45\" width=\"130\" height=\"70\" fill=\"rgba(0,255,157,0.1)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"245\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"11\">BatchNorm</text><text x=\"355\" y=\"85\" fill=\"#00ff9d\" font-size=\"14\">→</text><rect x=\"380\" y=\"45\" width=\"220\" height=\"70\" fill=\"rgba(181,95,230,0.15)\" stroke=\"#b55fe6\" rx=\"4\"/><text x=\"400\" y=\"80\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"11\">FusedConv (OpSet 14)</text><text x=\"400\" y=\"98\" fill=\"#b55fe6\" font-family=\"JetBrains Mono\" font-size=\"9\">28ms -> 6.8ms (Zero L2 Cache Spill)</text></svg>",
    "standardCitation": "Araujo, A., et al. (2019) 'Computing Receptive Fields of Convolutional Networks'.",
    "keyKeywords": [
      "Receptive Field",
      "Trường tiếp nhận",
      "992ms",
      "62 khung",
      "Conv2D"
    ]
  },
  {
    "id": 49,
    "code": "4.9",
    "pillar": 4,
    "pillarTitle": "Phân Khu 4: Học Sâu MelCNN 2D & Tối Ưu Hóa ONNX Opset 14",
    "title": "MelCNN vs Conformer/Wav2Vec 2.0 trong môi trường biên",
    "difficulty": "CAO CẤP",
    "question": "Tại sao DeepGuard chọn MelCNN 1.2M params thay vì Wav2Vec 2.0 (300M params)?",
    "physics": "Wav2Vec đòi hỏi >1.5GB RAM và độ trễ suy luận >120ms trên CPU. MelCNN chỉ tốn 85MB RAM, suy luận 6.8ms, tiết kiệm 95% chi phí hạ tầng ngân hàng trong khi độ chính xác tương đương khi kết hợp NAFE.",
    "mathProof": "Tham số: 1.2M vs 317M. FLOPs: 0.15 GFLOPs vs 18.5 GFLOPs. RAM: 85MB vs 1.8GB.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">ONNX OPSET 14: KERNEL FUSION (CONV2D + BATCHNORM + RELU -> FUSEDCONV)</text><rect x=\"50\" y=\"45\" width=\"130\" height=\"70\" fill=\"rgba(0,240,255,0.1)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"65\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"11\">Conv2D (k=3)</text><text x=\"190\" y=\"85\" fill=\"#00f0ff\" font-size=\"14\">→</text><rect x=\"215\" y=\"45\" width=\"130\" height=\"70\" fill=\"rgba(0,255,157,0.1)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"245\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"11\">BatchNorm</text><text x=\"355\" y=\"85\" fill=\"#00ff9d\" font-size=\"14\">→</text><rect x=\"380\" y=\"45\" width=\"220\" height=\"70\" fill=\"rgba(181,95,230,0.15)\" stroke=\"#b55fe6\" rx=\"4\"/><text x=\"400\" y=\"80\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"11\">FusedConv (OpSet 14)</text><text x=\"400\" y=\"98\" fill=\"#b55fe6\" font-family=\"JetBrains Mono\" font-size=\"9\">28ms -> 6.8ms (Zero L2 Cache Spill)</text></svg>",
    "standardCitation": "Baevski, A., et al. (2020) 'wav2vec 2.0: A Framework for Self-Supervised Learning', NeurIPS.",
    "keyKeywords": [
      "MelCNN",
      "Wav2Vec",
      "Conformer",
      "85MB RAM",
      "6.8ms"
    ]
  },
  {
    "id": 410,
    "code": "4.10",
    "pillar": 4,
    "pillarTitle": "Phân Khu 4: Học Sâu MelCNN 2D & Tối Ưu Hóa ONNX Opset 14",
    "title": "Tối ưu hóa L1/L2 Cache và Zero-Memory Copy trong C++",
    "difficulty": "CHUYÊN GIA",
    "question": "Kỹ thuật trỏ trực tiếp con trỏ bộ nhớ (Memory Pointer Borrowing) loại bỏ overhead ra sao?",
    "physics": "Dữ liệu audio sau khi giải mã PCM được ghi trực tiếp vào buffer liên tục của ONNX Tensor (`ort::Value::CreateTensor`), không qua bước nhân bản vector `std::vector::copy`.",
    "mathProof": "Zero-copy: ort_tensor = Ort::Value::CreateTensor<float>(info, raw_pcm_ptr, sample_count, shape, 4).",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">ONNX OPSET 14: KERNEL FUSION (CONV2D + BATCHNORM + RELU -> FUSEDCONV)</text><rect x=\"50\" y=\"45\" width=\"130\" height=\"70\" fill=\"rgba(0,240,255,0.1)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"65\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"11\">Conv2D (k=3)</text><text x=\"190\" y=\"85\" fill=\"#00f0ff\" font-size=\"14\">→</text><rect x=\"215\" y=\"45\" width=\"130\" height=\"70\" fill=\"rgba(0,255,157,0.1)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"245\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"11\">BatchNorm</text><text x=\"355\" y=\"85\" fill=\"#00ff9d\" font-size=\"14\">→</text><rect x=\"380\" y=\"45\" width=\"220\" height=\"70\" fill=\"rgba(181,95,230,0.15)\" stroke=\"#b55fe6\" rx=\"4\"/><text x=\"400\" y=\"80\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"11\">FusedConv (OpSet 14)</text><text x=\"400\" y=\"98\" fill=\"#b55fe6\" font-family=\"JetBrains Mono\" font-size=\"9\">28ms -> 6.8ms (Zero L2 Cache Spill)</text></svg>",
    "standardCitation": "Drepper, U. (2007) 'What Every Programmer Should Know About Memory'.",
    "keyKeywords": [
      "Zero-Copy",
      "L1/L2 Cache",
      "DRAM",
      "CreateTensor",
      "C++"
    ]
  },
  {
    "id": 51,
    "code": "5.1",
    "pillar": 5,
    "pillarTitle": "Phân Khu 5: Dung Hợp Quyết Định, Cổng Động & Quyền Phủ Quyết Bất Biến Vật Lý",
    "title": "Quy tắc kết hợp bằng chứng Dempster-Shafer",
    "difficulty": "CAO CẤP",
    "question": "Công thức kết hợp bằng chứng độc lập giữa MelCNN và NAFE theo Dempster-Shafer?",
    "physics": "Kết hợp 2 khối lượng tin cậy cơ sở m1 và m2. Mẫu số chuẩn hóa 1 - K loại bỏ xung đột, bảo đảm tính giao hoán và kết hợp.",
    "mathProof": "(m_1 (+) m_2)(A) = [ SUM_{B cap C = A} m_1(B) * m_2(C) ] / [ 1 - K ], với K = SUM_{B cap C = emptyset} m_1(B) * m_2(C).",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">DEMPSTER-SHAFER EVIDENCE FUSION & HARD PHYSICS VETO</text><rect x=\"50\" y=\"40\" width=\"150\" height=\"85\" fill=\"rgba(0,240,255,0.08)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"60\" y=\"65\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"10\">MelCNN Softmax</text><text x=\"60\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">m1(Fake) = 0.85</text><rect x=\"230\" y=\"40\" width=\"150\" height=\"85\" fill=\"rgba(0,255,157,0.08)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"240\" y=\"65\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">NAFE Jitter &amp; Stop</text><text x=\"240\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">m2(Fake) = 0.94</text><rect x=\"410\" y=\"40\" width=\"190\" height=\"85\" fill=\"rgba(255,51,102,0.12)\" stroke=\"#ff3366\" rx=\"4\"/><text x=\"420\" y=\"65\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"10\">Hard Veto Decision</text><text x=\"420\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">IF Jitter &lt; 0.35% -&gt; FAKE (1.0)</text></svg>",
    "standardCitation": "Shafer, G. (1976) 'A Mathematical Theory of Evidence', Princeton University Press.",
    "keyKeywords": [
      "Dempster-Shafer",
      "Kết hợp bằng chứng",
      "Khối xung đột K",
      "m1(+)m2"
    ]
  },
  {
    "id": 52,
    "code": "5.2",
    "pillar": 5,
    "pillarTitle": "Phân Khu 5: Dung Hợp Quyết Định, Cổng Động & Quyền Phủ Quyết Bất Biến Vật Lý",
    "title": "Xử lý khối mâu thuẫn K trong điều kiện đối nghịch",
    "difficulty": "CAO CẤP",
    "question": "Khi K -> 1 (MelCNN khẳng định Real 99% nhưng NAFE phát hiện Jitter=0.1% Fake 99%), công thức xử lý ra sao?",
    "physics": "Khi K > 0.85, hệ thống kích hoạt ngoại lệ nghịch lý Zadeh. Lúc này, quy tắc cộng xác suất sụp đổ; hệ thống chuyển sang chế độ Hard Veto ưu tiên bất biến vật lý.",
    "mathProof": "IF K > 0.85 AND m_{Physics}(Fake) > 0.90 -> P(Decision = FAKE) = 1.0 (VETO).",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">DEMPSTER-SHAFER EVIDENCE FUSION & HARD PHYSICS VETO</text><rect x=\"50\" y=\"40\" width=\"150\" height=\"85\" fill=\"rgba(0,240,255,0.08)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"60\" y=\"65\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"10\">MelCNN Softmax</text><text x=\"60\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">m1(Fake) = 0.85</text><rect x=\"230\" y=\"40\" width=\"150\" height=\"85\" fill=\"rgba(0,255,157,0.08)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"240\" y=\"65\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">NAFE Jitter &amp; Stop</text><text x=\"240\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">m2(Fake) = 0.94</text><rect x=\"410\" y=\"40\" width=\"190\" height=\"85\" fill=\"rgba(255,51,102,0.12)\" stroke=\"#ff3366\" rx=\"4\"/><text x=\"420\" y=\"65\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"10\">Hard Veto Decision</text><text x=\"420\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">IF Jitter &lt; 0.35% -&gt; FAKE (1.0)</text></svg>",
    "standardCitation": "Zadeh, L. A. (1984) 'Review of Books: A Mathematical Theory of Evidence', AI Magazine.",
    "keyKeywords": [
      "Nghịch lý Zadeh",
      "K -> 1",
      "Mâu thuẫn",
      "Hard Veto",
      "Zadeh"
    ]
  },
  {
    "id": 53,
    "code": "5.3",
    "pillar": 5,
    "pillarTitle": "Phân Khu 5: Dung Hợp Quyết Định, Cổng Động & Quyền Phủ Quyết Bất Biến Vật Lý",
    "title": "Khoảng tin cậy [Belief, Plausibility] trong thẩm định",
    "difficulty": "TRUNG CẤP",
    "question": "Sự khác biệt giữa Độ tin cậy (Belief) và Độ khả dĩ (Plausibility) trong quyết định cấp tín dụng?",
    "physics": "Bel(A) đo bằng chứng trực tiếp ủng hộ Fake. Pl(A) = 1 - Bel(not A) đo mức độ mà bằng chứng không thể bác bỏ Fake. Khoảng [Bel, Pl] phản ánh mức độ thiếu hiểu biết (Ignorance).",
    "mathProof": "Bel(A) <= P(A) <= Pl(A). Khi [Bel, Pl] rộng > 0.40, ngân hàng chuyển cuộc gọi sang Step-up Auth.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">DEMPSTER-SHAFER EVIDENCE FUSION & HARD PHYSICS VETO</text><rect x=\"50\" y=\"40\" width=\"150\" height=\"85\" fill=\"rgba(0,240,255,0.08)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"60\" y=\"65\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"10\">MelCNN Softmax</text><text x=\"60\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">m1(Fake) = 0.85</text><rect x=\"230\" y=\"40\" width=\"150\" height=\"85\" fill=\"rgba(0,255,157,0.08)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"240\" y=\"65\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">NAFE Jitter &amp; Stop</text><text x=\"240\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">m2(Fake) = 0.94</text><rect x=\"410\" y=\"40\" width=\"190\" height=\"85\" fill=\"rgba(255,51,102,0.12)\" stroke=\"#ff3366\" rx=\"4\"/><text x=\"420\" y=\"65\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"10\">Hard Veto Decision</text><text x=\"420\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">IF Jitter &lt; 0.35% -&gt; FAKE (1.0)</text></svg>",
    "standardCitation": "Dempster, A. P. (1967) 'Upper and Lower Probabilities Induced by a Multivalued Mapping'.",
    "keyKeywords": [
      "Belief",
      "Plausibility",
      "Ignorance",
      "Khoảng tin cậy",
      "Step-up Auth"
    ]
  },
  {
    "id": 54,
    "code": "5.4",
    "pillar": 5,
    "pillarTitle": "Phân Khu 5: Dung Hợp Quyết Định, Cổng Động & Quyền Phủ Quyết Bất Biến Vật Lý",
    "title": "Nguyên lý Quyền phủ quyết bất biến vật lý (Hard Physics Veto)",
    "difficulty": "CAO CẤP",
    "question": "Tại sao quy định một chỉ số vật lý duy nhất (Jitter < 0.35% hoặc RT60 < 0.15s) được quyền ghi đè toàn bộ mạng AI?",
    "physics": "Mạng AI học theo tương quan xác suất và có thể bị lừa bởi dữ liệu lạ (OOD) hoặc adversarial noise. Định luật vật lý sinh học và âm học không bao giờ bị phá vỡ trên cơ thể người sống.",
    "mathProof": "DECISION = (Jitter < 0.35% OR RT60 < 0.15s OR RT60 > 0.85s) ? HARD_VETO_FAKE : SOFT_FUSION.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">DEMPSTER-SHAFER EVIDENCE FUSION & HARD PHYSICS VETO</text><rect x=\"50\" y=\"40\" width=\"150\" height=\"85\" fill=\"rgba(0,240,255,0.08)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"60\" y=\"65\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"10\">MelCNN Softmax</text><text x=\"60\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">m1(Fake) = 0.85</text><rect x=\"230\" y=\"40\" width=\"150\" height=\"85\" fill=\"rgba(0,255,157,0.08)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"240\" y=\"65\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">NAFE Jitter &amp; Stop</text><text x=\"240\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">m2(Fake) = 0.94</text><rect x=\"410\" y=\"40\" width=\"190\" height=\"85\" fill=\"rgba(255,51,102,0.12)\" stroke=\"#ff3366\" rx=\"4\"/><text x=\"420\" y=\"65\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"10\">Hard Veto Decision</text><text x=\"420\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">IF Jitter &lt; 0.35% -&gt; FAKE (1.0)</text></svg>",
    "standardCitation": "Popper, K. (1959) 'The Logic of Scientific Discovery' (Nguyên lý bác bỏ).",
    "keyKeywords": [
      "Hard Physics Veto",
      "Ghi đè",
      "Bất biến vật lý",
      "OOD",
      "Phủ quyết"
    ]
  },
  {
    "id": 55,
    "code": "5.5",
    "pillar": 5,
    "pillarTitle": "Phân Khu 5: Dung Hợp Quyết Định, Cổng Động & Quyền Phủ Quyết Bất Biến Vật Lý",
    "title": "Cơ chế Cổng động thích ứng băng thông (Dynamic Gating)",
    "difficulty": "CAO CẤP",
    "question": "Hàm điều phối trọng số mềm thích ứng băng thông G.711 vận hành như thế nào?",
    "physics": "Khi phát hiện băng thông bị cắt cụt về 8kHz (G.711), cổng động tự động hạ trọng số MelCNN từ 0.50 xuống 0.10, đồng thời nâng trọng số NAFE F0/Jitter từ 0.30 lên 0.65.",
    "mathProof": "W_cnn = sigma( alpha * (BW - 8000) ); W_prosody = 0.90 - W_cnn; W_acoustics = 0.10.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">DEMPSTER-SHAFER EVIDENCE FUSION & HARD PHYSICS VETO</text><rect x=\"50\" y=\"40\" width=\"150\" height=\"85\" fill=\"rgba(0,240,255,0.08)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"60\" y=\"65\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"10\">MelCNN Softmax</text><text x=\"60\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">m1(Fake) = 0.85</text><rect x=\"230\" y=\"40\" width=\"150\" height=\"85\" fill=\"rgba(0,255,157,0.08)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"240\" y=\"65\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">NAFE Jitter &amp; Stop</text><text x=\"240\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">m2(Fake) = 0.94</text><rect x=\"410\" y=\"40\" width=\"190\" height=\"85\" fill=\"rgba(255,51,102,0.12)\" stroke=\"#ff3366\" rx=\"4\"/><text x=\"420\" y=\"65\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"10\">Hard Veto Decision</text><text x=\"420\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">IF Jitter &lt; 0.35% -&gt; FAKE (1.0)</text></svg>",
    "standardCitation": "Jordan, M. I., & Jacobs, R. A. (1994) 'Hierarchical Mixtures of Experts'.",
    "keyKeywords": [
      "Cổng động",
      "Gating Network",
      "G.711",
      "Trọng số mềm",
      "Thích ứng"
    ]
  },
  {
    "id": 56,
    "code": "5.6",
    "pillar": 5,
    "pillarTitle": "Phân Khu 5: Dung Hợp Quyết Định, Cổng Động & Quyền Phủ Quyết Bất Biến Vật Lý",
    "title": "Chính sách phân vùng 3 dải (Tri-Band Policy)",
    "difficulty": "TRUNG CẤP",
    "question": "Mô tả 3 dải quyết định [0, 0.3), [0.3, 0.8), [0.8, 1.0] và hành vi tương ứng?",
    "physics": "Dải Xanh [0.0, 0.3): An toàn, giải ngân ngay lập tức. Dải Vàng [0.3, 0.8): Nghi vấn, kích hoạt OTP giọng nói chứa thanh Ngã/Nặng. Dải Đỏ [0.8, 1.0]: Chặn cứng, khóa tài khoản.",
    "mathProof": "FPR dải đỏ < 0.03%. Tỷ lệ cuộc gọi rơi vào dải vàng < 2.5%, đảm bảo trải nghiệm người dùng.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">DEMPSTER-SHAFER EVIDENCE FUSION & HARD PHYSICS VETO</text><rect x=\"50\" y=\"40\" width=\"150\" height=\"85\" fill=\"rgba(0,240,255,0.08)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"60\" y=\"65\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"10\">MelCNN Softmax</text><text x=\"60\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">m1(Fake) = 0.85</text><rect x=\"230\" y=\"40\" width=\"150\" height=\"85\" fill=\"rgba(0,255,157,0.08)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"240\" y=\"65\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">NAFE Jitter &amp; Stop</text><text x=\"240\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">m2(Fake) = 0.94</text><rect x=\"410\" y=\"40\" width=\"190\" height=\"85\" fill=\"rgba(255,51,102,0.12)\" stroke=\"#ff3366\" rx=\"4\"/><text x=\"420\" y=\"65\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"10\">Hard Veto Decision</text><text x=\"420\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">IF Jitter &lt; 0.35% -&gt; FAKE (1.0)</text></svg>",
    "standardCitation": "Basel Committee on Banking Supervision: 'Operational Risk Guidelines for Biometrics'.",
    "keyKeywords": [
      "Tri-Band",
      "Dải Xanh",
      "Dải Vàng",
      "Dải Đỏ",
      "Step-up"
    ]
  },
  {
    "id": 57,
    "code": "5.7",
    "pillar": 5,
    "pillarTitle": "Phân Khu 5: Dung Hợp Quyết Định, Cổng Động & Quyền Phủ Quyết Bất Biến Vật Lý",
    "title": "Xác thực tăng cường (Step-up Auth) với thử thách ngữ âm động",
    "difficulty": "CAO CẤP",
    "question": "Máy chủ sinh cụm từ thử thách chứa thanh Ngã ngẫu nhiên như thế nào để bẫy bot AI?",
    "physics": "Hệ thống yêu cầu đọc: 'Tôi xác nhận chuyển khoản cho bà Nguyễn Thị Mỹ Diễm'. Cụm từ chứa liên tiếp 3 thanh Ngã ('Mỹ', 'Diễm', 'Nguyễn'). Bot AI không thể phản xạ siết nắp thanh môn thời gian thực.",
    "mathProof": "Challenge-Response: Kẻ tấn công mất >1.5s để sinh âm thanh mới qua API -> Vỡ ngân sách độ trễ.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">DEMPSTER-SHAFER EVIDENCE FUSION & HARD PHYSICS VETO</text><rect x=\"50\" y=\"40\" width=\"150\" height=\"85\" fill=\"rgba(0,240,255,0.08)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"60\" y=\"65\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"10\">MelCNN Softmax</text><text x=\"60\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">m1(Fake) = 0.85</text><rect x=\"230\" y=\"40\" width=\"150\" height=\"85\" fill=\"rgba(0,255,157,0.08)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"240\" y=\"65\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">NAFE Jitter &amp; Stop</text><text x=\"240\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">m2(Fake) = 0.94</text><rect x=\"410\" y=\"40\" width=\"190\" height=\"85\" fill=\"rgba(255,51,102,0.12)\" stroke=\"#ff3366\" rx=\"4\"/><text x=\"420\" y=\"65\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"10\">Hard Veto Decision</text><text x=\"420\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">IF Jitter &lt; 0.35% -&gt; FAKE (1.0)</text></svg>",
    "standardCitation": "NIST SP 800-63B 'Digital Identity Guidelines: Authentication and Lifecycle'.",
    "keyKeywords": [
      "Step-up Auth",
      "Thanh Ngã",
      "Nguyễn Thị Mỹ Diễm",
      "Challenge-Response"
    ]
  },
  {
    "id": 58,
    "code": "5.8",
    "pillar": 5,
    "pillarTitle": "Phân Khu 5: Dung Hợp Quyết Định, Cổng Động & Quyền Phủ Quyết Bất Biến Vật Lý",
    "title": "Chứng minh toán học tỷ lệ báo động giả FPR < 0.03%",
    "difficulty": "CHUYÊN GIA",
    "question": "Dẫn giải xác suất đồng thuận đa tầng độc lập chứng minh FPR đạt chuẩn ngân hàng?",
    "physics": "P(FP_total) = P(FP_CNN) * P(FP_Prosody) * P(FP_Schroeder). Giả sử mỗi tầng có FPR=5% (0.05). Xác suất cả 3 tầng cùng báo động nhầm: 0.05 * 0.05 * 0.05 = 0.000125 (0.0125% < 0.03%).",
    "mathProof": "P(FP) = Product_{i=1}^3 P(FP_i) = 0.05^3 = 1.25 times 10^{-4} = 0.0125%.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">DEMPSTER-SHAFER EVIDENCE FUSION & HARD PHYSICS VETO</text><rect x=\"50\" y=\"40\" width=\"150\" height=\"85\" fill=\"rgba(0,240,255,0.08)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"60\" y=\"65\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"10\">MelCNN Softmax</text><text x=\"60\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">m1(Fake) = 0.85</text><rect x=\"230\" y=\"40\" width=\"150\" height=\"85\" fill=\"rgba(0,255,157,0.08)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"240\" y=\"65\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">NAFE Jitter &amp; Stop</text><text x=\"240\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">m2(Fake) = 0.94</text><rect x=\"410\" y=\"40\" width=\"190\" height=\"85\" fill=\"rgba(255,51,102,0.12)\" stroke=\"#ff3366\" rx=\"4\"/><text x=\"420\" y=\"65\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"10\">Hard Veto Decision</text><text x=\"420\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">IF Jitter &lt; 0.35% -&gt; FAKE (1.0)</text></svg>",
    "standardCitation": "Papoulis, A. 'Probability, Random Variables and Stochastic Processes'.",
    "keyKeywords": [
      "FPR < 0.03%",
      "Đồng thuận đa tầng",
      "Tích xác suất",
      "Báo động giả"
    ]
  },
  {
    "id": 59,
    "code": "5.9",
    "pillar": 5,
    "pillarTitle": "Phân Khu 5: Dung Hợp Quyết Định, Cổng Động & Quyền Phủ Quyết Bất Biến Vật Lý",
    "title": "Tối ưu hóa Equal Error Rate (EER) và đường cong DET",
    "difficulty": "TRUNG CẤP",
    "question": "EER là gì và tại sao trong ngân hàng người ta không chọn ngưỡng tại điểm EER?",
    "physics": "EER là điểm mà tỷ lệ từ chối sai (FRR) bằng tỷ lệ chấp nhận sai (FAR). Trong ngân hàng, rủi ro mất tiền lớn hơn rủi ro phiền khách hàng, nên dời ngưỡng sang trái để ép FAR cực tiểu.",
    "mathProof": "FAR(theta) = FRR(theta) = EER. Ngân hàng chọn theta_bank sao cho FAR < 0.01%, chấp nhận FRR tăng nhẹ.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">DEMPSTER-SHAFER EVIDENCE FUSION & HARD PHYSICS VETO</text><rect x=\"50\" y=\"40\" width=\"150\" height=\"85\" fill=\"rgba(0,240,255,0.08)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"60\" y=\"65\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"10\">MelCNN Softmax</text><text x=\"60\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">m1(Fake) = 0.85</text><rect x=\"230\" y=\"40\" width=\"150\" height=\"85\" fill=\"rgba(0,255,157,0.08)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"240\" y=\"65\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">NAFE Jitter &amp; Stop</text><text x=\"240\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">m2(Fake) = 0.94</text><rect x=\"410\" y=\"40\" width=\"190\" height=\"85\" fill=\"rgba(255,51,102,0.12)\" stroke=\"#ff3366\" rx=\"4\"/><text x=\"420\" y=\"65\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"10\">Hard Veto Decision</text><text x=\"420\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">IF Jitter &lt; 0.35% -&gt; FAKE (1.0)</text></svg>",
    "standardCitation": "Martin, A., et al. (1997) 'The DET Curve in Assessment of Detection Performance', Interspeech.",
    "keyKeywords": [
      "EER",
      "FAR",
      "FRR",
      "DET Curve",
      "Equal Error Rate"
    ]
  },
  {
    "id": 510,
    "code": "5.10",
    "pillar": 5,
    "pillarTitle": "Phân Khu 5: Dung Hợp Quyết Định, Cổng Động & Quyền Phủ Quyết Bất Biến Vật Lý",
    "title": "Hàm chi phí quyết định tối thiểu (minDCF)",
    "difficulty": "CHUYÊN GIA",
    "question": "Công thức tính minDCF theo chuẩn NIST SRE áp dụng vào chi phí gian lận ngân hàng?",
    "physics": "C_Det = C_Miss * P_Miss * P_Target + C_FA * P_FA * (1 - P_Target). Với C_FA (để lọt kẻ lừa đảo mất 5 tỷ) gấp 1000 lần C_Miss (hỏi lại khách hàng).",
    "mathProof": "DCF_{norm} = C_Det / min( C_Miss*P_Target, C_FA*(1-P_Target) ). Tối ưu hóa ngưỡng theo chi phí thực tế.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">DEMPSTER-SHAFER EVIDENCE FUSION & HARD PHYSICS VETO</text><rect x=\"50\" y=\"40\" width=\"150\" height=\"85\" fill=\"rgba(0,240,255,0.08)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"60\" y=\"65\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"10\">MelCNN Softmax</text><text x=\"60\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">m1(Fake) = 0.85</text><rect x=\"230\" y=\"40\" width=\"150\" height=\"85\" fill=\"rgba(0,255,157,0.08)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"240\" y=\"65\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">NAFE Jitter &amp; Stop</text><text x=\"240\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">m2(Fake) = 0.94</text><rect x=\"410\" y=\"40\" width=\"190\" height=\"85\" fill=\"rgba(255,51,102,0.12)\" stroke=\"#ff3366\" rx=\"4\"/><text x=\"420\" y=\"65\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"10\">Hard Veto Decision</text><text x=\"420\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">IF Jitter &lt; 0.35% -&gt; FAKE (1.0)</text></svg>",
    "standardCitation": "NIST 2022 Speaker Recognition Evaluation (SRE) Plan.",
    "keyKeywords": [
      "minDCF",
      "NIST SRE",
      "Chi phí gian lận",
      "C_FA",
      "C_Miss"
    ]
  },
  {
    "id": 61,
    "code": "6.1",
    "pillar": 6,
    "pillarTitle": "Phân Khu 6: Bóc Tách Dấu Vân Tay & Định Danh Họ Mô Hình AI (Attribution)",
    "title": "Dấu vân tay của Vocoder HiFi-GAN",
    "difficulty": "CAO CẤP",
    "question": "Khối Multi-Period Discriminator (MPD) của HiFi-GAN để lại vết tích phổ tuần hoàn nào?",
    "physics": "MPD chia tín hiệu thành các chu kỳ ngầm định p in [2, 3, 5, 7, 11]. Điều này vô tình để lại các đường vạch phổ mờ (spectral grid artifacts) ở các tần số f_s/p, lật tẩy nguồn gốc HiFi-GAN.",
    "mathProof": "Spike Frequency: f_spike = k * (f_s / p). Hiện rõ khi trừ nền phổ trung bình qua Spectral Subtraction.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">VOCODER ATTRIBUTION & LATENT FINGERPRINT CLUSTERING</text><circle cx=\"120\" cy=\"85\" r=\"45\" fill=\"rgba(0,240,255,0.15)\" stroke=\"#00f0ff\"/><text x=\"90\" y=\"88\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"9\">HiFi-GAN</text><circle cx=\"270\" cy=\"85\" r=\"45\" fill=\"rgba(255,51,102,0.15)\" stroke=\"#ff3366\"/><text x=\"240\" y=\"88\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">RVC v2</text><circle cx=\"420\" cy=\"85\" r=\"45\" fill=\"rgba(181,95,230,0.15)\" stroke=\"#b55fe6\"/><text x=\"390\" y=\"88\" fill=\"#b55fe6\" font-family=\"JetBrains Mono\" font-size=\"9\">ElevenLabs</text><circle cx=\"560\" cy=\"85\" r=\"45\" fill=\"rgba(0,255,157,0.15)\" stroke=\"#00ff9d\"/><text x=\"535\" y=\"88\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"9\">Human</text></svg>",
    "standardCitation": "Kong, J., et al. (2020) 'HiFi-GAN: Generative Adversarial Networks for Efficient Speech Synthesis'.",
    "keyKeywords": [
      "HiFi-GAN",
      "MPD",
      "Dấu vân tay",
      "Spectral Grid",
      "Chu kỳ p"
    ]
  },
  {
    "id": 62,
    "code": "6.2",
    "pillar": 6,
    "pillarTitle": "Phân Khu 6: Bóc Tách Dấu Vân Tay & Định Danh Họ Mô Hình AI (Attribution)",
    "title": "Dấu hiệu đứt gãy ranh giới token của Bark / Tortoise",
    "difficulty": "CAO CẤP",
    "question": "Tại sao mô hình tự hồi quy (Autoregressive Token Audio) sinh ra tiếng click/pop ngẫu nhiên?",
    "physics": "Bark dự đoán từng vector token âm thanh rời rạc (EnCodec codes). Tại ranh giới giữa 2 token kế tiếp (cách nhau ~13ms), việc giải mã EnCodec bị lệch pha, sinh ra các cú sốc biên độ vi mô.",
    "mathProof": "Delta y = |y[n] - y[n-1]| > 0.4 tại n = k * L_{token}. Gây đột biến đạo hàm bậc 1 d/dt.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">VOCODER ATTRIBUTION & LATENT FINGERPRINT CLUSTERING</text><circle cx=\"120\" cy=\"85\" r=\"45\" fill=\"rgba(0,240,255,0.15)\" stroke=\"#00f0ff\"/><text x=\"90\" y=\"88\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"9\">HiFi-GAN</text><circle cx=\"270\" cy=\"85\" r=\"45\" fill=\"rgba(255,51,102,0.15)\" stroke=\"#ff3366\"/><text x=\"240\" y=\"88\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">RVC v2</text><circle cx=\"420\" cy=\"85\" r=\"45\" fill=\"rgba(181,95,230,0.15)\" stroke=\"#b55fe6\"/><text x=\"390\" y=\"88\" fill=\"#b55fe6\" font-family=\"JetBrains Mono\" font-size=\"9\">ElevenLabs</text><circle cx=\"560\" cy=\"85\" r=\"45\" fill=\"rgba(0,255,157,0.15)\" stroke=\"#00ff9d\"/><text x=\"535\" y=\"88\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"9\">Human</text></svg>",
    "standardCitation": "Suno AI 'Bark Architecture' (2023); Défossez, A., et al. 'High Fidelity Audio Compression with EnCodec'.",
    "keyKeywords": [
      "Bark",
      "Tortoise",
      "Token boundary",
      "Click pop",
      "EnCodec"
    ]
  },
  {
    "id": 63,
    "code": "6.3",
    "pillar": 6,
    "pillarTitle": "Phân Khu 6: Bóc Tách Dấu Vân Tay & Định Danh Họ Mô Hình AI (Attribution)",
    "title": "Vết cắt trơn cao tần của ElevenLabs",
    "difficulty": "TRUNG CẤP",
    "question": "ElevenLabs sử dụng Latent Diffusion Vocoder. Tại sao dải tần > 6.5kHz lại mượt mà bất thường?",
    "physics": "Quá trình khử nhiễu khuếch tán (Diffusion Denoising) trong không gian ẩn có xu hướng trung bình hóa các biến thiên ngẫu nhiên cao tần, làm mất đi các hài âm xì tự nhiên của thanh môn.",
    "mathProof": "Spectral Flatness Measure (SFM) ở dải 6-8kHz: SFM_{ElevenLabs} < 0.05 (rất thấp so với SFM_{Human} ~ 0.25).",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">VOCODER ATTRIBUTION & LATENT FINGERPRINT CLUSTERING</text><circle cx=\"120\" cy=\"85\" r=\"45\" fill=\"rgba(0,240,255,0.15)\" stroke=\"#00f0ff\"/><text x=\"90\" y=\"88\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"9\">HiFi-GAN</text><circle cx=\"270\" cy=\"85\" r=\"45\" fill=\"rgba(255,51,102,0.15)\" stroke=\"#ff3366\"/><text x=\"240\" y=\"88\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">RVC v2</text><circle cx=\"420\" cy=\"85\" r=\"45\" fill=\"rgba(181,95,230,0.15)\" stroke=\"#b55fe6\"/><text x=\"390\" y=\"88\" fill=\"#b55fe6\" font-family=\"JetBrains Mono\" font-size=\"9\">ElevenLabs</text><circle cx=\"560\" cy=\"85\" r=\"45\" fill=\"rgba(0,255,157,0.15)\" stroke=\"#00ff9d\"/><text x=\"535\" y=\"88\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"9\">Human</text></svg>",
    "standardCitation": "Rombach, R., et al. (2022) 'High-Resolution Image Synthesis with Latent Diffusion Models'.",
    "keyKeywords": [
      "ElevenLabs",
      "Diffusion",
      "Cao tần mịn",
      "SFM",
      "Latent"
    ]
  },
  {
    "id": 64,
    "code": "6.4",
    "pillar": 6,
    "pillarTitle": "Phân Khu 6: Bóc Tách Dấu Vân Tay & Định Danh Họ Mô Hình AI (Attribution)",
    "title": "Nhảy pha cục bộ (Phase Jump) của RVC v2",
    "difficulty": "TRUNG CẤP",
    "question": "RVC v2 ghép nối giọng nói người dùng với đặc trưng của nạn nhân như thế nào và gây lỗi gì?",
    "physics": "RVC v2 dùng mạng VITS kết hợp Harvest F0. Khi cao độ giọng người tấn công biến thiên nhanh, bộ dao động điều hòa bị lỗi pha tức thời, làm dạng sóng bị xoắn đứt đoạn.",
    "mathProof": "Phase Glitch Index: PGI = SUM |angle(X[k, t]) - 2*angle(X[k, t-1]) + angle(X[k, t-2])| > Threshold.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">VOCODER ATTRIBUTION & LATENT FINGERPRINT CLUSTERING</text><circle cx=\"120\" cy=\"85\" r=\"45\" fill=\"rgba(0,240,255,0.15)\" stroke=\"#00f0ff\"/><text x=\"90\" y=\"88\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"9\">HiFi-GAN</text><circle cx=\"270\" cy=\"85\" r=\"45\" fill=\"rgba(255,51,102,0.15)\" stroke=\"#ff3366\"/><text x=\"240\" y=\"88\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">RVC v2</text><circle cx=\"420\" cy=\"85\" r=\"45\" fill=\"rgba(181,95,230,0.15)\" stroke=\"#b55fe6\"/><text x=\"390\" y=\"88\" fill=\"#b55fe6\" font-family=\"JetBrains Mono\" font-size=\"9\">ElevenLabs</text><circle cx=\"560\" cy=\"85\" r=\"45\" fill=\"rgba(0,255,157,0.15)\" stroke=\"#00ff9d\"/><text x=\"535\" y=\"88\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"9\">Human</text></svg>",
    "standardCitation": "RVC-Project (2023) 'Retrieval-based Voice Conversion Architecture'; Kim, J., et al. 'VITS'.",
    "keyKeywords": [
      "RVC v2",
      "VITS",
      "Phase Glitch",
      "Nhảy pha",
      "Voice Conversion"
    ]
  },
  {
    "id": 65,
    "code": "6.5",
    "pillar": 6,
    "pillarTitle": "Phân Khu 6: Bóc Tách Dấu Vân Tay & Định Danh Họ Mô Hình AI (Attribution)",
    "title": "Phổ bậc cao Bicoherence bắt tính phi tuyến",
    "difficulty": "CHUYÊN GIA",
    "question": "Bicoherence phân biệt âm thanh tạo bởi cơ học dây thanh và mạng nơ-ron tích chập ra sao?",
    "physics": "Dây thanh quản sinh học tạo ra tương tác ghép pha phi tuyến (Quadratic Phase Coupling - QPC) giữa các tần số f1, f2 và f1+f2. Neural Vocoder tạo âm bằng các lớp tích chập tuyến tính nên Bicoherence = 0.",
    "mathProof": "b^2(f_1, f_2) = |B(f_1, f_2)|^2 / [ E[|X(f_1)X(f_2)|^2] * E[|X(f_1+f_2)|^2] ]. Người thật: b^2 > 0.4.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">VOCODER ATTRIBUTION & LATENT FINGERPRINT CLUSTERING</text><circle cx=\"120\" cy=\"85\" r=\"45\" fill=\"rgba(0,240,255,0.15)\" stroke=\"#00f0ff\"/><text x=\"90\" y=\"88\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"9\">HiFi-GAN</text><circle cx=\"270\" cy=\"85\" r=\"45\" fill=\"rgba(255,51,102,0.15)\" stroke=\"#ff3366\"/><text x=\"240\" y=\"88\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">RVC v2</text><circle cx=\"420\" cy=\"85\" r=\"45\" fill=\"rgba(181,95,230,0.15)\" stroke=\"#b55fe6\"/><text x=\"390\" y=\"88\" fill=\"#b55fe6\" font-family=\"JetBrains Mono\" font-size=\"9\">ElevenLabs</text><circle cx=\"560\" cy=\"85\" r=\"45\" fill=\"rgba(0,255,157,0.15)\" stroke=\"#00ff9d\"/><text x=\"535\" y=\"88\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"9\">Human</text></svg>",
    "standardCitation": "Nikias, C. L., & Mendel, J. M. (1993) 'Signal Processing with Higher-Order Spectra', IEEE SPM.",
    "keyKeywords": [
      "Bicoherence",
      "HOS",
      "QPC",
      "Ghép pha phi tuyến",
      "Dây thanh"
    ]
  },
  {
    "id": 66,
    "code": "6.6",
    "pillar": 6,
    "pillarTitle": "Phân Khu 6: Bóc Tách Dấu Vân Tay & Định Danh Họ Mô Hình AI (Attribution)",
    "title": "Artifact kẻ ca-rô (Checkerboard Artifacts) do Transposed Conv",
    "difficulty": "CAO CẤP",
    "question": "Tại sao lớp tích chập chuyển vị (Transposed Convolution) trong Vocoder tạo sọc lưới phổ?",
    "physics": "Khi kích thước kernel không chia hết cho stride, các phép cộng dồn vùng chồng lấn không đều nhau (uneven overlap), tạo thành họa tiết răng cưa tuần hoàn trên ma trận phổ Mel.",
    "mathProof": "Overlap Pattern: O[n] = SUM_k rect((n - k*stride) / kernel_size) dao động tuần hoàn chu kỳ stride.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">VOCODER ATTRIBUTION & LATENT FINGERPRINT CLUSTERING</text><circle cx=\"120\" cy=\"85\" r=\"45\" fill=\"rgba(0,240,255,0.15)\" stroke=\"#00f0ff\"/><text x=\"90\" y=\"88\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"9\">HiFi-GAN</text><circle cx=\"270\" cy=\"85\" r=\"45\" fill=\"rgba(255,51,102,0.15)\" stroke=\"#ff3366\"/><text x=\"240\" y=\"88\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">RVC v2</text><circle cx=\"420\" cy=\"85\" r=\"45\" fill=\"rgba(181,95,230,0.15)\" stroke=\"#b55fe6\"/><text x=\"390\" y=\"88\" fill=\"#b55fe6\" font-family=\"JetBrains Mono\" font-size=\"9\">ElevenLabs</text><circle cx=\"560\" cy=\"85\" r=\"45\" fill=\"rgba(0,255,157,0.15)\" stroke=\"#00ff9d\"/><text x=\"535\" y=\"88\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"9\">Human</text></svg>",
    "standardCitation": "Odena, A., Dumoulin, V., & Olah, C. (2016) 'Deconvolution and Checkerboard Artifacts', Distill.",
    "keyKeywords": [
      "Checkerboard",
      "Transposed Conv",
      "Ca-rô",
      "Chồng lấn",
      "Stride"
    ]
  },
  {
    "id": 67,
    "code": "6.7",
    "pillar": 6,
    "pillarTitle": "Phân Khu 6: Bóc Tách Dấu Vân Tay & Định Danh Họ Mô Hình AI (Attribution)",
    "title": "Multi-Scale Sub-band Discriminator Artifacts",
    "difficulty": "CHUYÊN GIA",
    "question": "Vocoder hiện đại chia dải tần thành 4 sub-bands (PQMF) để tăng tốc độ. Lỗi xuất hiện ở đâu?",
    "physics": "Tại các tần số cắt ranh giới giữa các sub-band (ví dụ 2kHz, 4kHz, 6kHz), việc ghép nối pha của bộ lọc PQMF không lý tưởng tạo ra các rãnh suy hao năng lượng sâu 1-2 bins.",
    "mathProof": "PQMF Boundary Notch: S(f_boundary) sụt giảm đột ngột > 8 dB so với 2 bins lân cận.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">VOCODER ATTRIBUTION & LATENT FINGERPRINT CLUSTERING</text><circle cx=\"120\" cy=\"85\" r=\"45\" fill=\"rgba(0,240,255,0.15)\" stroke=\"#00f0ff\"/><text x=\"90\" y=\"88\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"9\">HiFi-GAN</text><circle cx=\"270\" cy=\"85\" r=\"45\" fill=\"rgba(255,51,102,0.15)\" stroke=\"#ff3366\"/><text x=\"240\" y=\"88\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">RVC v2</text><circle cx=\"420\" cy=\"85\" r=\"45\" fill=\"rgba(181,95,230,0.15)\" stroke=\"#b55fe6\"/><text x=\"390\" y=\"88\" fill=\"#b55fe6\" font-family=\"JetBrains Mono\" font-size=\"9\">ElevenLabs</text><circle cx=\"560\" cy=\"85\" r=\"45\" fill=\"rgba(0,255,157,0.15)\" stroke=\"#00ff9d\"/><text x=\"535\" y=\"88\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"9\">Human</text></svg>",
    "standardCitation": "Yang, G., et al. (2021) 'Multi-Band MelGAN: Faster Waveform Generation for High-Quality TTS'.",
    "keyKeywords": [
      "Sub-band",
      "PQMF",
      "Multi-Scale",
      "Ranh giới tần số",
      "MelGAN"
    ]
  },
  {
    "id": 68,
    "code": "6.8",
    "pillar": 6,
    "pillarTitle": "Phân Khu 6: Bóc Tách Dấu Vân Tay & Định Danh Họ Mô Hình AI (Attribution)",
    "title": "Dải cao độ bẹp (F0 Range Compression) trong FastSpeech 2",
    "difficulty": "TRUNG CẤP",
    "question": "Tại sao các mô hình FastSpeech 2 / VITS nói tiếng Việt nghe đều đều như đọc kinh?",
    "physics": "Mô hình học theo phân phối F0 Gaussian và hàm loss MSE phạt nặng các giá trị F0 cực trị. Hậu quả là dải F0 bị nén chặt (Delta F0 < 55Hz), làm mất ngữ điệu cảm xúc tự nhiên.",
    "mathProof": "Delta F_0 = F_{0, max} - F_{0, min} < 55 Hz (Người nói tự nhiên có Delta F_0 từ 110Hz đến 220Hz).",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">VOCODER ATTRIBUTION & LATENT FINGERPRINT CLUSTERING</text><circle cx=\"120\" cy=\"85\" r=\"45\" fill=\"rgba(0,240,255,0.15)\" stroke=\"#00f0ff\"/><text x=\"90\" y=\"88\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"9\">HiFi-GAN</text><circle cx=\"270\" cy=\"85\" r=\"45\" fill=\"rgba(255,51,102,0.15)\" stroke=\"#ff3366\"/><text x=\"240\" y=\"88\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">RVC v2</text><circle cx=\"420\" cy=\"85\" r=\"45\" fill=\"rgba(181,95,230,0.15)\" stroke=\"#b55fe6\"/><text x=\"390\" y=\"88\" fill=\"#b55fe6\" font-family=\"JetBrains Mono\" font-size=\"9\">ElevenLabs</text><circle cx=\"560\" cy=\"85\" r=\"45\" fill=\"rgba(0,255,157,0.15)\" stroke=\"#00ff9d\"/><text x=\"535\" y=\"88\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"9\">Human</text></svg>",
    "standardCitation": "Ren, Y., et al. (2020) 'FastSpeech 2: Fast and High-Quality End-to-End Text to Speech', ICLR.",
    "keyKeywords": [
      "FastSpeech 2",
      "F0 Compression",
      "Nén dải cao độ",
      "Đều đều",
      "MSE"
    ]
  },
  {
    "id": 69,
    "code": "6.9",
    "pillar": 6,
    "pillarTitle": "Phân Khu 6: Bóc Tách Dấu Vân Tay & Định Danh Họ Mô Hình AI (Attribution)",
    "title": "Phân cụm không gian ẩn (Latent Attribution Clustering)",
    "difficulty": "CAO CẤP",
    "question": "Cách trích xuất vector embedding 64-D để truy tìm kẻ tấn công sử dụng công cụ mã nguồn mở nào?",
    "physics": "Trích xuất vector từ tầng trước phân loại của MelCNN, đưa qua thuật toán t-SNE hoặc UMAP. Các mẫu cùng mã nguồn AI sẽ co cụm thành các cụm riêng biệt với khoảng cách Cosine < 0.15.",
    "mathProof": "d_{cosine}(z_i, z_j) = 1 - (z_i cdot z_j) / (||z_i|| * ||z_j||). Phân biệt rạch ròi 6 họ mô hình AI.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">VOCODER ATTRIBUTION & LATENT FINGERPRINT CLUSTERING</text><circle cx=\"120\" cy=\"85\" r=\"45\" fill=\"rgba(0,240,255,0.15)\" stroke=\"#00f0ff\"/><text x=\"90\" y=\"88\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"9\">HiFi-GAN</text><circle cx=\"270\" cy=\"85\" r=\"45\" fill=\"rgba(255,51,102,0.15)\" stroke=\"#ff3366\"/><text x=\"240\" y=\"88\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">RVC v2</text><circle cx=\"420\" cy=\"85\" r=\"45\" fill=\"rgba(181,95,230,0.15)\" stroke=\"#b55fe6\"/><text x=\"390\" y=\"88\" fill=\"#b55fe6\" font-family=\"JetBrains Mono\" font-size=\"9\">ElevenLabs</text><circle cx=\"560\" cy=\"85\" r=\"45\" fill=\"rgba(0,255,157,0.15)\" stroke=\"#00ff9d\"/><text x=\"535\" y=\"88\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"9\">Human</text></svg>",
    "standardCitation": "Wang, S., et al. (2020) 'CNN-generated images are surprisingly easy to spot... for now', CVPR.",
    "keyKeywords": [
      "Attribution Clustering",
      "Không gian ẩn",
      "t-SNE",
      "Cosine",
      "Định danh"
    ]
  },
  {
    "id": 610,
    "code": "6.10",
    "pillar": 6,
    "pillarTitle": "Phân Khu 6: Bóc Tách Dấu Vân Tay & Định Danh Họ Mô Hình AI (Attribution)",
    "title": "Tấn công làm mờ dấu vết pháp y (Anti-Forensic Masking)",
    "difficulty": "CHUYÊN GIA",
    "question": "Kẻ tấn công có thể chèn thêm nhiễu trắng Gaussian để xóa dấu vân tay vocoder không?",
    "physics": "Chèn nhiễu trắng làm giảm SNR nhưng không thể che lấp hiện tượng thiếu hụt Glottal Stop trên thanh Ngã và không sửa được tích phân dội âm Schroeder ISO 3382.",
    "mathProof": "White noise N(0, sigma^2) làm tăng nền nhiễu đồng nhất nhưng không tái lập được vi cấu trúc chu kỳ thanh môn.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">VOCODER ATTRIBUTION & LATENT FINGERPRINT CLUSTERING</text><circle cx=\"120\" cy=\"85\" r=\"45\" fill=\"rgba(0,240,255,0.15)\" stroke=\"#00f0ff\"/><text x=\"90\" y=\"88\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"9\">HiFi-GAN</text><circle cx=\"270\" cy=\"85\" r=\"45\" fill=\"rgba(255,51,102,0.15)\" stroke=\"#ff3366\"/><text x=\"240\" y=\"88\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">RVC v2</text><circle cx=\"420\" cy=\"85\" r=\"45\" fill=\"rgba(181,95,230,0.15)\" stroke=\"#b55fe6\"/><text x=\"390\" y=\"88\" fill=\"#b55fe6\" font-family=\"JetBrains Mono\" font-size=\"9\">ElevenLabs</text><circle cx=\"560\" cy=\"85\" r=\"45\" fill=\"rgba(0,255,157,0.15)\" stroke=\"#00ff9d\"/><text x=\"535\" y=\"88\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"9\">Human</text></svg>",
    "standardCitation": "Stamm, M. C., & Liu, K. J. (2013) 'Anti-Forensics for Digital Media', IEEE SPM.",
    "keyKeywords": [
      "Anti-Forensics",
      "Nhiễu trắng",
      "Gaussian",
      "Che mờ",
      "Không thể xóa"
    ]
  },
  {
    "id": 71,
    "code": "7.1",
    "pillar": 7,
    "pillarTitle": "Phân Khu 7: Sinh Trắc Giọng Nói 1:1 & Phân Ly Không Gian Trực Giao",
    "title": "Kiến trúc mạng trích xuất sinh trắc ECAPA-TDNN",
    "difficulty": "CAO CẤP",
    "question": "ECAPA-TDNN bóc tách đặc trưng định danh người nói vượt trội hơn i-vector thế nào?",
    "physics": "ECAPA-TDNN dùng các khối 1D Res2Net kết hợp Squeeze-and-Excitation và pooling thống kê đa kênh (MFA), học được đặc trưng chiều sâu của đường dẫn âm thanh độc bản của từng cá nhân.",
    "mathProof": "x-vector in R^{192}. Huấn luyện bằng hàm mất mát AAM-Softmax (Additive Angular Margin Loss).",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">1:1 VOICE BIOMETRICS: ORTHOGONAL DECOMPOSITION V = S_ID ⊕ S_LIVE</text><line x1=\"100\" y1=\"130\" x2=\"350\" y2=\"130\" stroke=\"#00f0ff\" stroke-width=\"2.5\"/><text x=\"130\" y=\"145\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"9\">Identity Subspace S_ID (Thanh quản &amp; Hộp sọ)</text><line x1=\"100\" y1=\"130\" x2=\"100\" y2=\"30\" stroke=\"#00ff9d\" stroke-width=\"2.5\"/><text x=\"110\" y=\"45\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"9\">Liveness Subspace S_Live (Vi dao động sinh học)</text><line x1=\"100\" y1=\"130\" x2=\"310\" y2=\"50\" stroke=\"#ffb700\" stroke-width=\"2\" stroke-dasharray=\"3,3\"/><text x=\"315\" y=\"55\" fill=\"#ffb700\" font-family=\"JetBrains Mono\" font-size=\"9\">Vector âm thanh v</text></svg>",
    "standardCitation": "Desplanques, B., et al. (2020) 'ECAPA-TDNN: Emphasized Channel Attention for Speaker Verification', Interspeech.",
    "keyKeywords": [
      "ECAPA-TDNN",
      "x-vector",
      "AAM-Softmax",
      "Res2Net",
      "Định danh"
    ]
  },
  {
    "id": 72,
    "code": "7.2",
    "pillar": 7,
    "pillarTitle": "Phân Khu 7: Sinh Trắc Giọng Nói 1:1 & Phân Ly Không Gian Trực Giao",
    "title": "Chứng minh toán học tính trực giao S_ID ⟂ S_Live",
    "difficulty": "CHUYÊN GIA",
    "question": "Tại sao việc chiếu vector âm thanh lên 2 không gian con trực giao bảo vệ ngân hàng trước clone giọng?",
    "physics": "Kẻ tấn công nhái giọng hoàn hảo sẽ có tọa độ cao trên S_ID (khớp người chủ). Nhưng tọa độ trên S_Live đo vi rung sinh học bị triệt tiêu, lập tức kích hoạt Báo Động Đỏ.",
    "mathProof": "V = S_{ID} oplus S_{Live}, langle v_{id}, v_{live} rangle = 0. Score_{total} = (S_{ID} >= 0.75 && S_{Live} >= 0.75).",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">1:1 VOICE BIOMETRICS: ORTHOGONAL DECOMPOSITION V = S_ID ⊕ S_LIVE</text><line x1=\"100\" y1=\"130\" x2=\"350\" y2=\"130\" stroke=\"#00f0ff\" stroke-width=\"2.5\"/><text x=\"130\" y=\"145\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"9\">Identity Subspace S_ID (Thanh quản &amp; Hộp sọ)</text><line x1=\"100\" y1=\"130\" x2=\"100\" y2=\"30\" stroke=\"#00ff9d\" stroke-width=\"2.5\"/><text x=\"110\" y=\"45\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"9\">Liveness Subspace S_Live (Vi dao động sinh học)</text><line x1=\"100\" y1=\"130\" x2=\"310\" y2=\"50\" stroke=\"#ffb700\" stroke-width=\"2\" stroke-dasharray=\"3,3\"/><text x=\"315\" y=\"55\" fill=\"#ffb700\" font-family=\"JetBrains Mono\" font-size=\"9\">Vector âm thanh v</text></svg>",
    "standardCitation": "Borghesi, A., et al. (2022) 'Orthogonal Subspace Projection for Spoofing-Aware Speaker Verification'.",
    "keyKeywords": [
      "Trực giao",
      "S_ID",
      "S_Live",
      "Phân ly",
      "Clone giọng"
    ]
  },
  {
    "id": 73,
    "code": "7.3",
    "pillar": 7,
    "pillarTitle": "Phân Khu 7: Sinh Trắc Giọng Nói 1:1 & Phân Ly Không Gian Trực Giao",
    "title": "Ma trận quyết định 4 trạng thái sinh trắc",
    "difficulty": "TRUNG CẤP",
    "question": "Phân tích 4 kịch bản: Chủ thật, Tấn công clone giọng, Người lạ nói thật, Bot AI mạo danh?",
    "physics": "1. S_ID>=0.75, S_Live>=0.75: Chủ thật -> Cho phép. 2. S_ID>=0.75, S_Live<0.40: Clone giọng -> Báo động đỏ. 3. S_ID<0.50, S_Live>=0.75: Người lạ -> Từ chối. 4. Cả hai thấp: Bot mạo danh -> Khóa.",
    "mathProof": "Ma trận 2x2 Boolean logic kết hợp điểm Cosine định danh và điểm Liveness NAFE.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">1:1 VOICE BIOMETRICS: ORTHOGONAL DECOMPOSITION V = S_ID ⊕ S_LIVE</text><line x1=\"100\" y1=\"130\" x2=\"350\" y2=\"130\" stroke=\"#00f0ff\" stroke-width=\"2.5\"/><text x=\"130\" y=\"145\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"9\">Identity Subspace S_ID (Thanh quản &amp; Hộp sọ)</text><line x1=\"100\" y1=\"130\" x2=\"100\" y2=\"30\" stroke=\"#00ff9d\" stroke-width=\"2.5\"/><text x=\"110\" y=\"45\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"9\">Liveness Subspace S_Live (Vi dao động sinh học)</text><line x1=\"100\" y1=\"130\" x2=\"310\" y2=\"50\" stroke=\"#ffb700\" stroke-width=\"2\" stroke-dasharray=\"3,3\"/><text x=\"315\" y=\"55\" fill=\"#ffb700\" font-family=\"JetBrains Mono\" font-size=\"9\">Vector âm thanh v</text></svg>",
    "standardCitation": "ISO/IEC 30107-3 'Biometric Presentation Attack Detection - Testing and Reporting'.",
    "keyKeywords": [
      "4 trạng thái",
      "Chủ thật",
      "Clone giọng",
      "Người lạ",
      "Bot mạo danh"
    ]
  },
  {
    "id": 74,
    "code": "7.4",
    "pillar": 7,
    "pillarTitle": "Phân Khu 7: Sinh Trắc Giọng Nói 1:1 & Phân Ly Không Gian Trực Giao",
    "title": "Độ đo Cosine chuẩn hóa độ dài vector (Length-Normalized Cosine)",
    "difficulty": "TRUNG CẤP",
    "question": "Tại sao bắt buộc phải chuẩn hóa L2 vector x-vector trước khi tính tích vô hướng Cosine?",
    "physics": "Vector chưa chuẩn hóa bị ảnh hưởng bởi năng lượng âm lượng to/nhỏ của tệp tin. Chuẩn hóa L2 đưa mọi vector lên mặt cầu đơn vị siêu không gian, chỉ so sánh góc hình học thuần túy.",
    "mathProof": "Cosine(u, v) = (u / ||u||_2) cdot (v / ||v||_2) = cos(theta_{u, v}) in [-1, 1].",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">1:1 VOICE BIOMETRICS: ORTHOGONAL DECOMPOSITION V = S_ID ⊕ S_LIVE</text><line x1=\"100\" y1=\"130\" x2=\"350\" y2=\"130\" stroke=\"#00f0ff\" stroke-width=\"2.5\"/><text x=\"130\" y=\"145\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"9\">Identity Subspace S_ID (Thanh quản &amp; Hộp sọ)</text><line x1=\"100\" y1=\"130\" x2=\"100\" y2=\"30\" stroke=\"#00ff9d\" stroke-width=\"2.5\"/><text x=\"110\" y=\"45\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"9\">Liveness Subspace S_Live (Vi dao động sinh học)</text><line x1=\"100\" y1=\"130\" x2=\"310\" y2=\"50\" stroke=\"#ffb700\" stroke-width=\"2\" stroke-dasharray=\"3,3\"/><text x=\"315\" y=\"55\" fill=\"#ffb700\" font-family=\"JetBrains Mono\" font-size=\"9\">Vector âm thanh v</text></svg>",
    "standardCitation": "Dehak, N., et al. (2011) 'Front-End Factor Analysis for Speaker Verification', IEEE TASLP.",
    "keyKeywords": [
      "Cosine",
      "Chuẩn hóa L2",
      "Mặt cầu đơn vị",
      "x-vector"
    ]
  },
  {
    "id": 75,
    "code": "7.5",
    "pillar": 7,
    "pillarTitle": "Phân Khu 7: Sinh Trắc Giọng Nói 1:1 & Phân Ly Không Gian Trực Giao",
    "title": "Bù trừ sai lệch kênh thu âm (Channel Mismatch Compensation)",
    "difficulty": "CAO CẤP",
    "question": "Khi mẫu đăng ký thu bằng iPhone nhưng cuộc gọi gian lận qua điện thoại bàn, làm sao bù trừ sai lệch?",
    "physics": "Sử dụng thuật toán Phân tích thành phần bất biến tuyến tính (Linear Discriminant Analysis - LDA) hoặc WCCN (Within-Class Covariance Normalization) để triệt tiêu phương sai giữa các kênh thiết bị.",
    "mathProof": "WCCN: x_norm = W^{-1/2} * x, với W = (1/S) * SUM_{s=1}^S (1/N_s) * SUM (x - mu_s)(x - mu_s)^T.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">1:1 VOICE BIOMETRICS: ORTHOGONAL DECOMPOSITION V = S_ID ⊕ S_LIVE</text><line x1=\"100\" y1=\"130\" x2=\"350\" y2=\"130\" stroke=\"#00f0ff\" stroke-width=\"2.5\"/><text x=\"130\" y=\"145\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"9\">Identity Subspace S_ID (Thanh quản &amp; Hộp sọ)</text><line x1=\"100\" y1=\"130\" x2=\"100\" y2=\"30\" stroke=\"#00ff9d\" stroke-width=\"2.5\"/><text x=\"110\" y=\"45\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"9\">Liveness Subspace S_Live (Vi dao động sinh học)</text><line x1=\"100\" y1=\"130\" x2=\"310\" y2=\"50\" stroke=\"#ffb700\" stroke-width=\"2\" stroke-dasharray=\"3,3\"/><text x=\"315\" y=\"55\" fill=\"#ffb700\" font-family=\"JetBrains Mono\" font-size=\"9\">Vector âm thanh v</text></svg>",
    "standardCitation": "Hatch, A. O., et al. (2006) 'Within-Class Covariance Normalization for SVM Speaker Recognition'.",
    "keyKeywords": [
      "Channel Mismatch",
      "WCCN",
      "LDA",
      "Sai lệch kênh",
      "iPhone vs Điện thoại bàn"
    ]
  },
  {
    "id": 76,
    "code": "7.6",
    "pillar": 7,
    "pillarTitle": "Phân Khu 7: Sinh Trắc Giọng Nói 1:1 & Phân Ly Không Gian Trực Giao",
    "title": "Chuẩn hóa điểm số sinh trắc Z-Norm và T-Norm",
    "difficulty": "CHUYÊN GIA",
    "question": "Tại sao hệ thống sinh trắc ngân hàng phải dùng ZT-Score Normalization?",
    "physics": "Điểm số Cosine thô biến động theo độ ồn môi trường và người nói khác nhau. ZT-Norm dùng một tập giọng chuẩn (cohort) để chuẩn hóa điểm số về phân phối chuẩn N(0, 1).",
    "mathProof": "S_{ZT} = [ (S - mu_Z) / sigma_Z - mu_T ] / sigma_T. Ổn định ngưỡng chặn bất biến theo thời gian.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">1:1 VOICE BIOMETRICS: ORTHOGONAL DECOMPOSITION V = S_ID ⊕ S_LIVE</text><line x1=\"100\" y1=\"130\" x2=\"350\" y2=\"130\" stroke=\"#00f0ff\" stroke-width=\"2.5\"/><text x=\"130\" y=\"145\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"9\">Identity Subspace S_ID (Thanh quản &amp; Hộp sọ)</text><line x1=\"100\" y1=\"130\" x2=\"100\" y2=\"30\" stroke=\"#00ff9d\" stroke-width=\"2.5\"/><text x=\"110\" y=\"45\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"9\">Liveness Subspace S_Live (Vi dao động sinh học)</text><line x1=\"100\" y1=\"130\" x2=\"310\" y2=\"50\" stroke=\"#ffb700\" stroke-width=\"2\" stroke-dasharray=\"3,3\"/><text x=\"315\" y=\"55\" fill=\"#ffb700\" font-family=\"JetBrains Mono\" font-size=\"9\">Vector âm thanh v</text></svg>",
    "standardCitation": "Auckenthaler, R., et al. (2000) 'Score Normalization for Text-Independent Speaker Verification'.",
    "keyKeywords": [
      "ZT-Norm",
      "Score Normalization",
      "Cohort",
      "Chuẩn hóa điểm số"
    ]
  },
  {
    "id": 77,
    "code": "7.7",
    "pillar": 7,
    "pillarTitle": "Phân Khu 7: Sinh Trắc Giọng Nói 1:1 & Phân Ly Không Gian Trực Giao",
    "title": "Khả năng chống chịu trước hiện tượng lão hóa giọng (Voice Aging)",
    "difficulty": "TRUNG CẤP",
    "question": "Giọng nói người già đi sau 5 năm thay đổi thế nào và hệ thống thích ứng ra sao?",
    "physics": "Dây thanh teo nhẹ làm F0 tăng nhẹ ở nam và giảm ở nữ, formant F1-F2 dịch chuyển < 5%. Hệ thống sử dụng cơ chế Rolling Enrollment: Cập nhật mẫu x-vector với trọng số trượt alpha=0.05.",
    "mathProof": "v_{enrolled}^{new} = (1 - alpha) * v_{enrolled}^{old} + alpha * v_{verified}.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">1:1 VOICE BIOMETRICS: ORTHOGONAL DECOMPOSITION V = S_ID ⊕ S_LIVE</text><line x1=\"100\" y1=\"130\" x2=\"350\" y2=\"130\" stroke=\"#00f0ff\" stroke-width=\"2.5\"/><text x=\"130\" y=\"145\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"9\">Identity Subspace S_ID (Thanh quản &amp; Hộp sọ)</text><line x1=\"100\" y1=\"130\" x2=\"100\" y2=\"30\" stroke=\"#00ff9d\" stroke-width=\"2.5\"/><text x=\"110\" y=\"45\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"9\">Liveness Subspace S_Live (Vi dao động sinh học)</text><line x1=\"100\" y1=\"130\" x2=\"310\" y2=\"50\" stroke=\"#ffb700\" stroke-width=\"2\" stroke-dasharray=\"3,3\"/><text x=\"315\" y=\"55\" fill=\"#ffb700\" font-family=\"JetBrains Mono\" font-size=\"9\">Vector âm thanh v</text></svg>",
    "standardCitation": "Kelly, F., et al. (2014) 'A Study of Voice Aging and Its Impact on Speaker Verification'.",
    "keyKeywords": [
      "Voice Aging",
      "Lão hóa giọng",
      "Rolling Enrollment",
      "Cập nhật mẫu"
    ]
  },
  {
    "id": 78,
    "code": "7.8",
    "pillar": 7,
    "pillarTitle": "Phân Khu 7: Sinh Trắc Giọng Nói 1:1 & Phân Ly Không Gian Trực Giao",
    "title": "Phân biệt người bị viêm họng cảm cúm với Deepfake",
    "difficulty": "CAO CẤP",
    "question": "Người bị cảm cúm giọng nghẹt mũi (nasalized) có bị khóa tài khoản oan không?",
    "physics": "Nghẹt mũi làm thay đổi Formant F1 và bổ sung thêm các số không phổ (nasal antiformants), nhưng RT60 phòng vẫn bình thường (0.2s - 0.5s) và Jitter vẫn ngẫu nhiên sinh học. Hệ thống chỉ Step-up chứ không khóa.",
    "mathProof": "Nasal Zero: Antiresonance z_n xuất hiện tại ~1000Hz. Jitter_rel in [1.5%, 3.5%] (vẫn sinh học).",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">1:1 VOICE BIOMETRICS: ORTHOGONAL DECOMPOSITION V = S_ID ⊕ S_LIVE</text><line x1=\"100\" y1=\"130\" x2=\"350\" y2=\"130\" stroke=\"#00f0ff\" stroke-width=\"2.5\"/><text x=\"130\" y=\"145\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"9\">Identity Subspace S_ID (Thanh quản &amp; Hộp sọ)</text><line x1=\"100\" y1=\"130\" x2=\"100\" y2=\"30\" stroke=\"#00ff9d\" stroke-width=\"2.5\"/><text x=\"110\" y=\"45\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"9\">Liveness Subspace S_Live (Vi dao động sinh học)</text><line x1=\"100\" y1=\"130\" x2=\"310\" y2=\"50\" stroke=\"#ffb700\" stroke-width=\"2\" stroke-dasharray=\"3,3\"/><text x=\"315\" y=\"55\" fill=\"#ffb700\" font-family=\"JetBrains Mono\" font-size=\"9\">Vector âm thanh v</text></svg>",
    "standardCitation": "Stevens, K. N. (2000) 'Acoustic Phonetics', MIT Press (Chapter on Nasalization).",
    "keyKeywords": [
      "Viêm họng",
      "Cảm cúm",
      "Nasal",
      "Antiformant",
      "Không khóa oan"
    ]
  },
  {
    "id": 79,
    "code": "7.9",
    "pillar": 7,
    "pillarTitle": "Phân Khu 7: Sinh Trắc Giọng Nói 1:1 & Phân Ly Không Gian Trực Giao",
    "title": "Tấn công mạo danh khớp mẫu sinh trắc (Target-adapted Voice Clone)",
    "difficulty": "CHUYÊN GIA",
    "question": "Nếu kẻ tấn công dùng 10 giây ghi âm của nạn nhân để fine-tune mô hình TTS thì sao?",
    "physics": "Dù fine-tune khớp x-vector S_ID đạt 0.95, mô hình TTS vẫn phụ thuộc vào vocoder số để tái tạo âm thanh. Vocoder này vẫn phạm lỗi Over-smoothing (Jitter < 0.35%) và bị Hard Veto tiêu diệt.",
    "mathProof": "Fine-tuning chỉ đánh lừa được không gian S_{ID}, hoàn toàn bất lực trước không gian S_{Live}.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">1:1 VOICE BIOMETRICS: ORTHOGONAL DECOMPOSITION V = S_ID ⊕ S_LIVE</text><line x1=\"100\" y1=\"130\" x2=\"350\" y2=\"130\" stroke=\"#00f0ff\" stroke-width=\"2.5\"/><text x=\"130\" y=\"145\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"9\">Identity Subspace S_ID (Thanh quản &amp; Hộp sọ)</text><line x1=\"100\" y1=\"130\" x2=\"100\" y2=\"30\" stroke=\"#00ff9d\" stroke-width=\"2.5\"/><text x=\"110\" y=\"45\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"9\">Liveness Subspace S_Live (Vi dao động sinh học)</text><line x1=\"100\" y1=\"130\" x2=\"310\" y2=\"50\" stroke=\"#ffb700\" stroke-width=\"2\" stroke-dasharray=\"3,3\"/><text x=\"315\" y=\"55\" fill=\"#ffb700\" font-family=\"JetBrains Mono\" font-size=\"9\">Vector âm thanh v</text></svg>",
    "standardCitation": "Yamagishi, J., et al. (2021) 'ASVspoof 2021: Accelerating progress in spoofed and deepfake speech detection'.",
    "keyKeywords": [
      "Target-adapted",
      "Fine-tune 10s",
      "S_ID vs S_Live",
      "Hard Veto tiêu diệt"
    ]
  },
  {
    "id": 710,
    "code": "7.10",
    "pillar": 7,
    "pillarTitle": "Phân Khu 7: Sinh Trắc Giọng Nói 1:1 & Phân Ly Không Gian Trực Giao",
    "title": "Giao thức đăng ký mẫu giọng an toàn (Secure Voice Enrollment)",
    "difficulty": "TRUNG CẤP",
    "question": "Quy trình thu thập mẫu giọng ban đầu của khách hàng cần điều kiện gì?",
    "physics": "Khách hàng đọc tối thiểu 3 câu ngẫu nhiên chứa đầy đủ các thanh điệu tiếng Việt và ngữ cảnh ngữ âm phong phú trong phòng yên tĩnh (SNR > 25dB), được kiểm tra liveness ngay tại quầy hoặc qua eKYC.",
    "mathProof": "Tiêu chuẩn: SNR >= 25dB, Duration >= 8.0s, Jitter in [0.8%, 2.0%], Không có tín hiệu Replay.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">1:1 VOICE BIOMETRICS: ORTHOGONAL DECOMPOSITION V = S_ID ⊕ S_LIVE</text><line x1=\"100\" y1=\"130\" x2=\"350\" y2=\"130\" stroke=\"#00f0ff\" stroke-width=\"2.5\"/><text x=\"130\" y=\"145\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"9\">Identity Subspace S_ID (Thanh quản &amp; Hộp sọ)</text><line x1=\"100\" y1=\"130\" x2=\"100\" y2=\"30\" stroke=\"#00ff9d\" stroke-width=\"2.5\"/><text x=\"110\" y=\"45\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"9\">Liveness Subspace S_Live (Vi dao động sinh học)</text><line x1=\"100\" y1=\"130\" x2=\"310\" y2=\"50\" stroke=\"#ffb700\" stroke-width=\"2\" stroke-dasharray=\"3,3\"/><text x=\"315\" y=\"55\" fill=\"#ffb700\" font-family=\"JetBrains Mono\" font-size=\"9\">Vector âm thanh v</text></svg>",
    "standardCitation": "FIDO Alliance Biometric Certification Requirements v2.1.",
    "keyKeywords": [
      "Secure Enrollment",
      "Đăng ký an toàn",
      "SNR > 25dB",
      "eKYC"
    ]
  },
  {
    "id": 81,
    "code": "8.1",
    "pillar": 8,
    "pillarTitle": "Phân Khu 8: Giả Lập Tấn Công (Red-Team) Kênh Viễn Thông G.711 & AMR",
    "title": "Thuật toán nén phi tuyến μ-law và A-law (ITU-T G.711)",
    "difficulty": "CAO CẤP",
    "question": "Thuật toán nén logarithmic 8-bit trong chuẩn G.711 làm biến dạng biên độ như thế nào?",
    "physics": "G.711 nén 16-bit linear PCM về 8-bit logarit (64 kbps). Nén ưu tiên dải biên độ nhỏ, làm tăng sàn nhiễu lượng tử hóa ở các đoạn âm lượng nhỏ, che mờ vi thăng giáng thanh môn.",
    "mathProof": "F(x) = sign(x) * [ ln(1 + mu*|x|) / ln(1 + mu) ], mu = 255. Lượng tử hóa 256 mức phi tuyến.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">RED-TEAM TELECOM: G.711 BANDPASS (300Hz-3400Hz) & COMPANDING</text><rect x=\"50\" y=\"40\" width=\"120\" height=\"90\" fill=\"rgba(255,51,102,0.1)\" stroke=\"#ff3366\" stroke-dasharray=\"2,2\"/><text x=\"60\" y=\"85\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">Cutoff &lt; 300Hz</text><rect x=\"170\" y=\"40\" width=\"280\" height=\"90\" fill=\"rgba(0,255,157,0.1)\" stroke=\"#00ff9d\"/><text x=\"210\" y=\"85\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">Passband 300Hz - 3400Hz (AMR/G.711)</text><rect x=\"450\" y=\"40\" width=\"150\" height=\"90\" fill=\"rgba(255,51,102,0.1)\" stroke=\"#ff3366\" stroke-dasharray=\"2,2\"/><text x=\"470\" y=\"85\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">Cutoff &gt; 3400Hz</text></svg>",
    "standardCitation": "ITU-T Recommendation G.711 (11/1988) 'Pulse code modulation (PCM) of voice frequencies'.",
    "keyKeywords": [
      "G.711",
      "mu-law",
      "A-law",
      "Nhiễu lượng tử hóa",
      "64 kbps"
    ]
  },
  {
    "id": 82,
    "code": "8.2",
    "pillar": 8,
    "pillarTitle": "Phân Khu 8: Giả Lập Tấn Công (Red-Team) Kênh Viễn Thông G.711 & AMR",
    "title": "Bộ lọc thông dải viễn thông 300Hz - 3400Hz",
    "difficulty": "TRUNG CẤP",
    "question": "Hạ tầng điện thoại bàn cắt cụt toàn bộ dải tần <300Hz và >3400Hz ảnh hưởng gì tới giám định?",
    "physics": "Mất F0 ở giọng nam trầm (<300Hz) buộc hệ thống phải suy luận F0 ảo qua các họa âm bậc cao (Missing Fundamental). Mất dải >3400Hz làm mất formant F3-F4 và dấu vết răng cưa của vocoder.",
    "mathProof": "Bandpass Filter: H(f) = 0 với f < 300Hz hoặc f > 3400Hz. Áp dụng Virtual Pitch Extraction.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">RED-TEAM TELECOM: G.711 BANDPASS (300Hz-3400Hz) & COMPANDING</text><rect x=\"50\" y=\"40\" width=\"120\" height=\"90\" fill=\"rgba(255,51,102,0.1)\" stroke=\"#ff3366\" stroke-dasharray=\"2,2\"/><text x=\"60\" y=\"85\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">Cutoff &lt; 300Hz</text><rect x=\"170\" y=\"40\" width=\"280\" height=\"90\" fill=\"rgba(0,255,157,0.1)\" stroke=\"#00ff9d\"/><text x=\"210\" y=\"85\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">Passband 300Hz - 3400Hz (AMR/G.711)</text><rect x=\"450\" y=\"40\" width=\"150\" height=\"90\" fill=\"rgba(255,51,102,0.1)\" stroke=\"#ff3366\" stroke-dasharray=\"2,2\"/><text x=\"470\" y=\"85\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">Cutoff &gt; 3400Hz</text></svg>",
    "standardCitation": "ITU-T Recommendation G.712 'Transmission performance characteristics of pulse code modulation channels'.",
    "keyKeywords": [
      "300Hz - 3400Hz",
      "Cắt cụt",
      "Missing Fundamental",
      "F0 ảo",
      "Điện thoại bàn"
    ]
  },
  {
    "id": 83,
    "code": "8.3",
    "pillar": 8,
    "pillarTitle": "Phân Khu 8: Giả Lập Tấn Công (Red-Team) Kênh Viễn Thông G.711 & AMR",
    "title": "Mã hóa băng rộng AMR-WB (ITU-T G.722.2)",
    "difficulty": "TRUNG CẤP",
    "question": "Chuẩn VoLTE băng rộng AMR-WB (50Hz - 7000Hz) cải thiện việc phát hiện Deepfake thế nào?",
    "physics": "AMR-WB mở rộng dải tần lên 7000Hz, bảo toàn trọn vẹn F0 của mọi loại giọng nói và giữ được năng lượng sụt giảm của nắp thanh môn trên thanh Ngã, giúp độ chính xác tăng thêm 18%.",
    "mathProof": "Lấy mẫu 16kHz, 9 chế độ tốc độ bit từ 6.60 kbps đến 23.85 kbps sử dụng công nghệ ACELP.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">RED-TEAM TELECOM: G.711 BANDPASS (300Hz-3400Hz) & COMPANDING</text><rect x=\"50\" y=\"40\" width=\"120\" height=\"90\" fill=\"rgba(255,51,102,0.1)\" stroke=\"#ff3366\" stroke-dasharray=\"2,2\"/><text x=\"60\" y=\"85\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">Cutoff &lt; 300Hz</text><rect x=\"170\" y=\"40\" width=\"280\" height=\"90\" fill=\"rgba(0,255,157,0.1)\" stroke=\"#00ff9d\"/><text x=\"210\" y=\"85\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">Passband 300Hz - 3400Hz (AMR/G.711)</text><rect x=\"450\" y=\"40\" width=\"150\" height=\"90\" fill=\"rgba(255,51,102,0.1)\" stroke=\"#ff3366\" stroke-dasharray=\"2,2\"/><text x=\"470\" y=\"85\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">Cutoff &gt; 3400Hz</text></svg>",
    "standardCitation": "3GPP TS 26.190 'Speech codec speech processing functions; AMR Wideband speech codec'.",
    "keyKeywords": [
      "AMR-WB",
      "G.722.2",
      "VoLTE",
      "50Hz - 7000Hz",
      "ACELP"
    ]
  },
  {
    "id": 84,
    "code": "8.4",
    "pillar": 8,
    "pillarTitle": "Phân Khu 8: Giả Lập Tấn Công (Red-Team) Kênh Viễn Thông G.711 & AMR",
    "title": "Bù khung mất mát (Packet Loss Concealment - PLC) trong VoIP",
    "difficulty": "CAO CẤP",
    "question": "Khi rớt mạng 3-5%, bộ giải mã PLC sinh ra dạng sóng lặp chu kỳ nhân tạo thế nào?",
    "physics": "Khi mất gói, thuật toán PLC sao chép chu kỳ pitch của khung trước và suy giảm dần biên độ. Hiện tượng này làm đường F0 phẳng lì nhân tạo, dễ gây hiểu lầm là vocoder over-smoothing nếu không có bộ phát hiện PLC.",
    "mathProof": "y_{PLC}[n] = alpha * y[n - T_0], alpha in [0.8, 0.95]. DeepGuard kiểm tra cờ PLC từ giao thức RTP.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">RED-TEAM TELECOM: G.711 BANDPASS (300Hz-3400Hz) & COMPANDING</text><rect x=\"50\" y=\"40\" width=\"120\" height=\"90\" fill=\"rgba(255,51,102,0.1)\" stroke=\"#ff3366\" stroke-dasharray=\"2,2\"/><text x=\"60\" y=\"85\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">Cutoff &lt; 300Hz</text><rect x=\"170\" y=\"40\" width=\"280\" height=\"90\" fill=\"rgba(0,255,157,0.1)\" stroke=\"#00ff9d\"/><text x=\"210\" y=\"85\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">Passband 300Hz - 3400Hz (AMR/G.711)</text><rect x=\"450\" y=\"40\" width=\"150\" height=\"90\" fill=\"rgba(255,51,102,0.1)\" stroke=\"#ff3366\" stroke-dasharray=\"2,2\"/><text x=\"470\" y=\"85\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">Cutoff &gt; 3400Hz</text></svg>",
    "standardCitation": "ITU-T Recommendation G.711 Appendix I 'A high quality low-complexity algorithm for packet loss concealment'.",
    "keyKeywords": [
      "PLC",
      "Packet Loss",
      "Bù khung",
      "RTP",
      "Rớt mạng"
    ]
  },
  {
    "id": 85,
    "code": "8.5",
    "pillar": 8,
    "pillarTitle": "Phân Khu 8: Giả Lập Tấn Công (Red-Team) Kênh Viễn Thông G.711 & AMR",
    "title": "Tấn công nhồi tạp âm Babble Noise (SNR 10dB)",
    "difficulty": "TRUNG CẤP",
    "question": "Kẻ tấn công mở tiếng ồn chợ hoặc tiếng còi xe nền để che giấu khuyết tật của AI?",
    "physics": "Nhồi nhiễu làm tăng sàn năng lượng nhưng không thể tạo ra cú ngắt nắp thanh môn ΔE < -12dB. Ngược lại, nếu nền nhiễu vẫn kêu liên tục trong khi miệng người đang đọc thanh Ngã, đó là bằng chứng giả mạo!",
    "mathProof": "Noise Injection: y(t) = s(t) + n_{babble}(t). Tại điểm Glottal Stop: E_{total} = E_{noise} không đổi -> LẬT TẨY.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">RED-TEAM TELECOM: G.711 BANDPASS (300Hz-3400Hz) & COMPANDING</text><rect x=\"50\" y=\"40\" width=\"120\" height=\"90\" fill=\"rgba(255,51,102,0.1)\" stroke=\"#ff3366\" stroke-dasharray=\"2,2\"/><text x=\"60\" y=\"85\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">Cutoff &lt; 300Hz</text><rect x=\"170\" y=\"40\" width=\"280\" height=\"90\" fill=\"rgba(0,255,157,0.1)\" stroke=\"#00ff9d\"/><text x=\"210\" y=\"85\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">Passband 300Hz - 3400Hz (AMR/G.711)</text><rect x=\"450\" y=\"40\" width=\"150\" height=\"90\" fill=\"rgba(255,51,102,0.1)\" stroke=\"#ff3366\" stroke-dasharray=\"2,2\"/><text x=\"470\" y=\"85\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">Cutoff &gt; 3400Hz</text></svg>",
    "standardCitation": "Hu, Y., & Loizou, P. C. (2007) 'Subjective comparison and evaluation of speech enhancement algorithms', Speech Comm.",
    "keyKeywords": [
      "Babble Noise",
      "SNR 10dB",
      "Tạp âm nền",
      "Glottal Stop lật tẩy"
    ]
  },
  {
    "id": 86,
    "code": "8.6",
    "pillar": 8,
    "pillarTitle": "Phân Khu 8: Giả Lập Tấn Công (Red-Team) Kênh Viễn Thông G.711 & AMR",
    "title": "Tấn công cắt ghép âm thanh (Audio Splicing)",
    "difficulty": "CAO CẤP",
    "question": "Làm thế nào phát hiện kẻ tấn công ghép từng từ 'Chuyển' 'Khoản' 'Năm' 'Tỷ' từ các cuộc gọi cũ?",
    "physics": "Mỗi đoạn cắt ghép có sự nhảy vọt pha không liên tục và sàn nhiễu môi trường (background noise floor) không đồng nhất. Bộ dò Splicing tìm bước nhảy năng lượng d/dt > 9.5dB tại điểm nối.",
    "mathProof": "Splicing Boundary: |NoiseFloor(t+) - NoiseFloor(t-)| > 4.5 dB OR |Phase(t+) - Phase(t-)| > pi/2.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">RED-TEAM TELECOM: G.711 BANDPASS (300Hz-3400Hz) & COMPANDING</text><rect x=\"50\" y=\"40\" width=\"120\" height=\"90\" fill=\"rgba(255,51,102,0.1)\" stroke=\"#ff3366\" stroke-dasharray=\"2,2\"/><text x=\"60\" y=\"85\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">Cutoff &lt; 300Hz</text><rect x=\"170\" y=\"40\" width=\"280\" height=\"90\" fill=\"rgba(0,255,157,0.1)\" stroke=\"#00ff9d\"/><text x=\"210\" y=\"85\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">Passband 300Hz - 3400Hz (AMR/G.711)</text><rect x=\"450\" y=\"40\" width=\"150\" height=\"90\" fill=\"rgba(255,51,102,0.1)\" stroke=\"#ff3366\" stroke-dasharray=\"2,2\"/><text x=\"470\" y=\"85\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">Cutoff &gt; 3400Hz</text></svg>",
    "standardCitation": "Malik, H. (2013) 'Acoustic Environment Identification and Its Applications to Audio Forensics', IEEE TIFS.",
    "keyKeywords": [
      "Audio Splicing",
      "Cắt ghép",
      "Bước nhảy năng lượng",
      "Sàn nhiễu"
    ]
  },
  {
    "id": 87,
    "code": "8.7",
    "pillar": 8,
    "pillarTitle": "Phân Khu 8: Giả Lập Tấn Công (Red-Team) Kênh Viễn Thông G.711 & AMR",
    "title": "Tấn công bẻ cong cao độ (Pitch Bending ±20%)",
    "difficulty": "TRUNG CẤP",
    "question": "Dùng thuật toán Phase Vocoder tăng hạ tone giọng nhằm né tránh ngưỡng F0?",
    "physics": "Dù có dịch chuyển cao độ F0, tỷ lệ Micro-Jitter (tính bằng % tương đối so với chu kỳ trung bình) là đại lượng không thứ nguyên, hoàn toàn bất biến trước phép co giãn tần số tuyến tính.",
    "mathProof": "Jitter_{rel}(alpha * f) = Jitter_{rel}(f). Bất biến toán học trước Pitch Shifting.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">RED-TEAM TELECOM: G.711 BANDPASS (300Hz-3400Hz) & COMPANDING</text><rect x=\"50\" y=\"40\" width=\"120\" height=\"90\" fill=\"rgba(255,51,102,0.1)\" stroke=\"#ff3366\" stroke-dasharray=\"2,2\"/><text x=\"60\" y=\"85\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">Cutoff &lt; 300Hz</text><rect x=\"170\" y=\"40\" width=\"280\" height=\"90\" fill=\"rgba(0,255,157,0.1)\" stroke=\"#00ff9d\"/><text x=\"210\" y=\"85\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">Passband 300Hz - 3400Hz (AMR/G.711)</text><rect x=\"450\" y=\"40\" width=\"150\" height=\"90\" fill=\"rgba(255,51,102,0.1)\" stroke=\"#ff3366\" stroke-dasharray=\"2,2\"/><text x=\"470\" y=\"85\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">Cutoff &gt; 3400Hz</text></svg>",
    "standardCitation": "Laroche, J., & Dolson, M. (1999) 'New phase-vocoder techniques for pitch-shifting and time-scale modification'.",
    "keyKeywords": [
      "Pitch Bending",
      "Phase Vocoder",
      "Bất biến Jitter",
      "Không thứ nguyên"
    ]
  },
  {
    "id": 88,
    "code": "8.8",
    "pillar": 8,
    "pillarTitle": "Phân Khu 8: Giả Lập Tấn Công (Red-Team) Kênh Viễn Thông G.711 & AMR",
    "title": "Tấn công bơm tín hiệu số trực tiếp (Direct Line Injection)",
    "difficulty": "CAO CẤP",
    "question": "Kẻ tấn công dùng jack 3.5mm hoặc giả lập card âm thanh bơm thẳng luồng số vào điện thoại?",
    "physics": "Khi bơm luồng số trực tiếp, RT60 đo được trên đoạn rơi âm đuôi rơi về 0.0s (phòng câm tuyệt đối), kích hoạt Hard Veto: Phòng câm ảo phi tự nhiên.",
    "mathProof": "RT60 < 0.10s -> Tín hiệu không truyền qua màng loa và không gian vật lý -> HARD VETO.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">RED-TEAM TELECOM: G.711 BANDPASS (300Hz-3400Hz) & COMPANDING</text><rect x=\"50\" y=\"40\" width=\"120\" height=\"90\" fill=\"rgba(255,51,102,0.1)\" stroke=\"#ff3366\" stroke-dasharray=\"2,2\"/><text x=\"60\" y=\"85\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">Cutoff &lt; 300Hz</text><rect x=\"170\" y=\"40\" width=\"280\" height=\"90\" fill=\"rgba(0,255,157,0.1)\" stroke=\"#00ff9d\"/><text x=\"210\" y=\"85\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">Passband 300Hz - 3400Hz (AMR/G.711)</text><rect x=\"450\" y=\"40\" width=\"150\" height=\"90\" fill=\"rgba(255,51,102,0.1)\" stroke=\"#ff3366\" stroke-dasharray=\"2,2\"/><text x=\"470\" y=\"85\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">Cutoff &gt; 3400Hz</text></svg>",
    "standardCitation": "ASVspoof 2019 Logical Access (LA) vs Physical Access (PA) distinction.",
    "keyKeywords": [
      "Direct Injection",
      "Jack 3.5mm",
      "Card âm thanh ảo",
      "RT60 < 0.10s"
    ]
  },
  {
    "id": 89,
    "code": "8.9",
    "pillar": 8,
    "pillarTitle": "Phân Khu 8: Giả Lập Tấn Công (Red-Team) Kênh Viễn Thông G.711 & AMR",
    "title": "Bù trừ Jitter Buffer viễn thông trong streaming",
    "difficulty": "TRUNG CẤP",
    "question": "Sự biến thiên thời gian truyền gói (Packet Delay Variation) làm gián đoạn phân tích thế nào?",
    "physics": "Sử dụng Adaptive Jitter Buffer kích thước 40-80ms để sắp xếp lại các gói RTP theo đúng chuỗi thời gian (Sequence Number và Timestamp) trước khi đẩy vào pipeline DSP.",
    "mathProof": "Buffer Size B(t) = d_mean + 3 * d_std. Giữ độ trễ đệm dưới 60ms để không ảnh hưởng SLA 350ms.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">RED-TEAM TELECOM: G.711 BANDPASS (300Hz-3400Hz) & COMPANDING</text><rect x=\"50\" y=\"40\" width=\"120\" height=\"90\" fill=\"rgba(255,51,102,0.1)\" stroke=\"#ff3366\" stroke-dasharray=\"2,2\"/><text x=\"60\" y=\"85\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">Cutoff &lt; 300Hz</text><rect x=\"170\" y=\"40\" width=\"280\" height=\"90\" fill=\"rgba(0,255,157,0.1)\" stroke=\"#00ff9d\"/><text x=\"210\" y=\"85\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">Passband 300Hz - 3400Hz (AMR/G.711)</text><rect x=\"450\" y=\"40\" width=\"150\" height=\"90\" fill=\"rgba(255,51,102,0.1)\" stroke=\"#ff3366\" stroke-dasharray=\"2,2\"/><text x=\"470\" y=\"85\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">Cutoff &gt; 3400Hz</text></svg>",
    "standardCitation": "IETF RFC 3550 'RTP: A Transport Protocol for Real-Time Applications'.",
    "keyKeywords": [
      "Jitter Buffer",
      "Packet Delay Variation",
      "RTP",
      "RFC 3550"
    ]
  },
  {
    "id": 810,
    "code": "8.10",
    "pillar": 8,
    "pillarTitle": "Phân Khu 8: Giả Lập Tấn Công (Red-Team) Kênh Viễn Thông G.711 & AMR",
    "title": "Tăng cường dữ liệu viễn thông khi huấn luyện (Data Augmentation)",
    "difficulty": "CAO CẤP",
    "question": "Mô hình MelCNN được tôi luyện thế nào để không bị suy giảm trí tuệ trước kênh G.711?",
    "physics": "Áp dụng chuỗi biến đổi ngẫu nhiên trong quá trình train: Nhồi nhiễu G.711 mu-law, cắt băng thông thông dải 300-3400Hz, nhồi RIR phòng thực tế và nhồi nhiễu rớt gói viễn thông.",
    "mathProof": "Augment(x) = Resample( Bandpass( MuLaw( Convolve(x, RIR) + Noise ) ) ). Huấn luyện tự thích nghi.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">RED-TEAM TELECOM: G.711 BANDPASS (300Hz-3400Hz) & COMPANDING</text><rect x=\"50\" y=\"40\" width=\"120\" height=\"90\" fill=\"rgba(255,51,102,0.1)\" stroke=\"#ff3366\" stroke-dasharray=\"2,2\"/><text x=\"60\" y=\"85\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">Cutoff &lt; 300Hz</text><rect x=\"170\" y=\"40\" width=\"280\" height=\"90\" fill=\"rgba(0,255,157,0.1)\" stroke=\"#00ff9d\"/><text x=\"210\" y=\"85\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">Passband 300Hz - 3400Hz (AMR/G.711)</text><rect x=\"450\" y=\"40\" width=\"150\" height=\"90\" fill=\"rgba(255,51,102,0.1)\" stroke=\"#ff3366\" stroke-dasharray=\"2,2\"/><text x=\"470\" y=\"85\" fill=\"#ff3366\" font-family=\"JetBrains Mono\" font-size=\"9\">Cutoff &gt; 3400Hz</text></svg>",
    "standardCitation": "Snyder, D., et al. (2018) 'X-vectors: Robust DNN Embeddings for Speaker Recognition', Interspeech.",
    "keyKeywords": [
      "Data Augmentation",
      "Tôi luyện",
      "G.711",
      "RIR",
      "Tăng cường dữ liệu"
    ]
  },
  {
    "id": 91,
    "code": "9.1",
    "pillar": 9,
    "pillarTitle": "Phân Khu 9: Ngân Sách Độ Trễ Toàn Trình Đầu - Cuối 350ms",
    "title": "Phân rã chi tiết từng microsecond của ngân sách 355ms",
    "difficulty": "CAO CẤP",
    "question": "Liệt kê chính xác thời gian tiêu tốn của từng mắt xích từ lúc khách nói đến khi ra quyết định?",
    "physics": "Sliding Buffer gom âm thanh: 300ms; Librosa / FFmpeg decode: 4ms; STFT & Log-Mel: 3ms; ONNX Runtime MelCNN: 6.8ms; NAFE Jitter & Glottal: 25ms; Schroeder RT60: 2ms; Fusion & Network: 14.2ms. Tổng cộng = 355ms.",
    "mathProof": "T_{E2E} = 300 + 4 + 3 + 6.8 + 25 + 2 + 14.2 = 355.0 ms. Đạt chuẩn viễn thông quốc tế < 400ms.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">END-TO-END LATENCY BUDGET: 355ms BREAKDOWN</text><rect x=\"50\" y=\"50\" width=\"280\" height=\"30\" fill=\"#3b82f6\" rx=\"3\"/><text x=\"110\" y=\"70\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"10\">Sliding Buffer: 300ms</text><rect x=\"335\" y=\"50\" width=\"40\" height=\"30\" fill=\"#00f0ff\" rx=\"3\"/><text x=\"340\" y=\"70\" fill=\"#04070e\" font-family=\"JetBrains Mono\" font-size=\"9\">STFT:16ms</text><rect x=\"380\" y=\"50\" width=\"30\" height=\"30\" fill=\"#00ff9d\" rx=\"3\"/><text x=\"382\" y=\"70\" fill=\"#04070e\" font-family=\"JetBrains Mono\" font-size=\"8\">6.8ms</text><rect x=\"415\" y=\"50\" width=\"60\" height=\"30\" fill=\"#ffb700\" rx=\"3\"/><text x=\"425\" y=\"70\" fill=\"#04070e\" font-family=\"JetBrains Mono\" font-size=\"9\">NAFE:25ms</text><rect x=\"480\" y=\"50\" width=\"120\" height=\"30\" fill=\"#b55fe6\" rx=\"3\"/><text x=\"505\" y=\"70\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">Net &amp; UI: 7ms</text></svg>",
    "standardCitation": "ITU-T Recommendation G.114 'One-way transmission time' (Khuyến nghị độ trễ thoại < 400ms).",
    "keyKeywords": [
      "Ngân sách độ trễ",
      "355ms",
      "300ms buffer",
      "6.8ms ONNX",
      "25ms NAFE",
      "G.114"
    ]
  },
  {
    "id": 92,
    "code": "9.2",
    "pillar": 9,
    "pillarTitle": "Phân Khu 9: Ngân Sách Độ Trễ Toàn Trình Đầu - Cuối 350ms",
    "title": "Cơ sở toán học của kích thước cửa sổ trượt 300ms",
    "difficulty": "TRUNG CẤP",
    "question": "Tại sao không chọn cửa sổ trượt 100ms để chạy nhanh hơn, hoặc 1000ms để chuẩn xác hơn?",
    "physics": "100ms không chứa đủ 2 chu kỳ nắp thanh môn siết ngắt (20-60ms) và không đủ độ phân giải FFT để bóc tách F0. 1000ms thì nạn nhân đã kịp nghe câu lệnh lừa đảo và chuyển tiền.",
    "mathProof": "T_window = 300ms chứa đúng 18 khung STFT (hop 256), điểm cân bằng vàng giữa độ trễ và độ chính xác.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">END-TO-END LATENCY BUDGET: 355ms BREAKDOWN</text><rect x=\"50\" y=\"50\" width=\"280\" height=\"30\" fill=\"#3b82f6\" rx=\"3\"/><text x=\"110\" y=\"70\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"10\">Sliding Buffer: 300ms</text><rect x=\"335\" y=\"50\" width=\"40\" height=\"30\" fill=\"#00f0ff\" rx=\"3\"/><text x=\"340\" y=\"70\" fill=\"#04070e\" font-family=\"JetBrains Mono\" font-size=\"9\">STFT:16ms</text><rect x=\"380\" y=\"50\" width=\"30\" height=\"30\" fill=\"#00ff9d\" rx=\"3\"/><text x=\"382\" y=\"70\" fill=\"#04070e\" font-family=\"JetBrains Mono\" font-size=\"8\">6.8ms</text><rect x=\"415\" y=\"50\" width=\"60\" height=\"30\" fill=\"#ffb700\" rx=\"3\"/><text x=\"425\" y=\"70\" fill=\"#04070e\" font-family=\"JetBrains Mono\" font-size=\"9\">NAFE:25ms</text><rect x=\"480\" y=\"50\" width=\"120\" height=\"30\" fill=\"#b55fe6\" rx=\"3\"/><text x=\"505\" y=\"70\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">Net &amp; UI: 7ms</text></svg>",
    "standardCitation": "Miller, G. A. (1956) 'The Magical Number Seven, Plus or Minus Two' & Acoustic Windowing.",
    "keyKeywords": [
      "300ms",
      "Cửa sổ trượt",
      "18 khung STFT",
      "Điểm cân bằng vàng"
    ]
  },
  {
    "id": 93,
    "code": "9.3",
    "pillar": 9,
    "pillarTitle": "Phân Khu 9: Ngân Sách Độ Trễ Toàn Trình Đầu - Cuối 350ms",
    "title": "Giao thức WebSocket nhị phân vs REST HTTP/2 trong streaming",
    "difficulty": "TRUNG CẤP",
    "question": "Tại sao dùng WebSocket nhị phân (Binary Frames) thay vì gửi audio base64 qua REST API?",
    "physics": "Base64 làm phình to kích thước dữ liệu 33% và tốn CPU giải mã. REST tạo overhead bắt tay HTTP header ở mỗi request. WebSocket giữ kết nối TCP mở liên tục, đẩy PCM thô độ trễ < 2ms.",
    "mathProof": "Overhead: WebSocket = 2 bytes header/frame; HTTP REST = ~800 bytes header/request + Base64 133%.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">END-TO-END LATENCY BUDGET: 355ms BREAKDOWN</text><rect x=\"50\" y=\"50\" width=\"280\" height=\"30\" fill=\"#3b82f6\" rx=\"3\"/><text x=\"110\" y=\"70\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"10\">Sliding Buffer: 300ms</text><rect x=\"335\" y=\"50\" width=\"40\" height=\"30\" fill=\"#00f0ff\" rx=\"3\"/><text x=\"340\" y=\"70\" fill=\"#04070e\" font-family=\"JetBrains Mono\" font-size=\"9\">STFT:16ms</text><rect x=\"380\" y=\"50\" width=\"30\" height=\"30\" fill=\"#00ff9d\" rx=\"3\"/><text x=\"382\" y=\"70\" fill=\"#04070e\" font-family=\"JetBrains Mono\" font-size=\"8\">6.8ms</text><rect x=\"415\" y=\"50\" width=\"60\" height=\"30\" fill=\"#ffb700\" rx=\"3\"/><text x=\"425\" y=\"70\" fill=\"#04070e\" font-family=\"JetBrains Mono\" font-size=\"9\">NAFE:25ms</text><rect x=\"480\" y=\"50\" width=\"120\" height=\"30\" fill=\"#b55fe6\" rx=\"3\"/><text x=\"505\" y=\"70\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">Net &amp; UI: 7ms</text></svg>",
    "standardCitation": "IETF RFC 6455 'The WebSocket Protocol'.",
    "keyKeywords": [
      "WebSocket",
      "Nhị phân",
      "REST",
      "Base64",
      "2 bytes header"
    ]
  },
  {
    "id": 94,
    "code": "9.4",
    "pillar": 9,
    "pillarTitle": "Phân Khu 9: Ngân Sách Độ Trễ Toàn Trình Đầu - Cuối 350ms",
    "title": "Bộ đệm vòng tròn (Circular Ring Buffer) không khóa trong C++",
    "difficulty": "CAO CẤP",
    "question": "Thiết kế cấu trúc dữ liệu Lock-free Single-Producer Single-Consumer (SPSC) cho luồng âm thanh?",
    "physics": "Sử dụng mảng tĩnh tuần hoàn kết hợp 2 biến nguyên tử std::atomic<size_t> cho head và tail với bộ nhớ tuần tự memory_order_acquire/release, không bao giờ gây nghẽn mutex lock.",
    "mathProof": "RingBuffer: push() cập nhật tail_atomic; pop() đọc từ head_atomic. Zero Lock, Zero Cache Miss.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">END-TO-END LATENCY BUDGET: 355ms BREAKDOWN</text><rect x=\"50\" y=\"50\" width=\"280\" height=\"30\" fill=\"#3b82f6\" rx=\"3\"/><text x=\"110\" y=\"70\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"10\">Sliding Buffer: 300ms</text><rect x=\"335\" y=\"50\" width=\"40\" height=\"30\" fill=\"#00f0ff\" rx=\"3\"/><text x=\"340\" y=\"70\" fill=\"#04070e\" font-family=\"JetBrains Mono\" font-size=\"9\">STFT:16ms</text><rect x=\"380\" y=\"50\" width=\"30\" height=\"30\" fill=\"#00ff9d\" rx=\"3\"/><text x=\"382\" y=\"70\" fill=\"#04070e\" font-family=\"JetBrains Mono\" font-size=\"8\">6.8ms</text><rect x=\"415\" y=\"50\" width=\"60\" height=\"30\" fill=\"#ffb700\" rx=\"3\"/><text x=\"425\" y=\"70\" fill=\"#04070e\" font-family=\"JetBrains Mono\" font-size=\"9\">NAFE:25ms</text><rect x=\"480\" y=\"50\" width=\"120\" height=\"30\" fill=\"#b55fe6\" rx=\"3\"/><text x=\"505\" y=\"70\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">Net &amp; UI: 7ms</text></svg>",
    "standardCitation": "Herlihy, M., & Shavit, N. 'The Art of Multiprocessor Programming'.",
    "keyKeywords": [
      "Circular Ring Buffer",
      "Lock-free",
      "SPSC",
      "std::atomic",
      "Zero Lock"
    ]
  },
  {
    "id": 95,
    "code": "9.5",
    "pillar": 9,
    "pillarTitle": "Phân Khu 9: Ngân Sách Độ Trễ Toàn Trình Đầu - Cuối 350ms",
    "title": "Nguy cơ nghẽn hàng đợi tiến trình (Threadpool Starvation)",
    "difficulty": "CAO CẤP",
    "question": "Làm thế nào ngăn chặn việc 100 cuộc gọi phức tạp làm nghẽn toàn bộ luồng xử lý của hệ thống?",
    "physics": "Tách biệt hoàn toàn Event Loop mạng (AsyncIO) và Worker Pool tính toán DSP (ProcessPoolExecutor). Đặt timeout cứng 40ms cho mỗi tác vụ bóc tách đặc trưng.",
    "mathProof": "Async Worker: loop.run_in_executor(dsp_pool, compute_nafe). Cách ly hoàn toàn tài nguyên.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">END-TO-END LATENCY BUDGET: 355ms BREAKDOWN</text><rect x=\"50\" y=\"50\" width=\"280\" height=\"30\" fill=\"#3b82f6\" rx=\"3\"/><text x=\"110\" y=\"70\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"10\">Sliding Buffer: 300ms</text><rect x=\"335\" y=\"50\" width=\"40\" height=\"30\" fill=\"#00f0ff\" rx=\"3\"/><text x=\"340\" y=\"70\" fill=\"#04070e\" font-family=\"JetBrains Mono\" font-size=\"9\">STFT:16ms</text><rect x=\"380\" y=\"50\" width=\"30\" height=\"30\" fill=\"#00ff9d\" rx=\"3\"/><text x=\"382\" y=\"70\" fill=\"#04070e\" font-family=\"JetBrains Mono\" font-size=\"8\">6.8ms</text><rect x=\"415\" y=\"50\" width=\"60\" height=\"30\" fill=\"#ffb700\" rx=\"3\"/><text x=\"425\" y=\"70\" fill=\"#04070e\" font-family=\"JetBrains Mono\" font-size=\"9\">NAFE:25ms</text><rect x=\"480\" y=\"50\" width=\"120\" height=\"30\" fill=\"#b55fe6\" rx=\"3\"/><text x=\"505\" y=\"70\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">Net &amp; UI: 7ms</text></svg>",
    "standardCitation": "Bovet, D. P., & Cesati, M. 'Understanding the Linux Kernel'.",
    "keyKeywords": [
      "Threadpool Starvation",
      "ProcessPool",
      "AsyncIO",
      "Cách ly tài nguyên"
    ]
  },
  {
    "id": 96,
    "code": "9.6",
    "pillar": 9,
    "pillarTitle": "Phân Khu 9: Ngân Sách Độ Trễ Toàn Trình Đầu - Cuối 350ms",
    "title": "Quản lý bộ nhớ Zero-Copy giữa Kernel và User-Space",
    "difficulty": "CHUYÊN GIA",
    "question": "Kỹ thuật Linux eBPF / mmap trong nhận luồng âm thanh mạng giảm tải CPU thế nào?",
    "physics": "Thay vì gọi hàm `read()` sao chép gói tin từ Kernel Space vào User Space, sử dụng ring buffer chia sẻ bộ nhớ (mmap / AF_PACKET), giảm 40% chi phí chuyển ngữ cảnh (context switch).",
    "mathProof": "Context Switch overhead giảm từ 1.8 microseconds xuống 0.2 microseconds cho mỗi gói tin audio.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">END-TO-END LATENCY BUDGET: 355ms BREAKDOWN</text><rect x=\"50\" y=\"50\" width=\"280\" height=\"30\" fill=\"#3b82f6\" rx=\"3\"/><text x=\"110\" y=\"70\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"10\">Sliding Buffer: 300ms</text><rect x=\"335\" y=\"50\" width=\"40\" height=\"30\" fill=\"#00f0ff\" rx=\"3\"/><text x=\"340\" y=\"70\" fill=\"#04070e\" font-family=\"JetBrains Mono\" font-size=\"9\">STFT:16ms</text><rect x=\"380\" y=\"50\" width=\"30\" height=\"30\" fill=\"#00ff9d\" rx=\"3\"/><text x=\"382\" y=\"70\" fill=\"#04070e\" font-family=\"JetBrains Mono\" font-size=\"8\">6.8ms</text><rect x=\"415\" y=\"50\" width=\"60\" height=\"30\" fill=\"#ffb700\" rx=\"3\"/><text x=\"425\" y=\"70\" fill=\"#04070e\" font-family=\"JetBrains Mono\" font-size=\"9\">NAFE:25ms</text><rect x=\"480\" y=\"50\" width=\"120\" height=\"30\" fill=\"#b55fe6\" rx=\"3\"/><text x=\"505\" y=\"70\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">Net &amp; UI: 7ms</text></svg>",
    "standardCitation": "Love, R. 'Linux System Programming', O'Reilly Media.",
    "keyKeywords": [
      "Zero-Copy",
      "mmap",
      "Kernel Space",
      "Context Switch",
      "AF_PACKET"
    ]
  },
  {
    "id": 97,
    "code": "9.7",
    "pillar": 9,
    "pillarTitle": "Phân Khu 9: Ngân Sách Độ Trễ Toàn Trình Đầu - Cuối 350ms",
    "title": "Triệt tiêu hiện tượng đứng hình do Garbage Collection (GC)",
    "difficulty": "TRUNG CẤP",
    "question": "Trong môi trường Python / Node.js, làm sao ngăn GC dừng thế giới (Stop-the-World) làm vỡ SLA 350ms?",
    "physics": "Vô hiệu hóa bộ thu gom rác tự động trong luồng streaming thời gian thực (`gc.disable()`). Cấp phát trước toàn bộ mảng đệm (Pre-allocated NumPy arrays) và gọi gc thủ công ở thời gian rảnh.",
    "mathProof": "gc.set_threshold(100000, 50, 50); Tái sử dụng buffer `np.empty((1, 80, 18), dtype=np.float32)`.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">END-TO-END LATENCY BUDGET: 355ms BREAKDOWN</text><rect x=\"50\" y=\"50\" width=\"280\" height=\"30\" fill=\"#3b82f6\" rx=\"3\"/><text x=\"110\" y=\"70\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"10\">Sliding Buffer: 300ms</text><rect x=\"335\" y=\"50\" width=\"40\" height=\"30\" fill=\"#00f0ff\" rx=\"3\"/><text x=\"340\" y=\"70\" fill=\"#04070e\" font-family=\"JetBrains Mono\" font-size=\"9\">STFT:16ms</text><rect x=\"380\" y=\"50\" width=\"30\" height=\"30\" fill=\"#00ff9d\" rx=\"3\"/><text x=\"382\" y=\"70\" fill=\"#04070e\" font-family=\"JetBrains Mono\" font-size=\"8\">6.8ms</text><rect x=\"415\" y=\"50\" width=\"60\" height=\"30\" fill=\"#ffb700\" rx=\"3\"/><text x=\"425\" y=\"70\" fill=\"#04070e\" font-family=\"JetBrains Mono\" font-size=\"9\">NAFE:25ms</text><rect x=\"480\" y=\"50\" width=\"120\" height=\"30\" fill=\"#b55fe6\" rx=\"3\"/><text x=\"505\" y=\"70\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">Net &amp; UI: 7ms</text></svg>",
    "standardCitation": "Python Internals: Garbage Collection Mechanism for Generational GC.",
    "keyKeywords": [
      "Garbage Collection",
      "GC",
      "Stop-the-world",
      "Pre-allocated",
      "NumPy"
    ]
  },
  {
    "id": 98,
    "code": "9.8",
    "pillar": 9,
    "pillarTitle": "Phân Khu 9: Ngân Sách Độ Trễ Toàn Trình Đầu - Cuối 350ms",
    "title": "Cơ chế ngắt sớm (Early Termination) khi phát hiện Hard Veto",
    "difficulty": "TRUNG CẤP",
    "question": "Nếu trong 50ms đầu tiên phát hiện Jitter = 0.15%, hệ thống xử lý tiếp thế nào?",
    "physics": "Lập tức hủy bỏ toàn bộ các tác vụ tính toán nặng phía sau (hủy inference MelCNN, hủy Schroeder). Trả về kết luận FAKE ngay ở mốc thời gian 65ms, tiết kiệm 80% tài nguyên CPU.",
    "mathProof": "IF Jitter < 0.35% -> ABORT_PIPELINE -> Emit(Verdict = FAKE, Latency = 65ms).",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">END-TO-END LATENCY BUDGET: 355ms BREAKDOWN</text><rect x=\"50\" y=\"50\" width=\"280\" height=\"30\" fill=\"#3b82f6\" rx=\"3\"/><text x=\"110\" y=\"70\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"10\">Sliding Buffer: 300ms</text><rect x=\"335\" y=\"50\" width=\"40\" height=\"30\" fill=\"#00f0ff\" rx=\"3\"/><text x=\"340\" y=\"70\" fill=\"#04070e\" font-family=\"JetBrains Mono\" font-size=\"9\">STFT:16ms</text><rect x=\"380\" y=\"50\" width=\"30\" height=\"30\" fill=\"#00ff9d\" rx=\"3\"/><text x=\"382\" y=\"70\" fill=\"#04070e\" font-family=\"JetBrains Mono\" font-size=\"8\">6.8ms</text><rect x=\"415\" y=\"50\" width=\"60\" height=\"30\" fill=\"#ffb700\" rx=\"3\"/><text x=\"425\" y=\"70\" fill=\"#04070e\" font-family=\"JetBrains Mono\" font-size=\"9\">NAFE:25ms</text><rect x=\"480\" y=\"50\" width=\"120\" height=\"30\" fill=\"#b55fe6\" rx=\"3\"/><text x=\"505\" y=\"70\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">Net &amp; UI: 7ms</text></svg>",
    "standardCitation": "Fail-Fast Design Pattern in High-Throughput Systems.",
    "keyKeywords": [
      "Early Termination",
      "Ngắt sớm",
      "Fail-Fast",
      "65ms",
      "Tiết kiệm CPU"
    ]
  },
  {
    "id": 99,
    "code": "9.9",
    "pillar": 9,
    "pillarTitle": "Phân Khu 9: Ngân Sách Độ Trễ Toàn Trình Đầu - Cuối 350ms",
    "title": "Bù trừ độ trễ mạng RTT biến thiên trên hạ tầng 4G/5G",
    "difficulty": "TRUNG CẤP",
    "question": "Khi sóng di động của khách hàng yếu làm RTT nhảy từ 20ms lên 120ms, hệ thống đối phó ra sao?",
    "physics": "Sử dụng thuật toán ước lượng băng thông BBR của Google để dự đoán thời điểm gói đến và điều chỉnh nhịp kéo khung âm thanh (time-stretching) để không làm đứt mạch phân tích.",
    "mathProof": "RTT_smoothed = 0.875 * RTT_{old} + 0.125 * RTT_{sample}. Bù trừ đồng hồ NTP.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">END-TO-END LATENCY BUDGET: 355ms BREAKDOWN</text><rect x=\"50\" y=\"50\" width=\"280\" height=\"30\" fill=\"#3b82f6\" rx=\"3\"/><text x=\"110\" y=\"70\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"10\">Sliding Buffer: 300ms</text><rect x=\"335\" y=\"50\" width=\"40\" height=\"30\" fill=\"#00f0ff\" rx=\"3\"/><text x=\"340\" y=\"70\" fill=\"#04070e\" font-family=\"JetBrains Mono\" font-size=\"9\">STFT:16ms</text><rect x=\"380\" y=\"50\" width=\"30\" height=\"30\" fill=\"#00ff9d\" rx=\"3\"/><text x=\"382\" y=\"70\" fill=\"#04070e\" font-family=\"JetBrains Mono\" font-size=\"8\">6.8ms</text><rect x=\"415\" y=\"50\" width=\"60\" height=\"30\" fill=\"#ffb700\" rx=\"3\"/><text x=\"425\" y=\"70\" fill=\"#04070e\" font-family=\"JetBrains Mono\" font-size=\"9\">NAFE:25ms</text><rect x=\"480\" y=\"50\" width=\"120\" height=\"30\" fill=\"#b55fe6\" rx=\"3\"/><text x=\"505\" y=\"70\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">Net &amp; UI: 7ms</text></svg>",
    "standardCitation": "Cardwell, N., et al. (2016) 'BBR: Congestion-Based Congestion Control', ACM Queue.",
    "keyKeywords": [
      "RTT",
      "4G/5G",
      "BBR",
      "Time-stretching",
      "Độ trễ mạng"
    ]
  },
  {
    "id": 910,
    "code": "9.10",
    "pillar": 9,
    "pillarTitle": "Phân Khu 9: Ngân Sách Độ Trễ Toàn Trình Đầu - Cuối 350ms",
    "title": "Khảo nghiệm khả năng mở rộng: 300 luồng đồng thời trên 1 CPU 8-Core",
    "difficulty": "CAO CẤP",
    "question": "Tính toán chi phí phần cứng và bằng chứng một máy chủ thông thường gánh được 300 cuộc gọi?",
    "physics": "Mỗi cuộc gọi tốn 6.8ms ONNX + 25ms DSP trong cửa sổ 300ms. CPU time duty cycle = (31.8 / 300) = 10.6% của 1 core. Một CPU 8 cores (16 threads) tải được: 16 / 0.106 ≈ 150-180 luồng tải đỉnh.",
    "mathProof": "Duty Cycle = T_compute / T_window = 31.8ms / 300ms = 10.6%. Tối ưu hóa đa nhân hoàn hảo.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">END-TO-END LATENCY BUDGET: 355ms BREAKDOWN</text><rect x=\"50\" y=\"50\" width=\"280\" height=\"30\" fill=\"#3b82f6\" rx=\"3\"/><text x=\"110\" y=\"70\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"10\">Sliding Buffer: 300ms</text><rect x=\"335\" y=\"50\" width=\"40\" height=\"30\" fill=\"#00f0ff\" rx=\"3\"/><text x=\"340\" y=\"70\" fill=\"#04070e\" font-family=\"JetBrains Mono\" font-size=\"9\">STFT:16ms</text><rect x=\"380\" y=\"50\" width=\"30\" height=\"30\" fill=\"#00ff9d\" rx=\"3\"/><text x=\"382\" y=\"70\" fill=\"#04070e\" font-family=\"JetBrains Mono\" font-size=\"8\">6.8ms</text><rect x=\"415\" y=\"50\" width=\"60\" height=\"30\" fill=\"#ffb700\" rx=\"3\"/><text x=\"425\" y=\"70\" fill=\"#04070e\" font-family=\"JetBrains Mono\" font-size=\"9\">NAFE:25ms</text><rect x=\"480\" y=\"50\" width=\"120\" height=\"30\" fill=\"#b55fe6\" rx=\"3\"/><text x=\"505\" y=\"70\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"9\">Net &amp; UI: 7ms</text></svg>",
    "standardCitation": "Performance Engineering Benchmarking Protocols.",
    "keyKeywords": [
      "300 luồng",
      "CPU 8-Core",
      "Duty Cycle",
      "10.6%",
      "Tối ưu hóa"
    ]
  },
  {
    "id": 101,
    "code": "10.1",
    "pillar": 10,
    "pillarTitle": "Phân Khu 10: Pháp Y Số, Chuỗi Bảo Quản Bằng Chứng & Chính Sách Ngân Hàng",
    "title": "Phân biệt Tính toàn vẹn (Integrity) và Tính nguyên bản (Provenance)",
    "difficulty": "TRUNG CẤP",
    "question": "Tại sao mã băm SHA-256 hoàn hảo không chứng minh được đoạn âm thanh là người thật?",
    "physics": "SHA-256 chỉ chứng minh tệp tin không bị sửa đổi bit nào kể từ lúc lưu. Tệp tin tạo ra bởi ElevenLabs Deepfake vẫn có mã SHA-256 hoàn hảo. Provenance đòi hỏi kiểm tra liveness vật lý.",
    "mathProof": "SHA256(FakeAudio) = Valid Hash. Integrity != Authenticity != Physical Liveness.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">DIGITAL FORENSICS: FIPS 140-3 LEVEL 3 & RFC 3161 TIMESTAMPING</text><rect x=\"50\" y=\"40\" width=\"170\" height=\"80\" fill=\"rgba(0,240,255,0.08)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"65\" y=\"70\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"10\">SHA-256 Hash</text><text x=\"65\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"8\">Integrity Lock</text><rect x=\"240\" y=\"40\" width=\"170\" height=\"80\" fill=\"rgba(0,255,157,0.08)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"255\" y=\"70\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">Ed25519 Signature</text><text x=\"255\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"8\">Non-repudiation</text><rect x=\"430\" y=\"40\" width=\"170\" height=\"80\" fill=\"rgba(255,183,0,0.08)\" stroke=\"#ffb700\" rx=\"4\"/><text x=\"445\" y=\"70\" fill=\"#ffb700\" font-family=\"JetBrains Mono\" font-size=\"10\">RFC 3161 TSA</text><text x=\"445\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"8\">Trusted Time Authority</text></svg>",
    "standardCitation": "NIST SP 800-86 'Guide to Integrating Forensic Techniques into Incident Response'.",
    "keyKeywords": [
      "SHA-256",
      "Integrity",
      "Provenance",
      "Tính toàn vẹn",
      "Tính nguyên bản"
    ]
  },
  {
    "id": 102,
    "code": "10.2",
    "pillar": 10,
    "pillarTitle": "Phân Khu 10: Pháp Y Số, Chuỗi Bảo Quản Bằng Chứng & Chính Sách Ngân Hàng",
    "title": "Chuẩn bảo mật phần cứng FIPS 140-3 Level 3",
    "difficulty": "CAO CẤP",
    "question": "Module phần cứng mật mã (HSM) FIPS 140-3 bảo vệ các khóa ký số pháp y như thế nào?",
    "physics": "Khóa riêng tư (Private Key) được tạo và lưu trữ bên trong chip chống can thiệp vật lý (Physical Tamper-Resistance). Mọi nỗ lực khoan chip hoặc đo điện từ sẽ tự động xóa sạch khóa trong 1 microsecond.",
    "mathProof": "Zeroization Protocol: Xóa khóa mật mã tức thì khi phát hiện xâm nhập vật lý (Zeroize in < 1us).",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">DIGITAL FORENSICS: FIPS 140-3 LEVEL 3 & RFC 3161 TIMESTAMPING</text><rect x=\"50\" y=\"40\" width=\"170\" height=\"80\" fill=\"rgba(0,240,255,0.08)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"65\" y=\"70\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"10\">SHA-256 Hash</text><text x=\"65\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"8\">Integrity Lock</text><rect x=\"240\" y=\"40\" width=\"170\" height=\"80\" fill=\"rgba(0,255,157,0.08)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"255\" y=\"70\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">Ed25519 Signature</text><text x=\"255\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"8\">Non-repudiation</text><rect x=\"430\" y=\"40\" width=\"170\" height=\"80\" fill=\"rgba(255,183,0,0.08)\" stroke=\"#ffb700\" rx=\"4\"/><text x=\"445\" y=\"70\" fill=\"#ffb700\" font-family=\"JetBrains Mono\" font-size=\"10\">RFC 3161 TSA</text><text x=\"445\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"8\">Trusted Time Authority</text></svg>",
    "standardCitation": "NIST FIPS PUB 140-3 'Security Requirements for Cryptographic Modules'.",
    "keyKeywords": [
      "FIPS 140-3",
      "HSM",
      "Chống can thiệp",
      "Zeroization",
      "Khóa mật mã"
    ]
  },
  {
    "id": 103,
    "code": "10.3",
    "pillar": 10,
    "pillarTitle": "Phân Khu 10: Pháp Y Số, Chuỗi Bảo Quản Bằng Chứng & Chính Sách Ngân Hàng",
    "title": "Dấu thời gian tin cậy quốc tế RFC 3161 TSA",
    "difficulty": "TRUNG CẤP",
    "question": "Dấu thời gian TSA độc lập ngăn chặn kẻ tấn công ngụy tạo bằng chứng ngoại phạm thế nào?",
    "physics": "TSA là tổ chức chứng thực thứ ba độc lập ký vào mã băm SHA-256 kèm thời gian chuẩn nguyên tử UTC. Kẻ tấn công hoặc admin ngân hàng không thể sửa đổi đồng hồ hệ thống để ngụy tạo.",
    "mathProof": "Token = Sign_{TSA}( Hash(Audio) || UTC_Timestamp ). Giá trị chứng cứ pháp lý tuyệt đối.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">DIGITAL FORENSICS: FIPS 140-3 LEVEL 3 & RFC 3161 TIMESTAMPING</text><rect x=\"50\" y=\"40\" width=\"170\" height=\"80\" fill=\"rgba(0,240,255,0.08)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"65\" y=\"70\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"10\">SHA-256 Hash</text><text x=\"65\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"8\">Integrity Lock</text><rect x=\"240\" y=\"40\" width=\"170\" height=\"80\" fill=\"rgba(0,255,157,0.08)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"255\" y=\"70\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">Ed25519 Signature</text><text x=\"255\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"8\">Non-repudiation</text><rect x=\"430\" y=\"40\" width=\"170\" height=\"80\" fill=\"rgba(255,183,0,0.08)\" stroke=\"#ffb700\" rx=\"4\"/><text x=\"445\" y=\"70\" fill=\"#ffb700\" font-family=\"JetBrains Mono\" font-size=\"10\">RFC 3161 TSA</text><text x=\"445\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"8\">Trusted Time Authority</text></svg>",
    "standardCitation": "IETF RFC 3161 'Internet X.509 Public Key Infrastructure Time-Stamp Protocol (TSP)'.",
    "keyKeywords": [
      "RFC 3161",
      "TSA",
      "Thời gian UTC",
      "Chống ngụy tạo",
      "Time-Stamp"
    ]
  },
  {
    "id": 104,
    "code": "10.4",
    "pillar": 10,
    "pillarTitle": "Phân Khu 10: Pháp Y Số, Chuỗi Bảo Quản Bằng Chứng & Chính Sách Ngân Hàng",
    "title": "Chữ ký số bất đối xứng Ed25519 chống chối bỏ (Non-repudiation)",
    "difficulty": "TRUNG CẤP",
    "question": "Tại sao chọn thuật toán đường cong Elliptic Ed25519 thay vì RSA-2048?",
    "physics": "Ed25519 có độ dài khóa ngắn (32 bytes), tốc độ ký và xác thực nhanh gấp 10 lần RSA, miễn nhiễm trước các cuộc tấn công kênh kề (Side-channel attacks) và tấn công thời gian.",
    "mathProof": "Signature = Sign_{privKey}(Data) trên đường cong Ed25519 (Curve25519).",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">DIGITAL FORENSICS: FIPS 140-3 LEVEL 3 & RFC 3161 TIMESTAMPING</text><rect x=\"50\" y=\"40\" width=\"170\" height=\"80\" fill=\"rgba(0,240,255,0.08)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"65\" y=\"70\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"10\">SHA-256 Hash</text><text x=\"65\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"8\">Integrity Lock</text><rect x=\"240\" y=\"40\" width=\"170\" height=\"80\" fill=\"rgba(0,255,157,0.08)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"255\" y=\"70\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">Ed25519 Signature</text><text x=\"255\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"8\">Non-repudiation</text><rect x=\"430\" y=\"40\" width=\"170\" height=\"80\" fill=\"rgba(255,183,0,0.08)\" stroke=\"#ffb700\" rx=\"4\"/><text x=\"445\" y=\"70\" fill=\"#ffb700\" font-family=\"JetBrains Mono\" font-size=\"10\">RFC 3161 TSA</text><text x=\"445\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"8\">Trusted Time Authority</text></svg>",
    "standardCitation": "IETF RFC 8032 'Edwards-Curve Digital Signature Algorithm (EdDSA)'.",
    "keyKeywords": [
      "Ed25519",
      "RSA",
      "Đường cong Elliptic",
      "Chống chối bỏ",
      "Non-repudiation"
    ]
  },
  {
    "id": 105,
    "code": "10.5",
    "pillar": 10,
    "pillarTitle": "Phân Khu 10: Pháp Y Số, Chuỗi Bảo Quản Bằng Chứng & Chính Sách Ngân Hàng",
    "title": "Quy chuẩn giám định theo Điều 206 Bộ luật Tố tụng Hình sự",
    "difficulty": "CAO CẤP",
    "question": "Báo cáo giám định âm thanh số cần đáp ứng những điều kiện pháp lý bắt buộc nào tại Việt Nam?",
    "physics": "Quyết định trưng cầu giám định của cơ quan điều tra; Biên bản giao nhận mẫu vật có niêm phong; Phương pháp khoa học được công nhận; Chữ ký của giám định viên tư pháp được bổ nhiệm.",
    "mathProof": "Căn cứ Điều 206, 208, 211 Bộ luật Tố tụng Hình sự 2015 và Luật Giám định tư pháp 2012.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">DIGITAL FORENSICS: FIPS 140-3 LEVEL 3 & RFC 3161 TIMESTAMPING</text><rect x=\"50\" y=\"40\" width=\"170\" height=\"80\" fill=\"rgba(0,240,255,0.08)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"65\" y=\"70\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"10\">SHA-256 Hash</text><text x=\"65\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"8\">Integrity Lock</text><rect x=\"240\" y=\"40\" width=\"170\" height=\"80\" fill=\"rgba(0,255,157,0.08)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"255\" y=\"70\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">Ed25519 Signature</text><text x=\"255\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"8\">Non-repudiation</text><rect x=\"430\" y=\"40\" width=\"170\" height=\"80\" fill=\"rgba(255,183,0,0.08)\" stroke=\"#ffb700\" rx=\"4\"/><text x=\"445\" y=\"70\" fill=\"#ffb700\" font-family=\"JetBrains Mono\" font-size=\"10\">RFC 3161 TSA</text><text x=\"445\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"8\">Trusted Time Authority</text></svg>",
    "standardCitation": "Bộ luật Tố tụng Hình sự số 101/2015/QH13; Luật Giám định Tư pháp số 13/2012/QH13.",
    "keyKeywords": [
      "Điều 206",
      "Bộ luật Tố tụng Hình sự",
      "Giám định tư pháp",
      "Niêm phong",
      "Chứng cứ"
    ]
  },
  {
    "id": 106,
    "code": "10.6",
    "pillar": 10,
    "pillarTitle": "Phân Khu 10: Pháp Y Số, Chuỗi Bảo Quản Bằng Chứng & Chính Sách Ngân Hàng",
    "title": "Tiêu chuẩn Daubert và Frye của Tòa án Quốc tế",
    "difficulty": "CHUYÊN GIA",
    "question": "Các tiêu chí nào để bằng chứng AI Deepfake được chấp nhận tại Tòa án theo chuẩn Daubert?",
    "physics": "1. Phương pháp có thể kiểm chứng thực nghiệm (Empirical Testing). 2. Đã được bình duyệt khoa học (Peer-Reviewed). 3. Tỷ lệ sai số đã biết (Known Error Rate / FPR). 4. Được cộng đồng khoa học chấp nhận.",
    "mathProof": "Daubert v. Merrell Dow Pharmaceuticals, Inc., 509 U.S. 579 (1993); Federal Rule of Evidence 702.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">DIGITAL FORENSICS: FIPS 140-3 LEVEL 3 & RFC 3161 TIMESTAMPING</text><rect x=\"50\" y=\"40\" width=\"170\" height=\"80\" fill=\"rgba(0,240,255,0.08)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"65\" y=\"70\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"10\">SHA-256 Hash</text><text x=\"65\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"8\">Integrity Lock</text><rect x=\"240\" y=\"40\" width=\"170\" height=\"80\" fill=\"rgba(0,255,157,0.08)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"255\" y=\"70\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">Ed25519 Signature</text><text x=\"255\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"8\">Non-repudiation</text><rect x=\"430\" y=\"40\" width=\"170\" height=\"80\" fill=\"rgba(255,183,0,0.08)\" stroke=\"#ffb700\" rx=\"4\"/><text x=\"445\" y=\"70\" fill=\"#ffb700\" font-family=\"JetBrains Mono\" font-size=\"10\">RFC 3161 TSA</text><text x=\"445\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"8\">Trusted Time Authority</text></svg>",
    "standardCitation": "U.S. Supreme Court Daubert Standard (1993); FRE Rule 702.",
    "keyKeywords": [
      "Daubert",
      "Frye",
      "Bình duyệt",
      "Error Rate",
      "Tòa án quốc tế"
    ]
  },
  {
    "id": 107,
    "code": "10.7",
    "pillar": 10,
    "pillarTitle": "Phân Khu 10: Pháp Y Số, Chuỗi Bảo Quản Bằng Chứng & Chính Sách Ngân Hàng",
    "title": "Chuỗi bảo quản bằng chứng (Chain of Custody)",
    "difficulty": "TRUNG CẤP",
    "question": "Nếu tệp âm thanh bị sao chép sang USB cá nhân của điều tra viên, bằng chứng có bị hủy bỏ?",
    "physics": "Có! Chuỗi bảo quản bị đứt gãy (Broken Chain of Custody). Mọi bằng chứng không có biên bản ghi nhận hành trình di chuyển và chứng thực mã băm SHA-256 ở từng bước đều bị Tòa tuyên vô hiệu.",
    "mathProof": "Chain of Custody Log: Từng bước truy cập, sao lưu đều ghi nhận Hash, Người thực hiện, Giờ UTC.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">DIGITAL FORENSICS: FIPS 140-3 LEVEL 3 & RFC 3161 TIMESTAMPING</text><rect x=\"50\" y=\"40\" width=\"170\" height=\"80\" fill=\"rgba(0,240,255,0.08)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"65\" y=\"70\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"10\">SHA-256 Hash</text><text x=\"65\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"8\">Integrity Lock</text><rect x=\"240\" y=\"40\" width=\"170\" height=\"80\" fill=\"rgba(0,255,157,0.08)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"255\" y=\"70\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">Ed25519 Signature</text><text x=\"255\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"8\">Non-repudiation</text><rect x=\"430\" y=\"40\" width=\"170\" height=\"80\" fill=\"rgba(255,183,0,0.08)\" stroke=\"#ffb700\" rx=\"4\"/><text x=\"445\" y=\"70\" fill=\"#ffb700\" font-family=\"JetBrains Mono\" font-size=\"10\">RFC 3161 TSA</text><text x=\"445\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"8\">Trusted Time Authority</text></svg>",
    "standardCitation": "ISO/IEC 27037:2012 'Guidelines for Identification, Collection, Acquisition and Preservation of Digital Evidence'.",
    "keyKeywords": [
      "Chain of Custody",
      "Chuỗi bảo quản",
      "Đứt gãy",
      "Vô hiệu bằng chứng",
      "ISO 27037"
    ]
  },
  {
    "id": 108,
    "code": "10.8",
    "pillar": 10,
    "pillarTitle": "Phân Khu 10: Pháp Y Số, Chuỗi Bảo Quản Bằng Chứng & Chính Sách Ngân Hàng",
    "title": "Trách nhiệm giải trình (Explainability / XAI) với Thanh tra Ngân hàng",
    "difficulty": "CAO CẤP",
    "question": "Tại sao mô hình 'Hộp đen' (Black-box Deep Learning) không được phép quyết định chặn đơn phương?",
    "physics": "Thanh tra Ngân hàng Nhà nước và khách hàng có quyền được biết lý do chính xác họ bị chặn. DeepGuard giải trình minh bạch: Chặn do Jitter = 0.18% (<0.35%) và RT60 = 0.08s, có đồ thị đối soát.",
    "mathProof": "Explainable AI: Trả về Attribution Map, phân tích Formant và bảng bằng chứng vật lý tường minh.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">DIGITAL FORENSICS: FIPS 140-3 LEVEL 3 & RFC 3161 TIMESTAMPING</text><rect x=\"50\" y=\"40\" width=\"170\" height=\"80\" fill=\"rgba(0,240,255,0.08)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"65\" y=\"70\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"10\">SHA-256 Hash</text><text x=\"65\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"8\">Integrity Lock</text><rect x=\"240\" y=\"40\" width=\"170\" height=\"80\" fill=\"rgba(0,255,157,0.08)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"255\" y=\"70\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">Ed25519 Signature</text><text x=\"255\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"8\">Non-repudiation</text><rect x=\"430\" y=\"40\" width=\"170\" height=\"80\" fill=\"rgba(255,183,0,0.08)\" stroke=\"#ffb700\" rx=\"4\"/><text x=\"445\" y=\"70\" fill=\"#ffb700\" font-family=\"JetBrains Mono\" font-size=\"10\">RFC 3161 TSA</text><text x=\"445\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"8\">Trusted Time Authority</text></svg>",
    "standardCitation": "Thông tư 09/2020/TT-NHNN về an toàn thông tin trong hoạt động ngân hàng; EU AI Act (High-Risk AI).",
    "keyKeywords": [
      "Explainability",
      "XAI",
      "Hộp đen",
      "Thanh tra ngân hàng",
      "Giải trình"
    ]
  },
  {
    "id": 109,
    "code": "10.9",
    "pillar": 10,
    "pillarTitle": "Phân Khu 10: Pháp Y Số, Chuỗi Bảo Quản Bằng Chứng & Chính Sách Ngân Hàng",
    "title": "Phân định trách nhiệm tài chính khi xảy ra tổn thất Deepfake",
    "difficulty": "TRUNG CẤP",
    "question": "Nếu hacker dùng Deepfake lừa chuyển 5 tỷ, ngân hàng hay khách hàng chịu trách nhiệm?",
    "physics": "Nếu ngân hàng chứng minh đã áp dụng đầy đủ quy trình xác thực sinh trắc chuẩn FIPS 140-3 và khách hàng tự lộ OTP/khóa bảo mật, khách hàng chịu trách nhiệm. Nếu hệ thống lọt do lỗi AI, ngân hàng chịu bồi thường.",
    "mathProof": "Phân tích lỗi kỹ thuật: Báo cáo giám định pháp y của DeepGuard là cơ sở phân xử trách nhiệm.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">DIGITAL FORENSICS: FIPS 140-3 LEVEL 3 & RFC 3161 TIMESTAMPING</text><rect x=\"50\" y=\"40\" width=\"170\" height=\"80\" fill=\"rgba(0,240,255,0.08)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"65\" y=\"70\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"10\">SHA-256 Hash</text><text x=\"65\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"8\">Integrity Lock</text><rect x=\"240\" y=\"40\" width=\"170\" height=\"80\" fill=\"rgba(0,255,157,0.08)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"255\" y=\"70\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">Ed25519 Signature</text><text x=\"255\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"8\">Non-repudiation</text><rect x=\"430\" y=\"40\" width=\"170\" height=\"80\" fill=\"rgba(255,183,0,0.08)\" stroke=\"#ffb700\" rx=\"4\"/><text x=\"445\" y=\"70\" fill=\"#ffb700\" font-family=\"JetBrains Mono\" font-size=\"10\">RFC 3161 TSA</text><text x=\"445\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"8\">Trusted Time Authority</text></svg>",
    "standardCitation": "Nghị định 52/2024/NĐ-CP về thanh toán không dùng tiền mặt; Luật Các tổ chức tín dụng 2024.",
    "keyKeywords": [
      "Trách nhiệm tài chính",
      "Tổn thất 5 tỷ",
      "Bồi thường",
      "Nghị định 52"
    ]
  },
  {
    "id": 1010,
    "code": "10.10",
    "pillar": 10,
    "pillarTitle": "Phân Khu 10: Pháp Y Số, Chuỗi Bảo Quản Bằng Chứng & Chính Sách Ngân Hàng",
    "title": "Kịch bản đối chất của Giám định viên trưởng trước Tòa án",
    "difficulty": "CHUYÊN GIA",
    "question": "Luật sư bên bị chất vấn: 'Mô hình AI của anh cũng chỉ là phỏng đoán xác suất!'. Giám định viên trả lời ra sao?",
    "physics": "'Thưa Quý Tòa, AI chỉ là 1 trong 4 tầng tham chiếu. Kết luận này dựa trên định luật vật lý bất biến: Dây thanh quản người sống không bao giờ rung với độ trơn 0.18% và phòng sinh hoạt không thể có RT60=0.08s!'",
    "mathProof": "Lời khai đanh thép chuyển trọng tâm từ xác suất thống kê AI sang định luật nhiệt động lực học và cơ sinh học bất biến.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">DIGITAL FORENSICS: FIPS 140-3 LEVEL 3 & RFC 3161 TIMESTAMPING</text><rect x=\"50\" y=\"40\" width=\"170\" height=\"80\" fill=\"rgba(0,240,255,0.08)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"65\" y=\"70\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"10\">SHA-256 Hash</text><text x=\"65\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"8\">Integrity Lock</text><rect x=\"240\" y=\"40\" width=\"170\" height=\"80\" fill=\"rgba(0,255,157,0.08)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"255\" y=\"70\" fill=\"#00ff9d\" font-family=\"JetBrains Mono\" font-size=\"10\">Ed25519 Signature</text><text x=\"255\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"8\">Non-repudiation</text><rect x=\"430\" y=\"40\" width=\"170\" height=\"80\" fill=\"rgba(255,183,0,0.08)\" stroke=\"#ffb700\" rx=\"4\"/><text x=\"445\" y=\"70\" fill=\"#ffb700\" font-family=\"JetBrains Mono\" font-size=\"10\">RFC 3161 TSA</text><text x=\"445\" y=\"90\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"8\">Trusted Time Authority</text></svg>",
    "standardCitation": "Expert Witness Testimony Protocol in Federal Courtrooms.",
    "keyKeywords": [
      "Đối chất tòa án",
      "Giám định viên trưởng",
      "Luật sư",
      "Bất biến vật lý",
      "Đanh thép"
    ]
  },
  {
    "id": 111,
    "code": "11.1",
    "pillar": 11,
    "pillarTitle": "Phân Khu 11: Kiến Trúc Fullstack Doanh Nghiệp (FastAPI, ONNX C++, Web Audio API)",
    "title": "Tách biệt Web Audio API Client và ONNX C++ Backend",
    "difficulty": "TRUNG CẤP",
    "question": "Lợi ích kiến trúc của việc để trình duyệt vẽ Canvas 60 FPS trong khi server chạy mô hình học sâu?",
    "physics": "Client tận dụng GPU người dùng để tính FFT và render Canvas mượt mà 60 FPS mà không tiêu hao 1 byte băng thông server. Backend tập trung 100% CPU chạy ONNX Runtime và NAFE.",
    "mathProof": "Kiến trúc Hybrid: Client-side Visual DSP (Web Audio) + Server-side Forensic Deep Learning (ONNX C++).",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">ENTERPRISE SYSTEM: FASTAPI + REDIS + ONNX C++ WORKER POOL</text><rect x=\"50\" y=\"45\" width=\"140\" height=\"70\" fill=\"rgba(0,240,255,0.1)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"70\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"10\">FastAPI ASGI</text><text x=\"200\" y=\"85\" fill=\"#00f0ff\" font-size=\"14\">→</text><rect x=\"225\" y=\"45\" width=\"150\" height=\"70\" fill=\"rgba(255,51,102,0.1)\" stroke=\"#ff3366\" rx=\"4\"/><text x=\"240\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"10\">Redis Lock / PubSub</text><text x=\"385\" y=\"85\" fill=\"#ff3366\" font-size=\"14\">→</text><rect x=\"410\" y=\"45\" width=\"190\" height=\"70\" fill=\"rgba(0,255,157,0.1)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"430\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"10\">ONNX C++ (4-threads)</text></svg>",
    "standardCitation": "W3C Web Audio API Recommendation & High-Performance Web Architecture.",
    "keyKeywords": [
      "Web Audio API",
      "Client-Server",
      "Canvas 60 FPS",
      "Hybrid",
      "Tiết kiệm băng thông"
    ]
  },
  {
    "id": 112,
    "code": "11.2",
    "pillar": 11,
    "pillarTitle": "Phân Khu 11: Kiến Trúc Fullstack Doanh Nghiệp (FastAPI, ONNX C++, Web Audio API)",
    "title": "FastAPI ASGI bất đồng bộ kết hợp Worker Pool",
    "difficulty": "CAO CẤP",
    "question": "Tại sao không chạy trực tiếp thuật toán NAFE trong hàm `async def` của FastAPI?",
    "physics": "`async def` chạy trên Event Loop đơn luồng. Các thuật toán nặng tính toán (CPU-bound) như NAFE sẽ khóa chặt Event Loop (blocking), làm nghẽn toàn bộ hàng nghìn kết nối WebSocket khác.",
    "mathProof": "Giải pháp: `await loop.run_in_executor(worker_pool, nafe_compute)`. Giữ Event Loop luôn giải phóng.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">ENTERPRISE SYSTEM: FASTAPI + REDIS + ONNX C++ WORKER POOL</text><rect x=\"50\" y=\"45\" width=\"140\" height=\"70\" fill=\"rgba(0,240,255,0.1)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"70\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"10\">FastAPI ASGI</text><text x=\"200\" y=\"85\" fill=\"#00f0ff\" font-size=\"14\">→</text><rect x=\"225\" y=\"45\" width=\"150\" height=\"70\" fill=\"rgba(255,51,102,0.1)\" stroke=\"#ff3366\" rx=\"4\"/><text x=\"240\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"10\">Redis Lock / PubSub</text><text x=\"385\" y=\"85\" fill=\"#ff3366\" font-size=\"14\">→</text><rect x=\"410\" y=\"45\" width=\"190\" height=\"70\" fill=\"rgba(0,255,157,0.1)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"430\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"10\">ONNX C++ (4-threads)</text></svg>",
    "standardCitation": "FastAPI & Starlette Asynchronous Concurrency Model Documentation.",
    "keyKeywords": [
      "FastAPI",
      "ASGI",
      "Event Loop",
      "run_in_executor",
      "Blocking"
    ]
  },
  {
    "id": 113,
    "code": "11.3",
    "pillar": 11,
    "pillarTitle": "Phân Khu 11: Kiến Trúc Fullstack Doanh Nghiệp (FastAPI, ONNX C++, Web Audio API)",
    "title": "Quản lý phiên làm việc với Redis Distributed Lock",
    "difficulty": "TRUNG CẤP",
    "question": "Làm thế nào ngăn chặn Race Condition khi 1 khách hàng gọi đồng thời 2 cuộc xác thực?",
    "physics": "Sử dụng Redis Redlock với khóa `lock:caller:{phone_number}` và thời gian sống TTL=5s. Chỉ cuộc gọi đầu tiên được cấp phát session; cuộc gọi thứ hai bị giữ lại hoặc từ chối.",
    "mathProof": "SET lock:caller:0912345678 my_random_token NX PX 5000. Đảm bảo tính nguyên tử (Atomicity).",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">ENTERPRISE SYSTEM: FASTAPI + REDIS + ONNX C++ WORKER POOL</text><rect x=\"50\" y=\"45\" width=\"140\" height=\"70\" fill=\"rgba(0,240,255,0.1)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"70\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"10\">FastAPI ASGI</text><text x=\"200\" y=\"85\" fill=\"#00f0ff\" font-size=\"14\">→</text><rect x=\"225\" y=\"45\" width=\"150\" height=\"70\" fill=\"rgba(255,51,102,0.1)\" stroke=\"#ff3366\" rx=\"4\"/><text x=\"240\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"10\">Redis Lock / PubSub</text><text x=\"385\" y=\"85\" fill=\"#ff3366\" font-size=\"14\">→</text><rect x=\"410\" y=\"45\" width=\"190\" height=\"70\" fill=\"rgba(0,255,157,0.1)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"430\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"10\">ONNX C++ (4-threads)</text></svg>",
    "standardCitation": "Redis Distributed Locks Documentation (Redlock Algorithm by Salvatore Sanfilippo).",
    "keyKeywords": [
      "Redis",
      "Redlock",
      "Distributed Lock",
      "Race Condition",
      "Atomicity"
    ]
  },
  {
    "id": 114,
    "code": "11.4",
    "pillar": 11,
    "pillarTitle": "Phân Khu 11: Kiến Trúc Fullstack Doanh Nghiệp (FastAPI, ONNX C++, Web Audio API)",
    "title": "Bảo mật Zero-Trust trong luồng xử lý giọng nói",
    "difficulty": "CAO CẤP",
    "question": "Dữ liệu âm thanh của khách hàng được mã hóa và bảo vệ quyền riêng tư thế nào?",
    "physics": "Mã hóa TLS 1.3 trong truyền dẫn; Âm thanh lưu trong bộ nhớ RAM được xóa bằng Zero-Memory ngay sau khi phân tích; Dữ liệu telemetry không lưu giọng nói thô, chỉ lưu vector đặc trưng không khả nghịch.",
    "mathProof": "Tuân thủ GDPR Article 9 (Special Category Data) và Nghị định 13/2023/NĐ-CP về Bảo vệ dữ liệu cá nhân.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">ENTERPRISE SYSTEM: FASTAPI + REDIS + ONNX C++ WORKER POOL</text><rect x=\"50\" y=\"45\" width=\"140\" height=\"70\" fill=\"rgba(0,240,255,0.1)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"70\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"10\">FastAPI ASGI</text><text x=\"200\" y=\"85\" fill=\"#00f0ff\" font-size=\"14\">→</text><rect x=\"225\" y=\"45\" width=\"150\" height=\"70\" fill=\"rgba(255,51,102,0.1)\" stroke=\"#ff3366\" rx=\"4\"/><text x=\"240\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"10\">Redis Lock / PubSub</text><text x=\"385\" y=\"85\" fill=\"#ff3366\" font-size=\"14\">→</text><rect x=\"410\" y=\"45\" width=\"190\" height=\"70\" fill=\"rgba(0,255,157,0.1)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"430\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"10\">ONNX C++ (4-threads)</text></svg>",
    "standardCitation": "NIST SP 800-207 'Zero Trust Architecture'; Nghị định 13/2023/NĐ-CP.",
    "keyKeywords": [
      "Zero-Trust",
      "TLS 1.3",
      "Nghị định 13",
      "Bảo vệ dữ liệu cá nhân",
      "Xóa RAM"
    ]
  },
  {
    "id": 115,
    "code": "11.5",
    "pillar": 11,
    "pillarTitle": "Phân Khu 11: Kiến Trúc Fullstack Doanh Nghiệp (FastAPI, ONNX C++, Web Audio API)",
    "title": "Giám sát Telemetry thời gian thực với Prometheus & OpenTelemetry",
    "difficulty": "TRUNG CẤP",
    "question": "Các chỉ số giám sát vàng (Golden Signals) nào được bắn về Dashboard trung tâm?",
    "physics": "1. Latency (Độ trễ p50, p95, p99). 2. Traffic (Số luồng đồng thời). 3. Errors (Tỷ lệ rớt gói, lỗi socket). 4. Saturation (Độ bão hòa CPU/RAM). 5. Veto Rate (Tỷ lệ kích hoạt Hard Veto).",
    "mathProof": "Prometheus Histogram metrics: `deepguard_latency_ms_bucket{le='350'}`. Cảnh báo qua PagerDuty khi p99 > 380ms.",
    "svgDiagram": "<svg class=\"diagram-svg\" viewBox=\"0 0 650 160\" width=\"100%\"><rect width=\"650\" height=\"160\" fill=\"#04070e\" rx=\"8\"/><text x=\"20\" y=\"24\" fill=\"#00f0ff\" font-family=\"JetBrains Mono\" font-size=\"11\" font-weight=\"bold\">ENTERPRISE SYSTEM: FASTAPI + REDIS + ONNX C++ WORKER POOL</text><rect x=\"50\" y=\"45\" width=\"140\" height=\"70\" fill=\"rgba(0,240,255,0.1)\" stroke=\"#00f0ff\" rx=\"4\"/><text x=\"70\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"10\">FastAPI ASGI</text><text x=\"200\" y=\"85\" fill=\"#00f0ff\" font-size=\"14\">→</text><rect x=\"225\" y=\"45\" width=\"150\" height=\"70\" fill=\"rgba(255,51,102,0.1)\" stroke=\"#ff3366\" rx=\"4\"/><text x=\"240\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"10\">Redis Lock / PubSub</text><text x=\"385\" y=\"85\" fill=\"#ff3366\" font-size=\"14\">→</text><rect x=\"410\" y=\"45\" width=\"190\" height=\"70\" fill=\"rgba(0,255,157,0.1)\" stroke=\"#00ff9d\" rx=\"4\"/><text x=\"430\" y=\"85\" fill=\"#fff\" font-family=\"JetBrains Mono\" font-size=\"10\">ONNX C++ (4-threads)</text></svg>",
    "standardCitation": "Google Site Reliability Engineering (SRE) Book 'The Four Golden Signals'.",
    "keyKeywords": [
      "Golden Signals",
      "Prometheus",
      "OpenTelemetry",
      "p99 < 380ms",
      "Telemetry"
    ]
  }
];
