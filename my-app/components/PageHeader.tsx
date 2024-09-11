import {StyleSheet, TextInput, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";

export const PageHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.arrowButton}>
        <Ionicons name="chevron-back" size={30} style={styles.headerIcon} />
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholderTextColor="#666"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerIcon: {
    color: "#000",
    margin: "auto"
  },
  arrowButton: {
    backgroundColor: "#ffffff",
    borderRadius: 50,
    height: 50,
    width: 50
  },
  searchContainer: {
    width: "80%",
    flexDirection: 'row-reverse',
    backgroundColor: '#ffffff',
    borderRadius: 500,
    padding: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
})