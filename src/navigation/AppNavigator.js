import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ItemListScreen from '../screens/ItemListScreen';
import AddEditItemScreen from '../screens/AddEditItemScreen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="ItemList" component={ItemListScreen} options={{ title: 'Items' }} />
      <Stack.Screen name="AddItem" component={AddEditItemScreen} options={{ title: 'Add Item' }} />
      <Stack.Screen name="EditItem" component={AddEditItemScreen} options={{ title: 'Edit Item' }} />
    </Stack.Navigator>
    </NavigationContainer>
    );
};

export default AppNavigator;