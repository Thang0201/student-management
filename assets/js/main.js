const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const form = $("#form");
const nameInput = $("#name");
const emailInput = $("#email");
const addressInput = $("#address");
const phoneInput = $("#phone");
const maleCheckbox = $("#male");
const femaleCheckbox = $("#female");

let studentList = $("#student-list");

// const LIMIT = 25;
// const TOTAL_PAGE = students.length() / LIMIT;
// let startIndex = 0;

function Student(name, email, phone, address, gender) {
  this.name = name;
  this.email = email;
  this.phone = phone;
  this.address = address;
  this.gender = gender;
}

const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
const students = storedStudents.slice();

function renderStudent(students) {
  let contentTable = ``;
  students.forEach((student, index) => {
    contentTable += `
              <tr>
                <td>${index + 1}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.phone}</td>
                <td>${student.address}</td>
                <td>${student.gender}</td>
                <td style="display: flex; gap: 15px">
            <p style="cursor: pointer; color: red" onclick="handleDelete(this,${index})">
              Xóa
            </p>
            <p style="cursor: pointer; color: #0066FF" onclick="handleFix()">Sửa</p>
          </td>
              </tr>
            `;
  });
  studentList.innerHTML = contentTable;
}

renderStudent(students);

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
  const small = formControl.querySelector("small");
  small.innerText = "";
}

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function existEmpty(inputArr) {
  let isEmpty = false;
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, "Vui lòng điền đầy đủ thông tin!");
      isEmpty = true;
    } else {
      showSuccess(input);
    }
  });
  return isEmpty;
}

function checkEmail(input) {
  const reEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (reEmail.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email không hợp lệ");
  }
}

function validatePhone(input) {
  const rePhone = /^[0-9]+$/; // Số điện thoại chỉ chấp nhận ký tự số

  if (rePhone.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Số điện thoại không hợp lệ. Chỉ nhập số.");
  }
}

function getSelectedGender() {
  if (maleCheckbox.checked) {
    return maleCheckbox.value;
  } else {
    return femaleCheckbox.value;
  }
}

function handleDelete(element, index) {
  if (confirm(`Bạn có chắc chắn muốn xóa sinh viên này không?`)) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    renderStudent(students);
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (
    !existEmpty([nameInput, emailInput, phoneInput, addressInput]) &&
    (maleCheckbox.checked || femaleCheckbox.checked)
  ) {
    validatePhone(phoneInput);
    checkEmail(emailInput);

    if (!document.querySelector(".error")) {
      students.push(
        new Student(
          nameInput.value,
          emailInput.value,
          phoneInput.value,
          addressInput.value,
          getSelectedGender()
        )
      );

      localStorage.setItem("students", JSON.stringify(students));

      renderStudent(students);

      form.reset();
    }
  } else {
    showError(
      genderInput,
      "Vui lòng chọn giới tính (Nam hoặc Nữ) và điền đầy đủ thông tin!"
    );
  }
});
