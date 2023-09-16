/*
- Maxim Petrov 207467432
- Ben Nadav 315114090
- Gal Dahan 207232349
 */

class IndexedDBManager {
    constructor(dbName, dbVersion) {
        this.dbName = dbName;
        this.dbVersion = dbVersion;
    }

    async openCostsDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onupgradeneeded = event => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains("costs")) {
                    db.createObjectStore("costs", { keyPath: "id", autoIncrement: true });
                }
            };

            request.onsuccess = event => {
                const db = event.target.result;
                resolve({
                    addCost: async costData => {
                        const transaction = db.transaction(["costs"], "readwrite");
                        const store = transaction.objectStore("costs");
                        const request = store.add(costData);

                        return new Promise((resolve, reject) => {
                            request.onsuccess = event => {
                                resolve("Cost added successfully.");
                            };

                            request.onerror = event => {
                                reject(new Error("Error adding cost."));
                            };
                        });
                    },

                    deleteCost: async costId => {
                        const transaction = db.transaction("costs", "readwrite");
                        const store = transaction.objectStore("costs");
                        const request = store.delete(costId);

                        return new Promise((resolve, reject) => {
                            request.onsuccess = event => {
                                resolve("Cost deleted successfully.");
                            };

                            request.onerror = event => {
                                reject(new Error("Error deleting cost."));
                            };
                        });
                    }
                });
            };

            request.onerror = event => {
                reject(new Error("Error opening database."));
            };
        });
    }
}

const idb = new IndexedDBManager("costsdb", 1);