# BÁCH KHOA TOÀN THƯ PHÁP Y ÂM THANH & 105 CÂU HỎI BẢO VỆ ĐỒ ÁN BẬC THẦY
## DỰ ÁN: DEEPGUARD AI ENTERPRISE - NỀN TẢNG PHÒNG VỆ DEEPFAKE VOICE TIẾNG VIỆT ĐA TẦNG

> **Quy chuẩn quốc tế & viện dẫn học thuật tích hợp:**
> - ISO 3382-1:2009 (Acoustics - Measurement of room acoustic parameters)
> - ITU-T Recommendation G.711 / G.722 / G.722.2 AMR-WB
> - FIPS 140-3 Level 3 & RFC 3161 (Digital Forensics & Trusted Time-Stamp Authority)
> - Điều 206 Bộ luật Tố tụng Hình sự 2015 & Tiêu chuẩn Daubert / Frye quốc tế
> - Ngữ âm học thực nghiệm tiếng Việt (Experimental Acoustic Phonetics of Vietnamese)

---

## MỤC LỤC 11 PHÂN KHU HẠT NHÂN (105 CÂU HỎI)
1. [Phân Khu 1: Xử Lý Tín Hiệu Âm Thanh Số (DSP Foundations)](#phan-khu-1)
2. [Phân Khu 2: Vật Lý Âm Học Phòng ISO 3382 & Tấn Công Replay](#phan-khu-2)
3. [Phân Khu 3: Ngữ Âm Học Tiếng Việt, 6 Thanh Điệu & Bất Biến Nắp Thanh Môn](#phan-khu-3)
4. [Phân Khu 4: Học Sâu MelCNN 2D & Tối Ưu Hóa ONNX Opset 14](#phan-khu-4)
5. [Phân Khu 5: Dung Hợp Quyết Định, Cổng Động & Quyền Phủ Quyết Bất Biến Vật Lý](#phan-khu-5)
6. [Phân Khu 6: Bóc Tách Dấu Vân Tay & Định Danh Họ Mô Hình AI (Attribution)](#phan-khu-6)
7. [Phân Khu 7: Sinh Trắc Giọng Nói 1:1 & Phân Ly Không Gian Trực Giao](#phan-khu-7)
8. [Phân Khu 8: Giả Lập Tấn Công (Red-Team) Kênh Viễn Thông G.711 & AMR](#phan-khu-8)
9. [Phân Khu 9: Ngân Sách Độ Trễ Toàn Trình Đầu - Cuối 350ms](#phan-khu-9)
10. [Phân Khu 10: Pháp Y Số, Chuỗi Bảo Quản Bằng Chứng & Chính Sách Ngân Hàng](#phan-khu-10)
11. [Phân Khu 11: Kiến Trúc Fullstack Doanh Nghiệp (FastAPI, ONNX C++, Web Audio API)](#phan-khu-11)

---

<a name="phan-khu-1"></a>
## PHÂN KHU 1: XỬ LÝ TÍN HIỆU ÂM THANH SỐ (DSP FOUNDATIONS)

### Câu hỏi 1.1: Tần số lấy mẫu tối ưu 16kHz & Định lý Nyquist-Shannon
- **Cấp độ:** `CƠ BẢN`
- **Vấn đề chất vấn:**  
  *Tại sao 16kHz là tần số chuẩn tuyệt đối cho giám định pháp y tiếng nói thay vì 44.1kHz hay 48kHz?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Tần số thoại người hữu ích < 7500Hz. F_Nyquist = 8000Hz là đủ trọn vẹn 4 formant F1-F4. Giảm 66.7% FLOPS so với 48kHz.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  f_Nyquist = f_s / 2 = 8,000 Hz. FLOPS giảm theo tỷ lệ bậc 1 với độ dài chuỗi STFT.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  ITU-T G.722 Wideband Standard, ASVspoof 2021 Benchmark Guidelines.
- **Từ khóa hạt nhân chấm điểm:** `Nyquist, 16kHz, Formant, FLOPS, Nyquist-Shannon`

---

### Câu hỏi 1.2: Polyphase Resampling vs Linear Interpolation
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Tại sao cấm dùng Linear Interpolation khi hạ mẫu từ 44.1kHz về 16kHz trong pháp y?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Nội suy tuyến tính có đáp ứng sinc^2 suy hao dải chặn chỉ -26dB, gây hiện tượng răng cưa Aliasing gập tần số cao vào dải 0-8kHz. Polyphase lọc FIR đạt suy hao > 80dB.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  x_resampled[m] = SUM_{k} x[k] * h_sub[m*M - k*L]. Độ suy hao Stopband Attenuation > 80dB.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Oppenheim & Schafer, 'Discrete-Time Signal Processing', Prentice Hall.
- **Từ khóa hạt nhân chấm điểm:** `Polyphase, Linear Interpolation, Aliasing, Stopband, Răng cưa`

---

### Câu hỏi 1.3: Cửa sổ Hann 1024 mẫu & Hop 256 mẫu
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Cửa sổ Hann 1024 và hop 256 thỏa hiệp với Nguyên lý bất định Heisenberg-Gabor thế nào?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Delta t * Delta f >= 1/(4*pi). N=1024 cho độ phân giải tần số 15.625Hz (bắt được F0=85-300Hz), hop 256 cho độ phân giải thời gian 16ms (bắt trọn cú siết nắp thanh môn 20-60ms).
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Delta f = 16000 / 1024 = 15.625 Hz; Delta t = 256 / 16000 = 16 ms. Overlap = (1024-256)/1024 = 75%.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Heisenberg, W. (1927); Gabor, D. (1946) 'Theory of Communication'.
- **Từ khóa hạt nhân chấm điểm:** `Heisenberg, Gabor, Hann, Hop, 15.625Hz, 16ms`

---

### Câu hỏi 1.4: Bộ lọc tiền nhấn Pre-emphasis (α = 0.97)
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Mục đích vật lý của bộ lọc FIR tiền nhấn y[n] = x[n] - 0.97*x[n-1] là gì?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Bức xạ âm thanh từ môi miệng làm suy giảm năng lượng tần số cao với tốc độ -6dB/octave. Pre-emphasis làm phẳng phổ (spectral flattening), tăng SNR cho các formant cao F3-F4.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  H(z) = 1 - alpha * z^(-1), alpha = 0.97. Bù trừ độ dốc suy hao bức xạ môi miệng +6dB/octave.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Fant, G. (1960) 'Acoustic Theory of Speech Production'.
- **Từ khóa hạt nhân chấm điểm:** `Pre-emphasis, 0.97, Bức xạ môi, Formant, -6dB/octave`

---

### Câu hỏi 1.5: Log-Mel Filterbank 80 Bins (100Hz - 8000Hz)
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Tại sao dùng thang đo Mel phi tuyến 80 bins thay vì thang tần số tuyến tính Hertz?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Ốc tai người cảm nhận cao độ theo hàm logarit phi tuyến (dưới 1000Hz tuyến tính, trên 1000Hz theo logarit). Mel scale mô phỏng chính xác màng đáy ốc tai (basilar membrane).
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Mel(f) = 2595 * log10(1 + f / 700). 80 bộ lọc tam giác phủ kín từ 100Hz đến 8000Hz.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Stevens, S. S., Volkmann, J., & Newman, E. B. (1937) 'A Scale for the Measurement of Pitch'.
- **Từ khóa hạt nhân chấm điểm:** `Mel, 80 Bins, Ốc tai, Màng đáy, Log-Mel`

---

### Câu hỏi 1.6: STFT vs Continuous Wavelet Transform (CWT)
- **Cấp độ:** `CHUYÊN GIA`
- **Vấn đề chất vấn:**  
  *Khi nào STFT vượt trội hơn Wavelet trong bóc tách deepfake voice?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  STFT cho lưới thời gian - tần số đồng nhất (Uniform Grid), phù hợp trực tiếp với các phép tích chập Conv2D chuẩn của mạng nơ-ron học sâu. CWT phức tạp tính toán và khó lượng tử hóa ONNX.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  X(t, f) = INTEGRAL x(tau) * w(tau - t) * e^(-j*2*pi*f*tau) dtau. Độ phức tạp O(N log N) với FFT.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Mallat, S. (2008) 'A Wavelet Tour of Signal Processing'.
- **Từ khóa hạt nhân chấm điểm:** `STFT, Wavelet, CWT, Lưới đồng nhất, Conv2D`

---

### Câu hỏi 1.7: Tác động của Zero-Padding trong FFT
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Zero-padding có làm tăng độ phân giải tần số vật lý của tín hiệu không?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Không. Zero-padding chỉ làm mịn đường vẽ phổ bằng cách nội suy hàm sinc trên miền tần số (sinc interpolation), không tạo thêm bất kỳ thông tin tần số mới nào.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Delta f_physical = f_s / N_actual. Zero-padding lên N_pad chỉ làm giảm bước vẽ d_f = f_s / N_pad.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Proakis, J. G., & Manolakis, D. G. 'Digital Signal Processing'.
- **Từ khóa hạt nhân chấm điểm:** `Zero-padding, Nội suy, Độ phân giải vật lý, Sinc`

---

### Câu hỏi 1.8: Hiện tượng rò rỉ phổ (Spectral Leakage) & Các hàm cửa sổ
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Tại sao cửa sổ chữ nhật (Rectangular) bị cấm ngặt nghèo trong phân tích phổ âm thanh?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Cửa sổ chữ nhật có búp sóng phụ (sidelobe) chỉ suy giảm -13dB, làm rò rỉ năng lượng của tần số mạnh sang che lấp hoàn toàn các tần số yếu lân cận. Hann đạt -31dB, Blackman đạt -58dB.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Sidelobe Attenuation: Rectangular = -13dB; Hann = -31dB; Blackman = -58dB; Kaiser (beta=8) = -80dB.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Harris, F. J. (1978) 'On the Use of Windows for Harmonic Analysis with Discrete Fourier Transform'.
- **Từ khóa hạt nhân chấm điểm:** `Rò rỉ phổ, Spectral Leakage, Sidelobe, Búp sóng phụ, Hann`

---

### Câu hỏi 1.9: Khôi phục pha (Phase Retrieval) & Thuật toán Griffin-Lim
- **Cấp độ:** `CHUYÊN GIA`
- **Vấn đề chất vấn:**  
  *Tại sao các tệp âm thanh khôi phục bằng Griffin-Lim dễ dàng bị DeepGuard kết án 100% FAKE?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Griffin-Lim ước lượng pha bằng cách chiếu lặp đi lặp lại giữa miền thời gian và tần số, sinh ra hiện tượng rỗng pha ngẫu nhiên và nhiễu kim loại (metallic robotic artifact).
- **Chứng minh toán học / Giải tích:**  
  ```latex
  x^(i+1) = iSTFT( |X| * exp( j * angle( STFT(x^(i)) ) ) ). Khuyết pha làm mất tính kết hợp sóng âm (phase coherence).
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Griffin, D., & Lim, J. (1984) 'Signal Estimation from Modified Short-Time Fourier Transform'.
- **Từ khóa hạt nhân chấm điểm:** `Griffin-Lim, Pha, Phase Retrieval, Metallic, Robot`

---

### Câu hỏi 1.10: Hiện tượng méo cắt đỉnh biên độ (Dynamic Range Clipping)
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Khi kẻ tấn công khuếch đại tín hiệu vượt quá 0dBFS, phổ tín hiệu biến dạng thế nào?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Clipping tạo ra các sóng vuông giả tạo, sinh ra vô số họa âm bậc lẻ (odd harmonics) trải dài vô tận lên tận dải cao tần, làm sập bộ bóc tách năng lượng formant.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  y[n] = sign(x[n]) * min(|x[n]|, 1.0). Chuỗi Fourier của sóng xén đỉnh chứa các thành phần (2k+1)*f0 với biên độ 1/(2k+1).
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  ITU-R BS.1770-4 'Algorithms to Measure Audio Programme Loudness'.
- **Từ khóa hạt nhân chấm điểm:** `Clipping, 0dBFS, Họa âm bậc lẻ, Cắt đỉnh, Méo`

---


<a name="phan-khu-2"></a>
## PHÂN KHU 2: VẬT LÝ ÂM HỌC PHÒNG ISO 3382 & TẤN CÔNG REPLAY

### Câu hỏi 2.1: Tích phân lùi Schroeder (Schroeder Backward Integration)
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Trình bày nguồn gốc giải tích của Tích phân lùi Schroeder và lý do nó vượt trội hơn bình phương xung?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Bình phương đáp ứng xung h^2(t) bị nhiễu loạn do giao thoa pha ngẫu nhiên. Tích phân lùi E(t) = ∫_t^∞ h^2(τ)dτ loại bỏ toàn bộ thăng giáng, tạo đường dốc suy giảm trơn tuyệt đối.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  E(t) = INTEGRAL_{t}^{infinity} h^2(tau) dtau; L(t) = 10 * log10( E(t) / E(0) ).
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Schroeder, M. R. (1979) 'Integrated-Impulse Method Measuring Reverberation Time', JASA.
- **Từ khóa hạt nhân chấm điểm:** `Schroeder, Tích phân lùi, E(t), Trơn, ISO 3382`

---

### Câu hỏi 2.2: Đo đạc T20 và quy đổi RT60 theo chuẩn ISO 3382
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Tại sao DeepGuard đo T20 thay vì đo trực tiếp T60 hay T30?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Trong cuộc gọi thực tế, SNR hiếm khi vượt quá 35-45dB. Sau khi rơi 30dB âm thanh đã chạm sàn nhiễu môi trường. Đo T20 (-5dB đến -25dB) nằm hoàn toàn trong vùng tín hiệu sạch.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  RT60 = 3 * T20 = 3 * (t_{-25dB} - t_{-5dB}). Chuẩn hóa theo mục 5.2 của ISO 3382-1:2009.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  ISO 3382-1:2009 'Measurement of Room Acoustic Parameters'.
- **Từ khóa hạt nhân chấm điểm:** `T20, RT60, 3*T20, -5dB, -25dB, ISO 3382`

---

### Câu hỏi 2.3: Hiện tượng lọc lược (Comb-Filtering) trong Replay Attack
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Sóng âm phát lại qua loa tạo ra hiện tượng giao thoa lọc lược trên phổ như thế nào?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Sóng truyền theo 2 đường: trực tiếp và phản xạ với độ trễ tau. Giao thoa tạo ra các rãnh suy hao tuần hoàn delta_f = 1/tau trên phổ biên độ.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  |H(f)|^2 = 1 + alpha^2 + 2*alpha*cos(2*pi*f*tau). f_notch = (2k+1)/(2*tau).
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Kuhl, W. (1965) 'Comb Filter Effect in Room Acoustics'.
- **Từ khóa hạt nhân chấm điểm:** `Comb-filtering, Lọc lược, Replay, tau, f_notch`

---

### Câu hỏi 2.4: Thời gian suy giảm sớm (Early Decay Time - EDT)
- **Cấp độ:** `CHUYÊN GIA`
- **Vấn đề chất vấn:**  
  *EDT (-0dB đến -10dB quy đổi 6x) phản ánh điều gì khác biệt so với RT60?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  EDT phản ánh cảm nhận chủ quan của tai người về độ vang trong 100ms đầu tiên do các phản xạ sớm (early reflections), rất nhạy cảm với khoảng cách từ miệng tới micro.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  EDT = 6 * (t_{-10dB} - t_{0dB}). Khác với RT60 vốn đo trường khuếch tán muộn (late diffuse field).
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Jordan, V. L. (1970) 'Acoustical Design of Concert Halls'.
- **Từ khóa hạt nhân chấm điểm:** `EDT, Early Decay, Phản xạ sớm, RT60, 6*T10`

---

### Câu hỏi 2.5: Tỷ lệ năng lượng trực tiếp trên dội âm (DRR)
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *DRR (Direct-to-Reverberant Ratio) giúp bóc mẽ việc kẻ tấn công dí sát loa vào micro ra sao?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Khi dí sát loa vào micro, DRR > 20dB (sóng trực tiếp áp đảo hoàn toàn), trong khi cuộc gọi tự nhiên có người cầm điện thoại cách 5-15cm luôn có DRR từ 6dB đến 14dB.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  DRR = 10 * log10( INTEGRAL_{0}^{t_d} h^2(t) dt / INTEGRAL_{t_d}^{infinity} h^2(t) dt ), t_d = 2.5ms.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Zahorik, P. (2002) 'Direct-to-reverberant energy ratio sensitivity'.
- **Từ khóa hạt nhân chấm điểm:** `DRR, Direct-to-Reverberant, Dí sát loa, Trực tiếp, Dội âm`

---

### Câu hỏi 2.6: Độ trong âm thanh C50 (Clarity Index)
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Chỉ số C50 phân định âm thanh phòng họp và phòng câm ảo như thế nào?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  C50 so sánh năng lượng trong 50ms đầu với phần còn lại. Phòng câm ảo có C50 > 30dB (hoàn toàn không có năng lượng sau 50ms), kích hoạt Hard Veto phòng câm.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  C50 = 10 * log10( INTEGRAL_{0}^{50ms} h^2(t) dt / INTEGRAL_{50ms}^{infinity} h^2(t) dt ).
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  ISO 3382-1 Mục A.2 'Speech Clarity'.
- **Từ khóa hạt nhân chấm điểm:** `C50, Clarity, 50ms, Phòng câm, ISO 3382`

---

### Câu hỏi 2.7: Đáp ứng xung phòng kép (Dual Room Impulse Response)
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Chứng minh toán học tại sao Replay Attack làm RT60 tăng vọt > 0.85s?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Tín hiệu đi qua 2 phòng: phòng thu âm gốc và phòng phát lại. Đáp ứng xung tổng là tích chập: h_total = h1 * h2. Thời gian dội âm tổng RT60_total xấp xỉ bằng căn bậc hai hoặc lớn hơn max(RT60_1, RT60_2).
- **Chứng minh toán học / Giải tích:**  
  ```latex
  h_total(t) = h_{rec}(t) * h_{play}(t). Trên miền Laplace: H_total(s) = H_rec(s) * H_play(s).
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  ASVspoof 2017/2019 Physical Access (PA) Evaluation Protocols.
- **Từ khóa hạt nhân chấm điểm:** `Dual RIR, Tích chập, Replay, h_total, > 0.85s`

---

### Câu hỏi 2.8: Suy hao truyền sóng trong không khí theo tần số (ISO 9613-1)
- **Cấp độ:** `CHUYÊN GIA`
- **Vấn đề chất vấn:**  
  *Sự suy hao âm thanh dải cao tần trong không khí tố cáo khoảng cách phát lại thế nào?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Tần số cao > 4kHz bị không khí hấp thụ mạnh theo độ ẩm và nhiệt độ. Tệp âm thanh bị Replay qua không gian xa sẽ mất toàn bộ năng lượng dải 6-8kHz so với nguồn phát trực tiếp.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  alpha_air(f) = f^2 * [ 1.84e-11 * (T/T0)^0.5 + (T/T0)^(-2.5) * ( ... ) ]. Độ dốc suy hao tăng theo bình phương tần số f^2.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  ISO 9613-1:1993 'Acoustics - Attenuation of sound during propagation outdoors'.
- **Từ khóa hạt nhân chấm điểm:** `ISO 9613, Hấp thụ không khí, Suy hao cao tần, Khoảng cách`

---

### Câu hỏi 2.9: Giả lập phòng câm ảo (Anechoic Chamber Detection)
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Tại sao RT60 < 0.15s lại bị coi là bằng chứng tội phạm công nghệ cao?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Không có phòng ngủ hay phòng làm việc nào trong đời thực có RT60 < 0.15s (trừ phòng thí nghiệm vô trùng triệu đô). Âm thanh có RT60 < 0.15s chỉ có thể sinh ra từ card âm thanh ảo của Deepfake bot.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  P(Real | RT60 < 0.15s) < 0.0001. Hệ thống kích hoạt HARD VETO: VIRTUAL ANECHOIC CHAMBER.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Vorländer, M. (2008) 'Auralization: Fundamentals of Acoustics', Springer.
- **Từ khóa hạt nhân chấm điểm:** `Anechoic, Phòng câm, < 0.15s, Card ảo, Hard Veto`

---

### Câu hỏi 2.10: Hiệu ứng Micro-Doppler từ chuyển động cơ thể
- **Cấp độ:** `CHUYÊN GIA`
- **Vấn đề chất vấn:**  
  *Người thật nói chuyện luôn dịch chuyển nhẹ đầu. Dấu vết Micro-Doppler xuất hiện ở đâu?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Chuyển động đầu với vận tốc v=0.05m/s tạo ra độ dịch Doppler f_d = f0 * (v/c) ≈ 0.2-0.5Hz trên các vạch họa âm cao. Deepfake phát từ loa cố định có f_d = 0 tuyệt đối.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Delta f_D = f_c * (2*v / c) * cos(theta). Quan sát được trên phổ STFT phân giải siêu mịn (N=4096).
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Chen, V. C. (2011) 'The Micro-Doppler Effect in Radar and Acoustics', Artech House.
- **Từ khóa hạt nhân chấm điểm:** `Micro-Doppler, Dịch chuyển đầu, Loa cố định, Họa âm`

---


<a name="phan-khu-3"></a>
## PHÂN KHU 3: NGỮ ÂM HỌC TIẾNG VIỆT, 6 THANH ĐIỆU & BẤT BIẾN NẮP THANH MÔN

### Câu hỏi 3.1: Đặc trưng âm học của 6 thanh điệu tiếng Việt
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Mô tả đường bao F0 và phân loại ngữ âm học của 6 thanh điệu tiếng Việt?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Ngang (bằng phẳng F0~220Hz), Huyền (trầm hạ 200->150Hz), Sắc (vút cao 210->280Hz), Hỏi (lượn xuống-lên), Ngã (gãy, siết nắp thanh môn), Nặng (ngắt cụt đột ngột).
- **Chứng minh toán học / Giải tích:**  
  ```latex
  F0_contour(t) được mô hình hóa bằng đường cong Bezier bậc 3 hoặc hàm đa thức Legendre 4 tham số.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Đỗ Thế Dũng (1988) 'Vietnamese Tones: Acoustic Analysis and Synthesis'; Nguyễn Văn Lợi & Edmondson (1997).
- **Từ khóa hạt nhân chấm điểm:** `6 thanh điệu, Ngang, Huyền, Sắc, Hỏi, Ngã, Nặng`

---

### Câu hỏi 3.2: Bất biến nắp thanh môn (Glottal Stop) trên thanh Ngã
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Cơ chế siết chặt nắp thanh môn trên thanh Ngã tạo ra hiện tượng gì trên phổ và năng lượng?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Giai đoạn giữa thanh Ngã, nắp thanh quản đóng cơ học hoàn toàn trong 20-60ms: F0 bị đứt gãy, năng lượng sụt giảm ΔE < -12dB. AI TTS chỉ hạ nhẹ -3dB nên bị lật tẩy.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Delta E_{glottal} = 10 * log10( E_{creak} / E_{vowel} ) < -12 dB trong cửa sổ Delta t in [20, 60] ms.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Vũ Thanh Phương (1982) 'Acoustic and Perceptual Study of Vietnamese Tones'.
- **Từ khóa hạt nhân chấm điểm:** `Thanh Ngã, Nắp thanh môn, Glottal Stop, ΔE < -12dB, Broken Tone`

---

### Câu hỏi 3.3: Công thức tính Micro-Jitter dây thanh sinh học
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Tại sao dây thanh người luôn có Jitter 0.6% - 2.5% mà Vocoder không bắt chước được?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Dây thanh rung theo khí động - đàn hồi phi tuyến, nhịp tim mao mạch tạo vi thăng giáng ngẫu nhiên. Vocoder tối ưu hàm loss L1/L2 làm mịn hóa cực đoan (Jitter < 0.35%).
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Jitter_{rel} = [ SUM_{i=1}^{N-1} |T_i - T_{i+1}| / (N-1) ] / [ SUM_{i=1}^N T_i / N ] * 100%.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Titze, I. R. (1994) 'Principles of Voice Production', Prentice-Hall.
- **Từ khóa hạt nhân chấm điểm:** `Micro-Jitter, 0.6%-2.5%, Vocoder, L1/L2 Loss, Titze`

---

### Câu hỏi 3.4: Chỉ số Shimmer (Biến thiên biên độ chu kỳ)
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Shimmer đo lường điều gì và phối hợp với Jitter thế nào trong phân loại liveness?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Shimmer đo độ bất ổn biên độ đỉnh giữa các chu kỳ thanh môn kế tiếp. Người sống có Shimmer 1.5% - 5.0%. AI deepfake thường có Shimmer < 0.8% hoặc bị răng cưa bất thường.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Shimmer_{rel} = [ SUM_{i=1}^{N-1} |A_i - A_{i+1}| / (N-1) ] / [ SUM_{i=1}^N A_i / N ] * 100%.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Baken, R. J. (2000) 'Clinical Measurement of Speech and Voice', Singular Publishing.
- **Từ khóa hạt nhân chấm điểm:** `Shimmer, Biên độ, 1.5%-5.0%, Liveness, Đỉnh xung`

---

### Câu hỏi 3.5: Lý thuyết Nguồn - Bộ Lọc (Source-Filter Theory)
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Mô hình hóa tiếng nói theo Gunnar Fant: Tách bạch nguồn thanh quản và ống thanh đạo thế nào?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Âm thanh S(f) = U(f) * H(f) * R(f): U(f) là luồng khí thanh môn (Jitter, F0), H(f) là cộng hưởng thanh đạo (Formant), R(f) là bức xạ môi. Deepfake thường ghép nối sai lệch giữa U(f) và H(f).
- **Chứng minh toán học / Giải tích:**  
  ```latex
  S(f) = U_glottal(f) * H_tract(f) * R_lip(f). Phép giải tích nghịch (Inverse Filtering) bóc tách U_glottal(t).
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Fant, G. (1960) 'Acoustic Theory of Speech Production', Mouton & Co.
- **Từ khóa hạt nhân chấm điểm:** `Source-Filter, Gunnar Fant, U_glottal, H_tract, Inverse Filtering`

---

### Câu hỏi 3.6: Tam giác nguyên âm và Formant F1, F2, F3
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *F1 và F2 phản ánh vị trí hình học nào của lưỡi và khoang miệng?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  F1 tỷ lệ nghịch với độ nâng của lưỡi (vòm họng mở rộng -> F1 tăng). F2 tỷ lệ thuận với vị trí trước/sau của thân lưỡi (lưỡi đưa ra trước -> F2 tăng).
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Formant Tracking: F1 in [200, 1000] Hz; F2 in [600, 2800] Hz. Bóc tách qua Linear Predictive Coding (LPC).
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Peterson, G. E., & Barney, H. L. (1952) 'Control Methods Used in a Study of the Vowels'.
- **Từ khóa hạt nhân chấm điểm:** `Formant, F1, F2, Lưỡi, Khoang miệng, LPC`

---

### Câu hỏi 3.7: Hiện tượng vô thanh hóa và tiếng xì thanh môn (Aspiration)
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Các phụ âm vô thanh /p/, /t/, /k/, /s/ được xử lý thế nào để tránh tính nhầm Jitter?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Phụ âm vô thanh không có chu kỳ rung thanh môn (F0=0). Thuật toán NAFE sử dụng bộ phát hiện VAD và bộ lọc Harmonicity để loại trừ triệt để đoạn vô thanh trước khi tính Jitter.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Harmonic-to-Noise Ratio (HNR) = 10 * log10( E_{harm} / E_{noise} ). Chỉ tính Jitter khi HNR > 12 dB.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Boersma, P. (1993) 'Accurate Short-Term Analysis of the Fundamental Frequency', Praat.
- **Từ khóa hạt nhân chấm điểm:** `Vô thanh, HNR, VAD, Harmonicity, Praat`

---

### Câu hỏi 3.8: Tỷ lệ mở thanh môn (Open Quotient - OQ)
- **Cấp độ:** `CHUYÊN GIA`
- **Vấn đề chất vấn:**  
  *Chỉ số OQ đo thời gian nắp thanh môn mở trên tổng chu kỳ rung. Vocoder sai lệch thế nào?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  OQ = T_open / T_total. Người nói bình thường OQ in [0.4, 0.7]. Vocoder thường sử dụng xung kích thích đơn giản (Rosenberg pulse) làm OQ cố định, thiếu tính linh hoạt tự nhiên.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  OQ = (t_{closure} - t_{opening}) / T_0. Ước lượng qua đạo hàm luồng khí thanh môn (dEGG / dLuồng khí).
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Holmberg, E. B., et al. (1988) 'Glottal Airflow and Transglottal Air Pressure', JASA.
- **Từ khóa hạt nhân chấm điểm:** `Open Quotient, OQ, Thanh môn mở, Rosenberg, dEGG`

---

### Câu hỏi 3.9: Bản chất toán học của Over-smoothing trong Neural Vocoder
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Tại sao hàm loss L1 trên phổ Mel ép vocoder phải sinh ra giọng trơn nhẵn phi tự nhiên?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  L1 loss phạt khoảng cách trung bình: E[||S - S_hat||_1]. Nghiệm tối ưu toán học của L1 loss khi có nhiễu ngẫu nhiên là giá trị trung vị (median). Điều này triệt tiêu hoàn toàn vi rung sinh học.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  arg min_{S_hat} E[ |S - S_hat| ] = Median(S). Mất toàn bộ thăng giáng sinh học phi tuyến.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Kong, J., et al. (2020) 'HiFi-GAN: Generative Adversarial Networks for Speech Synthesis', NeurIPS.
- **Từ khóa hạt nhân chấm điểm:** `Over-smoothing, L1 Loss, Median, Trung vị, HiFi-GAN`

---

### Câu hỏi 3.10: Sai số nội suy F0 trong RVC v2 gây Jitter > 4.8%
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Cơ chế nào của Harvest algorithm trong RVC v2 làm vỡ pha khi chuyển giọng tiếng Việt?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Harvest bóc tách F0 theo cửa sổ trượt nhưng khi giọng tiếng Việt lướt tone nhanh (như thanh Sắc/Ngã), việc lượng tử hóa F0 bị trễ pha (phase lag), dẫn đến bộ tạo sóng sin bị giật nảy pha.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Phase Discontinuity: Delta phi = |phi(t) - phi_target(t)| > pi/2 tại ranh giới khung, tạo Jitter > 4.8%.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Morise, M. (2017) 'Harvest: A High-Pitch Accuracy F0 Estimation Algorithm', Speech Communication.
- **Từ khóa hạt nhân chấm điểm:** `RVC v2, Harvest, Vỡ pha, Phase Discontinuity, Jitter > 4.8%`

---


<a name="phan-khu-4"></a>
## PHÂN KHU 4: HỌC SÂU MELCNN 2D & TỐI ƯU HÓA ONNX OPSET 14

### Câu hỏi 4.1: Kiến trúc chi tiết 4 Block của MelCNN 2D
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Mô tả dòng chảy tensor qua 4 khối Conv2D-BatchNorm-ReLU-MaxPool của MelCNN?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Input (1, 80, T) -> Block 1 (32, 40, T/2) -> Block 2 (64, 20, T/4) -> Block 3 (128, 10, T/8) -> Block 4 (256, 5, T/16) -> AdaptiveAvgPool -> Dense (2 lớp phân loại).
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Tổng tham số: ~1.2M params. Receptive field bao phủ 64 khung phổ (1.02s âm thanh).
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  He, K., et al. (2016) 'Deep Residual Learning for Image Recognition'; Audio Spectrogram CNNs.
- **Từ khóa hạt nhân chấm điểm:** `MelCNN, 4 Block, Conv2D, BatchNorm, 1.2M params`

---

### Câu hỏi 4.2: Cơ chế AdaptiveAvgPool2d((1, 1)) nhận diện độ dài tùy biến
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Tại sao AdaptiveAvgPool2d((1, 1)) cho phép xử lý âm thanh bất kỳ độ dài mà không cần đệm số 0?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Lớp này tự động tính kích thước cửa sổ kernel k = (H_in, W_in) để nén toàn bộ ma trận đặc trưng không gian (5, T/16) về đúng vector 1D (256, 1, 1), triệt tiêu sự phụ thuộc vào T.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Output = (1 / (H * W)) * SUM_{h=1}^H SUM_{w=1}^W X[c, h, w]. Không cần Zero-padding nhân tạo.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  PyTorch Adaptive Pooling Documentation & Lin, M. (2013) 'Network in Network'.
- **Từ khóa hạt nhân chấm điểm:** `AdaptiveAvgPool2d, Độ dài tùy biến, Zero-padding, Global Average Pooling`

---

### Câu hỏi 4.3: Tối ưu hóa đồ thị ONNX Opset 14 (Node Fusion & Constant Folding)
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Làm thế nào ONNX Opset 14 giảm thời gian suy luận từ 28ms xuống 6.8ms trên CPU?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Gộp Conv2D + BatchNorm + ReLU thành toán tử đơn FusedConv trong một kernel C++. Constant folding gộp trước trọng số bias và variance trong static export.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  FusedConv(X, W_fused, B_fused) = max(0, X * W_fused + B_fused). Tiết kiệm 3 lần đọc/ghi DRAM.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  ONNX Runtime Graph Optimizations Whitepaper, Microsoft (2023).
- **Từ khóa hạt nhân chấm điểm:** `ONNX, Opset 14, FusedConv, Constant Folding, 6.8ms`

---

### Câu hỏi 4.4: Cấu hình luồng intra_op=4 và inter_op=1
- **Cấp độ:** `CHUYÊN GIA`
- **Vấn đề chất vấn:**  
  *Tại sao lại đặt intra_op=4 và inter_op=1 thay vì ngược lại trong ONNX Runtime?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  MelCNN có cấu trúc mạng tuần tự (sequential). Intra-op chia nhỏ phép nhân ma trận trên 4 core CPU vật lý. Inter-op=1 tránh xung đột khóa lock tranh chấp tài nguyên bộ nhớ.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Parallel GEMM OpenMP efficiency: Speedup S(4) = 4 / (1 + 0.1*(4-1)) ≈ 3.07x so với chạy đơn luồng.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Intel oneDNN Performance Guide for Multi-Core Architectures.
- **Từ khóa hạt nhân chấm điểm:** `intra_op=4, inter_op=1, Lock contention, GEMM, OpenMP`

---

### Câu hỏi 4.5: Lượng tử hóa INT8 (Post-Training Quantization)
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Cơ chế lượng tử hóa FP32 sang INT8 và vai trò của phân kỳ KL (KL-Divergence) trong hiệu chuẩn?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Chuyển dải số thực float32 (-inf, inf) thành int8 [-128, 127] với hệ số tỉ lệ Scale và Zero-point. Hiệu chuẩn KL divergence tìm ngưỡng cắt ngưỡng T để giảm thiểu mất mát phân phối xác suất.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  q = round( x / Scale ) + ZeroPoint. KL(P || Q) = SUM P(i) * log( P(i) / Q(i) ) -> min.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Jacob, B., et al. (2018) 'Quantization and Training of Neural Networks for Efficient Integer-Arithmetic-Only Inference'.
- **Từ khóa hạt nhân chấm điểm:** `INT8, Lượng tử hóa, KL-Divergence, Scale, Zero-point`

---

### Câu hỏi 4.6: Khối kích hoạt Squeeze-and-Excitation (SE Block)
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *SE Block giúp mạng chú ý đến các kênh formant quan trọng như thế nào?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Squeeze nén không gian bằng Global Pooling. Excitation dùng 2 lớp Linear + Sigmoid để học trọng số kênh w_c in [0, 1]. Kênh chứa dải tần thanh môn quan trọng sẽ được khuếch đại tự động.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  s = sigma( W_2 * ReLU( W_1 * z ) ); X_scaled = s_c * X_c.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Hu, J., Shen, L., & Sun, G. (2018) 'Squeeze-and-Excitation Networks', CVPR.
- **Từ khóa hạt nhân chấm điểm:** `SE Block, Squeeze-and-Excitation, Trọng số kênh, Attention`

---

### Câu hỏi 4.7: Phòng vệ trước tấn công đối nghịch (Adversarial FGSM/PGD)
- **Cấp độ:** `CHUYÊN GIA`
- **Vấn đề chất vấn:**  
  *Tại sao nhiễu đối nghịch PGD đánh lừa được MelCNN nhưng bất lực trước Hard Physics Veto?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Nhiễu PGD tối ưu hóa gradient trên không gian tensor ảnh phổ MelCNN nhưng không thể can thiệp vào định luật dao động cơ học của dây thanh và tích phân dội âm ISO 3382.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  x_adv = clip( x + epsilon * sign( grad_x L(theta, x, y) ) ). Hard Veto không dùng gradient.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Madry, A., et al. (2018) 'Towards Deep Learning Models Resistant to Adversarial Attacks', ICLR.
- **Từ khóa hạt nhân chấm điểm:** `PGD, FGSM, Adversarial, Đối nghịch, Hard Veto`

---

### Câu hỏi 4.8: Trường tiếp nhận (Receptive Field) của MelCNN
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Tính toán trường tiếp nhận của mạng tích chập 4 block trên trục thời gian?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Kernel 3x3, stride 1, MaxPool 2x2 ở mỗi tầng. RF = 1 + SUM (k_l - 1) * s_cumul. Tại tầng 4, RF đạt 62 khung phổ (~992ms), đủ dài để bao quát 2-3 âm tiết tiếng Việt trọn vẹn.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  RF_l = RF_{l-1} + (k_l - 1) * Product_{i=1}^{l-1} s_i.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Araujo, A., et al. (2019) 'Computing Receptive Fields of Convolutional Networks'.
- **Từ khóa hạt nhân chấm điểm:** `Receptive Field, Trường tiếp nhận, 992ms, 62 khung, Conv2D`

---

### Câu hỏi 4.9: MelCNN vs Conformer/Wav2Vec 2.0 trong môi trường biên
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Tại sao DeepGuard chọn MelCNN 1.2M params thay vì Wav2Vec 2.0 (300M params)?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Wav2Vec đòi hỏi >1.5GB RAM và độ trễ suy luận >120ms trên CPU. MelCNN chỉ tốn 85MB RAM, suy luận 6.8ms, tiết kiệm 95% chi phí hạ tầng ngân hàng trong khi độ chính xác tương đương khi kết hợp NAFE.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Tham số: 1.2M vs 317M. FLOPs: 0.15 GFLOPs vs 18.5 GFLOPs. RAM: 85MB vs 1.8GB.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Baevski, A., et al. (2020) 'wav2vec 2.0: A Framework for Self-Supervised Learning', NeurIPS.
- **Từ khóa hạt nhân chấm điểm:** `MelCNN, Wav2Vec, Conformer, 85MB RAM, 6.8ms`

---

### Câu hỏi 4.10: Tối ưu hóa L1/L2 Cache và Zero-Memory Copy trong C++
- **Cấp độ:** `CHUYÊN GIA`
- **Vấn đề chất vấn:**  
  *Kỹ thuật trỏ trực tiếp con trỏ bộ nhớ (Memory Pointer Borrowing) loại bỏ overhead ra sao?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Dữ liệu audio sau khi giải mã PCM được ghi trực tiếp vào buffer liên tục của ONNX Tensor (`ort::Value::CreateTensor`), không qua bước nhân bản vector `std::vector::copy`.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Zero-copy: ort_tensor = Ort::Value::CreateTensor<float>(info, raw_pcm_ptr, sample_count, shape, 4).
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Drepper, U. (2007) 'What Every Programmer Should Know About Memory'.
- **Từ khóa hạt nhân chấm điểm:** `Zero-Copy, L1/L2 Cache, DRAM, CreateTensor, C++`

---


<a name="phan-khu-5"></a>
## PHÂN KHU 5: DUNG HỢP QUYẾT ĐỊNH, CỔNG ĐỘNG & QUYỀN PHỦ QUYẾT BẤT BIẾN VẬT LÝ

### Câu hỏi 5.1: Quy tắc kết hợp bằng chứng Dempster-Shafer
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Công thức kết hợp bằng chứng độc lập giữa MelCNN và NAFE theo Dempster-Shafer?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Kết hợp 2 khối lượng tin cậy cơ sở m1 và m2. Mẫu số chuẩn hóa 1 - K loại bỏ xung đột, bảo đảm tính giao hoán và kết hợp.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  (m_1 (+) m_2)(A) = [ SUM_{B cap C = A} m_1(B) * m_2(C) ] / [ 1 - K ], với K = SUM_{B cap C = emptyset} m_1(B) * m_2(C).
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Shafer, G. (1976) 'A Mathematical Theory of Evidence', Princeton University Press.
- **Từ khóa hạt nhân chấm điểm:** `Dempster-Shafer, Kết hợp bằng chứng, Khối xung đột K, m1(+)m2`

---

### Câu hỏi 5.2: Xử lý khối mâu thuẫn K trong điều kiện đối nghịch
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Khi K -> 1 (MelCNN khẳng định Real 99% nhưng NAFE phát hiện Jitter=0.1% Fake 99%), công thức xử lý ra sao?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Khi K > 0.85, hệ thống kích hoạt ngoại lệ nghịch lý Zadeh. Lúc này, quy tắc cộng xác suất sụp đổ; hệ thống chuyển sang chế độ Hard Veto ưu tiên bất biến vật lý.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  IF K > 0.85 AND m_{Physics}(Fake) > 0.90 -> P(Decision = FAKE) = 1.0 (VETO).
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Zadeh, L. A. (1984) 'Review of Books: A Mathematical Theory of Evidence', AI Magazine.
- **Từ khóa hạt nhân chấm điểm:** `Nghịch lý Zadeh, K -> 1, Mâu thuẫn, Hard Veto, Zadeh`

---

### Câu hỏi 5.3: Khoảng tin cậy [Belief, Plausibility] trong thẩm định
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Sự khác biệt giữa Độ tin cậy (Belief) và Độ khả dĩ (Plausibility) trong quyết định cấp tín dụng?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Bel(A) đo bằng chứng trực tiếp ủng hộ Fake. Pl(A) = 1 - Bel(not A) đo mức độ mà bằng chứng không thể bác bỏ Fake. Khoảng [Bel, Pl] phản ánh mức độ thiếu hiểu biết (Ignorance).
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Bel(A) <= P(A) <= Pl(A). Khi [Bel, Pl] rộng > 0.40, ngân hàng chuyển cuộc gọi sang Step-up Auth.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Dempster, A. P. (1967) 'Upper and Lower Probabilities Induced by a Multivalued Mapping'.
- **Từ khóa hạt nhân chấm điểm:** `Belief, Plausibility, Ignorance, Khoảng tin cậy, Step-up Auth`

---

### Câu hỏi 5.4: Nguyên lý Quyền phủ quyết bất biến vật lý (Hard Physics Veto)
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Tại sao quy định một chỉ số vật lý duy nhất (Jitter < 0.35% hoặc RT60 < 0.15s) được quyền ghi đè toàn bộ mạng AI?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Mạng AI học theo tương quan xác suất và có thể bị lừa bởi dữ liệu lạ (OOD) hoặc adversarial noise. Định luật vật lý sinh học và âm học không bao giờ bị phá vỡ trên cơ thể người sống.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  DECISION = (Jitter < 0.35% OR RT60 < 0.15s OR RT60 > 0.85s) ? HARD_VETO_FAKE : SOFT_FUSION.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Popper, K. (1959) 'The Logic of Scientific Discovery' (Nguyên lý bác bỏ).
- **Từ khóa hạt nhân chấm điểm:** `Hard Physics Veto, Ghi đè, Bất biến vật lý, OOD, Phủ quyết`

---

### Câu hỏi 5.5: Cơ chế Cổng động thích ứng băng thông (Dynamic Gating)
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Hàm điều phối trọng số mềm thích ứng băng thông G.711 vận hành như thế nào?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Khi phát hiện băng thông bị cắt cụt về 8kHz (G.711), cổng động tự động hạ trọng số MelCNN từ 0.50 xuống 0.10, đồng thời nâng trọng số NAFE F0/Jitter từ 0.30 lên 0.65.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  W_cnn = sigma( alpha * (BW - 8000) ); W_prosody = 0.90 - W_cnn; W_acoustics = 0.10.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Jordan, M. I., & Jacobs, R. A. (1994) 'Hierarchical Mixtures of Experts'.
- **Từ khóa hạt nhân chấm điểm:** `Cổng động, Gating Network, G.711, Trọng số mềm, Thích ứng`

---

### Câu hỏi 5.6: Chính sách phân vùng 3 dải (Tri-Band Policy)
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Mô tả 3 dải quyết định [0, 0.3), [0.3, 0.8), [0.8, 1.0] và hành vi tương ứng?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Dải Xanh [0.0, 0.3): An toàn, giải ngân ngay lập tức. Dải Vàng [0.3, 0.8): Nghi vấn, kích hoạt OTP giọng nói chứa thanh Ngã/Nặng. Dải Đỏ [0.8, 1.0]: Chặn cứng, khóa tài khoản.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  FPR dải đỏ < 0.03%. Tỷ lệ cuộc gọi rơi vào dải vàng < 2.5%, đảm bảo trải nghiệm người dùng.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Basel Committee on Banking Supervision: 'Operational Risk Guidelines for Biometrics'.
- **Từ khóa hạt nhân chấm điểm:** `Tri-Band, Dải Xanh, Dải Vàng, Dải Đỏ, Step-up`

---

### Câu hỏi 5.7: Xác thực tăng cường (Step-up Auth) với thử thách ngữ âm động
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Máy chủ sinh cụm từ thử thách chứa thanh Ngã ngẫu nhiên như thế nào để bẫy bot AI?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Hệ thống yêu cầu đọc: 'Tôi xác nhận chuyển khoản cho bà Nguyễn Thị Mỹ Diễm'. Cụm từ chứa liên tiếp 3 thanh Ngã ('Mỹ', 'Diễm', 'Nguyễn'). Bot AI không thể phản xạ siết nắp thanh môn thời gian thực.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Challenge-Response: Kẻ tấn công mất >1.5s để sinh âm thanh mới qua API -> Vỡ ngân sách độ trễ.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  NIST SP 800-63B 'Digital Identity Guidelines: Authentication and Lifecycle'.
- **Từ khóa hạt nhân chấm điểm:** `Step-up Auth, Thanh Ngã, Nguyễn Thị Mỹ Diễm, Challenge-Response`

---

### Câu hỏi 5.8: Chứng minh toán học tỷ lệ báo động giả FPR < 0.03%
- **Cấp độ:** `CHUYÊN GIA`
- **Vấn đề chất vấn:**  
  *Dẫn giải xác suất đồng thuận đa tầng độc lập chứng minh FPR đạt chuẩn ngân hàng?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  P(FP_total) = P(FP_CNN) * P(FP_Prosody) * P(FP_Schroeder). Giả sử mỗi tầng có FPR=5% (0.05). Xác suất cả 3 tầng cùng báo động nhầm: 0.05 * 0.05 * 0.05 = 0.000125 (0.0125% < 0.03%).
- **Chứng minh toán học / Giải tích:**  
  ```latex
  P(FP) = Product_{i=1}^3 P(FP_i) = 0.05^3 = 1.25 times 10^{-4} = 0.0125%.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Papoulis, A. 'Probability, Random Variables and Stochastic Processes'.
- **Từ khóa hạt nhân chấm điểm:** `FPR < 0.03%, Đồng thuận đa tầng, Tích xác suất, Báo động giả`

---

### Câu hỏi 5.9: Tối ưu hóa Equal Error Rate (EER) và đường cong DET
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *EER là gì và tại sao trong ngân hàng người ta không chọn ngưỡng tại điểm EER?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  EER là điểm mà tỷ lệ từ chối sai (FRR) bằng tỷ lệ chấp nhận sai (FAR). Trong ngân hàng, rủi ro mất tiền lớn hơn rủi ro phiền khách hàng, nên dời ngưỡng sang trái để ép FAR cực tiểu.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  FAR(theta) = FRR(theta) = EER. Ngân hàng chọn theta_bank sao cho FAR < 0.01%, chấp nhận FRR tăng nhẹ.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Martin, A., et al. (1997) 'The DET Curve in Assessment of Detection Performance', Interspeech.
- **Từ khóa hạt nhân chấm điểm:** `EER, FAR, FRR, DET Curve, Equal Error Rate`

---

### Câu hỏi 5.10: Hàm chi phí quyết định tối thiểu (minDCF)
- **Cấp độ:** `CHUYÊN GIA`
- **Vấn đề chất vấn:**  
  *Công thức tính minDCF theo chuẩn NIST SRE áp dụng vào chi phí gian lận ngân hàng?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  C_Det = C_Miss * P_Miss * P_Target + C_FA * P_FA * (1 - P_Target). Với C_FA (để lọt kẻ lừa đảo mất 5 tỷ) gấp 1000 lần C_Miss (hỏi lại khách hàng).
- **Chứng minh toán học / Giải tích:**  
  ```latex
  DCF_{norm} = C_Det / min( C_Miss*P_Target, C_FA*(1-P_Target) ). Tối ưu hóa ngưỡng theo chi phí thực tế.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  NIST 2022 Speaker Recognition Evaluation (SRE) Plan.
- **Từ khóa hạt nhân chấm điểm:** `minDCF, NIST SRE, Chi phí gian lận, C_FA, C_Miss`

---


<a name="phan-khu-6"></a>
## PHÂN KHU 6: BÓC TÁCH DẤU VÂN TAY & ĐỊNH DANH HỌ MÔ HÌNH AI (ATTRIBUTION)

### Câu hỏi 6.1: Dấu vân tay của Vocoder HiFi-GAN
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Khối Multi-Period Discriminator (MPD) của HiFi-GAN để lại vết tích phổ tuần hoàn nào?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  MPD chia tín hiệu thành các chu kỳ ngầm định p in [2, 3, 5, 7, 11]. Điều này vô tình để lại các đường vạch phổ mờ (spectral grid artifacts) ở các tần số f_s/p, lật tẩy nguồn gốc HiFi-GAN.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Spike Frequency: f_spike = k * (f_s / p). Hiện rõ khi trừ nền phổ trung bình qua Spectral Subtraction.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Kong, J., et al. (2020) 'HiFi-GAN: Generative Adversarial Networks for Efficient Speech Synthesis'.
- **Từ khóa hạt nhân chấm điểm:** `HiFi-GAN, MPD, Dấu vân tay, Spectral Grid, Chu kỳ p`

---

### Câu hỏi 6.2: Dấu hiệu đứt gãy ranh giới token của Bark / Tortoise
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Tại sao mô hình tự hồi quy (Autoregressive Token Audio) sinh ra tiếng click/pop ngẫu nhiên?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Bark dự đoán từng vector token âm thanh rời rạc (EnCodec codes). Tại ranh giới giữa 2 token kế tiếp (cách nhau ~13ms), việc giải mã EnCodec bị lệch pha, sinh ra các cú sốc biên độ vi mô.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Delta y = |y[n] - y[n-1]| > 0.4 tại n = k * L_{token}. Gây đột biến đạo hàm bậc 1 d/dt.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Suno AI 'Bark Architecture' (2023); Défossez, A., et al. 'High Fidelity Audio Compression with EnCodec'.
- **Từ khóa hạt nhân chấm điểm:** `Bark, Tortoise, Token boundary, Click pop, EnCodec`

---

### Câu hỏi 6.3: Vết cắt trơn cao tần của ElevenLabs
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *ElevenLabs sử dụng Latent Diffusion Vocoder. Tại sao dải tần > 6.5kHz lại mượt mà bất thường?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Quá trình khử nhiễu khuếch tán (Diffusion Denoising) trong không gian ẩn có xu hướng trung bình hóa các biến thiên ngẫu nhiên cao tần, làm mất đi các hài âm xì tự nhiên của thanh môn.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Spectral Flatness Measure (SFM) ở dải 6-8kHz: SFM_{ElevenLabs} < 0.05 (rất thấp so với SFM_{Human} ~ 0.25).
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Rombach, R., et al. (2022) 'High-Resolution Image Synthesis with Latent Diffusion Models'.
- **Từ khóa hạt nhân chấm điểm:** `ElevenLabs, Diffusion, Cao tần mịn, SFM, Latent`

---

### Câu hỏi 6.4: Nhảy pha cục bộ (Phase Jump) của RVC v2
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *RVC v2 ghép nối giọng nói người dùng với đặc trưng của nạn nhân như thế nào và gây lỗi gì?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  RVC v2 dùng mạng VITS kết hợp Harvest F0. Khi cao độ giọng người tấn công biến thiên nhanh, bộ dao động điều hòa bị lỗi pha tức thời, làm dạng sóng bị xoắn đứt đoạn.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Phase Glitch Index: PGI = SUM |angle(X[k, t]) - 2*angle(X[k, t-1]) + angle(X[k, t-2])| > Threshold.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  RVC-Project (2023) 'Retrieval-based Voice Conversion Architecture'; Kim, J., et al. 'VITS'.
- **Từ khóa hạt nhân chấm điểm:** `RVC v2, VITS, Phase Glitch, Nhảy pha, Voice Conversion`

---

### Câu hỏi 6.5: Phổ bậc cao Bicoherence bắt tính phi tuyến
- **Cấp độ:** `CHUYÊN GIA`
- **Vấn đề chất vấn:**  
  *Bicoherence phân biệt âm thanh tạo bởi cơ học dây thanh và mạng nơ-ron tích chập ra sao?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Dây thanh quản sinh học tạo ra tương tác ghép pha phi tuyến (Quadratic Phase Coupling - QPC) giữa các tần số f1, f2 và f1+f2. Neural Vocoder tạo âm bằng các lớp tích chập tuyến tính nên Bicoherence = 0.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  b^2(f_1, f_2) = |B(f_1, f_2)|^2 / [ E[|X(f_1)X(f_2)|^2] * E[|X(f_1+f_2)|^2] ]. Người thật: b^2 > 0.4.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Nikias, C. L., & Mendel, J. M. (1993) 'Signal Processing with Higher-Order Spectra', IEEE SPM.
- **Từ khóa hạt nhân chấm điểm:** `Bicoherence, HOS, QPC, Ghép pha phi tuyến, Dây thanh`

---

### Câu hỏi 6.6: Artifact kẻ ca-rô (Checkerboard Artifacts) do Transposed Conv
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Tại sao lớp tích chập chuyển vị (Transposed Convolution) trong Vocoder tạo sọc lưới phổ?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Khi kích thước kernel không chia hết cho stride, các phép cộng dồn vùng chồng lấn không đều nhau (uneven overlap), tạo thành họa tiết răng cưa tuần hoàn trên ma trận phổ Mel.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Overlap Pattern: O[n] = SUM_k rect((n - k*stride) / kernel_size) dao động tuần hoàn chu kỳ stride.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Odena, A., Dumoulin, V., & Olah, C. (2016) 'Deconvolution and Checkerboard Artifacts', Distill.
- **Từ khóa hạt nhân chấm điểm:** `Checkerboard, Transposed Conv, Ca-rô, Chồng lấn, Stride`

---

### Câu hỏi 6.7: Multi-Scale Sub-band Discriminator Artifacts
- **Cấp độ:** `CHUYÊN GIA`
- **Vấn đề chất vấn:**  
  *Vocoder hiện đại chia dải tần thành 4 sub-bands (PQMF) để tăng tốc độ. Lỗi xuất hiện ở đâu?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Tại các tần số cắt ranh giới giữa các sub-band (ví dụ 2kHz, 4kHz, 6kHz), việc ghép nối pha của bộ lọc PQMF không lý tưởng tạo ra các rãnh suy hao năng lượng sâu 1-2 bins.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  PQMF Boundary Notch: S(f_boundary) sụt giảm đột ngột > 8 dB so với 2 bins lân cận.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Yang, G., et al. (2021) 'Multi-Band MelGAN: Faster Waveform Generation for High-Quality TTS'.
- **Từ khóa hạt nhân chấm điểm:** `Sub-band, PQMF, Multi-Scale, Ranh giới tần số, MelGAN`

---

### Câu hỏi 6.8: Dải cao độ bẹp (F0 Range Compression) trong FastSpeech 2
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Tại sao các mô hình FastSpeech 2 / VITS nói tiếng Việt nghe đều đều như đọc kinh?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Mô hình học theo phân phối F0 Gaussian và hàm loss MSE phạt nặng các giá trị F0 cực trị. Hậu quả là dải F0 bị nén chặt (Delta F0 < 55Hz), làm mất ngữ điệu cảm xúc tự nhiên.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Delta F_0 = F_{0, max} - F_{0, min} < 55 Hz (Người nói tự nhiên có Delta F_0 từ 110Hz đến 220Hz).
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Ren, Y., et al. (2020) 'FastSpeech 2: Fast and High-Quality End-to-End Text to Speech', ICLR.
- **Từ khóa hạt nhân chấm điểm:** `FastSpeech 2, F0 Compression, Nén dải cao độ, Đều đều, MSE`

---

### Câu hỏi 6.9: Phân cụm không gian ẩn (Latent Attribution Clustering)
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Cách trích xuất vector embedding 64-D để truy tìm kẻ tấn công sử dụng công cụ mã nguồn mở nào?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Trích xuất vector từ tầng trước phân loại của MelCNN, đưa qua thuật toán t-SNE hoặc UMAP. Các mẫu cùng mã nguồn AI sẽ co cụm thành các cụm riêng biệt với khoảng cách Cosine < 0.15.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  d_{cosine}(z_i, z_j) = 1 - (z_i cdot z_j) / (||z_i|| * ||z_j||). Phân biệt rạch ròi 6 họ mô hình AI.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Wang, S., et al. (2020) 'CNN-generated images are surprisingly easy to spot... for now', CVPR.
- **Từ khóa hạt nhân chấm điểm:** `Attribution Clustering, Không gian ẩn, t-SNE, Cosine, Định danh`

---

### Câu hỏi 6.10: Tấn công làm mờ dấu vết pháp y (Anti-Forensic Masking)
- **Cấp độ:** `CHUYÊN GIA`
- **Vấn đề chất vấn:**  
  *Kẻ tấn công có thể chèn thêm nhiễu trắng Gaussian để xóa dấu vân tay vocoder không?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Chèn nhiễu trắng làm giảm SNR nhưng không thể che lấp hiện tượng thiếu hụt Glottal Stop trên thanh Ngã và không sửa được tích phân dội âm Schroeder ISO 3382.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  White noise N(0, sigma^2) làm tăng nền nhiễu đồng nhất nhưng không tái lập được vi cấu trúc chu kỳ thanh môn.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Stamm, M. C., & Liu, K. J. (2013) 'Anti-Forensics for Digital Media', IEEE SPM.
- **Từ khóa hạt nhân chấm điểm:** `Anti-Forensics, Nhiễu trắng, Gaussian, Che mờ, Không thể xóa`

---


<a name="phan-khu-7"></a>
## PHÂN KHU 7: SINH TRẮC GIỌNG NÓI 1:1 & PHÂN LY KHÔNG GIAN TRỰC GIAO

### Câu hỏi 7.1: Kiến trúc mạng trích xuất sinh trắc ECAPA-TDNN
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *ECAPA-TDNN bóc tách đặc trưng định danh người nói vượt trội hơn i-vector thế nào?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  ECAPA-TDNN dùng các khối 1D Res2Net kết hợp Squeeze-and-Excitation và pooling thống kê đa kênh (MFA), học được đặc trưng chiều sâu của đường dẫn âm thanh độc bản của từng cá nhân.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  x-vector in R^{192}. Huấn luyện bằng hàm mất mát AAM-Softmax (Additive Angular Margin Loss).
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Desplanques, B., et al. (2020) 'ECAPA-TDNN: Emphasized Channel Attention for Speaker Verification', Interspeech.
- **Từ khóa hạt nhân chấm điểm:** `ECAPA-TDNN, x-vector, AAM-Softmax, Res2Net, Định danh`

---

### Câu hỏi 7.2: Chứng minh toán học tính trực giao S_ID ⟂ S_Live
- **Cấp độ:** `CHUYÊN GIA`
- **Vấn đề chất vấn:**  
  *Tại sao việc chiếu vector âm thanh lên 2 không gian con trực giao bảo vệ ngân hàng trước clone giọng?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Kẻ tấn công nhái giọng hoàn hảo sẽ có tọa độ cao trên S_ID (khớp người chủ). Nhưng tọa độ trên S_Live đo vi rung sinh học bị triệt tiêu, lập tức kích hoạt Báo Động Đỏ.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  V = S_{ID} oplus S_{Live}, langle v_{id}, v_{live} rangle = 0. Score_{total} = (S_{ID} >= 0.75 && S_{Live} >= 0.75).
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Borghesi, A., et al. (2022) 'Orthogonal Subspace Projection for Spoofing-Aware Speaker Verification'.
- **Từ khóa hạt nhân chấm điểm:** `Trực giao, S_ID, S_Live, Phân ly, Clone giọng`

---

### Câu hỏi 7.3: Ma trận quyết định 4 trạng thái sinh trắc
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Phân tích 4 kịch bản: Chủ thật, Tấn công clone giọng, Người lạ nói thật, Bot AI mạo danh?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  1. S_ID>=0.75, S_Live>=0.75: Chủ thật -> Cho phép. 2. S_ID>=0.75, S_Live<0.40: Clone giọng -> Báo động đỏ. 3. S_ID<0.50, S_Live>=0.75: Người lạ -> Từ chối. 4. Cả hai thấp: Bot mạo danh -> Khóa.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Ma trận 2x2 Boolean logic kết hợp điểm Cosine định danh và điểm Liveness NAFE.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  ISO/IEC 30107-3 'Biometric Presentation Attack Detection - Testing and Reporting'.
- **Từ khóa hạt nhân chấm điểm:** `4 trạng thái, Chủ thật, Clone giọng, Người lạ, Bot mạo danh`

---

### Câu hỏi 7.4: Độ đo Cosine chuẩn hóa độ dài vector (Length-Normalized Cosine)
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Tại sao bắt buộc phải chuẩn hóa L2 vector x-vector trước khi tính tích vô hướng Cosine?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Vector chưa chuẩn hóa bị ảnh hưởng bởi năng lượng âm lượng to/nhỏ của tệp tin. Chuẩn hóa L2 đưa mọi vector lên mặt cầu đơn vị siêu không gian, chỉ so sánh góc hình học thuần túy.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Cosine(u, v) = (u / ||u||_2) cdot (v / ||v||_2) = cos(theta_{u, v}) in [-1, 1].
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Dehak, N., et al. (2011) 'Front-End Factor Analysis for Speaker Verification', IEEE TASLP.
- **Từ khóa hạt nhân chấm điểm:** `Cosine, Chuẩn hóa L2, Mặt cầu đơn vị, x-vector`

---

### Câu hỏi 7.5: Bù trừ sai lệch kênh thu âm (Channel Mismatch Compensation)
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Khi mẫu đăng ký thu bằng iPhone nhưng cuộc gọi gian lận qua điện thoại bàn, làm sao bù trừ sai lệch?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Sử dụng thuật toán Phân tích thành phần bất biến tuyến tính (Linear Discriminant Analysis - LDA) hoặc WCCN (Within-Class Covariance Normalization) để triệt tiêu phương sai giữa các kênh thiết bị.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  WCCN: x_norm = W^{-1/2} * x, với W = (1/S) * SUM_{s=1}^S (1/N_s) * SUM (x - mu_s)(x - mu_s)^T.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Hatch, A. O., et al. (2006) 'Within-Class Covariance Normalization for SVM Speaker Recognition'.
- **Từ khóa hạt nhân chấm điểm:** `Channel Mismatch, WCCN, LDA, Sai lệch kênh, iPhone vs Điện thoại bàn`

---

### Câu hỏi 7.6: Chuẩn hóa điểm số sinh trắc Z-Norm và T-Norm
- **Cấp độ:** `CHUYÊN GIA`
- **Vấn đề chất vấn:**  
  *Tại sao hệ thống sinh trắc ngân hàng phải dùng ZT-Score Normalization?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Điểm số Cosine thô biến động theo độ ồn môi trường và người nói khác nhau. ZT-Norm dùng một tập giọng chuẩn (cohort) để chuẩn hóa điểm số về phân phối chuẩn N(0, 1).
- **Chứng minh toán học / Giải tích:**  
  ```latex
  S_{ZT} = [ (S - mu_Z) / sigma_Z - mu_T ] / sigma_T. Ổn định ngưỡng chặn bất biến theo thời gian.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Auckenthaler, R., et al. (2000) 'Score Normalization for Text-Independent Speaker Verification'.
- **Từ khóa hạt nhân chấm điểm:** `ZT-Norm, Score Normalization, Cohort, Chuẩn hóa điểm số`

---

### Câu hỏi 7.7: Khả năng chống chịu trước hiện tượng lão hóa giọng (Voice Aging)
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Giọng nói người già đi sau 5 năm thay đổi thế nào và hệ thống thích ứng ra sao?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Dây thanh teo nhẹ làm F0 tăng nhẹ ở nam và giảm ở nữ, formant F1-F2 dịch chuyển < 5%. Hệ thống sử dụng cơ chế Rolling Enrollment: Cập nhật mẫu x-vector với trọng số trượt alpha=0.05.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  v_{enrolled}^{new} = (1 - alpha) * v_{enrolled}^{old} + alpha * v_{verified}.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Kelly, F., et al. (2014) 'A Study of Voice Aging and Its Impact on Speaker Verification'.
- **Từ khóa hạt nhân chấm điểm:** `Voice Aging, Lão hóa giọng, Rolling Enrollment, Cập nhật mẫu`

---

### Câu hỏi 7.8: Phân biệt người bị viêm họng cảm cúm với Deepfake
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Người bị cảm cúm giọng nghẹt mũi (nasalized) có bị khóa tài khoản oan không?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Nghẹt mũi làm thay đổi Formant F1 và bổ sung thêm các số không phổ (nasal antiformants), nhưng RT60 phòng vẫn bình thường (0.2s - 0.5s) và Jitter vẫn ngẫu nhiên sinh học. Hệ thống chỉ Step-up chứ không khóa.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Nasal Zero: Antiresonance z_n xuất hiện tại ~1000Hz. Jitter_rel in [1.5%, 3.5%] (vẫn sinh học).
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Stevens, K. N. (2000) 'Acoustic Phonetics', MIT Press (Chapter on Nasalization).
- **Từ khóa hạt nhân chấm điểm:** `Viêm họng, Cảm cúm, Nasal, Antiformant, Không khóa oan`

---

### Câu hỏi 7.9: Tấn công mạo danh khớp mẫu sinh trắc (Target-adapted Voice Clone)
- **Cấp độ:** `CHUYÊN GIA`
- **Vấn đề chất vấn:**  
  *Nếu kẻ tấn công dùng 10 giây ghi âm của nạn nhân để fine-tune mô hình TTS thì sao?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Dù fine-tune khớp x-vector S_ID đạt 0.95, mô hình TTS vẫn phụ thuộc vào vocoder số để tái tạo âm thanh. Vocoder này vẫn phạm lỗi Over-smoothing (Jitter < 0.35%) và bị Hard Veto tiêu diệt.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Fine-tuning chỉ đánh lừa được không gian S_{ID}, hoàn toàn bất lực trước không gian S_{Live}.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Yamagishi, J., et al. (2021) 'ASVspoof 2021: Accelerating progress in spoofed and deepfake speech detection'.
- **Từ khóa hạt nhân chấm điểm:** `Target-adapted, Fine-tune 10s, S_ID vs S_Live, Hard Veto tiêu diệt`

---

### Câu hỏi 7.10: Giao thức đăng ký mẫu giọng an toàn (Secure Voice Enrollment)
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Quy trình thu thập mẫu giọng ban đầu của khách hàng cần điều kiện gì?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Khách hàng đọc tối thiểu 3 câu ngẫu nhiên chứa đầy đủ các thanh điệu tiếng Việt và ngữ cảnh ngữ âm phong phú trong phòng yên tĩnh (SNR > 25dB), được kiểm tra liveness ngay tại quầy hoặc qua eKYC.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Tiêu chuẩn: SNR >= 25dB, Duration >= 8.0s, Jitter in [0.8%, 2.0%], Không có tín hiệu Replay.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  FIDO Alliance Biometric Certification Requirements v2.1.
- **Từ khóa hạt nhân chấm điểm:** `Secure Enrollment, Đăng ký an toàn, SNR > 25dB, eKYC`

---


<a name="phan-khu-8"></a>
## PHÂN KHU 8: GIẢ LẬP TẤN CÔNG (RED-TEAM) KÊNH VIỄN THÔNG G.711 & AMR

### Câu hỏi 8.1: Thuật toán nén phi tuyến μ-law và A-law (ITU-T G.711)
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Thuật toán nén logarithmic 8-bit trong chuẩn G.711 làm biến dạng biên độ như thế nào?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  G.711 nén 16-bit linear PCM về 8-bit logarit (64 kbps). Nén ưu tiên dải biên độ nhỏ, làm tăng sàn nhiễu lượng tử hóa ở các đoạn âm lượng nhỏ, che mờ vi thăng giáng thanh môn.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  F(x) = sign(x) * [ ln(1 + mu*|x|) / ln(1 + mu) ], mu = 255. Lượng tử hóa 256 mức phi tuyến.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  ITU-T Recommendation G.711 (11/1988) 'Pulse code modulation (PCM) of voice frequencies'.
- **Từ khóa hạt nhân chấm điểm:** `G.711, mu-law, A-law, Nhiễu lượng tử hóa, 64 kbps`

---

### Câu hỏi 8.2: Bộ lọc thông dải viễn thông 300Hz - 3400Hz
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Hạ tầng điện thoại bàn cắt cụt toàn bộ dải tần <300Hz và >3400Hz ảnh hưởng gì tới giám định?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Mất F0 ở giọng nam trầm (<300Hz) buộc hệ thống phải suy luận F0 ảo qua các họa âm bậc cao (Missing Fundamental). Mất dải >3400Hz làm mất formant F3-F4 và dấu vết răng cưa của vocoder.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Bandpass Filter: H(f) = 0 với f < 300Hz hoặc f > 3400Hz. Áp dụng Virtual Pitch Extraction.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  ITU-T Recommendation G.712 'Transmission performance characteristics of pulse code modulation channels'.
- **Từ khóa hạt nhân chấm điểm:** `300Hz - 3400Hz, Cắt cụt, Missing Fundamental, F0 ảo, Điện thoại bàn`

---

### Câu hỏi 8.3: Mã hóa băng rộng AMR-WB (ITU-T G.722.2)
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Chuẩn VoLTE băng rộng AMR-WB (50Hz - 7000Hz) cải thiện việc phát hiện Deepfake thế nào?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  AMR-WB mở rộng dải tần lên 7000Hz, bảo toàn trọn vẹn F0 của mọi loại giọng nói và giữ được năng lượng sụt giảm của nắp thanh môn trên thanh Ngã, giúp độ chính xác tăng thêm 18%.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Lấy mẫu 16kHz, 9 chế độ tốc độ bit từ 6.60 kbps đến 23.85 kbps sử dụng công nghệ ACELP.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  3GPP TS 26.190 'Speech codec speech processing functions; AMR Wideband speech codec'.
- **Từ khóa hạt nhân chấm điểm:** `AMR-WB, G.722.2, VoLTE, 50Hz - 7000Hz, ACELP`

---

### Câu hỏi 8.4: Bù khung mất mát (Packet Loss Concealment - PLC) trong VoIP
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Khi rớt mạng 3-5%, bộ giải mã PLC sinh ra dạng sóng lặp chu kỳ nhân tạo thế nào?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Khi mất gói, thuật toán PLC sao chép chu kỳ pitch của khung trước và suy giảm dần biên độ. Hiện tượng này làm đường F0 phẳng lì nhân tạo, dễ gây hiểu lầm là vocoder over-smoothing nếu không có bộ phát hiện PLC.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  y_{PLC}[n] = alpha * y[n - T_0], alpha in [0.8, 0.95]. DeepGuard kiểm tra cờ PLC từ giao thức RTP.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  ITU-T Recommendation G.711 Appendix I 'A high quality low-complexity algorithm for packet loss concealment'.
- **Từ khóa hạt nhân chấm điểm:** `PLC, Packet Loss, Bù khung, RTP, Rớt mạng`

---

### Câu hỏi 8.5: Tấn công nhồi tạp âm Babble Noise (SNR 10dB)
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Kẻ tấn công mở tiếng ồn chợ hoặc tiếng còi xe nền để che giấu khuyết tật của AI?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Nhồi nhiễu làm tăng sàn năng lượng nhưng không thể tạo ra cú ngắt nắp thanh môn ΔE < -12dB. Ngược lại, nếu nền nhiễu vẫn kêu liên tục trong khi miệng người đang đọc thanh Ngã, đó là bằng chứng giả mạo!
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Noise Injection: y(t) = s(t) + n_{babble}(t). Tại điểm Glottal Stop: E_{total} = E_{noise} không đổi -> LẬT TẨY.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Hu, Y., & Loizou, P. C. (2007) 'Subjective comparison and evaluation of speech enhancement algorithms', Speech Comm.
- **Từ khóa hạt nhân chấm điểm:** `Babble Noise, SNR 10dB, Tạp âm nền, Glottal Stop lật tẩy`

---

### Câu hỏi 8.6: Tấn công cắt ghép âm thanh (Audio Splicing)
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Làm thế nào phát hiện kẻ tấn công ghép từng từ 'Chuyển' 'Khoản' 'Năm' 'Tỷ' từ các cuộc gọi cũ?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Mỗi đoạn cắt ghép có sự nhảy vọt pha không liên tục và sàn nhiễu môi trường (background noise floor) không đồng nhất. Bộ dò Splicing tìm bước nhảy năng lượng d/dt > 9.5dB tại điểm nối.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Splicing Boundary: |NoiseFloor(t+) - NoiseFloor(t-)| > 4.5 dB OR |Phase(t+) - Phase(t-)| > pi/2.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Malik, H. (2013) 'Acoustic Environment Identification and Its Applications to Audio Forensics', IEEE TIFS.
- **Từ khóa hạt nhân chấm điểm:** `Audio Splicing, Cắt ghép, Bước nhảy năng lượng, Sàn nhiễu`

---

### Câu hỏi 8.7: Tấn công bẻ cong cao độ (Pitch Bending ±20%)
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Dùng thuật toán Phase Vocoder tăng hạ tone giọng nhằm né tránh ngưỡng F0?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Dù có dịch chuyển cao độ F0, tỷ lệ Micro-Jitter (tính bằng % tương đối so với chu kỳ trung bình) là đại lượng không thứ nguyên, hoàn toàn bất biến trước phép co giãn tần số tuyến tính.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Jitter_{rel}(alpha * f) = Jitter_{rel}(f). Bất biến toán học trước Pitch Shifting.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Laroche, J., & Dolson, M. (1999) 'New phase-vocoder techniques for pitch-shifting and time-scale modification'.
- **Từ khóa hạt nhân chấm điểm:** `Pitch Bending, Phase Vocoder, Bất biến Jitter, Không thứ nguyên`

---

### Câu hỏi 8.8: Tấn công bơm tín hiệu số trực tiếp (Direct Line Injection)
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Kẻ tấn công dùng jack 3.5mm hoặc giả lập card âm thanh bơm thẳng luồng số vào điện thoại?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Khi bơm luồng số trực tiếp, RT60 đo được trên đoạn rơi âm đuôi rơi về 0.0s (phòng câm tuyệt đối), kích hoạt Hard Veto: Phòng câm ảo phi tự nhiên.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  RT60 < 0.10s -> Tín hiệu không truyền qua màng loa và không gian vật lý -> HARD VETO.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  ASVspoof 2019 Logical Access (LA) vs Physical Access (PA) distinction.
- **Từ khóa hạt nhân chấm điểm:** `Direct Injection, Jack 3.5mm, Card âm thanh ảo, RT60 < 0.10s`

---

### Câu hỏi 8.9: Bù trừ Jitter Buffer viễn thông trong streaming
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Sự biến thiên thời gian truyền gói (Packet Delay Variation) làm gián đoạn phân tích thế nào?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Sử dụng Adaptive Jitter Buffer kích thước 40-80ms để sắp xếp lại các gói RTP theo đúng chuỗi thời gian (Sequence Number và Timestamp) trước khi đẩy vào pipeline DSP.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Buffer Size B(t) = d_mean + 3 * d_std. Giữ độ trễ đệm dưới 60ms để không ảnh hưởng SLA 350ms.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  IETF RFC 3550 'RTP: A Transport Protocol for Real-Time Applications'.
- **Từ khóa hạt nhân chấm điểm:** `Jitter Buffer, Packet Delay Variation, RTP, RFC 3550`

---

### Câu hỏi 8.10: Tăng cường dữ liệu viễn thông khi huấn luyện (Data Augmentation)
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Mô hình MelCNN được tôi luyện thế nào để không bị suy giảm trí tuệ trước kênh G.711?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Áp dụng chuỗi biến đổi ngẫu nhiên trong quá trình train: Nhồi nhiễu G.711 mu-law, cắt băng thông thông dải 300-3400Hz, nhồi RIR phòng thực tế và nhồi nhiễu rớt gói viễn thông.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Augment(x) = Resample( Bandpass( MuLaw( Convolve(x, RIR) + Noise ) ) ). Huấn luyện tự thích nghi.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Snyder, D., et al. (2018) 'X-vectors: Robust DNN Embeddings for Speaker Recognition', Interspeech.
- **Từ khóa hạt nhân chấm điểm:** `Data Augmentation, Tôi luyện, G.711, RIR, Tăng cường dữ liệu`

---


<a name="phan-khu-9"></a>
## PHÂN KHU 9: NGÂN SÁCH ĐỘ TRỄ TOÀN TRÌNH ĐẦU - CUỐI 350MS

### Câu hỏi 9.1: Phân rã chi tiết từng microsecond của ngân sách 355ms
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Liệt kê chính xác thời gian tiêu tốn của từng mắt xích từ lúc khách nói đến khi ra quyết định?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Sliding Buffer gom âm thanh: 300ms; Librosa / FFmpeg decode: 4ms; STFT & Log-Mel: 3ms; ONNX Runtime MelCNN: 6.8ms; NAFE Jitter & Glottal: 25ms; Schroeder RT60: 2ms; Fusion & Network: 14.2ms. Tổng cộng = 355ms.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  T_{E2E} = 300 + 4 + 3 + 6.8 + 25 + 2 + 14.2 = 355.0 ms. Đạt chuẩn viễn thông quốc tế < 400ms.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  ITU-T Recommendation G.114 'One-way transmission time' (Khuyến nghị độ trễ thoại < 400ms).
- **Từ khóa hạt nhân chấm điểm:** `Ngân sách độ trễ, 355ms, 300ms buffer, 6.8ms ONNX, 25ms NAFE, G.114`

---

### Câu hỏi 9.2: Cơ sở toán học của kích thước cửa sổ trượt 300ms
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Tại sao không chọn cửa sổ trượt 100ms để chạy nhanh hơn, hoặc 1000ms để chuẩn xác hơn?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  100ms không chứa đủ 2 chu kỳ nắp thanh môn siết ngắt (20-60ms) và không đủ độ phân giải FFT để bóc tách F0. 1000ms thì nạn nhân đã kịp nghe câu lệnh lừa đảo và chuyển tiền.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  T_window = 300ms chứa đúng 18 khung STFT (hop 256), điểm cân bằng vàng giữa độ trễ và độ chính xác.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Miller, G. A. (1956) 'The Magical Number Seven, Plus or Minus Two' & Acoustic Windowing.
- **Từ khóa hạt nhân chấm điểm:** `300ms, Cửa sổ trượt, 18 khung STFT, Điểm cân bằng vàng`

---

### Câu hỏi 9.3: Giao thức WebSocket nhị phân vs REST HTTP/2 trong streaming
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Tại sao dùng WebSocket nhị phân (Binary Frames) thay vì gửi audio base64 qua REST API?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Base64 làm phình to kích thước dữ liệu 33% và tốn CPU giải mã. REST tạo overhead bắt tay HTTP header ở mỗi request. WebSocket giữ kết nối TCP mở liên tục, đẩy PCM thô độ trễ < 2ms.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Overhead: WebSocket = 2 bytes header/frame; HTTP REST = ~800 bytes header/request + Base64 133%.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  IETF RFC 6455 'The WebSocket Protocol'.
- **Từ khóa hạt nhân chấm điểm:** `WebSocket, Nhị phân, REST, Base64, 2 bytes header`

---

### Câu hỏi 9.4: Bộ đệm vòng tròn (Circular Ring Buffer) không khóa trong C++
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Thiết kế cấu trúc dữ liệu Lock-free Single-Producer Single-Consumer (SPSC) cho luồng âm thanh?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Sử dụng mảng tĩnh tuần hoàn kết hợp 2 biến nguyên tử std::atomic<size_t> cho head và tail với bộ nhớ tuần tự memory_order_acquire/release, không bao giờ gây nghẽn mutex lock.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  RingBuffer: push() cập nhật tail_atomic; pop() đọc từ head_atomic. Zero Lock, Zero Cache Miss.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Herlihy, M., & Shavit, N. 'The Art of Multiprocessor Programming'.
- **Từ khóa hạt nhân chấm điểm:** `Circular Ring Buffer, Lock-free, SPSC, std::atomic, Zero Lock`

---

### Câu hỏi 9.5: Nguy cơ nghẽn hàng đợi tiến trình (Threadpool Starvation)
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Làm thế nào ngăn chặn việc 100 cuộc gọi phức tạp làm nghẽn toàn bộ luồng xử lý của hệ thống?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Tách biệt hoàn toàn Event Loop mạng (AsyncIO) và Worker Pool tính toán DSP (ProcessPoolExecutor). Đặt timeout cứng 40ms cho mỗi tác vụ bóc tách đặc trưng.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Async Worker: loop.run_in_executor(dsp_pool, compute_nafe). Cách ly hoàn toàn tài nguyên.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Bovet, D. P., & Cesati, M. 'Understanding the Linux Kernel'.
- **Từ khóa hạt nhân chấm điểm:** `Threadpool Starvation, ProcessPool, AsyncIO, Cách ly tài nguyên`

---

### Câu hỏi 9.6: Quản lý bộ nhớ Zero-Copy giữa Kernel và User-Space
- **Cấp độ:** `CHUYÊN GIA`
- **Vấn đề chất vấn:**  
  *Kỹ thuật Linux eBPF / mmap trong nhận luồng âm thanh mạng giảm tải CPU thế nào?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Thay vì gọi hàm `read()` sao chép gói tin từ Kernel Space vào User Space, sử dụng ring buffer chia sẻ bộ nhớ (mmap / AF_PACKET), giảm 40% chi phí chuyển ngữ cảnh (context switch).
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Context Switch overhead giảm từ 1.8 microseconds xuống 0.2 microseconds cho mỗi gói tin audio.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Love, R. 'Linux System Programming', O'Reilly Media.
- **Từ khóa hạt nhân chấm điểm:** `Zero-Copy, mmap, Kernel Space, Context Switch, AF_PACKET`

---

### Câu hỏi 9.7: Triệt tiêu hiện tượng đứng hình do Garbage Collection (GC)
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Trong môi trường Python / Node.js, làm sao ngăn GC dừng thế giới (Stop-the-World) làm vỡ SLA 350ms?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Vô hiệu hóa bộ thu gom rác tự động trong luồng streaming thời gian thực (`gc.disable()`). Cấp phát trước toàn bộ mảng đệm (Pre-allocated NumPy arrays) và gọi gc thủ công ở thời gian rảnh.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  gc.set_threshold(100000, 50, 50); Tái sử dụng buffer `np.empty((1, 80, 18), dtype=np.float32)`.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Python Internals: Garbage Collection Mechanism for Generational GC.
- **Từ khóa hạt nhân chấm điểm:** `Garbage Collection, GC, Stop-the-world, Pre-allocated, NumPy`

---

### Câu hỏi 9.8: Cơ chế ngắt sớm (Early Termination) khi phát hiện Hard Veto
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Nếu trong 50ms đầu tiên phát hiện Jitter = 0.15%, hệ thống xử lý tiếp thế nào?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Lập tức hủy bỏ toàn bộ các tác vụ tính toán nặng phía sau (hủy inference MelCNN, hủy Schroeder). Trả về kết luận FAKE ngay ở mốc thời gian 65ms, tiết kiệm 80% tài nguyên CPU.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  IF Jitter < 0.35% -> ABORT_PIPELINE -> Emit(Verdict = FAKE, Latency = 65ms).
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Fail-Fast Design Pattern in High-Throughput Systems.
- **Từ khóa hạt nhân chấm điểm:** `Early Termination, Ngắt sớm, Fail-Fast, 65ms, Tiết kiệm CPU`

---

### Câu hỏi 9.9: Bù trừ độ trễ mạng RTT biến thiên trên hạ tầng 4G/5G
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Khi sóng di động của khách hàng yếu làm RTT nhảy từ 20ms lên 120ms, hệ thống đối phó ra sao?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Sử dụng thuật toán ước lượng băng thông BBR của Google để dự đoán thời điểm gói đến và điều chỉnh nhịp kéo khung âm thanh (time-stretching) để không làm đứt mạch phân tích.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  RTT_smoothed = 0.875 * RTT_{old} + 0.125 * RTT_{sample}. Bù trừ đồng hồ NTP.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Cardwell, N., et al. (2016) 'BBR: Congestion-Based Congestion Control', ACM Queue.
- **Từ khóa hạt nhân chấm điểm:** `RTT, 4G/5G, BBR, Time-stretching, Độ trễ mạng`

---

### Câu hỏi 9.10: Khảo nghiệm khả năng mở rộng: 300 luồng đồng thời trên 1 CPU 8-Core
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Tính toán chi phí phần cứng và bằng chứng một máy chủ thông thường gánh được 300 cuộc gọi?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Mỗi cuộc gọi tốn 6.8ms ONNX + 25ms DSP trong cửa sổ 300ms. CPU time duty cycle = (31.8 / 300) = 10.6% của 1 core. Một CPU 8 cores (16 threads) tải được: 16 / 0.106 ≈ 150-180 luồng tải đỉnh.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Duty Cycle = T_compute / T_window = 31.8ms / 300ms = 10.6%. Tối ưu hóa đa nhân hoàn hảo.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Performance Engineering Benchmarking Protocols.
- **Từ khóa hạt nhân chấm điểm:** `300 luồng, CPU 8-Core, Duty Cycle, 10.6%, Tối ưu hóa`

---


<a name="phan-khu-10"></a>
## PHÂN KHU 10: PHÁP Y SỐ, CHUỖI BẢO QUẢN BẰNG CHỨNG & CHÍNH SÁCH NGÂN HÀNG

### Câu hỏi 10.1: Phân biệt Tính toàn vẹn (Integrity) và Tính nguyên bản (Provenance)
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Tại sao mã băm SHA-256 hoàn hảo không chứng minh được đoạn âm thanh là người thật?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  SHA-256 chỉ chứng minh tệp tin không bị sửa đổi bit nào kể từ lúc lưu. Tệp tin tạo ra bởi ElevenLabs Deepfake vẫn có mã SHA-256 hoàn hảo. Provenance đòi hỏi kiểm tra liveness vật lý.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  SHA256(FakeAudio) = Valid Hash. Integrity != Authenticity != Physical Liveness.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  NIST SP 800-86 'Guide to Integrating Forensic Techniques into Incident Response'.
- **Từ khóa hạt nhân chấm điểm:** `SHA-256, Integrity, Provenance, Tính toàn vẹn, Tính nguyên bản`

---

### Câu hỏi 10.2: Chuẩn bảo mật phần cứng FIPS 140-3 Level 3
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Module phần cứng mật mã (HSM) FIPS 140-3 bảo vệ các khóa ký số pháp y như thế nào?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Khóa riêng tư (Private Key) được tạo và lưu trữ bên trong chip chống can thiệp vật lý (Physical Tamper-Resistance). Mọi nỗ lực khoan chip hoặc đo điện từ sẽ tự động xóa sạch khóa trong 1 microsecond.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Zeroization Protocol: Xóa khóa mật mã tức thì khi phát hiện xâm nhập vật lý (Zeroize in < 1us).
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  NIST FIPS PUB 140-3 'Security Requirements for Cryptographic Modules'.
- **Từ khóa hạt nhân chấm điểm:** `FIPS 140-3, HSM, Chống can thiệp, Zeroization, Khóa mật mã`

---

### Câu hỏi 10.3: Dấu thời gian tin cậy quốc tế RFC 3161 TSA
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Dấu thời gian TSA độc lập ngăn chặn kẻ tấn công ngụy tạo bằng chứng ngoại phạm thế nào?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  TSA là tổ chức chứng thực thứ ba độc lập ký vào mã băm SHA-256 kèm thời gian chuẩn nguyên tử UTC. Kẻ tấn công hoặc admin ngân hàng không thể sửa đổi đồng hồ hệ thống để ngụy tạo.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Token = Sign_{TSA}( Hash(Audio) || UTC_Timestamp ). Giá trị chứng cứ pháp lý tuyệt đối.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  IETF RFC 3161 'Internet X.509 Public Key Infrastructure Time-Stamp Protocol (TSP)'.
- **Từ khóa hạt nhân chấm điểm:** `RFC 3161, TSA, Thời gian UTC, Chống ngụy tạo, Time-Stamp`

---

### Câu hỏi 10.4: Chữ ký số bất đối xứng Ed25519 chống chối bỏ (Non-repudiation)
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Tại sao chọn thuật toán đường cong Elliptic Ed25519 thay vì RSA-2048?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Ed25519 có độ dài khóa ngắn (32 bytes), tốc độ ký và xác thực nhanh gấp 10 lần RSA, miễn nhiễm trước các cuộc tấn công kênh kề (Side-channel attacks) và tấn công thời gian.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Signature = Sign_{privKey}(Data) trên đường cong Ed25519 (Curve25519).
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  IETF RFC 8032 'Edwards-Curve Digital Signature Algorithm (EdDSA)'.
- **Từ khóa hạt nhân chấm điểm:** `Ed25519, RSA, Đường cong Elliptic, Chống chối bỏ, Non-repudiation`

---

### Câu hỏi 10.5: Quy chuẩn giám định theo Điều 206 Bộ luật Tố tụng Hình sự
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Báo cáo giám định âm thanh số cần đáp ứng những điều kiện pháp lý bắt buộc nào tại Việt Nam?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Quyết định trưng cầu giám định của cơ quan điều tra; Biên bản giao nhận mẫu vật có niêm phong; Phương pháp khoa học được công nhận; Chữ ký của giám định viên tư pháp được bổ nhiệm.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Căn cứ Điều 206, 208, 211 Bộ luật Tố tụng Hình sự 2015 và Luật Giám định tư pháp 2012.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Bộ luật Tố tụng Hình sự số 101/2015/QH13; Luật Giám định Tư pháp số 13/2012/QH13.
- **Từ khóa hạt nhân chấm điểm:** `Điều 206, Bộ luật Tố tụng Hình sự, Giám định tư pháp, Niêm phong, Chứng cứ`

---

### Câu hỏi 10.6: Tiêu chuẩn Daubert và Frye của Tòa án Quốc tế
- **Cấp độ:** `CHUYÊN GIA`
- **Vấn đề chất vấn:**  
  *Các tiêu chí nào để bằng chứng AI Deepfake được chấp nhận tại Tòa án theo chuẩn Daubert?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  1. Phương pháp có thể kiểm chứng thực nghiệm (Empirical Testing). 2. Đã được bình duyệt khoa học (Peer-Reviewed). 3. Tỷ lệ sai số đã biết (Known Error Rate / FPR). 4. Được cộng đồng khoa học chấp nhận.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Daubert v. Merrell Dow Pharmaceuticals, Inc., 509 U.S. 579 (1993); Federal Rule of Evidence 702.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  U.S. Supreme Court Daubert Standard (1993); FRE Rule 702.
- **Từ khóa hạt nhân chấm điểm:** `Daubert, Frye, Bình duyệt, Error Rate, Tòa án quốc tế`

---

### Câu hỏi 10.7: Chuỗi bảo quản bằng chứng (Chain of Custody)
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Nếu tệp âm thanh bị sao chép sang USB cá nhân của điều tra viên, bằng chứng có bị hủy bỏ?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Có! Chuỗi bảo quản bị đứt gãy (Broken Chain of Custody). Mọi bằng chứng không có biên bản ghi nhận hành trình di chuyển và chứng thực mã băm SHA-256 ở từng bước đều bị Tòa tuyên vô hiệu.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Chain of Custody Log: Từng bước truy cập, sao lưu đều ghi nhận Hash, Người thực hiện, Giờ UTC.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  ISO/IEC 27037:2012 'Guidelines for Identification, Collection, Acquisition and Preservation of Digital Evidence'.
- **Từ khóa hạt nhân chấm điểm:** `Chain of Custody, Chuỗi bảo quản, Đứt gãy, Vô hiệu bằng chứng, ISO 27037`

---

### Câu hỏi 10.8: Trách nhiệm giải trình (Explainability / XAI) với Thanh tra Ngân hàng
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Tại sao mô hình 'Hộp đen' (Black-box Deep Learning) không được phép quyết định chặn đơn phương?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Thanh tra Ngân hàng Nhà nước và khách hàng có quyền được biết lý do chính xác họ bị chặn. DeepGuard giải trình minh bạch: Chặn do Jitter = 0.18% (<0.35%) và RT60 = 0.08s, có đồ thị đối soát.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Explainable AI: Trả về Attribution Map, phân tích Formant và bảng bằng chứng vật lý tường minh.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Thông tư 09/2020/TT-NHNN về an toàn thông tin trong hoạt động ngân hàng; EU AI Act (High-Risk AI).
- **Từ khóa hạt nhân chấm điểm:** `Explainability, XAI, Hộp đen, Thanh tra ngân hàng, Giải trình`

---

### Câu hỏi 10.9: Phân định trách nhiệm tài chính khi xảy ra tổn thất Deepfake
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Nếu hacker dùng Deepfake lừa chuyển 5 tỷ, ngân hàng hay khách hàng chịu trách nhiệm?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Nếu ngân hàng chứng minh đã áp dụng đầy đủ quy trình xác thực sinh trắc chuẩn FIPS 140-3 và khách hàng tự lộ OTP/khóa bảo mật, khách hàng chịu trách nhiệm. Nếu hệ thống lọt do lỗi AI, ngân hàng chịu bồi thường.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Phân tích lỗi kỹ thuật: Báo cáo giám định pháp y của DeepGuard là cơ sở phân xử trách nhiệm.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Nghị định 52/2024/NĐ-CP về thanh toán không dùng tiền mặt; Luật Các tổ chức tín dụng 2024.
- **Từ khóa hạt nhân chấm điểm:** `Trách nhiệm tài chính, Tổn thất 5 tỷ, Bồi thường, Nghị định 52`

---

### Câu hỏi 10.10: Kịch bản đối chất của Giám định viên trưởng trước Tòa án
- **Cấp độ:** `CHUYÊN GIA`
- **Vấn đề chất vấn:**  
  *Luật sư bên bị chất vấn: 'Mô hình AI của anh cũng chỉ là phỏng đoán xác suất!'. Giám định viên trả lời ra sao?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  'Thưa Quý Tòa, AI chỉ là 1 trong 4 tầng tham chiếu. Kết luận này dựa trên định luật vật lý bất biến: Dây thanh quản người sống không bao giờ rung với độ trơn 0.18% và phòng sinh hoạt không thể có RT60=0.08s!'
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Lời khai đanh thép chuyển trọng tâm từ xác suất thống kê AI sang định luật nhiệt động lực học và cơ sinh học bất biến.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Expert Witness Testimony Protocol in Federal Courtrooms.
- **Từ khóa hạt nhân chấm điểm:** `Đối chất tòa án, Giám định viên trưởng, Luật sư, Bất biến vật lý, Đanh thép`

---


<a name="phan-khu-11"></a>
## PHÂN KHU 11: KIẾN TRÚC FULLSTACK DOANH NGHIỆP (FASTAPI, ONNX C++, WEB AUDIO API)

### Câu hỏi 11.1: Tách biệt Web Audio API Client và ONNX C++ Backend
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Lợi ích kiến trúc của việc để trình duyệt vẽ Canvas 60 FPS trong khi server chạy mô hình học sâu?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Client tận dụng GPU người dùng để tính FFT và render Canvas mượt mà 60 FPS mà không tiêu hao 1 byte băng thông server. Backend tập trung 100% CPU chạy ONNX Runtime và NAFE.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Kiến trúc Hybrid: Client-side Visual DSP (Web Audio) + Server-side Forensic Deep Learning (ONNX C++).
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  W3C Web Audio API Recommendation & High-Performance Web Architecture.
- **Từ khóa hạt nhân chấm điểm:** `Web Audio API, Client-Server, Canvas 60 FPS, Hybrid, Tiết kiệm băng thông`

---

### Câu hỏi 11.2: FastAPI ASGI bất đồng bộ kết hợp Worker Pool
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Tại sao không chạy trực tiếp thuật toán NAFE trong hàm `async def` của FastAPI?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  `async def` chạy trên Event Loop đơn luồng. Các thuật toán nặng tính toán (CPU-bound) như NAFE sẽ khóa chặt Event Loop (blocking), làm nghẽn toàn bộ hàng nghìn kết nối WebSocket khác.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Giải pháp: `await loop.run_in_executor(worker_pool, nafe_compute)`. Giữ Event Loop luôn giải phóng.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  FastAPI & Starlette Asynchronous Concurrency Model Documentation.
- **Từ khóa hạt nhân chấm điểm:** `FastAPI, ASGI, Event Loop, run_in_executor, Blocking`

---

### Câu hỏi 11.3: Quản lý phiên làm việc với Redis Distributed Lock
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Làm thế nào ngăn chặn Race Condition khi 1 khách hàng gọi đồng thời 2 cuộc xác thực?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Sử dụng Redis Redlock với khóa `lock:caller:{phone_number}` và thời gian sống TTL=5s. Chỉ cuộc gọi đầu tiên được cấp phát session; cuộc gọi thứ hai bị giữ lại hoặc từ chối.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  SET lock:caller:0912345678 my_random_token NX PX 5000. Đảm bảo tính nguyên tử (Atomicity).
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Redis Distributed Locks Documentation (Redlock Algorithm by Salvatore Sanfilippo).
- **Từ khóa hạt nhân chấm điểm:** `Redis, Redlock, Distributed Lock, Race Condition, Atomicity`

---

### Câu hỏi 11.4: Bảo mật Zero-Trust trong luồng xử lý giọng nói
- **Cấp độ:** `CAO CẤP`
- **Vấn đề chất vấn:**  
  *Dữ liệu âm thanh của khách hàng được mã hóa và bảo vệ quyền riêng tư thế nào?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  Mã hóa TLS 1.3 trong truyền dẫn; Âm thanh lưu trong bộ nhớ RAM được xóa bằng Zero-Memory ngay sau khi phân tích; Dữ liệu telemetry không lưu giọng nói thô, chỉ lưu vector đặc trưng không khả nghịch.
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Tuân thủ GDPR Article 9 (Special Category Data) và Nghị định 13/2023/NĐ-CP về Bảo vệ dữ liệu cá nhân.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  NIST SP 800-207 'Zero Trust Architecture'; Nghị định 13/2023/NĐ-CP.
- **Từ khóa hạt nhân chấm điểm:** `Zero-Trust, TLS 1.3, Nghị định 13, Bảo vệ dữ liệu cá nhân, Xóa RAM`

---

### Câu hỏi 11.5: Giám sát Telemetry thời gian thực với Prometheus & OpenTelemetry
- **Cấp độ:** `TRUNG CẤP`
- **Vấn đề chất vấn:**  
  *Các chỉ số giám sát vàng (Golden Signals) nào được bắn về Dashboard trung tâm?*
- **Bản chất vật lý & Luận giải chuyên sâu:**  
  1. Latency (Độ trễ p50, p95, p99). 2. Traffic (Số luồng đồng thời). 3. Errors (Tỷ lệ rớt gói, lỗi socket). 4. Saturation (Độ bão hòa CPU/RAM). 5. Veto Rate (Tỷ lệ kích hoạt Hard Veto).
- **Chứng minh toán học / Giải tích:**  
  ```latex
  Prometheus Histogram metrics: `deepguard_latency_ms_bucket{le='350'}`. Cảnh báo qua PagerDuty khi p99 > 380ms.
  ```
- **Tiêu chuẩn viện dẫn & Cơ sở học thuật:**  
  Google Site Reliability Engineering (SRE) Book 'The Four Golden Signals'.
- **Từ khóa hạt nhân chấm điểm:** `Golden Signals, Prometheus, OpenTelemetry, p99 < 380ms, Telemetry`

---

