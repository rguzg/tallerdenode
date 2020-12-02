function employeesTable(employees) {
    let table = document.createElement("table");
    table.classList.add("table", "table-bordered", "table-hover", "table-sm", "table-striped");

    let columnNames = ["#", "Nombre", "Apellidos", "Teléfono", "Correo", "Dirección"];

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