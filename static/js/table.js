function employeesTable(employees, buttons = false) {
    let table = document.createElement("table");
    table.classList.add("table", "table-bordered", "table-hover", "table-sm", "table-striped");

    let columnNames = ["#", "Nombre", "Apellidos", "Teléfono", "Correo", "Dirección", ""];

    let head = document.createElement("thead");
    let headerRow = document.createElement("tr");

    columnNames.forEach((element) => {
        let header = document.createElement("th");
        header.setAttribute("scope", "col");
        header.innerText = element;

        headerRow.appendChild(header);
    });

    head.appendChild(headerRow);
    table.appendChild(head);

    let rows = [];
    let counter = 1;

    employees.forEach((element) => {
        let keys = Object.keys(element);
        let row = document.createElement("tr");

        for (let i = 0; i < keys.length; i++) {
            let column;

            if (keys[i] == "id") {
                column = document.createElement("th");
                column.setAttribute("scope", "row");
                column.innerText = counter;
            } else {
                column = document.createElement("td");
                column.innerText = element[keys[i]] || "-";
            }

            row.appendChild(column);
        }

        // Delete and edit buttons
        if (buttons) {
            button_container = document.createElement("td");
            button_container.classList.add("text-center");

            edit_button = document.createElement("button");
            delete_button = document.createElement("button");

            edit_button.classList.add("btn", "btn-primary", "mr-2");
            edit_button.innerHTML = '<i class="fas fa-pencil-alt"></i>';

            delete_button.classList.add("btn", "btn-danger");
            delete_button.innerHTML = '<i class="fas fa-trash-alt"></i>';

            button_container.appendChild(edit_button);
            button_container.appendChild(delete_button);

            delete_button.addEventListener('click', () => {
                deleteEmployee(element['id']);
            });

            edit_button.addEventListener('click', () => {
                editEmployee(element['id']);
            });

            row.appendChild(button_container);
        }

        rows.push(row);
        counter++;
    });

    let tableBody = document.createElement("tbody");
    rows.forEach((element) => {
        tableBody.appendChild(element);
    });

    table.appendChild(tableBody);

    return table;
}

function deleteEmployee(id) {
    // TODO: Realizar una mejor implementación
    sessionStorage.setItem("delete_id", id);
    alert(`Deleting ${id}`);
}

function editEmployee(id) {
    // TODO: Realizar una mejor implementación
    sessionStorage.setItem("edit_id", id);
    window.location.href = "edit.html";
}
