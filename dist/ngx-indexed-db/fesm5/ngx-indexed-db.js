/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxIndexedDB = /** @class */ (function () {
    function NgxIndexedDB(dbName, version) {
        this.utils = new Utils();
        this.dbWrapper = new DbWrapper(dbName, version);
    }
    /**
     * @param {?} version
     * @param {?=} upgradeCallback
     * @return {?}
     */
    NgxIndexedDB.prototype.openDatabase = /**
     * @param {?} version
     * @param {?=} upgradeCallback
     * @return {?}
     */
    function (version, upgradeCallback) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.dbWrapper.dbVersion = version;
            /** @type {?} */
            var request = _this.utils.indexedDB.open(_this.dbWrapper.dbName, version);
            request.onsuccess = (/**
             * @return {?}
             */
            function () {
                _this.dbWrapper.db = request.result;
                resolve();
            });
            request.onerror = (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                reject('IndexedDB error: ' + ((/** @type {?} */ (e.target))).errorCode
                    ? ((/** @type {?} */ (e.target))).errorCode + ' (' + ((/** @type {?} */ (e.target))).error + ')'
                    : ((/** @type {?} */ (e.target))).errorCode);
            });
            if (typeof upgradeCallback === 'function') {
                request.onupgradeneeded = (/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) {
                    upgradeCallback(e, _this.dbWrapper.db);
                });
            }
        }));
    };
    /**
     * @param {?} storeName
     * @param {?} key
     * @return {?}
     */
    NgxIndexedDB.prototype.getByKey = /**
     * @param {?} storeName
     * @param {?} key
     * @return {?}
     */
    function (storeName, key) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.dbWrapper.validateBeforeTransaction(storeName, reject);
            /** @type {?} */
            var transaction = _this.dbWrapper.createTransaction(_this.dbWrapper.optionsGenerator(DBMode.readonly, storeName, reject, resolve));
            /** @type {?} */
            var objectStore = transaction.objectStore(storeName);
            /** @type {?} */
            var request;
            request = objectStore.get(key);
            request.onsuccess = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                resolve(((/** @type {?} */ (event.target))).result);
            });
        }));
    };
    /**
     * @param {?} storeName
     * @param {?=} keyRange
     * @param {?=} indexDetails
     * @return {?}
     */
    NgxIndexedDB.prototype.getAll = /**
     * @param {?} storeName
     * @param {?=} keyRange
     * @param {?=} indexDetails
     * @return {?}
     */
    function (storeName, keyRange, indexDetails) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.dbWrapper.validateBeforeTransaction(storeName, reject);
            /** @type {?} */
            var transaction = _this.dbWrapper.createTransaction(_this.dbWrapper.optionsGenerator(DBMode.readonly, storeName, reject, resolve));
            /** @type {?} */
            var objectStore = transaction.objectStore(storeName);
            /** @type {?} */
            var result = [];
            /** @type {?} */
            var request;
            if (indexDetails) {
                /** @type {?} */
                var index = objectStore.index(indexDetails.indexName);
                /** @type {?} */
                var order = indexDetails.order === 'desc' ? 'prev' : 'next';
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
                var cursor = ((/** @type {?} */ (evt.target))).result;
                if (cursor) {
                    result.push(cursor['value']);
                    cursor['continue']();
                }
                else {
                    resolve(result);
                }
            });
        }));
    };
    /**
     * @param {?} storeName
     * @param {?=} keyRange
     * @param {?=} count
     * @return {?}
     */
    NgxIndexedDB.prototype.getAllFast = /**
     * @param {?} storeName
     * @param {?=} keyRange
     * @param {?=} count
     * @return {?}
     */
    function (storeName, keyRange, count) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.dbWrapper.validateBeforeTransaction(storeName, reject);
            /** @type {?} */
            var transaction = _this.dbWrapper.createTransaction(_this.dbWrapper.optionsGenerator(DBMode.readonly, storeName, reject, resolve));
            /** @type {?} */
            var objectStore = transaction.objectStore(storeName);
            /** @type {?} */
            var request;
            request = objectStore.getAll(keyRange, count);
            request.onerror = (/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return reject(e); });
            request.onsuccess = (/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return resolve(((/** @type {?} */ (e.target))).result); });
        }));
    };
    /**
     * @param {?} storeName
     * @param {?} value
     * @param {?=} key
     * @return {?}
     */
    NgxIndexedDB.prototype.add = /**
     * @param {?} storeName
     * @param {?} value
     * @param {?=} key
     * @return {?}
     */
    function (storeName, value, key) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.dbWrapper.validateBeforeTransaction(storeName, reject);
            /** @type {?} */
            var transaction = _this.dbWrapper.createTransaction(_this.dbWrapper.optionsGenerator(DBMode.readwrite, storeName, reject, resolve));
            /** @type {?} */
            var objectStore = transaction.objectStore(storeName);
            /** @type {?} */
            var request = objectStore.add(value, key);
            request.onsuccess = (/**
             * @param {?} evt
             * @return {?}
             */
            function (evt) {
                key = evt.target.result;
            });
        }));
    };
    /**
     * @param {?} storeName
     * @param {?=} keyRange
     * @return {?}
     */
    NgxIndexedDB.prototype.count = /**
     * @param {?} storeName
     * @param {?=} keyRange
     * @return {?}
     */
    function (storeName, keyRange) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.dbWrapper.validateBeforeTransaction(storeName, reject);
            /** @type {?} */
            var transaction = _this.dbWrapper.createTransaction(_this.dbWrapper.optionsGenerator(DBMode.readonly, storeName, reject, resolve));
            /** @type {?} */
            var objectStore = transaction.objectStore(storeName);
            /** @type {?} */
            var request;
            request = objectStore.count(keyRange);
            request.onerror = (/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return reject(e); });
            request.onsuccess = (/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return resolve(((/** @type {?} */ (e.target))).result); });
        }));
    };
    /**
     * @param {?} storeName
     * @param {?} value
     * @param {?=} key
     * @return {?}
     */
    NgxIndexedDB.prototype.update = /**
     * @param {?} storeName
     * @param {?} value
     * @param {?=} key
     * @return {?}
     */
    function (storeName, value, key) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.dbWrapper.validateBeforeTransaction(storeName, reject);
            /** @type {?} */
            var transaction = _this.dbWrapper.createTransaction(_this.dbWrapper.optionsGenerator(DBMode.readwrite, storeName, reject, resolve));
            /** @type {?} */
            var objectStore = transaction.objectStore(storeName);
            objectStore.put(value, key);
        }));
    };
    /**
     * @param {?} storeName
     * @param {?} values
     * @param {?=} key
     * @return {?}
     */
    NgxIndexedDB.prototype.updateBulk = /**
     * @param {?} storeName
     * @param {?} values
     * @param {?=} key
     * @return {?}
     */
    function (storeName, values, key) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.dbWrapper.validateBeforeTransaction(storeName, reject);
            /** @type {?} */
            var transaction = _this.dbWrapper.createTransaction(_this.dbWrapper.optionsGenerator(DBMode.readwrite, storeName, reject, resolve));
            /** @type {?} */
            var objectStore = transaction.objectStore(storeName);
            values.forEach((/**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                objectStore.put(value, key);
            }));
        }));
    };
    /**
     * @param {?} storeName
     * @param {?} key
     * @return {?}
     */
    NgxIndexedDB.prototype.delete = /**
     * @param {?} storeName
     * @param {?} key
     * @return {?}
     */
    function (storeName, key) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.dbWrapper.validateBeforeTransaction(storeName, reject);
            /** @type {?} */
            var transaction = _this.dbWrapper.createTransaction(_this.dbWrapper.optionsGenerator(DBMode.readwrite, storeName, reject, resolve));
            /** @type {?} */
            var objectStore = transaction.objectStore(storeName);
            objectStore.delete(key);
        }));
    };
    /**
     * @param {?} storeName
     * @param {?} keys
     * @return {?}
     */
    NgxIndexedDB.prototype.deleteBulk = /**
     * @param {?} storeName
     * @param {?} keys
     * @return {?}
     */
    function (storeName, keys) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.dbWrapper.validateBeforeTransaction(storeName, reject);
            /** @type {?} */
            var transaction = _this.dbWrapper.createTransaction(_this.dbWrapper.optionsGenerator(DBMode.readwrite, storeName, reject, resolve));
            /** @type {?} */
            var objectStore = transaction.objectStore(storeName);
            keys.forEach((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                objectStore.delete(key);
            }));
        }));
    };
    /**
     * @return {?}
     */
    NgxIndexedDB.prototype.deleteDatabase = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.dbWrapper.db.close();
            /** @type {?} */
            var deleteDBRequest = _this.utils.indexedDB.deleteDatabase(_this.dbWrapper.dbName);
            deleteDBRequest.onsuccess = resolve;
            deleteDBRequest.onerror = reject;
            deleteDBRequest.onblocked = (/**
             * @return {?}
             */
            function () {
                throw new Error('Unable to delete database because it\'s blocked');
            });
        }));
    };
    /**
     * @param {?} storeName
     * @param {?} cursorCallback
     * @param {?=} keyRange
     * @return {?}
     */
    NgxIndexedDB.prototype.openCursor = /**
     * @param {?} storeName
     * @param {?} cursorCallback
     * @param {?=} keyRange
     * @return {?}
     */
    function (storeName, cursorCallback, keyRange) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.dbWrapper.validateBeforeTransaction(storeName, reject);
            /** @type {?} */
            var transaction = _this.dbWrapper.createTransaction(_this.dbWrapper.optionsGenerator(DBMode.readonly, storeName, reject, resolve));
            /** @type {?} */
            var objectStore = transaction.objectStore(storeName);
            /** @type {?} */
            var request = objectStore.openCursor(keyRange);
            request.onsuccess = (/**
             * @param {?} evt
             * @return {?}
             */
            function (evt) {
                cursorCallback(evt);
                resolve();
            });
        }));
    };
    /**
     * @param {?} storeName
     * @param {?} indexName
     * @param {?} cursorCallback
     * @param {?=} keyRange
     * @return {?}
     */
    NgxIndexedDB.prototype.openCursorWithIndex = /**
     * @param {?} storeName
     * @param {?} indexName
     * @param {?} cursorCallback
     * @param {?=} keyRange
     * @return {?}
     */
    function (storeName, indexName, cursorCallback, keyRange) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.dbWrapper.validateBeforeTransaction(storeName, reject);
            /** @type {?} */
            var transaction = _this.dbWrapper.createTransaction(_this.dbWrapper.optionsGenerator(DBMode.readonly, storeName, reject, resolve));
            /** @type {?} */
            var objectStore = transaction.objectStore(storeName);
            /** @type {?} */
            var index = objectStore.index(indexName);
            /** @type {?} */
            var request = index.openCursor(keyRange);
            request.onsuccess = (/**
             * @param {?} evt
             * @return {?}
             */
            function (evt) {
                cursorCallback(evt);
                resolve();
            });
        }));
    };
    /**
     * @param {?} storeName
     * @return {?}
     */
    NgxIndexedDB.prototype.clear = /**
     * @param {?} storeName
     * @return {?}
     */
    function (storeName) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.dbWrapper.validateBeforeTransaction(storeName, reject);
            /** @type {?} */
            var transaction = _this.dbWrapper.createTransaction(_this.dbWrapper.optionsGenerator(DBMode.readwrite, storeName, reject, resolve));
            /** @type {?} */
            var objectStore = transaction.objectStore(storeName);
            objectStore.clear();
            resolve();
        }));
    };
    /**
     * @param {?} storeName
     * @param {?} indexName
     * @param {?} key
     * @return {?}
     */
    NgxIndexedDB.prototype.getByIndex = /**
     * @param {?} storeName
     * @param {?} indexName
     * @param {?} key
     * @return {?}
     */
    function (storeName, indexName, key) {
        var _this = this;
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            _this.dbWrapper.validateBeforeTransaction(storeName, reject);
            /** @type {?} */
            var transaction = _this.dbWrapper.createTransaction(_this.dbWrapper.optionsGenerator(DBMode.readonly, storeName, reject, resolve));
            /** @type {?} */
            var objectStore = transaction.objectStore(storeName);
            /** @type {?} */
            var index = objectStore.index(indexName);
            /** @type {?} */
            var request = index.get(key);
            request.onsuccess = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                resolve(((/** @type {?} */ (event.target))).result);
            });
        }));
    };
    return NgxIndexedDB;
}());
var Utils = /** @class */ (function () {
    function Utils() {
        this.indexedDB =
            window.indexedDB ||
                ((/** @type {?} */ (window))).mozIndexedDB ||
                ((/** @type {?} */ (window))).webkitIndexedDB ||
                ((/** @type {?} */ (window))).msIndexedDB;
    }
    return Utils;
}());
var DbWrapper = /** @class */ (function () {
    function DbWrapper(dbName, version) {
        this.dbName = dbName;
        this.dbVersion = version || 1;
    }
    /**
     * @param {?} storeName
     * @return {?}
     */
    DbWrapper.prototype.validateStoreName = /**
     * @param {?} storeName
     * @return {?}
     */
    function (storeName) {
        return this.db.objectStoreNames.contains(storeName);
    };
    /**
     * @param {?} storeName
     * @param {?} reject
     * @return {?}
     */
    DbWrapper.prototype.validateBeforeTransaction = /**
     * @param {?} storeName
     * @param {?} reject
     * @return {?}
     */
    function (storeName, reject) {
        if (!this.db) {
            reject('You need to use the openDatabase function to create a database before you query it!');
        }
        if (!this.validateStoreName(storeName)) {
            reject('objectStore does not exists: ' + storeName);
        }
    };
    /**
     * @param {?} options
     * @return {?}
     */
    DbWrapper.prototype.createTransaction = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        /** @type {?} */
        var trans = this.db.transaction(options.storeName, options.dbMode);
        trans.onerror = options.error;
        trans.oncomplete = options.complete;
        trans.onabort = options.abort;
        return trans;
    };
    /**
     * @param {?} type
     * @param {?} storeName
     * @param {?} reject
     * @param {?} resolve
     * @return {?}
     */
    DbWrapper.prototype.optionsGenerator = /**
     * @param {?} type
     * @param {?} storeName
     * @param {?} reject
     * @param {?} resolve
     * @return {?}
     */
    function (type, storeName, reject, resolve) {
        return {
            storeName: storeName,
            dbMode: type,
            error: (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                reject(e);
            }),
            complete: (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                resolve();
            }),
            abort: (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                reject(e);
            })
        };
    };
    return DbWrapper;
}());
/** @enum {string} */
var DBMode = {
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
