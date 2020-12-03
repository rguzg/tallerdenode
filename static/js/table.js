function employeesTable(employees, buttons = false) {
    let table = document.createElement("table");
    table.classList.add("table", "table-bordered", "table-hover", "table-sm", "table-striped");
    table.id = "empleados-tabla"

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

        // Botones de eliminar y editar
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
                sessionStorage.setItem("delete_id", element['id']);
                $('#borrar').modal('show');

            });

            edit_button.addEventListener('click', () => {
                sessionStorage.setItem("edit_id", element['id']);
                window.location.href = "edit.html";
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

$('#borrar').on('hidden.bs.modal', (e) => {
    sessionStorage.removeItem("delete_id");
});

$('#borrar').on('show.bs.modal', (e) => {
    if(!(sessionStorage.getItem("delete_id"))){
        $('#borrar').modal('hide');
    }
});

document.querySelector('#eliminar').addEventListener('click', async () => {
    let parent = document.querySelector('#eliminar');
    let id = sessionStorage.getItem("delete_id");

    parent.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
    parent.toggleAttribute('disabled');

    let response = await fetch(`${url}/empleados/${id}`, {
        method: "DELETE",
        headers
    });

    parent.innerHTML = 'Eliminar';
    parent.toggleAttribute('disabled');
    
    let json = await response.json();

    if(json.status == 200){
        document.querySelector('#empleados-tabla').remove();
        getEmployees();
        $('#borrar').modal('hide');
    } else {
        let alert = document.querySelector('#server-alert');
        alert.classList.toggle('h-display-none');
        alert.classList.toggle('show');
    }
})