import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';
import { STRINGS } from '../constants/Strings';

const ItemCard = ({ title, description, onEdit, onDelete }) => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.editButton} onPress={onEdit} activeOpacity={0.7}>
          <Text style={styles.buttonText}>{STRINGS.editButtonText}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete} activeOpacity={0.7}>
          <Text style={styles.buttonText}>{STRINGS.deleteButtonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 16,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    shadowColor:COLORS.shadowDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  content: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.textDark,
  },
  description: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: COLORS.danger,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default ItemCard;

