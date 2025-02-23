/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxIndexedDB {
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
class Utils {
    constructor() {
        this.indexedDB =
            window.indexedDB ||
                ((/** @type {?} */ (window))).mozIndexedDB ||
                ((/** @type {?} */ (window))).webkitIndexedDB ||
                ((/** @type {?} */ (window))).msIndexedDB;
    }
}
class DbWrapper {
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
/** @enum {string} */
const DBMode = {
    readonly: 'readonly',
    readwrite: 'readwrite',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgxIndexedDB };
//# sourceMappingURL=ngx-indexed-db.js.map
