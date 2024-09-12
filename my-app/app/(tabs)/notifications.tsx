import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity, Modal, Pressable, RefreshControl } from 'react-native';
import * as Notifications from 'expo-notifications';
import Ionicons from '@expo/vector-icons/Ionicons';
import { API_BASE } from '@/config/env';
// Configuration pour afficher les notifications même en foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
export default function NotificationsScreen() {
  const [isReminderEnabled, setIsReminderEnabled] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [reminders, setReminders] = useState({});
  const [customAlert, setCustomAlert] = useState({ visible: false, title: '', message: '' });
  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      showCustomAlert('Permission requise', 'Vous devez activer les notifications pour cette fonctionnalité.');
      return false;
    }
    return true;
  };
  const showCustomAlert = (title, message) => {
    setCustomAlert({ visible: true, title, message });
  };
  const closeCustomAlert = () => {
    setCustomAlert({ visible: false, title: '', message: '' });
  };
  const scheduleNotification = async (event, delayInMinutes) => {
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) return;
    const eventTime = new Date(event.date).getTime();
    const currentTime = new Date().getTime();
    const triggerTime = eventTime - delayInMinutes * 60 * 1000;
    if (triggerTime <= currentTime) {
      showCustomAlert("Erreur", "Le délai choisi est trop court.");
      return;
    }
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Rappel pour l'événement : ${event.name}`,
        body: `L'événement "${event.name}" commence dans ${delayInMinutes} minutes.`,
      },
      trigger: { seconds: (triggerTime - currentTime) / 1000 },
    }).then(() => {
      showCustomAlert("Rappel programmé", `Vous recevrez une notification ${delayInMinutes} minutes avant le début de ${event.name}.`);
      setReminders((prevReminders) => ({
        ...prevReminders,
        [event.id]: true,
      }));
    }).catch((error) => {
      console.error("Erreur lors de la planification de la notification", error);
    });
    setModalVisible(false);
  };
  const scheduleTestNotification = async () => {
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) return;
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Test Notification',
        body: 'Ceci est une notification de test.',
      },
      trigger: { seconds: 5 },
    }).then(() => {
      console.log("Notification programmée avec succès !");
    }).catch((error) => {
      console.error("Erreur lors de la planification de la notification", error);
    });
  };
  const toggleSwitch = () => setIsReminderEnabled(previousState => !previousState);
  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_BASE}/events`);
      const data = await response.json();
      setEvents(data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des événements:', error);
      setLoading(false);
    }
  };
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchEvents();
    setRefreshing(false);
  };
  useEffect(() => {
    fetchEvents();
  }, []);
  const chooseReminderTime = (event) => {
    const eventTime = new Date(event.date).getTime();
    const currentTime = new Date().getTime();
    if (eventTime < currentTime) {
      showCustomAlert("Événement terminé", "Cet évènement est déjà fini :(");
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
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
        {events.map(event => (
          <TouchableOpacity
            key={event.id}
            style={[styles.eventItem, !isReminderEnabled && styles.eventItemDisabled]}
            onPress={() => isReminderEnabled && chooseReminderTime(event)}
            disabled={!isReminderEnabled}
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
            {reminders[event.id] && (
              <Ionicons name="notifications-outline" size={24} color="yellow" style={styles.bellIcon} />
            )}
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.testButton} onPress={scheduleTestNotification}>
          <Text style={styles.testButtonText}>Recevoir une notification de test</Text>
        </TouchableOpacity>
        {selectedEvent && (
          <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Choisir un délai de notification</Text>
                <Text style={styles.modalSubtitle}>Événement: {selectedEvent.name}</Text>
                <Pressable style={styles.modalButton} onPress={() => scheduleNotification(selectedEvent, 10)}>
                  <Text style={styles.modalButtonText}>10 minutes avant</Text>
                </Pressable>
                <Pressable style={styles.modalButton} onPress={() => scheduleNotification(selectedEvent, 15)}>
                  <Text style={styles.modalButtonText}>15 minutes avant</Text>
                </Pressable>
                <Pressable style={styles.modalButton} onPress={() => scheduleNotification(selectedEvent, 60)}>
                  <Text style={styles.modalButtonText}>1 heure avant</Text>
                </Pressable>
                <Pressable style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                  <Text style={styles.modalButtonText}>Annuler</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        )}
        {/* Custom Alert Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={customAlert.visible}
          onRequestClose={closeCustomAlert}
        >
          <View style={styles.alertContainer}>
            <View style={styles.alertBox}>
              <Text style={styles.alertTitle}>{customAlert.title}</Text>
              <Text style={styles.alertMessage}>{customAlert.message}</Text>
              <Pressable style={styles.alertButton} onPress={closeCustomAlert}>
                <Text style={styles.alertButtonText}>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
    fontFamily: "Poppins",
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
    fontFamily: "Poppins",
  },
  eventItem: {
    backgroundColor: '#1C1C1E',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  eventItemDisabled: {
    opacity: 0.3,
    backgroundColor: '#BEB8AC',
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
    fontFamily: "Poppins",
  },
  eventDate: {
    fontSize: 12,
    color: '#aaa',
    fontFamily: "Poppins",
  },
  bellIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  eventTextDisabled: {
    color: '#555',
    fontFamily: "Poppins",
  },
  testButton: {
    backgroundColor: '#009EE2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  testButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',  // Utilise un fond noir pour que le texte blanc soit visible
  },
  loadingText: {
    color: '#fff',  // Utilise du noir à la place du blanc
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
    fontFamily: "Poppins",
  },
  modalSubtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
    fontFamily: "Poppins",
  },
  modalButton: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#009EE2',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: "Poppins",
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
  },
  alertContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertBox: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  alertMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  alertButton: {
    backgroundColor: '#009EE2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  alertButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});