# CẨM NANG BẢO VỆ ĐỒ ÁN TOÀN DIỆN & GIÁM ĐỊNH PHÁP Y ÂM THANH
## DỰ ÁN: DEEPGUARD AI ENTERPRISE - NỀN TẢNG PHÒNG VỆ DEEPFAKE VOICE TIẾNG VIỆT ĐA TẦNG

---

### TRỤ CỘT 1: XỬ LÝ TÍN HIỆU ÂM THANH SỐ (DIGITAL SIGNAL PROCESSING - DSP)
1. **Quy chuẩn tiền xử lý tín hiệu:**
   - **Tần số lấy mẫu ($f_s$):** $16\text{ kHz}$ (chuẩn tối ưu giữ thông tin thanh môn và formant $F_1, F_2, F_3$ dưới định lý Nyquist $f_{max} = 8\text{ kHz}$, triệt tiêu gánh nặng tính toán so với $44.1\text{ kHz}$ hay $48\text{ kHz}$).
   - **Resampling:** Polyphase Filtering (thay vì Linear Interpolation) để tránh hiện tượng Aliasing (răng cưa tần số) và Spectral Leakage.
   - **STFT (Short-Time Fourier Transform):**
     - Cửa sổ Hann $N = 1024$ mẫu ($64\text{ ms}$ tại $16\text{ kHz}$), bước nhảy $hop\_length = 256$ mẫu ($16\text{ ms}$, độ chồng lấn $75\%$).
     - Độ phân giải tần số: $\Delta f = \frac{f_s}{N} = \frac{16000}{1024} = 15.625\text{ Hz}$.
     - Độ phân giải thời gian: $\Delta t = \frac{hop}{f_s} = \frac{256}{16000} = 16\text{ ms}$.
   - **Log-Mel Filterbank:**
     - $80$ dải Mel phân bố phi tuyến tính theo cảm nhận thính giác con người từ $100\text{ Hz}$ đến $8000\text{ Hz}$.
     - Công thức Mel: $m = 2595 \cdot \log_{10}(1 + \frac{f}{700})$.
     - Ánh xạ ma trận: $S_{mel} = \ln(\mathbf{W}_{mel} \cdot |X(t, f)|^2 + \epsilon)$.
2. **Các tham số đặc trưng pháp y cổ điển:**
   - **RMS Energy:** Đo công suất tín hiệu thời gian thực.
   - **ZCR (Zero Crossing Rate):** Đo tần suất đổi dấu, bóc tách âm vô thanh (Unvoiced - ma sát, bật hơi) và âm hữu thanh (Voiced - rung dây thanh).
   - **Spectral Centroid (Trọng tâm phổ):** $\text{Centroid} = \frac{\sum f \cdot S(f)}{\sum S(f)}$ - thể hiện độ "sáng" (brightness) của âm thanh.
   - **Spectral Spread (Độ phân tán phổ):** Độ lệch bậc hai quanh trọng tâm phổ.
   - **Spectral Flatness (Độ phẳng phổ):** Tỷ lệ trung bình nhân / trung bình cộng của phổ. Flatness cao $\approx 1$ đại diện cho nhiễu trắng, Flatness thấp $\approx 0$ đại diện cho âm đơn sắc/hòa âm dây thanh.
   - **Spectral Flux:** Tốc độ biến thiên cấu trúc phổ giữa hai khung liên tiếp.
   - **Spectral Rolloff (85% / 95%):** Tần số ngưỡng mà dưới đó chứa $85\%$ tổng năng lượng phổ.

---

### TRỤ CỘT 2: VẬT LÝ ÂM HỌC PHÒNG & CHUẨN ISO 3382 (ROOM ACOUSTICS)
1. **Phương pháp Tích phân năng lượng lùi Schroeder:**
   - Đáp ứng xung phòng $h(t)$ (Room Impulse Response - RIR).
   - Năng lượng suy giảm tích lũy: $E(t) = \int_{t}^{\infty} h^2(\tau) d\tau$.
   - Tính toán trên các đoạn rơi năng lượng tiếng nói (**Speech Offset Tails**): khi người nói kết thúc một âm tiết/nguyên âm, năng lượng âm thanh không tắt tức thì mà suy hao theo hàm mũ do phản xạ tường phòng.
2. **Ước lượng T20 và quy đổi RT60:**
   - Xác định khoảng suy giảm từ $-5\text{ dB}$ đến $-25\text{ dB}$ trên đường cong Schroeder $\rightarrow T_{20}$.
   - Thời gian dội âm chuẩn: $RT_{60} = 3 \times T_{20}$.
3. **Phát hiện gian lận và tấn công vật lý:**
   - **Phòng vô trùng số (Anechoic / Clean Synthesis):** $RT_{60} < 0.15\text{ s}$ $\rightarrow$ Đặc trưng của các mô hình TTS/Vocoder tổng hợp toán học trong môi trường giả lập không có phản xạ âm thực tế.
   - **Tấn công phát lại qua loa ngoài (Loudspeaker Replay Attack):** $RT_{60} > 0.85\text{ s}$ $\rightarrow$ Hiệu ứng tích chập 2 lần phản xạ phòng ($h_{record}(t) * h_{replay}(t)$) kèm hiệu ứng lọc lược (**Comb-Filtering**) do giao thoa sóng âm từ màng loa tới micro.
   - **Cắt ghép âm thanh (Audio Splicing Detection):** Bước nhảy nền nhiễu bất thường $\Delta \text{Noise Floor} > 9.5\text{ dB}$ giữa các từ/câu, tố giác việc ghép nối các đoạn ghi âm cắt dán từ nhiều nguồn.

---

### TRỤ CỘT 3: NGỮ ÂM HỌC & 6 THANH ĐIỆU TIẾNG VIỆT (VIETNAMESE PROSODY)
1. **Bóc tách Tần số cơ bản F0 qua NAFE (Normalized Autocorrelation F0 Estimation):**
   - $R_x(\tau) = \frac{\sum_{n} x[n] x[n+\tau]}{\sqrt{\sum_n x^2[n] \cdot \sum_n x^2[n+\tau]}}$.
   - Dò cực đại trong dải tần sinh học người: $[60\text{ Hz}, 400\text{ Hz}]$.
2. **Micro-Jitter sinh học dây thanh:**
   - Định nghĩa: Độ bất đối xứng vi mô chu kỳ rung giữa các chu kỳ dây thanh liền kề:
     $$Jitter_{rel} = \frac{\frac{1}{N-1} \sum_{i=1}^{N-1} |T_i - T_{i+1}|}{\frac{1}{N} \sum_{i=1}^N T_i} \times 100\%$$
   - **Dây thanh người thật:** Rung động đàn hồi phi tuyến, co bóp cơ học và tuần hoàn máu tạo vi dao động sinh học $0.6\% - 2.5\%$.
   - **AI Vocoder (HiFi-GAN, FastSpeech2):** Tối ưu hóa trên hàm mất mát L1/L2 trên Mel-Spectrogram dẫn đến hiện tượng trơn hóa (over-smoothing), Jitter rơi xuống mức phi tự nhiên $< 0.35\%$.
   - **RVC v2 (Harvest / PM):** Dễ bị nhảy pha (phase discontinuity) và lượng tử hóa sai lệch tần số, Jitter vọt cao bất thường $> 4.8\%$.
3. **Khai phá Nghẽn thanh môn (Glottal Stop Mining) trên Thanh Ngã:**
   - **Đặc trưng âm học:** Thanh Ngã là thanh gãy (broken tone). Người nói đẩy cao độ lên (High-rising), sau đó nắp thanh môn (glottis) khép chặt đột ngột tạo ra âm nghẽn thanh môn (glottal stop / creaky voice), rồi bung ra kết thúc ở cao độ cao.
   - **Dấu hiệu định lượng:** Năng lượng sụt giảm mạnh $\Delta E < -12\text{ dB}$ trong khung thời gian cực ngắn $20\text{ ms} - 60\text{ ms}$, đồng thời đường F0 bị gián đoạn/biến mất hoàn toàn.
   - **Lỗ hổng của AI TTS quốc tế (ElevenLabs, Bark):** Được huấn luyện chủ yếu trên tiếng Anh/đa ngữ không có thanh điệu gãy thanh môn, khi đọc tiếng Việt mô hình nội suy đường F0 liên tục hoặc chỉ hạ âm lượng nhẹ nhàng (smooth dip), không thể tái tạo cú siết cơ học thanh môn thật sự.
4. **Bẹp dải cao độ (Monotonic F0 Compression):**
   - Dải biến thiên cao độ: $\Delta F_0 = F_{0,max} - F_{0,min}$.
   - Giọng tiếng Việt chuẩn có $\Delta F_0 > 110\text{ Hz}$ qua 6 thanh (Ngang, Huyền, Sắc, Hỏi, Ngã, Nặng). Giọng clone AI giá rẻ thường bị "bẹp" với $\Delta F_0 < 55\text{ Hz}$.

---

### TRỤ CỘT 4: MÔ HÌNH HỌC SÂU MelCNN & TỐI ƯU HÓA SUY LUẬN ONNX
1. **Kiến trúc MelCNN 2D:**
   - Đầu vào: Tensor phổ Log-Mel $(1, 1, 80, T)$.
   - 4 Khối Conv-BN-ReLU-MaxPool:
     - Block 1: Conv2D(1 $\rightarrow$ 32, kernel 3x3) + BatchNorm + ReLU + MaxPool(2x2).
     - Block 2: Conv2D(32 $\rightarrow$ 64, kernel 3x3) + BatchNorm + ReLU + MaxPool(2x2).
     - Block 3: Conv2D(64 $\rightarrow$ 128, kernel 3x3) + BatchNorm + ReLU + MaxPool(2x2).
     - Block 4: Conv2D(128 $\rightarrow$ 256, kernel 3x3) + BatchNorm + ReLU + MaxPool(2x2).
   - Head: AdaptiveAvgPool2d((1, 1)) $\rightarrow$ Flatten $\rightarrow$ Linear(256 $\rightarrow$ 64) $\rightarrow$ Dropout(0.3) $\rightarrow$ Linear(64 $\rightarrow$ 2) $\rightarrow$ Softmax.
2. **Tối ưu hóa ONNX Runtime Opset 14:**
   - Chuyển đổi từ PyTorch tĩnh sang ONNX tối ưu đồ thị (Graph Optimization: Constant Folding, Node Fusion Conv+BN+ReLU).
   - Đa luồng CPU nội bộ: `session_options.intra_op_num_threads = 4`, `inter_op_num_threads = 1`.
   - Thời gian suy luận (Inference Latency): Đạt $6.8\text{ ms} - 9.5\text{ ms}$ trên CPU Intel/AMD thông dụng mà không cần GPU đắt đỏ.

---

### TRỤ CỘT 5: CƠ CHẾ DUNG HỢP QUYẾT ĐỊNH & XỬ LÝ MÂU THUẪN (FUSION ENGINE)
1. **Phê phán Phép cộng trọng số tĩnh (Static Linear Ensemble):**
   - Giả sử $Score = 0.5 \times S_{CNN} + 0.3 \times S_{Prosody} + 0.2 \times S_{Acoustics}$.
   - **Hiểm họa:** Nếu kẻ tấn công dùng công nghệ Deepfake mới tinh mà CNN chưa từng học (Out-of-Distribution - OOD), $S_{CNN} = 0.1$ (đoán là người thật), nhưng Jitter đo được $0.12\%$ (phi sinh học) và RT60 = $0.08\text{ s}$ (phòng câm). Phép cộng tuyến tính sẽ cho điểm an toàn trung bình $\approx 0.35$ $\rightarrow$ Hệ thống bị vượt mặt!
2. **Quyền phủ quyết bất biến vật lý (Hard Physics Veto):**
   - Nếu $Jitter < 0.35\%$ HOẶC $\Delta \text{Noise Floor} > 9.5\text{ dB}$ HOẶC $RT_{60} < 0.15\text{ s}$:
     $$\text{Final Status} = \text{SUSPICIOUS / FAKE (Hard Veto)}$$
   - Bất kể CNN dự đoán xác suất người thật là bao nhiêu, định luật vật lý không bao giờ bị đánh đổi bởi mô hình xác suất.
3. **Cổng động thích ứng kênh truyền (Context-Aware Gated Weights):**
   - Kênh viễn thông thoại bàn/di động hẹp ($8\text{ kHz}$ qua codec G.711): Toàn bộ dải phổ trên $3.4\text{ kHz}$ bị cắt cụt $\rightarrow$ CNN mất đặc trưng formant cao.
   - Cổng động tự động hạ trọng số: $W_{CNN}: 0.50 \rightarrow 0.10$, đồng thời đẩy trọng số thanh điệu ngữ âm lên $W_{Prosody}: 0.30 \rightarrow 0.65$ và $W_{Acoustics}: 0.20 \rightarrow 0.25$.
4. **Trạng thái mâu thuẫn & Thử thách động (Dynamic Challenge-Response):**
   - Khi điểm số rơi vào vùng tranh chấp $[0.3, 0.8)$ hoặc các nhánh bất đồng thuận:
   - Hệ thống kích hoạt OTP âm thanh động: yêu cầu người dùng đọc một cụm từ tiếng Việt chứa nhiều thanh Ngã và thanh Nặng đặc thù (VD: *"Kỹ sư Nguyễn Vĩ Viết vẽ tranh bão lũ"*), lập tức ép mô hình giả mạo bộc lộ khuyết tật thanh môn.

---

### TRỤ CỘT 6: ĐỊNH DANH HỌ MÔ HÌNH SINH MÃ (ATTRIBUTION ENGINE)
- **ElevenLabs:** Mô hình khuếch tán (Latent Diffusion Vocoder). Dấu vết: Dải cao tần mịn bất thường, thiếu hụt vi nhiễu nắp thanh môn, F0 mượt mà.
- **RVC v2 (Retrieval-based Voice Conversion):** Thuật toán dò Harvest F0 + VITS decoder. Dấu vết: Phase Jitter cao $> 4.8\%$, răng cưa cục bộ tại các bước chuyển tone nhanh.
- **FPT.AI / Zalo AI:** FastSpeech2 + HiFi-GAN. Dấu vết: Dải F0 bẹp $\Delta F_0 < 65\text{ Hz}$, năng lượng âm vô thanh nén gắt, thiếu dội âm tự nhiên ($RT_{60} < 0.12\text{ s}$).
- **Bark / Tortoise:** Autoregressive audio tokens. Dấu vết: Hallucination nhiễu nền ở đuôi âm tiết, ngẫu nhiên xuất hiện click/pop artifact.

---

### TRỤ CỘT 7: SINH TRẮC GIỌNG NÓI 1:1 & PHÂN LY KHÔNG GIAN TRỰC GIAO
1. **Bóc tách vector vân giọng 128 chiều:**
   - Trích xuất embedding $v \in \mathbb{R}^{128}$, chuẩn hóa $L_2$: $\|v\|_2 = 1$.
   - Độ tương đồng Cosine: $Sim(v_1, v_2) = v_1 \cdot v_2$.
2. **Phân ly không gian trực giao (Orthogonal Subspace Projection):**
   - Không gian định danh (Identity Subspace $\mathcal{S}_{ID}$): Chứa đặc trưng hộp sọ, thanh quản, chiều dài ống thanh âm của người dùng mục tiêu.
   - Không gian tính sống (Liveness Subspace $\mathcal{S}_{Live}$): Chứa vi dao động sinh học, jitter, shimmer, phản xạ môi trường.
   - $\mathcal{S}_{ID} \perp \mathcal{S}_{Live}$: Giúp hệ thống không bị nhầm lẫn giữa *"Người lạ nói thật"* và *"Giọng của chủ tài khoản bị AI clone"*.
3. **Ma trận quyết định 4 trạng thái:**
   | Điểm Sinh Trắc ($S_{ID}$) | Điểm Tính Sống ($S_{Live}$) | Kết Luận Hệ Thống | Hành Động |
   |---|---|---|---|
   | $\ge 0.75$ (Khớp chủ) | $\ge 0.75$ (Sống) | **Authentic Owner (Chủ tài khoản thật)** | Cho phép giao dịch |
   | $\ge 0.75$ (Khớp chủ) | $< 0.40$ (Giả mạo) | **Voice Clone Attack (Tấn công Deepfake clone chủ)** | Khóa tức thì + Báo động đỏ |
   | $< 0.50$ (Không khớp) | $\ge 0.75$ (Sống) | **Imposter Human (Kẻ mạo danh người thật)** | Từ chối xác thực sai người |
   | $< 0.50$ (Không khớp) | $< 0.40$ (Giả mạo) | **Imposter Synthetic (Bot AI mạo danh)** | Chặn cuộc gọi bot rác |

---

### TRỤ CỘT 8: KIỂM THỬ ĐỘ BỀN VỮNG & GIẢ LẬP TẤN CÔNG (RED-TEAM)
1. **Kênh viễn thông G.711 Telephony:**
   - Băng thông dải thông 300Hz - 3400Hz, định dạng nén 8-bit $\mu$-law/A-law.
   - Thử thách: Kiểm tra khả năng nhận diện khi toàn bộ dải tần số cao bị triệt tiêu hoàn toàn.
2. **Kênh di động nén sâu AMR-NB:**
   - Nén tốc độ thấp $4.75\text{ kbps} - 12.2\text{ kbps}$ kèm tỷ lệ rớt gói mạng viễn thông $5\%$.
3. **Nhiễu môi trường nhồi (Additive Noise Injection):**
   - Nhiễu giao thông đường phố (Street Traffic), tiếng ồn trung tâm cuộc gọi (Callcenter Babble) ở mức SNR từ $5\text{ dB}$ đến $20\text{ dB}$.
4. **Tấn công bẻ cong cao độ (Pitch Bending) & Dội âm nhân tạo:**
   - Dịch chuyển dải F0 giả tạo nhằm qua mặt bộ bóc tách cao độ.

---

### TRỤ CỘT 9: ĐỘ TRỄ TOÀN TRÌNH ĐẦU-CUỐI (END-TO-END LATENCY $T_{E2E} \approx 350\text{ ms}$)
$$T_{E2E} = T_{Buffer} + T_{Network} + T_{Compute} + T_{Render}$$
- $T_{Buffer} = 300\text{ ms}$: Kích thước khung đệm âm thanh trượt (sliding chunk) để đủ mẫu tính toán FFT và F0 mà không làm đứt mạch ngữ âm.
- $T_{Network} = 30\text{ ms}$: Truyền tải hai chiều WebSocket / HTTP2.
- $T_{Compute} = 20\text{ ms}$:
  - Giải mã audio: $4\text{ ms}$.
  - Tính toán Log-Mel Spectrogram: $3\text{ ms}$.
  - ONNX MelCNN Inference: $8\text{ ms}$.
  - Bóc tách NAFE F0 & Jitter: $3\text{ ms}$.
  - Schroeder RT60 & Noise Floor: $2\text{ ms}$.
- $T_{Render} = 5\text{ ms}$: Cập nhật trạng thái giao diện UI/Web Audio.
$\rightarrow$ **Ý nghĩa an ninh:** Cắt đứt cuộc gọi lừa đảo ngay từ âm tiết đầu tiên của kẻ tấn công trước khi nạn nhân kịp thực hiện thao tác chuyển tiền!

---

### TRỤ CỘT 10: PHÁP Y SỐ, CHUỖI BẢO QUẢN & CHÍNH SÁCH QUẢN TRỊ RỦI RO
1. **Phân biệt tính toàn vẹn (Integrity) và Nguồn gốc (Provenance):**
   - **Mã băm SHA-256:** Đảm bảo file âm thanh không bị can thiệp 1 bit kể từ lúc thu nhận (Integrity) và bảo đảm tính tái lập kết quả giám định trước tòa (Reproducibility).
   - **Giới hạn:** SHA-256 KHÔNG THỂ chứng minh file đó là do con người nói hay do AI tạo ra, cũng không chứng minh file được thu vào ngày giờ nào trong quá khứ!
2. **Bộ ba pháp lý bảo vệ bằng chứng trước tòa:**
   - `SHA-256(Audio)`: Bằng chứng toàn vẹn chuỗi bit.
   - `Ký số PKI Ed25519/RSA`: Chứng minh danh tính hệ thống giám định được cơ quan có thẩm quyền cấp phép (Non-repudiation).
   - `RFC 3161 TSA (Trusted Timestamp Authority)`: Đóng dấu thời gian chuẩn quốc tế không thể chỉnh sửa thời gian hệ thống.
3. **Chính sách phân vùng 3 dải (Tri-Band Policy) trong Ngân hàng:**
   - **Dải Xanh ($Score \in [0.0, 0.3)$):** Tin cậy cao $\rightarrow$ Cho phép thông qua tự động.
   - **Dải Vàng ($Score \in [0.3, 0.8)$):** Nghi ngờ/Mâu thuẫn $\rightarrow$ Kích hoạt xác thực tăng cường (Step-up Auth: OTP giọng nói ngẫu nhiên, sinh trắc khuôn mặt).
   - **Dải Đỏ ($Score \in [0.8, 1.0]$):** Nguy hiểm cao $\rightarrow$ Chặn tự động, đóng băng luồng giao dịch nhạy cảm, gửi cảnh báo cho chuyên viên giám sát gian lận.
   - **Ép tỷ lệ báo động giả (False Positive Rate - FPR) $< 0.05\%$:** Không gây gián đoạn trải nghiệm người dùng thực.

---

### TRỤ CỘT 11: KIẾN TRÚC FULLSTACK DOANH NGHIỆP
- **Backend:** FastAPI ASGI bất đồng bộ, Pydantic v2 validation nghiêm ngặt, SQLite3 lưu vết nhật ký giám định, NumPy/SciPy tối ưu phép toán ma trận C-speed.
- **Frontend:** React 18, TypeScript, Vite, Web Audio API bóc tách phổ trực tiếp tại client, Canvas 2D render Spectrogram 60 FPS mượt mà.
- **Triển khai:** Docker Compose, Nginx Reverse Proxy, cấu hình SSL/TLS bảo vệ luồng âm thanh viễn thông.
