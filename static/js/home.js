// const url = 'https://nodejssa-backend.herokuapp.com/';
const url = "http://localhost:88";

let token;
let headers = {};

let add_button = document.querySelector('#add');


window.onload = () => {
    token = sessionStorage.getItem("token");

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

        getEmployees();
    }
};

async function getEmployees() {
    const response = await fetch(`${url}/empleados`, {
        method: "GET",
        headers: headers,
    });

    const json = await response.json();
    let table = employeesTable(json["message"]["results"]);

    document.querySelector("#table-container").appendChild(table);
}

add_button.addEventListener('click', () => {
    window.location.href = "add.html";
})

