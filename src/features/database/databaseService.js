import { db } from './database';

const executeQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        sql,
        params,
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

export const addItem = async (name, description) => {
  try {
    await executeQuery('INSERT INTO items (name, description) VALUES (?, ?);', [name, description]);
    console.log('Item added successfully');
  } catch (error) {
    console.error('Error adding item:', error);
  }
};

export const updateItem = async (id, name, description) => {
  try {
    await executeQuery('UPDATE items SET name = ?, description = ? WHERE id = ?;', [name, description, id]);
    console.log('✅ Item updated successfully');
  } catch (error) {
    console.error('Error updating item:', error);
  }
};

export const deleteItemById = async (id) => {
  try {
    await executeQuery('DELETE FROM items WHERE id = ?;', [id]);
    console.log('✅ Item deleted successfully');
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};

export const getAllItems = async () => {
  try {
    const result = await executeQuery('SELECT * FROM items;');
    return result.rows.raw(); // Convert to array
  } catch (error) {
    console.error('Error fetching items:', error);
    return [];
  }
};
