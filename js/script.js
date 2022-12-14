var selectRow = null;

const fName = document.querySelector("#firstName"),
    lName = document.querySelector("#lastName"),
    rollNum = document.querySelector("#rollNumber"),
    studForm = document.querySelector("#student-form"),
    studList = document.querySelector("#stud-list");


function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `col-10 alert alert-${className}`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".container"),
        main = document.querySelector(".main");

    main.insertBefore(div, studForm);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);

}

// Delete Item

studList.addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("remove")) {
        target.parentElement.parentElement.remove();
        showAlert("Student Data Removed", "danger");
    }
});


// Clear Items
function clearFields() {
    fName.value = "";
    lName.value = "";
    rollNum.value = "";
}

document.querySelector(".btn-clear").addEventListener("click", () => {
    clearFields();
});

// Add Data

studForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // validate

    if (fName.value == "" || lName.value == "" || rollNum == "") {
        showAlert("Please Fill up empty fields!", "warning");
    }

    else {
        if (selectRow == null) {
            const list = document.querySelector("#stud-list"),
                row = document.createElement("tr");

            row.innerHTML = `
            <td>${fName.value}</td>
            <td>${lName.value}</td>
            <td>${rollNum.value}</td>
            <td>
                <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                <a href="#" class="btn btn-danger btn-sm remove">Remove</a>
            </td>
            `;

            list.appendChild(row);
            selectRow == null;
            showAlert("Student Added!", "success");
            clearFields();
        }

        else {
            selectRow.children[0].textContent = fName.value;
            selectRow.children[1].textContent = lName.value;
            selectRow.children[2].textContent = rollNum.value;
            selectRow = null;
            showAlert("Student Info Updated!", "info");
            studForm.querySelector(".btn-add").value = "Add Student";
            clearFields();
        }
    }
});

// Edit data

studList.addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("edit")) {
        selectRow = target.parentElement.parentElement;
        fName.value = selectRow.children[0].textContent;
        lName.value = selectRow.children[1].textContent;
        rollNum.value = selectRow.children[2].textContent;
        studForm.querySelector(".btn-add").value = "Update";
    }

});