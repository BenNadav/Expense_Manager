/*
- Maxim Petrov 207467432
- Ben Nadav 315114090
- Gal Dahan 207232349
 */

// The IndexedDBManager class will handle all the interactions with IndexedDB.
class IndexedDBManager {
    constructor(dbName, dbVersion) {
        this.dbName = dbName;
        this.dbVersion = dbVersion;
    }

    // An asynchronous method used to open the IndexedDB database for storing costs.

    /*
    When idb.openCostsDB() will be called, we will get a promise that will either provide us with the database reference (if successful) or an error message
    (if unsuccessful). We will then use this reference to perform other operations on the database, such as adding costs, modifying costs, etc.
    */
    async openCostsDB() {
        return new Promise((resolve, reject) => {
            /*
            This line initiates the process of opening the IndexedDB database. It uses the indexedDB global object to create a request to open the database with the
            name and version specified by the user.
            */
            const request = indexedDB.open(this.dbName, this.dbVersion);

            /*
            This event handler is triggered when the database version is updated or when the database is being created for the first time. Inside this handler,
            we defined the structure of the database. It creates an object store (can be thought of as a table) named "costs" with an auto-incrementing key named "id".
            */
            request.onupgradeneeded = event => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains("costs")) {
                    db.createObjectStore("costs", { keyPath: "id", autoIncrement: true });
                }
            };

            /*
            This event handler is triggered when the database is successfully opened. It receives an event object containing the result of the request,
            including the reference to the opened database. The resolved promise (resolve(db)) sends this database reference back to the calling code.
            */
            request.onsuccess = event => {
                const db = event.target.result;
                resolve(db);
            };

            /*
            This event handler is triggered if there is an error while attempting to open the database. It rejects the promise with an error message indicating that
            there was an error opening the database.
             */
            request.onerror = event => {
                reject(new Error("Error opening database."));
            };
        });
    }

    /*
    An asynchronous method used to add a cost entry to the IndexedDB database. It takes a parameter costData, which is an object containing the details
    of the cost to be added.
     */
    async addCost(costData) {
        /*
        Before adding a cost, we need to ensure that the database is open. Here, we call the openCostsDB method using await (to ensure that we have a valid database
        reference to work with) to get the database reference for the current transaction.
        */
        const db = await this.openCostsDB();

        return new Promise((resolve, reject) => {
            /*
            This line initiates a transaction on the database. The transaction is associated with the "costs" object store and is set to read-write mode,
            meaning we can both read and write data during this transaction.
             */
            const transaction = db.transaction("costs", "readwrite");

            // This line gets a reference to the "costs" object store within the current transaction. This is the store where the cost data will be added to.
            const store = transaction.objectStore("costs");

            /*
            This line creates a request to add the costData object to the "costs" object store. The add method is asynchronous and returns a request object that will
            emit events when the operation completes.
             */
            const request = store.add(costData);

            // This event handler is triggered when the cost is successfully added to the object store.
            request.onsuccess = event => {
                resolve("Cost added successfully.");
            };

            // This event handler is triggered if there is an error while trying to add the cost to the object store.
            request.onerror = event => {
                reject(new Error("Error adding cost."));
            };
        });
    }

    /*
    An asynchronous method used to delete a cost entry from the IndexedDB database. It takes a parameter costData, which is an object
    containing the details of the cost to be deleted - the implementation of the "deleteCost" method is pretty much similar to the implementation of the "addCost" method.
     */
    async deleteCost(costId) {
        const db = await this.openCostsDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction("costs", "readwrite");
            const store = transaction.objectStore("costs");
            const request = store.delete(costId);

            request.onsuccess = event => {
                resolve("Cost deleted successfully.");
            };

            request.onerror = event => {
                reject(new Error("Error deleting cost."));
            };
        });
    }

    // An asynchronous method used to retrieve all the costs currently stored in the database.
    async getAllCosts() {
        const db = await this.openCostsDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(["costs"], "readonly");
            const store = transaction.objectStore("costs");

            const request = store.getAll();

            request.onsuccess = event => {
                resolve(event.target.result);
            };

            request.onerror = event => {
                reject(new Error("Error retrieving costs."));
            };
        });
    }
}

// const idb = new IndexedDBManager("costsdb", 1);
const idb = new IndexedDBManager();

export default idb;