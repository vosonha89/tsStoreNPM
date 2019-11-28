import { TsStoreItem } from '../utils/tsStoreItem';

export class UserStoreModel extends TsStoreItem {
    public username: string = '';
    public name: string = '';
}

export class ProductStoreModel extends TsStoreItem {
    public productType: string = '';
    public productName: string = '';
}
