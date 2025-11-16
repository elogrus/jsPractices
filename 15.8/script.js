let filters = {
    title: "",
    genre: "",
    releaseYear: "",
    isWatched: "all", // all yes no
};

function handleFormSubmit(e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const genre = document.getElementById("genre").value;
    const releaseYear = document.getElementById("releaseYear").value;
    const isWatched = document.getElementById("isWatched").checked;

    const film = {
        title: title,
        genre: genre,
        releaseYear: releaseYear,
        isWatched: isWatched,
    };

    addFilm(film);
}

async function addFilm(film) {
    // const films = JSON.parse(localStorage.getItem("films")) || [];
    // films.push(film);
    // localStorage.setItem("films", JSON.stringify(films));

    // console.log(film);
    await fetch("https://sb-film.skillbox.cc/films", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            email: "ovikdevil@gmail.com",
        },
        body: JSON.stringify(film),
    });
    renderTable();
}

async function removeFilm(film) {
    // const films = JSON.parse(localStorage.getItem("films")) || [];
    // films.push(film);
    // localStorage.setItem("films", JSON.stringify(films));

    // console.log(film);
    await fetch("https://sb-film.skillbox.cc/films/" + film.id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            email: "ovikdevil@gmail.com",
        },
    });
    renderTable();
}

async function removeAllFilms() {
    // const films = JSON.parse(localStorage.getItem("films")) || [];
    // films.push(film);
    // localStorage.setItem("films", JSON.stringify(films));

    // console.log(film);
    await fetch("https://sb-film.skillbox.cc/films", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            email: "ovikdevil@gmail.com",
        },
    });
    renderTable();
}

const generateLink = () => {
    const result = "https://sb-film.skillbox.cc/films";
    const options = [];

    for (field in filters) {
        switch (field) {
            case "isWatched":
                if (filters[field] === "all") continue;
                options.push(`${field}=${filters[field] === "yes"}`);
                break;

            default:
                if (!filters[field]) continue;
                options.push(`${field}=${filters[field]}`);
                break;
        }
    }
    if (options.length === 0) return result;
    return result + "?" + options.join("&");
};

async function renderTable() {
    // const films = JSON.parse(localStorage.getItem("films")) || [];
    const filmsResponse = await fetch(generateLink(), {
        headers: { email: "ovikdevil@gmail.com" },
    });
    const films = await filmsResponse.json();

    const filmTableBody = document.getElementById("film-tbody");

    // Clear table body first
    filmTableBody.innerHTML = "";

    // Then add new rows
    films.forEach((film, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${film.title}</td>
            <td>${film.genre}</td>
            <td>${film.releaseYear}</td>
            <td>${film.isWatched ? "Да" : "Нет"}</td>
            <td><button>Удалить</button></td>
    `;
        filmTableBody.appendChild(row);
        row.querySelector("button").addEventListener("click", () =>
            removeFilm(film)
        );
    });
}

document
    .getElementById("film-form")
    .addEventListener("submit", handleFormSubmit);

// Display films on load
renderTable();

// --------------- //

const filterBlock = document.querySelector(".filterBlock");
const title = filterBlock.querySelector(".title");
const genre = filterBlock.querySelector(".genre");
const year = filterBlock.querySelector(".releaseYear");
const isWatched = filterBlock.querySelector(".isWatched");
const removeAllBtn = document.querySelector(".panel > button");

removeAllBtn.addEventListener("click", removeAllFilms);

const debounce = (callee, timeoutMs) => {
    return function perform(...args) {
        let previousCall = this.lastCall;

        this.lastCall = Date.now();

        if (previousCall && this.lastCall - previousCall <= timeoutMs) {
            clearTimeout(this.lastCallTimer);
        }

        this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs);
    };
};
const handleFilterChange = (e) => {
    const type = e.target.getAttribute("name");
    filters[type] = e.target.value;
    renderTable();
};

title.addEventListener("change", debounce(handleFilterChange, 300));
genre.addEventListener("change", debounce(handleFilterChange, 300));
year.addEventListener("change", debounce(handleFilterChange, 300));
isWatched.addEventListener("change", debounce(handleFilterChange, 300));
