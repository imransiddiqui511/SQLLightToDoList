import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addItem, updateItem } from '../features/globalState/slice/itemsSlice';
import { COLORS } from '../constants/theme';
import { STRINGS } from '../constants/Strings';
import { db } from '../features/database/database';

const AddEditItemScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { item } = route.params || {};
  const [name, setName] = useState(item ? item.name : '');
  const [description, setDescription] = useState(item ? item.description : '');

  const handleSave = () => {
    if (!name.trim() || !description.trim()) {
      // eslint-disable-next-line no-alert
      alert('Name and Description cannot be empty!');
      return;
    }

    if (item) {
      const updatedItem = { ...item, name, description };
      dispatch(updateItem(updatedItem));
      db.transaction(tx => {
        // updating items table where id is match and it will update item name and description.
        tx.executeSql('UPDATE items SET name = ?, description = ? WHERE id = ?;', [name, description, item.id]);
      });
    } else {
      const newItem = { id: Date.now(), name, description };
      dispatch(addItem(newItem));
      db.transaction(tx => {
        // this query is use for inserting new record in items table.
        tx.executeSql('INSERT INTO items (name, description) VALUES (?, ?);', [name, description]);
      });
    }
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>{item ? STRINGS.editItemText : STRINGS.addItemText}</Text>
        {/* Input Fields */}
        <TextInput
          style={styles.input}
          placeholder="Enter Item Name"
          placeholderTextColor={COLORS.placeholder}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter Description"
          placeholderTextColor={COLORS.placeholder}
          value={description}
          onChangeText={setDescription}
          multiline
        />
        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          activeOpacity={0.7}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:COLORS.background,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color:COLORS.text,
  },
  input: {
    borderWidth: 1,
    borderColor:COLORS.border,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor:COLORS.white,
    marginBottom: 15,
    shadowColor:COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor:COLORS.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    shadowColor:COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  saveButtonText: {
    color:COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddEditItemScreen;
