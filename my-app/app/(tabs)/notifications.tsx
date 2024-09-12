import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function NotificationsScreen() {
  const [isReminderEnabled, setIsReminderEnabled] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Fonction pour demander les permissions de notification
  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Vous devez activer les notifications pour cette fonctionnalité.');
      return false;
    }
    return true;
  };

  // Fonction pour programmer une notification
  const scheduleNotification = async (event, delayInMinutes) => {
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) return;

    const eventTime = new Date(event.date).getTime();
    const currentTime = new Date().getTime();
    const triggerTime = eventTime - delayInMinutes * 60 * 1000;

    if (triggerTime <= currentTime) {
      alert("Le délai choisi est trop court ");
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Rappel pour l'événement : ${event.name}`,
        body: `L'événement "${event.name}" commence dans ${delayInMinutes} minutes.`,
      },
      trigger: { seconds: (triggerTime - currentTime) / 1000 },
    }).then(() => {
      Alert.alert(
        "Rappel", // Titre de l'alerte
        `Vous recevrez une notification ${delayInMinutes} minutes avant le début de ${event.name}.`, // Message de l'alerte
        [{ text: "OK" }] // Bouton OK pour fermer l'alerte
      );
      
    }).catch((error) => {
      console.error("Erreur lors de la planification de la notification", error);
    });

    setModalVisible(false);
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

  // Fonction pour ouvrir le modal et sélectionner l'événement
  const chooseReminderTime = (event) => {
    const eventTime = new Date(event.date).getTime();
    const currentTime = new Date().getTime();

    // Vérifier si l'événement est passé
    if (eventTime < currentTime) {
      Alert.alert("Événement terminé", "Cet évènement est déjà fini :(");
    } else {
      setSelectedEvent(event);
      setModalVisible(true);
    }
  };

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
            onPress={() => isReminderEnabled && chooseReminderTime(event)} // Permet de cliquer uniquement si l'option est activée
            disabled={!isReminderEnabled} // Désactiver le clic si l'option est désactivée
          >
            <Text style={[styles.eventName, !isReminderEnabled && styles.eventTextDisabled]}>
              {event.name}
            </Text>
            <Text style={[styles.eventDetails, !isReminderEnabled && styles.eventTextDisabled]}>
              Catégorie: {event.category} | Type: {event.type}
            </Text>
            <Text style={[styles.eventDate, !isReminderEnabled && styles.eventTextDisabled]}>
              Date: {new Date(event.date).toLocaleDateString('fr-FR')} {new Date(event.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </TouchableOpacity>
        ))}

        {/* Modal pour choisir le délai de notification */}
        {selectedEvent && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Choisir un délai de notification</Text>
                <Text style={styles.modalSubtitle}>Événement: {selectedEvent.name}</Text>

                <Pressable
                  style={styles.modalButton}
                  onPress={() => scheduleNotification(selectedEvent, 10)}
                >
                  <Text style={styles.modalButtonText}>10 minutes avant</Text>
                </Pressable>
                <Pressable
                  style={styles.modalButton}
                  onPress={() => scheduleNotification(selectedEvent, 15)}
                >
                  <Text style={styles.modalButtonText}>15 minutes avant</Text>
                </Pressable>
                <Pressable
                  style={styles.modalButton}
                  onPress={() => scheduleNotification(selectedEvent, 60)}
                >
                  <Text style={styles.modalButtonText}>1 heure avant</Text>
                </Pressable>

                <Pressable
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Annuler</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
    paddingTop: 60,
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
    fontFamily: "PoppinsBold",
    marginBottom: 10,
    color: '#333',
  },
  sectionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    fontFamily: "Poppins"
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
    fontFamily: "Poppins"
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
    fontFamily: 'PoppinsBold',
    color: '#fff',
  },
  eventDetails: {
    fontSize: 14,
    color: '#ccc',
    marginVertical: 5,
    fontFamily: "Poppins"
  },
  eventDate: {
    fontSize: 12,
    color: '#aaa',
    fontFamily: "Poppins"
  },
  eventTextDisabled: {
    color: '#555',
    fontFamily: "Poppins"
  },
  testButton: {
    backgroundColor: '#009EE2', // Changement de couleur
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  testButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: "Poppins"
  },
  modalSubtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
    fontFamily: "Poppins"
  },
  modalButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#009EE2', // Utilisation du bleu spécifié
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: "Poppins"
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
  },
});
