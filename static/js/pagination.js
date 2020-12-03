function pagination(pages) {
    let offset = 20;
    let container = document.createElement("nav");
    let list = document.createElement("ul");
    list.classList.add("pagination");

    let pagesContainer = [];

    for (let i = 1; i <= pages; i++) {
        let item = document.createElement("li");

        if (i == 1) {
            item.classList.add("page-link", "active");
        } else {
            item.classList.add("page-link", "disabled");
        }

        item.innerText = i;
        pagesContainer.push(item);

        item.addEventListener("click", async () => {
            const response = await fetch(`${url}/empleados/?offset=${(i - 1) * offset}`, {
                method: "GET",
                headers: headers,
            });

            const json = await response.json();

            if (json["message"]["results"].length == 0) {
                notfound("employees");
            } else {
                let table = employeesTable(json["message"]["results"], true);
                document.querySelector("#empleados-tabla").replaceWith(table);

                selectedPage(i);
            }
        });
    }

    pagesContainer.forEach((element) => {
        list.appendChild(element);
    });

    container.appendChild(list);

    function selectedPage(selected){
        for (let j = 0; j < pagesContainer.length; j++) {
            let element = pagesContainer[j]
            if (j == selected-1) {
                element.classList.remove("disabled");
                element.classList.add("active");
            } else {
                element.classList.remove("active");
                element.classList.add("disabled");
            }
        }
    }

    return container;
}
