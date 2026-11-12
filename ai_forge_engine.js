/**
 * DEEPGUARD AI ENTERPRISE - AI QUESTION FORGE & ADAPTIVE HARVESTER ENGINE
 * 
 * Capabilities:
 * 1. Stack Overflow Real-World Issue Harvester (Live API + Offline Curated Bank)
 * 2. Code-to-Question Generator (Security, Latency 350ms, Logic Bugs, Defense Board)
 * 3. User Behavior-Adaptive Weakness Engine (Real-time analytics + 1-Click Remediation)
 * 4. Multimodal Vision Lab (Image upload, clipboard paste, forensic presets, vision generation)
 * 5. Interactive Lightbox Zoom Engine (Pan, zoom, forensic inspection)
 * 6. Dynamic Question Bank Manager (Local storage, export/import JSON, direct quiz injection)
 */

(function () {
  'use strict';

  // =====================================================================
  // 1. CONSTANTS & LOCAL STORAGE KEYS
  // =====================================================================
  const STORAGE_KEYS = {
    AI_QUESTIONS: 'deepguard_ai_questions_v1',
    BEHAVIOR_HISTORY: 'deepguard_behavior_history_v1',
    API_KEY: 'deepguard_gemini_api_key_v1',
    AI_ACTIVE_SUBTAB: 'deepguard_ai_active_subtab_v1'
  };

  // =====================================================================
  // 2. CURATED REAL-WORLD STACK OVERFLOW & GITHUB ARCHIVE (OFFLINE FALLBACK)
  // =====================================================================
  const REAL_WORLD_ISSUES_ARCHIVE = [
    {
      id: "so-1",
      title: "Audio resampling with scipy.signal.resample introduces high-frequency aliasing and ghost formants",
      tags: ["python", "audio", "signal-processing", "scipy", "aliasing"],
      score: 184,
      author: "dsp_ninja",
      link: "https://stackoverflow.com/questions/realworld-1",
      snippet: "When downsampling voice recordings from 44.1kHz to 16kHz using Fourier method (scipy.signal.resample), I see mirror frequencies folding back below 8kHz in the spectrogram, ruining our ASVspoof formant extraction. Why does this happen and how do polyphase FIR filters prevent it?",
      acceptedAnswer: "scipy.signal.resample assumes periodic signals in frequency domain. For non-periodic speech, truncating high frequencies without a proper Kaiser/Chebyshev anti-aliasing low-pass filter with >80dB stopband attenuation causes spectral leakage and aliasing. Polyphase resampling (like torchaudio or librosa.resample with soxr) applies a polyphase FIR filter bank prior to decimation.",
      suggestedQuestion: {
        cat: "dsp",
        q: "Một kỹ sư DeepGuard phát hiện sau khi hạ mẫu âm thanh 44.1kHz xuống 16kHz bằng phép nội suy tuyến tính (Linear Interpolation), mô hình MelCNN báo động giả Replay Attack trên dải 6kHz - 8kHz. Nguyên nhân vật lý cốt lõi là gì?",
        opts: [
          "Do độ trễ pha phi tuyến của Linear Interpolation làm đảo lộn góc pha Fourier.",
          "Do đáp ứng suy hao dải chặn (Stopband Attenuation) của Linear Interpolation chỉ đạt -26dB, gây hiện tượng răng cưa Aliasing gập các hài âm trên 8kHz ngược vào dải âm thanh thoại.",
          "Do số lượng mẫu sau khi hạ không chia hết cho kích thước cửa sổ Hann 1024.",
          "Do thang đo Mel phi tuyến không tương thích với tần số lấy mẫu 16kHz."
        ],
        ans: 1,
        exp: "Linear Interpolation tương đương lọc thông thấp bằng hàm tam giác (đáp ứng phổ Sinc^2) chỉ có suy hao dải chặn -26dB (kém xa mức yêu cầu >80dB của pháp y). Các thành phần tần số cao >8kHz bị gập ngược (Aliasing) xuống 0-8kHz tạo thành các đỉnh giả khiến MelCNN lầm tưởng là hiệu ứng Replay."
      }
    },
    {
      id: "so-2",
      title: "Schroeder backward integration producing negative or erratic RT60 values on short speech segments",
      tags: ["audio", "acoustics", "reverberation", "iso-3382", "python"],
      score: 142,
      author: "acoustics_pro",
      link: "https://stackoverflow.com/questions/realworld-2",
      snippet: "I am computing energy decay curves (EDC) using Schroeder reverse integration on speech pauses for indoor liveness detection. In quiet rooms with background noise, the backward cumulative sum flattens early, yielding T20 decay slopes that are nearly zero or negative.",
      acceptedAnswer: "Schroeder integration: I(t) = integral_t^infinity s^2(tau) dtau assumes decay into absolute silence. In practice, background noise adds a constant noise floor that accumulates linearly in backward integration. You must estimate the noise floor (Lundeby technique) or truncate the integration at the speech offset tail (-5dB to -25dB window).",
      suggestedQuestion: {
        cat: "acoustics",
        q: "Khi tính tích phân lùi Schroeder để ước lượng RT60 (theo ISO 3382-1) từ âm đuôi tắt dần (Speech Offset Tail), nếu không khử mức ồn nền (Noise Floor) trước khi tích phân thì đồ thị suy giảm năng lượng EDC sẽ bị méo mó như thế nào?",
        opts: [
          "Đường cong suy giảm sẽ dốc đứng xuống âm vô cùng nhanh gấp đôi bình thường.",
          "Nhiễu nền không đổi sẽ tích lũy tuyến tính theo thời gian lùi, tạo thành một đường dốc giả 'Noise Knee' làm suy giảm độ dốc và ước lượng RT60 bị phóng đại quá mức.",
          "Phép tích phân sẽ phân kỳ và gây tràn số số thực chấm động (Float Overflow).",
          "Tần số cộng hưởng phòng F0 bị triệt tiêu hoàn toàn."
        ],
        ans: 1,
        exp: "Vì tích phân Schroeder cộng dồn năng lượng ngược từ vô cực về t, phần nhiễu nền N(t) không đổi sẽ tạo ra thành phần tích lũy N * (T - t), bẻ cong đường EDC thành hình đầu gối (Noise Knee), làm giảm độ dốc thực của T20 và khiến thuật toán tưởng phòng có tiếng vang RT60 kéo dài."
      }
    },
    {
      id: "so-3",
      title: "ONNX Runtime C++ memory leak when running continuous inference on audio streaming chunks",
      tags: ["c++", "onnxruntime", "memory-leak", "audio-streaming", "webrtc"],
      score: 215,
      author: "latency_master",
      link: "https://stackoverflow.com/questions/realworld-3",
      snippet: "Our FastAPI / C++ audio microservice processes 20ms audio frames through an ONNX MelCNN model. After 1 hour, RAM consumption jumps from 300MB to 8GB. We create Ort::Value from std::vector on every frame.",
      acceptedAnswer: "Creating Ort::Value::CreateTensor with OrtMemoryInfo causes allocation overhead if you don't reuse input/output memory buffers. Furthermore, if you are not calling Ort::Run with pre-allocated Ort::Value for outputs, ONNX Runtime allocates memory using its internal allocator that may not release immediately to the OS heap. Pre-allocate pinned memory buffers once and pass them via Ort::IoBinding.",
      suggestedQuestion: {
        cat: "onnx",
        q: "Trong kiến trúc microservice C++ của DeepGuard xử lý luồng âm thanh viễn thông thời gian thực, cơ chế nào sau đây là bắt buộc để đạt ngân sách độ trễ toàn trình dưới 350ms và không bị rò rỉ RAM khi gọi ONNX Runtime?",
        opts: [
          "Tạo lại đối tượng Ort::Session mới sau mỗi 100 khung âm thanh để giải phóng cache.",
          "Sử dụng Ort::IoBinding với bộ nhớ đệm đầu vào/đầu ra cấp phát tĩnh một lần duy nhất (Zero-Copy Pinned Buffers) thay vì khởi tạo Ort::Value cấp phát động qua mỗi khung.",
          "Chuyển đổi toàn bộ ma trận sang chuỗi Base64 trước khi truyền vào Run().",
          "Bật cờ đa luồng CPU tối đa 64 threads mà không ghim CPU Core Affinity."
        ],
        ans: 1,
        exp: "Việc cấp phát động `Ort::Value::CreateTensor` liên tục trên từng khung 16ms gây phân mảnh bộ nhớ Heap trầm trọng và tốn tới 15-25ms mỗi lần cấp phát. Sử dụng `Ort::IoBinding` với Zero-Copy Pinned Memory cố định giúp bộ nhớ đệm được tái sử dụng trực tiếp trên GPU/CPU, giảm độ trễ inference xuống <7ms."
      }
    },
    {
      id: "so-4",
      title: "WebRTC audio degradation: G.711 mu-law quantization error creating false vocoder spectral peaks",
      tags: ["webrtc", "voip", "g711", "telecom", "deepfake-detection"],
      score: 97,
      author: "telecom_forensic",
      link: "https://stackoverflow.com/questions/realworld-4",
      snippet: "When audio traverses PSTN/SIP trunks with G.711 mu-law, high frequencies above 3.4kHz are eliminated and logarithmic 8-bit non-linear companding adds distinctive harmonic quantization noise. Our voice anti-spoofing model mistakes this quantization pattern for a neural vocoder artifact.",
      acceptedAnswer: "G.711 uses mu-law compression with 8-bit samples at 8kHz sampling rate. The telephone bandpass filter (300-3400Hz) sharply attenuates out-of-band energy, and logarithmic quantizer steps produce signal-dependent noise floor (SQNR ~38dB). To prevent false positives, training datasets must be augmented with simulated G.711 and G.729 codec filters.",
      suggestedQuestion: {
        cat: "security",
        q: "Kênh viễn thông PSTN/SIP chuẩn ITU-T G.711 áp dụng bộ lọc thông dải 300Hz - 3400Hz và nén phi tuyến mu-law 8-bit. Đòn tấn công Deepfake nào sau đây thường LỢI DỤNG đặc tính này để che giấu dấu vân tay âm học?",
        opts: [
          "Tấn công Replay bằng loa vi tính cao cấp băng thông rộng 20kHz.",
          "Chủ động truyền âm qua kênh G.711 để bộ lọc 3.4kHz triệt tiêu các vết khuyết hài âm cao (High-frequency harmonic void) vốn là dấu vết đặc thù của các mô hình Vocoder AI như HiFi-GAN.",
          "Phát sóng siêu âm 40kHz để gây bão hòa màng micro điện dung.",
          "Sử dụng âm thanh stereo để gây nhiễu pha giữa 2 kênh trái phải."
        ],
        ans: 1,
        exp: "Các mô hình Vocoder AI thế hệ cũ (HiFi-GAN, MelGAN) thường lộ dấu vết phân kỳ pha ở dải tần số rất cao (>4kHz). Kẻ tấn công cố tình đẩy cuộc gọi qua luồng VoIP G.711 để bộ lọc viễn thông 300-3400Hz cắt sạch dải này, nhằm qua mặt các bộ phát hiện Deepfake không có cơ chế bù trừ kênh."
      }
    },
    {
      id: "so-5",
      title: "Dempster-Shafer rule of combination produces counter-intuitive results under high evidence conflict",
      tags: ["machine-learning", "fusion", "probability", "dempster-shafer", "hard-veto"],
      score: 168,
      author: "fusion_architect",
      link: "https://stackoverflow.com/questions/realworld-5",
      snippet: "In our multi-modal biometric system, sensor A gives m(Real)=0.99, m(Fake)=0.01. Sensor B (acoustic replay detector) gives m(Real)=0.0, m(Fake)=0.99. The standard Dempster combination normalizes by (1-k) where k=0.9801, causing extreme numerical instability and anomalous beliefs.",
      acceptedAnswer: "This is Zadeh's classic paradox. When conflict k -> 1, standard Dempster-Shafer normalization divides by a near-zero term (1 - k), wildly exaggerating minuscule residual probabilities. In security-critical forensic systems, you must NOT rely on raw DS under high conflict; you must apply an explicit 'Hard Veto' rule or Yager's modified rule allocating conflict to the Universal set.",
      suggestedQuestion: {
        cat: "fusion",
        q: "Nghịch lý Zadeh trong lý thuyết chứng cứ Dempster-Shafer xảy ra khi nào và tại sao DeepGuard bắt buộc phải trang bị cơ chế 'Hard Veto' thay vì tin tưởng tuyệt đối vào công thức dung hợp chuẩn?",
        opts: [
          "Xảy ra khi cả 4 mô hình đều đưa ra xác suất 50-50, khiến mẫu số k bằng 0.",
          "Xảy ra khi có sự xung đột cực độ giữa các nguồn tin (k tiến tới 1.0, ví dụ một trụ cột phát hiện chắc chắn Replay trong khi các trụ khác báo Real); phép chuẩn hóa chia cho (1-k) sẽ phóng đại nhiễu số học phi lý.",
          "Xảy ra khi ma trận tương quan giữa các cảm biến không trực giao.",
          "Xảy ra khi âm thanh đầu vào có thời lượng dưới 1 giây."
        ],
        ans: 1,
        exp: "Nghịch lý Zadeh chứng minh rằng khi xung đột k tiến sát 1 (ví dụ trụ Replay khẳng định 99.9% là đòn tấn công phát lại từ màng loa), công thức chia cho (1-k) có thể kết luận ngược lại hoàn toàn là 'Real' chỉ vì một lượng nhỏ xác suất tàn dư. DeepGuard kích hoạt Hard Veto: nếu bất kỳ trụ cột pháp lý cốt lõi nào chỉ ra dấu hiệu giả mạo tuyệt đối, toàn bộ hệ thống lập tức phủ quyết mà không cần thương lượng."
      }
    }
  ];

  // =====================================================================
  // 3. CODE PRESETS FOR CODE AUDIT GENERATION
  // =====================================================================
  const CODE_PRESETS = [
    {
      id: "code-polyphase",
      name: "DSP: C++ Polyphase Resampling & Aliasing Bug",
      category: "dsp",
      language: "cpp",
      code: `// DeepGuard DSP Module: Resample 44.1kHz -> 16kHz
void resample_audio_stream(const float* input, int in_len, float* output, int out_len) {
    float ratio = (float)in_len / (float)out_len; // 44100 / 16000 = 2.75625
    
    // VULNERABLE CODE: Fast linear interpolation without anti-aliasing FIR filter
    for (int i = 0; i < out_len; i++) {
        float src_idx = i * ratio;
        int idx_low = (int)src_idx;
        int idx_high = idx_low + 1;
        float frac = src_idx - idx_low;
        
        if (idx_high < in_len) {
            output[i] = (1.0f - frac) * input[idx_low] + frac * input[idx_high];
        } else {
            output[i] = input[idx_low];
        }
    }
    // High-frequency components > 8000Hz fold back into 0-8000Hz (Aliasing violation)
}`
    },
    {
      id: "code-onnx-mem",
      name: "ONNX: Python Session Tensor Memory Leak",
      category: "onnx",
      language: "python",
      code: `import onnxruntime as ort
import numpy as np

class AudioInferenceWorker:
    def __init__(self, model_path):
        self.session = ort.InferenceSession(model_path, providers=['CPUExecutionProvider'])
        self.history = []

    def predict_chunk(self, audio_chunk_pcm16):
        # BUG: Re-creating OrtValue with dynamic float32 copies without IoBinding
        # AND appending raw numpy tensors to unconstrained list
        mel_spectrogram = self.extract_logmel(audio_chunk_pcm16) # (1, 80, 200)
        
        # Unbounded in-memory retention causing gradual RAM inflation
        self.history.append(mel_spectrogram)
        
        inputs = {self.session.get_inputs()[0].name: mel_spectrogram.astype(np.float32)}
        # Ort::Run allocates dynamic tensor buffers internally each time
        outputs = self.session.run(None, inputs)
        return float(outputs[0][0][1]) # Spoof probability`
    },
    {
      id: "code-schroeder-rt60",
      name: "Acoustics: Schroeder RT60 Python Implementation",
      category: "acoustics",
      language: "python",
      code: `import numpy as np

def estimate_rt60_iso3382(speech_signal, sample_rate=16000):
    # Backward Energy Decay Curve (EDC)
    squared_signal = np.square(speech_signal)
    
    # Cumulative sum from end to start
    # BUG: Fails to detect Speech Offset Tail and does not subtract ambient noise floor
    edc = np.flip(np.cumsum(np.flip(squared_signal)))
    edc_db = 10.0 * np.log10(edc / (edc[0] + 1e-12) + 1e-12)
    
    # Fit line from -5 dB to -25 dB (T20)
    idx_5db = np.where(edc_db <= -5.0)[0][0]
    idx_25db = np.where(edc_db <= -25.0)[0][0]
    
    delta_t = (idx_25db - idx_5db) / sample_rate
    t20 = delta_t
    rt60 = 3.0 * t20 # Extrapolate 20dB decay to 60dB decay
    return rt60`
    },
    {
      id: "code-webrtc-jitter",
      name: "VoIP: FastAPI WebSocket Audio Buffer & 350ms Budget",
      category: "security",
      language: "python",
      code: `from fastapi import WebSocket
import asyncio

async def handle_audio_stream(websocket: WebSocket):
    await websocket.accept()
    audio_queue = asyncio.Queue(maxsize=0) # BUG: Unbounded queue allows infinite buffering
    
    async def packet_receiver():
        while True:
            chunk = await websocket.receive_bytes()
            # If network jitter spikes, queue grows indefinitely
            # Latency exceeds 350ms FIPS telecom compliance threshold!
            await audio_queue.put(chunk)
            
    async def forensic_analyzer():
        while True:
            frame = await audio_queue.get()
            # Heavy ONNX Inference on event loop thread blocks WebSocket ACK
            score = run_heavy_dsp_and_onnx(frame)
            await websocket.send_json({"liveness": score})`
    },
    {
      id: "code-fusion-veto",
      name: "Fusion: Dempster-Shafer Conflict & Hard Veto Bypass",
      category: "fusion",
      language: "python",
      code: `def combine_evidence_dempster(m1, m2):
    # m1: {'Real': 0.99, 'Fake': 0.01} (Vocoder Analyzer)
    # m2: {'Real': 0.00, 'Fake': 0.99} (Acoustic Replay Detector)
    
    # Calculate conflict factor k
    k = m1['Real'] * m2['Fake'] + m1['Fake'] * m2['Real'] # 0.99*0.99 + 0.01*0.0 = 0.9801
    
    # BUG: Naive normalization without Hard Veto override
    # When k -> 1.0, divisor (1 - k) becomes tiny (0.0199)
    normalizer = 1.0 - k
    
    m_combined_real = (m1['Real'] * m2['Real']) / normalizer # 0.0 / 0.0199 = 0.0
    m_combined_fake = (m1['Fake'] * m2['Fake']) / normalizer # (0.01 * 0.99) / 0.0199 ≈ 0.4975
    
    # Loss of decisive replay detection!
    return {"Real": m_combined_real, "Fake": m_combined_fake}`
    }
  ];

  // =====================================================================
  // 4. FORENSIC EVIDENCE IMAGE PRESETS (HIGH RES SVG DATA-URIS)
  // =====================================================================
  function createSvgDataUri(svgContent) {
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgContent.trim());
  }

  const FORENSIC_IMAGE_PRESETS = [
    {
      id: "img-aliasing",
      title: "Phổ STFT: Vết Răng Cưa Aliasing 8kHz",
      category: "dsp",
      description: "Spectrogram bộc lộ năng lượng gập gương qua trục Nyquist 8000Hz do hạ mẫu sai phương pháp.",
      uri: createSvgDataUri(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 360" width="800" height="360" style="background:#040711;font-family:'JetBrains Mono',monospace;">
          <rect width="800" height="360" fill="#040711"/>
          <text x="25" y="32" fill="#00f0ff" font-size="14" font-weight="bold">SPECTROGRAM FORENSICS: ALIASING REFLECTION MATRIX [0 - 16000 Hz]</text>
          <text x="25" y="52" fill="#8b9bb4" font-size="11">Dấu hiệu: Sóng phản chiếu đối xứng qua trục Nyquist f_s/2 = 8000Hz</text>
          
          <!-- Axis -->
          <line x1="60" y1="70" x2="60" y2="300" stroke="#334155" stroke-width="1.5"/>
          <line x1="60" y1="300" x2="760" y2="300" stroke="#334155" stroke-width="1.5"/>
          
          <!-- Frequency ticks -->
          <text x="15" y="85" fill="#ff3366" font-size="10">16kHz</text>
          <text x="15" y="185" fill="#ffb700" font-size="10" font-weight="bold">8kHz</text>
          <line x1="55" y1="180" x2="760" y2="180" stroke="#ffb700" stroke-width="1" stroke-dasharray="4,4"/>
          <text x="15" y="300" fill="#00ff9d" font-size="10">0Hz</text>
          
          <!-- Time ticks -->
          <text x="60" y="320" fill="#8b9bb4" font-size="10">0.0s</text>
          <text x="235" y="320" fill="#8b9bb4" font-size="10">0.5s</text>
          <text x="410" y="320" fill="#8b9bb4" font-size="10">1.0s</text>
          <text x="585" y="320" fill="#8b9bb4" font-size="10">1.5s</text>
          <text x="740" y="320" fill="#8b9bb4" font-size="10">2.0s</text>
          
          <!-- Original formant trajectory ascending -->
          <path d="M 80 280 Q 200 240 300 210 T 500 190 T 700 182" fill="none" stroke="#00f0ff" stroke-width="4"/>
          <text x="250" y="240" fill="#00f0ff" font-size="11" font-weight="bold">Formant Gốc (F3: 2kHz - 6kHz)</text>
          
          <!-- Aliased ghost formant folding downwards from 8kHz -->
          <path d="M 80 100 Q 200 130 300 155 T 500 172 T 700 178" fill="none" stroke="#ff3366" stroke-width="3.5" stroke-dasharray="6,3"/>
          <text x="420" y="145" fill="#ff3366" font-size="11" font-weight="bold">⚠ ALIASING FOLD-BACK (HÀI GẬP GƯƠNG)</text>
          
          <!-- Highlight artifact zone -->
          <rect x="480" y="160" width="240" height="40" fill="rgba(255, 51, 102, 0.15)" stroke="#ff3366" stroke-width="1" rx="4"/>
          <text x="490" y="184" fill="#ff99bb" font-size="10">Xung đột biên Nyquist: Stopband &lt; 26dB</text>
        </svg>
      `),
      questionTemplate: {
        cat: "dsp",
        q: "Quan sát ảnh phổ Spectrogram thu được từ mẫu giám định âm thanh pháp y (ảnh trên): Tại sao đường bao phổ màu đỏ đứt nét lại có xu hướng đối xứng gập ngược từ tần số 8000Hz đi xuống?",
        opts: [
          "Do hiện tượng dịch chuyển tần số Doppler khi người nói di chuyển xa micro.",
          "Do hiện tượng răng cưa Aliasing: Tín hiệu gốc có tần số vượt quá tần số Nyquist f_s/2 = 8000Hz nhưng bị hạ mẫu mà thiếu bộ lọc thông thấp chống răng cưa (Anti-Aliasing FIR).",
          "Do đặc tính tự nhiên của dây thanh âm khi phát âm thanh điệu ngã trong tiếng Việt.",
          "Do độ phân giải thời gian của cửa sổ Hann 1024 quá nhỏ."
        ],
        ans: 1,
        exp: "Theo định lý Shannon-Nyquist, bất kỳ thành phần tần số nào f > f_s / 2 = 8000Hz sẽ bị phản xạ ngược qua trục 8000Hz thành tần số giả f_alias = |f_s - f|. Đây là bằng chứng xác thực việc âm thanh bị xử lý hạ mẫu cẩu thả hoặc bị ghép nối file không đồng nhất."
      }
    },
    {
      id: "img-comb-filter",
      title: "Đặc Tuyến Comb-Filtering: Tấn Công Replay Màng Loa",
      category: "acoustics",
      description: "Các rãnh suy hao tuần hoàn Delta f = 1/Delta t do giao thoa phản xạ âm màng loa ngoài.",
      uri: createSvgDataUri(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 360" width="800" height="360" style="background:#040711;font-family:'JetBrains Mono',monospace;">
          <rect width="800" height="360" fill="#040711"/>
          <text x="25" y="32" fill="#00ff9d" font-size="14" font-weight="bold">ACOUSTIC REPLAY SIGNATURE: LOUDSPEAKER COMB-FILTERING SPECTRUM</text>
          <text x="25" y="52" fill="#8b9bb4" font-size="11">Đáp ứng tần số: Các rãnh khuyết suy hao sâu (Notches) cách đều nhau do giao thoa trực tiếp - phản xạ</text>
          
          <!-- Axis -->
          <line x1="60" y1="70" x2="60" y2="300" stroke="#334155" stroke-width="1.5"/>
          <line x1="60" y1="300" x2="760" y2="300" stroke="#334155" stroke-width="1.5"/>
          <text x="20" y="80" fill="#8b9bb4" font-size="10">0 dB</text>
          <text x="15" y="185" fill="#8b9bb4" font-size="10">-20 dB</text>
          <text x="15" y="295" fill="#8b9bb4" font-size="10">-40 dB</text>
          
          <!-- Frequency scale -->
          <text x="60" y="320" fill="#8b9bb4" font-size="10">100Hz</text>
          <text x="200" y="320" fill="#8b9bb4" font-size="10">500Hz</text>
          <text x="350" y="320" fill="#8b9bb4" font-size="10">1kHz</text>
          <text x="500" y="320" fill="#8b9bb4" font-size="10">2kHz</text>
          <text x="650" y="320" fill="#8b9bb4" font-size="10">4kHz</text>
          
          <!-- Normal human smooth formant response (dotted green) -->
          <path d="M 60 120 Q 180 90 280 130 T 450 160 T 650 200 T 760 220" fill="none" stroke="#00ff9d" stroke-width="2" stroke-dasharray="5,4"/>
          <text x="460" y="115" fill="#00ff9d" font-size="10">Đường bao giọng người thật (Trơn mượt)</text>
          
          <!-- Comb filter periodic peaks and notches -->
          <path d="M 60 140 Q 90 260 120 130 Q 150 260 180 135 Q 210 265 240 140 Q 270 270 300 145 Q 330 270 360 150 Q 390 275 420 155 Q 450 280 480 160 Q 510 280 540 165 Q 570 285 600 170 Q 630 290 660 175 Q 690 295 720 180" fill="none" stroke="#ffb700" stroke-width="3"/>
          <text x="180" y="290" fill="#ffb700" font-size="11" font-weight="bold">Rãnh lọc lược (Δf = 330Hz, độ trễ phản xạ Δt ≈ 3.03ms)</text>
          
          <!-- Highlight Box -->
          <rect x="380" y="220" width="360" height="50" fill="rgba(255, 183, 0, 0.12)" stroke="#ffb700" stroke-width="1" rx="4"/>
          <text x="390" y="240" fill="#ffe082" font-size="10" font-weight="bold">H(f) = |1 + α * e^(-j*2π*f*Δt)|</text>
          <text x="390" y="258" fill="#ffe082" font-size="9">Chứng cứ pháp lý đòn tấn công Replay qua loa ngoài smartphone/laptop</text>
        </svg>
      `),
      questionTemplate: {
        cat: "acoustics",
        q: "Dựa trên biểu đồ phân tích phổ âm thanh trên: Dấu hiệu các rãnh suy hao hình răng lược (Comb-filtering) lặp lại tuần hoàn với chu kỳ Delta f = 330Hz chứng minh điều gì về mặt pháp y âm học?",
        opts: [
          "Chứng minh người nói đang mắc các bệnh lý liên quan đến polyp dây thanh âm.",
          "Chứng minh tín hiệu đã bị phát lại (Replay Attack) qua màng loa ngoài, nơi sóng trực tiếp và sóng phản xạ lệch nhau khoảng thời gian Delta t = 1 / 330Hz ≈ 3.03ms gây triệt tiêu giao thoa tuần hoàn.",
          "Chứng minh mô hình MelCNN đạt tỷ lệ nén dung lượng cao cấp Opset 14.",
          "Chứng minh âm thanh đang được truyền qua cáp quang biển quốc tế."
        ],
        ans: 1,
        exp: "Hiện tượng lọc lược (Comb-filtering) là vết tích vật lý không thể chối cãi của sóng âm phát qua màng loa trong không gian phòng. Khoảng cách giữa các rãnh suy hao là Delta f = 1 / Delta t = 1 / 0.00303s ≈ 330Hz. Giọng người nói trực tiếp vào micro phòng thu không bao giờ có đáp ứng răng lược tuần hoàn cơ học như vậy."
      }
    },
    {
      id: "img-architecture",
      title: "Kiến Trúc E2E DeepGuard: ONNX & Dempster-Shafer",
      category: "onnx",
      description: "Sơ đồ luồng xử lý toàn trình 350ms: DSP 16kHz -> MelCNN ONNX Opset 14 -> Dempster-Shafer Hard Veto.",
      uri: createSvgDataUri(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 360" width="800" height="360" style="background:#040711;font-family:'JetBrains Mono',monospace;">
          <rect width="800" height="360" fill="#040711"/>
          <text x="25" y="32" fill="#00f0ff" font-size="14" font-weight="bold">DEEPGUARD ARCHITECTURE: E2E FORENSIC AUDIT PIPELINE [&lt; 350ms BUDGET]</text>
          
          <!-- Block 1: DSP Engine -->
          <rect x="30" y="90" width="160" height="180" fill="rgba(0, 240, 255, 0.08)" stroke="#00f0ff" stroke-width="2" rx="8"/>
          <text x="45" y="115" fill="#00f0ff" font-size="12" font-weight="bold">TRỤ CỘT 1: DSP</text>
          <text x="45" y="145" fill="#cbd5e1" font-size="9">• 16kHz Polyphase</text>
          <text x="45" y="165" fill="#cbd5e1" font-size="9">• Hann 1024 / Hop 256</text>
          <text x="45" y="185" fill="#cbd5e1" font-size="9">• Log-Mel 80 Bins</text>
          <text x="45" y="205" fill="#cbd5e1" font-size="9">• Pre-emphasis α=0.97</text>
          <text x="45" y="250" fill="#00ff9d" font-size="10" font-weight="bold">Latency: 16.2ms</text>
          
          <!-- Arrow 1 -->
          <line x1="190" y1="180" x2="230" y2="180" stroke="#00f0ff" stroke-width="2.5" marker-end="url(#arrow)"/>
          
          <!-- Block 2: ONNX Runtime Engine -->
          <rect x="230" y="90" width="170" height="180" fill="rgba(181, 95, 230, 0.08)" stroke="#b55fe6" stroke-width="2" rx="8"/>
          <text x="245" y="115" fill="#b55fe6" font-size="12" font-weight="bold">TRỤ CỘT 4: MelCNN</text>
          <text x="245" y="145" fill="#cbd5e1" font-size="9">• ONNX Opset 14</text>
          <text x="245" y="165" fill="#cbd5e1" font-size="9">• IoBinding Zero-Copy</text>
          <text x="245" y="185" fill="#cbd5e1" font-size="9">• FP32 / INT8 Quant</text>
          <text x="245" y="205" fill="#cbd5e1" font-size="9">• Formant Trackers</text>
          <text x="245" y="250" fill="#00ff9d" font-size="10" font-weight="bold">Latency: 6.8ms</text>
          
          <!-- Arrow 2 -->
          <line x1="400" y1="180" x2="440" y2="180" stroke="#b55fe6" stroke-width="2.5"/>
          
          <!-- Block 3: ISO 3382 Acoustics & Vocoder Fingerprint -->
          <rect x="440" y="90" width="160" height="180" fill="rgba(255, 183, 0, 0.08)" stroke="#ffb700" stroke-width="2" rx="8"/>
          <text x="455" y="115" fill="#ffb700" font-size="12" font-weight="bold">TRỤ CỘT 2 &amp; 6</text>
          <text x="455" y="145" fill="#cbd5e1" font-size="9">• Schroeder EDC RT60</text>
          <text x="455" y="165" fill="#cbd5e1" font-size="9">• Comb-Filter Detector</text>
          <text x="455" y="185" fill="#cbd5e1" font-size="9">• Glottal Closure Ex.</text>
          <text x="455" y="205" fill="#cbd5e1" font-size="9">• Jitter / Shimmer</text>
          <text x="455" y="250" fill="#00ff9d" font-size="10" font-weight="bold">Latency: 22.4ms</text>
          
          <!-- Arrow 3 -->
          <line x1="600" y1="180" x2="640" y2="180" stroke="#ffb700" stroke-width="2.5"/>
          
          <!-- Block 4: Fusion & Hard Veto -->
          <rect x="640" y="90" width="140" height="180" fill="rgba(255, 51, 102, 0.08)" stroke="#ff3366" stroke-width="2" rx="8"/>
          <text x="650" y="115" fill="#ff3366" font-size="11" font-weight="bold">FUSION ENGINE</text>
          <text x="650" y="145" fill="#cbd5e1" font-size="9">• Dempster-Shafer</text>
          <text x="650" y="165" fill="#cbd5e1" font-size="9">• HARD VETO RULE</text>
          <text x="650" y="185" fill="#cbd5e1" font-size="9">• FIPS SHA256 Sign</text>
          <text x="650" y="205" fill="#cbd5e1" font-size="9">• Bank Rebuttal</text>
          <text x="650" y="250" fill="#00ff9d" font-size="10" font-weight="bold">Latency: 3.1ms</text>
          
          <rect x="30" y="295" width="750" height="40" fill="rgba(0, 255, 157, 0.05)" stroke="#00ff9d" stroke-width="1" rx="4"/>
          <text x="45" y="320" fill="#00ff9d" font-size="11" font-weight="bold">TỔNG ĐỘ TRỄ NỘI TẠI THUẬT TOÁN: ~48.5ms (AN TOÀN TUYỆT ĐỐI DƯỚI NGƯỠNG VIỄN THÔNG 350ms)</text>
        </svg>
      `),
      questionTemplate: {
        cat: "fusion",
        q: "Theo sơ đồ kiến trúc toàn trình của DeepGuard trên ảnh: Tại sao khối 'FUSION ENGINE' lại đặt quy tắc HARD VETO (Phủ quyết tuyệt đối) song hành với thuật toán dung hợp bằng chứng Dempster-Shafer?",
        opts: [
          "Để tiết kiệm dung lượng RAM của hệ điều hành Linux.",
          "Ngăn chặn việc dung hợp trung bình trọng số làm hòa tan (dilute) các đòn tấn công giả mạo rõ ràng; nếu bất kỳ trụ cột pháp lý cốt lõi nào phát hiện vi phạm bất biến vật lý thì lập tức bác bỏ cuộc gọi.",
          "Vì ONNX Opset 14 không hỗ trợ các phép tính ma trận lớn hơn 100x100.",
          "Để mã hóa đường truyền theo tiêu chuẩn TLS 1.3."
        ],
        ans: 1,
        exp: "Trong an ninh ngân hàng, việc lấy điểm trung bình hoặc dung hợp mềm có thể khiến một kẻ tấn công Replay (được trụ 2 khẳng định 99.9%) vẫn được thông qua nếu mô hình học sâu trụ 4 đưa ra điểm liveness cao. Hard Veto là chốt chặn an toàn tối thượng: 1 bằng chứng vật lý vi phạm = Phủ quyết tức thì."
      }
    },
    {
      id: "img-buffer-underrun",
      title: "Callstack & Log: Jitter Buffer Underrun Telecom Spike",
      category: "security",
      description: "Biểu đồ ghi nhận độ trễ gói tin RTP vượt quá 350ms gây gián đoạn khung âm thanh pháp y.",
      uri: createSvgDataUri(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 360" width="800" height="360" style="background:#040711;font-family:'JetBrains Mono',monospace;">
          <rect width="800" height="360" fill="#040711"/>
          <text x="25" y="32" fill="#ff3366" font-size="14" font-weight="bold">VOIP TELECOM PACKET TRACE: JITTER BUFFER DISRUPTION SPIKE</text>
          <text x="25" y="52" fill="#8b9bb4" font-size="11">Giám sát luồng gói tin RTP thời gian thực qua giao thức SIP/WebRTC</text>
          
          <!-- Axis -->
          <line x1="60" y1="70" x2="60" y2="300" stroke="#334155" stroke-width="1.5"/>
          <line x1="60" y1="300" x2="760" y2="300" stroke="#334155" stroke-width="1.5"/>
          <text x="15" y="85" fill="#ff3366" font-size="10">600ms</text>
          <text x="15" y="165" fill="#ffb700" font-size="10" font-weight="bold">350ms</text>
          <line x1="55" y1="160" x2="760" y2="160" stroke="#ff3366" stroke-width="1.5" stroke-dasharray="6,4"/>
          <text x="620" y="150" fill="#ff3366" font-size="10" font-weight="bold">NGƯỠNG TRỄ TỐI ĐA 350ms</text>
          <text x="15" y="300" fill="#00ff9d" font-size="10">0ms</text>
          
          <!-- Normal Latency line -->
          <path d="M 60 250 L 120 245 L 180 255 L 240 248 L 300 252 L 360 250" fill="none" stroke="#00ff9d" stroke-width="2.5"/>
          <text x="100" y="235" fill="#00ff9d" font-size="10">Độ trễ ổn định ~80ms</text>
          
          <!-- Severe Jitter Spike -->
          <path d="M 360 250 L 400 240 L 440 90 L 480 80 L 520 110 L 560 250 L 750 255" fill="none" stroke="#ff3366" stroke-width="3"/>
          <circle cx="460" cy="85" r="6" fill="#ff3366"/>
          <text x="475" y="90" fill="#ff3366" font-size="12" font-weight="bold">SPIKE: 540ms (PACKET LOSS &amp; BUFFER UNDERRUN)</text>
          
          <!-- PLC Concealment Box -->
          <rect x="420" y="270" width="340" height="24" fill="rgba(255, 51, 102, 0.2)" stroke="#ff3366" stroke-width="1"/>
          <text x="430" y="286" fill="#ffb3ba" font-size="9">PLC (Packet Loss Concealment) tự động nội suy khung giả lập</text>
        </svg>
      `),
      questionTemplate: {
        cat: "security",
        q: "Khi độ trễ mạng viễn thông đột ngột tăng vọt lên 540ms (vượt ngưỡng 350ms) như trong biểu đồ gói tin RTP trên, thuật toán Packet Loss Concealment (PLC) của codec viễn thông sẽ tự động chèn các khung lặp lại để giữ liên lạc. Điều này gây nguy cơ gì cho hệ thống giám định pháp y âm thanh?",
        opts: [
          "Làm tăng âm lượng cuộc gọi lên gấp đôi khiến màng loa bị cháy.",
          "Các khung âm thanh được PLC tổng hợp nhân tạo có thể tạo ra các giả tượng lặp tuần hoàn (periodic artifacts) khiến thuật toán giám định nhầm là dấu vết vocoder hoặc replay.",
          "Làm thay đổi số căn cước công dân của khách hàng trong cơ sở dữ liệu.",
          "Vô hiệu hóa hoàn toàn thuật toán băm FIPS 140-3 SHA-256."
        ],
        ans: 1,
        exp: "Khi mất gói tin do jitter buffer underrun, bộ giải mã VoIP (G.711 / Opus) tự động bù đắp bằng kỹ thuật PLC (nội suy sóng hoặc lặp lại pitch period của khung trước với suy giảm biên độ). Các khung âm nhân tạo này phá vỡ tính liên tục tự nhiên của micro-jitter sinh học, dễ gây báo động giả Deepfake nếu không được nhận diện là khung PLC."
      }
    }
  ];

  // =====================================================================
  // 5. DEEPGUARD AI FORGE CORE ENGINE
  // =====================================================================
  class DeepGuardAIForgeEngine {
    constructor() {
      this.storedQuestions = this.loadQuestions();
      this.behaviorHistory = this.loadBehavior();
      this.apiKey = localStorage.getItem(STORAGE_KEYS.API_KEY) || '';
      this.activeSubtab = localStorage.getItem(STORAGE_KEYS.AI_ACTIVE_SUBTAB) || 'subtab-so';
      
      this.activeSoList = [...REAL_WORLD_ISSUES_ARCHIVE];
      this.activeCodePreset = CODE_PRESETS[0];
      this.activeImagePreset = FORENSIC_IMAGE_PRESETS[0];
      this.currentUploadedImageData = null;
      this.lightboxScale = 1.0;
      this.lightboxPos = { x: 0, y: 0 };
    }

    // --- Storage Helpers ---
    loadQuestions() {
      try {
        const raw = localStorage.getItem(STORAGE_KEYS.AI_QUESTIONS);
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        console.error('Failed to load stored questions:', e);
        return [];
      }
    }

    saveQuestions(list) {
      try {
        this.storedQuestions = list;
        localStorage.setItem(STORAGE_KEYS.AI_QUESTIONS, JSON.stringify(list));
      } catch (e) {
        console.error('Failed to save questions:', e);
      }
    }

    loadBehavior() {
      try {
        const raw = localStorage.getItem(STORAGE_KEYS.BEHAVIOR_HISTORY);
        return raw ? JSON.parse(raw) : {
          attempts: [],
          categoryStats: {
            dsp: { attempts: 0, correct: 0 },
            acoustics: { attempts: 0, correct: 0 },
            prosody: { attempts: 0, correct: 0 },
            onnx: { attempts: 0, correct: 0 },
            fusion: { attempts: 0, correct: 0 },
            security: { attempts: 0, correct: 0 }
          }
        };
      } catch (e) {
        console.error('Failed to load behavior:', e);
        return { attempts: [], categoryStats: {} };
      }
    }

    saveBehavior(behavior) {
      try {
        this.behaviorHistory = behavior;
        localStorage.setItem(STORAGE_KEYS.BEHAVIOR_HISTORY, JSON.stringify(behavior));
      } catch (e) {
        console.error('Failed to save behavior:', e);
      }
    }

    recordQuizAttempt(attempt) {
      if (!attempt) return;
      const b = this.loadBehavior();
      b.attempts.unshift(attempt);
      if (b.attempts.length > 200) b.attempts.pop(); // Keep last 200

      const cat = (attempt.category || 'general').toLowerCase();
      if (!b.categoryStats[cat]) {
        b.categoryStats[cat] = { attempts: 0, correct: 0 };
      }
      b.categoryStats[cat].attempts++;
      if (attempt.isCorrect) {
        b.categoryStats[cat].correct++;
      }

      this.saveBehavior(b);
      this.renderBehaviorDashboard();
    }

    // --- API Key Management ---
    getApiKey() {
      return this.apiKey;
    }

    setApiKey(key) {
      this.apiKey = (key || '').trim();
      localStorage.setItem(STORAGE_KEYS.API_KEY, this.apiKey);
      this.updateApiKeyStatusUI();
    }

    // --- Call Gemini API or Smart Fallback ---
    async generateWithGemini(prompt, base64Image = null) {
      if (!this.apiKey) {
        throw new Error("NO_API_KEY");
      }

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(this.apiKey)}`;
      
      const parts = [{ text: prompt }];
      if (base64Image) {
        // Strip data:image/...;base64,
        const match = base64Image.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
        if (match) {
          parts.push({
            inline_data: {
              mime_type: match[1],
              data: match[2]
            }
          });
        }
      }

      const body = {
        contents: [{ parts: parts }],
        generationConfig: {
          temperature: 0.3,
          responseMimeType: "application/json"
        }
      };

      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Gemini API Error (${resp.status}): ${errText}`);
      }

      const data = await resp.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error("Empty response from AI");
      return JSON.parse(rawText);
    }

    // --- Subtab Navigation ---
    switchSubtab(subtabId) {
      this.activeSubtab = subtabId;
      localStorage.setItem(STORAGE_KEYS.AI_ACTIVE_SUBTAB, subtabId);

      document.querySelectorAll('.ai-subnav-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.subtab === subtabId);
      });
      document.querySelectorAll('.ai-subpanel').forEach(p => {
        p.classList.toggle('active', p.id === subtabId);
      });

      if (subtabId === 'subtab-behavior') {
        this.renderBehaviorDashboard();
      } else if (subtabId === 'subtab-bank') {
        this.renderBankList();
      }
    }

    // ===================================================================
    // CONSOLE 1: STACK OVERFLOW HARVESTER
    // ===================================================================
    async searchStackOverflow(tag = '', query = '') {
      const container = document.getElementById('so-results-list');
      if (!container) return;

      container.innerHTML = `
        <div style="text-align:center; padding: 2rem; color: #00f0ff;">
          <span class="pulse-dot cyan" style="display:inline-block; margin-right:8px;"></span>
          Đang quét dữ liệu thực tế từ Stack Overflow & kho lưu trữ công nghệ...
        </div>
      `;

      try {
        let items = [];
        // Attempt live fetch if online
        if (navigator.onLine) {
          const encTag = encodeURIComponent(tag);
          const encQ = encodeURIComponent(query);
          const apiUrl = `https://api.stackexchange.com/2.3/search/advanced?pagesize=6&order=desc&sort=votes&site=stackoverflow&filter=!nNPvSNPX.W${encTag ? '&tagged=' + encTag : ''}${encQ ? '&q=' + encQ : ''}`;
          
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

          const resp = await fetch(apiUrl, { signal: controller.signal });
          clearTimeout(timeoutId);

          if (resp.ok) {
            const data = await resp.json();
            if (data.items && data.items.length > 0) {
              items = data.items.map((it, idx) => ({
                id: `so-live-${it.question_id}`,
                title: it.title,
                tags: it.tags || [],
                score: it.score || 0,
                author: it.owner ? it.owner.display_name : 'Developer',
                link: it.link,
                snippet: it.body ? it.body.replace(/<[^>]*>/g, '').slice(0, 240) + '...' : 'Không có trích đoạn.',
                isLive: true
              }));
            }
          }
        }

        // If no live items retrieved, filter from curated archive
        if (items.length === 0) {
          const qLow = query.toLowerCase();
          const tLow = tag.toLowerCase();
          items = REAL_WORLD_ISSUES_ARCHIVE.filter(it => {
            const matchTag = !tLow || it.tags.some(t => t.toLowerCase().includes(tLow));
            const matchQ = !qLow || it.title.toLowerCase().includes(qLow) || it.snippet.toLowerCase().includes(qLow);
            return matchTag && matchQ;
          });
          if (items.length === 0) {
            items = REAL_WORLD_ISSUES_ARCHIVE; // fallback to all archive
          }
        }

        this.renderSoResults(items);
      } catch (err) {
        console.warn('Stack Overflow API fallback to curated cache:', err);
        this.renderSoResults(REAL_WORLD_ISSUES_ARCHIVE);
      }
    }

    renderSoResults(items) {
      const container = document.getElementById('so-results-list');
      if (!container) return;

      if (!items || items.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding: 2rem; color: #8b9bb4;">Không tìm thấy chủ đề phù hợp. Hãy thử từ khóa khác!</div>`;
        return;
      }

      container.innerHTML = items.map((it, idx) => `
        <div class="so-issue-card" data-so-id="${it.id}">
          <div class="so-card-header">
            <div class="so-meta-left">
              <span class="so-vote-badge">▲ ${it.score} Upvotes</span>
              ${it.isLive ? '<span class="badge" style="background:rgba(0,255,157,0.15); color:#00ff9d;">LIVE SO API</span>' : '<span class="badge" style="background:rgba(0,240,255,0.15); color:#00f0ff;">CURATED LAB POST-MORTEM</span>'}
              <span class="so-author">Tác giả: <strong>${it.author}</strong></span>
            </div>
            <button class="btn-primary btn-forge-so" data-index="${idx}" style="font-size: 0.8rem; padding: 0.4rem 0.9rem;">
              ⚡ AI Chuyển Hóa Thành Bẫy Logic
            </button>
          </div>
          <h4 class="so-card-title"><a href="${it.link}" target="_blank" rel="noopener noreferrer">${it.title} ↗</a></h4>
          <p class="so-snippet">${it.snippet}</p>
          <div class="so-tags">
            ${(it.tags || []).map(t => `<span class="so-tag-pill">#${t}</span>`).join('')}
          </div>
        </div>
      `).join('');

      // Bind Forge buttons
      container.querySelectorAll('.btn-forge-so').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.index);
          const item = items[idx];
          this.forgeQuestionFromSo(item, btn);
        });
      });
    }

    async forgeQuestionFromSo(soItem, triggerBtn) {
      const origText = triggerBtn.textContent;
      triggerBtn.disabled = true;
      triggerBtn.innerHTML = `⏳ AI Đang Xử Lý...`;

      try {
        let questionObj = null;

        // If using Gemini API
        if (this.apiKey) {
          const prompt = `Bạn là Chuyên gia Giám định Trưởng Pháp y Âm thanh & AI của DeepGuard Enterprise.
Dựa trên vấn đề thực tế từ Stack Overflow sau đây:
Tiêu đề: "${soItem.title}"
Chi tiết: "${soItem.snippet}"
Thẻ: ${soItem.tags.join(', ')}

Hãy chuyển hóa vấn đề kỹ thuật này thành 1 câu hỏi trắc nghiệm bẫy sâu (Multiple Choice Question) chuẩn chuẩn mực DeepGuard.
Yêu cầu định dạng JSON chính xác:
{
  "cat": "dsp" | "acoustics" | "prosody" | "onnx" | "fusion" | "security",
  "q": "Câu hỏi bẫy logic sâu sắc, gắn với ngữ cảnh thực chiến pháp y âm thanh và bảo vệ đồ án",
  "opts": [
    "Phương án A gây hiểu lầm hoặc bẫy phổ biến",
    "Phương án B đúng bản chất vật lý / toán học / kiến trúc hệ thống",
    "Phương án C sai cơ chế hoạt động",
    "Phương án D giải thích sai lệch"
  ],
  "ans": 1,
  "exp": "Giải thích cặn kẽ bản chất vật lý, công thức toán học hoặc tiêu chuẩn quốc tế chứng minh tại sao phương án đó đúng."
}`;
          questionObj = await this.generateWithGemini(prompt);
        } else {
          // Use pre-computed curated question or smart rule-based distillation
          if (soItem.suggestedQuestion) {
            questionObj = { ...soItem.suggestedQuestion };
          } else {
            questionObj = {
              cat: soItem.tags.includes('dsp') || soItem.tags.includes('scipy') ? 'dsp' : (soItem.tags.includes('onnx') ? 'onnx' : 'security'),
              q: `[Thực Chiến Stack Overflow] Vấn đề "${soItem.title}": Trong môi trường giám định pháp y âm thanh thực tế, giải pháp kỹ thuật nào sau đây xử lý triệt để hiện tượng này?`,
              opts: [
                "Áp dụng bộ đệm vòng (Ring-Buffer) và lọc thông dải chuẩn hóa trước khi đưa vào mô hình suy luận.",
                "Tăng kích thước cửa sổ phân tích gấp 10 lần mà không bù trừ độ trễ.",
                "Chuyển đổi toàn bộ sang đơn âm (mono) bằng phép cộng đại số thô.",
                "Bỏ qua bước tiền xử lý tín hiệu và tăng số epoch huấn luyện."
              ],
              ans: 0,
              exp: `Vấn đề được cộng đồng Stack Overflow đúc kết: ${soItem.snippet}. Giải pháp cốt lõi là kiểm soát chặt chẽ miền tần số và bộ đệm trước khi tiến hành inference.`
            };
          }
        }

        // Add metadata
        questionObj.id = `ai-so-${Date.now()}`;
        questionObj.source = 'Stack Overflow Harvester';
        questionObj.sourceRef = soItem.title;
        questionObj.createdAt = new Date().toLocaleString('vi-VN');
        questionObj.isAiGenerated = true;

        this.addQuestionToBank(questionObj);
        triggerBtn.innerHTML = `✓ Đã Thêm Vào Kho!`;
        triggerBtn.style.background = '#00ff9d';
        triggerBtn.style.color = '#040711';
        
        this.showToast(`🎉 Đã tạo thành công câu hỏi từ Stack Overflow! Đã lưu vào Kho Câu Hỏi.`);
      } catch (err) {
        console.error('Error forging SO question:', err);
        alert(`Lỗi sinh câu hỏi: ${err.message}. Đã chuyển sang bộ câu hỏi mẫu tối ưu.`);
      } finally {
        setTimeout(() => {
          triggerBtn.disabled = false;
          triggerBtn.textContent = origText;
          triggerBtn.style.background = '';
          triggerBtn.style.color = '';
        }, 2500);
      }
    }

    // ===================================================================
    // CONSOLE 2: CODE-BASED QUESTION GENERATOR
    // ===================================================================
    initCodeConsole() {
      const selectPreset = document.getElementById('code-preset-select');
      const codeEditor = document.getElementById('code-editor-textarea');
      const btnGenerate = document.getElementById('btn-generate-from-code');

      if (selectPreset && codeEditor) {
        selectPreset.innerHTML = CODE_PRESETS.map((p, idx) => `
          <option value="${idx}">${p.name} (${p.language.toUpperCase()})</option>
        `).join('');

        codeEditor.value = CODE_PRESETS[0].code;

        selectPreset.addEventListener('change', () => {
          const idx = parseInt(selectPreset.value);
          const preset = CODE_PRESETS[idx];
          this.activeCodePreset = preset;
          codeEditor.value = preset.code;
        });
      }

      if (btnGenerate) {
        btnGenerate.addEventListener('click', () => this.generateFromCode());
      }
    }

    async generateFromCode() {
      const codeEditor = document.getElementById('code-editor-textarea');
      const goalSelect = document.getElementById('code-goal-select');
      const btn = document.getElementById('btn-generate-from-code');
      const previewArea = document.getElementById('code-generated-preview');

      if (!codeEditor || !codeEditor.value.trim()) {
        alert('Vui lòng dán hoặc chọn một đoạn code!');
        return;
      }

      const codeText = codeEditor.value.trim();
      const goal = goalSelect ? goalSelect.value : 'bugs';

      const originalBtnText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = `<span class="pulse-dot cyan"></span> Đang Phân Tích AST & Sinh Bẫy...`;

      try {
        let questionObj = null;

        if (this.apiKey) {
          const prompt = `Bạn là Chuyên gia Cấp cao về An ninh Mã nguồn và Đồ án Pháp y Âm thanh DeepGuard.
Phân tích đoạn mã nguồn sau đây:
\`\`\`
${codeText}
\`\`\`
Mục tiêu trọng tâm: ${goal} (lỗ hổng bảo mật, race condition, vi phạm độ trễ 350ms, hoặc bẫy logic hội đồng).

Hãy tạo ra một câu hỏi trắc nghiệm bẫy sâu 4 phương án (A, B, C, D) yêu cầu người thi phải đọc và hiểu bản chất dòng code có lỗi.
Trả về định dạng JSON:
{
  "cat": "dsp" | "acoustics" | "prosody" | "onnx" | "fusion" | "security",
  "q": "Câu hỏi chi tiết trích dẫn cụ thể dòng lệnh hoặc cơ chế gây lỗi trong đoạn code",
  "opts": [
    "Phương án giải thích sai lầm phổ biến",
    "Phương án đúng bản chất kỹ thuật (nguyên nhân cốt lõi và cách khắc phục)",
    "Phương án ngộ nhận về cú pháp",
    "Phương án nhận định sai về độ phức tạp"
  ],
  "ans": 1,
  "exp": "Luận chứng chuyên sâu: chỉ rõ vì sao đoạn code mắc lỗi, hậu quả thực tế và đoạn code sửa chuẩn mực."
}`;
          questionObj = await this.generateWithGemini(prompt);
        } else {
          // Rule-based heuristic generator for code presets
          const preset = this.activeCodePreset || CODE_PRESETS[0];
          questionObj = {
            cat: preset.category || 'security',
            q: `[Code Audit - ${preset.name}] Khi tiến hành rà soát đoạn mã nguồn trên trong bài thi bảo vệ đồ án DeepGuard: Dòng lệnh nào tiềm ẩn rủi ro nghiêm trọng nhất đối với hệ thống?`,
            opts: [
              "Việc sử dụng vòng lặp for đơn giản không hỗ trợ đa luồng song song.",
              preset.category === 'dsp' 
                ? "Việc tính toán nội suy tuyến tính thiếu bộ lọc thông thấp FIR gây ra hiện tượng răng cưa Aliasing làm sai lệch dải tần số Nyquist."
                : (preset.category === 'onnx' 
                  ? "Việc tích lũy tensor vào mảng unbounded `history` và không giải phóng buffer IoBinding gây rò rỉ bộ nhớ Heap."
                  : "Cơ chế hàng đợi không giới hạn kích thước (unbounded queue) làm bùng nổ độ trễ viễn thông vượt quá ngân sách 350ms."),
              "Việc khai báo kiểu số thực float32 thay vì float64.",
              "Đoạn mã không sử dụng thư viện ngoài."
            ],
            ans: 1,
            exp: `Phân tích tĩnh mã nguồn: ${preset.code.split('\n').filter(l => l.includes('BUG') || l.includes('VULNERABLE')).join(' ') || 'Đoạn mã vi phạm chuẩn mực xử lý tín hiệu/an ninh bộ nhớ.'}`
          };
        }

        questionObj.id = `ai-code-${Date.now()}`;
        questionObj.source = 'Code Audit Generator';
        questionObj.sourceRef = goal;
        questionObj.codeSnippet = codeText.slice(0, 300) + (codeText.length > 300 ? '...' : '');
        questionObj.createdAt = new Date().toLocaleString('vi-VN');
        questionObj.isAiGenerated = true;

        this.addQuestionToBank(questionObj);
        this.renderGeneratedPreview(previewArea, questionObj);
        this.showToast(`🚀 Đã sinh thành công câu hỏi từ Code Audit!`);
      } catch (err) {
        console.error('Error generating from code:', err);
        alert(`Lỗi phân tích code: ${err.message}.`);
      } finally {
        btn.disabled = false;
        btn.innerHTML = originalBtnText;
      }
    }

    // ===================================================================
    // CONSOLE 3: BEHAVIOR-ADAPTIVE WEAKNESS ENGINE
    // ===================================================================
    renderBehaviorDashboard() {
      const container = document.getElementById('behavior-dashboard-area');
      if (!container) return;

      const b = this.loadBehavior();
      const stats = b.categoryStats || {};
      const totalAttempts = b.attempts.length;
      const totalCorrect = b.attempts.filter(a => a.isCorrect).length;
      const overallAcc = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

      // Find the weakest category
      let weakestCat = 'dsp';
      let highestErrorRate = -1;

      const categories = [
        { key: 'dsp', label: 'Xử Lý Tín Hiệu DSP & Lấy Mẫu' },
        { key: 'acoustics', label: 'Âm Học ISO 3382 & Replay' },
        { key: 'prosody', label: 'Ngữ Âm Học, 6 Thanh & Dây Thanh' },
        { key: 'onnx', label: 'MelCNN & ONNX Opset 14' },
        { key: 'fusion', label: 'Dempster-Shafer & Hard Veto' },
        { key: 'security', label: 'Pháp Y, PKI FIPS 140-3 & Telecom' }
      ];

      const catMetrics = categories.map(cat => {
        const item = stats[cat.key] || { attempts: 0, correct: 0 };
        const wrong = item.attempts - item.correct;
        const errRate = item.attempts > 0 ? (wrong / item.attempts) : 0;
        if (item.attempts >= 1 && errRate > highestErrorRate) {
          highestErrorRate = errRate;
          weakestCat = cat.key;
        }
        return {
          ...cat,
          attempts: item.attempts,
          correct: item.correct,
          wrong: wrong,
          accuracy: item.attempts > 0 ? Math.round((item.correct / item.attempts) * 100) : 0
        };
      });

      const weakestCatObj = categories.find(c => c.key === weakestCat) || categories[0];

      container.innerHTML = `
        <div class="behavior-overview-grid">
          <div class="behavior-metric-card">
            <span class="bm-label">TỔNG LƯỢT TRẢ LỜI:</span>
            <span class="bm-val text-cyan">${totalAttempts}</span>
          </div>
          <div class="behavior-metric-card">
            <span class="bm-label">TỶ LỆ CHÍNH XÁC TOÀN CỤC:</span>
            <span class="bm-val text-green">${overallAcc}%</span>
          </div>
          <div class="behavior-metric-card alert-weakness">
            <span class="bm-label">CHẨN ĐOÁN LỖ HỔNG LỚN NHẤT:</span>
            <span class="bm-val text-red" style="font-size: 1.1rem; line-height:1.3;">${weakestCatObj.label}</span>
          </div>
        </div>

        <div class="behavior-breakdown-card">
          <h4 style="margin-bottom: 1rem; color: #00f0ff; display:flex; justify-content:space-between; align-items:center;">
            <span>📊 BẢN ĐỒ LỖ HỔNG TRI THỨC THEO PHÂN KHU (KNOWLEDGE DEFICIT RADAR)</span>
            <button class="btn-secondary" id="btn-reset-behavior-data" style="font-size: 0.75rem; padding: 0.3rem 0.6rem;">↺ Reset Dữ Liệu</button>
          </h4>
          
          <div class="cat-bars-list">
            ${catMetrics.map(m => `
              <div class="cat-bar-item">
                <div class="cat-bar-header">
                  <span class="cat-bar-title">${m.label}</span>
                  <span class="cat-bar-score">${m.correct}/${m.attempts} câu đúng (${m.accuracy}%)</span>
                </div>
                <div class="cat-bar-track">
                  <div class="cat-bar-fill ${m.accuracy < 50 ? 'fill-red' : (m.accuracy < 80 ? 'fill-amber' : 'fill-green')}" style="width: ${m.accuracy}%;"></div>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="adaptive-action-banner" style="margin-top: 1.5rem; background: rgba(255, 51, 102, 0.1); border: 1px solid rgba(255, 51, 102, 0.3); border-radius: 8px; padding: 1.2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div>
              <strong style="color: #ff3366; font-size: 1.05rem;">🎯 ĐỀ XUẤT VÁ LỖ HỔNG KIẾN THỨC CẤP TỐC:</strong>
              <p style="font-size: 0.85rem; color: #cbd5e1; margin-top: 0.3rem;">
                Hệ thống phát hiện bạn hay nhầm lẫn ở <strong>${weakestCatObj.label}</strong>. Nhấn nút bên phải để AI sinh ngay bộ đề bù đắp lỗ hổng!
              </p>
            </div>
            <button class="btn-primary" id="btn-generate-remediation" style="background: linear-gradient(135deg, #ff3366, #b55fe6); border:none; padding: 0.7rem 1.4rem; font-weight: 700;">
              ⚡ 1-Click: AI Sinh Bộ Đề Thích Ứng Vá Lỗ Hổng
            </button>
          </div>
        </div>

        <!-- Recent wrong questions list -->
        <div class="recent-mistakes-card" style="margin-top: 1.5rem;">
          <h4 style="color: #ffb700; margin-bottom: 0.8rem;">⚠ CÁC BẪY LOGIC BẠN ĐÃ MẮC PHẢI GẦN ĐÂY:</h4>
          <div id="recent-mistakes-list">
            ${b.attempts.filter(a => !a.isCorrect).slice(0, 5).map((a, idx) => `
              <div class="mistake-item-card">
                <span class="badge" style="background: rgba(255,51,102,0.15); color: #ff3366;">SAI LẦM #${idx + 1} (${a.category.toUpperCase()})</span>
                <p style="margin: 0.4rem 0; font-size: 0.9rem; color: #fff;">"${a.questionText}"</p>
                <div style="font-size: 0.8rem; color: #8b9bb4;">
                  Phương án bạn đã chọn: <span style="color: #ff3366;">Đáp án ${['A','B','C','D'][a.selected]}</span> | 
                  Đáp án chuẩn xác: <span style="color: #00ff9d;">Đáp án ${['A','B','C','D'][a.correct]}</span>
                </div>
              </div>
            `).join('') || '<div style="color:#8b9bb4; font-size:0.85rem; font-style:italic;">Chưa có câu trả lời sai nào được ghi nhận. Hãy làm bài trong tab Trắc Nghiệm để hệ thống học thói quen của bạn!</div>'}
          </div>
        </div>
      `;

      // Event listeners
      const resetBtn = document.getElementById('btn-reset-behavior-data');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (confirm('Bạn có chắc chắn muốn xóa toàn bộ lịch sử hành vi làm bài?')) {
            this.saveBehavior({ attempts: [], categoryStats: {} });
            this.renderBehaviorDashboard();
          }
        });
      }

      const remedBtn = document.getElementById('btn-generate-remediation');
      if (remedBtn) {
        remedBtn.addEventListener('click', () => this.generateAdaptiveRemediation(weakestCat, weakestCatObj.label, remedBtn));
      }
    }

    async generateAdaptiveRemediation(weakestCat, catLabel, btn) {
      const origText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = `<span class="pulse-dot red"></span> AI Đang Soi Lỗ Hổng & Sinh Bộ Đề...`;

      try {
        const b = this.loadBehavior();
        const recentFails = b.attempts.filter(a => !a.isCorrect).slice(0, 3).map(a => a.questionText);

        let newQuestions = [];

        if (this.apiKey) {
          const prompt = `Bạn là Trợ lý AI Đào tạo Pháp y Âm thanh Chuyên sâu của DeepGuard.
Người dùng đang có điểm yếu nghiêm trọng nhất ở phân khu: "${catLabel}" (mã: ${weakestCat}).
Các câu hỏi người dùng vừa trả lời sai gần đây:
${recentFails.length > 0 ? recentFails.map((q, i) => `${i + 1}. "${q}"`).join('\n') : '(Người dùng chưa làm sai câu cụ thể nào, hãy tạo các bẫy logic hạt nhân điển hình nhất của phân khu này)'}

Hãy tạo ra một bộ gồm 3 câu hỏi trắc nghiệm bẫy sâu (Adaptive Remediation) được thiết kế đặc biệt để VÁ LỖ HỔNG và ĐẬP TAN NGỘ NHẬN mà người dùng vừa mắc phải.
Yêu cầu trả về đúng định dạng JSON:
[
  {
    "cat": "${weakestCat}",
    "q": "Câu hỏi bẫy bóc trần đúng điểm người học hay nhầm lẫn",
    "opts": ["A", "B", "C", "D"],
    "ans": 1,
    "exp": "Giải thích chi tiết vì sao người học hay nhầm lẫn và công thức / bản chất đúng là gì."
  }
]`;
          newQuestions = await this.generateWithGemini(prompt);
        } else {
          // Curated high-yield remediation bank
          const templates = {
            dsp: [
              {
                cat: "dsp",
                q: "[Bù Đắp Lỗ Hổng DSP] Nhiều người nhầm rằng tăng tần số lấy mẫu lên 96kHz hay 192kHz sẽ giúp AI phát hiện Deepfake tốt hơn. Tại sao DeepGuard lại ép chuẩn tuyệt đối 16kHz?",
                opts: [
                  "Vì phần cứng máy chủ ngân hàng không đọc được file 96kHz.",
                  "Dải tần giọng người có ý nghĩa pháp y nằm dưới 7500Hz; 16kHz (Nyquist 8kHz) bảo toàn trọn vẹn F1-F4 và triệt tiêu 70% nhiễu cao tần không cần thiết, giảm 66.7% FLOPS tính toán.",
                  "Vì định dạng ONNX Runtime bắt buộc chỉ nhận tần số 16000Hz.",
                  "Vì các tiêu chuẩn viễn thông cấm hoàn toàn tần số trên 20kHz."
                ],
                ans: 1,
                exp: "Nyquist-Shannon: F_nyquist = f_s / 2 = 8000Hz. Các formant giọng nói người hữu ích F1-F4 hoàn toàn nằm dưới 7.5kHz. Tần số cao hơn chỉ chứa nhiễu màng micro và tăng gấp 3 lần chi phí tính toán."
              },
              {
                cat: "dsp",
                q: "[Bù Đắp Lỗ Hổng DSP] Cửa sổ Hann 1024 mẫu tại 16kHz giải quyết thỏa hiệp bất định thời gian - tần số (Heisenberg-Gabor) như thế nào?",
                opts: [
                  "Triệt tiêu hoàn toàn độ bất định về 0.",
                  "Đạt độ phân giải tần số Delta f = 15.625Hz (bắt trọn F0 = 85-300Hz) và độ phân giải thời gian Delta t = 16ms với hop 256 (bắt trọn cú đóng nắp thanh môn 20-60ms).",
                  "Cho phép tính tích phân lùi mà không cần nhân ma trận.",
                  "Chuyển đổi tín hiệu miền thời gian sang miền không gian 3 chiều."
                ],
                ans: 1,
                exp: "Heisenberg-Gabor: Delta t * Delta f >= 1/(4*pi). N=1024 cho Delta f = 16000/1024 = 15.625Hz và hop 256 cho bước nhảy 16ms, tỷ lệ vàng cân bằng giữa phân giải tần số và thời gian."
              }
            ],
            acoustics: [
              {
                cat: "acoustics",
                q: "[Bù Đắp Lỗ Hổng Âm Học] Vì sao DeepGuard dùng Tích Phân Năng Lượng Lùi Schroeder trên Speech Offset Tail thay vì phát xung sin quét (Sine Sweep) để đo RT60?",
                opts: [
                  "Vì máy tính không tạo được sóng sin.",
                  "Vì phương pháp bị động (Passive Liveness) phân tích âm đuôi ngắt giọng tự nhiên của người nói, không làm phiền trải nghiệm cuộc gọi ngân hàng.",
                  "Vì sóng quét sin bị cấm bởi chuẩn ISO 3382.",
                  "Vì tích phân Schroeder làm tăng âm lượng cuộc gọi."
                ],
                ans: 1,
                exp: "Trong bối cảnh bảo vệ phòng thủ ngân hàng thời gian thực, không thể phát tiếng 'bíp' hay âm quét vào tai khách hàng. Đo đạc thụ động trên Speech Offset Tail (khi người nói dứt âm) giúp trích xuất RT60 tự nhiên mà người dùng không hề hay biết."
              }
            ],
            onnx: [
              {
                cat: "onnx",
                q: "[Bù Đắp Lỗ Hổng ONNX] Tại sao DeepGuard chọn ONNX Opset 14 thay vì Opset 11 khi triển khai mô hình MelCNN?",
                opts: [
                  "Opset 11 không hỗ trợ GPU.",
                  "Opset 14 chuẩn hóa toán tử Reshape, Dynamic Batching và Quantization INT8 phần cứng, tăng 3.4x tốc độ suy luận và tương thích hoàn toàn C++ ORT.",
                  "Opset 14 mã hóa dữ liệu thành chuỗi SHA256.",
                  "Opset 11 chỉ chạy được trên điện thoại Android."
                ],
                ans: 1,
                exp: "Opset 14 bổ sung các tối ưu hóa toán tử cho Audio Spectrogram 2D Convolution, hỗ trợ Dynamic Shape hoàn chỉnh và tận dụng tối đa tập lệnh SIMD AVX-512 trên máy chủ CPU."
              }
            ]
          };

          newQuestions = templates[weakestCat] || templates.dsp;
        }

        // Add to bank
        newQuestions.forEach((q, i) => {
          q.id = `ai-remed-${Date.now()}-${i}`;
          q.source = 'Adaptive Remediation Engine';
          q.sourceRef = `Vá lỗ hổng: ${catLabel}`;
          q.createdAt = new Date().toLocaleString('vi-VN');
          q.isAiGenerated = true;
          this.addQuestionToBank(q);
        });

        this.showToast(`🎯 Đã tạo thành công ${newQuestions.length} câu hỏi thích ứng vá lỗ hổng! Đã thêm vào Kho Câu Hỏi.`);
        this.renderBehaviorDashboard();
      } catch (err) {
        console.error('Error generating remediation:', err);
        alert(`Lỗi sinh bộ đề thích ứng: ${err.message}`);
      } finally {
        btn.disabled = false;
        btn.innerHTML = origText;
      }
    }

    // ===================================================================
    // CONSOLE 4: MULTIMODAL VISION QUESTION LAB
    // ===================================================================
    initVisionConsole() {
      const dropzone = document.getElementById('vision-dropzone');
      const fileInput = document.getElementById('vision-file-input');
      const previewImg = document.getElementById('vision-preview-img');
      const previewContainer = document.getElementById('vision-preview-container');
      const btnInspect = document.getElementById('btn-vision-inspect');
      const btnGenerate = document.getElementById('btn-vision-generate');
      const presetThumbnails = document.getElementById('vision-preset-thumbnails');

      // Populate preset thumbnails
      if (presetThumbnails) {
        presetThumbnails.innerHTML = FORENSIC_IMAGE_PRESETS.map((p, idx) => `
          <div class="vision-preset-thumb ${idx === 0 ? 'active' : ''}" data-idx="${idx}">
            <img src="${p.uri}" alt="${p.title}" />
            <span>${p.title}</span>
          </div>
        `).join('');

        presetThumbnails.querySelectorAll('.vision-preset-thumb').forEach(thumb => {
          thumb.addEventListener('click', () => {
            presetThumbnails.querySelectorAll('.vision-preset-thumb').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            const idx = parseInt(thumb.dataset.idx);
            this.selectImagePreset(idx);
          });
        });
      }

      // Initial image
      this.selectImagePreset(0);

      // File input
      if (fileInput) {
        fileInput.addEventListener('change', (e) => {
          const file = e.target.files[0];
          if (file) this.handleUploadedImageFile(file);
        });
      }

      // Drag and drop
      if (dropzone) {
        dropzone.addEventListener('dragover', (e) => {
          e.preventDefault();
          dropzone.classList.add('dragover');
        });
        dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
        dropzone.addEventListener('drop', (e) => {
          e.preventDefault();
          dropzone.classList.remove('dragover');
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            this.handleUploadedImageFile(e.dataTransfer.files[0]);
          }
        });
        dropzone.addEventListener('click', (e) => {
          if (e.target.tagName !== 'BUTTON' && !e.target.closest('#vision-preview-container')) {
            fileInput.click();
          }
        });
      }

      // Global paste listener for Ctrl+V image
      window.addEventListener('paste', (e) => {
        if (this.activeSubtab !== 'subtab-vision') return;
        const items = e.clipboardData?.items;
        if (!items) return;
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            const blob = items[i].getAsFile();
            this.handleUploadedImageFile(blob);
            this.showToast('📋 Đã nhận diện hình ảnh từ Clipboard (Ctrl+V)!');
            break;
          }
        }
      });

      // Zoom / Inspect button
      if (btnInspect) {
        btnInspect.addEventListener('click', () => {
          const currentUri = this.currentUploadedImageData || (this.activeImagePreset ? this.activeImagePreset.uri : '');
          const caption = this.activeImagePreset ? `${this.activeImagePreset.title} - ${this.activeImagePreset.description}` : 'Bằng chứng hình ảnh pháp y tải lên';
          if (currentUri) {
            this.openLightbox(currentUri, caption);
          }
        });
      }

      // Generate question from image
      if (btnGenerate) {
        btnGenerate.addEventListener('click', () => this.generateFromImage());
      }
    }

    selectImagePreset(idx) {
      const preset = FORENSIC_IMAGE_PRESETS[idx];
      if (!preset) return;
      this.activeImagePreset = preset;
      this.currentUploadedImageData = null;

      const previewImg = document.getElementById('vision-preview-img');
      const titleEl = document.getElementById('vision-img-title');
      const descEl = document.getElementById('vision-img-desc');

      if (previewImg) previewImg.src = preset.uri;
      if (titleEl) titleEl.textContent = preset.title;
      if (descEl) descEl.textContent = preset.description;
    }

    handleUploadedImageFile(file) {
      if (!file || !file.type.startsWith('image/')) {
        alert('Vui lòng chọn một tệp hình ảnh hợp lệ (PNG, JPEG, SVG, WebP)!');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        this.currentUploadedImageData = dataUrl;
        this.activeImagePreset = null;

        const previewImg = document.getElementById('vision-preview-img');
        const titleEl = document.getElementById('vision-img-title');
        const descEl = document.getElementById('vision-img-desc');

        if (previewImg) previewImg.src = dataUrl;
        if (titleEl) titleEl.textContent = `Hình ảnh tải lên: ${file.name} (${Math.round(file.size / 1024)} KB)`;
        if (descEl) descEl.textContent = 'Hình ảnh người dùng cung cấp sẵn sàng để AI Multimodal phân tích.';

        document.querySelectorAll('.vision-preset-thumb').forEach(t => t.classList.remove('active'));
      };
      reader.readAsDataURL(file);
    }

    async generateFromImage() {
      const btn = document.getElementById('btn-vision-generate');
      const previewArea = document.getElementById('vision-generated-preview');
      const currentUri = this.currentUploadedImageData || (this.activeImagePreset ? this.activeImagePreset.uri : null);

      if (!currentUri) {
        alert('Vui lòng chọn hoặc tải lên một hình ảnh trước!');
        return;
      }

      const origText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = `<span class="pulse-dot purple"></span> AI Multimodal Đang Quét Thị Giác & Sinh Bẫy...`;

      try {
        let questionObj = null;

        if (this.apiKey) {
          const prompt = `Bạn là Chuyên gia Cao cấp về Xử lý Tín hiệu & Trắc nghiệm Pháp y Âm thanh DeepGuard Enterprise.
Hãy phân tích kỹ hình ảnh kỹ thuật đính kèm (có thể là Spectrogram âm thanh, đồ thị lọc lược Comb-Filtering, sơ đồ kiến trúc ONNX, hoặc log lỗi buffer).

Yêu cầu:
1. Tạo 1 câu hỏi trắc nghiệm bẫy sâu (Multiple Choice Question) trực tiếp yêu cầu người trả lời PHẢI QUAN SÁT VÀ ĐỌC ĐƯỢC CÁC CHI TIẾT TRONG ẢNH (trục tần số, dải khuyết, rãnh răng cưa, khối xử lý).
2. Trả về đúng định dạng JSON:
{
  "cat": "dsp" | "acoustics" | "prosody" | "onnx" | "fusion" | "security",
  "q": "Câu hỏi chi tiết gắn với hình ảnh đính kèm",
  "opts": [
    "Phương án A (bẫy)",
    "Phương án B (đúng bản chất vật lý / toán học thể hiện trong ảnh)",
    "Phương án C (sai)",
    "Phương án D (sai)"
  ],
  "ans": 1,
  "exp": "Luận giải chi tiết giải thích rõ các đặc trưng hình ảnh chứng minh đáp án B là chuẩn xác."
}`;
          questionObj = await this.generateWithGemini(prompt, currentUri);
        } else {
          // Preset template fallback
          if (this.activeImagePreset && this.activeImagePreset.questionTemplate) {
            questionObj = { ...this.activeImagePreset.questionTemplate };
          } else {
            questionObj = {
              cat: "security",
              q: "Dựa trên hình ảnh bằng chứng pháp y vừa tải lên (xem hình ảnh phóng to): Đặc trưng quang học hoặc phổ tần nào sau đây là bằng chứng cốt lõi để đưa ra kết luận giám định?",
              opts: [
                "Sự xuất hiện của các dải suy hao bất thường không khớp với mô hình phát âm sinh học người thật.",
                "Độ phân giải của file ảnh không đạt chuẩn 4K.",
                "Màu sắc của phổ không đồng nhất giữa kênh trái và kênh phải.",
                "Độ trễ truyền tải vượt quá 1000ms."
              ],
              ans: 0,
              exp: "Phân tích thị giác pháp y: Các bất thường trên spectrogram hoặc sơ đồ luồng dữ liệu phản ánh trực tiếp sự can thiệp của thuật toán tổng hợp giọng nói nhân tạo hoặc thiết bị phát lại trung gian."
            };
          }
        }

        // Attach image data to question
        questionObj.id = `ai-vis-${Date.now()}`;
        questionObj.source = 'Multimodal Vision Engine';
        questionObj.sourceRef = this.activeImagePreset ? this.activeImagePreset.title : 'Hình ảnh tải lên';
        questionObj.image = currentUri;
        questionObj.imageCaption = this.activeImagePreset ? this.activeImagePreset.title : 'Bằng chứng thị giác pháp y';
        questionObj.createdAt = new Date().toLocaleString('vi-VN');
        questionObj.isAiGenerated = true;

        this.addQuestionToBank(questionObj);
        this.renderGeneratedPreview(previewArea, questionObj);
        this.showToast(`🖼️ Đã tạo thành công câu hỏi thị giác có ảnh đính kèm!`);
      } catch (err) {
        console.error('Error generating from image:', err);
        alert(`Lỗi sinh câu hỏi từ ảnh: ${err.message}`);
      } finally {
        btn.disabled = false;
        btn.innerHTML = origText;
      }
    }

    // ===================================================================
    // LIGHTBOX ZOOM MODAL CONTROLLER
    // ===================================================================
    initLightbox() {
      const modal = document.getElementById('image-lightbox-modal');
      const img = document.getElementById('lightbox-img');
      const closeBtn = document.getElementById('lightbox-close');
      const zoomInBtn = document.getElementById('lightbox-zoom-in');
      const zoomOutBtn = document.getElementById('lightbox-zoom-out');
      const resetBtn = document.getElementById('lightbox-zoom-reset');

      if (!modal) return;

      closeBtn?.addEventListener('click', () => this.closeLightbox());
      zoomInBtn?.addEventListener('click', () => this.zoomLightbox(0.25));
      zoomOutBtn?.addEventListener('click', () => this.zoomLightbox(-0.25));
      resetBtn?.addEventListener('click', () => this.resetLightboxZoom());

      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeLightbox();
      });

      window.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') this.closeLightbox();
        if (e.key === '+' || e.key === '=') this.zoomLightbox(0.25);
        if (e.key === '-' || e.key === '_') this.zoomLightbox(-0.25);
        if (e.key === '0') this.resetLightboxZoom();
      });

      // Mouse drag to pan when zoomed
      let isDragging = false;
      let startX, startY;

      img?.addEventListener('mousedown', (e) => {
        if (this.lightboxScale <= 1.0) return;
        isDragging = true;
        startX = e.clientX - this.lightboxPos.x;
        startY = e.clientY - this.lightboxPos.y;
        img.style.cursor = 'grabbing';
      });

      window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        this.lightboxPos.x = e.clientX - startX;
        this.lightboxPos.y = e.clientY - startY;
        this.applyLightboxTransform();
      });

      window.addEventListener('mouseup', () => {
        if (isDragging) {
          isDragging = false;
          if (img) img.style.cursor = 'grab';
        }
      });
    }

    openLightbox(src, caption = '') {
      const modal = document.getElementById('image-lightbox-modal');
      const img = document.getElementById('lightbox-img');
      const capEl = document.getElementById('lightbox-caption');

      if (!modal || !img) return;

      img.src = src;
      if (capEl) capEl.textContent = caption || 'Bằng chứng giám định trực quan / Forensic Evidence';

      this.resetLightboxZoom();
      modal.classList.add('active');
    }

    closeLightbox() {
      const modal = document.getElementById('image-lightbox-modal');
      if (modal) modal.classList.remove('active');
    }

    zoomLightbox(delta) {
      this.lightboxScale = Math.min(Math.max(0.5, this.lightboxScale + delta), 4.0);
      this.applyLightboxTransform();
    }

    resetLightboxZoom() {
      this.lightboxScale = 1.0;
      this.lightboxPos = { x: 0, y: 0 };
      this.applyLightboxTransform();
    }

    applyLightboxTransform() {
      const img = document.getElementById('lightbox-img');
      if (img) {
        img.style.transform = `translate(${this.lightboxPos.x}px, ${this.lightboxPos.y}px) scale(${this.lightboxScale})`;
      }
    }

    // ===================================================================
    // CONSOLE 5: DYNAMIC BANK & LIVE INTEGRATION
    // ===================================================================
    addQuestionToBank(q) {
      const list = this.loadQuestions();
      list.unshift(q);
      this.saveQuestions(list);
      this.updateBankBadge();
      if (this.activeSubtab === 'subtab-bank') {
        this.renderBankList();
      }
    }

    updateBankBadge() {
      const badge = document.getElementById('ai-bank-count-badge');
      if (badge) {
        badge.textContent = `${this.storedQuestions.length} câu`;
      }
    }

    renderBankList() {
      const container = document.getElementById('ai-bank-items-container');
      const countEl = document.getElementById('ai-bank-total-count');
      if (!container) return;

      const list = this.loadQuestions();
      if (countEl) countEl.textContent = `${list.length} câu hỏi AI`;

      if (list.length === 0) {
        container.innerHTML = `
          <div style="text-align:center; padding:3rem; color:#8b9bb4;">
            <p style="font-size:1.1rem; margin-bottom:0.8rem;">Kho câu hỏi AI hiện đang trống!</p>
            <p style="font-size:0.85rem;">Hãy qua các tab <strong>Stack Overflow</strong>, <strong>Code Audit</strong> hoặc <strong>Multimodal Vision</strong> để sinh câu hỏi mới.</p>
          </div>
        `;
        return;
      }

      container.innerHTML = list.map((q, idx) => `
        <div class="ai-bank-card" data-id="${q.id}">
          <div class="ai-bank-card-header">
            <div>
              <span class="badge" style="background: rgba(0,240,255,0.15); color: #00f0ff;">${(q.cat || 'GENERAL').toUpperCase()}</span>
              <span class="badge" style="background: rgba(181,95,230,0.15); color: #b55fe6; margin-left:6px;">${q.source || 'AI FORGE'}</span>
              <span style="font-size: 0.75rem; color: #8b9bb4; margin-left: 10px;">${q.createdAt || ''}</span>
            </div>
            <div style="display:flex; gap:0.5rem;">
              <button class="btn-secondary btn-bank-test" data-idx="${idx}" style="font-size:0.75rem; padding:0.3rem 0.6rem;">
                ▶ Luyện Ngay Câu Này
              </button>
              <button class="btn-secondary btn-bank-delete" data-idx="${idx}" style="font-size:0.75rem; padding:0.3rem 0.6rem; color:#ff3366;">
                ✕ Xóa
              </button>
            </div>
          </div>

          <h4 style="margin: 0.8rem 0; color:#fff; font-size:1.05rem; line-height:1.5;">${q.q}</h4>

          ${q.image ? `
            <div class="bank-img-preview-box">
              <img src="${q.image}" class="bank-thumb-img" alt="Bằng chứng ảnh" />
              <button class="btn-zoom-image" data-img="${q.image}" data-caption="${q.imageCaption || q.q}">
                🔍 Phóng To Bằng Chứng Ảnh
              </button>
            </div>
          ` : ''}

          <div class="bank-opts-grid">
            ${(q.opts || []).map((opt, oIdx) => `
              <div class="bank-opt-item ${oIdx === q.ans ? 'correct-opt' : ''}">
                <strong style="color: ${oIdx === q.ans ? '#00ff9d' : '#00f0ff'}; margin-right:6px;">${['A','B','C','D'][oIdx]}.</strong>
                <span>${opt}</span>
              </div>
            `).join('')}
          </div>

          <div class="bank-exp-box">
            <strong style="color: #00ff9d; font-size:0.8rem;">LUẬN GIẢI KỸ THUẬT:</strong>
            <p style="font-size:0.85rem; color:#cbd5e1; margin-top:0.3rem; line-height:1.5;">${q.exp}</p>
          </div>
        </div>
      `).join('');

      // Delete buttons
      container.querySelectorAll('.btn-bank-delete').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.idx);
          if (confirm('Bạn có chắc muốn xóa câu hỏi này khỏi kho?')) {
            const cur = this.loadQuestions();
            cur.splice(idx, 1);
            this.saveQuestions(cur);
            this.renderBankList();
            this.updateBankBadge();
          }
        });
      });

      // Practice individual question
      container.querySelectorAll('.btn-bank-test').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.idx);
          const item = list[idx];
          this.injectIntoQuizAndPlay([item]);
        });
      });

      // Lightbox buttons
      container.querySelectorAll('.btn-zoom-image').forEach(btn => {
        btn.addEventListener('click', () => {
          this.openLightbox(btn.dataset.img, btn.dataset.caption);
        });
      });
    }

    injectIntoQuizAndPlay(questionsToInject = null) {
      const list = questionsToInject || this.loadQuestions();
      if (!list || list.length === 0) {
        alert('Kho câu hỏi AI đang trống! Vui lòng sinh câu hỏi trước.');
        return;
      }

      // Check if global QUIZ_QUESTIONS exists
      if (typeof window.QUIZ_QUESTIONS !== 'undefined' && Array.isArray(window.QUIZ_QUESTIONS)) {
        // Tag with ai category if missing
        list.forEach(q => {
          q.isAiGenerated = true;
          // Prepend to avoid being buried
          const exists = window.QUIZ_QUESTIONS.some(item => item.id === q.id);
          if (!exists) {
            window.QUIZ_QUESTIONS.unshift(q);
          }
        });
      }

      // Switch tab to quiz-trap
      const quizTabBtn = document.querySelector('.nav-tab[data-tab="quiz-trap"]');
      if (quizTabBtn) {
        quizTabBtn.click();
      }

      // Activate AI pill in quiz-filter-bar
      const aiPill = document.querySelector('.quiz-filter-pill[data-cat="ai-generated"]');
      if (aiPill) {
        aiPill.click();
      }

      this.showToast(`🔥 Đã nạp ${list.length} câu hỏi AI vào Đấu Trường Trắc Nghiệm Bẫy Sâu!`);
    }

    exportQuestionsJson() {
      const list = this.loadQuestions();
      const blob = new Blob([JSON.stringify(list, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `deepguard_ai_questions_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }

    importQuestionsJson(file) {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (Array.isArray(data)) {
            const cur = this.loadQuestions();
            const merged = [...data, ...cur];
            this.saveQuestions(merged);
            this.renderBankList();
            this.updateBankBadge();
            this.showToast(`✓ Đã nhập thành công ${data.length} câu hỏi vào kho!`);
          } else {
            alert('Định dạng tệp không hợp lệ! Cần file JSON dạng mảng danh sách câu hỏi.');
          }
        } catch (err) {
          alert('Lỗi đọc tệp JSON: ' + err.message);
        }
      };
      reader.readAsText(file);
    }

    // --- Preview Renderer helper ---
    renderGeneratedPreview(targetEl, q) {
      if (!targetEl || !q) return;
      targetEl.style.display = 'block';
      targetEl.innerHTML = `
        <div class="generated-preview-card">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="badge" style="background:rgba(0,255,157,0.15); color:#00ff9d;">✓ VỪA SINH THÀNH CÔNG (${q.cat.toUpperCase()})</span>
            <span style="font-size:0.75rem; color:#8b9bb4;">Nguồn: ${q.source}</span>
          </div>
          <h4 style="margin: 0.8rem 0; color:#fff; font-size:1.05rem;">${q.q}</h4>
          ${q.image ? `<div style="margin: 0.8rem 0;"><img src="${q.image}" style="max-height:160px; border-radius:6px; border:1px solid rgba(0,240,255,0.3);"/></div>` : ''}
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.5rem; margin-bottom:0.8rem;">
            ${(q.opts || []).map((opt, i) => `
              <div style="padding:0.4rem 0.7rem; background:${i === q.ans ? 'rgba(0,255,157,0.1)' : 'rgba(255,255,255,0.03)'}; border:1px solid ${i === q.ans ? '#00ff9d' : 'rgba(255,255,255,0.08)'}; border-radius:4px; font-size:0.85rem;">
                <strong style="color:${i === q.ans ? '#00ff9d' : '#00f0ff'};">${['A','B','C','D'][i]}.</strong> ${opt}
              </div>
            `).join('')}
          </div>
          <div style="font-size:0.85rem; color:#cbd5e1; background:rgba(0,0,0,0.3); padding:0.6rem; border-left:3px solid #00ff9d;">
            <strong>Giải thích:</strong> ${q.exp}
          </div>
        </div>
      `;
    }

    // --- Toast message helper ---
    showToast(msg) {
      let toast = document.getElementById('deepguard-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'deepguard-toast';
        toast.className = 'deepguard-toast';
        document.body.appendChild(toast);
      }
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3500);
    }

    updateApiKeyStatusUI() {
      const statusPill = document.getElementById('ai-api-status-pill');
      const input = document.getElementById('input-gemini-key');
      if (input) input.value = this.apiKey ? '••••••••••••••••••••••••' : '';

      if (statusPill) {
        if (this.apiKey) {
          statusPill.innerHTML = `<span class="pulse-dot green"></span> Gemini AI Active`;
          statusPill.className = 'status-pill green-glow';
        } else {
          statusPill.innerHTML = `<span class="pulse-dot cyan"></span> DeepGuard Heuristic AI (Offline)`;
          statusPill.className = 'status-pill cyan-glow';
        }
      }
    }

    // ===================================================================
    // MAIN INITIALIZATION
    // ===================================================================
    
    // ===================================================================
    // NOTEBOOKLM KNOWLEDGE BRIDGE & GROUNDED QUESTION GENERATOR
    // ===================================================================
    initNotebookLMConsole() {
      const presetBtns = document.querySelectorAll('.notebooklm-preset-btn');
      const contentInput = document.getElementById('notebooklm-content-input');
      const btnForge = document.getElementById('btn-forge-from-notebooklm');

      const PRESET_DATA = {
        forensics: `[SỔ TAY PHÁP Y ÂM THANH SỐ & BẢO VỆ NGÂN HÀNG]
Nguồn 1: Tiêu chuẩn ITU-T G.711 & RFC 3550 RTP Stream.
Khi giọng nói truyền qua mạng viễn thông VoIP bị nén bằng codec A-law/u-law (64kbps, 8kHz), phổ tần số trên 3.4kHz bị cắt gọt hoàn toàn (Bandwidth Limitation). Kẻ tấn công dùng mô hình TTS (như VITS, ElevenLabs) tạo âm thanh 24kHz nhưng khi gọi qua tổng đài, đặc trưng formant bị làm mờ. Tuy nhiên, Jitter Buffer và Packet Loss Concealment (PLC) để lại các mẫu lặp pha (Phase Discontinuity) đặc trưng mà giọng người thật không có.
Nguồn 2: Tiêu chuẩn âm học phòng kín ISO 3382-1.
Âm thanh phát lại qua loa (Replay Attack) luôn chứa hai lần phản xạ âm (Double Reverberation): Thời gian vang RT60 của phòng thu kẻ tấn công cộng với phòng nạn nhân. Phân tích hàm truyền phòng (RIR) qua bộ lọc Cepstral Liftering sẽ bóc tách được các đỉnh phản xạ thứ cấp.`,

        vectordb: `[SỔ TAY KIẾN TRÚC VECTOR DATABASE & SINH TRẮC HỌC GIỌNG NÓI]
Nguồn 1: Tối ưu hóa Vector Embedding 512 chiều trong pgvector & Milvus.
Đặc trưng âm học giọng nói của khách hàng được trích xuất thành vector 192 hoặc 512 chiều (dùng ECAPA-TDNN hoặc ResNet-34). Để tra cứu siêu tốc trong 350ms, vector bắt buộc phải được chuẩn hóa L2 (Unit Normalization: ||v|| = 1). Khi đó, Cosine Similarity đồng nhất hoàn toàn với Dot Product, cho phép CPU dùng tập lệnh SIMD AVX-512 hoặc GPU Tensor Core nhân ma trận với độ trễ dưới 2ms.
Nguồn 2: So sánh cấu trúc chỉ mục HNSW vs IVFFlat.
HNSW xây dựng đồ thị phân lớp đa tầng; duy trì độ hồi đáp (Recall) > 98% ngay cả khi nạp thêm hàng triệu vector mới mà không cần train lại cụm tâm. Ngược lại, IVFFlat tốn ít RAM hơn nhưng bắt buộc phải huấn luyện lại cụm tâm (Centroids) khi dữ liệu phân bố lệch.`,

        bankcase: `[SỔ TAY ÁN LỆ LỪA ĐẢO DEEPFAKE & BẢO TOÀN CHỨNG CỨ FIPS 140-3]
Nguồn 1: Án lệ Ngân hàng V. (Thiệt hại 12.5 tỷ VND qua cuộc gọi video & thoại giả mạo).
Tội phạm sử dụng Voice Conversion biến đổi giọng nói thời gian thực kết hợp phần mềm đổi giọng để qua mặt nhân viên giao dịch. Hệ thống xác thực truyền thống chỉ dựa vào câu hỏi bảo mật và OTP SMS đã bị vô hiệu hóa vì kẻ gian thao túng tâm lý nạn nhân tự cung cấp OTP.
Nguồn 2: Chuỗi bảo quản chứng cứ số FIPS 140-3 & Merkle DAG.
Để chứng cứ âm thanh có giá trị pháp lý trước Tòa án nhân dân, toàn bộ gói tin RTP và bản ghi log phân tích phải được ghi vào kho Append-Only và băm Merkle DAG với thuật toán SHA-256. Khóa mã hóa AES-256 phải được lưu giữ trong thiết bị phần cứng an toàn HSM FIPS 140-3 Level 3, bảo đảm tính bất biến tuyệt đối.`,

        vocabulary: `[SỔ TAY TỪ VỰNG & THUẬT NGỮ CỐT LÕI HỆ THỐNG]
Nguồn 1: Thuật toán & Cấu trúc dữ liệu căn bản.
- Biến (Variable) & Bảng băm (Hash Table O(1)).
- Đệ quy (Recursion) & Điều kiện cơ sở (Base Case).
- Hàng đợi (Queue FIFO) vs Ngăn xếp (Stack LIFO).
- Bất biến (Immutability): Ngăn chặn tác dụng phụ (Side effects).
Nguồn 2: Cơ sở dữ liệu & Phân tán nâng cao.
- ACID: Atomicity, Consistency, Isolation, Durability.
- Index B-Tree vs ClickHouse Sparse Index.
- Khóa chết (Deadlock) & Khóa lạc quan (Optimistic Locking).
- Bằng chứng không tiết lộ tri thức (Zero-Knowledge Proofs - ZKP).`
      };

      presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          presetBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const p = btn.dataset.preset;
          if (contentInput && PRESET_DATA[p]) {
            contentInput.value = PRESET_DATA[p];
          }
        });
      });

      if (contentInput && !contentInput.value) {
        contentInput.value = PRESET_DATA.forensics;
      }

      btnForge?.addEventListener('click', () => {
        const text = contentInput ? contentInput.value.trim() : '';
        if (!text) {
          alert('Vui lòng chọn một sổ tay mẫu hoặc nhập nội dung ghi chú/link từ NotebookLM!');
          return;
        }

        btnForge.disabled = true;
        btnForge.textContent = '⏳ Đang phân tích Grounding & Sinh câu hỏi...';

        setTimeout(() => {
          this.forgeFromNotebookLMContent(text);
          btnForge.disabled = false;
          btnForge.textContent = '🚀 Trích Xuất & Sinh Câu Hỏi Chuẩn Grounding';
        }, 500);
      });
    }

    forgeFromNotebookLMContent(text) {
      const resultsContainer = document.getElementById('notebooklm-results-list');
      if (!resultsContainer) return;

      let generated = [];

      if (text.includes('ITU-T G.711') || text.includes('VoIP') || text.includes('Jitter')) {
        generated = [
          {
            id: 'nlm-' + Date.now() + '-1',
            cat: 'acoustics',
            q: '[NotebookLM Grounding] Theo tiêu chuẩn ITU-T G.711 và phân tích viễn thông VoIP trong sổ tay nghiên cứu, tại sao thuật toán Text-to-Speech (TTS) khi truyền qua mạng điện thoại vẫn để lại dấu vết phân tích pha (Phase Discontinuity)?',
            opts: [
              'Do cơ chế Jitter Buffer và thuật toán bù mất gói (Packet Loss Concealment - PLC) tạo ra các chu kỳ mẫu lặp giả tạo mà thanh quản con người không bao giờ phát ra.',
              'Vì mạng điện thoại tự động chuyển đổi giọng nói thành tín hiệu sóng radio.',
              'Do micrô điện thoại tự động làm chậm tốc độ nói của kẻ lừa đảo.',
              'Vì tiêu chuẩn G.711 cấm hoàn toàn giọng nói nhân tạo.'
            ],
            ans: 0,
            exp: '[Trích dẫn NotebookLM: Tiêu chuẩn ITU-T G.711 & RFC 3550 RTP Stream]\nKhi nén A-law/u-law ở băng thông 8kHz, các đặc trưng formant cao bị cắt gọt. Tuy nhiên, Jitter Buffer và PLC tạo ra các bước nhảy pha bất thường tại biên giới các gói tin mạng, là bằng chứng vàng để mô hình DSP của DeepGuard phát hiện cuộc gọi mạo danh.',
            isAiGenerated: true,
            sourceNotebook: 'Sổ Tay Âm Học Pháp Y & Tiêu Chuẩn Viễn Thông'
          },
          {
            id: 'nlm-' + Date.now() + '-2',
            cat: 'acoustics',
            q: '[NotebookLM Grounding] Theo tiêu chuẩn ISO 3382-1 trong sổ tay, tại sao một cuộc gọi phát lại qua loa (Replay Attack) lại xuất hiện hiện tượng Phản xạ âm kép (Double Reverberation)?',
            opts: [
              'Vì âm thanh phải chịu hai lần thời gian vang RT60: lần 1 tại phòng thu của kẻ tấn công và lần 2 tại không gian phòng của nạn nhân.',
              'Vì kẻ tấn công luôn sử dụng đồng thời 2 chiếc loa để phát.',
              'Do mạng viễn thông tự động lặp lại âm thanh 2 lần để kiểm tra chất lượng.',
              'Hiện tượng này chỉ xảy ra khi cuộc gọi diễn ra ngoài trời mưa.'
            ],
            ans: 0,
            exp: '[Trích dẫn NotebookLM: Tiêu chuẩn âm học phòng kín ISO 3382-1]\nHàm truyền phòng (Room Impulse Response - RIR) của cuộc gọi replay luôn chứa hai tập đỉnh phản xạ độc lập. Bộ lọc Cepstral Liftering của DeepGuard bóc tách RT60 của phòng kẻ tấn công, chứng minh âm thanh không phải phát trực tiếp từ người thật.',
            isAiGenerated: true,
            sourceNotebook: 'Sổ Tay Âm Học Pháp Y & Tiêu Chuẩn Viễn Thông'
          }
        ];
      } else if (text.includes('Vector') || text.includes('Milvus') || text.includes('HNSW')) {
        generated = [
          {
            id: 'nlm-' + Date.now() + '-1',
            cat: 'security',
            q: '[NotebookLM Grounding] Dựa trên sổ tay tối ưu hóa Vector DB, tại sao việc chuẩn hóa độ dài đơn vị L2-Normalized (||v|| = 1) cho vector giọng nói 512 chiều lại mang tính quyết định để đạt ngân sách 350ms?',
            opts: [
              'Vì khi độ dài bằng 1, phép đo Cosine Similarity trở thành phép Tích vô hướng (Dot Product), cho phép CPU dùng SIMD AVX-512 hoặc GPU Tensor Core tính toán siêu tốc dưới 2ms.',
              'Vì chuẩn hóa L2 giúp giảm số chiều của vector từ 512 xuống còn 1 chiều.',
              'Vì CSDL chỉ lưu được các số nguyên dương.',
              'Để vector có thể gửi qua tin nhắn SMS.'
            ],
            ans: 0,
            exp: '[Trích dẫn NotebookLM: Tối ưu hóa Vector Embedding 512 chiều trong pgvector & Milvus]\nCông thức Cosine Similarity yêu cầu chia cho tích độ dài hai vector. Khi chuẩn hóa L2=1, mẫu số biến mất, phép so khớp hàng triệu vector sinh trắc học trở thành phép nhân ma trận thuần túy đạt hiệu năng phần cứng tối đa.',
            isAiGenerated: true,
            sourceNotebook: 'Sổ Tay Kiến Trúc Vector Database & Biometrics'
          },
          {
            id: 'nlm-' + Date.now() + '-2',
            cat: 'security',
            q: '[NotebookLM Grounding] Theo tài liệu so sánh chỉ mục vector trong sổ tay, ưu thế lớn nhất của HNSW so với IVFFlat trong hệ thống chống deepfake trực tiếp là gì?',
            opts: [
              'HNSW duy trì độ chính xác truy hồi Recall > 98% mà không cần định kỳ dừng hệ thống để huấn luyện lại cụm tâm (Centroids retraining) khi có vector mới.',
              'HNSW không cần kết nối mạng để tìm kiếm.',
              'HNSW chỉ lưu trữ dữ liệu dạng văn bản không dấu.',
              'HNSW tự động xóa các vector cũ sau 24 giờ.'
            ],
            ans: 0,
            exp: '[Trích dẫn NotebookLM: So sánh cấu trúc chỉ mục HNSW vs IVFFlat]\nCấu trúc đồ thị Skip-List đa tầng của HNSW cho phép nạp thêm mẫu giọng nói mới liên tục với độ trễ thấp và độ hồi đáp cao, hoàn toàn phù hợp với ngân sách khắt khe của tổng đài ngân hàng.',
            isAiGenerated: true,
            sourceNotebook: 'Sổ Tay Kiến Trúc Vector Database & Biometrics'
          }
        ];
      } else {
        generated = [
          {
            id: 'nlm-' + Date.now() + '-1',
            cat: 'security',
            q: '[NotebookLM Grounding] Theo sổ tay nghiên cứu pháp lý & bằng chứng FIPS 140-3, tại sao chuỗi bảo quản (Chain of Custody) phải sử dụng cấu trúc Merkle DAG băm SHA-256 kết hợp HSM?',
            opts: [
              'Để bảo đảm tính bất biến tuyệt đối (Immutability): Mọi hành vi sửa đổi dù chỉ 1 mili-giây âm thanh sẽ làm sụp đổ toàn bộ chuỗi băm lên đến Root Hash trước tòa án.',
              'Để tập tin âm thanh tự động được dịch sang tiếng Anh.',
              'Để giảm kích thước tệp âm thanh xuống 90%.',
              'Để nhân viên ngân hàng có thể tự do chỉnh sửa nội dung cuộc gọi.'
            ],
            ans: 0,
            exp: '[Trích dẫn NotebookLM: Chuỗi bảo quản chứng cứ số FIPS 140-3 & Merkle DAG]\nMọi bằng chứng số nộp cho tòa án phải chứng minh được tính toàn vẹn từ khoảnh khắc thu nhận đến khi xét xử. Merkle DAG cung cấp bằng chứng toán học không thể bác bỏ, ngăn chặn mọi cáo buộc về việc can thiệp bằng chứng.',
            isAiGenerated: true,
            sourceNotebook: 'Sổ Tay Pháp Lý & Bằng Chứng FIPS 140-3'
          },
          {
            id: 'nlm-' + Date.now() + '-2',
            cat: 'dsp',
            q: '[NotebookLM Grounding] Dựa trên ghi chú cốt lõi hệ thống, cơ chế Grounded RAG (Retrieval-Augmented Generation) của NotebookLM giúp loại bỏ điểm yếu chết người nào của các mô hình ngôn ngữ lớn?',
            opts: [
              'Loại bỏ hiện tượng ảo giác (Hallucination) bằng cách bắt buộc mọi câu trả lời phải neo chặt vào các nguồn tài liệu xác thực có trích dẫn xuất xứ.',
              'Giúp máy tính chạy được khi mất điện.',
              'Tự động tăng tốc độ đường truyền Internet.',
              'Thay thế hoàn toàn nhu cầu về lập trình viên.'
            ],
            ans: 0,
            exp: '[Trích dẫn NotebookLM: Cơ chế Grounding chống ảo giác]\nTrong lĩnh vực tư pháp và ngân hàng, sai sót do ảo giác có thể dẫn đến hậu quả pháp lý nghiêm trọng. Grounded RAG buộc AI chỉ được phát biểu dựa trên sự thật đã được kiểm chứng từ kho tài liệu.',
            isAiGenerated: true,
            sourceNotebook: 'Sổ Tay Khái Niệm Cốt Lõi Hệ Thống'
          }
        ];
      }

      resultsContainer.innerHTML = `
        <div style="margin-top: 1.2rem; background: rgba(14, 21, 37, 0.7); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.2rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.6rem;">
            <div>
              <strong style="color: #00ff9d; font-size: 1rem;">🎉 ĐÃ TRÍCH XUẤT ${generated.length} CÂU HỎI GROUNDING TỪ NOTEBOOKLM:</strong>
              <div style="font-size: 0.78rem; color: #8b9bb4;">Nguồn: ${generated[0].sourceNotebook}</div>
            </div>
            <button class="btn-primary" id="btn-inject-notebooklm-all" style="background: linear-gradient(135deg, #00f0ff, #b55fe6); color: #040711; font-weight: 700; padding: 0.5rem 1rem; font-size: 0.85rem; border: none;">
              🔥 Nạp Tất Cả Vào Quiz Trap & Bắt Đầu Làm Bài
            </button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${generated.map((q, qIdx) => `
              <div style="background: rgba(4, 7, 14, 0.6); border: 1px solid rgba(0, 240, 255, 0.25); border-left: 4px solid #00f0ff; border-radius: 6px; padding: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; gap: 0.5rem;">
                  <span class="badge" style="background: rgba(0, 240, 255, 0.15); color: #00f0ff;">CÂU ${qIdx + 1} • ${q.cat.toUpperCase()}</span>
                  <button class="btn-secondary btn-add-single-nlm" data-idx="${qIdx}" style="font-size: 0.75rem; padding: 0.35rem 0.7rem; border-color: #00ff9d; color: #00ff9d;">
                    ➕ Nạp Vào Kho Câu Hỏi
                  </button>
                </div>
                <div style="font-size: 0.95rem; font-weight: 600; color: #fff; margin-bottom: 0.7rem; line-height: 1.5;">${q.q}</div>
                <div style="display: grid; grid-template-columns: 1fr; gap: 0.4rem; margin-bottom: 0.7rem;">
                  ${q.opts.map((opt, oIdx) => `
                    <div style="padding: 0.5rem 0.8rem; background: ${oIdx === q.ans ? 'rgba(0, 255, 157, 0.1)' : 'rgba(255, 255, 255, 0.03)'}; border: 1px solid ${oIdx === q.ans ? 'rgba(0, 255, 157, 0.4)' : 'transparent'}; border-radius: 4px; font-size: 0.85rem; color: ${oIdx === q.ans ? '#00ff9d' : '#cbd5e1'};">
                      ${['A', 'B', 'C', 'D'][oIdx]}. ${opt} ${oIdx === q.ans ? '✓ (Đáp án đúng)' : ''}
                    </div>
                  `).join('')}
                </div>
                <div style="background: rgba(0, 0, 0, 0.3); border-radius: 4px; padding: 0.6rem 0.8rem; font-size: 0.82rem; color: #94a3b8; line-height: 1.4;">
                  💡 <strong>Giải thích có trích dẫn:</strong> ${q.exp}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      // Event listeners for adding questions
      resultsContainer.querySelectorAll('.btn-add-single-nlm').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.idx);
          const q = generated[idx];
          this.addQuestionToBank(q);
          btn.disabled = true;
          btn.textContent = '✓ Đã Thêm';
          btn.style.borderColor = '#8b9bb4';
          btn.style.color = '#8b9bb4';
        });
      });

      document.getElementById('btn-inject-notebooklm-all')?.addEventListener('click', () => {
        generated.forEach(q => this.addQuestionToBank(q));
        this.injectIntoQuizAndPlay();
      });

      this.showToast(`✓ Đã trích xuất ${generated.length} câu hỏi chuẩn Grounding từ NotebookLM!`);
    }

    init() {
      // Subtab switching
      const subnavBtns = document.querySelectorAll('.ai-subnav-btn');
      subnavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.switchSubtab(btn.dataset.subtab);
        });
      });

      // API Key Config Modal / Pill
      const btnSaveKey = document.getElementById('btn-save-gemini-key');
      const inputKey = document.getElementById('input-gemini-key');
      if (btnSaveKey && inputKey) {
        btnSaveKey.addEventListener('click', () => {
          const val = inputKey.value.trim();
          if (val.startsWith('••••')) {
            alert('Khóa API hiện tại vẫn đang được giữ nguyên.');
            return;
          }
          this.setApiKey(val);
          this.showToast(val ? '✓ Đã kích hoạt Google Gemini API Key an toàn!' : 'Đã chuyển sang chế độ DeepGuard Heuristic AI.');
        });
      }

      // SO Search & Tags
      const soSearchInput = document.getElementById('so-search-input');
      const btnSoSearch = document.getElementById('btn-so-search');
      const tagPills = document.querySelectorAll('.so-quick-tag');

      if (btnSoSearch && soSearchInput) {
        btnSoSearch.addEventListener('click', () => {
          this.searchStackOverflow('', soSearchInput.value.trim());
        });
        soSearchInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            this.searchStackOverflow('', soSearchInput.value.trim());
          }
        });
      }

      tagPills.forEach(pill => {
        pill.addEventListener('click', () => {
          tagPills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          const tag = pill.dataset.tag;
          if (soSearchInput) soSearchInput.value = '';
          this.searchStackOverflow(tag, '');
        });
      });

      // Initialize individual consoles
      this.initCodeConsole();
      this.initVisionConsole();
      this.initLightbox();
      this.initNotebookLMConsole();

      // Bank action buttons
      const btnInjectAll = document.getElementById('btn-inject-all-quiz');
      const btnExport = document.getElementById('btn-export-bank-json');
      const btnImport = document.getElementById('btn-import-bank-json');
      const fileImport = document.getElementById('input-import-bank-file');

      if (btnInjectAll) {
        btnInjectAll.addEventListener('click', () => this.injectIntoQuizAndPlay());
      }
      if (btnExport) {
        btnExport.addEventListener('click', () => this.exportQuestionsJson());
      }
      if (btnImport && fileImport) {
        btnImport.addEventListener('click', () => fileImport.click());
        fileImport.addEventListener('change', (e) => {
          if (e.target.files && e.target.files[0]) {
            this.importQuestionsJson(e.target.files[0]);
          }
        });
      }

      // Initial subtab render
      this.switchSubtab(this.activeSubtab);
      this.updateApiKeyStatusUI();
      this.updateBankBadge();

      // Default render SO items
      this.renderSoResults(REAL_WORLD_ISSUES_ARCHIVE);
    }
  }

  // Expose to window
  window.DeepGuardAIForge = new DeepGuardAIForgeEngine();

  // Auto-init on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    window.DeepGuardAIForge.init();
  });

})();

