const list = document.querySelector(".list");
const addBtn = document.querySelector(".addBtn");
const filterBtn = document.querySelector(".filterBtn");

let minHeight = 0;
const heights = [164, 157, 160, 143, 170];
const fillHeights = () => {
    list.innerHTML = "";
    const filteredHeights = heights.filter((elem) => elem >= minHeight);
    filteredHeights.forEach((height) => {
        const li = document.createElement("li");
        li.innerHTML = height;
        list.appendChild(li);
    });
};
fillHeights();

addBtn.addEventListener("click", () => {
    const newHeight = prompt("Введите название книги");
    if (!newHeight) return alert("Рост не введен!");
    heights.push(newHeight);
    fillHeights();
});

filterBtn.addEventListener("click", () => {
    minHeight = prompt("Введите минимальный рост");
    fillHeights();
});
