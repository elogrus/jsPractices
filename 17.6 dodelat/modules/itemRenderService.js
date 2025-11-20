// Item: {name: string, shelf: string, weight: number, time: Date}
export default class ItemRenderService {
    sortField = "date"; // name, shelf, weight, date
    set sortField(field) {
        if (field in ["name", "shelf", "weight", "date"]) {
            this.sortField = field;
        } else {
            throw new Error("Bad sortField value: " + field);
        }
    }
    constructor(tbody) {
        this.tbody = tbody;
    }

    sortItems(items, sortField) {
        return items.toSorted((a, b) =>
            a[sortField].localeCompare(b[sortField])
        );
    }
    renderItems(items) {
        let htmlItems = ``;
        const sortedItems = this.sortItems(items, this.sortField);
        for (const item of sortedItems) {
            htmlItems += `\n<tr>
                <td>${item.name}</td>
                <td>${item.shelf}</td>
                <td>${item.weight} кг</td>
                <td>${item.date}</td>
                <td><button class="removeBtn">Удалить</button></td>
            </tr>`;
        }
        this.tbody.innerHTML = htmlItems;
    }
}
