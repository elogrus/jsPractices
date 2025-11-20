import ItemRenderService from "./itemRenderService.js";
import LocalStorageService from "./localStorageService.js";
const render = () => {
    const wrapper = document.querySelector(".wrapper");
    const table = document.querySelector("table");
    const tbody = table.querySelector("tbody");

    const renderService = new ItemRenderService(tbody);
    let items = LocalStorageService.getItems();
    renderService.renderItems(items);

    table.addEventListener("click", (e) => {
        const target = e.target;
        switch (target.nodeName) {
            case "TH":
                const field = target.getAttribute("data-field");
                if (field) {
                    renderService.sortField = field;
                    renderService.renderItems(items);
                }
                const ths = target.parentNode.querySelectorAll("th");
                ths.forEach((th) => th.classList.remove("active"));
                target.classList.add("active");
                break;
            case "BUTTON":
                const itemName =
                    target.parentNode.parentNode.querySelector(
                        "td:first-child"
                    ).innerHTML;
                LocalStorageService.removeItem(itemName);
                items = LocalStorageService.getItems(itemName);
                renderService.renderItems(items);
        }
    });

    document.querySelector(".spinner").style.display = "none";
    wrapper.style.display = "";
};
setTimeout(render, 0);
