const list = document.querySelector(".list");
const addBtn = document.querySelector(".addBtn");
const findBtn = document.querySelector(".findBtn");

addBtn.addEventListener("click", () => {
    const newBook = prompt("Введите название книги");
    if (!newBook) return alert("Название книги не введено!");

    const li = document.createElement("li");
    li.innerHTML = newBook;
    list.appendChild(li);
});

findBtn.addEventListener("click", () => {
    const book = prompt("Введите название книги");
    if (!book) return alert("Название книги не введено!");

    let finded = false;
    for (elem of list.children) {
        if (!finded && elem.textContent == book) {
            elem.classList.add("active");
            finded = true;
        } else {
            elem.classList.remove("active");
        }
    }
    if (!finded) alert("Книга не найдена!");
});
