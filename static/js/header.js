let logout_button = document.querySelector('#logout');
let logo_button = document.querySelector('#logo');

function logout() {
    sessionStorage.removeItem("token");
    window.location.href = "login.html";
}

logout_button.addEventListener('click', logout);
logo_button.addEventListener('click', () => {
    window.location.href = "index.html";
});