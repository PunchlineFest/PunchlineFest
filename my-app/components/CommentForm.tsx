import React, { useState } from 'react';
import {View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import {API_BASE} from "@/config/env";
import axios from "axios";

export default function CommentForm({ eventId, setComments }: { eventId: string | string[], setComments:  React.Dispatch<React.SetStateAction<any[]>> }) {
  const [name, setName] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    // Vérifie que les champs ne sont pas vides
    if (!name || !content) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    setLoading(true);

    // Crée l'objet à envoyer à l'API
    const commentData = {
      author: name,
      content: content,
      event: eventId
    };

    try {
      const response = await axios.post(
        `${API_BASE}/comment`,
        JSON.stringify(commentData),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data) {
        const $newComment = JSON.parse(response.data);
        setComments((prevState) => {
          if (prevState) {
            return [$newComment, ...prevState]; // Ajoute le nouveau commentaire à la fin du tableau
          }
          return [$newComment]; // Si le tableau est vide ou inexistant, crée un nouveau tableau
        });
        Alert.alert('Succès', 'Votre commentaire a été envoyé.');
        // Réinitialise le formulaire après succès
        setName('');
        setContent('');
      } else {
        Alert.alert('Erreur', 'Une erreur est survenue.');
      }
    } catch (error) {
      if (error.response) {
        // La requête a été faite et le serveur a répondu avec un statut différent de 2xx
        console.log('Erreur réponse serveur:', error.response.data);
        console.log('Statut:', error.response.status);
        console.log('En-têtes:', error.response.headers);
      } else if (error.request) {
        // La requête a été faite mais aucune réponse n'a été reçue
        console.log('Erreur requête sans réponse:', error.request);
      } else {
        // Une autre erreur s'est produite lors de la mise en place de la requête
        console.log('Erreur inconnue:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ton nom"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.textArea}
        placeholder="Donne ton avis..."
        value={content}
        onChangeText={setContent}
        multiline={true}
        numberOfLines={4}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]} // Change de style si "loading"
        onPress={handleSubmit}
        disabled={loading} // Désactive le bouton en mode chargement
      >
        <Text style={styles.buttonText}>{loading ? 'Envoi en cours...' : 'Envoyer'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:24
  },
  input: {
    height: 40,
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize:12,
    fontFamily: "Poppins",
  },
  textArea: {
    height: 100,
    backgroundColor: '#fff',
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingTop: 10,
    borderRadius: 10,
    textAlignVertical: 'top',
    fontSize:12,
    fontFamily: "Poppins"
  },
  button: {
    backgroundColor: '#BEB8AC',
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    width: 75,
  },
  buttonDisabled: {
    backgroundColor: '#95a5a6',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: "Poppins"
  },
});
