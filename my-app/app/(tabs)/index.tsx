import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function HomeScreen() {
  // Charger les polices
  let [fontsLoaded] = useFonts({
    'BebasNeue': require('../../assets/fonts/BebasNeue-Regular.ttf'),
    'Poppins': require('../../assets/fonts/PoppinsRegular-B2Bw.otf'),
    'PoppinsBold': require('../../assets/fonts/PoppinsBold-GdJA.otf')
  });

  // Si la police n'est pas encore chargée, afficher AppLoading
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  // Fonction pour ouvrir un lien
  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Section with Croissant-shaped Circle */}
        <View style={styles.header}>
          <View style={styles.outerCircleContainer}>
            <View style={styles.outerCircle}>
              <View style={styles.innerCircle}>
                <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
              </View>
            </View>
          </View>

          {/* Title Section */}
          <View style={styles.titleContainer}>
            <Text style={styles.festivalTitle}>PUNCHLINE FEST</Text>
            <Text style={styles.festivalDates}>12.07.2024 - 14.07.2024</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher"
            placeholderTextColor="#666"
          />
        </View>

        {/* Concert Image */}
        <View style={styles.concertContainer}>
          <Image source={require('../../assets/images/concert.png')} style={styles.concertImage} />
        </View>

        {/* Festival Description under concert image */}
        <Text style={styles.description}>
          TROIS JOURS DE RAP NON-STOP. DEUX SCÈNES MAJEURES, DES DIZAINES D'ARTISTES EN LIVE,
          DES BATTLES DE FREESTYLE ÉPIQUES ET BIEN PLUS ENCORE !
        </Text>

        {/* Map Section with two overlays */}
        <View style={styles.mapContainer}>
          {/* Image de la carte */}
          <Image source={require('../../assets/images/map.png')} style={styles.mapImage} />

          {/* Bouton "Carte du festival" */}
          <TouchableOpacity style={styles.mapButton}>
            <Text style={{fontFamily:"PoppinsBold", fontSize: 11}}>Carte du festival</Text>
          </TouchableOpacity>

          {/* Texte descriptif superposé */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>
              Retrouvez tous les évènements et bien plus encore !
            </Text>

            {/* Bouton fléché à droite */}

          </View>
        </View>

        {/* Social Media Icons */}
        <View style={styles.socialContainer}>
          <TouchableOpacity onPress={() => openLink('https://www.instagram.com')}>
            <Ionicons name="logo-instagram" size={30} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => openLink('https://www.twitter.com')}>
            <FontAwesome6 name="x-twitter" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => openLink('https://www.tiktok.com')}>
            <Ionicons name="logo-tiktok" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: StatusBar.currentHeight || 20,  // Gérer la barre de statut
    // padding: 20,
  },
  scrollContent: {
    paddingBottom: 80, // Pour éviter que les éléments ne se chevauchent avec la barre de navigation
  },
  header: {
    flexDirection: 'row', // Aligner le logo à côté du texte
    alignItems: 'center',
    justifyContent: 'flex-start', // Le texte doit être à droite du logo
    marginBottom: 20,
  },
  outerCircleContainer: {
    position: 'relative',
    width: 180,  // Taille du conteneur du cercle extérieur
    height: 180,
    overflow: 'hidden',  // Pour couper une partie du cercle
  },
  outerCircle: {
    position: 'absolute',
    width: 220,  // Réduction de la taille du cercle
    height: 210,
    borderRadius: 150,  // Cercle extérieur
    backgroundColor: '#BEB8AC',
    justifyContent: 'center',
    alignItems: 'center',
    left: -55,  // Déplace le cercle encore plus à gauche pour créer l'effet coupé
    top: -50,    // Légèrement décalé vers le haut
  },
  innerCircle: {
    width: 150, // Taille du cercle intérieur
    height: 150,
    borderRadius: 100, // Cercle intérieur
    backgroundColor: '#FFFFFF', // Couleur du cercle intérieur (blanc)
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 77, // Ajuste selon la taille du logo
    height: 62,
    resizeMode: "cover"
  },
  titleContainer: {
    flex: 1,
    paddingRight:20,
    justifyContent: 'center', // Centrer verticalement le texte
    alignItems: 'flex-start', // Aligner le texte à droite du logo
    marginLeft: 20, // Ajouter de l'espace entre le logo et le texte
  },
  festivalTitle: {
    fontSize: 35, // Taille du texte "PUNCHLINE FEST"
    fontFamily: 'BebasNeue',
    color: '#fff',
  },
  festivalDates: {
    fontSize: 20,
    color: '#ccc',
    fontFamily: "BebasNeue"
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECE6F0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 40,
    marginHorizontal: 20
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontFamily: "Poppins"
  },
  concertContainer: {
    alignItems: 'center', // Centrer l'image de concert
    marginBottom: 20,
  },
  concertImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  description: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 15, // Taille ajustée si nécessaire
    fontFamily: 'BebasNeue', // Utilisation de la nouvelle police
    paddingHorizontal:20
  },
  mapContainer: {
    position: 'relative', // Utilisé pour positionner les éléments en superposition
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20
  },
  mapImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  mapButton: {
    position: 'absolute',
    left: 20,
    top: -10, // Ajuste cette valeur selon tes besoins
    backgroundColor: '#BEB8AC', 
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
    marginLeft:20
  },
  descriptionContainer: {
    position: 'absolute',
    bottom: 10, // Positionné en bas de la carte
    backgroundColor: '#BEB8AC', 
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    width: '90%', // Occupe une bonne partie de la largeur de la carte
  },
  descriptionText: {
    flex: 1,
    color: '#000',
    fontFamily:"Poppins",
    fontSize: 11
  },
  arrowButton: {
    marginLeft: 10, // Espace entre le texte et la flèche
  },
  socialContainer: {
    paddingHorizontal:40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});
