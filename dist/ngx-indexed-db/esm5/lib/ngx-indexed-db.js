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
export { NgxIndexedDB };
if (false) {
    /** @type {?} */
    NgxIndexedDB.prototype.utils;
    /** @type {?} */
    NgxIndexedDB.prototype.dbWrapper;
}
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
export { Utils };
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
export { DbWrapper };
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
var DBMode = {
    readonly: 'readonly',
    readwrite: 'readwrite',
};
export { DBMode };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWluZGV4ZWQtZGIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtaW5kZXhlZC1kYi8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtaW5kZXhlZC1kYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUE7SUFJQyxzQkFBWSxNQUFjLEVBQUUsT0FBZTtRQUMxQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDakQsQ0FBQzs7Ozs7O0lBRUQsbUNBQVk7Ozs7O0lBQVosVUFBYSxPQUFlLEVBQUUsZUFBMEI7UUFBeEQsaUJBdUJDO1FBdEJBLE9BQU8sSUFBSSxPQUFPOzs7OztRQUFNLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDdkMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDOztnQkFDL0IsT0FBTyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7WUFDdkUsT0FBTyxDQUFDLFNBQVM7OztZQUFHO2dCQUNuQixLQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO2dCQUNuQyxPQUFPLEVBQUUsQ0FBQztZQUNYLENBQUMsQ0FBQSxDQUFDO1lBRUYsT0FBTyxDQUFDLE9BQU87Ozs7WUFBRyxVQUFBLENBQUM7Z0JBQ2xCLE1BQU0sQ0FDTCxtQkFBbUIsR0FBRyxDQUFDLG1CQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUEsQ0FBQyxDQUFDLFNBQVM7b0JBQzlDLENBQUMsQ0FBQyxDQUFDLG1CQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUEsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxtQkFBSyxDQUFDLENBQUMsTUFBTSxFQUFBLENBQUMs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TSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxDQUFBO1NBQ0QsQ0FBQztJQUNILENBQUM7SUFDRixnQkFBQztBQUFELENBQUMsQUE5Q0QsSUE4Q0M7Ozs7SUE3Q0EsMkJBQWU7O0lBQ2YsOEJBQWtCOztJQUNsQix1QkFBZ0I7Ozs7O0FBNkNqQiw2QkFNQzs7O0lBTEEsNEJBQWtCOztJQUNsQix5QkFBMkI7O0lBQzNCLHdCQUF5Qjs7SUFDekIsMkJBQTRCOztJQUM1Qix3QkFBWTs7OztJQUlaLFVBQVcsVUFBVTtJQUNyQixXQUFZLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgTmd4SW5kZXhlZERCIHtcclxuXHR1dGlsczogVXRpbHM7XHJcblx0ZGJXcmFwcGVyOiBEYldyYXBwZXI7XHJcblxyXG5cdGNvbnN0cnVjdG9yKGRiTmFtZTogc3RyaW5nLCB2ZXJzaW9uOiBudW1iZXIpIHtcclxuXHRcdHRoaXMudXRpbHMgPSBuZXcgVXRpbHMoKTtcclxuXHRcdHRoaXMuZGJXcmFwcGVyID0gbmV3IERiV3JhcHBlcihkYk5hbWUsIHZlcnNpb24pO1xyXG5cdH1cclxuXHJcblx0b3BlbkRhdGFiYXNlKHZlcnNpb246IG51bWJlciwgdXBncmFkZUNhbGxiYWNrPzogRnVuY3Rpb24pIHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0dGhpcy5kYldyYXBwZXIuZGJWZXJzaW9uID0gdmVyc2lvbjtcclxuXHRcdFx0bGV0IHJlcXVlc3QgPSB0aGlzLnV0aWxzLmluZGV4ZWREQi5vcGVuKHRoaXMuZGJXcmFwcGVyLmRiTmFtZSwgdmVyc2lvbik7XHJcblx0XHRcdHJlcXVlc3Qub25zdWNjZXNzID0gKCkgPT4ge1xyXG5cdFx0XHRcdHRoaXMuZGJXcmFwcGVyLmRiID0gcmVxdWVzdC5yZXN1bHQ7XHJcblx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0cmVxdWVzdC5vbmVycm9yID0gZSA9PiB7XHJcblx0XHRcdFx0cmVqZWN0KFxyXG5cdFx0XHRcdFx0J0luZGV4ZWREQiBlcnJvcjogJyArICg8YW55PmUudGFyZ2V0KS5lcnJvckNvZGVcclxuXHRcdFx0XHRcdFx0PyAoPGFueT5lLnRhcmdldCkuZXJyb3JDb2RlICsgJyAoJyArICg8YW55PmUudGFyZ2V0KS5lcnJvciArICcpJ1xyXG5cdFx0XHRcdFx0XHQ6ICg8YW55PmUudGFyZ2V0KS5lcnJvckNvZGVcclxuXHRcdFx0XHQpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0aWYgKHR5cGVvZiB1cGdyYWRlQ2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRyZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9IGUgPT4ge1xyXG5cdFx0XHRcdFx0dXBncmFkZUNhbGxiYWNrKGUsIHRoaXMuZGJXcmFwcGVyLmRiKTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGdldEJ5S2V5KHN0b3JlTmFtZTogc3RyaW5nLCBrZXk6IGFueSkge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHR0aGlzLmRiV3JhcHBlci52YWxpZGF0ZUJlZm9yZVRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgcmVqZWN0KTtcclxuXHJcblx0XHRcdGxldCB0cmFuc2FjdGlvbiA9IHRoaXMuZGJXcmFwcGVyLmNyZWF0ZVRyYW5zYWN0aW9uKFxyXG5cdFx0XHRcdFx0dGhpcy5kYldyYXBwZXIub3B0aW9uc0dlbmVyYXRvcihEQk1vZGUucmVhZG9ubHksIHN0b3JlTmFtZSwgcmVqZWN0LCByZXNvbHZlKVxyXG5cdFx0XHRcdCksXHJcblx0XHRcdFx0b2JqZWN0U3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShzdG9yZU5hbWUpLFxyXG5cdFx0XHRcdHJlcXVlc3Q6IElEQlJlcXVlc3Q7XHJcblxyXG5cdFx0XHRyZXF1ZXN0ID0gb2JqZWN0U3RvcmUuZ2V0KGtleSk7XHJcblx0XHRcdHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24oZXZlbnQ6IEV2ZW50KSB7XHJcblx0XHRcdFx0cmVzb2x2ZSgoPGFueT5ldmVudC50YXJnZXQpLnJlc3VsdCk7XHJcblx0XHRcdH07XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGdldEFsbChzdG9yZU5hbWU6IHN0cmluZywga2V5UmFuZ2U/OiBJREJLZXlSYW5nZSwgaW5kZXhEZXRhaWxzPzogSW5kZXhEZXRhaWxzKSB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdHRoaXMuZGJXcmFwcGVyLnZhbGlkYXRlQmVmb3JlVHJhbnNhY3Rpb24oc3RvcmVOYW1lLCByZWplY3QpO1xyXG5cclxuXHRcdFx0bGV0IHRyYW5zYWN0aW9uID0gdGhpcy5kYldyYXBwZXIuY3JlYXRlVHJhbnNhY3Rpb24oXHJcblx0XHRcdFx0XHR0aGlzLmRiV3JhcHBlci5vcHRpb25zR2VuZXJhdG9yKERCTW9kZS5yZWFkb25seSwgc3RvcmVOYW1lLCByZWplY3QsIHJlc29sdmUpXHJcblx0XHRcdFx0KSxcclxuXHRcdFx0XHRvYmplY3RTdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHN0b3JlTmFtZSksXHJcblx0XHRcdFx0cmVzdWx0OiBBcnJheTxhbnk+ID0gW10sXHJcblx0XHRcdFx0cmVxdWVzdDogSURCUmVxdWVzdDtcclxuXHRcdFx0aWYgKGluZGV4RGV0YWlscykge1xyXG5cdFx0XHRcdGxldCBpbmRleCA9IG9iamVjdFN0b3JlLmluZGV4KGluZGV4RGV0YWlscy5pbmRleE5hbWUpLFxyXG5cdFx0XHRcdFx0b3JkZXIgPSBpbmRleERldGFpbHMub3JkZXIgPT09ICdkZXNjJyA/ICdwcmV2JyA6ICduZXh0JztcclxuXHRcdFx0XHRyZXF1ZXN0ID0gaW5kZXgub3BlbkN1cnNvcihrZXlSYW5nZSwgPElEQkN1cnNvckRpcmVjdGlvbj5vcmRlcik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVxdWVzdCA9IG9iamVjdFN0b3JlLm9wZW5DdXJzb3Ioa2V5UmFuZ2UpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0cmVqZWN0KGUpO1xyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0cmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihldnQ6IEV2ZW50KSB7XHJcblx0XHRcdFx0bGV0IGN1cnNvciA9ICg8SURCT3BlbkRCUmVxdWVzdD5ldnQudGFyZ2V0KS5yZXN1bHQ7XHJcblx0XHRcdFx0aWYgKGN1cnNvcikge1xyXG5cdFx0XHRcdFx0cmVzdWx0LnB1c2goY3Vyc29yWyd2YWx1ZSddKTtcclxuXHRcdFx0XHRcdGN1cnNvclsnY29udGludWUnXSgpO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3VsdCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRnZXRBbGxGYXN0KHN0b3JlTmFtZTogc3RyaW5nLCBrZXlSYW5nZT86IElEQktleVJhbmdlLCBjb3VudD86IG51bWJlcikge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHR0aGlzLmRiV3JhcHBlci52YWxpZGF0ZUJlZm9yZVRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgcmVqZWN0KTtcclxuXHJcblx0XHRcdGxldCB0cmFuc2FjdGlvbiA9IHRoaXMuZGJXcmFwcGVyLmNyZWF0ZVRyYW5zYWN0aW9uKFxyXG5cdFx0XHRcdHRoaXMuZGJXcmFwcGVyLm9wdGlvbnNHZW5lcmF0b3IoREJNb2RlLnJlYWRvbmx5LCBzdG9yZU5hbWUsIHJlamVjdCwgcmVzb2x2ZSlcclxuXHRcdFx0XHQpLFxyXG5cdFx0XHRcdG9iamVjdFN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoc3RvcmVOYW1lKSxcclxuXHRcdFx0XHRyZXF1ZXN0OiBJREJSZXF1ZXN0O1xyXG5cclxuXHRcdFx0cmVxdWVzdCA9IG9iamVjdFN0b3JlLmdldEFsbChrZXlSYW5nZSwgY291bnQpO1xyXG5cclxuXHRcdFx0cmVxdWVzdC5vbmVycm9yID0gKGUpID0+IHJlamVjdChlKTtcclxuXHRcdFx0cmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZSkgPT4gcmVzb2x2ZSgoPGFueT5lLnRhcmdldCkucmVzdWx0KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0YWRkKHN0b3JlTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55LCBrZXk/OiBhbnkpIHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0dGhpcy5kYldyYXBwZXIudmFsaWRhdGVCZWZvcmVUcmFuc2FjdGlvbihzdG9yZU5hbWUsIHJlamVjdCk7XHJcblx0XHRcdGxldCB0cmFuc2FjdGlvbiA9IHRoaXMuZGJXcmFwcGVyLmNyZWF0ZVRyYW5zYWN0aW9uKFxyXG5cdFx0XHRcdFx0dGhpcy5kYldyYXBwZXIub3B0aW9uc0dlbmVyYXRvcihEQk1vZGUucmVhZHdyaXRlLCBzdG9yZU5hbWUsIHJlamVjdCwgcmVzb2x2ZSlcclxuXHRcdFx0XHQpLFxyXG5cdFx0XHRcdG9iamVjdFN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoc3RvcmVOYW1lKTtcclxuXHJcblx0XHRcdGxldCByZXF1ZXN0ID0gb2JqZWN0U3RvcmUuYWRkKHZhbHVlLCBrZXkpO1xyXG5cdFx0XHRyZXF1ZXN0Lm9uc3VjY2VzcyA9IChldnQ6IGFueSkgPT4ge1xyXG5cdFx0XHRcdGtleSA9IGV2dC50YXJnZXQucmVzdWx0O1xyXG5cdFx0XHR9O1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRjb3VudChzdG9yZU5hbWU6IHN0cmluZywga2V5UmFuZ2U/OiBJREJWYWxpZEtleSB8IElEQktleVJhbmdlKSB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdHRoaXMuZGJXcmFwcGVyLnZhbGlkYXRlQmVmb3JlVHJhbnNhY3Rpb24oc3RvcmVOYW1lLCByZWplY3QpO1xyXG5cclxuXHRcdFx0bGV0IHRyYW5zYWN0aW9uID0gdGhpcy5kYldyYXBwZXIuY3JlYXRlVHJhbnNhY3Rpb24oXHJcblx0XHRcdFx0dGhpcy5kYldyYXBwZXIub3B0aW9uc0dlbmVyYXRvcihEQk1vZGUucmVhZG9ubHksIHN0b3JlTmFtZSwgcmVqZWN0LCByZXNvbHZlKVxyXG5cdFx0XHRcdCksXHJcblx0XHRcdFx0b2JqZWN0U3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShzdG9yZU5hbWUpLFxyXG5cdFx0XHRcdHJlcXVlc3Q6IElEQlJlcXVlc3Q7XHJcblxyXG5cdFx0XHRyZXF1ZXN0ID0gb2JqZWN0U3RvcmUuY291bnQoa2V5UmFuZ2UpO1xyXG5cclxuXHRcdFx0cmVxdWVzdC5vbmVycm9yID0gKGUpID0+IHJlamVjdChlKTtcclxuXHRcdFx0cmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZSkgPT4gcmVzb2x2ZSgoPGFueT5lLnRhcmdldCkucmVzdWx0KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKHN0b3JlTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55LCBrZXk/OiBhbnkpIHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0dGhpcy5kYldyYXBwZXIudmFsaWRhdGVCZWZvcmVUcmFuc2FjdGlvbihzdG9yZU5hbWUsIHJlamVjdCk7XHJcblxyXG5cdFx0XHRsZXQgdHJhbnNhY3Rpb24gPSB0aGlzLmRiV3JhcHBlci5jcmVhdGVUcmFuc2FjdGlvbihcclxuXHRcdFx0XHRcdHRoaXMuZGJXcmFwcGVyLm9wdGlvbnNHZW5lcmF0b3IoREJNb2RlLnJlYWR3cml0ZSwgc3RvcmVOYW1lLCByZWplY3QsIHJlc29sdmUpXHJcblx0XHRcdFx0KSxcclxuXHRcdFx0XHRvYmplY3RTdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XHJcblxyXG5cdFx0XHRvYmplY3RTdG9yZS5wdXQodmFsdWUsIGtleSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZUJ1bGsoc3RvcmVOYW1lOiBzdHJpbmcsIHZhbHVlczogQXJyYXk8YW55Piwga2V5PzogYW55KSB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHR0aGlzLmRiV3JhcHBlci52YWxpZGF0ZUJlZm9yZVRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgcmVqZWN0KTtcclxuXHJcblx0XHRcdGxldCB0cmFuc2FjdGlvbiA9IHRoaXMuZGJXcmFwcGVyLmNyZWF0ZVRyYW5zYWN0aW9uKFxyXG5cdFx0XHRcdHRoaXMuZGJXcmFwcGVyLm9wdGlvbnNHZW5lcmF0b3IoREJNb2RlLnJlYWR3cml0ZSwgc3RvcmVOYW1lLCByZWplY3QsIHJlc29sdmUpXHJcblx0XHRcdCksXHJcblx0XHRcdFx0b2JqZWN0U3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShzdG9yZU5hbWUpO1xyXG5cclxuXHRcdFx0dmFsdWVzLmZvckVhY2godmFsdWUgPT4ge1xyXG5cdFx0XHRcdG9iamVjdFN0b3JlLnB1dCh2YWx1ZSwga2V5KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGRlbGV0ZShzdG9yZU5hbWU6IHN0cmluZywga2V5OiBhbnkpIHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0dGhpcy5kYldyYXBwZXIudmFsaWRhdGVCZWZvcmVUcmFuc2FjdGlvbihzdG9yZU5hbWUsIHJlamVjdCk7XHJcblxyXG5cdFx0XHRsZXQgdHJhbnNhY3Rpb24gPSB0aGlzLmRiV3JhcHBlci5jcmVhdGVUcmFuc2FjdGlvbihcclxuXHRcdFx0XHRcdHRoaXMuZGJXcmFwcGVyLm9wdGlvbnNHZW5lcmF0b3IoREJNb2RlLnJlYWR3cml0ZSwgc3RvcmVOYW1lLCByZWplY3QsIHJlc29sdmUpXHJcblx0XHRcdFx0KSxcclxuXHRcdFx0XHRvYmplY3RTdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XHJcblxyXG5cdFx0XHRvYmplY3RTdG9yZS5kZWxldGUoa2V5KTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0ZGVsZXRlQnVsayhzdG9yZU5hbWU6IHN0cmluZywga2V5czogQXJyYXk8YW55Pikge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHR0aGlzLmRiV3JhcHBlci52YWxpZGF0ZUJlZm9yZVRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgcmVqZWN0KTtcclxuXHJcblx0XHRcdGxldCB0cmFuc2FjdGlvbiA9IHRoaXMuZGJXcmFwcGVyLmNyZWF0ZVRyYW5zYWN0aW9uKFxyXG5cdFx0XHRcdHRoaXMuZGJXcmFwcGVyLm9wdGlvbnNHZW5lcmF0b3IoREJNb2RlLnJlYWR3cml0ZSwgc3RvcmVOYW1lLCByZWplY3QsIHJlc29sdmUpXHJcblx0XHRcdFx0KSxcclxuXHRcdFx0XHRvYmplY3RTdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XHJcblxyXG5cdFx0XHRrZXlzLmZvckVhY2goa2V5ID0+IHtcclxuXHRcdFx0XHRvYmplY3RTdG9yZS5kZWxldGUoa2V5KTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGRlbGV0ZURhdGFiYXNlKCkge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0dGhpcy5kYldyYXBwZXIuZGIuY2xvc2UoKTtcclxuXHRcdFx0Y29uc3QgZGVsZXRlREJSZXF1ZXN0ID0gdGhpcy51dGlscy5pbmRleGVkREIuZGVsZXRlRGF0YWJhc2UodGhpcy5kYldyYXBwZXIuZGJOYW1lKTtcclxuXHRcdFx0ZGVsZXRlREJSZXF1ZXN0Lm9uc3VjY2VzcyA9IHJlc29sdmU7XHJcblx0XHRcdGRlbGV0ZURCUmVxdWVzdC5vbmVycm9yID0gcmVqZWN0O1xyXG5cdFx0XHRkZWxldGVEQlJlcXVlc3Qub25ibG9ja2VkID0gKCkgPT4ge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGRlbGV0ZSBkYXRhYmFzZSBiZWNhdXNlIGl0XFwncyBibG9ja2VkJyk7XHJcblx0XHRcdH07XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdG9wZW5DdXJzb3Ioc3RvcmVOYW1lOiBzdHJpbmcsIGN1cnNvckNhbGxiYWNrOiAoZXZ0OiBFdmVudCkgPT4gdm9pZCwga2V5UmFuZ2U/OiBJREJLZXlSYW5nZSkge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHR0aGlzLmRiV3JhcHBlci52YWxpZGF0ZUJlZm9yZVRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgcmVqZWN0KTtcclxuXHRcdFx0bGV0IHRyYW5zYWN0aW9uID0gdGhpcy5kYldyYXBwZXIuY3JlYXRlVHJhbnNhY3Rpb24oXHJcblx0XHRcdFx0XHR0aGlzLmRiV3JhcHBlci5vcHRpb25zR2VuZXJhdG9yKERCTW9kZS5yZWFkb25seSwgc3RvcmVOYW1lLCByZWplY3QsIHJlc29sdmUpXHJcblx0XHRcdFx0KSxcclxuXHRcdFx0XHRvYmplY3RTdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHN0b3JlTmFtZSksXHJcblx0XHRcdFx0cmVxdWVzdCA9IG9iamVjdFN0b3JlLm9wZW5DdXJzb3Ioa2V5UmFuZ2UpO1xyXG5cclxuXHRcdFx0cmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZXZ0OiBFdmVudCkgPT4ge1xyXG5cdFx0XHRcdGN1cnNvckNhbGxiYWNrKGV2dCk7XHJcblx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHR9O1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRvcGVuQ3Vyc29yV2l0aEluZGV4KHN0b3JlTmFtZTogc3RyaW5nLCBpbmRleE5hbWU6IHN0cmluZywgY3Vyc29yQ2FsbGJhY2s6IChldnQ6IEV2ZW50KSA9PiB2b2lkLCBrZXlSYW5nZT86IElEQktleVJhbmdlKSB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblx0XHRcdHRoaXMuZGJXcmFwcGVyLnZhbGlkYXRlQmVmb3JlVHJhbnNhY3Rpb24oc3RvcmVOYW1lLCByZWplY3QpO1xyXG5cdFx0XHRsZXQgdHJhbnNhY3Rpb24gPSB0aGlzLmRiV3JhcHBlci5jcmVhdGVUcmFuc2FjdGlvbihcclxuXHRcdFx0XHR0aGlzLmRiV3JhcHBlci5vcHRpb25zR2VuZXJhdG9yKERCTW9kZS5yZWFkb25seSwgc3RvcmVOYW1lLCByZWplY3QsIHJlc29sdmUpXHJcblx0XHRcdFx0KSxcclxuXHRcdFx0XHRvYmplY3RTdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHN0b3JlTmFtZSksXHJcblx0XHRcdFx0aW5kZXggPSBvYmplY3RTdG9yZS5pbmRleChpbmRleE5hbWUpLFxyXG5cdFx0XHRcdHJlcXVlc3QgPSBpbmRleC5vcGVuQ3Vyc29yKGtleVJhbmdlKTtcclxuXHJcblx0XHRcdHJlcXVlc3Qub25zdWNjZXNzID0gKGV2dDogRXZlbnQpID0+IHtcclxuXHRcdFx0XHRjdXJzb3JDYWxsYmFjayhldnQpO1xyXG5cdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0fTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Y2xlYXIoc3RvcmVOYW1lOiBzdHJpbmcpIHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0dGhpcy5kYldyYXBwZXIudmFsaWRhdGVCZWZvcmVUcmFuc2FjdGlvbihzdG9yZU5hbWUsIHJlamVjdCk7XHJcblx0XHRcdGxldCB0cmFuc2FjdGlvbiA9IHRoaXMuZGJXcmFwcGVyLmNyZWF0ZVRyYW5zYWN0aW9uKFxyXG5cdFx0XHRcdFx0dGhpcy5kYldyYXBwZXIub3B0aW9uc0dlbmVyYXRvcihEQk1vZGUucmVhZHdyaXRlLCBzdG9yZU5hbWUsIHJlamVjdCwgcmVzb2x2ZSlcclxuXHRcdFx0XHQpLFxyXG5cdFx0XHRcdG9iamVjdFN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoc3RvcmVOYW1lKTtcclxuXHRcdFx0b2JqZWN0U3RvcmUuY2xlYXIoKTtcclxuXHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRnZXRCeUluZGV4KHN0b3JlTmFtZTogc3RyaW5nLCBpbmRleE5hbWU6IHN0cmluZywga2V5OiBhbnkpIHtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuXHRcdFx0dGhpcy5kYldyYXBwZXIudmFsaWRhdGVCZWZvcmVUcmFuc2FjdGlvbihzdG9yZU5hbWUsIHJlamVjdCk7XHJcblx0XHRcdGxldCB0cmFuc2FjdGlvbiA9IHRoaXMuZGJXcmFwcGVyLmNyZWF0ZVRyYW5zYWN0aW9uKFxyXG5cdFx0XHRcdFx0dGhpcy5kYldyYXBwZXIub3B0aW9uc0dlbmVyYXRvcihEQk1vZGUucmVhZG9ubHksIHN0b3JlTmFtZSwgcmVqZWN0LCByZXNvbHZlKVxyXG5cdFx0XHRcdCksXHJcblx0XHRcdFx0b2JqZWN0U3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShzdG9yZU5hbWUpLFxyXG5cdFx0XHRcdGluZGV4ID0gb2JqZWN0U3RvcmUuaW5kZXgoaW5kZXhOYW1lKSxcclxuXHRcdFx0XHRyZXF1ZXN0ID0gaW5kZXguZ2V0KGtleSk7XHJcblx0XHRcdHJlcXVlc3Qub25zdWNjZXNzID0gZXZlbnQgPT4ge1xyXG5cdFx0XHRcdHJlc29sdmUoKDxJREJPcGVuREJSZXF1ZXN0PmV2ZW50LnRhcmdldCkucmVzdWx0KTtcclxuXHRcdFx0fTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFV0aWxzIHtcclxuXHRpbmRleGVkREI6IElEQkZhY3Rvcnk7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5pbmRleGVkREIgPVxyXG5cdFx0XHR3aW5kb3cuaW5kZXhlZERCIHx8XHJcblx0XHRcdCg8YW55PndpbmRvdykubW96SW5kZXhlZERCIHx8XHJcblx0XHRcdCg8YW55PndpbmRvdykud2Via2l0SW5kZXhlZERCIHx8XHJcblx0XHRcdCg8YW55PndpbmRvdykubXNJbmRleGVkREI7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEluZGV4RGV0YWlscyB7XHJcblx0aW5kZXhOYW1lOiBzdHJpbmc7XHJcblx0b3JkZXI6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERiV3JhcHBlciB7XHJcblx0ZGJOYW1lOiBzdHJpbmc7XHJcblx0ZGJWZXJzaW9uOiBudW1iZXI7XHJcblx0ZGI6IElEQkRhdGFiYXNlO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihkYk5hbWU6IHN0cmluZywgdmVyc2lvbjogbnVtYmVyKSB7XHJcblx0XHR0aGlzLmRiTmFtZSA9IGRiTmFtZTtcclxuXHRcdHRoaXMuZGJWZXJzaW9uID0gdmVyc2lvbiB8fCAxO1xyXG5cdH1cclxuXHJcblx0dmFsaWRhdGVTdG9yZU5hbWUoc3RvcmVOYW1lOiBzdHJpbmcpIHtcclxuXHRcdHJldHVybiB0aGlzLmRiLm9iamVjdFN0b3JlTmFtZXMuY29udGFpbnMoc3RvcmVOYW1lKTtcclxuXHR9XHJcblxyXG5cdHZhbGlkYXRlQmVmb3JlVHJhbnNhY3Rpb24oc3RvcmVOYW1lOiBzdHJpbmcsIHJlamVjdDogRnVuY3Rpb24pIHtcclxuXHRcdGlmICghdGhpcy5kYikge1xyXG5cdFx0XHRyZWplY3QoJ1lvdSBuZWVkIHRvIHVzZSB0aGUgb3BlbkRhdGFiYXNlIGZ1bmN0aW9uIHRvIGNyZWF0ZSBhIGRhdGFiYXNlIGJlZm9yZSB5b3UgcXVlcnkgaXQhJyk7XHJcblx0XHR9XHJcblx0XHRpZiAoIXRoaXMudmFsaWRhdGVTdG9yZU5hbWUoc3RvcmVOYW1lKSkge1xyXG5cdFx0XHRyZWplY3QoJ29iamVjdFN0b3JlIGRvZXMgbm90IGV4aXN0czogJyArIHN0b3JlTmFtZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjcmVhdGVUcmFuc2FjdGlvbihvcHRpb25zOiBPcHRpb25zKTogSURCVHJhbnNhY3Rpb24ge1xyXG5cdFx0bGV0IHRyYW5zOiBJREJUcmFuc2FjdGlvbiA9IHRoaXMuZGIudHJhbnNhY3Rpb24ob3B0aW9ucy5zdG9yZU5hbWUsIG9wdGlvbnMuZGJNb2RlKTtcclxuXHRcdHRyYW5zLm9uZXJyb3IgPSBvcHRpb25zLmVycm9yO1xyXG5cdFx0dHJhbnMub25jb21wbGV0ZSA9IG9wdGlvbnMuY29tcGxldGU7XHJcblx0XHR0cmFucy5vbmFib3J0ID0gb3B0aW9ucy5hYm9ydDtcclxuXHRcdHJldHVybiB0cmFucztcclxuXHR9XHJcblxyXG5cdG9wdGlvbnNHZW5lcmF0b3IodHlwZTogYW55LCBzdG9yZU5hbWU6IGFueSwgcmVqZWN0OiBGdW5jdGlvbiwgcmVzb2x2ZTogRnVuY3Rpb24pOiBPcHRpb25zIHtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHN0b3JlTmFtZTogc3RvcmVOYW1lLFxyXG5cdFx0XHRkYk1vZGU6IHR5cGUsXHJcblx0XHRcdGVycm9yOiAoZTogRXZlbnQpID0+IHtcclxuXHRcdFx0XHRyZWplY3QoZSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGNvbXBsZXRlOiAoZTogRXZlbnQpID0+IHtcclxuXHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGFib3J0OiAoZTogRXZlbnQpID0+IHtcclxuXHRcdFx0XHRyZWplY3QoZSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnMge1xyXG5cdHN0b3JlTmFtZTogc3RyaW5nO1xyXG5cdGRiTW9kZTogSURCVHJhbnNhY3Rpb25Nb2RlO1xyXG5cdGVycm9yOiAoZTogRXZlbnQpID0+IGFueTtcclxuXHRjb21wbGV0ZTogKGU6IEV2ZW50KSA9PiBhbnk7XHJcblx0YWJvcnQ/OiBhbnk7XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIERCTW9kZSB7XHJcblx0cmVhZG9ubHkgPSAncmVhZG9ubHknLFxyXG5cdHJlYWR3cml0ZSA9ICdyZWFkd3JpdGUnXHJcbn1cclxuIl19