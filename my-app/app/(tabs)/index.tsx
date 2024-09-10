import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Header Section with Logo and Title */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
          <Text style={styles.festivalTitle}>PUNCHLINE FEST</Text>
          <Text style={styles.festivalDates}>12.07.2024 - 14.07.2024</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un événement"
          placeholderTextColor="#666"
        />
      </View>

      {/* Concert Image */}
      <View>
        <Image source={require('../../assets/images/concert.png')} style={styles.concertImage} />
      </View>

      {/* Festival Description */}
      <Text style={styles.description}>
        TROIS JOURS DE RAP NON-STOP. DEUX SCÈNES MAJEURES, DES DIZAINES D'ARTISTES EN LIVE,
        DES BATTLES DE FREESTYLE ÉPIQUES ET BIEN PLUS ENCORE !
      </Text>

      {/* Festival Map Section */}
      <View style={styles.mapContainer}>
        <Image source={require('../../assets/images/map.png')} style={styles.mapImage} />
        <TouchableOpacity style={styles.mapButton}>
          <Text style={styles.mapButtonText}>Carte du festival</Text>
        </TouchableOpacity>
      </View>

      {/* Social Media Icons */}
      <View style={styles.socialContainer}>
        <Ionicons name="logo-instagram" size={30} color="#fff" />
        <Ionicons name="logo-x" size={30} color="#fff" />
        <Ionicons name="logo-tiktok" size={30} color="#fff" />
      </View>

      {/* Bottom Navigation Bar */}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 100, // ajuste selon la taille de ton image
    height: 100,
    marginBottom: 10,
  },
  festivalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  festivalDates: {
    fontSize: 14,
    color: '#ccc',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  concertImage: {
    width: '100%',
    height: 200, // ajuste selon la taille de l'image
    borderRadius: 10,
    marginBottom: 20,
  },
  description: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  mapContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mapImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  mapButton: {
    backgroundColor: '#D4AF37',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  mapButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
});
