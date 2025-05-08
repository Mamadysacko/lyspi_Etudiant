import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import styles from '../Styles/Confirmation_style';
import axios from 'axios';

export default function ConfirmationCode({ navigation }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    if (!code) {
      setError('Veuillez entrer le code de confirmation');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await axios.get(`http://localhost:3000/api/confirm`, {
        params: { code }, // Envoi du code en tant que paramètre
      });

      if (response.status === 200) {
        Alert.alert('Succès', 'Votre email a été confirmé avec succès');
        navigation.replace('Etudiant');// Redirection avec le choix "Étudiant"
      } else {
        setError('Code invalide ou expiré');
      }
    } catch (err) {
      console.error('Erreur de confirmation :', err);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Code de confirmation</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez le code reçu"
          value={code}
          onChangeText={setCode}
          placeholderTextColor="#999"
          keyboardType="default"
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isSubmitting ? '#ccc' : '#28a745', marginTop: 20 },
          ]}
          onPress={handleConfirm}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Text style={styles.buttonText}>Chargement...</Text>
          ) : (
            <Text style={styles.buttonText}>Confirmer</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}