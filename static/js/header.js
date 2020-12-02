let logout_button = document.querySelector('#logout');

function logout() {
    sessionStorage.removeItem("token");
    window.location.href = "login.html";
}

logout_button.addEventListener('click', logout);