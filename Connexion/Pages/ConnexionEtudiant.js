import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../Styles/ConnexionEtudiant_style'; // Import des styles séparés

export default function ConnexionEtudiant({ navigation }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleConnexion = async () => {
    if (!user || !password) {
      setError("Veuillez entrer un nom d'utilisateur et un mot de passe");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/etudiant_login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, password }),
      });

      const data = await response.json();

      if (response.ok && data.id_etudiant) {
        await AsyncStorage.setItem('id_etudiant', String(data.id_etudiant));
        await AsyncStorage.setItem('token', data.token);

        setSuccessMessage('Connexion réussie!');
        setError('');
        setTimeout(() => {
          navigation.replace('Accueil');
        }, 500);
      } else {
        setError("Nom d'utilisateur ou mot de passe incorrect");
      }
    } catch (err) {
      console.error('Erreur:', err);
      setError("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnnuler = () => {
    setUser('');
    setPassword('');
    setError('');
    setSuccessMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require('../../assets/icone etudiant.jpeg')}
          style={styles.image}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}

        <Text style={styles.label}>Nom d'utilisateur</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre nom d'utilisateur"
          value={user}
          onChangeText={setUser}
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre mot de passe"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#999"
        />

{isLoading ? (
  <Text style={styles.loadingText}>Chargement...</Text>
) : (
  <>
    {/* Bouton "Se connecter" en haut */}
    <TouchableOpacity style={styles.button} onPress={handleConnexion}>
      <Text style={styles.buttonText}>Se connecter</Text>
    </TouchableOpacity>

    {/* Bouton "Mot de passe oublié ?" en bas */}
    <View style={styles.bottomContainer}>
      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => navigation.navigate('Motdepasse')}
      >
        <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
    </View>
  </>
)}



      </View>
    </SafeAreaView>
  );
}
