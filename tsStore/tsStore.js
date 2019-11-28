"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TsStore = /** @class */ (function () {
    function TsStore(storeName, isLocalStore) {
        if (isLocalStore === void 0) { isLocalStore = false; }
        this.isLocalStore = false;
        this.storeName = '';
        this.storeInit = false;
        var me = this;
        me.isLocalStore = isLocalStore;
        me.storeName = storeName;
        var dataStore = me.dataStore();
        var store = dataStore.getItem(storeName);
        if (store === undefined || store === null || store === '') {
            dataStore.setItem(storeName, '[]');
            me.storeInit = true;
        }
        else {
            me.storeInit = true;
        }
    }
    TsStore.prototype.dataStore = function () {
        var me = this;
        var store;
        if (me.isLocalStore) {
            store = localStorage;
        }
        else {
            store = sessionStorage;
        }
        return store;
    };
    TsStore.prototype.generateId = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }).replace(new RegExp('-', 'g'), '');
    };
    TsStore.prototype.isStoreIdExists = function (storeId) {
        var me = this;
        var result = false;
        var dataStore = me.dataStore();
        var store = dataStore.getItem(storeId);
        if (store !== undefined && store !== null && store !== '') {
            result = true;
        }
        return result;
    };
    TsStore.getStore = function (storeName, isLocalStore) {
        if (isLocalStore === void 0) { isLocalStore = false; }
        return new TsStore(storeName, isLocalStore);
    };
    TsStore.prototype.insert = function (item) {
        var me = this;
        do {
            item.storeItemId = me.storeName + 'Item_' + me.generateId();
        } while (me.isStoreIdExists(item.storeItemId));
        var dataStore = me.dataStore();
        var store = dataStore.getItem(me.storeName) || '[]';
        var storeKeys = JSON.parse(store);
        storeKeys.push(item.storeItemId);
        dataStore.setItem(me.storeName, JSON.stringify(storeKeys));
        dataStore.setItem(item.storeItemId, JSON.stringify(item));
        return item;
    };
    TsStore.prototype.remove = function (storeItemId) {
        var me = this;
        var dataStore = me.dataStore();
        '';
        var store = dataStore.getItem(me.storeName) || '[]';
        var storeKeys = JSON.parse(store);
        storeKeys.splice(storeKeys.indexOf(storeItemId), 1);
        dataStore.setItem(me.storeName, JSON.stringify(storeKeys));
        dataStore.removeItem(storeItemId);
    };
    TsStore.prototype.clear = function () {
        var me = this;
        var dataStore = me.dataStore();
        var store = dataStore.getItem(me.storeName) || '[]';
        var storeKeys = JSON.parse(store);
        for (var i = 0; i < storeKeys.length; i++) {
            dataStore.removeItem(storeKeys[i]);
        }
        dataStore.removeItem(me.storeName);
    };
    return TsStore;
}());
exports.TsStore = TsStore;
