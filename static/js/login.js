const url = 'https://nodejssa-backend.herokuapp.com';

const usuario = document.querySelector("#usuario");
const usuario_message = document.querySelector("#usuario-message");
const password = document.querySelector("#password");
const password_message = document.querySelector("#password-message");
const login_button = document.querySelector("#login");

let usuario_valid = false;
let password_valid = false;

window.onload = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("edit_id");
    sessionStorage.removeItem("delete_id");
};

async function login() {
    try {
        let response = await fetch(`${url}/usuario/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: usuario.value,
                password: password.value,
            }),
        });
    
        if (response.status == 400) {
            let alert = document.querySelector("#username-alert");
            alert.classList.remove("h-display-none");
            alert.classList.add("show");
        } else if (response.status == 200) {
            let json = await response.json();
            // TODO: Realizar una mejor implementación
            let token = json["message"]["token"];
            sessionStorage.setItem("token", token);
    
            window.location.href = "index.html";
        }
    } catch (error) {
        let alert = document.querySelector("#server-alert");
        alert.classList.add("show");
    }
}

usuario.addEventListener("change", () => {
    let value = usuario.value;

    if (value && value.length && value != " ") {
        usuario.classList.remove("is-invalid");
        usuario.classList.add("is-valid");
        usuario_message.textContent = "";
        usuario_valid = true;
    } else {
        usuario.classList.remove("is-valid");
        usuario.classList.add("is-invalid");
        usuario_message.textContent = "Ingresa tu usuario";
        usuario_valid = false;
    }
});

password.addEventListener("change", () => {
    let value = password.value;

    if (value && value.length && value != " ") {
        password.classList.remove("is-invalid");
        password.classList.add("is-valid");
        password_message.textContent = "";
        password_valid = true;
    } else {
        password.classList.remove("is-valid");
        password.classList.add("is-invalid");
        password_message.textContent = "Ingresa tu password";
        password_valid = false;
    }
});

login_button.addEventListener("click", () => {
    if (usuario_valid && password_valid) {
        login();
    }
});
