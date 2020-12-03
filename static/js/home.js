// const url = 'https://nodejssa-backend.herokuapp.com/';
const url = "http://localhost:88";

let token;
let headers = {};

let add_button = document.querySelector("#add");

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

        getEmployees();
    }
};

async function getEmployees() {
    const response = await fetch(`${url}/empleados`, {
        method: "GET",
        headers: headers,
    });

    const json = await response.json();

    if(json["message"]["results"].length == 0){
        notfound("employees");
    } else {
        if(json["message"]["count"] > json["message"]["results"].length){
            let pages = json["message"]["count"] / json["message"]["results"].length;
            let pagesContainer = pagination(pages);

            document.querySelector("#pages").appendChild(pagesContainer);

            let table = employeesTable(json["message"]["results"], true);
            document.querySelector("#table-container").appendChild(table);
        } else {
            let table = employeesTable(json["message"]["results"], true);
            document.querySelector("#table-container").appendChild(table);
        }
    }

}

add_button.addEventListener("click", () => {
    window.location.href = "add.html";
});
