document.addEventListener("DOMContentLoaded", function () {
  // Lấy các phần tử giao diện từ DOM
  const btnAnalyze = document.getElementById("btnAnalyze");
  const codeInput = document.getElementById("codeContainerInput");
  const resultArea = document.getElementById("debugResultArea");

  // Lắng nghe sự kiện click vào nút "KÍCH HOẠT PHÂN TÍCH"
  btnAnalyze.addEventListener("click", function () {
    const enteredCode = codeInput.value.trim();

    // 1. Kiểm tra xem người dùng đã nhập chữ vào chưa
    if (enteredCode === "") {
      alert(
        "Lỗi hệ thống: Vui lòng dán đoạn mã code cần sửa lỗi vào ô trống trước!",
      );
      return;
    }

    // 2. Kiểm tra tính hợp lệ: Xem đoạn mã nhập vào có đúng là đoạn mã lỗi của đề bài không
    // (Kiểm tra xem có chứa từ khóa cốt lõi "23010001_btn_save" hoặc "saveDate" không)
    if (
      enteredCode.includes("23010001_btn_save") ||
      enteredCode.includes("saveDate")
    ) {
      // Nếu đúng đoạn mã lỗi, gỡ bỏ class 'd-none' của Bootstrap để hiển thị vùng kết quả lên màn hình
      resultArea.classList.remove("d-none");

      // Tiến hành render đoạn mã gốc được format đẹp mắt sang cột bên trái
      renderOriginalCode();

      // Tiến hành render đoạn mã đã sửa lỗi hoàn chỉnh kèm comment giải thích sang cột bên phải
      renderFixedCode();

      // Cuộn màn hình xuống vùng kết quả một cách mượt mà để sinh viên dễ quan sát
      resultArea.scrollIntoView({ behavior: "smooth" });

      // Kích hoạt tính năng chạy thử của nút bấm Test Code bên dưới kết quả
      initTestButton();
    } else {
      // Nếu sinh viên nhập mã linh tinh không liên quan đến đề bài
      alert(
        "Mã lệnh không khớp! Vui lòng nhập nguyên văn đoạn mã lỗi JavaScript được yêu cầu trong đề bài.",
      );
    }
  });

  // Hàm render cấu trúc mã lỗi nguyên văn
  function renderOriginalCode() {
    const originalCode = `<span class="code-keyword">let</span> btn = document.<span class="code-function">getElementById</span>(<span class="code-string">"23010001_btn_save"</span>);<br />
btn.<span class="code-function">addEventListener</span>(<span class="code-string">"click"</span>, <span class="code-function">saveDate</span>());<br /><br />
<span class="code-keyword">function</span> <span class="code-function">saveDate</span>() {<br />
&nbsp;&nbsp;&nbsp;&nbsp;console.<span class="code-function">log</span>(<span class="code-string">"Dữ liệu đã được lưu lúc: "</span> + <span class="code-keyword">new</span> <span class="code-function">Date</span>());<br />
&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-function">alert</span>(<span class="code-string">"Thành công"</span>)<br />
}`;
    document.getElementById("originalCodeContainer").innerHTML = originalCode;
  }

  // Hàm render cấu trúc mã đã được sửa lỗi hoàn chỉnh kèm chú thích bình luận
  function renderFixedCode() {
    const fixedCode = `<span class="code-comment">// Bước 1: Lấy phần tử nút bấm thông qua thuộc tính ID</span><br />
<span class="code-keyword">let</span> btn = document.<span class="code-function">getElementById</span>(<span class="code-string">"23010001_btn_save"</span>);<br /><br />
<span class="code-comment">// Bước 2: Đăng ký sự kiện click chuột chính xác</span><br />
<span class="code-comment">// SỬA LỖI: Bỏ cặp dấu ngoặc đơn () ở tên hàm saveDate.</span><br />
<span class="code-comment">// Chỉ truyền tên hàm (tham chiếu) chứ không gọi hàm ngay lập tức.</span><br />
btn.<span class="code-function">addEventListener</span>(<span class="code-string">"click"</span>, <span class="code-function">saveDate</span>);<br /><br />
<span class="code-comment">// Bước 3: Định nghĩa hàm xử lý dữ liệu khi có hành động click</span><br />
<span class="code-keyword">function</span> <span class="code-function">saveDate</span>() {<br />
&nbsp;&nbsp;&nbsp;&nbsp;console.<span class="code-function">log</span>(<span class="code-string">"Dữ liệu đã được lưu lúc: "</span> + <span class="code-keyword">new</span> <span class="code-function">Date</span>());<br />
&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-function">alert</span>(<span class="code-string">"Thành công"</span>); <span class="code-comment">// Thêm dấu chấm phẩy chuẩn hóa cú pháp</span><br />
}`;
    document.getElementById("fixedCodeContainer").innerHTML = fixedCode;
  }

  // Hàm khởi tạo và bắt sự kiện chạy thực tế cho nút Test Code giả lập
  function initTestButton() {
    let testBtn = document.getElementById("23010001_btn_save");
    if (testBtn) {
      // Gỡ bỏ sự kiện cũ (nếu có) để tránh lặp và gán lại tham chiếu hàm chuẩn xác không dấu ngoặc đơn
      testBtn.replaceWith(testBtn.cloneNode(true));
      testBtn = document.getElementById("23010001_btn_save");
      testBtn.addEventListener("click", function () {
        console.log("Dữ liệu đã được lưu lúc: " + new Date());
        alert(
          "Thành công! Lần này hàm chỉ chạy ĐÚNG KHI BẤM NÚT nhờ loại bỏ dấu () trong addEventListener.",
        );
      });
    }
  }
});
