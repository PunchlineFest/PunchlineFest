import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function NotificationsScreen() {
  const [isReminderEnabled, setIsReminderEnabled] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fonction pour demander les permissions de notification
  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Vous devez activer les notifications pour cette fonctionnalité.');
      return false;
    }
    return true;
  };

  // Fonction pour programmer une notification (test notification)
  const scheduleTestNotification = async () => {
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) return;

    // Annuler toutes les notifications avant d'en programmer une nouvelle
    await Notifications.cancelAllScheduledNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Test Notification',
        body: 'Ceci est une notification de test.',
      },
      trigger: { seconds: 3 }, // Déclenche la notification après 3 secondes
    }).then(() => {
      console.log("Notification programmée avec succès !");
    }).catch((error) => {
      console.error("Erreur lors de la planification de la notification", error);
    });
};



  // Fonction pour activer ou désactiver les notifications
  const toggleSwitch = () => setIsReminderEnabled(previousState => !previousState);

  // Fonction pour récupérer les événements depuis l'API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://172.16.2.198:8000/api/events');
        const data = await response.json();
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des événements:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement des événements...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rappels pour les événements</Text>
          <Text style={styles.sectionText}>
            Pour ne rater aucun évènement, activer les notifications sur vos évènements favoris !
          </Text>
        </View>

        <View style={styles.notificationToggle}>
          <Text style={styles.toggleText}>Activer les rappels</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#000000" }}
            thumbColor={isReminderEnabled ? "#000000" : "#767577"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isReminderEnabled}
          />
        </View>

        {/* Liste des événements */}
        {events.map(event => (
          <TouchableOpacity
            key={event.id}
            style={[
              styles.eventItem,
              !isReminderEnabled && styles.eventItemDisabled // Appliquer les styles grisés si l'option est désactivée
            ]}
            onPress={() => isReminderEnabled && Alert.alert("Choisir un délai", "Vous allez recevoir une notification")}
            disabled={!isReminderEnabled} // Désactiver le clic si l'option est désactivée
          >
            <Text style={[styles.eventName, !isReminderEnabled && styles.eventTextDisabled]}>
              {event.name}
            </Text>
            <Text style={[styles.eventDetails, !isReminderEnabled && styles.eventTextDisabled]}>
              Catégorie: {event.category} | Type: {event.type}
            </Text>
            <Text style={[styles.eventDate, !isReminderEnabled && styles.eventTextDisabled]}>
              Date: {new Date(event.date).toLocaleString()}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Bouton pour tester la notification */}
        <TouchableOpacity
          style={styles.testButton}
          onPress={scheduleTestNotification} // Planifie la notification de test
        >
          <Text style={styles.testButtonText}>Recevoir une notification de test</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
    paddingTop: 60,  // Ajoute de l'espace entre la première section et la barre de notifications
  },
  scrollContent: {
    paddingBottom: 80,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  sectionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  notificationToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  toggleText: {
    fontSize: 16,
    color: '#333',
  },
  eventItem: {
    backgroundColor: '#1C1C1E',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  eventItemDisabled: {
    backgroundColor: '#2E2E2E',
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  eventDetails: {
    fontSize: 14,
    color: '#ccc',
    marginVertical: 5,
  },
  eventDate: {
    fontSize: 12,
    color: '#aaa',
  },
  eventTextDisabled: {
    color: '#555', // Couleur gris clair quand l'option est désactivée
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
  },
  testButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  testButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
