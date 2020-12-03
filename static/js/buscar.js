// const url = 'https://nodejssa-backend.herokuapp.com/';
const url = "http://localhost:88";

let token;
let headers = {};

let buscar_input = document.querySelector("#search");

window.onload = () => {
    token = sessionStorage.getItem("token");

    sessionStorage.removeItem("edit_id");
    sessionStorage.removeItem("delete_id");

    if (!token) {
        logout();
    } else {
        headers = { Authorization: `bearer ${token}` };

        let decoded = jwt_decode(token);
        sessionStorage.setItem("page", 0);

        let username = document.querySelector("#username");
        if (decoded.nombre && decoded.apellido) {
            username.textContent = `${decoded.nombre} ${decoded.apellido}`;
        } else {
            username.textContent = decoded.username;
        }
    }
};

async function searchEmployees(nombre) {
    const response = await fetch(`${url}/empleados?nombre=${nombre}`, {
        method: "GET",
        headers: headers,
    });

    const json = await response.json();

    if (json["message"]["results"].length == 0) {
        notfound("employees");
    } else {
        let table = employeesTable(json["message"]["results"], true);
        let old_table = document.querySelector("#empleados-tabla");

        if (old_table) {
            document.querySelector("#table-container").replaceChild(table, old_table);
        } else {
            try {
                document.querySelector("#table-container").appendChild(table);
            } catch {
                // En caso de que no exista #table-container se crea de nuevo
                let table_container = document.createElement("div");
                table_container.classList.add("col-12");
                table_container.id = "table-container";

                let content = document.querySelector("#content")
                content.removeChild(content.querySelector('img'));
                content.removeChild(content.querySelector('h4'));
                content.appendChild(table_container);

                document.querySelector("#table-container").appendChild(table);
            }
        }
    }
}

buscar_input.addEventListener("change", () => {
    searchEmployees(buscar_input.value);
});
