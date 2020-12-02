// const url = 'https://nodejssa-backend.herokuapp.com/';
const url = "http://localhost:88";

const nombre = document.querySelector("#nombre");
const nombre_message = document.querySelector("#nombre-message");

const apellidos = document.querySelector("#apellidos");
const apellidos_message = document.querySelector("#apellidos-message");

const telefono = document.querySelector("#telefono");
const telefono_message = document.querySelector("#telefono-message");

const correo = document.querySelector("#correo");
const correo_message = document.querySelector("#correo-message");

const direccion = document.querySelector("#direccion");

const add_button = document.querySelector("#add");

let nombre_valid = true;
let apellidos_valid = true;
let telefono_valid = true;
let correo_valid = true;

let empleado_id;

window.onload = () => {
    token = sessionStorage.getItem("token");

    if (!token) {
        logout();
    } else {
        headers = { Authorization: `bearer ${token}` };

        let decoded = jwt_decode(token);

        let username = document.querySelector("#username");
        if (decoded.nombre && decoded.apellido) {
            username.textContent = `${decoded.nombre} ${decoded.apellido}`;
        } else {
            username.textContent = decoded.username;
        }

        getUserData();
    }
};

async function getUserData() {
    empleado_id = sessionStorage.getItem("edit_id");

    if (empleado_id == null) {
        notfound("edit");
    } else {
        let response = await fetch(`${url}/empleados/${empleado_id}`, {
            method: "GET",
            headers,
        });

        let json = await response.json();
        let { message: userData } = json;

        if (response.status == 404) {
            notfound("edit");
        } else if (response.status == 200) {
            nombre.value = userData["nombre"];
            apellidos.value = userData["apellidos"];
            telefono.value = userData["telefono"];
            correo.value = userData["correo"];
            direccion.value = userData["direccion"];
        } else if (response.status == 500) {
            let alert = document.querySelector("#server-alert");
            alert.classList.remove("h-display-none");
            alert.classList.add("show");
        }
    }
}

async function edit() {
    let response = await fetch(`${url}/empleados/${empleado_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        body: JSON.stringify({
            nombre: nombre.value,
            apellidos: apellidos.value,
            telefono: telefono.value || null,
            correo: correo.value || null,
            direccion: direccion.value || null,
        }),
    });

    if (response.status == 400) {
        let alert = document.querySelector("#alert");
        alert.classList.remove("h-display-none");
        alert.classList.add("show");
    } else if (response.status == 200) {
        let alert = document.querySelector("#success-alert");
        alert.classList.remove("h-display-none");
        alert.classList.add("show");
        sessionStorage.removeItem("edit_id");
    } else if (response.status == 500) {
        let alert = document.querySelector("#server-alert");
        alert.classList.remove("h-display-none");
        alert.classList.add("show");
    }
}

nombre.addEventListener("change", () => {
    let value = nombre.value;

    if (value && value.length && value != " ") {
        nombre.classList.remove("is-invalid");
        nombre.classList.add("is-valid");
        nombre_message.textContent = "";
        nombre_valid = true;
    } else {
        nombre.classList.remove("is-valid");
        nombre.classList.add("is-invalid");
        nombre_message.textContent = "Ingresa un nombre";
        usuario_valid = false;
    }
});

apellidos.addEventListener("change", () => {
    let value = apellidos.value;

    if (value && value.length && value != " ") {
        apellidos.classList.remove("is-invalid");
        apellidos.classList.add("is-valid");
        apellidos_message.textContent = "";
        apellidos_valid = true;
    } else {
        apellidos.classList.remove("is-valid");
        apellidos.classList.add("is-invalid");
        apellidos_message.textContent = "Ingresa unos apellidos";
        usuario_valid = false;
    }
});

telefono.addEventListener("change", () => {
    let value = telefono.value;

    if ((!isNaN(Number(value)) && value.length == 10) || value.length == 0) {
        telefono.classList.remove("is-invalid");
        telefono.classList.add("is-valid");
        telefono_message.textContent = "";
        telefono_valid = true;
    } else {
        telefono.classList.remove("is-valid");
        telefono.classList.add("is-invalid");
        telefono_message.textContent = "Ingresa un teléfono valido";
        usuario_valid = false;
    }
});

correo.addEventListener("change", () => {
    let value = correo.value;

    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) || value.length == 0) {
        correo.classList.remove("is-invalid");
        correo.classList.add("is-valid");
        correo_message.textContent = "";
        correo_valid = true;
    } else {
        correo.classList.remove("is-valid");
        correo.classList.add("is-invalid");
        correo_message.textContent = "Ingresa un correo valido";
        usuario_valid = false;
    }
});

add_button.addEventListener("click", () => {
    if (nombre_valid && apellidos_valid && telefono_valid && correo_valid) {
        edit();
    }
});
