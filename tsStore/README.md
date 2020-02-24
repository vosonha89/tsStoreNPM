# tsStoreNPM
LocalStorage and SessionStorage for typescript

## Installation
```sh
$ npm i typescriptstore
```
```shtsStoreNPM``` requires [Typescript](https://www.typescriptlang.org/) v3.7+ to run.

## How to use

### Model need to inherit from TsStoreItem Object
```sh
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
```
### Import relative objects
```sh
import { UserStoreModel, ProductStoreModel } from './model/testModel';
import { TsStore } from 'typescriptstore/lib/tsStore';
import { TsStoreQueryType } from 'typescriptstore/lib/queryTypes';
```
### Init store to use
```sh
let userStore: TsStore = TsStore.getStore('userStore');
```
### Insert or update item
```sh
let item: UserStoreModel = new UserStoreModel();
item.username = 'user' + i;
item.name = 'USER' + i;
item.age = i + 2;
item = userStore.insertOrUpdate(item)
```
### Remove item by id
```sh
userStore.remove(item.storeItemId);
```
### Clear all items in store
```sh
userStore.clear();
```
### Find item by query condition base on #QueryType
```sh
let findItems: UserStoreModel[] = userStore.find('age', 2, TsStoreQueryType.Equal);
```
#### QueryType
```sh
export enum TsStoreQueryType {
    Equal,
    NotEqual,
    GreaterThan,
    GreaterThanOrEqual,
    LessThan,
    LessThanOrEqual
}
```
### Get all items in store
```sh
let allItems: UserStoreModel[] = userStore.all();
```
### Get first item in store
```sh
let fistItem: UserStoreModel = userStore.first();
```
### Get last item in store
```sh
let lastItem: UserStoreModel = userStore.last();
```
### Download & run demo for more clearly(Angular2+ required).
```sh
$ cd tsStoreDemo
$ npm install
$ npm start
```

License
----
MIT



