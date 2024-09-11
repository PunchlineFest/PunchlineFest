import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FilterPills = ({ filters, onPressFilter, selectedFilters }: { filters: string[], onPressFilter: (filter: string) => void, selectedFilters: string[] }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {filters.map((filter, index) => {
          // Vérification si le filtre est actif (sélectionné)
          const isActive = selectedFilters.includes(filter);

          return (
            <TouchableOpacity
              key={index}
              style={[styles.pill, isActive && styles.activePill]}
              onPress={() => onPressFilter(filter)}
            >
              <Text style={[styles.pillText, isActive && styles.activePillText]}>
                {filter}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 36,
    marginBottom: 30,
    height: 50, // Ajuster selon vos besoins
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  pill: {
    borderColor: "#ffffff",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 15,
    textAlign: "center",
    marginRight: 10
  },
  pillText: {
    color: '#fff',
  },
  activePill: {
    backgroundColor: '#32CD32', // Couleur verte pour les "pills" actives
  },
  activePillText: {
    color: '#fff', // Texte blanc pour les "pills" actives
  },
});

export default FilterPills
