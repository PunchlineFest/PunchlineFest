import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Feather} from "@expo/vector-icons";
import {current} from "@react-native-community/cli-tools/build/releaseChecker";

// Le composant prend la date en props
const StatusBadge = ({ startDate, endDate }: { startDate: string, endDate: string }) => {
  const currentDate = new Date();
  const eventStartDate = new Date(startDate);
  const eventEndDate = new Date(endDate);

  let statusLabel = '';
  let badgeColor = '';

  // Logique pour définir le label et la couleur
  if (eventEndDate < currentDate) {
    statusLabel = 'Terminé';
    badgeColor = '#FF6347'; // Rouge tomate pour "Terminé"
  } else if (eventStartDate > currentDate) {
    statusLabel = 'À venir';
    badgeColor = '#FFD700'; // Jaune pour "À venir"
  } else if (currentDate > eventStartDate && currentDate < eventEndDate) {
    statusLabel = 'En cours';
    badgeColor = '#32CD32'; // Vert lime pour "En cours"
  }

  return (
    <View style={[styles.badge, { backgroundColor: badgeColor }]}>
      <Text style={styles.badgeText}>{statusLabel}</Text>
      <Feather name="clock" size={20} color="#fff" style={styles.icon} />
    </View>
  );
};

// Styles pour le badge
const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontFamily: "Poppins",
    color: '#fff',
    fontSize: 14,
    marginRight: 4
  },
  icon: {}
});

export default StatusBadge;
