document.addEventListener("DOMContentLoaded", () => {
  const studentForm = document.getElementById("studentForm");
  const studentList = document.getElementById("studentList");
  const addBtn = document.querySelector(".add-btn");
  const updateBtn = document.querySelector(".update-btn");

  // Local storage to access kar raha hai
  let studentDetails = JSON.parse(localStorage.getItem("studentDetails")) || [];
  let editIndex = null; //yeh edit item ko track karega

  updateBtn.style.display = "none";

  studentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const studentName = document.querySelector("#sname").value.trim();
    const studentEmail = document.querySelector("#sEmail").value.trim();
    const studentNumber = document.querySelector("#sNumber").value.trim();

    if (!studentName || !studentEmail || !studentNumber) {
      alert("All fields are required!");
      return;
    }

    // Condition check hoda  agar update ho raha ho toh uske uski ko id mile na ki new
    let studentData = {
      studentID:
        editIndex === null
          ? studentDetails.length + 1
          : studentDetails[editIndex].studentID,
      studentName,
      studentEmail,
      studentNumber,
    };

    if (editIndex === null) {
      studentDetails.push(studentData);
    } else {
      studentDetails[editIndex] = studentData;
      editIndex = null;
      addBtn.style.display = "inline-block";
      updateBtn.style.display = "none";
    }

    saveAndRender();
    studentForm.reset();
  });

  // Data Show ke Liye
  function showStudentData() {
    studentList.innerHTML = "";

    studentDetails.forEach((student, index) => {
      let row = document.createElement("tr");
      row.innerHTML = `<td>${index + 1}</td>
                         <td>${student.studentName}</td>
                         <td>${student.studentEmail}</td>
                         <td>${student.studentNumber}</td>
                         <td>
                            <button onclick="editStudent(${index})" class="btn-Edit">Edit</button>
                            <button onclick="deleteStudent(${index})" class="btn-Delete">Delete</button>
                         </td>`;
      studentList.appendChild(row); //tbody  ke andar tr and td create hoga
    });
  }

  // Edit Section

  window.editStudent = (index) => {
    let student = studentDetails[index];
    document.querySelector("#sname").value = student.studentName;
    document.querySelector("#sEmail").value = student.studentEmail;
    document.querySelector("#sNumber").value = student.studentNumber;

    editIndex = index;
    addBtn.style.display = "none";
    updateBtn.style.display = "inline-block";

    showStudentData();
  };

  // Delete Section
  window.deleteStudent = (index) => {
    if (confirm("Are you sure you want to delete this student?")) {
      studentDetails.splice(index, 1);

      // delete item ko list ko sahi se arrange karega
      studentDetails.forEach((student, i) => {
        student.studentID = i + 1;
      });

      saveAndRender();
    }
  };

  // save ke liye hai aur view ke liye
  function saveAndRender() {
    localStorage.setItem("studentDetails", JSON.stringify(studentDetails));
    showStudentData(); //save ke baad table me data show hoga isiliye function ko call kiye gya hai
  }

  showStudentData();
});
