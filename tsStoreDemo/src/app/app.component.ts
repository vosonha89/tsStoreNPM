import { Component, OnInit } from '@angular/core';
import { TsStore } from './utils/tsStore';
import { UserStoreModel, ProductStoreModel } from './model/testModel';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public title = 'tsStoreDemo';
    constructor() {
        let userStore = TsStore.getStore('userStore');
        let productStore = TsStore.getStore('productStore', true);
    }

    ngOnInit(): void {
        let userStore: TsStore = TsStore.getStore('userStore');
        userStore.clear();
        for (let i = 0; i < 200; i++) {
            let item: UserStoreModel = new UserStoreModel();
            item.username = 'user' + i;
            item.name = 'USER' + i;
            item = userStore.insertOrUpdate(item)
            if (i <= 100) {
                item.username = 'updatedUser' + i;
                item = userStore.insertOrUpdate(item)
            }
            else {
                userStore.remove(item.storeItemId);
            }
        }

        let productStore: TsStore = TsStore.getStore('productStore', true);
        productStore.clear();
        for (let i = 0; i < 250; i++) {
            let item: ProductStoreModel = new ProductStoreModel();
            item.productType = 'TYPE' + i;
            item.productName = 'PRODUCTNAME' + i;
            item = productStore.insertOrUpdate(item);
        }
    }
}
