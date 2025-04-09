// src/utils/database.js
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const db = SQLite.openDatabase({ name: 'items.db', location: 'default' });

export const initDB = async () => {
    const database = await db;
    return database.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                productName TEXT NOT NULL,
                description TEXT NOT NULL,
                vendorName TEXT NOT NULL,
                address TEXT NOT NULL,
                pincode INTEGER NOT NULL,
                weight REAL NOT NULL,
                status TEXT NOT NULL
            );`
        );
    });
};

export const fetchItems = async () => {
    const database = await db;
    return new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM items;',
                [],
                (_, { rows }) => resolve(rows.raw()),
                (_, error) => reject(error)
            );
        });
    });
};

export const insertItem = async ({ productName, description, vendorName, address, pincode, weight, status }) => {
    const database = await db;
    return new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(
                'INSERT INTO items (productName, description, vendorName, address, pincode, weight, status) VALUES (?, ?, ?, ?, ?, ?, ?);',
                [productName, description, vendorName, address, pincode, weight, status],
                (_, result) => resolve(result),
                (_, error) => reject(error)
            );
        });
    });
};

export const updateItem = async ({ id, productName, description, vendorName, address, pincode, weight, status }) => {
    const database = await db;
    return new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(
                'UPDATE items SET productName = ?, description = ?, vendorName = ?, address = ?, pincode = ?, weight = ?, status = ? WHERE id = ?;',
                [productName, description, vendorName, address, pincode, weight, status, id],
                (_, result) => resolve(result),
                (_, error) => reject(error)
            );
        });
    });
};

export const deleteItem = async (id) => {
    const database = await db;
    return new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(
                'DELETE FROM items WHERE id = ?;',
                [id],
                (_, result) => resolve(result),
                (_, error) => reject(error)
            );
        });
    });
};
