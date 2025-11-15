let editingNode = null;

const form = document.getElementById("film-form");
const filmTbody = document.getElementById("film-tbody");
const nameInput = document.getElementById("title");
const genreInput = document.getElementById("genre");
const yearInput = document.getElementById("releaseYear");
const isWatchedInput = document.getElementById("isWatched");

const cancelBtn = form.querySelector(".cancel-btn");

const sortSelect = document.getElementById("sort-select");
const sortBtn = document.getElementById("sort-btn");

//name genre year isWatched
const addItemLocalstorage = (item) => {
    const cur = localStorage.getItem("films");
    if (cur) {
        localStorage.setItem(
            "films",
            JSON.stringify([...JSON.parse(cur), item])
        );
    } else {
        localStorage.setItem("films", JSON.stringify([item]));
    }
};
const editItemLocalstorage = (title, item) => {
    const cur = JSON.parse(localStorage.getItem("films"));
    const editingItemIndex = cur.findIndex((val) => {
        return val.name === title;
    });
    localStorage.setItem(
        "films",
        JSON.stringify([
            ...cur.slice(0, editingItemIndex),
            item,
            ...cur.slice(editingItemIndex + 1),
        ])
    );
};
const removeItemLocalstorage = (title) => {
    const cur = JSON.parse(localStorage.getItem("films"));
    localStorage.setItem(
        "films",
        JSON.stringify(cur.filter((item) => item.name !== title))
    );
};

const createItemFromInputs = () => {
    return {
        name: nameInput.value,
        genre: genreInput.value,
        year: yearInput.value,
        isWatched: isWatchedInput.checked ? "Да" : "Нет",
    };
};
const enableEditingMode = (node) => {
    editingNode = node;
    form.classList.add("editing");
    const tds = node.children;
    nameInput.value = tds[0].innerHTML;
    genreInput.value = tds[1].innerHTML;
    yearInput.value = tds[2].innerHTML;
    isWatchedInput.checked = tds[3].innerHTML === "Да";
};
const disableEditingMode = () => {
    editingNode = null;
    nameInput.value = "";
    genreInput.value = "";
    yearInput.value = "";
    isWatchedInput.checked = false;
    form.classList.remove("editing");
};

const editBtnEvent = (node) => {
    enableEditingMode(node);
};

const removeBtnEvent = (node) => {
    if (editingNode === node) {
        disableEditingMode();
    }
    removeItem(node);
    removeItemLocalstorage(node.children[0].innerHTML);
};

const addItemHtml = (item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${item.name}</td>
        <td>${item.genre}</td>
        <td>${item.year}</td>
        <td>${item.isWatched}</td>
        <td><button class="edit-btn">Редактировать</button><button class="remove-btn">Удалить</button></td>
    `;
    filmTbody.appendChild(tr);
    tr.querySelector(".edit-btn").addEventListener("click", () =>
        editBtnEvent(tr)
    );
    tr.querySelector(".remove-btn").addEventListener("click", () =>
        removeBtnEvent(tr)
    );
};

//name genre year isWatched
const addItem = (item) => {
    addItemLocalstorage(item);
    addItemHtml(item);
};

const editItem = (item) => {
    if (!editingNode) return console.error("Нет editingNode");
    const tds = editingNode.children;
    editItemLocalstorage(tds[0].innerHTML, item);
    tds[0].innerHTML = item.name;
    tds[1].innerHTML = item.genre;
    tds[2].innerHTML = item.year;
    tds[3].innerHTML = item.isWatched;
};

const removeItem = (node) => {
    node.remove();
};

const sortItems = () => {
    const sortType = sortSelect.value;
    let tdIndex = -1;
    switch (sortType) {
        case "name":
            tdIndex = 0;
            break;
        case "genre":
            tdIndex = 1;
            break;
        case "year":
            tdIndex = 2;
            break;
    }
    const items = Array.from(filmTbody.children);
    const sortedItems = items.toSorted((a, b) => {
        const f = a.children[tdIndex].innerHTML;
        const s = b.children[tdIndex].innerHTML;
        return f.localeCompare(s);
    });
    items.forEach((item) => item.remove());
    sortedItems.forEach((item) => filmTbody.appendChild(item));
};

sortBtn.addEventListener("click", sortItems);

cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    disableEditingMode();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (editingNode) {
        editItem(createItemFromInputs());
        disableEditingMode();
    } else {
        addItem(createItemFromInputs());
    }
});

// ===== //
const items = JSON.parse(localStorage.getItem("films"));
items.forEach((item) => addItemHtml(item));
sortItems()
