// DOM Elements
const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");

let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = null;

// Load existing students on page load
displayStudents();

// Form Submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const studentId = document.getElementById("studentId").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();

  // Validations
  if (!/^[A-Za-z ]+$/.test(name)) {
    alert("Name should contain only characters");
    return;
  }

  if (!/^\d+$/.test(studentId)) {
    alert("Student ID should contain only numbers");
    return;
  }

  if (!/^\d{10,}$/.test(contact)) {
    alert("Contact number must be at least 10 digits");
    return;
  }

  if (editIndex === null) {
    students.push({ name, studentId, email, contact });
  } else {
    students[editIndex] = { name, studentId, email, contact };
    editIndex = null;
  }

  localStorage.setItem("students", JSON.stringify(students));
  form.reset();
  displayStudents();
});

// Display Students
function displayStudents() {
  table.innerHTML = "";

  students.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.studentId}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td class="actions">
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;

    table.appendChild(row);
  });
}

// Edit Student
function editStudent(index) {
  const student = students[index];

  document.getElementById("name").value = student.name;
  document.getElementById("studentId").value = student.studentId;
  document.getElementById("email").value = student.email;
  document.getElementById("contact").value = student.contact;

  editIndex = index;
}

// Delete Student
function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this record?")) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
  }
}
