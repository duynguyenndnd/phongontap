/**
 * DEEPGUARD AI ENTERPRISE - PROGRESSIVE PROGRAMMING & DATABASE ACADEMY
 * 
 * Multi-Tier Knowledge Escalation Engine:
 * - Level 1: Nhập Môn Lập Trình & Tư Duy Logic (20 Câu hỏi căn bản, trực quan)
 * - Level 2: Nền Tảng Cơ Sở Dữ Liệu & SQL (14 Câu hỏi bảng, khóa, quan hệ, ACID, Index)
 * - Level 3: Cơ Sở Dữ Liệu Chuyên Sâu Của DeepGuard (10 Câu hỏi Vector DB, ClickHouse, Merkle Tree, In-memory 350ms)
 * 
 * Adaptive Escalation:
 * Tracks user answer behavior, accumulates EXP & Streak, and progressively transitions
 * the learner from foundational concepts to deep forensic enterprise database architecture!
 */

(function () {
  'use strict';

  // =====================================================================
  // 1. QUESTION REPOSITORY: 3 PROGRESSIVE TIERS (44 COMPREHENSIVE QUESTIONS)
  // =====================================================================

  const PROGRESSIVE_QUESTIONS = {
    // -------------------------------------------------------------------
    // LEVEL 1: NHẬP MÔN LẬP TRÌNH & TƯ DUY LOGIC (20 Câu hỏi chi tiết)
    // -------------------------------------------------------------------
    level1: [
      {
        id: "prog-l1-01",
        level: 1,
        tierName: "Nhập Môn Lập Trình",
        cat: "prog-beginner",
        topic: "Biến & Kiểu Dữ Liệu",
        q: "Trong lập trình, 'Biến' (Variable) được hiểu đơn giản nhất là gì và tại sao chúng ta phải phân biệt kiểu số nguyên (Integer) với kiểu số thực (Float)?",
        opts: [
          "Biến là một chiếc hộp được đặt tên trong bộ nhớ máy tính để cất giữ dữ liệu; số nguyên (như tuổi 20) không có phần thập phân, còn số thực (như biên độ âm thanh 0.85) cần dấu phẩy động để biểu diễn độ chính xác.",
          "Biến là một câu lệnh dùng để tắt máy tính khi hoàn thành chương trình.",
          "Số nguyên và số thực hoàn toàn giống nhau, máy tính tự ý chọn kiểu mà lập trình viên không cần quan tâm.",
          "Biến là một tệp hình ảnh lưu trữ trên ổ cứng mạng."
        ],
        ans: 0,
        exp: "Hãy tưởng tượng biến như chiếc hộp có dán nhãn: nhãn 'tuoi' cất số nguyên 20 (Integer), nhãn 'bien_do_song' cất số thực 0.85 (Float). Máy tính tổ chức bộ nhớ nhị phân cho số thực phức tạp hơn số nguyên để bảo toàn các chữ số sau dấu phẩy."
      },
      {
        id: "prog-l1-02",
        level: 1,
        tierName: "Nhập Môn Lập Trình",
        cat: "prog-beginner",
        topic: "Cấu Trúc Rẽ Nhánh If/Else",
        q: "Một đoạn code kiểm tra đăng nhập có dạng: \nif (mat_khau == mat_khau_dung) { cho_phep_vao(); } else { bao_dong(); }\nKhối lệnh 'else' sẽ được máy tính thực hiện trong trường hợp nào?",
        opts: [
          "Chỉ thực hiện khi máy tính bị mất kết nối mạng Internet.",
          "Chỉ thực hiện khi điều kiện trong lệnh 'if' là SAI (tức là mật khẩu nhập vào không trùng khớp).",
          "Luôn luôn thực hiện bất kể mật khẩu đúng hay sai.",
          "Chỉ thực hiện vào ban đêm."
        ],
        ans: 1,
        exp: "Lệnh 'if - else' mô phỏng tư duy logic rẽ nhánh của con người: NẾU điều kiện đúng thì làm việc A, NGƯỢC LẠI (else - tức điều kiện sai) thì bắt buộc chuyển sang làm việc B."
      },
      {
        id: "prog-l1-03",
        level: 1,
        tierName: "Nhập Môn Lập Trình",
        cat: "prog-beginner",
        topic: "Vòng Lặp (Loops)",
        q: "Tại sao trong lập trình chúng ta cần dùng 'Vòng lặp' (for, while) thay vì tự tay viết đi viết lại từng dòng code?",
        opts: [
          "Để máy tính chạy chậm lại giúp người dùng kịp đọc mã nguồn.",
          "Để máy tính tự động thực hiện lặp đi lặp lại một hành động (ví dụ: quét qua 16,000 mẫu âm thanh trong 1 giây) hàng nghìn lần chỉ với 2-3 dòng lệnh ngắn gọn.",
          "Vì ngôn ngữ lập trình cấm viết nhiều hơn 10 dòng code.",
          "Để giải phóng màn hình hiển thị."
        ],
        ans: 1,
        exp: "Nếu không có vòng lặp, để xử lý 1 giây âm thanh chuẩn 16kHz bạn phải copy-paste 16,000 dòng code giống hệt nhau. Vòng lặp 'for (int i = 0; i < 16000; i++)' giúp máy tính thực thi siêu tốc chỉ trong vài mili-giây."
      },
      {
        id: "prog-l1-04",
        level: 1,
        tierName: "Nhập Môn Lập Trình",
        cat: "prog-beginner",
        topic: "Mảng & Chỉ Số Index 0",
        q: "Một mảng gồm 5 phần tử: danh_sach = ['A', 'B', 'C', 'D', 'E']. Trong hầu hết ngôn ngữ lập trình (C++, Python, JS), phần tử đầu tiên 'A' và phần tử cuối cùng 'E' nằm ở vị trí chỉ số (index) nào?",
        opts: [
          "Đầu tiên là index 1, cuối cùng là index 5.",
          "Đầu tiên là index 0, cuối cùng là index 4.",
          "Đầu tiên là index 0, cuối cùng là index 5.",
          "Đầu tiên là index -1, cuối cùng là index 1."
        ],
        ans: 1,
        exp: "Quy ước vàng trong khoa học máy tính là 'Zero-based Indexing' (đánh số từ 0). Vị trí 0 là độ lệch (offset) từ đầu mảng: phần tử 1 ở index 0, phần tử 5 ở index 4. Cố truy cập index 5 sẽ gây lỗi văng chương trình (Index Out of Bounds)!"
      },
      {
        id: "prog-l1-05",
        level: 1,
        tierName: "Nhập Môn Lập Trình",
        cat: "prog-beginner",
        topic: "Hàm & Tham Số (Functions)",
        q: "'Hàm' (Function) trong lập trình đóng vai trò gì giống như trong đời sống hàng ngày?",
        opts: [
          "Giống như một chiếc máy xay sinh tố: Nhận nguyên liệu đầu vào (tham số input), thực hiện xay nhuyễn (xử lý logic), và rót ra ly sinh tố (kết quả trả về return output).",
          "Giống như một bức tranh treo tường chỉ để ngắm chứ không thể chạy.",
          "Là một phần cứng cắm thêm vào bo mạch chủ máy tính.",
          "Là tên của người tạo ra hệ điều hành Windows."
        ],
        ans: 0,
        exp: "Hàm giúp đóng gói một công việc cụ thể (ví dụ hàm `tinh_do_lech_am_thanh(tin_hieu)`). Bất cứ lúc nào cần, bạn chỉ việc 'gọi tên hàm' và truyền dữ liệu vào thay vì phải viết lại toàn bộ công thức toán học."
      },
      {
        id: "prog-l1-06",
        level: 1,
        tierName: "Nhập Môn Lập Trình",
        cat: "prog-beginner",
        topic: "Bộ Nhớ Stack vs Heap",
        q: "Khi một chương trình máy tính hoạt động, bộ nhớ RAM được chia làm hai vùng chính là Stack và Heap. Sự khác biệt trực quan nhất giữa chúng là gì?",
        opts: [
          "Stack là bộ nhớ dùng để xem video, Heap là bộ nhớ dùng để nghe nhạc.",
          "Stack như chồng đĩa (ngăn nắp, siêu nhanh, tự động dọn dẹp khi hàm chạy xong); còn Heap như kho chứa đồ tự do (rộng lớn, linh hoạt nhưng lập trình viên phải chú ý dọn rác, nếu quên sẽ gây tràn bộ nhớ).",
          "Stack chỉ hoạt động khi tắt nguồn máy tính.",
          "Heap là bộ nhớ ngoài gắn qua cổng USB."
        ],
        ans: 1,
        exp: "Biến số cục bộ nhỏ gọn nằm ở vùng Stack sẽ tự biến mất khi hàm kết thúc. Những khối dữ liệu lớn (như file âm thanh hay mô hình AI) được cấp phát ở vùng Heap; nếu chương trình cấp phát liên tục mà quên giải phóng sẽ gây ra lỗi rò rỉ bộ nhớ (Memory Leak)."
      },
      {
        id: "prog-l1-07",
        level: 1,
        tierName: "Nhập Môn Lập Trình",
        cat: "prog-beginner",
        topic: "Bắt Lỗi & Ngoại Lệ (Try/Catch)",
        q: "Khối lệnh 'try ... catch' (hoặc try ... except trong Python) được thiết kế nhằm mục đích cứu nguy gì cho phần mềm?",
        opts: [
          "Để làm mã nguồn trông chuyên nghiệp hơn dù không có tác dụng gì.",
          "Bao bọc đoạn code có thể xảy ra sự cố (như chia cho số 0, mất mạng, file không tồn tại); nếu có lỗi xảy ra thì 'bắt lấy' và xử lý êm đẹp thay vì làm ứng dụng bị văng (crash) tắt phụt.",
          "Để tăng tốc độ CPU lên gấp đôi.",
          "Để tự động dịch code sang tiếng Anh."
        ],
        ans: 1,
        exp: "Trong phần mềm thương mại và ngân hàng, ứng dụng không bao giờ được phép tự tắt ngang khi gặp lỗi. Khối `try/catch` giúp hệ thống bắt được sự cố và thông báo lịch sự cho người dùng, bảo đảm an toàn dữ liệu."
      },
      {
        id: "prog-l1-08",
        level: 1,
        tierName: "Nhập Môn Lập Trình",
        cat: "prog-beginner",
        topic: "Hệ Nhị Phân & Byte",
        q: "Tại sao tận cùng bên trong máy tính, mọi hình ảnh, âm thanh và dòng chữ đều được quy đổi về các con số 0 và 1 (Hệ nhị phân Binary)?",
        opts: [
          "Vì các bóng bán dẫn (Transistor) trong vi mạch điện tử vật lý chỉ có 2 trạng thái cơ bản: Có điện (Bật - 1) và Không có điện (Tắt - 0).",
          "Vì bàn phím máy tính thời xưa chỉ có 2 phím bấm 0 và 1.",
          "Vì toán học quốc tế cấm dùng các số từ 2 đến 9 trong máy tính.",
          "Vì số 0 và 1 tốn ít diện tích trên màn hình hơn."
        ],
        ans: 0,
        exp: "Phần cứng máy tính được cấu tạo từ hàng tỷ bóng bán dẫn silicon siêu nhỏ. Hai trạng thái đóng/ngắt dòng điện tương ứng hoàn hảo với 0 và 1. Gom 8 số nhị phân lại ta được 1 Byte (chứa được 256 giá trị từ 0 đến 255), nền tảng của mọi dữ liệu số."
      },
      {
        id: "prog-l1-09",
        level: 1,
        tierName: "Nhập Môn Lập Trình",
        cat: "prog-beginner",
        topic: "Toán Tử So Sánh vs Phép Gán",
        q: "Trong hầu hết các ngôn ngữ lập trình (C++, Python, JS), lỗi kinh điển nào sau đây giữa dấu '=' và '==' khiến chương trình chạy sai logic một cách âm thầm?",
        opts: [
          "Dấu '=' dùng để GÁN giá trị (vd: a = 10 đặt giá trị 10 vào a), còn dấu '==' dùng để SO SÁNH bằng (vd: if (a == 10) kiểm tra xem a có bằng 10 không); viết 'if (a = 10)' sẽ vô tình biến phép kiểm tra thành phép gán luôn đúng!",
          "Dấu '=' dùng cho số nguyên, còn '==' bắt buộc chỉ dùng cho chuỗi ký tự.",
          "Dấu '==' làm máy tính chạy nhanh gấp đôi dấu '='.",
          "Hai dấu này hoàn toàn giống nhau, viết cái nào cũng được."
        ],
        ans: 0,
        exp: "Phép gán `=` đưa dữ liệu vào ô nhớ; phép so sánh `==` đặt câu hỏi đúng/sai. Lỗi gõ nhầm `if (diem = 10)` thay vì `if (diem == 10)` là chiếc bẫy mà mọi lập trình viên tập sự đều từng mắc phải!"
      },
      {
        id: "prog-l1-10",
        level: 1,
        tierName: "Nhập Môn Lập Trình",
        cat: "prog-beginner",
        topic: "Toán Tử Logic Ghép Điều Kiện",
        q: "Một ngân hàng quy định: 'Để được mở tài khoản trực tuyến, khách hàng phải từ 18 tuổi trở lên VÀ phải có Căn cước công dân gắn chip'. Biểu thức logic nào sau đây thể hiện chính xác quy định này?",
        opts: [
          "tuoi >= 18 || co_cccd == true",
          "tuoi >= 18 && co_cccd == true",
          "!(tuoi >= 18) && co_cccd == false",
          "tuoi == 18 && co_cccd == false"
        ],
        ans: 1,
        exp: "Toán tử `&&` (AND) yêu cầu CẢ HAI điều kiện đều phải đúng đồng thời thì kết quả chung mới đúng. Toán tử `||` (OR) chỉ cần MỘT TRONG HAI điều kiện đúng là chấp nhận."
      },
      {
        id: "prog-l1-11",
        level: 1,
        tierName: "Nhập Môn Lập Trình",
        cat: "prog-beginner",
        topic: "Chuỗi Ký Tự & Phép Nối Chuỗi",
        q: "Trong JavaScript hoặc Python, nếu bạn thực hiện phép tính: `ket_qua = \"10\" + \"20\"`, máy tính sẽ in ra kết quả gì và tại sao?",
        opts: [
          "In ra 30 vì máy tính tự động cộng hai số lại với nhau.",
          "In ra \"1020\" vì hai giá trị nằm trong dấu ngoặc kép là chuỗi ký tự (String), dấu '+' đối với chuỗi sẽ thực hiện phép 'ghép chữ' (Concatenation) nối đuôi nhau chứ không phải phép cộng toán học.",
          "Báo lỗi chương trình vì chữ không thể cộng với chữ.",
          "In ra số 200 vì dấu '+' bị chuyển thành dấu nhân."
        ],
        ans: 1,
        exp: "Phân biệt cốt lõi: Con số `10` có thể tính toán số học; nhưng chuỗi `\"10\"` là dòng chữ. `\"10\" + \"20\"` giống như ghép chữ \"Hà\" + \"Nội\" thành \"HàNội\", cho ra `\"1020\"`. Muốn cộng ra 30 phải chuyển đổi sang số nguyên `parseInt(\"10\") + parseInt(\"20\")`."
      },
      {
        id: "prog-l1-12",
        level: 1,
        tierName: "Nhập Môn Lập Trình",
        cat: "prog-beginner",
        topic: "Kiểu Logic Boolean",
        q: "Kiểu dữ liệu Boolean (được đặt theo tên nhà toán học George Boole) chỉ có thể nhận đúng 2 giá trị nào sau đây?",
        opts: [
          "Yes và No.",
          "True (Đúng) và False (Sai).",
          "0 và 100.",
          "Positive và Negative."
        ],
        ans: 1,
        exp: "Boolean là kiểu dữ liệu cơ bản nhất trong khoa học máy tính, chỉ nhận `True` hoặc `False`. Mọi quyết định rẽ nhánh trong cấu trúc `if/else` đều dựa trên kết quả Boolean của biểu thức điều kiện."
      },
      {
        id: "prog-l1-13",
        level: 1,
        tierName: "Nhập Môn Lập Trình",
        cat: "prog-beginner",
        topic: "Bẫy Vòng Lặp Vô Tận",
        q: "Đoạn code sau đây bị lỗi nghiêm trọng nào khiến ứng dụng bị đơ treo (Freeze) và CPU chạy 100%?\nint i = 0;\nwhile (i < 5) {\n    printf(\"Xin chao\\n\");\n    // Quen khong viet i++;\n}",
        opts: [
          "Do hàm printf không in được tiếng Việt.",
          "Do biến i bắt đầu từ 0.",
          "Vòng lặp vô tận (Infinite Loop): Vì biến i luôn luôn bằng 0 (nhỏ hơn 5), điều kiện 'i < 5' mãi mãi đúng nên máy tính in liên tục không bao giờ dừng lại.",
          "Do thiếu dấu chấm phẩy ở dòng 1."
        ],
        ans: 2,
        exp: "Vòng lặp `while` cần có một bước biến đổi biến đếm (như `i++` hoặc `i = i + 1`) để tiến dần tới lúc điều kiện sai và thoát lặp. Quên tăng biến đếm sẽ tạo ra vòng lặp vô tận làm treo đơ chương trình."
      },
      {
        id: "prog-l1-14",
        level: 1,
        tierName: "Nhập Môn Lập Trình",
        cat: "prog-beginner",
        topic: "Khái Niệm Null & Lỗi Huyền Thoại",
        q: "Trong lập trình, giá trị 'Null' (hoặc None trong Python, nil trong Go) khác với số 0 và chuỗi rỗng \"\" như thế nào?",
        opts: [
          "Null là một số nguyên rất lớn vượt quá 1 tỷ.",
          "Số 0 là chiếc hộp có chứa số 0, chuỗi rỗng là chiếc hộp chứa tờ giấy trắng; còn 'Null' là hoàn toàn KHÔNG CÓ chiếc hộp nào cả (con trỏ trỏ vào vùng nhớ rỗng). Cố đọc dữ liệu từ Null sẽ gây lỗi kinh điển 'NullPointerException'!",
          "Null giống hệt số 0, chỉ khác cách viết hoa.",
          "Null là một lệnh dùng để xóa toàn bộ ổ cứng."
        ],
        ans: 1,
        exp: "Tỷ phú Tony Hoare (người phát minh ra con trỏ Null năm 1965) từng gọi đây là 'Sai lầm tỷ đô' (Billion-dollar mistake) vì hàng triệu lỗi sập ứng dụng trong lịch sử phần mềm đều bắt nguồn từ việc truy cập thuộc tính của một biến mang giá trị Null."
      },
      {
        id: "prog-l1-15",
        level: 1,
        tierName: "Nhập Môn Lập Trình",
        cat: "prog-beginner",
        topic: "Tầm Vực Biến Cục Bộ vs Toàn Cục",
        q: "Nếu một biến `x = 5` được tạo ra BÊN TRONG thân của một hàm, thì đoạn code nằm BÊN NGOÀI hàm đó có thể đọc hoặc sửa giá trị của `x` được không?",
        opts: [
          "Được thoải mái, bất kỳ dòng code nào trong file cũng truy cập được biến đó.",
          "Không được, vì `x` là biến cục bộ (Local Variable) có tầm vực (Scope) giới hạn bên trong hàm; khi hàm chạy xong thì `x` sẽ tự động bị xóa khỏi bộ nhớ Stack.",
          "Chỉ đọc được vào ban ngày.",
          "Phải khởi động lại máy tính mới đọc được."
        ],
        ans: 1,
        exp: "Nguyên tắc đóng gói và bảo vệ tầm vực (Scope): Biến cục bộ sinh ra trong hàm và chết đi khi hàm kết thúc. Điều này ngăn chặn việc các hàm khác vô tình sửa nhầm biến của nhau gây lỗi dây chuyền."
      },
      {
        id: "prog-l1-16",
        level: 1,
        tierName: "Nhập Môn Lập Trình",
        cat: "prog-beginner",
        topic: "Ép Kiểu Dữ Liệu",
        q: "Khi người dùng nhập số tuổi của họ từ bàn phím vào ô nhập liệu (Input field), dữ liệu nhận được thường ở dạng chuỗi (String) ví dụ `\"25\"`. Để tính được tuổi vào năm sau, lập trình viên bắt buộc phải làm gì?",
        opts: [
          "Cứ để nguyên chuỗi và thực hiện `\"25\" + 1` để được `26`.",
          "Phải 'Ép kiểu' (Type Casting/Parsing) chuỗi `\"25\"` sang kiểu số nguyên (Integer) thành số `25`, sau đó mới thực hiện phép toán cộng `25 + 1 = 26`.",
          "Đổi màu chữ trên màn hình thành màu xanh.",
          "Xóa ô nhập liệu và bắt người dùng gõ lại bằng tay."
        ],
        ans: 1,
        exp: "Máy tính xem mọi ký tự người dùng gõ từ bàn phím là ký tự chữ (String). Nếu không ép kiểu sang số nguyên qua các hàm như `int(\"25\")` hoặc `parseInt(\"25\")`, phép cộng `\"25\" + 1` sẽ cho ra chuỗi ghép chữ \"251\" thay vì tuổi 26!"
      },
      {
        id: "prog-l1-17",
        level: 1,
        tierName: "Nhập Môn Lập Trình",
        cat: "prog-beginner",
        topic: "Nghệ Thuật Debug & Gỡ Lỗi",
        q: "Tại sao lập trình viên chuyên nghiệp khi tìm lỗi phần mềm (Bug) thường đặt các 'Điểm dừng' (Breakpoint) hoặc in log (`console.log`, `print`) thay vì ngồi đoán mò?",
        opts: [
          "Để làm ứng dụng hiển thị thêm các dòng chữ màu mè cho đẹp mắt.",
          "Giúp 'đóng băng' thời gian thực thi của chương trình tại từng dòng code để tận mắt soi rõ giá trị của các biến trong RAM tại từng thời điểm, phát hiện chính xác dòng code nào làm sai lệch logic.",
          "Vì luật công nghệ thông tin bắt buộc phải in log ra màn hình.",
          "Để kiểm tra tốc độ chuột và bàn phím."
        ],
        ans: 1,
        exp: "Thuật ngữ 'Bug' bắt nguồn từ việc một con bướm đêm (con bọ) bay vào kẹt trong rơ-le máy tính tính toán Harvard Mark II năm 1947. Debugging (diệt bọ) bằng Breakpoint cho phép bạn 'chụp X-quang' dòng chảy dữ liệu của chương trình từng mili-giây."
      },
      {
        id: "prog-l1-18",
        level: 1,
        tierName: "Nhập Môn Lập Trình",
        cat: "prog-beginner",
        topic: "Cấu Trúc Dữ Liệu Hàng Đợi vs Ngăn Xếp",
        q: "Hàng đợi (Queue) hoạt động theo nguyên lý 'Vào trước - Ra trước' (FIFO: First-In First-Out). Ví dụ thực tế nào sau đây trong hệ thống công nghệ thông tin hoạt động theo nguyên lý Hàng đợi?",
        opts: [
          "Chồng sách xếp lên nhau: quyển nào đặt lên sau cùng sẽ được lấy ra đầu tiên.",
          "Hàng đợi in tài liệu máy in: nhân viên nào gửi lệnh in trước sẽ được máy in tài liệu trước, người gửi sau phải xếp hàng đợi in theo đúng thứ tự.",
          "Nút bấm Back (quay lại trang trước) trên trình duyệt web.",
          "Ngăn chứa đạn của khẩu súng lục."
        ],
        ans: 1,
        exp: "Xếp hàng mua vé xem phim hay hàng đợi in ấn là FIFO (First-In, First-Out): đến trước phục vụ trước. Ngược lại, chồng đĩa hay ngăn đạn là LIFO (Last-In, First-Out) - đây chính là cấu trúc của bộ nhớ Stack và nút Back trình duyệt!"
      },
      {
        id: "prog-l1-19",
        level: 1,
        tierName: "Nhập Môn Lập Trình",
        cat: "prog-beginner",
        topic: "Biên Dịch vs Thông Dịch",
        q: "Sự khác biệt căn bản giữa ngôn ngữ 'Biên dịch' (như C++, Rust) và ngôn ngữ 'Thông dịch' (như Python, JavaScript) là gì?",
        opts: [
          "Ngôn ngữ biên dịch dịch toàn bộ mã nguồn một lần duy nhất thành file mã máy nhị phân (.exe) để chạy trực tiếp siêu tốc; còn ngôn ngữ thông dịch có một phần mềm đọc và dịch từng dòng lệnh tại thời điểm chạy (runtime).",
          "Ngôn ngữ thông dịch chỉ dùng được khi có mạng Internet.",
          "Ngôn ngữ biên dịch không thể dùng để viết phần mềm có màu sắc.",
          "Hai khái niệm này hoàn toàn giống nhau."
        ],
        ans: 0,
        exp: "Trình biên dịch (Compiler) giống như dịch trọn vẹn cả cuốn sách sang tiếng Việt rồi in ấn phát hành (người đọc đọc siêu nhanh). Trình thông dịch (Interpreter) giống như một thông dịch viên dịch cabin từng câu nói trực tiếp (linh hoạt, dễ thử nghiệm nhưng tốn thêm thời gian dịch tại chỗ)."
      },
      {
        id: "prog-l1-20",
        level: 1,
        tierName: "Nhập Môn Lập Trình",
        cat: "prog-beginner",
        topic: "Độ Phức Tạp Thuật Toán Big-O",
        q: "Tại sao truy cập một phần tử trong mảng qua chỉ số `danh_sach[3]` có độ phức tạp thời gian là O(1) (tức thời), trong khi tìm một người theo tên trong danh bạ 1,000,000 người chưa sắp xếp lại có độ phức tạp O(N)?",
        opts: [
          "Vì số 3 ngắn hơn số 1,000,000.",
          "Với chỉ số mảng, máy tính tính ngay được địa chỉ ô nhớ bằng phép toán `dia_chi_goc + 3 * kich_thuoc_o_nho` (1 phép tính là ra ngay); còn tìm theo tên chưa sắp xếp, trường hợp xấu nhất máy tính phải lật kiểm tra đủ 1,000,000 người từ đầu đến cuối.",
          "Vì tên người khó đọc hơn số thứ tự.",
          "Do mạng viễn thông giới hạn tốc độ tìm kiếm."
        ],
        ans: 1,
        exp: "O(1) nghĩa là dù mảng có 10 phần tử hay 10 tỷ phần tử, thời gian truy cập qua index vẫn là 1 phép tính toán địa chỉ tức thời. O(N) nghĩa là nếu dữ liệu tăng gấp 10 lần thì thời gian tìm kiếm cũng tăng tương ứng gấp 10 lần."
      }
    ,
{
      "id": "prog-l1-21",
      "level": 1,
      "tierName": "Nhập Môn Lập Trình",
      "cat": "prog-beginner",
      "topic": "Đệ Quy & Điều Kiện Cơ Sở (Recursion)",
      "q": "Trong lập trình, 'Hàm đệ quy' (Recursive Function) được hiểu đơn giản là hàm như thế nào và tại sao nó BẮT BUỘC phải có 'Điều kiện dừng' (Base Case)?",
      "opts": [
            "Hàm đệ quy là hàm tự gọi lại chính nó; nếu không có điều kiện dừng (Base Case), hàm sẽ gọi lặp lại mãi mãi dẫn đến cạn kiệt bộ nhớ ngăn xếp (Stack Overflow) làm chương trình bị sập ngay lập tức.",
            "Hàm đệ quy là hàm dùng để tăng tốc độ phần cứng máy tính lên gấp đôi.",
            "Đệ quy chỉ hoạt động trên mạng Internet, không chạy được trên máy tính cá nhân.",
            "Hàm đệ quy bắt buộc phải xóa toàn bộ biến sau khi chạy xong."
      ],
      "ans": 0,
      "exp": "Hãy tưởng tượng đệ quy như búp bê Nga Matryoshka: bên trong một con búp bê lại có một con búp bê nhỏ hơn. Điều kiện cơ sở (Base Case) chính là con búp bê nhỏ nhất trong cùng - điểm dừng để không mở tiếp nữa. Thiếu điểm dừng này, máy tính sẽ bị tràn bộ nhớ ngăn xếp (Stack Overflow Error)."
},
{
      "id": "prog-l1-22",
      "level": 1,
      "tierName": "Nhập Môn Lập Trình",
      "cat": "prog-beginner",
      "topic": "Bảng Băm & Tra Cứu Tức Thời (Hash Table / Map)",
      "q": "Cấu trúc dữ liệu Bảng băm (Hash Table / Dictionary / Map trong JavaScript & Python) lưu dữ liệu theo cặp Khóa - Giá trị (Key-Value) mang lại ưu thế vượt trội gì về tốc độ so với Mảng thông thường?",
      "opts": [
            "Bảng băm cho phép tra cứu, thêm và xóa phần tử gần như tức thời với độ phức tạp thời gian trung bình là O(1) nhờ hàm băm (Hash function) tính thẳng địa chỉ ô nhớ thay vì phải duyệt tuần tự từ đầu đến cuối O(N).",
            "Bảng băm giúp tiết kiệm 100% dung lượng ổ cứng so với mảng.",
            "Bảng băm chỉ dùng để lưu trữ file video và bài hát.",
            "Bảng băm tự động sửa lỗi chính tả trong mã nguồn."
      ],
      "ans": 0,
      "exp": "Tìm số điện thoại trong danh bạ: Nếu dùng Mảng, bạn phải lật từng trang từ đầu (O(N)). Nhưng nếu dùng Bảng băm, bạn gõ tên 'Nam' -> Hàm băm tính ra ngay trang 45 -> Lật mở tức thì trong 1 thao tác (O(1)). Đây là nền tảng của mọi hệ thống tra cứu cơ sở dữ liệu tốc độ cao."
},
{
      "id": "prog-l1-23",
      "level": 1,
      "tierName": "Nhập Môn Lập Trình",
      "cat": "prog-beginner",
      "topic": "Cây Tìm Kiếm Nhị Phân (Binary Search Tree)",
      "q": "Cấu trúc Cây tìm kiếm nhị phân (Binary Search Tree - BST) sắp xếp các nút con theo quy tắc cốt lõi nào giúp tối ưu tốc độ tìm kiếm?",
      "opts": [
            "Mọi nút con bên trái luôn có giá trị NHỎ HƠN nút cha, còn nút con bên phải luôn có giá trị LỚN HƠN nút cha; giúp loại bỏ một nửa số phần tử sau mỗi lần rẽ nhánh O(log N).",
            "Mọi nút con đều phải có cùng một giá trị như nhau.",
            "Các nút con được xếp ngẫu nhiên không theo quy tắc nào.",
            "Cây nhị phân chỉ chứa được tối đa 2 phần tử trong toàn bộ hệ thống."
      ],
      "ans": 0,
      "exp": "Giống trò chơi đoán số từ 1 đến 100: Nếu số bí mật là 70, bạn đoán 50 -> người đối diện bảo 'Lớn hơn' -> bạn loại bỏ ngay 50 số đầu tiên. Cây BST áp dụng quy tắc này: Nhánh trái nhỏ hơn, nhánh phải lớn hơn, giúp tốc độ tìm kiếm đạt O(log N) - nền tảng của chỉ mục Index B-Tree trong CSDL!"
},
{
      "id": "prog-l1-24",
      "level": 1,
      "tierName": "Nhập Môn Lập Trình",
      "cat": "prog-beginner",
      "topic": "Bất Biến vs Khả Biến (Immutability vs Mutability)",
      "q": "Trong lập trình hiện đại và an ninh phần mềm, tại sao việc sử dụng biến 'Bất biến' (Immutable - khai báo bằng `const`, dữ liệu không thể bị sửa đổi sau khi tạo) lại được khuyến khích mạnh mẽ?",
      "opts": [
            "Ngăn chặn các lỗi vô tình bị ghi đè dữ liệu ở các hàm khác (Side effects) và đảm bảo an toàn tuyệt đối khi nhiều luồng xử lý cùng truy cập dữ liệu đồng thời (Thread-safe).",
            "Để máy tính tự động khóa bàn phím không cho người dùng gõ phím nữa.",
            "Vì biến bất biến không tốn dung lượng RAM của máy tính.",
            "Để mã nguồn tự động biến thành file văn bản PDF."
      ],
      "ans": 0,
      "exp": "Nếu biến là 'Khả biến' (Mutable), một đoạn code ở tận trang 500 có thể âm thầm thay đổi giá trị tài khoản mà bạn không hề hay biết (Bug tiềm ẩn). Dữ liệu 'Bất biến' (Immutable) như một bản hợp đồng đã ký và đóng dấu: Muốn có dữ liệu mới thì phải tạo một bản sao mới, giữ cho lịch sử dữ liệu luôn trong sạch và an toàn."
},
{
      "id": "prog-l1-25",
      "level": 1,
      "tierName": "Nhập Môn Lập Trình",
      "cat": "prog-beginner",
      "topic": "Lập Trình Bất Đồng Bộ & Luồng Xử Lý (Async / Await)",
      "q": "Tại sao trong ứng dụng web hiện đại, chúng ta phải dùng lập trình 'Bất đồng bộ' (Asynchronous với `async / await` hoặc `Promise`) khi đọc file âm thanh hay gọi dữ liệu từ máy chủ?",
      "opts": [
            "Để chương trình không bị 'đơ' (không chặn luồng thực thi chính - Non-blocking); người dùng vẫn có thể click nút bấm, cuộn trang trong lúc máy tính chờ tải file từ mạng trong nền.",
            "Để ép buộc máy tính phải tắt màn hình khi đang tải dữ liệu.",
            "Vì hệ điều hành cấm thực hiện nhiều hơn một phép tính trong 1 giây.",
            "Để máy tính chạy ngược thời gian."
      ],
      "ans": 0,
      "exp": "Tưởng tượng bạn vào nhà hàng gọi món: 'Đồng bộ' (Synchronous) là phục vụ đứng im chờ đầu bếp nấu xong 30 phút mới đi phục vụ bàn khác (cả quán bị đơ). 'Bất đồng bộ' (Async) là đưa cho bạn thẻ rung, phục vụ đi tiếp đón khách khác, khi đồ ăn xong thẻ rung lên (Promise resolved). Giao diện luôn mượt mà!"
}
    ],

    // -------------------------------------------------------------------
    // LEVEL 2: NỀN TẢNG CƠ SỞ DỮ LIỆU & SQL (14 Câu hỏi bảng, khóa, ACID, Index)
    // -------------------------------------------------------------------
    level2: [
      {
        id: "prog-l2-01",
        level: 2,
        tierName: "Nền Tảng CSDL",
        cat: "prog-db-basic",
        topic: "Khái Niệm Bảng & Bản Ghi",
        q: "Trong Cơ sở dữ liệu quan hệ (RDBMS như MySQL, PostgreSQL), khái niệm 'Bảng' (Table), 'Cột' (Column/Field) và 'Hàng' (Row/Record) tương ứng với cái gì trong thực tế?",
        opts: [
          "Bảng giống một trang tính Excel; Cột định nghĩa thuộc tính (Họ tên, Số điện thoại); còn mỗi Hàng là thông tin đầy đủ của một đối tượng cụ thể (một người dùng duy nhất).",
          "Cột là một file Word, Hàng là một file ảnh, Bảng là thư mục ngoài Desktop.",
          "Bảng chỉ chứa được tối đa 10 dòng chữ.",
          "Mỗi Hàng chỉ chứa được một ký tự duy nhất."
        ],
        ans: 0,
        exp: "CSDL quan hệ lưu trữ dữ liệu có cấu trúc cực kỳ trực quan giống bảng tính: Bảng `NguoiDung` có các cột (id, ho_ten, so_dien_thoai); mỗi khi có một khách hàng đăng ký, hệ thống thêm một Hàng (Row/Record) mới vào bảng."
      },
      {
        id: "prog-l2-02",
        level: 2,
        tierName: "Nền Tảng CSDL",
        cat: "prog-db-basic",
        topic: "Khóa Chính (Primary Key)",
        q: "'Khóa chính' (Primary Key - PK) trong một bảng cơ sở dữ liệu có 2 tính chất bắt buộc nào sau đây?",
        opts: [
          "Phải luôn luôn là chữ in hoa và bắt buộc có chứa số 9.",
          "Phải có giá trị DUY NHẤT (không trùng lặp giữa các hàng) và KHÔNG ĐƯỢC RỖNG (NOT NULL), dùng để định danh phân biệt chính xác từng bản ghi.",
          "Có thể trùng nhau thoải mái giữa các hàng.",
          "Phải đổi mới sau mỗi 24 giờ."
        ],
        ans: 1,
        exp: "Giống như Số Căn cước công dân (CCCD) trong đời thực: không bao giờ có 2 công dân chung một số CCCD, và không ai được phép không có số. Khóa chính giúp CSDL truy tìm chính xác 1 bản ghi duy nhất trong hàng triệu dòng."
      },
      {
        id: "prog-l2-03",
        level: 2,
        tierName: "Nền Tảng CSDL",
        cat: "prog-db-basic",
        topic: "Khóa Ngoại & Quan Hệ 1:N",
        q: "Để liên kết bảng `KhachHang` với bảng `CuocGoi` (1 khách hàng có thể thực hiện nhiều cuộc gọi khác nhau), người ta dùng giải pháp nào?",
        opts: [
          "Viết toàn bộ lịch sử cuộc gọi dồn vào một ô duy nhất trong bảng KhachHang.",
          "Đặt một cột 'Khóa ngoại' (Foreign Key) ví dụ `id_khach_hang` nằm bên trong bảng `CuocGoi`, tham chiếu đến Khóa chính của bảng `KhachHang`.",
          "Tạo ra 100 bảng KhachHang giống hệt nhau.",
          "Xóa bớt các cuộc gọi cũ để bảng không bị phình to."
        ],
        ans: 1,
        exp: "Đây là mối quan hệ 1 - Nhiều (1:N) kinh điển. Bảng `CuocGoi` lưu cột khóa ngoại `khach_hang_id`. Nhờ đó, một khách hàng có thể gọi 1,000 cuộc mà không cần nhân bản thông tin cá nhân của họ lặp lại 1,000 lần."
      },
      {
        id: "prog-l2-04",
        level: 2,
        tierName: "Nền Tảng CSDL",
        cat: "prog-db-basic",
        topic: "Thao Tác Dữ Liệu SQL & Bẫy WHERE",
        q: "Lệnh SQL nào sau đây nếu vô tình chạy mà quên viết mệnh đề `WHERE` sẽ gây ra 'thảm họa' xóa sạch toàn bộ dữ liệu trong bảng `TaiKhoan`?",
        opts: [
          "SELECT * FROM TaiKhoan;",
          "DELETE FROM TaiKhoan;",
          "INSERT INTO TaiKhoan VALUES (...);",
          "COUNT(*) FROM TaiKhoan;"
        ],
        ans: 1,
        exp: "Bẫy kinh điển của mọi lập trình viên mới: `DELETE FROM TaiKhoan WHERE id = 10;` chỉ xóa tài khoản số 10. Nhưng nếu quên `WHERE`, CSDL sẽ hiểu là bạn muốn xóa TẤT CẢ các hàng trong bảng!"
      },
      {
        id: "prog-l2-05",
        level: 2,
        tierName: "Nền Tảng CSDL",
        cat: "prog-db-basic",
        topic: "Phép Kết Nối Bảng (JOIN)",
        q: "Sự khác biệt căn bản giữa phép kết nối `INNER JOIN` và `LEFT JOIN` khi truy vấn dữ liệu từ 2 bảng liên kết là gì?",
        opts: [
          "`INNER JOIN` chỉ lấy những bản ghi có cặp khớp ở CẢ HAI bảng; còn `LEFT JOIN` sẽ giữ lại TOÀN BỘ bản ghi ở bảng bên trái ngay cả khi bảng bên phải chưa có dữ liệu tương ứng.",
          "`INNER JOIN` chạy chậm hơn `LEFT JOIN` 1000 lần.",
          "`LEFT JOIN` chỉ dùng được trên máy tính đặt ở bên trái phòng làm việc.",
          "Hai phép nối này là từ đồng nghĩa, kết quả trả về luôn giống hệt nhau."
        ],
        ans: 0,
        exp: "Ví dụ: `KhachHang LEFT JOIN CuocGoi` sẽ liệt kê tất cả khách hàng, kể cả những người mới đăng ký và CHƯA từng thực hiện cuộc gọi nào (cột cuộc gọi sẽ hiện giá trị `NULL`). `INNER JOIN` sẽ bỏ qua những khách hàng chưa từng gọi."
      },
      {
        id: "prog-l2-06",
        level: 2,
        tierName: "Nền Tảng CSDL",
        cat: "prog-db-basic",
        topic: "Tính Chất ACID Trong Giao Dịch",
        q: "Trong các hệ thống ngân hàng, chữ 'A' (Atomicity - Tính nguyên tử) trong bộ tiêu chuẩn ACID đảm bảo điều gì khi thực hiện chuyển tiền từ tài khoản A sang B?",
        opts: [
          "Tiền phải được chuyển bằng năng lượng nguyên tử hạt nhân.",
          "Giao dịch là một khối thống nhất: Hoặc là CẢ HAI bước (trừ tiền A và cộng tiền B) đều thành công, hoặc nếu có sự cố mất điện giữa chừng thì hệ thống tự HỦY TOÀN BỘ (Rollback) về trạng thái ban đầu, không bao giờ có chuyện A bị trừ tiền mà B không nhận được.",
          "Chỉ cho phép chuyển số tiền chia hết cho 10.",
          "Cho phép trừ tiền A trước, 3 ngày sau cộng tiền B."
        ],
        ans: 1,
        exp: "Tính nguyên tử (All-or-Nothing): Một giao dịch ngân hàng gồm nhiều thao tác SQL nhỏ. Nếu bước 1 thành công nhưng bước 2 sập mạng, CSDL sẽ tự động đảo ngược giao dịch (Rollback) để bảo vệ số dư tài sản của khách hàng."
      },
      {
        id: "prog-l2-07",
        level: 2,
        tierName: "Nền Tảng CSDL",
        cat: "prog-db-basic",
        topic: "Chỉ Mục (Index B-Tree)",
        q: "Tạo 'Index' (Chỉ mục) trên một cột cơ sở dữ liệu giống như tạo cuốn 'Mục lục' ở cuối sách. Lợi ích lớn nhất và cái giá phải trả khi lạm dụng Index là gì?",
        opts: [
          "Giúp tìm kiếm dữ liệu siêu tốc từ O(N) về O(log N); nhưng cái giá phải trả là tốn thêm dung lượng ổ đĩa và làm chậm các thao tác thêm mới/sửa (INSERT, UPDATE) vì CSDL phải cập nhật lại cây mục lục.",
          "Làm cho dữ liệu tự động dịch sang tiếng Việt; nhưng làm màn hình bị mờ.",
          "Không có bất kỳ nhược điểm nào, nên tạo Index trên toàn bộ các cột trong bảng.",
          "Index chỉ giúp tăng dung lượng đĩa chứ không tăng tốc độ truy vấn."
        ],
        ans: 0,
        exp: "Nếu không có mục lục, tìm một từ khóa trong cuốn sách 1,000 trang bạn phải lật từng trang (Full Table Scan O(N)). Index cấu trúc dạng cây B-Tree cho phép tìm thấy trang sách chỉ sau vài phép so sánh O(log N), nhưng mỗi khi chèn thêm trang sách mới thì phải sắp xếp lại mục lục."
      },
      {
        id: "prog-l2-08",
        level: 2,
        tierName: "Nền Tảng CSDL",
        cat: "prog-db-basic",
        topic: "Chuẩn Hóa Dữ Liệu (Normalization)",
        q: "Mục tiêu tối thượng của việc 'Chuẩn hóa dữ liệu' (1NF, 2NF, 3NF) khi thiết kế lược đồ cơ sở dữ liệu là gì?",
        opts: [
          "Làm cho bảng dữ liệu có càng nhiều cột trùng lặp càng tốt để dự phòng.",
          "Loại bỏ dữ liệu dư thừa, đảm bảo tính toàn vẹn và ngăn chặn các bất thường (Anomalies) khi cập nhật hoặc xóa dữ liệu.",
          "Ép buộc mọi dữ liệu phải được lưu dưới dạng số nhị phân 0 và 1.",
          "Đổi tên tất cả các bảng thành chữ viết tắt."
        ],
        ans: 1,
        exp: "Nếu địa chỉ chi nhánh ngân hàng bị lưu lặp lại ở 10,000 dòng tài khoản khách hàng, khi chi nhánh đổi địa chỉ bạn phải cập nhật 10,000 lần (dễ sót và sai lệch). Tách thành bảng `ChiNhanh` riêng biệt giúp cập nhật 1 nơi duy nhất là toàn hệ thống đồng bộ ngay lập tức."
      },
      {
        id: "prog-l2-09",
        level: 2,
        tierName: "Nền Tảng CSDL",
        cat: "prog-db-basic",
        topic: "Hàm Gom Nhóm GROUP BY & Aggregate",
        q: "Để đếm xem mỗi khách hàng đã thực hiện bao nhiêu cuộc gọi trong tháng, mệnh đề SQL nào sau đây kết hợp với hàm `COUNT()` là chính xác?",
        opts: [
          "ORDER BY khach_hang_id",
          "GROUP BY khach_hang_id",
          "JOIN khach_hang_id",
          "DISTINCT khach_hang_id"
        ],
        ans: 1,
        exp: "Mệnh đề `GROUP BY` gom các dòng có cùng giá trị của cột chỉ định thành các nhóm riêng biệt, cho phép các hàm tổng hợp như `COUNT()`, `SUM()`, `AVG()` tính toán trên từng nhóm đó."
      },
      {
        id: "prog-l2-10",
        level: 2,
        tierName: "Nền Tảng CSDL",
        cat: "prog-db-basic",
        topic: "Phân Biệt HAVING vs WHERE",
        q: "Trong truy vấn SQL có gom nhóm `GROUP BY`, sự khác biệt căn bản giữa điều kiện lọc `WHERE` và điều kiện lọc `HAVING` là gì?",
        opts: [
          "`WHERE` lọc từng dòng dữ liệu trước khi gom nhóm; còn `HAVING` lọc trên kết quả đã được gom nhóm tính toán tổng hợp (ví dụ: HAVING COUNT(*) > 5).",
          "`HAVING` chạy trước `WHERE` 1 giây.",
          "`WHERE` chỉ lọc số, `HAVING` chỉ lọc chữ.",
          "Hai từ khóa này hoàn toàn giống nhau, thay thế cho nhau được."
        ],
        ans: 0,
        exp: "Quy tắc vàng: `WHERE` không thể dùng với các hàm tổng hợp (không thể viết `WHERE COUNT(*) > 5`). Muốn lọc các nhóm sau khi đã đếm hoặc tính tổng, bắt buộc phải dùng mệnh đề `HAVING`."
      },
      {
        id: "prog-l2-11",
        level: 2,
        tierName: "Nền Tảng CSDL",
        cat: "prog-db-basic",
        topic: "Khóa Phức Hợp (Composite Key)",
        q: "Trong bảng liên kết quan hệ Nhiều - Nhiều (N:N) như bảng `SinhVien_MonHoc`, tại sao người ta thường dùng 'Khóa chính phức hợp' (Composite Primary Key) gồm cả 2 cột `(sinh_vien_id, mon_hoc_id)`?",
        opts: [
          "Để máy tính cho phép 1 sinh viên đăng ký trùng lặp 1 môn học 100 lần.",
          "Để đảm bảo cặp giá trị (sinh_vien_id, mon_hoc_id) là duy nhất, ngăn chặn tình trạng 1 sinh viên bị đăng ký trùng lặp 2 lần vào cùng 1 môn học.",
          "Vì CSDL không cho phép bảng chỉ có 1 cột khóa chính.",
          "Để mã hóa tên sinh viên thành mật mã."
        ],
        ans: 1,
        exp: "Khóa phức hợp (Composite Key) là sự kết hợp của 2 hoặc nhiều cột để cùng nhau tạo nên tính định danh duy nhất cho một dòng dữ liệu, bảo đảm tính toàn vẹn quan hệ trong bảng trung gian."
      },
      {
        id: "prog-l2-12",
        level: 2,
        tierName: "Nền Tảng CSDL",
        cat: "prog-db-basic",
        topic: "Ràng Buộc Toàn Vẹn Dữ Liệu (Constraints)",
        q: "Trong bảng tài khoản ngân hàng `TaiKhoan`, ràng buộc toàn vẹn nào sau đây ngăn chặn triệt để lỗi số dư tài khoản bị âm (`so_du < 0`) ngay tại tầng cơ sở dữ liệu?",
        opts: [
          "Ràng buộc `CHECK (so_du >= 0)`",
          "Ràng buộc `DEFAULT 0`",
          "Ràng buộc `FOREIGN KEY`",
          "Ràng buộc `AUTO_INCREMENT`"
        ],
        ans: 0,
        exp: "Ràng buộc `CHECK` kiểm tra tính hợp lệ của dữ liệu trước khi ghi xuống đĩa. Bất kỳ lệnh INSERT hoặc UPDATE nào cố tình gán số dư âm sẽ bị CSDL từ chối ngay lập tức, bảo vệ tuyệt đối nguồn vốn ngân hàng."
      },
      {
        id: "prog-l2-13",
        level: 2,
        tierName: "Nền Tảng CSDL",
        cat: "prog-db-basic",
        topic: "Điểm Lưu Trạng Thái (Savepoint) & Rollback",
        q: "Khi một giao dịch chuyển tiền gồm 5 bước phức tạp, kỹ thuật `SAVEPOINT` trong SQL cho phép lập trình viên làm điều gì khi bước thứ 4 xảy ra sự cố?",
        opts: [
          "Hủy bỏ toàn bộ máy chủ cơ sở dữ liệu.",
          "Khôi phục (`ROLLBACK TO SAVEPOINT`) trở về đúng điểm kiểm tra ở bước 3 thay vì phải hủy bỏ toàn bộ từ đầu, sau đó thử lại hoặc ghi nhận lỗi linh hoạt.",
          "Tự động chuyển tiền gấp đôi cho khách hàng.",
          "Xóa mật khẩu của người quản trị."
        ],
        ans: 1,
        exp: "`SAVEPOINT` giống như các điểm Checkpoint lưu game: khi nhân vật gặp sự cố ở màn 4, bạn có thể hồi sinh lại ở điểm Checkpoint gần nhất thay vì phải chơi lại từ màn 1."
      },
      {
        id: "prog-l2-14",
        level: 2,
        tierName: "Nền Tảng CSDL",
        cat: "prog-db-basic",
        topic: "CSDL Quan Hệ (SQL) vs Phi Quan Hệ (NoSQL)",
        q: "Khi nào một kỹ sư phần mềm nên chọn CSDL Quan hệ (như PostgreSQL) và khi nào nên chọn CSDL Khóa - Giá trị / Tài liệu (như Redis, MongoDB)?",
        opts: [
          "Chọn PostgreSQL khi dữ liệu cần tính toàn vẹn cấu trúc chặt chẽ và giao dịch ACID (như số dư ngân hàng); chọn Redis/MongoDB khi cần đọc/ghi siêu tốc phi cấu trúc hoặc lưu bộ đệm tạm thời (Cache).",
          "SQL chỉ dùng cho máy tính cũ, NoSQL bắt buộc cho mọi hệ thống hiện đại.",
          "NoSQL không cần lưu dữ liệu trên ổ đĩa.",
          "Hai loại CSDL này giống hệt nhau, chỉ khác tên thương mại."
        ],
        ans: 0,
        exp: "Không có giải pháp vạn năng. Các hệ thống lớn như DeepGuard phối hợp cả hai: PostgreSQL cho hồ sơ định danh và giao dịch pháp lý FIPS, kết hợp Redis in-memory cache cho luồng âm thanh viễn thông tốc độ cao dưới 350ms."
      }
    ,
{
      "id": "prog-l2-15",
      "level": 2,
      "tierName": "Nền Tảng CSDL",
      "cat": "prog-db-basic",
      "topic": "Tấn Công SQL Injection & Prepared Statements",
      "q": "Lỗ hổng bảo mật khét tiếng 'SQL Injection' (chèn mã SQL độc hại) phát sinh từ nguyên nhân cốt lõi nào và lập trình viên phải phòng chống triệt để bằng cách nào?",
      "opts": [
            "Do nối chuỗi trực tiếp dữ liệu do người dùng nhập vào câu lệnh SQL; phòng chống bằng cách sử dụng Tham số hóa truy vấn (Prepared Statements / Parameterized Queries) để CSDL tách bạch hoàn toàn giữa Lệnh thực thi và Dữ liệu thô.",
            "Do máy chủ CSDL bị nhiễm virus qua email; phòng chống bằng cách cài phần mềm diệt virus.",
            "Do dùng cổng mạng 3306; phòng chống bằng cách đổi sang cổng mạng 8080.",
            "Do bảng dữ liệu có quá nhiều cột; phòng chống bằng cách giảm bớt số cột."
      ],
      "ans": 0,
      "exp": "Nếu bạn viết: `SELECT * FROM User WHERE name = '` + input + `'`, kẻ tấn công nhập `' OR '1'='1` làm biến đổi toàn bộ cấu trúc logic câu lệnh! Khi dùng Prepared Statements (`WHERE name = $1`), CSDL coi toàn bộ input chỉ là một chuỗi ký tự đơn thuần, vô hiệu hóa 100% việc chèn mã lệnh độc hại."
},
{
      "id": "prog-l2-16",
      "level": 2,
      "tierName": "Nền Tảng CSDL",
      "cat": "prog-db-basic",
      "topic": "Truy Vấn Con (Subquery) vs Bảng Tạm CTE (WITH ... AS)",
      "q": "Khi xây dựng các câu truy vấn báo cáo tài chính hoặc pháp y nhiều tầng, tại sao kỹ thuật CTE (Common Table Expression - sử dụng cú pháp `WITH ... AS`) lại được ưa chuộng hơn Subquery lồng nhau?",
      "opts": [
            "CTE chia nhỏ các bước logic phức tạp thành từng bảng tạm có đặt tên rõ ràng, giúp code đọc tuần tự từ trên xuống dưới như một câu chuyện, dễ bảo trì và có thể tái sử dụng nhiều lần trong cùng câu lệnh.",
            "CTE tự động xóa dữ liệu sau khi truy vấn xong.",
            "Subquery chỉ dùng được trên máy tính 32-bit.",
            "CTE bắt buộc phải có ít nhất 100 dòng lệnh mới chạy được."
      ],
      "ans": 0,
      "exp": "Subquery lồng 4-5 tầng ngoặc đơn giống như một mê cung khó đọc và khó debug. CTE với cú pháp `WITH DanhSachNghiVan AS (...), TongHopGiaoDich AS (...) SELECT ...` giúp module hóa câu lệnh SQL thành từng phần trong sáng, dễ đọc và tối ưu hiệu quả xử lý."
},
{
      "id": "prog-l2-17",
      "level": 2,
      "tierName": "Nền Tảng CSDL",
      "cat": "prog-db-basic",
      "topic": "Hành Vi Khóa Ngoại: CASCADE vs SET NULL vs RESTRICT",
      "q": "Khi thiết lập ràng buộc Khóa ngoại (FOREIGN KEY), tùy chọn `ON DELETE CASCADE` khác gì với `ON DELETE RESTRICT` khi bản ghi ở bảng cha (Parent Table) bị xóa?",
      "opts": [
            "`ON DELETE CASCADE` sẽ tự động xóa sạch toàn bộ các bản ghi con liên quan; trong khi `ON DELETE RESTRICT` sẽ chặn đứng lệnh xóa và báo lỗi nếu vẫn còn bản ghi con đang tham chiếu tới.",
            "`CASCADE` chỉ xóa vào ban đêm, còn `RESTRICT` xóa vào ban ngày.",
            "`RESTRICT` sẽ sao lưu dữ liệu ra ổ đĩa di động.",
            "Hai tùy chọn này có hành vi hoàn toàn giống hệt nhau."
      ],
      "ans": 0,
      "exp": "Trong hệ thống pháp y và ngân hàng, quy tắc bất di bất dịch là KHÔNG dùng `CASCADE` bừa bãi! Nếu xóa một Khách hàng mà dùng `CASCADE`, toàn bộ Lịch sử cuộc gọi và Nhật ký giao dịch chứng cứ sẽ bị xóa sạch! `RESTRICT` bảo vệ toàn vẹn: Không cho xóa Khách hàng khi hồ sơ pháp lý vẫn còn tồn tại."
},
{
      "id": "prog-l2-18",
      "level": 2,
      "tierName": "Nền Tảng CSDL",
      "cat": "prog-db-basic",
      "topic": "Bảng Ảo (View) vs Bảng Vật Lý Hóa (Materialized View)",
      "q": "Trong các hệ thống phân tích dữ liệu lớn, điểm khác biệt sống còn giữa 'View' thông thường và 'Materialized View' là gì?",
      "opts": [
            "View thông thường chỉ lưu câu lệnh SQL và tính toán lại từ đầu mỗi khi được gọi; Materialized View lưu sẵn kết quả tính toán vật lý lên đĩa/RAM, cho phép đọc tức thì mà không phải tính lại, chỉ cần làm mới (REFRESH) định kỳ.",
            "View chỉ hiển thị được số, Materialized View chỉ hiển thị được chữ.",
            "View được lưu trên đám mây, Materialized View lưu trên USB.",
            "Materialized View tự động xóa dữ liệu sau 1 giờ."
      ],
      "ans": 0,
      "exp": "Một câu truy vấn tổng hợp 50 triệu bản ghi âm thanh tốn 15 giây: Nếu dùng View thường, mỗi lần mở trang web người dùng phải đợi 15 giây. Dùng Materialized View, hệ thống tính sẵn vào lúc 0h sáng và lưu lại; người dùng truy vấn ra ngay kết quả trong 2 mili-giây!"
},
{
      "id": "prog-l2-19",
      "level": 2,
      "tierName": "Nền Tảng CSDL",
      "cat": "prog-db-basic",
      "topic": "Đồng Thời (Concurrency) & Hiện Tượng Khóa Chết (Deadlock)",
      "q": "Hiện tượng 'Khóa chết' (Deadlock) giữa các giao dịch đồng thời trong CSDL xảy ra trong tình huống nào?",
      "opts": [
            "Xảy ra khi Giao dịch 1 giữ Khóa A và đang chờ Khóa B; đồng thời Giao dịch 2 giữ Khóa B và đang chờ Khóa A; cả hai bị kẹt cứng vĩnh viễn chờ nhau cho đến khi CSDL phát hiện và buộc phải hủy (Rollback) một bên.",
            "Xảy ra khi dây cáp mạng kết nối vào máy chủ CSDL bị đứt.",
            "Xảy ra khi người dùng gõ sai mật khẩu quản trị viên quá 3 lần.",
            "Xảy ra khi bảng dữ liệu vượt quá dung lượng 10 Gigabyte."
      ],
      "ans": 0,
      "exp": "Deadlock giống như hai chiếc xe đi vào một con hẻm hẹp đối đầu nhau: Không ai chịu lùi, cả hai đứng im mãi mãi. CSDL có cơ chế 'Deadlock Detector': Khi phát hiện vòng tròn chờ đợi (Circular Wait), nó sẽ đóng vai trò cảnh sát giao thông, cưỡng chế hủy một giao dịch (Victim Rollback) để giao dịch kia tiếp tục."
},
{
      "id": "prog-l2-20",
      "level": 2,
      "tierName": "Nền Tảng CSDL",
      "cat": "prog-db-basic",
      "topic": "Kế Hoạch Thực Thi Truy Vấn (EXPLAIN ANALYZE)",
      "q": "Khi một câu lệnh SQL chạy chậm bất thường, câu lệnh `EXPLAIN ANALYZE` trong PostgreSQL / MySQL cung cấp cho kỹ sư thông tin quan trọng nào?",
      "opts": [
            "Cung cấp cây kế hoạch thực thi chi tiết của bộ tối ưu hóa: Thời gian chạy thực tế của từng bước, chi phí (Cost), và cho biết CSDL quét theo Quét tuần tự (Seq Scan) hay dùng Chỉ mục (Index Scan).",
            "Tự động viết lại toàn bộ mã nguồn của trang web.",
            "Gửi email báo cáo sự cố đến hãng sản xuất máy tính.",
            "Tự động tăng dung lượng RAM cho máy chủ."
      ],
      "ans": 0,
      "exp": "Muốn chữa bệnh phải chụp X-quang: `EXPLAIN ANALYZE` chính là ảnh chụp X-quang của câu truy vấn. Nếu thấy dòng chữ `Seq Scan on CuocGoi (cost=0..120000)`, bạn biết ngay bảng chưa có Index và CSDL đang phải đọc từng dòng trong hàng chục triệu bản ghi!"
},
{
      "id": "prog-l2-21",
      "level": 2,
      "tierName": "Nền Tảng CSDL",
      "cat": "prog-db-basic",
      "topic": "Hàm Cửa Sổ (Window Functions: ROW_NUMBER, RANK)",
      "q": "Hàm cửa sổ (Window Functions như `ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...)`) mang lại sức mạnh gì vượt trội so với lệnh gom nhóm `GROUP BY`?",
      "opts": [
            "Cho phép thực hiện các phép tính toán tổng hợp, xếp hạng hoặc đánh số thứ tự trên một tập hàng (Window) nhưng vẫn GIỮ NGUYÊN từng dòng dữ liệu chi tiết ban đầu mà không bị gộp lại thành 1 dòng.",
            "Tự động tạo ra một cửa sổ popup đồ họa trên màn hình máy tính.",
            "Hàm cửa sổ chỉ chạy được trên hệ điều hành Microsoft Windows.",
            "Giúp câu lệnh SQL tự động chạy lặp lại 100 lần."
      ],
      "ans": 0,
      "exp": "Khi dùng `GROUP BY chi_nhanh`, 1000 nhân viên biến thành 5 dòng tổng hợp chi nhánh (mất chi tiết từng người). Khi dùng `ROW_NUMBER() OVER (PARTITION BY chi_nhanh ORDER BY doanh_so DESC)`, hệ thống giữ nguyên 1000 nhân viên kèm theo cột số thứ tự xếp hạng từ 1 đến N trong từng chi nhánh!"
},
{
      "id": "prog-l2-22",
      "level": 2,
      "tierName": "Nền Tảng CSDL",
      "cat": "prog-db-basic",
      "topic": "Bộ Kích Hoạt Tự Động (Triggers) Trong Giám Sát CSDL",
      "q": "Trong các hệ thống giám định pháp y và bảo mật ngân hàng, 'Trigger' (Bộ kích hoạt) thường được sử dụng cho mục đích nào sau đây?",
      "opts": [
            "Tự động chụp lại trạng thái dữ liệu cũ và mới vào Bảng Nhật Ký Kiểm Toán (Audit Trail Log) ngay khi có bất kỳ sự kiện INSERT, UPDATE hoặc DELETE nào diễn ra trên bảng nhạy cảm.",
            "Tự động khởi động lại máy chủ khi có người đăng nhập.",
            "Tự động xóa tài khoản của người dùng khi họ không hoạt động sau 5 phút.",
            "Phát âm thanh báo động qua loa máy tính khi có lỗi cú pháp."
      ],
      "ans": 0,
      "exp": "Trong chứng cứ số, nguyên tắc 'Bất khả chối từ' (Non-repudiation) là sống còn. Trigger nằm ngay ở tầng CSDL: Dù quản trị viên hay hacker có dùng công cụ gì can thiệp vào bảng `TaiKhoan`, Trigger cũng âm thầm kích hoạt và ghi một bản sao bằng chứng vào bảng `Audit_Log` bất biến!"
},
{
      "id": "prog-l2-23",
      "level": 2,
      "tierName": "Nền Tảng CSDL",
      "cat": "prog-db-basic",
      "topic": "Phân Vùng Bảng (Table Partitioning)",
      "q": "Khi một bảng nhật ký cuộc gọi âm thanh tích lũy lên tới hàng trăm triệu bản ghi, kỹ thuật Phân vùng bảng theo thời gian (Range Partitioning by Month) giải quyết vấn đề hiệu năng như thế nào?",
      "opts": [
            "Chia một bảng khổng lồ thành nhiều phân vùng vật lý độc lập theo từng tháng; khi truy vấn tháng gần nhất, CSDL chỉ quét đúng phân vùng đó (Partition Pruning), tăng tốc độ truy vấn gấp nhiều lần và dễ dàng lưu trữ/xóa dữ liệu cũ.",
            "Nén toàn bộ bảng thành một file văn bản Notepad duy nhất.",
            "Chuyển bảng dữ liệu sang máy tính của người dùng.",
            "Ngăn không cho người dùng thêm dữ liệu mới vào bảng."
      ],
      "ans": 0,
      "exp": "Thay vì để 500 triệu cuộc gọi vào 1 kho duy nhất, bạn chia thành 12 kho nhỏ theo từng tháng. Khi cảnh sát điều tra cuộc gọi của 'Tháng 11', CSDL tự động kích hoạt cơ chế loại trừ (Partition Pruning) - chỉ mở đúng kho Tháng 11 và bỏ qua 11 kho còn lại, giúp tốc độ phản hồi cực nhanh!"
},
{
      "id": "prog-l2-24",
      "level": 2,
      "tierName": "Nền Tảng CSDL",
      "cat": "prog-db-basic",
      "topic": "Bể Kết Nối CSDL (Database Connection Pooling)",
      "q": "Tại sao trong ứng dụng ngân hàng và tổng đài viễn thông tốc độ cao, backend bắt buộc phải dùng Connection Pool (như HikariCP, PgBouncer) thay vì mở kết nối mới mỗi khi có cuộc gọi?",
      "opts": [
            "Vì việc khởi tạo kết nối TCP mới, bắt tay TLS và xác thực với CSDL rất tốn tài nguyên và thời gian (50-100ms); Connection Pool duy trì sẵn các kết nối mở để tái sử dụng ngay lập tức trong vài micro-giây.",
            "Vì máy chủ CSDL chỉ cho phép duy nhất một người kết nối mỗi ngày.",
            "Để ngăn chặn việc máy tính bị quá nhiệt.",
            "Vì giao thức TCP không thể truyền được dữ liệu chữ viết."
      ],
      "ans": 0,
      "exp": "Mỗi cuộc gọi đến mà tạo kết nối mới thì giống như mỗi lần đi taxi bạn lại bắt tài xế đi mua một chiếc xe mới! Bể kết nối (Connection Pool) giống như một đội xe taxi đậu sẵn trước sảnh: Khách đến là lên xe chạy ngay (vài micro-giây), dùng xong trả xe lại bể để người khác dùng tiếp!"
}
    ],

    // -------------------------------------------------------------------
    // LEVEL 3: CƠ SỞ DỮ LIỆU CHUYÊN SÂU CỦA CHƯƠNG TRÌNH DEEPGUARD ENTERPRISE
    // -------------------------------------------------------------------
    level3: [
      {
        id: "prog-l3-01",
        level: 3,
        tierName: "CSDL Chuyên Sâu DeepGuard",
        cat: "prog-db-deepguard",
        topic: "Vector Database & Biometrics",
        q: "Trong hệ sinh thái DeepGuard AI Enterprise, giọng nói của khách hàng KHÔNG được lưu dưới dạng file ghi âm thô (WAV/MP3) trong CSDL thông thường vì lý do quyền riêng tư. Thay vào đó, hệ thống lưu trữ dữ liệu sinh trắc học vào CSDL Vector (Vector DB như pgvector, Milvus) dưới dạng gì?",
        opts: [
          "Lưu dưới dạng chuỗi văn bản lời thoại đã được nhận dạng chính tả.",
          "Lưu dưới dạng Vector Nhúng Đặc Trưng Âm Học nhiều chiều (Vector Embedding 192 hoặc 512 chiều trích xuất từ ECAPA-TDNN/Conformer) và dùng phép đo Cosine Similarity để so khớp trực giao 1:1.",
          "Lưu dưới dạng ảnh chụp phổ tần số kích thước 4K.",
          "Lưu dưới dạng tệp nén ZIP có mật khẩu 123456."
        ],
        ans: 1,
        exp: "Chuẩn ISO/IEC 19794 và bảo mật FIPS yêu cầu không lưu giọng nói thoại thô (tránh lộ thông tin nhạy cảm khi bị lộ lọt CSDL). DeepGuard bóc tách đặc trưng âm học dây thanh thành vector không thể đảo ngược 512-dim; CSDL Vector so sánh góc giữa 2 vector (Cosine Distance) để xác thực liveness trong <5ms."
      },
      {
        id: "prog-l3-02",
        level: 3,
        tierName: "CSDL Chuyên Sâu DeepGuard",
        cat: "prog-db-deepguard",
        topic: "Tìm Kiếm Vector HNSW vs Flat Index",
        q: "Khi ngân hàng có 10 triệu bản ghi vector sinh trắc học giọng nói, tại sao DeepGuard áp dụng cấu trúc chỉ mục HNSW (Hierarchical Navigable Small World) thay vì tìm kiếm phẳng Flat Index (Exact L2 Scan)?",
        opts: [
          "Vì Flat Index tiêu tốn quá ít điện năng của máy chủ.",
          "Flat Index phải tính khoảng cách với toàn bộ 10 triệu vector (độ phức tạp O(N)), gây trễ hàng giây; HNSW xây dựng đồ thị nhiều tầng phân cấp cho phép nhảy tìm kiếm láng giềng gần nhất xấp xỉ (ANN) trong thời gian siêu tốc O(log N) dưới 5ms.",
          "Vì HNSW chỉ chạy được trên hệ điều hành MacOS.",
          "HNSW tự động xóa bớt 50% khách hàng ít hoạt động để giảm tải."
        ],
        ans: 1,
        exp: "Để đáp ứng ngân sách độ trễ toàn trình dưới 350ms của cuộc gọi viễn thông, thời gian tìm kiếm danh tính sinh trắc học chỉ được phép chiếm tối đa 5-8ms. HNSW kết hợp cơ chế mạng thế giới nhỏ (Small World Graph) với phân tầng đa lớp, đạt độ chính xác tương đương 99.6% với độ trễ tối thiểu."
      },
      {
        id: "prog-l3-03",
        level: 3,
        tierName: "CSDL Chuyên Sâu DeepGuard",
        cat: "prog-db-deepguard",
        topic: "Time-Series DB (ClickHouse / TimescaleDB)",
        q: "DeepGuard giám định hàng triệu khung âm thanh 16kHz mỗi ngày, bóc tách các chỉ số vi mô (Jitter 5.5Hz micro-drift, Shimmer, RT60 Schroeder) theo từng mili-giây. Tại sao kiến trúc CSDL chuỗi thời gian dạng cột (Columnar Time-Series DB như ClickHouse) lại vượt trội hoàn toàn so với MySQL truyền thống trong tác vụ này?",
        opts: [
          "ClickHouse lưu trữ dữ liệu theo từng cột thay vì từng hàng, cho phép nén chuyên sâu (Double-Delta, Gorilla Compression) giảm 90% dung lượng đĩa và quét hàng tỷ phép đo âm học mỗi giây phục vụ phân tích pháp y viễn thông.",
          "Vì ClickHouse không cần kết nối mạng.",
          "Vì MySQL không hỗ trợ lưu trữ số thập phân có dấu âm.",
          "Vì ClickHouse tự động chuyển toàn bộ dữ liệu lên mạng xã hội."
        ],
        ans: 0,
        exp: "Dữ liệu âm học pháp y liên tục đổ về theo trục thời gian (Time-series). Việc đọc lướt một chỉ số Jitter để vẽ biểu đồ giám định trên CSDL hàng truyền thống sẽ phải tải toàn bộ dòng lên RAM, trong khi CSDL cột chỉ đọc đúng dữ liệu cột Jitter từ ổ đĩa NVMe với tốc độ quét hàng triệu dòng/giây."
      },
      {
        id: "prog-l3-04",
        level: 3,
        tierName: "CSDL Chuyên Sâu DeepGuard",
        cat: "prog-db-deepguard",
        topic: "FIPS 140-3 Chain of Custody & Append-Only",
        q: "Để hồ sơ giám định âm thanh gian lận ngân hàng có giá trị chứng cứ pháp lý tuyệt đối trước Tòa án (tuân thủ FIPS 140-3 và ISO/IEC 27037), cơ sở dữ liệu lưu vết của DeepGuard bắt buộc phải áp dụng nguyên tắc thiết kế nào?",
        opts: [
          "Cho phép Quản trị viên (DBA) tự do sửa đổi và xóa các bản ghi giám định cũ để tiết kiệm dung lượng đĩa cứng.",
          "Bảng dữ liệu chỉ cho phép chèn thêm (Append-Only Log), nghiêm cấm mọi lệnh UPDATE/DELETE, và mỗi bản ghi được liên kết băm SHA-256 vào cây Merkle Tree kèm dấu thời gian số RFC 3161 TSA bất biến.",
          "Lưu toàn bộ nhật ký bằng file Word không đặt mật khẩu.",
          "Mỗi tháng một lần xóa trắng toàn bộ dữ liệu."
        ],
        ans: 1,
        exp: "Khái niệm 'Chuỗi bằng chứng pháp y' (Chain of Custody): Bằng chứng số bị can thiệp dù chỉ 1 bit cũng sẽ bị Tòa án bác bỏ. Cơ chế Append-Only bảo đảm tính toàn vẹn; cây Merkle Hash và dấu thời gian chứng thực từ bên thứ ba (TSA) chứng minh biên bản giám định không bị chỉnh sửa hồi tố."
      },
      {
        id: "prog-l3-05",
        level: 3,
        tierName: "CSDL Chuyên Sâu DeepGuard",
        cat: "prog-db-deepguard",
        topic: "In-Memory Caching & 350ms Budget",
        q: "Trong quá trình phân tích cuộc gọi SIP/WebRTC theo thời gian thực, DeepGuard sử dụng Redis In-Memory Ring Buffer ở tầng trung gian trước khi ghi xuống đĩa nhằm mục đích gì?",
        opts: [
          "Để mã hóa cuộc gọi thành file MP3 phát cho khách hàng nghe.",
          "Tránh hiện tượng nghẽn cổ chai I/O đĩa cứng (Disk I/O Bottleneck), giữ các khung âm thanh 'in-flight' và điểm tin cậy trung gian trong bộ nhớ RAM tốc độ cao để đảm bảo toàn bộ luồng xử lý không vượt quá 350ms.",
          "Để sao lưu dữ liệu sang máy chủ nước ngoài.",
          "Để hiển thị quảng cáo trong cuộc gọi."
        ],
        ans: 1,
        exp: "Ghi đĩa cứng truyền thống có độ trễ dao động từ 5-20ms. Một luồng thoại gồm hàng trăm khung 20ms nếu đợi ghi đĩa tuần tự sẽ lập tức làm vỡ ngân sách viễn thông 350ms. Tầng Redis / Shared Memory Ring-Buffer cho phép xử lý không khóa (Lock-free) với độ trễ dưới 0.2ms."
      },
      {
        id: "prog-l3-06",
        level: 3,
        tierName: "CSDL Chuyên Sâu DeepGuard",
        cat: "prog-db-deepguard",
        topic: "Mức Độ Cô Lập SERIALIZABLE",
        q: "Khi hệ thống DeepGuard phát hiện đòn tấn công Deepfake mạo danh giám đốc ngân hàng để chuyển 50 tỷ đồng, luồng xử lý tự động kích hoạt giao dịch phong tỏa tài khoản. CSDL ngân hàng bắt buộc phải dùng mức cô lập giao dịch nào để ngăn chặn kẻ tấn công rút tiền song song cùng lúc (Race Condition)?",
        opts: [
          "Mức READ UNCOMMITTED (cho phép đọc dữ liệu bẩn).",
          "Mức SERIALIZABLE (Cô lập tuần tự hóa nghiêm ngặt nhất) với khóa hàng (Pessimistic Row Lock `SELECT ... FOR UPDATE`), bảo đảm thao tác phong tỏa tài khoản được ưu tiên độc quyền, triệt tiêu mọi rủi ro rút tiền đồng thời.",
          "Không dùng giao dịch, chỉ gửi thông báo qua email.",
          "Mức READ COMMITTED không khóa."
        ],
        ans: 1,
        exp: "Trong các đợt gian lận tài chính tốc độ cao, kẻ tấn công dùng bot bắn hàng trăm yêu cầu chuyển tiền cùng lúc (Race Condition). Mức cô lập `SERIALIZABLE` cùng khóa hàng ngăn chặn hoàn toàn hiện tượng 'Double Spending' (rút tiền 2 lần trước khi số dư bị phong tỏa)."
      },
      {
        id: "prog-l3-07",
        level: 3,
        tierName: "CSDL Chuyên Sâu DeepGuard",
        cat: "prog-db-deepguard",
        topic: "Multi-Master Sharding & Phân Vùng Dữ Liệu",
        q: "Hệ thống ngân hàng tiếp nhận 100,000 cuộc gọi thoại đồng thời vào giờ cao điểm. Chiến lược phân mảnh CSDL (Sharding Strategy) nào sau đây được DeepGuard ứng dụng để phân tán tải hiệu quả nhất?",
        opts: [
          "Gộp tất cả dữ liệu vào 1 bảng duy nhất không phân vùng.",
          "Phân vùng dữ liệu (Partitioning) theo khoảng thời gian (Timestamp range theo ngày/tháng) kết hợp kỹ thuật Sharding theo Khóa băm Mã Ngân Hàng Chi Nhánh (Consistent Hashing on Branch ID) trên cụm phân tán.",
          "Chỉ cho phép 100 người gọi cùng một lúc, các cuộc gọi khác bị ngắt kết nối.",
          "Lưu dữ liệu trên máy tính xách tay của giám định viên."
        ],
        ans: 1,
        exp: "Sharding bằng hàm băm nhất quán (Consistent Hashing) trên Branch ID phân bổ đều tải I/O sang hàng chục node CSDL mà không bị điểm nghẽn tập trung; kết hợp phân vùng theo thời gian giúp các truy vấn điều tra án lệ chỉ cần quét trên đúng phân vùng của ngày xảy ra vụ việc."
      },
      {
        id: "prog-l3-08",
        level: 3,
        tierName: "CSDL Chuyên Sâu DeepGuard",
        cat: "prog-db-deepguard",
        topic: "Mã Hóa Dữ Liệu Khi Nghỉ (Data at Rest) & FIPS 140-3 HSM",
        q: "Theo tiêu chuẩn bảo mật ngân hàng PCI-DSS và FIPS 140-3 Level 3, các bảng chứa Vector sinh trắc học và chứng thư số của DeepGuard khi nằm trên ổ đĩa lưu trữ (Data at Rest) bắt buộc phải được mã hóa như thế nào?",
        opts: [
          "Mã hóa bằng thuật toán Caesar dịch chuyển 3 ký tự.",
          "Mã hóa trong suốt CSDL (TDE - Transparent Data Encryption) sử dụng thuật toán đối xứng AES-256-GCM, và khóa mã hóa chính (Master Key) phải được lưu trữ trong thiết bị phần cứng bảo mật chuyên dụng HSM (Hardware Security Module) chống cạy phá vật lý.",
          "Lưu dữ liệu dạng văn bản thô (Plaintext) để người kiểm tra dễ đọc.",
          "Chỉ cần khóa cửa phòng đặt máy chủ bằng chìa khóa cơ học."
        ],
        ans: 1,
        exp: "FIPS 140-3 Level 3 quy định: Ngay cả khi tin tặc hoặc kẻ xấu đánh cắp vật lý ổ cứng máy chủ ngân hàng, toàn bộ các vector sinh trắc học giọng nói vẫn là các khối mã nhị phân vô nghĩa vì khóa giải mã nằm an toàn bên trong chip chống cạy phá HSM chuyên dụng."
      },
      {
        id: "prog-l3-09",
        level: 3,
        tierName: "CSDL Chuyên Sâu DeepGuard",
        cat: "prog-db-deepguard",
        topic: "Dempster-Shafer Conflict Logging",
        q: "Trong bảng lưu trữ nhật ký dung hợp bằng chứng `forensic_fusion_logs`, DeepGuard lưu lại các cột xác suất `m_vocoder`, `m_replay`, `m_acoustics` và hệ số xung đột $k$. Giá trị $k$ phản ánh điều gì và tại sao cần lưu lại trong CSDL?",
        opts: [
          "k phản ánh nhiệt độ của chip vi xử lý khi chạy mô hình.",
          "k phản ánh mức độ mâu thuẫn đối kháng giữa các nguồn chứng cứ (ví dụ: mô hình học sâu báo Giả nhưng âm học báo Thật); việc lưu k giúp chuyên gia giám định trưởng tái hiện chính xác lý do kích hoạt Hard Veto khi có khiếu nại tại tòa.",
          "k là số tiền thưởng cho người làm giám định.",
          "k là số lượng micro được kết nối vào hệ thống."
        ],
        ans: 1,
        exp: "Lý thuyết chứng cứ Dempster-Shafer: Khi xung đột $k \to 1.0$, hệ thống xảy ra nghịch lý Zadeh. Việc ghi lại chi tiết các giá trị $m_i$ và $k$ tại đúng thời điểm cuộc gọi là yêu cầu pháp lý bắt buộc để giải thích được 'Tại sao AI lại đưa ra phán quyết đó?' (Explainable AI)."
      },
      {
        id: "prog-l3-10",
        level: 3,
        tierName: "CSDL Chuyên Sâu DeepGuard",
        cat: "prog-db-deepguard",
        topic: "Quyền Riêng Tư & Xóa Dữ Liệu An Toàn",
        q: "Theo luật An ninh mạng và các quy định bảo vệ dữ liệu cá nhân (GDPR / Nghị định 13/2023/NĐ-CP), chính sách lưu giữ và tiêu hủy dữ liệu âm thanh của DeepGuard được triển khai như thế nào?",
        opts: [
          "Lưu trữ file âm thanh ghi âm thô vĩnh viễn trên CSDL công cộng.",
          "File âm thanh gốc sau 90 ngày phục vụ đối soát sẽ bị tiêu hủy an toàn bằng thuật toán ghi đè dữ liệu (Cryptographic Erasure / Zeroize); chỉ duy trì vĩnh viễn hàm băm SHA-256 bất biến và vector sinh trắc học đã mã hóa trong kho lưu trữ bằng chứng.",
          "Gửi toàn bộ file âm thanh qua ứng dụng nhắn tin cho khách hàng.",
          "Chỉ xóa dữ liệu khi có lệnh khởi tố từ tòa án."
        ],
        ans: 1,
        exp: "Nguyên tắc 'Tối thiểu hóa dữ liệu' (Data Minimization): Không lưu trữ dữ liệu giọng nói thô quá thời hạn cần thiết. Việc xóa an toàn (Zeroize) bằng cách ghi đè nhiều lần chống phục hồi dữ liệu ổ đĩa, trong khi hàm băm SHA-256 vẫn tồn tại để chứng minh tính hợp pháp của kết luận ban đầu."
      }
    ,
{
      "id": "prog-l3-11",
      "level": 3,
      "tierName": "CSDL Chuyên Sâu DeepGuard",
      "cat": "prog-db-deepguard",
      "topic": "Khoảng Cách Vector: Cosine vs Euclidean vs Dot Product",
      "q": "Khi so khớp hai vector nhúng đặc trưng giọng nói (Voice Embedding) đã được chuẩn hóa độ dài đơn vị (L2-Normalized, ||v|| = 1), phép đo Cosine Similarity tương đương với phép toán nào giúp tiết kiệm tối đa CPU/GPU?",
      "opts": [
            "Tương đương chính xác với phép Tích vô hướng (Dot Product / Inner Product: A • B); vì khi mẫu số ||A||*||B|| = 1, hệ thống loại bỏ hoàn toàn các phép tính căn bậc hai và phép chia đắt đỏ.",
            "Tương đương với việc ghép chuỗi văn bản hai vector lại với nhau.",
            "Tương đương với phép trừ hai số nguyên đơn giản.",
            "Không thể so sánh được vì hai phép toán hoàn toàn mâu thuẫn."
      ],
      "ans": 0,
      "exp": "Công thức Cosine Similarity: Cos(θ) = (A • B) / (||A||*||B||). Khi các vector nhúng (như ECAPA-TDNN 192 chiều) được chuẩn hóa L2 trước khi nạp vào CSDL, mẫu số bằng đúng 1! Phép so khớp triệu vector chuyển thành phép nhân ma trận Dot Product thuần túy (SIMD AVX-512 hoặc Tensor Core), đạt tốc độ sub-millisecond!"
},
{
      "id": "prog-l3-12",
      "level": 3,
      "tierName": "CSDL Chuyên Sâu DeepGuard",
      "cat": "prog-db-deepguard",
      "topic": "So Sánh Chỉ Mục Vector: HNSW vs IVFFlat",
      "q": "Tại sao trong kiến trúc đối soát sinh trắc học thời gian thực, DeepGuard ưu tiên cấu trúc đồ thị phân lớp HNSW hơn chỉ mục phân cụm IVFFlat?",
      "opts": [
            "HNSW duy trì độ chính xác truy hồi (Recall) trên 98% với độ trễ cực thấp (< 5ms) ngay cả khi dữ liệu liên tục được cập nhật thêm, không cần phải dừng hệ thống để huấn luyện lại cụm tâm (Centroids retraining) như IVFFlat.",
            "Vì IVFFlat chỉ lưu trữ được tối đa 10 vector.",
            "Vì HNSW không cần bộ nhớ RAM để hoạt động.",
            "Do IVFFlat là công nghệ cũ từ những năm 1970."
      ],
      "ans": 0,
      "exp": "IVFFlat chia không gian thành các cụm tâm (Voronoi cells). Khi thêm nhiều vector giọng nói mới phân bố lệch, các cụm tâm bị lỗi thời và buộc phải train lại (Retrain). HNSW xây dựng đồ thị Skip-List đa tầng động, cho phép thêm vector mới ngay lập tức mà vẫn đảm bảo tốc độ tìm kiếm lân cận gần đúng (ANN) xuất sắc."
},
{
      "id": "prog-l3-13",
      "level": 3,
      "tierName": "CSDL Chuyên Sâu DeepGuard",
      "cat": "prog-db-deepguard",
      "topic": "ClickHouse MergeTree & Chỉ Mục Thưa (Sparse Index)",
      "q": "Tại sao ClickHouse lại sử dụng 'Chỉ mục thưa' (Sparse Index - mặc định cứ 8192 dòng dữ liệu mới lưu 1 giá trị chỉ mục) cho bảng nhật ký âm học hàng tỷ dòng thay vì Chỉ mục dày (Dense Index)?",
      "opts": [
            "Chỉ mục thưa có kích thước cực kỳ nhỏ bé, toàn bộ cây chỉ mục của hàng tỷ bản ghi có thể nằm trọn vẹn trong bộ nhớ RAM, cho phép quét bỏ qua nhanh các khối dữ liệu (Data Skipping) mà không gây áp lực I/O lên ổ cứng.",
            "Vì ClickHouse không hỗ trợ ổ đĩa thể rắn SSD.",
            "Vì toán tử tìm kiếm chỉ mục dày bị cấm trong tiêu chuẩn SQL.",
            "Để làm cho CSDL chạy chậm lại phục vụ kiểm thử."
      ],
      "ans": 0,
      "exp": "Một bảng có 10 tỷ dòng log âm thanh: Nếu dùng Dense Index (mỗi dòng 1 con trỏ như B-Tree của MySQL/Postgres), dung lượng Index ngốn hàng trăm Gigabyte RAM! Sparse Index chỉ lưu giá trị đầu tiên của mỗi khối 8192 dòng, dung lượng chỉ vài chục Megabyte, nằm gọn trong L3 Cache/RAM và đọc cực nhanh."
},
{
      "id": "prog-l3-14",
      "level": 3,
      "tierName": "CSDL Chuyên Sâu DeepGuard",
      "cat": "prog-db-deepguard",
      "topic": "Sao Chép Bền Vững ReplicatedMergeTree Trong ClickHouse",
      "q": "Cơ chế `ReplicatedMergeTree` trong ClickHouse sử dụng dịch vụ điều phối nào để bảo đảm tính nhất quán dữ liệu sao chép giữa các nút máy chủ giám định pháp y?",
      "opts": [
            "Sử dụng ClickHouse Keeper (hoặc Apache ZooKeeper) để quản lý nhật ký sao chép phân tán (Replication Log), điều phối việc nén gộp dữ liệu (Parts Merge) và bảo đảm dữ liệu ghi trên một nút được nhân bản đồng bộ sang các nút dự phòng.",
            "Sử dụng mạng ngang hàng BitTorrent.",
            "Sử dụng tin nhắn SMS gửi giữa các máy chủ.",
            "Không cần cơ chế nào, dữ liệu tự động đồng bộ qua dây nguồn."
      ],
      "ans": 0,
      "exp": "ClickHouse Keeper đóng vai trò là 'trọng tài phân tán' nhẹ và tốc độ cao (thay thế ZooKeeper nặng nề). Khi một bản ghi âm học được ghi vào Nút 1, Keeper thông báo cho Nút 2 kéo đúng block dữ liệu đó về, bảo đảm khi một máy chủ bị sập nguồn, cụm vẫn hoạt động liên tục không mất 1 dòng log chứng cứ."
},
{
      "id": "prog-l3-15",
      "level": 3,
      "tierName": "CSDL Chuyên Sâu DeepGuard",
      "cat": "prog-db-deepguard",
      "topic": "Redis Sentinel & Cluster Bảo Toàn Ngân Sách 350ms",
      "q": "Để bảo toàn nghiêm ngặt ngân sách thời gian thực 350ms trong cuộc gọi ngân hàng, kiến trúc Redis in-memory của DeepGuard xử lý tình huống máy chủ Master bị sự cố như thế nào?",
      "opts": [
            "Hệ thống Redis Sentinel tự động phát hiện sự cố qua cơ chế giám sát nhịp tim (Heartbeat), lập tức tiến hành bầu chọn một máy chủ Replica lên làm Master mới (Failover tự động) chỉ trong 1-2 giây mà không cần can thiệp thủ công.",
            "Hệ thống sẽ tạm dừng toàn bộ cuộc gọi ngân hàng trong 24 giờ để kỹ thuật viên sửa chữa.",
            "Hệ thống tự động xóa toàn bộ dữ liệu giọng nói của khách hàng.",
            "Redis sẽ tự động gửi email cho cảnh sát."
      ],
      "ans": 0,
      "exp": "Trong cuộc gọi chống lừa đảo trực tiếp, mỗi 100ms chậm trễ có thể khiến khách hàng bấm chuyển tiền cho tội phạm. Kiến trúc Redis Sentinel với cơ chế Quorum (đa số phiếu bầu) giúp việc chuyển giao quyền lực từ Master lỗi sang Replica diễn ra chớp nhoáng, duy trì thông suốt luồng phân tích dưới 350ms."
},
{
      "id": "prog-l3-16",
      "level": 3,
      "tierName": "CSDL Chuyên Sâu DeepGuard",
      "cat": "prog-db-deepguard",
      "topic": "Đồ Thị Băm Merkle DAG & Chuỗi Bảo Quản Chứng Cứ FIPS",
      "q": "Trong cấu trúc đồ thị băm Merkle DAG bảo vệ Chuỗi bảo quản (Chain of Custody) của DeepGuard, nếu kẻ xấu xâm nhập database và sửa đổi dù chỉ 1 mili-giây âm thanh bằng chứng, điều gì sẽ xảy ra?",
      "opts": [
            "Mã băm SHA-256 của khối âm thanh đó sẽ thay đổi hoàn toàn, làm đổ vỡ toàn bộ chuỗi băm của các nút cha cho đến Root Hash trên đỉnh Merkle; hệ thống lập tức phát hiện và bác bỏ tính toàn vẹn của bằng chứng giả mạo.",
            "Hệ thống sẽ tự động chấp nhận dữ liệu bị sửa đổi mà không báo động.",
            "Tập tin âm thanh sẽ tự động phát ra tiếng kêu bíp.",
            "Mọi máy tính trong ngân hàng sẽ tự động tắt nguồn."
      ],
      "ans": 0,
      "exp": "Hiệu ứng thác đổ (Avalanche Effect) của hàm băm mật mã: Chỉ cần đổi 1 bit âm thanh từ 0 thành 1, mã băm SHA-256 thay đổi hoàn toàn. Cấu trúc Merkle DAG lồng ghép các mã băm vào nhau: Giống như một phong bì niêm phong đa tầng, không một ai (kể cả quản trị viên cấp cao) có thể sửa chứng cứ mà không để lại dấu vết."
},
{
      "id": "prog-l3-17",
      "level": 3,
      "tierName": "CSDL Chuyên Sâu DeepGuard",
      "cat": "prog-db-deepguard",
      "topic": "Bằng Chứng Không Tiết Lộ Tri Thức (Zero-Knowledge Proofs - ZKP)",
      "q": "Công nghệ Bằng chứng không tiết lộ tri thức (Zero-Knowledge Proofs - ZKP) được định hướng ứng dụng trong xác thực sinh trắc học giọng nói ngân hàng nhằm mục đích tối thượng nào?",
      "opts": [
            "Cho phép khách hàng chứng minh với máy chủ ngân hàng rằng 'Tôi sở hữu giọng nói khớp với mẫu sinh trắc học đã đăng ký' mà máy chủ KHÔNG CẦN BIẾT hoặc lưu trữ vector đặc trưng giọng nói thực tế của khách hàng.",
            "Để máy chủ có thể nghe trộm mọi cuộc trò chuyện xung quanh khách hàng.",
            "Để tăng dung lượng file âm thanh lên gấp 10 lần.",
            "Để bỏ qua hoàn toàn các bước nhập mật khẩu và mã OTP."
      ],
      "ans": 0,
      "exp": "Nguy cơ lớn nhất của sinh trắc học: Nếu mật khẩu bị lộ, bạn có thể đổi mật khẩu; nhưng nếu vector giọng nói bị lộ, bạn không thể 'đổi giọng nói' của mình được! ZKP giải quyết triệt để: Bạn chứng minh bạn là chính bạn thông qua bài toán mật mã học mà không để lộ một con số nào của vector sinh trắc học."
},
{
      "id": "prog-l3-18",
      "level": 3,
      "tierName": "CSDL Chuyên Sâu DeepGuard",
      "cat": "prog-db-deepguard",
      "topic": "Kiến Trúc Tách Biệt Đọc - Ghi CQRS Trong Pháp Y Âm Thanh",
      "q": "Kiến trúc CQRS (Command Query Responsibility Segregation) giải quyết bài toán xung đột tài nguyên giữa Ghi luồng âm thanh và Đọc báo cáo pháp y như thế nào?",
      "opts": [
            "Tách riêng mô hình Ghi (Command: ghi nhận hàng nghìn frame âm thanh/giây vào In-memory Cache / Kafka / ClickHouse) và mô hình Đọc (Query: truy vấn hồ sơ giám định từ các bảng View tối ưu sẵn), loại bỏ hoàn toàn hiện tượng tranh chấp khóa (Lock Contention).",
            "Ép buộc người dùng chỉ được đọc báo cáo vào cuối tuần.",
            "Chuyển toàn bộ dữ liệu ghi âm sang dạng đĩa mềm từ tính.",
            "Gộp chung tất cả các lệnh đọc và ghi vào một bảng duy nhất."
      ],
      "ans": 0,
      "exp": "Ghi luồng âm thanh đòi hỏi tốc độ cao và tuần tự (Append-only); Đọc báo cáo pháp y đòi hỏi tính toán JOIN và lọc phức tạp. Nếu chung 1 CSDL, các lệnh đọc nặng sẽ khóa bảng làm nghẽn luồng ghi âm thanh trực tiếp. CQRS tách đôi hai thế giới: Ghi riêng, Đọc riêng, đồng bộ bất đồng bộ qua Event Bus."
},
{
      "id": "prog-l3-19",
      "level": 3,
      "tierName": "CSDL Chuyên Sâu DeepGuard",
      "cat": "prog-db-deepguard",
      "topic": "Nhật Ký Ghi Trước WAL (Write-Ahead Logging)",
      "q": "Cơ chế Write-Ahead Logging (WAL) đảm bảo thuộc tính Bền vững (Durability trong ACID) của CSDL như thế nào khi máy chủ bị mất điện đột ngột?",
      "opts": [
            "Mọi thay đổi dữ liệu bắt buộc phải được ghi nối tiếp (Sequential Write) xuống file nhật ký WAL trên ổ đĩa trước khi dữ liệu chính được cập nhật trên các trang đĩa (Data Pages); khi máy chủ khởi động lại, CSDL phát lại WAL (Replay) để khôi phục toàn vẹn.",
            "WAL tự động cung cấp điện pin dự phòng cho máy tính trong 2 giờ.",
            "WAL xóa toàn bộ dữ liệu cũ để tránh xung đột.",
            "WAL gửi bản sao dữ liệu sang một máy chủ ở quốc gia khác."
      ],
      "ans": 0,
      "exp": "Ghi ngẫu nhiên vào các bảng dữ liệu rất chậm (Random I/O). CSDL giải quyết bằng cách: Ghi thật nhanh một dòng tóm tắt vào cuốn sổ nhật ký WAL tuần tự (Sequential I/O siêu tốc) và xác nhận thành công. Dù điện có phụt tắt ngay mili-giây sau đó, khi bật lại, CSDL chỉ cần mở sổ WAL ra làm lại chính xác những gì đã ghi!"
},
{
      "id": "prog-l3-20",
      "level": 3,
      "tierName": "CSDL Chuyên Sâu DeepGuard",
      "cat": "prog-db-deepguard",
      "topic": "NotebookLM RAG: Đối Chiếu Tri Thức Chống Ảo Giác Pháp Y",
      "q": "Trong điều tra giám định các cuộc gọi lừa đảo Deepfake ngân hàng tinh vi, việc tích hợp NotebookLM RAG (Retrieval-Augmented Generation) dựa trên Grounding mang lại giá trị cốt lõi gì cho hội đồng chuyên gia?",
      "opts": [
            "Mọi phán quyết và lập luận của AI đều được neo chặt (Grounding) với các tài liệu chuẩn (chuẩn viễn thông ITU-T, bằng chứng âm học ISO 3382, nhật ký giao dịch FIPS) và trích dẫn trực tiếp nguồn gốc, loại bỏ triệt để hiện tượng AI ảo giác (Hallucination) trước tòa án.",
            "Tự động tạo ra các bài thuyết trình hoạt hình vui nhộn.",
            "Thay thế hoàn toàn vai trò của các thẩm phán tại tòa án.",
            "Tự động gửi tiền bồi thường cho nạn nhân mà không cần xác minh."
      ],
      "ans": 0,
      "exp": "Trước tòa án, câu trả lời 'AI đoán thế' là vô giá trị. Với NotebookLM Grounding RAG: Khi AI kết luận 'Cuộc gọi này bị giả mạo bằng mô hình Conformer', nó trích dẫn chính xác: [Nguồn 1: Bảng băm gói tin viễn thông RTP jitter], [Nguồn 2: Tiêu chuẩn ITU-T G.711 mục 4.2]. Bằng chứng có xuất xứ kiểm chứng rõ ràng!"
}
    ]
  };

  // =====================================================================
  // 2. PROGRESSIVE ACADEMY ENGINE CLASS
  // =====================================================================

  
  // =====================================================================
  // AUTHENTIC LEARNING RESOURCES & REAL DOCUMENTATION (69 TOPICS)
  // =====================================================================
  const TOPIC_DOCS = {
    // --- LEVEL 1: NHẬP MÔN LẬP TRÌNH & TƯ DUY LOGIC ---
    "Biến & Kiểu Dữ Liệu": {
      title: "MDN Web Docs - JavaScript data types and data structures",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures",
      source: "Mozilla Developer Network (MDN)",
      tip: "Phân biệt Kiểu dữ liệu nguyên thủy (Primitive: Number, String, Boolean) và Kiểu tham chiếu (Object, Array)."
    },
    "Cấu Trúc Rẽ Nhánh If/Else": {
      title: "MDN Web Docs - Making decisions in your code — conditionals",
      url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/conditionals",
      source: "MDN Web Docs",
      tip: "Tìm hiểu cách máy tính đánh giá biểu thức chân trị (Truthy vs Falsy) trong mệnh đề điều kiện."
    },
    "Vòng Lặp (Loops)": {
      title: "MDN Web Docs - Loops and iteration (for, while, do...while)",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration",
      source: "MDN & W3Schools",
      tip: "Nắm vững 3 thành phần của vòng lặp: Khởi tạo biến đếm, Điều kiện dừng, và Bước nhảy (Increment)."
    },
    "Mảng & Chỉ Số Index 0": {
      title: "MDN Web Docs - Indexed collections: JavaScript Arrays",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array",
      source: "MDN Web Docs",
      tip: "Hiểu bản chất tại sao mảng bắt đầu từ 0 (Zero-based indexing đại diện cho khoảng cách offset từ địa chỉ ô nhớ đầu tiên)."
    },
    "Hàm & Tham Số (Functions)": {
      title: "Harvard CS50 / MDN - Functions: Reusable blocks of code",
      url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Functions",
      source: "Harvard CS50 & MDN",
      tip: "Phân biệt rõ: Tham số hình thức (Parameters) khi định nghĩa hàm vs Đối số thực tế (Arguments) khi gọi hàm."
    },
    "Bộ Nhớ Stack vs Heap": {
      title: "GeeksforGeeks - Stack vs Heap Memory Allocation in Programming",
      url: "https://www.geeksforgeeks.org/stack-vs-heap-memory-allocation/",
      source: "GeeksforGeeks Computer Science",
      tip: "Stack lưu trữ biến cục bộ và con trỏ thực thi (nhanh, tự thu hồi); Heap lưu trữ mảng/đối tượng động (cần Garbage Collector)."
    },
    "Bắt Lỗi & Ngoại Lệ (Try/Catch)": {
      title: "MDN Web Docs - Control flow and error handling (try...catch...finally)",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling",
      source: "MDN Web Docs",
      tip: "Tuyệt đối không để khối catch rỗng; luôn log lỗi hoặc có phương án dự phòng (fallback) để ứng dụng không bị sập."
    },
    "Hệ Nhị Phân & Byte": {
      title: "Khan Academy - Binary Numbers and Data Representation in Computers",
      url: "https://www.khanacademy.org/computing/computers-and-internet-analyzed/xcae6f4a7ff015e7d:digital-information",
      source: "Khan Academy Computing",
      tip: "1 Byte = 8 Bit (chứa được giá trị từ 0 đến 255); âm thanh 16-bit PCM dùng 2 bytes cho mỗi mẫu sóng (sample)."
    },
    "Toán Tử So Sánh vs Phép Gán": {
      title: "MDN Web Docs - Equality comparisons and sameness (== vs === vs =)",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness",
      source: "MDN Web Docs",
      tip: "Dấu '=' là lệnh gán giá trị vào biến; '==' là so sánh ép kiểu; '===' là so sánh nghiêm ngặt cả giá trị lẫn kiểu dữ liệu."
    },
    "Toán Tử Logic Ghép Điều Kiện": {
      title: "MDN Web Docs - Logical Operators (AND &&, OR ||, NOT !)",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND",
      source: "MDN Web Docs",
      tip: "Cơ chế Short-circuit evaluation: Toán tử && dừng ngay khi gặp điều kiện False; toán tử || dừng ngay khi gặp True."
    },
    "Chuỗi Ký Tự & Phép Nối Chuỗi": {
      title: "MDN Web Docs - Template literals and String manipulation",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals",
      source: "MDN Web Docs",
      tip: "Ưu tiên dùng Template Literal (`Xin chào ${name}`) thay vì dùng toán tử '+' nối chuỗi để tránh lỗi ép kiểu ngoài ý muốn."
    },
    "Kiểu Logic Boolean": {
      title: "W3Schools / MDN - Boolean Values and Truthy/Falsy Evaluation",
      url: "https://developer.mozilla.org/en-US/docs/Glossary/Boolean",
      source: "MDN Web Docs",
      tip: "Chỉ có 2 giá trị true / false. Trong JS, các giá trị sau là Falsy: false, 0, -0, 0n, '', null, undefined, NaN."
    },
    "Bẫy Vòng Lặp Vô Tận": {
      title: "freeCodeCamp - How to Debug and Prevent Infinite Loops",
      url: "https://www.freecodecamp.org/news/how-to-debug-javascript-infinite-loops/",
      source: "freeCodeCamp",
      tip: "Luôn kiểm tra điều kiện thoát (termination condition) và đảm bảo biến đếm được cập nhật về phía điều kiện dừng."
    },
    "Khái Niệm Null & Lỗi Huyền Thoại": {
      title: "InfoQ - Null References: The Billion Dollar Mistake by Sir Tony Hoare",
      url: "https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/",
      source: "Tony Hoare (Turing Award Winner)",
      tip: "Null đại diện cho trạng thái 'không có đối tượng'. Luôn dùng Optional Chaining (?.) hoặc kiểm tra null trước khi gọi hàm/thuộc tính."
    },
    "Tầm Vực Biến Cục Bộ vs Toàn Cục": {
      title: "MDN Web Docs - Variable scope and Closures in Programming",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures",
      source: "MDN Web Docs",
      tip: "Hạn chế biến toàn cục (Global variable) để tránh xung đột tên; ưu tiên biến cục bộ trong phạm vi khối lệnh (Block Scope: let/const)."
    },
    "Ép Kiểu Dữ Liệu": {
      title: "MDN Web Docs - Type Conversion and Coercion in JavaScript",
      url: "https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion",
      source: "MDN Web Docs",
      tip: "Chủ động ép kiểu rõ ràng (Explicit casting: Number('10'), parseInt()) thay vì để máy tính tự động ngầm định (Implicit coercion)."
    },
    "Nghệ Thuật Debug & Gỡ Lỗi": {
      title: "Google Chrome Developers - Get Started with Debugging JavaScript in DevTools",
      url: "https://developer.chrome.com/docs/devtools/javascript",
      source: "Google Chrome DevTools Guide",
      tip: "Tập dùng phím F12, đặt Breakpoints tại dòng nghi vấn và xem Call Stack thay vì chỉ dựa vào console.log()."
    },
    "Cấu Trúc Dữ Liệu Hàng Đợi vs Ngăn Xếp": {
      title: "GeeksforGeeks - Queue vs Stack Data Structures Explained",
      url: "https://www.geeksforgeeks.org/difference-between-stack-and-queue-data-structures/",
      source: "GeeksforGeeks Computer Science",
      tip: "Hàng đợi (Queue) tuân theo FIFO (vào trước ra trước); Ngăn xếp (Stack) tuân theo LIFO (vào sau ra trước)."
    },
    "Biên Dịch vs Thông Dịch": {
      title: "freeCodeCamp - Compiled vs Interpreted Languages Explained",
      url: "https://www.freecodecamp.org/news/compiled-versus-interpreted-languages/",
      source: "freeCodeCamp",
      tip: "Compiled (C/C++, Rust): dịch toàn bộ sang mã máy nhị phân trước khi chạy (siêu nhanh); Interpreted (Python, JS): dịch từng dòng tại runtime."
    },
    "Độ Phức Tạp Thuật Toán Big-O": {
      title: "Big-O Cheat Sheet - Time and Space Complexity Analysis",
      url: "https://www.bigocheatsheet.com/",
      source: "Big-O Cheat Sheet & Harvard CS50",
      tip: "Hiểu các bậc phức tạp: O(1) < O(log N) < O(N) < O(N log N) < O(N^2). Tránh lồng 2 vòng lặp O(N^2) trên tập dữ liệu lớn."
    },
    "Đệ Quy & Điều Kiện Cơ Sở (Recursion)": {
      title: "GeeksforGeeks & MIT OpenCourseWare - Introduction to Recursion",
      url: "https://www.geeksforgeeks.org/introduction-to-recursion-data-structure-and-algorithm-tutorials/",
      source: "GeeksforGeeks & MIT OCW",
      tip: "Mọi bài toán đệ quy phải có Điều kiện cơ sở (Base Case) để dừng; nếu không sẽ dẫn đến Stack Overflow."
    },
    "Bảng Băm & Tra Cứu Tức Thời (Hash Table / Map)": {
      title: "Harvard CS50 - Week 5: Data Structures (Hash Tables & Hash Functions)",
      url: "https://cs50.harvard.edu/x/2024/weeks/5/",
      source: "Harvard CS50",
      tip: "Hàm băm chuyển đổi Khóa thành chỉ số ô nhớ giúp tra cứu O(1); xử lý va chạm (Collision) bằng Chaining hoặc Open Addressing."
    },
    "Cây Tìm Kiếm Nhị Phân (Binary Search Tree)": {
      title: "Stanford University - Binary Trees and Binary Search Tree Implementation",
      url: "https://cslibrary.stanford.edu/110/BinaryTrees.html",
      source: "Stanford CS Library",
      tip: "Duyệt cây theo thứ tự In-Order (Trái - Gốc - Phải) trên BST luôn cho ra một dãy số tăng dần hoàn hảo."
    },
    "Bất Biến vs Khả Biến (Immutability vs Mutability)": {
      title: "MDN Web Docs - Immutability in Modern Programming & JavaScript",
      url: "https://developer.mozilla.org/en-US/docs/Glossary/Immutable",
      source: "MDN Web Docs",
      tip: "Dữ liệu bất biến ngăn chặn hoàn toàn các lỗi ngầm (Side Effects) và giúp tối ưu hóa thuật toán so khớp trạng thái."
    },
    "Lập Trình Bất Đồng Bộ & Luồng Xử Lý (Async / Await)": {
      title: "MDN Web Docs - How to use promises and async/await in JavaScript",
      url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises",
      source: "MDN Web Docs",
      tip: "Event Loop xử lý Call Stack và Callback Queue; async/await giúp viết code bất đồng bộ trông tự nhiên như code đồng bộ."
    },

    // --- LEVEL 2: NỀN TẢNG CƠ SỞ DỮ LIỆU & SQL ---
    "Khái Niệm Bảng & Bản Ghi": {
      title: "SQLBolt - Interactive Lesson 1: Introduction to SQL and Tables",
      url: "https://sqlbolt.com/lesson/introduction",
      source: "SQLBolt Interactive Course",
      tip: "CSDL quan hệ tổ chức dữ liệu thành các Bảng (Table), mỗi hàng (Row/Record) là một thực thể, mỗi cột (Column) là một thuộc tính."
    },
    "Khóa Chính (Primary Key)": {
      title: "PostgreSQL Official Documentation - Primary Keys and Constraints",
      url: "https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-PRIMARY-KEYS",
      source: "PostgreSQL Official Docs",
      tip: "Khóa chính phải là duy nhất (UNIQUE) và không bao giờ được chứa giá trị rỗng (NOT NULL) để định danh chính xác 1 hàng duy nhất."
    },
    "Khóa Ngoại & Quan Hệ 1:N": {
      title: "PostgreSQL Official Documentation - Foreign Keys and Referential Integrity",
      url: "https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-FK",
      source: "PostgreSQL Official Docs",
      tip: "Khóa ngoại (Foreign Key) tạo liên kết giữa bảng con và bảng cha; bảo đảm tính toàn vẹn tham chiếu (Referential Integrity)."
    },
    "Thao Tác Dữ Liệu SQL & Bẫy WHERE": {
      title: "SQLBolt - Lesson 13: Inserting rows & Lesson 14: Updating rows",
      url: "https://sqlbolt.com/lesson/updating_rows",
      source: "SQLBolt Interactive Course",
      tip: "BẪY NGUY HIỂM: Luôn viết mệnh đề WHERE trước khi viết câu lệnh UPDATE hoặc DELETE; thiếu WHERE sẽ ghi đè/xóa sạch cả bảng!"
    },
    "Phép Kết Nối Bảng (JOIN)": {
      title: "W3Schools & SQLBolt - SQL Multi-table queries with JOINs (INNER, LEFT, RIGHT)",
      url: "https://sqlbolt.com/lesson/select_queries_with_joins",
      source: "SQLBolt & W3Schools SQL",
      tip: "INNER JOIN chỉ lấy các bản ghi có cặp khóa khớp ở cả hai bảng; LEFT JOIN lấy toàn bộ bảng bên trái bất kể bảng bên phải có khớp hay không."
    },
    "Tính Chất ACID Trong Giao Dịch": {
      title: "Designing Data-Intensive Applications (Martin Kleppmann) - Chapter 7: Transactions",
      url: "https://dataintensive.net/",
      source: "O'Reilly / Martin Kleppmann (DDIA)",
      tip: "ACID: Atomicity (Nguyên tử - được ăn cả ngã về không), Consistency (Nhất quán), Isolation (Cô lập), Durability (Bền vững)."
    },
    "Chỉ Mục (Index B-Tree)": {
      title: "Use The Index, Luke! - A Guide to Database Performance for Developers",
      url: "https://use-the-index-luke.com/",
      source: "Markus Winand (Use The Index Luke)",
      tip: "Index B-Tree giúp tìm kiếm theo O(log N) thay vì Full Table Scan O(N), nhưng làm chậm thao tác INSERT/UPDATE vì phải cập nhật cây chỉ mục."
    },
    "Chuẩn Hóa Dữ Liệu (Normalization)": {
      title: "Stanford University / W3Schools - Database Normalization (1NF, 2NF, 3NF)",
      url: "https://www.geeksforgeeks.org/introduction-of-database-normalization/",
      source: "Stanford DB Course & GeeksforGeeks",
      tip: "Mục đích số 1 của chuẩn hóa là loại bỏ dữ liệu dư thừa (Redundancy) và ngăn chặn các bất thường khi thêm/xóa/sửa (Anomalies)."
    },
    "Hàm Gom Nhóm GROUP BY & Aggregate": {
      title: "SQLBolt - Lesson 10 & 11: Queries with aggregates (COUNT, SUM, AVG, GROUP BY)",
      url: "https://sqlbolt.com/lesson/select_queries_with_aggregates",
      source: "SQLBolt Interactive Course",
      tip: "Mọi cột xuất hiện trong câu lệnh SELECT khi có GROUP BY bắt buộc phải nằm trong GROUP BY hoặc nằm trong hàm tổng hợp (SUM, COUNT...)."
    },
    "Phân Biệt HAVING vs WHERE": {
      title: "PostgreSQL Official Documentation - The HAVING Clause vs WHERE Clause",
      url: "https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-GROUP",
      source: "PostgreSQL Official Docs",
      tip: "WHERE lọc các hàng thô TRƯỚC KHI gom nhóm; HAVING lọc kết quả sau khi đã áp dụng hàm tổng hợp (ví dụ: HAVING COUNT(*) > 5)."
    },
    "Khóa Phức Hợp (Composite Key)": {
      title: "PostgreSQL Official Documentation - Composite Primary Keys",
      url: "https://www.postgresql.org/docs/current/ddl-constraints.html",
      source: "PostgreSQL Official Docs",
      tip: "Khóa phức hợp ghép từ 2 hay nhiều cột lại với nhau để tạo ra tính định danh duy nhất (thường dùng trong bảng trung gian quan hệ N:N)."
    },
    "Ràng Buộc Toàn Vẹn Dữ Liệu (Constraints)": {
      title: "PostgreSQL Official Documentation - Constraints (CHECK, UNIQUE, NOT NULL)",
      url: "https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-CHECK-CONSTRAINTS",
      source: "PostgreSQL Official Docs",
      tip: "CHECK constraint cho phép đặt biểu thức kiểm tra nghiệp vụ ngay tại tầng database (ví dụ: CHECK (diem_tin_cay >= 0 AND diem_tin_cay <= 1))."
    },
    "Điểm Lưu Trạng Thái (Savepoint) & Rollback": {
      title: "PostgreSQL Official Documentation - SAVEPOINT and Rolling Back to Savepoint",
      url: "https://www.postgresql.org/docs/current/sql-savepoint.html",
      source: "PostgreSQL Official Docs",
      tip: "SAVEPOINT chia nhỏ giao dịch lớn thành các điểm mốc, cho phép hủy (rollback) một phần lỗi mà không làm hủy toàn bộ giao dịch."
    },
    "CSDL Quan Hệ (SQL) vs Phi Quan Hệ (NoSQL)": {
      title: "AWS - Comparing Relational (SQL) and Non-Relational (NoSQL) Databases",
      url: "https://aws.amazon.com/compare/the-difference-between-nosql-and-relational-databases/",
      source: "Amazon Web Services (AWS) Architecture",
      tip: "SQL (Postgres, MySQL): cấu trúc chặt chẽ, ACID mạnh, phù hợp giao dịch ngân hàng. NoSQL (Mongo, Redis): schema linh hoạt, scale ngang cực tốt."
    },
    "Tấn Công SQL Injection & Prepared Statements": {
      title: "OWASP Foundation - SQL Injection Prevention Cheat Sheet",
      url: "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html",
      source: "OWASP Top 10 Security Standard",
      tip: "Sử dụng Parameterized Queries là giải pháp phòng vệ số 1; không bao giờ ghép chuỗi trực tiếp dữ liệu người dùng vào câu lệnh SQL."
    },
    "Truy Vấn Con (Subquery) vs Bảng Tạm CTE (WITH ... AS)": {
      title: "PostgreSQL Official Documentation - Common Table Expressions (WITH Queries)",
      url: "https://www.postgresql.org/docs/current/queries-with.html",
      source: "PostgreSQL Official Docs",
      tip: "CTE giúp module hóa câu lệnh SQL phức tạp thành các khối đặt tên rõ ràng, hỗ trợ cả CTE đệ quy (Recursive CTE) duyệt cây dữ liệu."
    },
    "Hành Vi Khóa Ngoại: CASCADE vs SET NULL vs RESTRICT": {
      title: "PostgreSQL Official Documentation - Foreign Key Actions (ON DELETE / ON UPDATE)",
      url: "https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-FK",
      source: "PostgreSQL Official Docs",
      tip: "Trong hệ thống an ninh và pháp lý, ưu tiên RESTRICT hoặc NO ACTION để ngăn chặn việc vô tình xóa mất chuỗi chứng cứ lịch sử."
    },
    "Bảng Ảo (View) vs Bảng Vật Lý Hóa (Materialized View)": {
      title: "PostgreSQL Official Documentation - Materialized Views Documentation",
      url: "https://www.postgresql.org/docs/current/rules-materializedviews.html",
      source: "PostgreSQL Official Docs",
      tip: "Materialized View lưu kết quả vật lý lên đĩa giúp tăng tốc truy vấn tổng hợp báo cáo; dùng REFRESH MATERIALIZED VIEW CONCURRENTLY để cập nhật ngầm."
    },
    "Đồng Thời (Concurrency) & Hiện Tượng Khóa Chết (Deadlock)": {
      title: "PostgreSQL Official Documentation - Explicit Locking and Deadlock Detection",
      url: "https://www.postgresql.org/docs/current/explicit-locking.html#LOCKING-DEADLOCKS",
      source: "PostgreSQL Official Docs",
      tip: "Phòng tránh Deadlock bằng cách luôn truy cập và khóa các bảng theo một thứ tự nhất quán trong toàn bộ mã nguồn ứng dụng."
    },
    "Kế Hoạch Thực Thi Truy Vấn (EXPLAIN ANALYZE)": {
      title: "PostgreSQL Official Documentation - Using EXPLAIN and Understanding Query Plans",
      url: "https://www.postgresql.org/docs/current/using-explain.html",
      source: "PostgreSQL Official Docs",
      tip: "EXPLAIN ANALYZE thực sự chạy câu lệnh và đo lường thời gian thực; chú ý các nút 'Seq Scan' trên bảng lớn để bổ sung Index thích hợp."
    },
    "Hàm Cửa Sổ (Window Functions: ROW_NUMBER, RANK)": {
      title: "PostgreSQL Official Documentation - Window Functions Tutorial and Built-in Functions",
      url: "https://www.postgresql.org/docs/current/tutorial-window.html",
      source: "PostgreSQL Official Docs",
      tip: "Window Function tính toán trên từng phân vùng PARTITION BY mà không gom nhóm dữ liệu; cực kỳ mạnh mẽ để tính trung bình trượt và xếp hạng."
    },
    "Bộ Kích Hoạt Tự Động (Triggers) Trong Giám Sát CSDL": {
      title: "PostgreSQL Official Documentation - Trigger Procedures and Audit Logging",
      url: "https://www.postgresql.org/docs/current/plpgsql-trigger.html",
      source: "PostgreSQL Official Docs",
      tip: "Trigger viết bằng PL/pgSQL tự động kích hoạt trước hoặc sau sự kiện ghi dữ liệu; là thành phần then chốt xây dựng bảng Audit Trail."
    },
    "Phân Vùng Bảng (Table Partitioning)": {
      title: "PostgreSQL Official Documentation - Table Partitioning (Declarative Partitioning)",
      url: "https://www.postgresql.org/docs/current/ddl-partitioning.html",
      source: "PostgreSQL Official Docs",
      tip: "Partition Pruning tự động loại bỏ các phân vùng không chứa dữ liệu cần tìm; giúp quản lý vòng đời dữ liệu cũ chỉ bằng lệnh DROP TABLE phân vùng."
    },
    "Bể Kết Nối CSDL (Database Connection Pooling)": {
      title: "HikariCP GitHub / PgBouncer Documentation - Connection Pooling Best Practices",
      url: "https://github.com/brettwooldridge/HikariCP",
      source: "HikariCP & PostgreSQL Architecture",
      tip: "Connection Pool duy trì sẵn các kết nối TCP/TLS; kích thước pool tối ưu thường tính theo công thức: connections = (2 * cpu_cores) + disk_spindle."
    },

    // --- LEVEL 3: CSDL PHÁP Y CHUYÊN SÂU DEEPGUARD ---
    "Vector Database & Biometrics": {
      title: "Pinecone Learning Center - What is a Vector Database?",
      url: "https://www.pinecone.io/learn/vector-database/",
      source: "Pinecone Vector Academy",
      tip: "Vector DB lưu trữ các mảng số thực nhiều chiều (embedding vectors) và tìm kiếm bằng khoảng cách không gian (Cosine Similarity / Euclidean)."
    },
    "Tìm Kiếm Vector HNSW vs Flat Index": {
      title: "Pinecone Learning Center - Hierarchical Navigable Small World (HNSW) Explained",
      url: "https://www.pinecone.io/learn/series/faiss/hnsw/",
      source: "Pinecone & Facebook AI Research (FAISS)",
      tip: "HNSW xây dựng cấu trúc đồ thị phân lớp đa tầng cho phép tìm kiếm lân cận gần đúng (ANN) với tốc độ logarit O(log N) trên hàng triệu vector giọng nói."
    },
    "Time-Series DB (ClickHouse / TimescaleDB)": {
      title: "ClickHouse Official Documentation - Architecture and Column-Oriented Storage",
      url: "https://clickhouse.com/docs/en/development/architecture",
      source: "ClickHouse High-Performance Analytics",
      tip: "Lưu trữ dạng cột (Columnar) nén dữ liệu cực cao (tới 90%) và quét hàng tỷ bản ghi log trong vài mili-giây mà không làm nghẽn ổ đĩa."
    },
    "FIPS 140-3 Chain of Custody & Append-Only": {
      title: "NIST SP 800-86 - Guide to Integrating Forensic Techniques into Incident Response",
      url: "https://csrc.nist.gov/publications/detail/sp/800-86/final",
      source: "National Institute of Standards and Technology (NIST)",
      tip: "Nhật ký pháp y phải tuân thủ chuẩn Append-Only kết hợp Merkle Tree băm SHA-256 để bảo đảm tính toàn vẹn chứng cứ trước tòa án (Chuỗi bảo quản)."
    },
    "In-Memory Caching & 350ms Budget": {
      title: "Redis Official Documentation - Caching Use Cases and Latency Optimization",
      url: "https://redis.io/docs/latest/develop/use/caching/",
      source: "Redis Official Documentation",
      tip: "Hệ thống giám định giọng nói thời gian thực bắt buộc phản hồi dưới 350ms; Redis in-memory giữ vai trò cache trung gian phản hồi sub-millisecond."
    },
    "Mức Độ Cô Lập SERIALIZABLE": {
      title: "PostgreSQL Official Docs & DDIA - Transaction Isolation: Serializable",
      url: "https://www.postgresql.org/docs/current/transaction-iso.html#XACT-SERIALIZABLE",
      source: "PostgreSQL Docs & Martin Kleppmann",
      tip: "SERIALIZABLE là cấp độ cô lập cao nhất, giả lập các giao dịch chạy tuần tự, ngăn chặn hoàn toàn Dirty Read, Non-repeatable Read và Phantom Read."
    },
    "Multi-Master Sharding & Phân Vùng Dữ Liệu": {
      title: "Designing Data-Intensive Applications - Chapter 6: Partitioning (Sharding)",
      url: "https://dataintensive.net/",
      source: "Martin Kleppmann (DDIA)",
      tip: "Sharding chia nhỏ dữ liệu theo khóa (Consistent Hashing) ra nhiều máy chủ vật lý khác nhau để tránh nút thắt cổ chai về dung lượng và I/O."
    },
    "Mã Hóa Dữ Liệu Khi Nghỉ (Data at Rest) & FIPS 140-3 HSM": {
      title: "NIST FIPS 140-3 - Security Requirements for Cryptographic Modules",
      url: "https://csrc.nist.gov/publications/detail/fips/140/3/final",
      source: "NIST Cryptographic Standards",
      tip: "Khóa giải mã AES-256 được lưu trữ trong thiết bị phần cứng an toàn HSM (Hardware Security Module), chống trích xuất khóa vật lý."
    },
    "Dempster-Shafer Conflict Logging": {
      title: "A Mathematical Theory of Evidence (Glenn Shafer) / Dempster-Shafer Engine",
      url: "https://en.wikipedia.org/wiki/Dempster%E2%80%93Shafer_theory",
      source: "Dempster-Shafer Evidential Reasoning",
      tip: "Lưu vết xung đột (Conflict k) giữa các nguồn bằng chứng (DSP vs MelCNN vs Ngữ âm); nếu xung đột vượt ngưỡng 0.85, hệ thống kích hoạt Veto."
    },
    "Quyền Riêng Tư & Xóa Dữ Liệu An Toàn": {
      title: "NIST SP 800-88 Rev. 1 - Guidelines for Media Sanitization & Cryptographic Erasure",
      url: "https://csrc.nist.gov/publications/detail/sp/800-88/rev-1/final",
      source: "NIST SP 800-88 & GDPR Article 17",
      tip: "Cryptographic Erasure (Crypto-Shredding): Xóa vĩnh viễn khóa giải mã đối xứng của mẫu sinh trắc học để dữ liệu trở thành vô giá trị không thể khôi phục."
    },
    "Khoảng Cách Vector: Cosine vs Euclidean vs Dot Product": {
      title: "Pinecone Learning Center - Vector Similarity Metrics (Cosine, Euclidean, Dot Product)",
      url: "https://www.pinecone.io/learn/vector-similarity/",
      source: "Pinecone Vector Academy",
      tip: "Khi vector được chuẩn hóa L2 đơn vị, Cosine Similarity đồng nhất với Dot Product, giúp tính toán cực nhanh qua SIMD AVX-512."
    },
    "So Sánh Chỉ Mục Vector: HNSW vs IVFFlat": {
      title: "Faiss Documentation & Pinecone - Choosing Between HNSW and IVF Indexes",
      url: "https://github.com/facebookresearch/faiss/wiki",
      source: "Facebook AI Research (FAISS) & Pinecone",
      tip: "HNSW thích hợp cho hệ thống real-time đòi hỏi độ hồi đáp cao và cập nhật liên tục; IVFFlat phù hợp khi RAM hạn chế."
    },
    "ClickHouse MergeTree & Chỉ Mục Thưa (Sparse Index)": {
      title: "ClickHouse Official Documentation - Primary Keys and Indexes in ClickHouse",
      url: "https://clickhouse.com/docs/en/optimize/sparse-primary-indexes",
      source: "ClickHouse Official Docs",
      tip: "Sparse Index với index_granularity=8192 giúp toàn bộ cây chỉ mục nằm gọn trong RAM, tối ưu tốc độ đọc hàng tỷ dòng log."
    },
    "Sao Chép Bền Vững ReplicatedMergeTree Trong ClickHouse": {
      title: "ClickHouse Official Documentation - Data Replication Architecture",
      url: "https://clickhouse.com/docs/en/engines/table-engines/mergetree-family/replication",
      source: "ClickHouse Official Docs",
      tip: "ReplicatedMergeTree dùng ClickHouse Keeper điều phối metadata; bảo đảm tính sẵn sàng cao (High Availability) khi có nút sập nguồn."
    },
    "Redis Sentinel & Cluster Bảo Toàn Ngân Sách 350ms": {
      title: "Redis Official Documentation - High Availability with Redis Sentinel",
      url: "https://redis.io/docs/latest/operate/oss_and_stack/management/sentinel/",
      source: "Redis Official Documentation",
      tip: "Redis Sentinel tự động phát hiện lỗi và kích hoạt failover trong 1-2 giây; bảo toàn ngân sách thời gian thực 350ms của cuộc gọi."
    },
    "Đồ Thị Băm Merkle DAG & Chuỗi Bảo Quản Chứng Cứ FIPS": {
      title: "IPFS & Git Internals - Merkle DAGs and Cryptographic Data Integrity",
      url: "https://docs.ipfs.tech/concepts/merkle-dag/",
      source: "Protocol Labs & Cryptographic Standards",
      tip: "Merkle DAG tạo ra cấu trúc dữ liệu liên kết băm bất biến; mọi hành vi can thiệp vào một khối đều làm sai lệch Root Hash trên đỉnh."
    },
    "Bằng Chứng Không Tiết Lộ Tri Thức (Zero-Knowledge Proofs - ZKP)": {
      title: "Ethereum.org / ZKProof Community - Introduction to Zero-Knowledge Proofs",
      url: "https://ethereum.org/en/zero-knowledge-proofs/",
      source: "ZKProof Standards Community",
      tip: "ZKP cho phép xác thực tính hợp lệ của giọng nói mà không bao giờ để lộ vector đặc trưng âm học gốc, bảo vệ quyền riêng tư tuyệt đối."
    },
    "Kiến Trúc Tách Biệt Đọc - Ghi CQRS Trong Pháp Y Âm Thanh": {
      title: "Martin Fowler - CQRS (Command Query Responsibility Segregation)",
      url: "https://martinfowler.com/bliki/CQRS.html",
      source: "Martin Fowler Architecture Guide",
      tip: "Tách đôi mô hình Ghi (Write Model) và Đọc (Read Model) giúp tối ưu hóa độc lập, loại bỏ hiện tượng khóa bảng (Lock Contention)."
    },
    "Nhật Ký Ghi Trước WAL (Write-Ahead Logging)": {
      title: "PostgreSQL Official Documentation - Reliability and the Write-Ahead Log (WAL)",
      url: "https://www.postgresql.org/docs/current/wal-intro.html",
      source: "PostgreSQL Official Docs",
      tip: "WAL ghi nhật ký tuần tự trước khi cập nhật dữ liệu chính; là nền tảng của tính chất Bền vững (Durability) và Replication."
    },
    "NotebookLM RAG: Đối Chiếu Tri Thức Chống Ảo Giác Pháp Y": {
      title: "Google NotebookLM Documentation & Grounded RAG Architecture",
      url: "https://notebooklm.google.com/",
      source: "Google Research & NotebookLM MCP",
      tip: "Mô hình Grounded RAG neo chặt câu trả lời với trích dẫn tài liệu gốc (ITU-T, ISO 3382), bảo đảm chứng cứ có xuất xứ minh bạch trước tòa."
    }
  };

  class ProgressiveAcademyEngine {
    constructor() {
      this.storageKey = 'deepguard_progressive_profile_v2';
      this.profile = this.loadProfile();
      this.currentLevel = this.profile.currentLevel || 1;
      this.currentQuestionIdx = 0;
      this.activeQuestions = this.getQuestionsForLevel(this.currentLevel);
      this.pendingEscalationTarget = null;
      this.isLevelUpModalOpen = false;
    }

    loadProfile() {
      try {
        const raw = localStorage.getItem(this.storageKey);
        if (raw) return JSON.parse(raw);
      } catch (e) {
        console.error('Failed to load progressive profile:', e);
      }
      return {
        exp: 0,
        currentLevel: 1,
        streak: 0,
        highestStreak: 0,
        totalAnswers: 0,
        correctAnswers: 0,
        levelScores: { 1: { correct: 0, total: 0 }, 2: { correct: 0, total: 0 }, 3: { correct: 0, total: 0 } },
        unlockedLevels: [1]
      };
    }

    saveProfile() {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(this.profile));
      } catch (e) {
        console.error('Failed to save progressive profile:', e);
      }
    }

    getQuestionsForLevel(level) {
      if (level === 1) return PROGRESSIVE_QUESTIONS.level1;
      if (level === 2) return PROGRESSIVE_QUESTIONS.level2;
      return PROGRESSIVE_QUESTIONS.level3;
    }

    setLevel(lvl, forceResetIdx = true) {
      this.currentLevel = lvl;
      this.profile.currentLevel = lvl;
      if (!this.profile.unlockedLevels.includes(lvl)) {
        this.profile.unlockedLevels.push(lvl);
      }
      this.saveProfile();
      this.activeQuestions = this.getQuestionsForLevel(lvl);
      if (forceResetIdx) this.currentQuestionIdx = 0;
      this.renderAcademyUI();
    }

    recordAnswer(question, selectedIdx) {
      const isCorrect = (selectedIdx === question.ans);
      this.profile.totalAnswers++;

      // Connect to DeepGuard User Memory Hub
      if (window.DeepGuardMemory && window.DeepGuardMemory.logQuestionAttempt) {
        window.DeepGuardMemory.logQuestionAttempt({
          questionId: question.id,
          module: 'progressive_l' + lvl,
          pillar: lvl === 3 ? 'security' : (lvl === 2 ? 'onnx' : 'dsp'),
          questionText: question.q,
          chosenAnswer: selectedIdx,
          correctAnswer: question.ans,
          isCorrect: isCorrect,
          explanation: question.exp || ''
        });
      }

      const lvl = question.level;

      if (!this.profile.levelScores[lvl]) {
        this.profile.levelScores[lvl] = { correct: 0, total: 0 };
      }
      this.profile.levelScores[lvl].total++;

      if (isCorrect) {
        this.profile.correctAnswers++;
        this.profile.levelScores[lvl].correct++;
        this.profile.streak++;
        if (this.profile.streak > this.profile.highestStreak) {
          this.profile.highestStreak = this.profile.streak;
        }

        // EXP Reward based on Tier difficulty
        const expGain = lvl === 1 ? 25 : (lvl === 2 ? 35 : 50);
        this.profile.exp += expGain;

        // Check for Level-Up Progression without cutting the user off!
        this.checkProgressionTrigger();
      } else {
        this.profile.streak = 0;
      }

      this.saveProfile();
      this.updateHeaderStats();
      return isCorrect;
    }

    checkProgressionTrigger() {
      // Escalation from Level 1 -> Level 2
      // Unlocks after achieving at least 5 correct answers or 125 EXP in Level 1
      if (this.currentLevel === 1) {
        const lvl1Correct = this.profile.levelScores[1].correct;
        const canUnlock = (lvl1Correct >= 5 || this.profile.exp >= 125);

        if (canUnlock && !this.profile.unlockedLevels.includes(2)) {
          this.triggerLevelUpCelebration(
            2,
            "🎉 XUẤT SẮC! BẠN ĐÃ MỞ KHÓA CẤP ĐỘ 2!",
            `Bạn đã trả lời đúng ${lvl1Correct} câu hỏi tư duy lập trình căn bản! Cấp độ 2 (Nền Tảng Cơ Sở Dữ Liệu & SQL) đã được mở khóa. Bạn có thể thăng cấp ngay bây giờ hoặc tiếp tục hoàn thành toàn bộ 20 câu hỏi của Cấp Độ 1.`
          );
          return;
        }
      }

      // Escalation from Level 2 -> Level 3
      // Unlocks after achieving at least 5 correct answers or 300 EXP in Level 2
      if (this.currentLevel === 2) {
        const lvl2Correct = this.profile.levelScores[2].correct;
        const canUnlock = (lvl2Correct >= 5 || this.profile.exp >= 300);

        if (canUnlock && !this.profile.unlockedLevels.includes(3)) {
          this.triggerLevelUpCelebration(
            3,
            "🚀 ĐỘT PHÁ TRI THỨC! BƯỚC VÀO CSDL DEEPGUARD!",
            `Bạn đã nắm vững Bảng, Khóa, Quan hệ, ACID và Index B-Tree! Cấp độ 3 (CSDL Pháp Y DeepGuard: Vector DB 512-dim, ClickHouse, Merkle Tree) đã sẵn sàng. Bạn có thể sang Cấp 3 ngay hoặc hoàn thành hết các câu hỏi Cấp 2.`
          );
          return;
        }
      }
    }

    triggerLevelUpCelebration(targetLevel, title, message) {
      if (!this.profile.unlockedLevels.includes(targetLevel)) {
        this.profile.unlockedLevels.push(targetLevel);
      }
      this.saveProfile();
      this.pendingEscalationTarget = targetLevel;

      // Update tier cards lock icons immediately
      this.renderLevelSelectorPills();

      const modal = document.getElementById('academy-levelup-modal');
      const titleEl = document.getElementById('levelup-title');
      const descEl = document.getElementById('levelup-desc');
      const badgeEl = document.getElementById('levelup-badge');
      const proceedBtn = document.getElementById('levelup-proceed-btn');
      const closeBtn = document.getElementById('levelup-close-btn');

      if (modal && titleEl && descEl) {
        titleEl.textContent = title;
        descEl.textContent = message;
        if (badgeEl) {
          badgeEl.textContent = targetLevel === 2 ? "CẤP ĐỘ 2 ĐÃ MỞ KHÓA: NỀN TẢNG CSDL & SQL" : "CẤP ĐỘ 3 ĐÃ MỞ KHÓA: CSDL PHÁP Y DEEPGUARD";
          badgeEl.className = targetLevel === 2 ? "levelup-badge badge-tier2" : "levelup-badge badge-tier3";
        }
        if (proceedBtn) {
          proceedBtn.textContent = `🚀 Chuyển Sang Cấp ${targetLevel} Ngay`;
        }
        if (closeBtn) {
          closeBtn.textContent = `Tiếp Tục Luyện Cấp ${this.currentLevel} (Còn ${this.activeQuestions.length - this.currentQuestionIdx - 1} câu)`;
        }
        modal.classList.add('active');
        this.isLevelUpModalOpen = true;
      } else {
        if (typeof alert !== 'undefined') {
          alert(`${title}\n\n${message}`);
        } else {
          console.log(`[LEVEL UP] ${title} - ${message}`);
        }
      }
    }

    renderAcademyUI() {
      this.updateHeaderStats();
      this.renderLevelSelectorPills();
      this.renderActiveQuestion();
    }

    updateHeaderStats() {
      const expVal = document.getElementById('academy-exp-val');
      const streakVal = document.getElementById('academy-streak-val');
      const accVal = document.getElementById('academy-acc-val');
      const progressTrack = document.getElementById('academy-exp-bar-fill');
      const currentLevelName = document.getElementById('academy-current-level-name');

      if (expVal) expVal.textContent = `${this.profile.exp} EXP`;
      if (streakVal) streakVal.textContent = `🔥 ${this.profile.streak}`;

      const total = this.profile.totalAnswers;
      const correct = this.profile.correctAnswers;
      const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
      if (accVal) accVal.textContent = `${pct}% (${correct}/${total})`;

      // Dynamic progress percentage within current Tier
      const totalQ = this.activeQuestions.length;
      const currentQ = Math.min(this.currentQuestionIdx + 1, totalQ);
      const progressPct = totalQ > 0 ? Math.round((currentQ / totalQ) * 100) : 0;
      if (progressTrack) progressTrack.style.width = `${Math.max(5, progressPct)}%`;

      if (currentLevelName) {
        const titles = {
          1: `CẤP ĐỘ 1: NHẬP MÔN LẬP TRÌNH & TƯ DUY CODE (25 CÂU)`,
          2: `CẤP ĐỘ 2: NỀN TẢNG CƠ SỞ DỮ LIỆU & SQL (24 CÂU)`,
          3: `CẤP ĐỘ 3: CSDL PHÁP Y CHUYÊN SÂU CỦA DEEPGUARD (20 CÂU)`
        };
        currentLevelName.textContent = titles[this.currentLevel] || titles[1];
      }
    }

    renderLevelSelectorPills() {
      const pills = document.querySelectorAll('.academy-tier-pill');
      pills.forEach(p => {
        const tier = parseInt(p.dataset.tier);
        p.classList.toggle('active', tier === this.currentLevel);
        
        // Locked / Unlocked status
        const isUnlocked = this.profile.unlockedLevels.includes(tier);
        p.classList.toggle('locked', !isUnlocked);

        const lockIcon = p.querySelector('.tier-lock-icon');
        if (lockIcon) {
          lockIcon.textContent = isUnlocked ? "✓ MỞ KHÓA" : "🔒 KHÓA";
          lockIcon.style.color = isUnlocked ? "#00ff9d" : "#8b9bb4";
        }
      });
    }

    renderActiveQuestion() {
      const container = document.getElementById('academy-question-container');
      const progressEl = document.getElementById('academy-q-progress');
      if (!container) return;

      const list = this.activeQuestions;
      if (this.currentQuestionIdx >= list.length) {
        container.innerHTML = `
          <div class="academy-completion-card">
            <div style="font-size: 3.5rem; margin-bottom: 0.8rem;">🏆</div>
            <h3 style="color: #00ff9d; font-size: 1.4rem;">XUẤT SẮC! BẠN ĐÃ HOÀN THÀNH TOÀN BỘ ${list.length} CÂU HỎI Ở CẤP ĐỘ ${this.currentLevel}!</h3>
            <p style="color: #cbd5e1; margin: 0.8rem auto 1.5rem; max-width: 520px; line-height: 1.6;">
              ${this.currentLevel < 3 ? 'Kiến thức của bạn đã sẵn sàng! Hãy thăng cấp để khám phá các tầng tri thức cao hơn.' : 'Chúc mừng bạn đã xuất sắc chinh phục trọn vẹn kiến trúc CSDL Pháp Y Số DeepGuard Enterprise!'}
            </p>
            <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
              <button class="btn-primary" id="btn-academy-restart-tier" style="background: rgba(255,255,255,0.08); border: 1px solid var(--border-subtle); color: #fff;">
                🔄 Luyện Lại Cấp Độ Này
              </button>
              ${this.currentLevel < 3 ? `
                <button class="btn-primary" id="btn-academy-next-tier" style="background: linear-gradient(135deg, #00f0ff, #b55fe6); color: #040711; font-weight: 700;">
                  🚀 Thăng Cấp Sang Cấp Độ ${this.currentLevel + 1} ➔
                </button>
              ` : ''}
            </div>
          </div>
        `;

        document.getElementById('btn-academy-restart-tier')?.addEventListener('click', () => {
          this.currentQuestionIdx = 0;
          this.renderActiveQuestion();
        });

        document.getElementById('btn-academy-next-tier')?.addEventListener('click', () => {
          this.setLevel(this.currentLevel + 1, true);
        });
        return;
      }

      const q = list[this.currentQuestionIdx];
      if (progressEl) progressEl.textContent = `Câu ${this.currentQuestionIdx + 1} / ${list.length}`;

      const tierBadges = {
        1: '<span class="badge" style="background: rgba(0, 255, 157, 0.15); color: #00ff9d;">🌱 CẤP 1: NHẬP MÔN</span>',
        2: '<span class="badge" style="background: rgba(0, 240, 255, 0.15); color: #00f0ff;">🗄️ CẤP 2: CSDL & SQL</span>',
        3: '<span class="badge" style="background: rgba(181, 95, 230, 0.15); color: #b55fe6;">🛡️ CẤP 3: CSDL DEEPGUARD</span>'
      };

      container.innerHTML = `
        <div class="academy-question-card">
          <div class="aq-card-header">
            <div>
              ${tierBadges[q.level]}
              <span class="badge" style="background: rgba(255, 183, 0, 0.15); color: #ffb700; margin-left: 6px;">CHỦ ĐỀ: ${q.topic}</span>
            </div>
            <span style="font-family: var(--font-mono); font-size: 0.8rem; color: #8b9bb4;">
              Điểm thưởng: <strong style="color: #00ff9d;">+${q.level === 1 ? 25 : (q.level === 2 ? 35 : 50)} EXP</strong>
            </span>
          </div>

          <div class="aq-question-text" style="white-space: pre-line;">${q.q}</div>

          <div class="aq-options-list">
            ${q.opts.map((opt, oIdx) => `
              <button class="aq-opt-btn" data-opt="${oIdx}">
                <span class="aq-opt-letter">${['A', 'B', 'C', 'D'][oIdx]}.</span>
                <span class="aq-opt-label">${opt}</span>
              </button>
            `).join('')}
          </div>

          <div class="aq-feedback-box" id="aq-feedback" style="display: none;"></div>

          <div class="aq-card-footer" style="display: flex; justify-content: flex-end; margin-top: 1.2rem;">
            <button class="btn-secondary" id="btn-aq-next" style="display: none; padding: 0.65rem 1.4rem; font-weight: 600;">
              Câu Tiếp Theo ➔
            </button>
          </div>
        </div>
      `;

      const optBtns = container.querySelectorAll('.aq-opt-btn');
      const feedbackBox = document.getElementById('aq-feedback');
      const nextBtn = document.getElementById('btn-aq-next');

      optBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const selected = parseInt(btn.dataset.opt);
          optBtns.forEach(b => b.disabled = true);

          const isCorrect = this.recordAnswer(q, selected);

          if (isCorrect) {
            btn.classList.add('correct');
            const docInfo = TOPIC_DOCS[q.topic] || {
              title: "Tài liệu tiêu chuẩn NIST & ISO 27037",
              url: "https://csrc.nist.gov/publications/detail/sp/800-86/final",
              source: "NIST & ISO Standards",
              tip: "Nghiên cứu tài liệu tiêu chuẩn về chuỗi bảo quản và giám định chứng cứ số."
            };
            const docBoxHtml = `
              <div class="feedback-doc-reference">
                <div class="fdr-header">
                  <span class="fdr-icon">📖</span>
                  <span class="fdr-title">TÀI LIỆU ÔN TẬP THỰC TẾ & ĐỌC THÊM:</span>
                  <span class="fdr-source-badge">${docInfo.source}</span>
                </div>
                <a href="${docInfo.url}" target="_blank" rel="noopener noreferrer" class="fdr-link">
                  🔗 ${docInfo.title} <span style="font-size: 0.8rem;">↗</span>
                </a>
                <div class="fdr-tip">💡 <strong>Trọng tâm ôn tập:</strong> ${docInfo.tip}</div>
              </div>
            `;
            feedbackBox.innerHTML = `
              <div class="feedback-correct-title">✨ CHÍNH XÁC! (+${q.level === 1 ? 25 : (q.level === 2 ? 35 : 50)} EXP)</div>
              <p class="feedback-explanation">${q.exp}</p>
              ${docBoxHtml}
            `;
          } else {
            btn.classList.add('wrong');
            optBtns[q.ans].classList.add('correct');
            const docInfoWrong = TOPIC_DOCS[q.topic] || {
              title: "Tài liệu tiêu chuẩn NIST & ISO 27037",
              url: "https://csrc.nist.gov/publications/detail/sp/800-86/final",
              source: "NIST & ISO Standards",
              tip: "Nghiên cứu tài liệu tiêu chuẩn về chuỗi bảo quản và giám định chứng cứ số."
            };
            const docBoxHtmlWrong = `
              <div class="feedback-doc-reference">
                <div class="fdr-header">
                  <span class="fdr-icon">📖</span>
                  <span class="fdr-title">TÀI LIỆU ÔN TẬP THỰC TẾ & ĐỌC THÊM:</span>
                  <span class="fdr-source-badge">${docInfoWrong.source}</span>
                </div>
                <a href="${docInfoWrong.url}" target="_blank" rel="noopener noreferrer" class="fdr-link">
                  🔗 ${docInfoWrong.title} <span style="font-size: 0.8rem;">↗</span>
                </a>
                <div class="fdr-tip">💡 <strong>Trọng tâm ôn tập:</strong> ${docInfoWrong.tip}</div>
              </div>
            `;
            feedbackBox.innerHTML = `
              <div class="feedback-wrong-title">💡 CHƯA CHÍNH XÁC - BÀI HỌC DÀNH CHO BẠN:</div>
              <p class="feedback-explanation">${q.exp}</p>
              ${docBoxHtmlWrong}
            `;
          }

          feedbackBox.style.display = 'block';
          nextBtn.style.display = 'block';
        });
      });

      nextBtn.addEventListener('click', () => {
        this.currentQuestionIdx++;
        this.renderActiveQuestion();
      });
    }

    // Connect and inject all 44 questions into the global quiz bank
    injectIntoQuizTrap() {
      if (typeof window.QUIZ_QUESTIONS !== 'undefined' && Array.isArray(window.QUIZ_QUESTIONS)) {
        const all = [...PROGRESSIVE_QUESTIONS.level1, ...PROGRESSIVE_QUESTIONS.level2, ...PROGRESSIVE_QUESTIONS.level3];
        all.forEach(q => {
          if (!window.QUIZ_QUESTIONS.some(existing => existing.id === q.id)) {
            window.QUIZ_QUESTIONS.push({
              id: q.id,
              cat: q.cat,
              q: `[${q.tierName} - ${q.topic}] ${q.q}`,
              opts: q.opts,
              ans: q.ans,
              exp: q.exp,
              level: q.level,
              isProgressiveAcademy: true
            });
          }
        });
      }
    }

    
    openDocLibrary() {
      const modal = document.getElementById('academy-doc-modal');
      const body = document.getElementById('doc-modal-body');
      if (!modal || !body) return;

      const tier1Topics = PROGRESSIVE_QUESTIONS.level1.map(q => q.topic);
      const tier2Topics = PROGRESSIVE_QUESTIONS.level2.map(q => q.topic);
      const tier3Topics = PROGRESSIVE_QUESTIONS.level3.map(q => q.topic);

      const renderSection = (title, badgeClass, topics) => {
        const uniqueTopics = [...new Set(topics)];
        return `
          <div class="doc-tier-section">
            <div class="doc-tier-title">
              <span class="badge ${badgeClass}">${title}</span>
              <span style="font-size: 0.82rem; color: #8b9bb4;">(${uniqueTopics.length} Chủ Đề & Tài Liệu Chuẩn)</span>
            </div>
            <div class="doc-items-grid">
              ${uniqueTopics.map(t => {
                const d = TOPIC_DOCS[t] || {
                  title: t,
                  url: "https://csrc.nist.gov/publications/detail/sp/800-86/final",
                  source: "Standard Doc",
                  tip: "Tài liệu chuyên đề"
                };
                return `
                  <div class="doc-card-mini">
                    <div class="doc-card-mini-topic">${t}</div>
                    <a href="${d.url}" target="_blank" rel="noopener noreferrer" class="doc-card-mini-link">
                      🔗 ${d.title} ↗
                    </a>
                    <div class="doc-card-mini-source">🏛️ Nguồn: ${d.source}</div>
                    <div style="font-size: 0.75rem; color: #94a3b8; margin-top: 4px; line-height: 1.3;">
                      ${d.tip}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      };

      body.innerHTML = `
        ${renderSection("🌱 CẤP ĐỘ 1: NHẬP MÔN LẬP TRÌNH & THUẬT TOÁN (25 CÂU)", "badge-tier1", tier1Topics)}
        ${renderSection("🗄️ CẤP ĐỘ 2: NỀN TẢNG CƠ SỞ DỮ LIỆU & SQL (24 CÂU)", "badge-tier2", tier2Topics)}
        ${renderSection("🛡️ CẤP ĐỘ 3: CSDL PHÁP Y DEEPGUARD & VECTOR DB (20 CÂU)", "badge-tier3", tier3Topics)}
      `;

      modal.classList.add('active');
    }

    init() {
      this.injectIntoQuizTrap();

      
      // Open / Close Document Library Modal
      const btnOpenDocLib = document.getElementById('btn-open-doc-library');
      const docModal = document.getElementById('academy-doc-modal');
      const docModalClose = document.getElementById('doc-modal-close-btn');

      btnOpenDocLib?.addEventListener('click', () => {
        this.openDocLibrary();
      });

      docModalClose?.addEventListener('click', () => {
        docModal?.classList.remove('active');
      });

      docModal?.addEventListener('click', (e) => {
        if (e.target === docModal) {
          docModal.classList.remove('active');
        }
      });
  
      // Tier Selector Pills
      const pills = document.querySelectorAll('.academy-tier-pill');
      pills.forEach(pill => {
        pill.addEventListener('click', () => {
          const tier = parseInt(pill.dataset.tier);
          if (!this.profile.unlockedLevels.includes(tier)) {
            alert(`Cấp độ ${tier} hiện đang khóa! Hãy hoàn thành các câu hỏi ở cấp độ trước hoặc tích lũy thêm EXP để mở khóa.`);
            return;
          }
          this.setLevel(tier, true);
        });
      });

      // Level-Up Modal Actions
      const modal = document.getElementById('academy-levelup-modal');
      const closeBtn = document.getElementById('levelup-close-btn');
      const proceedBtn = document.getElementById('levelup-proceed-btn');

      proceedBtn?.addEventListener('click', () => {
        if (modal) modal.classList.remove('active');
        this.isLevelUpModalOpen = false;
        if (this.pendingEscalationTarget) {
          this.setLevel(this.pendingEscalationTarget, true);
        }
      });

      closeBtn?.addEventListener('click', () => {
        if (modal) modal.classList.remove('active');
        this.isLevelUpModalOpen = false;
        // Keep current question index and stay on current level
        this.renderAcademyUI();
      });

      // Render initial state
      this.renderAcademyUI();
    }
  }

  // Expose to window
  window.ProgressiveAcademyEngine = new ProgressiveAcademyEngine();

  // Auto-init on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    window.ProgressiveAcademyEngine.init();
  });

})();
