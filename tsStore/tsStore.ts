export class TsStore {
    public isLocalStore: boolean = false;

    constructor(storeName: string, isLocalStore: boolean = false) {
        let me = this;
        me.isLocalStore = isLocalStore;
    }

    private getStore(): Storage {
        let me = this;
        let store: Storage;
        if (me.isLocalStore) {
            store = localStorage;
        }
        else {
            store = sessionStorage;
        }
        return store;
    }

    public insert(item: object) {
        let me = this;
        let store = me.getStore();
    }
}
