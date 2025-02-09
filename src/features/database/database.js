import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'items.db', location: 'default' });

const initDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT);',
      [],
      () => console.log('Database and table created successfully'),
      error => console.log('Error creating table: ', error)
    );
  });
};

export { db, initDatabase };
