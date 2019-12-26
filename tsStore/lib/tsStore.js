"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var queryTypes_1 = require("./queryTypes");
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
    TsStore.prototype.compare = function (source, destination, queryType) {
        var result = false;
        switch (queryType) {
            case queryTypes_1.TsStoreQueryType.NotEqual:
                if (source !== destination) {
                    result = true;
                }
                break;
            case queryTypes_1.TsStoreQueryType.GreaterThan:
                if (source > destination) {
                    result = true;
                }
                break;
            case queryTypes_1.TsStoreQueryType.GreaterThanOrEqual:
                if (source >= destination) {
                    result = true;
                }
                break;
            case queryTypes_1.TsStoreQueryType.LessThan:
                if (source < destination) {
                    result = true;
                }
                break;
            case queryTypes_1.TsStoreQueryType.LessThanOrEqual:
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
    };
    TsStore.getStore = function (storeName, isLocalStore) {
        if (isLocalStore === void 0) { isLocalStore = false; }
        return new TsStore(storeName, isLocalStore);
    };
    TsStore.prototype.all = function () {
        var me = this;
        var dataStore = me.dataStore();
        var store = dataStore.getItem(me.storeName) || '[]';
        var storeKeys = JSON.parse(store);
        var result = [];
        for (var i = 0; i < storeKeys.length; i++) {
            try {
                var jsonItem = dataStore.getItem(storeKeys[i]) || '';
                if (jsonItem) {
                    var item = JSON.parse(jsonItem);
                    if (item !== null) {
                        result.push(item);
                    }
                }
            }
            catch (ex) {
                console.log(ex);
            }
            ;
        }
        return result;
    };
    TsStore.prototype.first = function () {
        var me = this;
        var dataStore = me.dataStore();
        var store = dataStore.getItem(me.storeName) || '[]';
        var storeKeys = JSON.parse(store);
        var result = null;
        try {
            var jsonItem = dataStore.getItem(storeKeys[0]) || '';
            if (jsonItem) {
                var item = JSON.parse(jsonItem);
                if (item !== null) {
                    result = item;
                }
            }
        }
        catch (ex) {
            console.log(ex);
        }
        ;
        return result;
    };
    TsStore.prototype.last = function () {
        var me = this;
        var dataStore = me.dataStore();
        var store = dataStore.getItem(me.storeName) || '[]';
        var storeKeys = JSON.parse(store);
        var result = null;
        try {
            var jsonItem = dataStore.getItem(storeKeys[storeKeys.length - 1]) || '';
            if (jsonItem) {
                var item = JSON.parse(jsonItem);
                if (item !== null) {
                    result = item;
                }
            }
        }
        catch (ex) {
            console.log(ex);
        }
        ;
        return result;
    };
    TsStore.prototype.find = function (field, value, queryType) {
        var me = this;
        var dataStore = me.dataStore();
        var store = dataStore.getItem(me.storeName) || '[]';
        var storeKeys = JSON.parse(store);
        var result = [];
        for (var i = 0; i < storeKeys.length; i++) {
            try {
                var jsonItem = dataStore.getItem(storeKeys[i]) || '';
                if (jsonItem) {
                    var item = JSON.parse(jsonItem);
                    if (item !== null) {
                        var storeValue = item[field];
                        if (me.compare(storeValue, value, queryType)) {
                            result.push(item);
                        }
                    }
                }
            }
            catch (ex) {
                console.log(ex);
            }
            ;
        }
        return result;
    };
    TsStore.prototype.insertOrUpdate = function (item) {
        var me = this;
        var dataStore = me.dataStore();
        var isItemExist = me.isStoreIdExists(item.storeItemId);
        if (!isItemExist) {
            do {
                item.storeItemId = me.storeName + 'Item_' + me.generateId();
            } while (isItemExist);
            var store = dataStore.getItem(me.storeName) || '[]';
            var storeKeys = JSON.parse(store);
            storeKeys.push(item.storeItemId);
            dataStore.setItem(me.storeName, JSON.stringify(storeKeys));
        }
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
