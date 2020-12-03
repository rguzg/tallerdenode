function notfound(type) {
    let content = document.querySelector("#content");
    
    let container = document.createElement("div");
    container.classList.add("col-12", "m-not-found");
    container.id = "content";

    let image = document.createElement("img");
    image.setAttribute("width", 400);
    image.setAttribute("height", 400);
    container.appendChild(image);

    let message = document.createElement("h4");

    switch (type) {
        case "edit":
            message.classList.add("mb-2");
            message.textContent = "No se encontró el empleado solicitado";

            image.setAttribute("src", "../static/img/404.png");

            let home = document.createElement("a");
            home.setAttribute("href", "home.html");
            home.innerText = "Regresar al inicio";

            sessionStorage.removeItem("edit_id");
            container.appendChild(message);
            container.appendChild(home);

            break;
        case "employees":
            message.classList.add("mb-2");
            message.textContent = "No hay ningún empleado";

            image.setAttribute("src", "../static/img/nothing.png");

            container.appendChild(message);

            break;
        default:
            break;
    }

    content.replaceWith(container);
}
