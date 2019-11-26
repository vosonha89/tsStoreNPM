"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TsStore = /** @class */ (function () {
    function TsStore(storeName, isLocalStore) {
        if (isLocalStore === void 0) { isLocalStore = false; }
        this.isLocalStore = false;
        var me = this;
        me.isLocalStore = isLocalStore;
    }
    TsStore.prototype.getStore = function () {
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
    TsStore.prototype.insert = function (item) {
        var me = this;
        var store = me.getStore();
    };
    return TsStore;
}());
exports.TsStore = TsStore;
