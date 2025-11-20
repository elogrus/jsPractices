import LocalStorageService from "./localStorageService.js";

const render = () => {
    const form = document.querySelector(".wrapper");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const item = {};
        formData.forEach((value, key) => {
            item[key] = value;
        });
        LocalStorageService.addItem(item);
        history.back();
    });

    document.querySelector(".spinner").style.display = "none";
    form.style.display = "";
};
setTimeout(render, 2000);
