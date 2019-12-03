import { TsStoreItem } from 'typescriptstore/lib/tsStoreItem';

export class UserStoreModel extends TsStoreItem {
    public username: string = '';
    public name: string = '';
    public age: number = 0;
}

export class ProductStoreModel extends TsStoreItem {
    public productType: string = '';
    public productName: string = '';
}
