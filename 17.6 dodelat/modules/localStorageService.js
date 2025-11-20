// Item: {name: string, shelf: string, weight: number, date: Date}
export default class LocalStorageService {
    static key = "items";
    static getItems() {
        const items = JSON.parse(localStorage.getItem(this.key));
        if (!items) {
            this.setItems([]);
            return [];
        }
        return items;
    }
    static setItems(items) {
        localStorage.setItem(this.key, JSON.stringify(items));
    }
    static addItem(item) {
        const newItems = [...this.getItems(), item];
        this.setItems(newItems);
    }
    static removeItem(name) {
        const newItems = this.getItems().filter((item) => item.name !== name);
        this.setItems(newItems);
    }
    static removeItems() {
        this.setItems([]);
    }
}
