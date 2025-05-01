class MyStorage {
    #appName: string;
    #data: Record<string, unknown>;
    #storage: Storage = localStorage;

    constructor(appName: string) {
        this.#appName = appName;
        this.#data = JSON.parse(this.#storage[this.#appName] || '{}');
    }

    getItem(key: string) {
        return this.#data[key];
    }

    setItem(key: string, value: unknown) {
        this.#data[key] = value;
    }

    save() {
        this.#storage[this.#appName] = JSON.stringify(this.#data);
    }
}

export default MyStorage;