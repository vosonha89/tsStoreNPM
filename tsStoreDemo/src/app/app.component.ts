import { Component, OnInit } from '@angular/core';
import { TsStore } from './utils/tsStore';

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
        let userStore = TsStore.getStore('userStore');
        for (let i = 0; i < 200; i++) {
            userStore.insert({ username: 'user' + i, name: 'USER' + i });
        }

        let productStore = TsStore.getStore('productStore', true);
        for (let i = 0; i < 250; i++) {
            productStore.insert({ productType: 'TYPE' + i, productName: 'PRODUCTNAME' + i });
        }
    }
}
