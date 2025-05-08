import React, { useState } from 'react';
import {
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Card } from 'react-native-paper';
import axios from 'axios';
import styles from '../Styles/EcranCompteEtudiant_style'

export default function EcranCompteEtudiant({ navigation }) {
  const [matricule, setMatricule] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [confirmerMotDePasse, setConfirmerMotDePasse] = useState('');
  const [user, setUser] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setError('');
    setSuccess('');

    if (!matricule || !email || !user || !motDePasse || !confirmerMotDePasse) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    if (motDePasse !== confirmerMotDePasse) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:3000/api/inscrip_etudiant', {
        matricule,
        email,
        user,
        password: motDePasse,
      });

      setSuccess('Compte étudiant créé avec succès !');
      setTimeout(() => navigation.replace('Confirmation'), 1000); // Redirection vers la page Confirmation
    } catch (err) {
      console.error('Erreur:', err);
      setError("Erreur lors de l'inscription ou étudiant déjà inscrit, veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.header}>Créer un compte Étudiant</Text>
        <Image
          source={require('../../assets/icone etudiant.jpeg')}
          style={styles.image}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {success ? <Text style={styles.successText}>{success}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Matricule"
          value={matricule}
          onChangeText={setMatricule}
        />
        <TextInput
          style={styles.input}
          placeholder="Adresse email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Nom d'utilisateur"
          value={user}
          onChangeText={setUser}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de Passe"
          secureTextEntry
          value={motDePasse}
          onChangeText={setMotDePasse}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmer le Mot de Passe"
          secureTextEntry
          value={confirmerMotDePasse}
          onChangeText={setConfirmerMotDePasse}
        />

        <TouchableOpacity
          onPress={handleSubmit}
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Créer un compte</Text>
          )}
          
        </TouchableOpacity>
      </Card>
    </SafeAreaView>
  );
}
