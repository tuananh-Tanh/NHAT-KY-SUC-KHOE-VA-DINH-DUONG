
let listMeals = [];
let totalCaloriesCount = 0; 


document
  .getElementById("mealForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); 

    
    const fullName = document.getElementById("fullName").value.trim();
    const studentId = document.getElementById("studentId").value.trim();
    const mealTime = document.getElementById("mealTime").value;

    
    const selectElement = document.getElementById("mealSelect");
    const selectedOption = selectElement.options[selectElement.selectedIndex];

    const optionId = selectedOption.id; 
    const optionText = selectedOption.text;
    const mealValue = selectElement.value; 
    const mealCalories = parseInt(selectedOption.getAttribute("data-calories")); 

    
    let currentMealCount = 0;

    if (optionId === "thucdon1") {
      currentMealCount = 7;
    } else if (optionId === "thucdon2") {
      currentMealCount = 5;
    } else if (optionId === "thucdon3") {
      currentMealCount = 1;
    } else if (optionId === "thucdon4") {
      currentMealCount = 5;
    } else if (optionId === "thucdon5") {
      currentMealCount = 1;
    } else if (optionId === "thucdon6") {
      currentMealCount = 4;
    } else if (optionId === "thucdon7") {
      currentMealCount = 5;
    }

    
    const newMeal = {
      studentName: fullName,
      studentCode: studentId,
      time: mealTime,
      name: `${mealValue} (${optionText})`,
      calories: mealCalories,
      mealCount: currentMealCount,
    };

   
    const lastChar = studentId.charAt(studentId.length - 1);
    const lastNumber = parseInt(lastChar);

    if (isNaN(lastNumber)) {
      alert(
        "Lỗi nhập liệu: Ký tự cuối cùng của Mã số sinh viên bắt buộc phải là một chữ số!",
      );
      return;
    }

    if (lastNumber % 2 !== 0) {
      
      listMeals.unshift(newMeal);
    } else {
      
      listMeals.push(newMeal);
    }

    
    renderTable();

   
    document.getElementById("mealSelect").value = "";
    document.getElementById("mealTime").value = "";
  });


function renderTable() {
  const tableBody = document.getElementById("mealTableBody");
  tableBody.innerHTML = ""; 

  totalCaloriesCount = 0; 
  let globalTotalMealsCount = 0; 

  
  listMeals.forEach(function (item) {
    const row = document.createElement("tr");

    
    row.innerHTML = `
           
            <td>
                <strong>${item.studentName}</strong>
                <small class="text-muted">MSSV: ${item.studentCode}</small>
            </td>
            <td><span class="badge bg-secondary">${item.time}</span></td>
            <td>${item.name} <span class="text-muted" style="font-size:12px;">(+${item.mealCount} món)</span></td>
            <td class="fw-bold text-success">${item.calories} kcal</td>
        `;

    tableBody.appendChild(row);

    // THỰC HIỆN CỘNG DỒN DỮ LIỆU
    totalCaloriesCount += item.calories; // Cộng dồn lượng Calo nguyên bản của option
    globalTotalMealsCount += item.mealCount; // Tích lũy cộng dồn số lượng món ăn dựa vào id bạn đã gán
  });

  
  document.getElementById("totalCalories").innerText =
    totalCaloriesCount + " kcal";

 
  if (globalTotalMealsCount > 10) {
    // Sử dụng setTimeout nhẹ (50ms) để trình duyệt kịp cập nhật vẽ bảng lên màn hình trước khi bảng thông báo hiện ra chặn trình duyệt
    setTimeout(function () {
      alert(
        `Thông báo: Tổng số món ăn tích lũy của bảng thực đơn hôm nay đã đạt ${globalTotalMealsCount} món (Vượt mốc 10 món!). Chúc mừng bạn có một chế độ dinh dưỡng cực kỳ đa dạng và lành mạnh.`,
      );
    }, 50);
  }
}
