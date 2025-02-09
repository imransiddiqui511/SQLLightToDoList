import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/features/globalState/store/store';
import AppNavigator from './src/navigation/AppNavigator';
import { addItem } from './src/features/globalState/slice/itemsSlice';
import { db, initDatabase } from './src/features/database/database';

const App = () => {
  useEffect(() => {
    initDatabase();

    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM items;',
        [],
        (_, result) => {
          const items = result.rows.raw();
          items.forEach(item => store.dispatch(addItem(item)));
        },
        error => console.log('Error loading items: ', error)
      );
    });
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;