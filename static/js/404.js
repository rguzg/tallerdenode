function notfound(type) {
    let content = document.querySelector("#content");

    let row = document.createElement("div");
    row.classList.add("row");

    let container = document.createElement("div");
    container.classList.add("col-12", "m-not-found");

    let image = document.createElement("img");
    image.setAttribute("src", "../static/img/404.png");
    image.setAttribute("width", 400);
    image.setAttribute("height", 400);

    let message; 

    switch (type) {
        case "edit":
            message = document.createElement("h4");
            message.classList.add("mb-2");
            message.textContent = "No se encontró el empleado solicitado";

            break;

        default:
            break;
    }

    let home = document.createElement("a");
    home.setAttribute("href", "home.html");
    home.innerText = "Regresar al inicio";

    container.appendChild(image);
    container.appendChild(message);
    container.appendChild(home);

    row.appendChild(container);
    content.replaceWith(row);
}
