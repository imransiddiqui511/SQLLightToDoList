import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Keyboard } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import AsyncStorage from "@react-native-community/async-storage";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "./SearchScreenStyles";
const GOOGLE_API_KEY = 'API_KEY';

const SearchScreen = ({ navigation }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
      console.log("Keyboard opened!");
    });

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
      console.log("Keyboard closed!");
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleSelectPlace = async (data, details = null) => {
    if (!details) return;

    const location = {
      place_id: data.place_id,
      name: details.name || data.description,
      address: details.formatted_address,
      lat: details.geometry.location.lat,
      lng: details.geometry.location.lng,
      timestamp: new Date().toISOString(),
      dateDisplay: new Date().toLocaleString(),
    };

    setSelectedPlace(location);

    // Save to history with date
    try {
      let history = JSON.parse(await AsyncStorage.getItem("searchHistory")) || [];
      
      // Remove duplicate if exists
      history = history.filter(item => item.place_id !== location.place_id);
      // Add new search to beginning of array
      history.unshift(location);
      await AsyncStorage.setItem("searchHistory", JSON.stringify(history));
      setRecentSearches(history.slice(0, 3)); // Show 3 most recent
    } catch (error) {
      console.error("Error saving search history:", error);
    }

    // Navigate to Map screen
    navigation.navigate("Map", { location });
  };

  const loadRecentSearches = async () => {
    try {
      const history = JSON.parse(await AsyncStorage.getItem("searchHistory")) || [];
      setRecentSearches(history.slice(0, 3)); // Show 3 most recent
    } catch (error) {
      console.error("Error loading recent searches:", error);
    }
  };

  // Load recent searches when screen focuses
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadRecentSearches);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search for places"
        query={{ 
          key: GOOGLE_API_KEY, 
          language: "en",
        }}
        onPress={handleSelectPlace}
        fetchDetails={true}
        enablePoweredByContainer={false}
        styles={{
          container: styles.searchContainer,
          textInputContainer: styles.textInputContainer,
          textInput: styles.textInput,
          listView: styles.listView,
          row: styles.row,
          description: styles.description,
        }}
        renderLeftButton={() => (
          <View style={styles.searchIconContainer}>
            <Icon name="search" size={20} color="#666" />
          </View>
        )}
      />

      {/* Recent searches section */}
      {!isKeyboardVisible&&recentSearches.length > 0 && (
        <View style={styles.recentSearchesContainer}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          {recentSearches.map((item) => (
            <TouchableOpacity
              key={item.place_id}
              style={styles.recentItem}
              onPress={() => navigation.navigate("Map", { location: item })}
            >
              <Icon name="history" size={20} color="#666" style={styles.historyIcon} />
              <View style={styles.recentItemText}>
                <Text style={styles.recentItemName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.recentItemDetails} numberOfLines={1}>
                  {item.address} • {item.dateDisplay}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {!isKeyboardVisible&&<TouchableOpacity 
        style={styles.historyButton}
        onPress={() => navigation.navigate("History")}
      >
        <Icon name="history" size={24} color="#fff" />
        <Text style={styles.historyButtonText}>View Full History</Text>
      </TouchableOpacity>}
    </View>
  );
};

export default SearchScreen;
