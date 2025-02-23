export declare class NgxIndexedDB {
    utils: Utils;
    dbWrapper: DbWrapper;
    constructor(dbName: string, version: number);
    openDatabase(version: number, upgradeCallback?: Function): Promise<any>;
    getByKey(storeName: string, key: any): Promise<any>;
    getAll(storeName: string, keyRange?: IDBKeyRange, indexDetails?: IndexDetails): Promise<any>;
    getAllFast(storeName: string, keyRange?: IDBKeyRange, count?: number): Promise<any>;
    add(storeName: string, value: any, key?: any): Promise<any>;
    count(storeName: string, keyRange?: IDBValidKey | IDBKeyRange): Promise<any>;
    update(storeName: string, value: any, key?: any): Promise<any>;
    updateBulk(storeName: string, values: Array<any>, key?: any): Promise<{}>;
    delete(storeName: string, key: any): Promise<any>;
    deleteBulk(storeName: string, keys: Array<any>): Promise<any>;
    deleteDatabase(): Promise<{}>;
    openCursor(storeName: string, cursorCallback: (evt: Event) => void, keyRange?: IDBKeyRange): Promise<any>;
    openCursorWithIndex(storeName: string, indexName: string, cursorCallback: (evt: Event) => void, keyRange?: IDBKeyRange): Promise<any>;
    clear(storeName: string): Promise<any>;
    getByIndex(storeName: string, indexName: string, key: any): Promise<any>;
}
export declare class Utils {
    indexedDB: IDBFactory;
    constructor();
}
export interface IndexDetails {
    indexName: string;
    order: string;
}
export declare class DbWrapper {
    dbName: string;
    dbVersion: number;
    db: IDBDatabase;
    constructor(dbName: string, version: number);
    validateStoreName(storeName: string): boolean;
    validateBeforeTransaction(storeName: string, reject: Function): void;
    createTransaction(options: Options): IDBTransaction;
    optionsGenerator(type: any, storeName: any, reject: Function, resolve: Function): Options;
}
export interface Options {
    storeName: string;
    dbMode: IDBTransactionMode;
    error: (e: Event) => any;
    complete: (e: Event) => any;
    abort?: any;
}
export declare enum DBMode {
    readonly = "readonly",
    readwrite = "readwrite"
}
