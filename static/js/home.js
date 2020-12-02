// const url = 'https://nodejssa-backend.herokuapp.com/';
const url = "http://localhost:88";

let token;
let headers = {};

window.onload = () => {
    token = sessionStorage.getItem("token");

    if (!token) {
        logout();
    } else {
        headers = {Authorization: `bearer ${token}`,}

        let decoded = jwt_decode(token);
        sessionStorage.setItem('page', 0);

        let username = document.querySelector("#username");
        if (decoded.nombre && decoded.apellido) {
            username.textContent = `${decoded.nombre} ${decoded.apellido}`;
        } else {
            username.textContent = decoded.username;
        }

        getEmployees();
    }
};

function logout() {
    sessionStorage.removeItem("token");
    window.location.href = "login.html";
}

async function getEmployees() {
    const response = await fetch(`${url}/empleados`, {
        method: "GET",
        headers: headers
    });

    const json = await response.json();

    console.log(json)
}

function employeesTable(employees){
    
}
