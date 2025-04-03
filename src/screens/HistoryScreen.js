import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "./HistoryScreenStyles";
const HistoryScreen = ({ navigation, route }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Load history when screen focuses or gets new params
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadHistory);
    
    // If we receive a new search from another screen, refresh history
    if (route.params?.newSearch) {
      loadHistory();
    }
    
    return unsubscribe;
  }, [navigation, route.params]);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const storedHistory = JSON.parse(await AsyncStorage.getItem("searchHistory")) || [];
      setHistory(storedHistory);
    } catch (error) {
      console.error("Error loading history:", error);
      Alert.alert("Error", "Could not load search history");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadHistory();
  };

  const clearHistory = () => {
    Alert.alert(
      "Clear History",
      "Are you sure you want to delete all search history?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("searchHistory");
              setHistory([]);
            } catch (error) {
              console.error("Error clearing history:", error);
              Alert.alert("Error", "Could not clear search history");
            }
          },
        },
      ]
    );
  };

  const deleteSingleItem = async (itemId) => {
    try {
      const updatedHistory = history.filter(item => item.place_id !== itemId);
      await AsyncStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
    } catch (error) {
      console.error("Error deleting item:", error);
      Alert.alert("Error", "Could not delete this item");
    }
  };

  const navigateToMap = (item) => {
    navigation.navigate("Map", { 
      location: item,
      fromHistory: true 
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        selectedItem === item.place_id && styles.selectedItem
      ]}
      onPress={() => navigateToMap(item)}
      onLongPress={() => setSelectedItem(item.place_id)}
    >
      <View style={styles.itemContent}>
        <Icon name="place" size={24} color="#4285F4" style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.itemAddress} numberOfLines={1}>{item.address}</Text>
          <Text style={styles.itemDate}>
            {item.timestamp ? new Date(item.timestamp).toLocaleString() : "Unknown date"}
          </Text>
        </View>
      </View>
      
      {selectedItem === item.place_id && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteSingleItem(item.place_id)}
        >
          <Icon name="delete" size={20} color="#FF3B30" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Icon name="history" size={60} color="#CCCCCC" />
      <Text style={styles.emptyText}>No search history yet</Text>
      <Text style={styles.emptySubText}>Your searched places will appear here</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search History</Text>
        {history.length > 0 && (
          <TouchableOpacity onPress={clearHistory} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4285F4" />
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.place_id}
          renderItem={renderItem}
          ListEmptyComponent={renderEmptyComponent}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={["#4285F4"]}
              tintColor="#4285F4"
            />
          }
          onScroll={() => setSelectedItem(null)}
        />
      )}
    </View>
  );
};



export default HistoryScreen;