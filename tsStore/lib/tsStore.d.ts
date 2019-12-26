import { TsStoreItem } from "./tsStoreItem";
import { TsStoreQueryType } from "./queryTypes";
export declare class TsStore {
    isLocalStore: boolean;
    storeName: string;
    storeInit: boolean;
    private constructor();
    private dataStore;
    private generateId;
    private isStoreIdExists;
    private compare;
    static getStore(storeName: string, isLocalStore?: boolean): TsStore;
    all<T extends TsStoreItem>(): T[];
    first<T extends TsStoreItem>(): T;
    last<T extends TsStoreItem>(): T;
    find<T extends TsStoreItem>(field: string, value: any, queryType: TsStoreQueryType): T[];
    insertOrUpdate<T extends TsStoreItem>(item: T): T;
    remove(storeItemId: string): void;
    clear(): void;
}
