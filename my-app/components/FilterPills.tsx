import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FilterPills = ({ filters, onPressFilter }: { filters: string[], onPressFilter: (filter: string) => void }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {filters.map((filter, index) => (
          <TouchableOpacity
            key={index}
            style={styles.pill}
            onPress={() => onPressFilter(filter)}
          >
            <Text style={styles.pillText}>{filter}</Text>
          </TouchableOpacity>
        ))}
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
  }
});

export default FilterPills
