import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, ScrollView, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const contacter = () => {
  const [objet, setObjet] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [idEtudiant, setIdEtudiant] = useState(null);

  // Fonction pour récupérer l'id étudiant depuis AsyncStorage
  useEffect(() => {
    const fetchIdEtudiant = async () => {
      try {
        const id = await AsyncStorage.getItem('id_etudiant');
        if (!id) throw new Error('ID étudiant non trouvé');
        setIdEtudiant(id);
      } catch (error) {
        console.error('Erreur de récupération de l\'ID étudiant:', error);
      }
    };

    fetchIdEtudiant();
  }, []);

  // Fonction pour envoyer les données à l'API
  const handleSubmit = async () => {
    if (!objet || !message) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    if (!idEtudiant) {
      Alert.alert('Erreur', 'L\'ID étudiant n\'est pas disponible.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/sendContactMessage', {
        id: idEtudiant,
        objet,
        message,
      });

      Alert.alert('Succès', response.data.message);
      setObjet('');
      setMessage('');
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Erreur lors de l\'envoi du message.');
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour réinitialiser les champs du formulaire
  const handleCancel = () => {
    setObjet('');
    setMessage('');
  };

  return (
    <ScrollView style={styles.container}>

      <Text>
        Si vous avez des questions, des préoccupations ou souhaitez obtenir des informations supplémentaires sur les opportunités professionnelles, n'hésitez pas à nous contacter.
      </Text>

      {/* Formulaire */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Objet</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez l'objet de votre message"
          value={objet}
          onChangeText={setObjet}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Message</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Entrez votre message"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={4}
        />
      </View>

      {/* Boutons côte à côte */}
      <View style={styles.buttonRow}>
        {loading ? (
          <ActivityIndicator size="large" color="#007BFF" />
        ) : (
          <>
            <TouchableOpacity style={[styles.button, styles.sendButton]} onPress={handleSubmit}>
              <Icon name="send" size={18} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Envoyer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
              <Text style={styles.buttonText}>Annuler</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Footer avec icônes */}
      <View style={styles.footer}>
        <View style={styles.contactRow}>
          <Icon name="phone" size={20} color="#007BFF" />
          <Text style={styles.contactText}>+224-612-37-45-85</Text>
        </View>
        <View style={styles.contactRow}>
          <Icon name="envelope" size={20} color="#007BFF" />
          <Text style={styles.contactText}>sacko2120@gamil.com</Text>
        </View>
        <View style={styles.contactRow}>
          <Icon name="map-marker" size={20} color="#007BFF" />
          <Text style={styles.contactText}>NONGO carrefour Conteyah commune de Ratoma</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f4f4f9',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#007BFF',
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  sendButton: {
    backgroundColor: '#007BFF',
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#FF6F00',
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginRight: 8,
  },
  footer: {
    marginTop: 30,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default contacter;
