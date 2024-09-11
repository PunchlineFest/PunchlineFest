import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import axios from 'axios';
import {API_BASE} from "@/config/env";

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default () => {
  const [events, setEvents] = useState([]); // État pour stocker les événements

  // Fonction pour récupérer les données de l'API
  const fetchEvents = async () => {
    try {
        const response = await axios.get(API_BASE + '/events');
        setEvents(response.data); // Mettre à jour les événements dans le state
    } catch (error) {
      console.error('Erreur lors de la récupération des événements', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 43.260639,
          longitude: 5.381889,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {events.map((event) => (
          <Marker
            key={event.id}
            coordinate={{
              latitude: event.coordinates[0],
              longitude: event.coordinates[1],
            }}
            title={event.name}
            description={event.description}
          />
        ))}
      </MapView>
    </View>
  );
};
