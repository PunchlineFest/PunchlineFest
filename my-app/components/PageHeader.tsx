import {GestureResponderEvent, Image, StyleSheet, TextInput, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";

const logo = require('../assets/images/logo-white.png');

export const PageHeader = ({
   value,
   onChangeText,
   handleSearchSubmit,
   isLogo = false
}: {
  value?: string | undefined,
  onChangeText?: ((text: string) => void) | undefined,
  handleSearchSubmit?: ((event: GestureResponderEvent) => void) | undefined,
  isLogo?: boolean
}) => {
  return (
    <View style={[
      styles.headerContainer,
      {
        justifyContent: isLogo ? "flex-start" : "space-between",
        paddingBottom: isLogo ? 20 : 5
      },
    ]}>
      <View style={styles.arrowButton}>
        <Ionicons name="chevron-back" size={30} style={styles.headerIcon} />
      </View>
      {
        isLogo ? (
            <View style={styles.logo}>
              <Image source={logo} style={{margin: "auto"}}/>
            </View>
        ) : (
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} onPress={handleSearchSubmit} />
            <TextInput
              style={styles.searchInput}
              placeholderTextColor="#666"
              value={value}
              onChangeText={onChangeText}
            />
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: "center",
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
    fontFamily: "Poppins",
    flex: 1,
    color: '#000',
    fontSize: 16,
    paddingHorizontal: 10
  },
  logo: {
    width: "80%",
  }
})