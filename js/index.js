let data = {};

fetch('data.json')
    .then(response => response.json())
    .then(json => {
        data = json;
        const subjectSelect = document.getElementById('subject');
        for (const subject in data) {
            const option = document.createElement('option');
            option.value = subject;
            option.textContent = data[subject][0]; // Hiển thị tên môn học
            subjectSelect.appendChild(option);
        }
    })
    .catch(error => console.error('Lỗi khi tải file JSON:', error));

function searchImage() {
    const subject = document.getElementById('subject').value;
    const studentId = document.getElementById('studentId').value.trim();
    const resultDiv = document.getElementById('result');

    if (!data[subject]) {
        resultDiv.innerHTML = "<p>Không tìm thấy bài làm của học sinh.</p>";
        return;
    } else {
        resultDiv.innerHTML = "";
    }

    const folder = data[subject][1]; // Đường dẫn thư mục
    const imagePath = `img/${folder}/${studentId}.jpg`;

    // Hiển thị ảnh trong modal
    const modal = document.getElementById('myModal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = imagePath;

    const img = new Image();
    img.onload = function () {
        modal.style.display = "flex"; // Hiển thị modal khi ảnh có sẵn
    };
    img.onerror = function () {
        resultDiv.innerHTML = "<p>Không tìm thấy bài làm của học sinh.</p>";
    };
    img.src = imagePath;
}

// Hàm đóng modal
function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = "none"; // Ẩn modal
}