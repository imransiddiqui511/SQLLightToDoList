import React from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ItemCard from '../ItemCard/ItemCard';
import { COLORS } from '../constants/theme';
import { STRINGS } from '../constants/Strings';
import { deleteItemById } from '../features/database/databaseService';
import { deleteItem } from '../features/globalState/slice/itemsSlice';

const ItemListScreen = ({ navigation }) => {
  const items = useSelector(state => state.items.items);
  const dispatch = useDispatch();

  const handleDelete = id => {
    // deleting item from redux
    dispatch(deleteItem(id));
    // deteting item from db.
    deleteItemById(id);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <ItemCard
            title={item.name}
            description={item.description}
            onDelete={() => handleDelete(item.id)}
            onEdit={() => navigation.navigate('EditItem', { item })}
          />
        )}
      />

      {/* Floating Add Button */}
      <TouchableOpacity 
        style={styles.addButton} 
        activeOpacity={0.7} 
        onPress={() => navigation.navigate('AddItem')}
      >
        <Text style={styles.addButtonText}>{STRINGS.addItemText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    position: 'absolute',
    bottom: 20,
    right: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 50,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ItemListScreen;
