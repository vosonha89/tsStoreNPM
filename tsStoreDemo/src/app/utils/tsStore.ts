import { TsStoreItem } from "./tsStoreItem";

export class TsStore {
    public isLocalStore: boolean = false;
    public storeName: string = '';
    public storeInit: boolean = false;

    private constructor(storeName: string, isLocalStore: boolean = false) {
        let me = this;
        me.isLocalStore = isLocalStore;
        me.storeName = storeName;
        let dataStore: Storage = me.dataStore();
        let store: string | null = dataStore.getItem(storeName);
        if (store === undefined || store === null || store === '') {
            dataStore.setItem(storeName, '[]');
            me.storeInit = true;
        }
        else {
            me.storeInit = true;
        }
    }

    private dataStore(): Storage {
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

    private generateId(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }).replace(new RegExp('-', 'g'), '');
    }

    private isStoreIdExists(storeId: string): boolean {
        let me = this;
        let result: boolean = false;
        let dataStore: Storage = me.dataStore();
        let store: string | null = dataStore.getItem(storeId);
        if (store !== undefined && store !== null && store !== '') {
            result = true;
        }
        return result;
    }

    public static getStore(storeName: string, isLocalStore: boolean = false) {
        return new TsStore(storeName, isLocalStore);
    }

    public insert<T extends TsStoreItem>(item: T): T {
        let me = this;
        do {
            item.storeItemId = me.storeName + 'Item_' + me.generateId();
        }
        while (me.isStoreIdExists(item.storeItemId));
        let dataStore: Storage = me.dataStore();
        let store: string | null = dataStore.getItem(me.storeName) || '[]';
        let storeKeys: string[] = JSON.parse(store);
        storeKeys.push(item.storeItemId);
        dataStore.setItem(me.storeName, JSON.stringify(storeKeys));
        dataStore.setItem(item.storeItemId, JSON.stringify(item));
        return item;
    }

    public remove(storeItemId: string): void {
        let me = this;
        let dataStore: Storage = me.dataStore(); ''
        let store: string | null = dataStore.getItem(me.storeName) || '[]';
        let storeKeys: string[] = JSON.parse(store);
        storeKeys.splice(storeKeys.indexOf(storeItemId), 1);
        dataStore.setItem(me.storeName, JSON.stringify(storeKeys));
        dataStore.removeItem(storeItemId);
    }

    public clear(): void {
        let me = this;
        let dataStore: Storage = me.dataStore();
        let store: string | null = dataStore.getItem(me.storeName) || '[]';
        let storeKeys: string[] = JSON.parse(store);
        for (let i: number = 0; i < storeKeys.length; i++) {
            dataStore.removeItem(storeKeys[i]);
        }
        dataStore.removeItem(me.storeName);
    }
}
