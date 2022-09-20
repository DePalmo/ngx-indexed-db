/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class NgxIndexedDB {
    /**
     * @param {?} dbName
     * @param {?} version
     */
    constructor(dbName, version) {
        this.utils = new Utils();
        this.dbWrapper = new DbWrapper(dbName, version);
    }
    /**
     * @param {?} version
     * @param {?=} upgradeCallback
     * @return {?}
     */
    openDatabase(version, upgradeCallback) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this.dbWrapper.dbVersion = version;
            /** @type {?} */
            let request = this.utils.indexedDB.open(this.dbWrapper.dbName, version);
            request.onsuccess = (/**
             * @return {?}
             */
            () => {
                this.dbWrapper.db = request.result;
                resolve();
            });
            request.onerror = (/**
             * @param {?} e
             * @return {?}
             */
            e => {
                reject('IndexedDB error: ' + ((/** @type {?} */ (e.target))).errorCode
                    ? ((/** @type {?} */ (e.target))).errorCode + ' (' + ((/** @type {?} */ (e.target))).error + ')'
                    : ((/** @type {?} */ (e.target))).errorCode);
            });
            if (typeof upgradeCallback === 'function') {
                request.onupgradeneeded = (/**
                 * @param {?} e
                 * @return {?}
                 */
                e => {
                    upgradeCallback(e, this.dbWrapper.db);
                });
            }
        }));
    }
    /**
     * @param {?} storeName
     * @param {?} key
     * @return {?}
     */
    getByKey(storeName, key) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this.dbWrapper.validateBeforeTransaction(storeName, reject);
            /** @type {?} */
            let transaction = this.dbWrapper.createTransaction(this.dbWrapper.optionsGenerator(DBMode.readonly, storeName, reject, resolve));
            /** @type {?} */
            let objectStore = transaction.objectStore(storeName);
            /** @type {?} */
            let request;
            request = objectStore.get(key);
            request.onsuccess = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                resolve(((/** @type {?} */ (event.target))).result);
            });
        }));
    }
    /**
     * @param {?} storeName
     * @param {?=} keyRange
     * @param {?=} indexDetails
     * @return {?}
     */
    getAll(storeName, keyRange, indexDetails) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this.dbWrapper.validateBeforeTransaction(storeName, reject);
            /** @type {?} */
            let transaction = this.dbWrapper.createTransaction(this.dbWrapper.optionsGenerator(DBMode.readonly, storeName, reject, resolve));
            /** @type {?} */
            let objectStore = transaction.objectStore(storeName);
            /** @type {?} */
            let result = [];
            /** @type {?} */
            let request;
            if (indexDetails) {
                /** @type {?} */
                let index = objectStore.index(indexDetails.indexName);
                /** @type {?} */
                let order = indexDetails.order === 'desc' ? 'prev' : 'next';
                request = index.openCursor(keyRange, (/** @type {?} */ (order)));
            }
            else {
                request = objectStore.openCursor(keyRange);
            }
            request.onerror = (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                reject(e);
            });
            request.onsuccess = (/**
             * @param {?} evt
             * @return {?}
             */
            function (evt) {
                /** @type {?} */
                let cursor = ((/** @type {?} */ (evt.target))).result;
                if (cursor) {
                    result.push(cursor['value']);
                    cursor['continue']();
                }
                else {
                    resolve(result);
                }
            });
        }));
    }
    /**
     * @param {?} storeName
     * @param {?=} keyRange
     * @param {?=} count
     * @return {?}
     */
    getAllFast(storeName, keyRange, count) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this.dbWrapper.validateBeforeTransaction(storeName, reject);
            /** @type {?} */
            let transaction = this.dbWrapper.createTransaction(this.dbWrapper.optionsGenerator(DBMode.readonly, storeName, reject, resolve));
            /** @type {?} */
            let objectStore = transaction.objectStore(storeName);
            /** @type {?} */
            let request;
            request = objectStore.getAll(keyRange, count);
            request.onerror = (/**
             * @param {?} e
             * @return {?}
             */
            (e) => reject(e));
            request.onsuccess = (/**
             * @param {?} e
             * @return {?}
             */
            (e) => resolve(((/** @type {?} */ (e.target))).result));
        }));
    }
    /**
     * @param {?} storeName
     * @param {?} value
     * @param {?=} key
     * @return {?}
     */
    add(storeName, value, key) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this.dbWrapper.validateBeforeTransaction(storeName, reject);
            /** @type {?} */
            let transaction = this.dbWrapper.createTransaction(this.dbWrapper.optionsGenerator(DBMode.readwrite, storeName, reject, resolve));
            /** @type {?} */
            let objectStore = transaction.objectStore(storeName);
            /** @type {?} */
            let request = objectStore.add(value, key);
            request.onsuccess = (/**
             * @param {?} evt
             * @return {?}
             */
            (evt) => {
                key = evt.target.result;
            });
        }));
    }
    /**
     * @param {?} storeName
     * @param {?=} keyRange
     * @return {?}
     */
    count(storeName, keyRange) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this.dbWrapper.validateBeforeTransaction(storeName, reject);
            /** @type {?} */
            let transaction = this.dbWrapper.createTransaction(this.dbWrapper.optionsGenerator(DBMode.readonly, storeName, reject, resolve));
            /** @type {?} */
            let objectStore = transaction.objectStore(storeName);
            /** @type {?} */
            let request;
            request = objectStore.count(keyRange);
            request.onerror = (/**
             * @param {?} e
             * @return {?}
             */
            (e) => reject(e));
            request.onsuccess = (/**
             * @param {?} e
             * @return {?}
             */
            (e) => resolve(((/** @type {?} */ (e.target))).result));
        }));
    }
    /**
     * @param {?} storeName
     * @param {?} value
     * @param {?=} key
     * @return {?}
     */
    update(storeName, value, key) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this.dbWrapper.validateBeforeTransaction(storeName, reject);
            /** @type {?} */
            let transaction = this.dbWrapper.createTransaction(this.dbWrapper.optionsGenerator(DBMode.readwrite, storeName, reject, resolve));
            /** @type {?} */
            let objectStore = transaction.objectStore(storeName);
            objectStore.put(value, key);
        }));
    }
    /**
     * @param {?} storeName
     * @param {?} values
     * @param {?=} key
     * @return {?}
     */
    updateBulk(storeName, values, key) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this.dbWrapper.validateBeforeTransaction(storeName, reject);
            /** @type {?} */
            let transaction = this.dbWrapper.createTransaction(this.dbWrapper.optionsGenerator(DBMode.readwrite, storeName, reject, resolve));
            /** @type {?} */
            let objectStore = transaction.objectStore(storeName);
            values.forEach((/**
             * @param {?} value
             * @return {?}
             */
            value => {
                objectStore.put(value, key);
            }));
        }));
    }
    /**
     * @param {?} storeName
     * @param {?} key
     * @return {?}
     */
    delete(storeName, key) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this.dbWrapper.validateBeforeTransaction(storeName, reject);
            /** @type {?} */
            let transaction = this.dbWrapper.createTransaction(this.dbWrapper.optionsGenerator(DBMode.readwrite, storeName, reject, resolve));
            /** @type {?} */
            let objectStore = transaction.objectStore(storeName);
            objectStore.delete(key);
        }));
    }
    /**
     * @param {?} storeName
     * @param {?} keys
     * @return {?}
     */
    deleteBulk(storeName, keys) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this.dbWrapper.validateBeforeTransaction(storeName, reject);
            /** @type {?} */
            let transaction = this.dbWrapper.createTransaction(this.dbWrapper.optionsGenerator(DBMode.readwrite, storeName, reject, resolve));
            /** @type {?} */
            let objectStore = transaction.objectStore(storeName);
            keys.forEach((/**
             * @param {?} key
             * @return {?}
             */
            key => {
                objectStore.delete(key);
            }));
        }));
    }
    /**
     * @return {?}
     */
    deleteDatabase() {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this.dbWrapper.db.close();
            /** @type {?} */
            const deleteDBRequest = this.utils.indexedDB.deleteDatabase(this.dbWrapper.dbName);
            deleteDBRequest.onsuccess = resolve;
            deleteDBRequest.onerror = reject;
            deleteDBRequest.onblocked = (/**
             * @return {?}
             */
            () => {
                throw new Error('Unable to delete database because it\'s blocked');
            });
        }));
    }
    /**
     * @param {?} storeName
     * @param {?} cursorCallback
     * @param {?=} keyRange
     * @return {?}
     */
    openCursor(storeName, cursorCallback, keyRange) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this.dbWrapper.validateBeforeTransaction(storeName, reject);
            /** @type {?} */
            let transaction = this.dbWrapper.createTransaction(this.dbWrapper.optionsGenerator(DBMode.readonly, storeName, reject, resolve));
            /** @type {?} */
            let objectStore = transaction.objectStore(storeName);
            /** @type {?} */
            let request = objectStore.openCursor(keyRange);
            request.onsuccess = (/**
             * @param {?} evt
             * @return {?}
             */
            (evt) => {
                cursorCallback(evt);
                resolve();
            });
        }));
    }
    /**
     * @param {?} storeName
     * @param {?} indexName
     * @param {?} cursorCallback
     * @param {?=} keyRange
     * @return {?}
     */
    openCursorWithIndex(storeName, indexName, cursorCallback, keyRange) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this.dbWrapper.validateBeforeTransaction(storeName, reject);
            /** @type {?} */
            let transaction = this.dbWrapper.createTransaction(this.dbWrapper.optionsGenerator(DBMode.readonly, storeName, reject, resolve));
            /** @type {?} */
            let objectStore = transaction.objectStore(storeName);
            /** @type {?} */
            let index = objectStore.index(indexName);
            /** @type {?} */
            let request = index.openCursor(keyRange);
            request.onsuccess = (/**
             * @param {?} evt
             * @return {?}
             */
            (evt) => {
                cursorCallback(evt);
                resolve();
            });
        }));
    }
    /**
     * @param {?} storeName
     * @return {?}
     */
    clear(storeName) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this.dbWrapper.validateBeforeTransaction(storeName, reject);
            /** @type {?} */
            let transaction = this.dbWrapper.createTransaction(this.dbWrapper.optionsGenerator(DBMode.readwrite, storeName, reject, resolve));
            /** @type {?} */
            let objectStore = transaction.objectStore(storeName);
            objectStore.clear();
            resolve();
        }));
    }
    /**
     * @param {?} storeName
     * @param {?} indexName
     * @param {?} key
     * @return {?}
     */
    getByIndex(storeName, indexName, key) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this.dbWrapper.validateBeforeTransaction(storeName, reject);
            /** @type {?} */
            let transaction = this.dbWrapper.createTransaction(this.dbWrapper.optionsGenerator(DBMode.readonly, storeName, reject, resolve));
            /** @type {?} */
            let objectStore = transaction.objectStore(storeName);
            /** @type {?} */
            let index = objectStore.index(indexName);
            /** @type {?} */
            let request = index.get(key);
            request.onsuccess = (/**
             * @param {?} event
             * @return {?}
             */
            event => {
                resolve(((/** @type {?} */ (event.target))).result);
            });
        }));
    }
}
if (false) {
    /** @type {?} */
    NgxIndexedDB.prototype.utils;
    /** @type {?} */
    NgxIndexedDB.prototype.dbWrapper;
}
export class Utils {
    constructor() {
        this.indexedDB =
            window.indexedDB ||
                ((/** @type {?} */ (window))).mozIndexedDB ||
                ((/** @type {?} */ (window))).webkitIndexedDB ||
                ((/** @type {?} */ (window))).msIndexedDB;
    }
}
if (false) {
    /** @type {?} */
    Utils.prototype.indexedDB;
}
/**
 * @record
 */
export function IndexDetails() { }
if (false) {
    /** @type {?} */
    IndexDetails.prototype.indexName;
    /** @type {?} */
    IndexDetails.prototype.order;
}
export class DbWrapper {
    /**
     * @param {?} dbName
     * @param {?} version
     */
    constructor(dbName, version) {
        this.dbName = dbName;
        this.dbVersion = version || 1;
    }
    /**
     * @param {?} storeName
     * @return {?}
     */
    validateStoreName(storeName) {
        return this.db.objectStoreNames.contains(storeName);
    }
    /**
     * @param {?} storeName
     * @param {?} reject
     * @return {?}
     */
    validateBeforeTransaction(storeName, reject) {
        if (!this.db) {
            reject('You need to use the openDatabase function to create a database before you query it!');
        }
        if (!this.validateStoreName(storeName)) {
            reject('objectStore does not exists: ' + storeName);
        }
    }
    /**
     * @param {?} options
     * @return {?}
     */
    createTransaction(options) {
        /** @type {?} */
        let trans = this.db.transaction(options.storeName, options.dbMode);
        trans.onerror = options.error;
        trans.oncomplete = options.complete;
        trans.onabort = options.abort;
        return trans;
    }
    /**
     * @param {?} type
     * @param {?} storeName
     * @param {?} reject
     * @param {?} resolve
     * @return {?}
     */
    optionsGenerator(type, storeName, reject, resolve) {
        return {
            storeName: storeName,
            dbMode: type,
            error: (/**
             * @param {?} e
             * @return {?}
             */
            (e) => {
                reject(e);
            }),
            complete: (/**
             * @param {?} e
             * @return {?}
             */
            (e) => {
                resolve();
            }),
            abort: (/**
             * @param {?} e
             * @return {?}
             */
            (e) => {
                reject(e);
            })
        };
    }
}
if (false) {
    /** @type {?} */
    DbWrapper.prototype.dbName;
    /** @type {?} */
    DbWrapper.prototype.dbVersion;
    /** @type {?} */
    DbWrapper.prototype.db;
}
/**
 * @record
 */
export function Options() { }
if (false) {
    /** @type {?} */
    Options.prototype.storeName;
    /** @type {?} */
    Options.prototype.dbMode;
    /** @type {?} */
    Options.prototype.error;
    /** @type {?} */
    Options.prototype.complete;
    /** @type {?|undefined} */
    Options.prototype.abort;
}
/** @enum {string} */
const DBMode = {
    readonly: 'readonly',
    readwrite: 'readwrite',
};
export { DBMode };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWluZGV4ZWQtZGIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtaW5kZXhlZC1kYi8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtaW5kZXhlZC1kYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxPQUFPLFlBQVk7Ozs7O0lBSXhCLFlBQVksTUFBYyxFQUFFLE9BQWU7UUFDMUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2pELENBQUM7Ozs7OztJQUVELFlBQVksQ0FBQyxPQUFlLEVBQUUsZUFBMEI7UUFDdkQsT0FBTyxJQUFJLE9BQU87Ozs7O1FBQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDOztnQkFDL0IsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7WUFDdkUsT0FBTyxDQUFDLFNBQVM7OztZQUFHLEdBQUcsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztnQkFDbkMsT0FBTyxFQUFFLENBQUM7WUFDWCxDQUFDLENBQUEsQ0FBQztZQUVGLE9BQU8sQ0FBQyxPQUFPOzs7O1lBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3JCLE1BQU0sQ0FDTCxtQkFBbUIsR0FBRyxDQUFDLG1CQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUEsQ0FBQyxDQUFDLFNBQVM7b0JBQzlDLENBQUMsQ0FBQyxDQUFDLG1CQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUEsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxtQkFBSyxDQUFD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Q2xCLHlCQUEyQjs7SUFDM0Isd0JBQXlCOztJQUN6QiwyQkFBNEI7O0lBQzVCLHdCQUFZOzs7O0lBSVosVUFBVyxVQUFVO0lBQ3JCLFdBQVksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBOZ3hJbmRleGVkREIge1xyXG5cdHV0aWxzOiBVdGlscztcclxuXHRkYldyYXBwZXI6IERiV3JhcHBlcjtcclxuXHJcblx0Y29uc3RydWN0b3IoZGJOYW1lOiBzdHJpbmcsIHZlcnNpb246IG51bWJlcikge1xyXG5cdFx0dGhpcy51dGlscyA9IG5ldyBVdGlscygpO1xyXG5cdFx0dGhpcy5kYldyYXBwZXIgPSBuZXcgRGJXcmFwcGVyKGRiTmFtZSwgdmVyc2lvbik7XHJcblx0fVxyXG5cclxuXHRvcGVuRGF0YWJhc2UodmVyc2lvbjogbnVtYmVyLCB1cGdyYWRlQ2FsbGJhY2s/OiBGdW5jdGlvbikge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHR0aGlzLmRiV3JhcHBlci5kYlZlcnNpb24gPSB2ZXJzaW9uO1xyXG5cdFx0XHRsZXQgcmVxdWVzdCA9IHRoaXMudXRpbHMuaW5kZXhlZERCLm9wZW4odGhpcy5kYldyYXBwZXIuZGJOYW1lLCB2ZXJzaW9uKTtcclxuXHRcdFx0cmVxdWVzdC5vbnN1Y2Nlc3MgPSAoKSA9PiB7XHJcblx0XHRcdFx0dGhpcy5kYldyYXBwZXIuZGIgPSByZXF1ZXN0LnJlc3VsdDtcclxuXHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRyZXF1ZXN0Lm9uZXJyb3IgPSBlID0+IHtcclxuXHRcdFx0XHRyZWplY3QoXHJcblx0XHRcdFx0XHQnSW5kZXhlZERCIGVycm9yOiAnICsgKDxhbnk+ZS50YXJnZXQpLmVycm9yQ29kZVxyXG5cdFx0XHRcdFx0XHQ/ICg8YW55PmUudGFyZ2V0KS5lcnJvckNvZGUgKyAnICgnICsgKDxhbnk+ZS50YXJnZXQpLmVycm9yICsgJyknXHJcblx0XHRcdFx0XHRcdDogKDxhbnk+ZS50YXJnZXQpLmVycm9yQ29kZVxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRpZiAodHlwZW9mIHVwZ3JhZGVDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRcdHJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gZSA9PiB7XHJcblx0XHRcdFx0XHR1cGdyYWRlQ2FsbGJhY2soZSwgdGhpcy5kYldyYXBwZXIuZGIpO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Z2V0QnlLZXkoc3RvcmVOYW1lOiBzdHJpbmcsIGtleTogYW55KSB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdHRoaXMuZGJXcmFwcGVyLnZhbGlkYXRlQmVmb3JlVHJhbnNhY3Rpb24oc3RvcmVOYW1lLCByZWplY3QpO1xyXG5cclxuXHRcdFx0bGV0IHRyYW5zYWN0aW9uID0gdGhpcy5kYldyYXBwZXIuY3JlYXRlVHJhbnNhY3Rpb24oXHJcblx0XHRcdFx0XHR0aGlzLmRiV3JhcHBlci5vcHRpb25zR2VuZXJhdG9yKERCTW9kZS5yZWFkb25seSwgc3RvcmVOYW1lLCByZWplY3QsIHJlc29sdmUpXHJcblx0XHRcdFx0KSxcclxuXHRcdFx0XHRvYmplY3RTdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHN0b3JlTmFtZSksXHJcblx0XHRcdFx0cmVxdWVzdDogSURCUmVxdWVzdDtcclxuXHJcblx0XHRcdHJlcXVlc3QgPSBvYmplY3RTdG9yZS5nZXQoa2V5KTtcclxuXHRcdFx0cmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihldmVudDogRXZlbnQpIHtcclxuXHRcdFx0XHRyZXNvbHZlKCg8YW55PmV2ZW50LnRhcmdldCkucmVzdWx0KTtcclxuXHRcdFx0fTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Z2V0QWxsKHN0b3JlTmFtZTogc3RyaW5nLCBrZXlSYW5nZT86IElEQktleVJhbmdlLCBpbmRleERldGFpbHM/OiBJbmRleERldGFpbHMpIHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0dGhpcy5kYldyYXBwZXIudmFsaWRhdGVCZWZvcmVUcmFuc2FjdGlvbihzdG9yZU5hbWUsIHJlamVjdCk7XHJcblxyXG5cdFx0XHRsZXQgdHJhbnNhY3Rpb24gPSB0aGlzLmRiV3JhcHBlci5jcmVhdGVUcmFuc2FjdGlvbihcclxuXHRcdFx0XHRcdHRoaXMuZGJXcmFwcGVyLm9wdGlvbnNHZW5lcmF0b3IoREJNb2RlLnJlYWRvbmx5LCBzdG9yZU5hbWUsIHJlamVjdCwgcmVzb2x2ZSlcclxuXHRcdFx0XHQpLFxyXG5cdFx0XHRcdG9iamVjdFN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoc3RvcmVOYW1lKSxcclxuXHRcdFx0XHRyZXN1bHQ6IEFycmF5PGFueT4gPSBbXSxcclxuXHRcdFx0XHRyZXF1ZXN0OiBJREJSZXF1ZXN0O1xyXG5cdFx0XHRpZiAoaW5kZXhEZXRhaWxzKSB7XHJcblx0XHRcdFx0bGV0IGluZGV4ID0gb2JqZWN0U3RvcmUuaW5kZXgoaW5kZXhEZXRhaWxzLmluZGV4TmFtZSksXHJcblx0XHRcdFx0XHRvcmRlciA9IGluZGV4RGV0YWlscy5vcmRlciA9PT0gJ2Rlc2MnID8gJ3ByZXYnIDogJ25leHQnO1xyXG5cdFx0XHRcdHJlcXVlc3QgPSBpbmRleC5vcGVuQ3Vyc29yKGtleVJhbmdlLCA8SURCQ3Vyc29yRGlyZWN0aW9uPm9yZGVyKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXF1ZXN0ID0gb2JqZWN0U3RvcmUub3BlbkN1cnNvcihrZXlSYW5nZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKGUpIHtcclxuXHRcdFx0XHRyZWplY3QoZSk7XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRyZXF1ZXN0Lm9uc3VjY2VzcyA9IGZ1bmN0aW9uKGV2dDogRXZlbnQpIHtcclxuXHRcdFx0XHRsZXQgY3Vyc29yID0gKDxJREJPcGVuREJSZXF1ZXN0PmV2dC50YXJnZXQpLnJlc3VsdDtcclxuXHRcdFx0XHRpZiAoY3Vyc29yKSB7XHJcblx0XHRcdFx0XHRyZXN1bHQucHVzaChjdXJzb3JbJ3ZhbHVlJ10pO1xyXG5cdFx0XHRcdFx0Y3Vyc29yWydjb250aW51ZSddKCk7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHJlc29sdmUocmVzdWx0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGdldEFsbEZhc3Qoc3RvcmVOYW1lOiBzdHJpbmcsIGtleVJhbmdlPzogSURCS2V5UmFuZ2UsIGNvdW50PzogbnVtYmVyKSB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdHRoaXMuZGJXcmFwcGVyLnZhbGlkYXRlQmVmb3JlVHJhbnNhY3Rpb24oc3RvcmVOYW1lLCByZWplY3QpO1xyXG5cclxuXHRcdFx0bGV0IHRyYW5zYWN0aW9uID0gdGhpcy5kYldyYXBwZXIuY3JlYXRlVHJhbnNhY3Rpb24oXHJcblx0XHRcdFx0dGhpcy5kYldyYXBwZXIub3B0aW9uc0dlbmVyYXRvcihEQk1vZGUucmVhZG9ubHksIHN0b3JlTmFtZSwgcmVqZWN0LCByZXNvbHZlKVxyXG5cdFx0XHRcdCksXHJcblx0XHRcdFx0b2JqZWN0U3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShzdG9yZU5hbWUpLFxyXG5cdFx0XHRcdHJlcXVlc3Q6IElEQlJlcXVlc3Q7XHJcblxyXG5cdFx0XHRyZXF1ZXN0ID0gb2JqZWN0U3RvcmUuZ2V0QWxsKGtleVJhbmdlLCBjb3VudCk7XHJcblxyXG5cdFx0XHRyZXF1ZXN0Lm9uZXJyb3IgPSAoZSkgPT4gcmVqZWN0KGUpO1xyXG5cdFx0XHRyZXF1ZXN0Lm9uc3VjY2VzcyA9IChlKSA9PiByZXNvbHZlKCg8YW55PmUudGFyZ2V0KS5yZXN1bHQpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRhZGQoc3RvcmVOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnksIGtleT86IGFueSkge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHR0aGlzLmRiV3JhcHBlci52YWxpZGF0ZUJlZm9yZVRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgcmVqZWN0KTtcclxuXHRcdFx0bGV0IHRyYW5zYWN0aW9uID0gdGhpcy5kYldyYXBwZXIuY3JlYXRlVHJhbnNhY3Rpb24oXHJcblx0XHRcdFx0XHR0aGlzLmRiV3JhcHBlci5vcHRpb25zR2VuZXJhdG9yKERCTW9kZS5yZWFkd3JpdGUsIHN0b3JlTmFtZSwgcmVqZWN0LCByZXNvbHZlKVxyXG5cdFx0XHRcdCksXHJcblx0XHRcdFx0b2JqZWN0U3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShzdG9yZU5hbWUpO1xyXG5cclxuXHRcdFx0bGV0IHJlcXVlc3QgPSBvYmplY3RTdG9yZS5hZGQodmFsdWUsIGtleSk7XHJcblx0XHRcdHJlcXVlc3Qub25zdWNjZXNzID0gKGV2dDogYW55KSA9PiB7XHJcblx0XHRcdFx0a2V5ID0gZXZ0LnRhcmdldC5yZXN1bHQ7XHJcblx0XHRcdH07XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGNvdW50KHN0b3JlTmFtZTogc3RyaW5nLCBrZXlSYW5nZT86IElEQlZhbGlkS2V5IHwgSURCS2V5UmFuZ2UpIHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0dGhpcy5kYldyYXBwZXIudmFsaWRhdGVCZWZvcmVUcmFuc2FjdGlvbihzdG9yZU5hbWUsIHJlamVjdCk7XHJcblxyXG5cdFx0XHRsZXQgdHJhbnNhY3Rpb24gPSB0aGlzLmRiV3JhcHBlci5jcmVhdGVUcmFuc2FjdGlvbihcclxuXHRcdFx0XHR0aGlzLmRiV3JhcHBlci5vcHRpb25zR2VuZXJhdG9yKERCTW9kZS5yZWFkb25seSwgc3RvcmVOYW1lLCByZWplY3QsIHJlc29sdmUpXHJcblx0XHRcdFx0KSxcclxuXHRcdFx0XHRvYmplY3RTdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHN0b3JlTmFtZSksXHJcblx0XHRcdFx0cmVxdWVzdDogSURCUmVxdWVzdDtcclxuXHJcblx0XHRcdHJlcXVlc3QgPSBvYmplY3RTdG9yZS5jb3VudChrZXlSYW5nZSk7XHJcblxyXG5cdFx0XHRyZXF1ZXN0Lm9uZXJyb3IgPSAoZSkgPT4gcmVqZWN0KGUpO1xyXG5cdFx0XHRyZXF1ZXN0Lm9uc3VjY2VzcyA9IChlKSA9PiByZXNvbHZlKCg8YW55PmUudGFyZ2V0KS5yZXN1bHQpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHR1cGRhdGUoc3RvcmVOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnksIGtleT86IGFueSkge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHR0aGlzLmRiV3JhcHBlci52YWxpZGF0ZUJlZm9yZVRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgcmVqZWN0KTtcclxuXHJcblx0XHRcdGxldCB0cmFuc2FjdGlvbiA9IHRoaXMuZGJXcmFwcGVyLmNyZWF0ZVRyYW5zYWN0aW9uKFxyXG5cdFx0XHRcdFx0dGhpcy5kYldyYXBwZXIub3B0aW9uc0dlbmVyYXRvcihEQk1vZGUucmVhZHdyaXRlLCBzdG9yZU5hbWUsIHJlamVjdCwgcmVzb2x2ZSlcclxuXHRcdFx0XHQpLFxyXG5cdFx0XHRcdG9iamVjdFN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoc3RvcmVOYW1lKTtcclxuXHJcblx0XHRcdG9iamVjdFN0b3JlLnB1dCh2YWx1ZSwga2V5KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlQnVsayhzdG9yZU5hbWU6IHN0cmluZywgdmFsdWVzOiBBcnJheTxhbnk+LCBrZXk/OiBhbnkpIHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdHRoaXMuZGJXcmFwcGVyLnZhbGlkYXRlQmVmb3JlVHJhbnNhY3Rpb24oc3RvcmVOYW1lLCByZWplY3QpO1xyXG5cclxuXHRcdFx0bGV0IHRyYW5zYWN0aW9uID0gdGhpcy5kYldyYXBwZXIuY3JlYXRlVHJhbnNhY3Rpb24oXHJcblx0XHRcdFx0dGhpcy5kYldyYXBwZXIub3B0aW9uc0dlbmVyYXRvcihEQk1vZGUucmVhZHdyaXRlLCBzdG9yZU5hbWUsIHJlamVjdCwgcmVzb2x2ZSlcclxuXHRcdFx0KSxcclxuXHRcdFx0XHRvYmplY3RTdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XHJcblxyXG5cdFx0XHR2YWx1ZXMuZm9yRWFjaCh2YWx1ZSA9PiB7XHJcblx0XHRcdFx0b2JqZWN0U3RvcmUucHV0KHZhbHVlLCBrZXkpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0ZGVsZXRlKHN0b3JlTmFtZTogc3RyaW5nLCBrZXk6IGFueSkge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHR0aGlzLmRiV3JhcHBlci52YWxpZGF0ZUJlZm9yZVRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgcmVqZWN0KTtcclxuXHJcblx0XHRcdGxldCB0cmFuc2FjdGlvbiA9IHRoaXMuZGJXcmFwcGVyLmNyZWF0ZVRyYW5zYWN0aW9uKFxyXG5cdFx0XHRcdFx0dGhpcy5kYldyYXBwZXIub3B0aW9uc0dlbmVyYXRvcihEQk1vZGUucmVhZHdyaXRlLCBzdG9yZU5hbWUsIHJlamVjdCwgcmVzb2x2ZSlcclxuXHRcdFx0XHQpLFxyXG5cdFx0XHRcdG9iamVjdFN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoc3RvcmVOYW1lKTtcclxuXHJcblx0XHRcdG9iamVjdFN0b3JlLmRlbGV0ZShrZXkpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRkZWxldGVCdWxrKHN0b3JlTmFtZTogc3RyaW5nLCBrZXlzOiBBcnJheTxhbnk+KSB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdHRoaXMuZGJXcmFwcGVyLnZhbGlkYXRlQmVmb3JlVHJhbnNhY3Rpb24oc3RvcmVOYW1lLCByZWplY3QpO1xyXG5cclxuXHRcdFx0bGV0IHRyYW5zYWN0aW9uID0gdGhpcy5kYldyYXBwZXIuY3JlYXRlVHJhbnNhY3Rpb24oXHJcblx0XHRcdFx0dGhpcy5kYldyYXBwZXIub3B0aW9uc0dlbmVyYXRvcihEQk1vZGUucmVhZHdyaXRlLCBzdG9yZU5hbWUsIHJlamVjdCwgcmVzb2x2ZSlcclxuXHRcdFx0XHQpLFxyXG5cdFx0XHRcdG9iamVjdFN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoc3RvcmVOYW1lKTtcclxuXHJcblx0XHRcdGtleXMuZm9yRWFjaChrZXkgPT4ge1xyXG5cdFx0XHRcdG9iamVjdFN0b3JlLmRlbGV0ZShrZXkpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0ZGVsZXRlRGF0YWJhc2UoKSB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHR0aGlzLmRiV3JhcHBlci5kYi5jbG9zZSgpO1xyXG5cdFx0XHRjb25zdCBkZWxldGVEQlJlcXVlc3QgPSB0aGlzLnV0aWxzLmluZGV4ZWREQi5kZWxldGVEYXRhYmFzZSh0aGlzLmRiV3JhcHBlci5kYk5hbWUpO1xyXG5cdFx0XHRkZWxldGVEQlJlcXVlc3Qub25zdWNjZXNzID0gcmVzb2x2ZTtcclxuXHRcdFx0ZGVsZXRlREJSZXF1ZXN0Lm9uZXJyb3IgPSByZWplY3Q7XHJcblx0XHRcdGRlbGV0ZURCUmVxdWVzdC5vbmJsb2NrZWQgPSAoKSA9PiB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gZGVsZXRlIGRhdGFiYXNlIGJlY2F1c2UgaXRcXCdzIGJsb2NrZWQnKTtcclxuXHRcdFx0fTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0b3BlbkN1cnNvcihzdG9yZU5hbWU6IHN0cmluZywgY3Vyc29yQ2FsbGJhY2s6IChldnQ6IEV2ZW50KSA9PiB2b2lkLCBrZXlSYW5nZT86IElEQktleVJhbmdlKSB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdHRoaXMuZGJXcmFwcGVyLnZhbGlkYXRlQmVmb3JlVHJhbnNhY3Rpb24oc3RvcmVOYW1lLCByZWplY3QpO1xyXG5cdFx0XHRsZXQgdHJhbnNhY3Rpb24gPSB0aGlzLmRiV3JhcHBlci5jcmVhdGVUcmFuc2FjdGlvbihcclxuXHRcdFx0XHRcdHRoaXMuZGJXcmFwcGVyLm9wdGlvbnNHZW5lcmF0b3IoREJNb2RlLnJlYWRvbmx5LCBzdG9yZU5hbWUsIHJlamVjdCwgcmVzb2x2ZSlcclxuXHRcdFx0XHQpLFxyXG5cdFx0XHRcdG9iamVjdFN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoc3RvcmVOYW1lKSxcclxuXHRcdFx0XHRyZXF1ZXN0ID0gb2JqZWN0U3RvcmUub3BlbkN1cnNvcihrZXlSYW5nZSk7XHJcblxyXG5cdFx0XHRyZXF1ZXN0Lm9uc3VjY2VzcyA9IChldnQ6IEV2ZW50KSA9PiB7XHJcblx0XHRcdFx0Y3Vyc29yQ2FsbGJhY2soZXZ0KTtcclxuXHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdH07XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdG9wZW5DdXJzb3JXaXRoSW5kZXgoc3RvcmVOYW1lOiBzdHJpbmcsIGluZGV4TmFtZTogc3RyaW5nLCBjdXJzb3JDYWxsYmFjazogKGV2dDogRXZlbnQpID0+IHZvaWQsIGtleVJhbmdlPzogSURCS2V5UmFuZ2UpIHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0dGhpcy5kYldyYXBwZXIudmFsaWRhdGVCZWZvcmVUcmFuc2FjdGlvbihzdG9yZU5hbWUsIHJlamVjdCk7XHJcblx0XHRcdGxldCB0cmFuc2FjdGlvbiA9IHRoaXMuZGJXcmFwcGVyLmNyZWF0ZVRyYW5zYWN0aW9uKFxyXG5cdFx0XHRcdHRoaXMuZGJXcmFwcGVyLm9wdGlvbnNHZW5lcmF0b3IoREJNb2RlLnJlYWRvbmx5LCBzdG9yZU5hbWUsIHJlamVjdCwgcmVzb2x2ZSlcclxuXHRcdFx0XHQpLFxyXG5cdFx0XHRcdG9iamVjdFN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoc3RvcmVOYW1lKSxcclxuXHRcdFx0XHRpbmRleCA9IG9iamVjdFN0b3JlLmluZGV4KGluZGV4TmFtZSksXHJcblx0XHRcdFx0cmVxdWVzdCA9IGluZGV4Lm9wZW5DdXJzb3Ioa2V5UmFuZ2UpO1xyXG5cclxuXHRcdFx0cmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZXZ0OiBFdmVudCkgPT4ge1xyXG5cdFx0XHRcdGN1cnNvckNhbGxiYWNrKGV2dCk7XHJcblx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRjbGVhcihzdG9yZU5hbWU6IHN0cmluZykge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHR0aGlzLmRiV3JhcHBlci52YWxpZGF0ZUJlZm9yZVRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgcmVqZWN0KTtcclxuXHRcdFx0bGV0IHRyYW5zYWN0aW9uID0gdGhpcy5kYldyYXBwZXIuY3JlYXRlVHJhbnNhY3Rpb24oXHJcblx0XHRcdFx0XHR0aGlzLmRiV3JhcHBlci5vcHRpb25zR2VuZXJhdG9yKERCTW9kZS5yZWFkd3JpdGUsIHN0b3JlTmFtZSwgcmVqZWN0LCByZXNvbHZlKVxyXG5cdFx0XHRcdCksXHJcblx0XHRcdFx0b2JqZWN0U3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShzdG9yZU5hbWUpO1xyXG5cdFx0XHRvYmplY3RTdG9yZS5jbGVhcigpO1xyXG5cdFx0XHRyZXNvbHZlKCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGdldEJ5SW5kZXgoc3RvcmVOYW1lOiBzdHJpbmcsIGluZGV4TmFtZTogc3RyaW5nLCBrZXk6IGFueSkge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHR0aGlzLmRiV3JhcHBlci52YWxpZGF0ZUJlZm9yZVRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgcmVqZWN0KTtcclxuXHRcdFx0bGV0IHRyYW5zYWN0aW9uID0gdGhpcy5kYldyYXBwZXIuY3JlYXRlVHJhbnNhY3Rpb24oXHJcblx0XHRcdFx0XHR0aGlzLmRiV3JhcHBlci5vcHRpb25zR2VuZXJhdG9yKERCTW9kZS5yZWFkb25seSwgc3RvcmVOYW1lLCByZWplY3QsIHJlc29sdmUpXHJcblx0XHRcdFx0KSxcclxuXHRcdFx0XHRvYmplY3RTdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHN0b3JlTmFtZSksXHJcblx0XHRcdFx0aW5kZXggPSBvYmplY3RTdG9yZS5pbmRleChpbmRleE5hbWUpLFxyXG5cdFx0XHRcdHJlcXVlc3QgPSBpbmRleC5nZXQoa2V5KTtcclxuXHRcdFx0cmVxdWVzdC5vbnN1Y2Nlc3MgPSBldmVudCA9PiB7XHJcblx0XHRcdFx0cmVzb2x2ZSgoPElEQk9wZW5EQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5yZXN1bHQpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVXRpbHMge1xyXG5cdGluZGV4ZWREQjogSURCRmFjdG9yeTtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLmluZGV4ZWREQiA9XHJcblx0XHRcdHdpbmRvdy5pbmRleGVkREIgfHxcclxuXHRcdFx0KDxhbnk+d2luZG93KS5tb3pJbmRleGVkREIgfHxcclxuXHRcdFx0KDxhbnk+d2luZG93KS53ZWJraXRJbmRleGVkREIgfHxcclxuXHRcdFx0KDxhbnk+d2luZG93KS5tc0luZGV4ZWREQjtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSW5kZXhEZXRhaWxzIHtcclxuXHRpbmRleE5hbWU6IHN0cmluZztcclxuXHRvcmRlcjogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGJXcmFwcGVyIHtcclxuXHRkYk5hbWU6IHN0cmluZztcclxuXHRkYlZlcnNpb246IG51bWJlcjtcclxuXHRkYjogSURCRGF0YWJhc2U7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGRiTmFtZTogc3RyaW5nLCB2ZXJzaW9uOiBudW1iZXIpIHtcclxuXHRcdHRoaXMuZGJOYW1lID0gZGJOYW1lO1xyXG5cdFx0dGhpcy5kYlZlcnNpb24gPSB2ZXJzaW9uIHx8IDE7XHJcblx0fVxyXG5cclxuXHR2YWxpZGF0ZVN0b3JlTmFtZShzdG9yZU5hbWU6IHN0cmluZykge1xyXG5cdFx0cmV0dXJuIHRoaXMuZGIub2JqZWN0U3RvcmVOYW1lcy5jb250YWlucyhzdG9yZU5hbWUpO1xyXG5cdH1cclxuXHJcblx0dmFsaWRhdGVCZWZvcmVUcmFuc2FjdGlvbihzdG9yZU5hbWU6IHN0cmluZywgcmVqZWN0OiBGdW5jdGlvbikge1xyXG5cdFx0aWYgKCF0aGlzLmRiKSB7XHJcblx0XHRcdHJlamVjdCgnWW91IG5lZWQgdG8gdXNlIHRoZSBvcGVuRGF0YWJhc2UgZnVuY3Rpb24gdG8gY3JlYXRlIGEgZGF0YWJhc2UgYmVmb3JlIHlvdSBxdWVyeSBpdCEnKTtcclxuXHRcdH1cclxuXHRcdGlmICghdGhpcy52YWxpZGF0ZVN0b3JlTmFtZShzdG9yZU5hbWUpKSB7XHJcblx0XHRcdHJlamVjdCgnb2JqZWN0U3RvcmUgZG9lcyBub3QgZXhpc3RzOiAnICsgc3RvcmVOYW1lKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNyZWF0ZVRyYW5zYWN0aW9uKG9wdGlvbnM6IE9wdGlvbnMpOiBJREJUcmFuc2FjdGlvbiB7XHJcblx0XHRsZXQgdHJhbnM6IElEQlRyYW5zYWN0aW9uID0gdGhpcy5kYi50cmFuc2FjdGlvbihvcHRpb25zLnN0b3JlTmFtZSwgb3B0aW9ucy5kYk1vZGUpO1xyXG5cdFx0dHJhbnMub25lcnJvciA9IG9wdGlvbnMuZXJyb3I7XHJcblx0XHR0cmFucy5vbmNvbXBsZXRlID0gb3B0aW9ucy5jb21wbGV0ZTtcclxuXHRcdHRyYW5zLm9uYWJvcnQgPSBvcHRpb25zLmFib3J0O1xyXG5cdFx0cmV0dXJuIHRyYW5zO1xyXG5cdH1cclxuXHJcblx0b3B0aW9uc0dlbmVyYXRvcih0eXBlOiBhbnksIHN0b3JlTmFtZTogYW55LCByZWplY3Q6IEZ1bmN0aW9uLCByZXNvbHZlOiBGdW5jdGlvbik6IE9wdGlvbnMge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c3RvcmVOYW1lOiBzdG9yZU5hbWUsXHJcblx0XHRcdGRiTW9kZTogdHlwZSxcclxuXHRcdFx0ZXJyb3I6IChlOiBFdmVudCkgPT4ge1xyXG5cdFx0XHRcdHJlamVjdChlKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0Y29tcGxldGU6IChlOiBFdmVudCkgPT4ge1xyXG5cdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0YWJvcnQ6IChlOiBFdmVudCkgPT4ge1xyXG5cdFx0XHRcdHJlamVjdChlKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgT3B0aW9ucyB7XHJcblx0c3RvcmVOYW1lOiBzdHJpbmc7XHJcblx0ZGJNb2RlOiBJREJUcmFuc2FjdGlvbk1vZGU7XHJcblx0ZXJyb3I6IChlOiBFdmVudCkgPT4gYW55O1xyXG5cdGNvbXBsZXRlOiAoZTogRXZlbnQpID0+IGFueTtcclxuXHRhYm9ydD86IGFueTtcclxufVxyXG5cclxuZXhwb3J0IGVudW0gREJNb2RlIHtcclxuXHRyZWFkb25seSA9ICdyZWFkb25seScsXHJcblx0cmVhZHdyaXRlID0gJ3JlYWR3cml0ZSdcclxufVxyXG4iXX0=