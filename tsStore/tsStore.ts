import { TsStoreItem } from "./tsStoreItem";
import { TsStoreQueryType } from "./queryTypes";

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

    private compare(source: any, destination: any, queryType: TsStoreQueryType): boolean {
        let result = false;
        switch (queryType) {
            case TsStoreQueryType.NotEqual:
                if (source !== destination) {
                    result = true;
                }
                break;
            case TsStoreQueryType.GreaterThan:
                if (source > destination) {
                    result = true;
                }
                break;
            case TsStoreQueryType.GreaterThanOrEqual:
                if (source >= destination) {
                    result = true;
                }
                break;
            case TsStoreQueryType.LessThan:
                if (source < destination) {
                    result = true;
                }
                break;
            case TsStoreQueryType.LessThanOrEqual:
                if (source <= destination) {
                    result = true;
                }
                break;
            default:
                if (source === destination) {
                    result = true;
                }
                break;
        }
        return result;
    }

    public static getStore(storeName: string, isLocalStore: boolean = false) {
        return new TsStore(storeName, isLocalStore);
    }

    public find<T extends TsStoreItem>(field: string, value: any, queryType: TsStoreQueryType): T[] {
        let me = this;
        let dataStore: Storage = me.dataStore();
        let store: string | null = dataStore.getItem(me.storeName) || '[]';
        let storeKeys: string[] = JSON.parse(store);
        let result: T[] = [];
        for (let i: number = 0; i < storeKeys.length; i++) {
            try {
                let item: T = JSON.parse(dataStore.getItem(storeKeys[i]) || '') as T;
                if (item !== null) {
                    let storeValue: any = item[field];
                    if (me.compare(storeValue, value, queryType)) {
                        result.push(item);
                    }
                }
            } catch (ex) {
                console.log(ex);
            };
        }
        return result;
    }

    public insertOrUpdate<T extends TsStoreItem>(item: T): T {
        let me = this;
        let isItemExist: boolean = me.isStoreIdExists(item.storeItemId);
        if (!isItemExist) {
            do {
                item.storeItemId = me.storeName + 'Item_' + me.generateId();
            }
            while (isItemExist);
        }
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
