import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Feather} from "@expo/vector-icons";

// Le composant prend la date en props
const StatusBadge = ({ date }: { date: string }) => {
  const currentDate = new Date();
  const eventDate = new Date(date);

  let statusLabel = '';
  let badgeColor = '';

  // Logique pour définir le label et la couleur
  if (eventDate < currentDate) {
    statusLabel = 'Terminé';
    badgeColor = '#FF6347'; // Rouge tomate pour "Terminé"
  } else if (eventDate > currentDate) {
    statusLabel = 'À venir';
    badgeColor = '#FFD700'; // Jaune pour "À venir"
  } else {
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
    color: '#fff',
    fontSize: 14,
    marginRight: 4
  },
  icon: {}
});

export default StatusBadge;
