import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';
import styles from '../Styles/Motdepasse_style';

export default function MotdePasse({ navigation }) {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const apiBaseUrl = 'http://localhost:3000/api'; // Remplace par l’URL de ton backend

  const handleVerifyEmail = async () => {
    if (!email) {
      setError('Veuillez entrer votre adresse email.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/sendcode`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l’envoi du code.');
      }

      setError('');
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidateCode = async () => {
    if (!code) {
      setError('Veuillez entrer le code de vérification.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${apiBaseUrl}/verifycode?email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Code invalide.');
      }

      setError('');
      setStep(3); // On passe à l'étape suivante
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidatePasswords = async () => {
    if (!password || !confirmPassword) {
      setError('Veuillez remplir les deux champs.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/updatepassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la mise à jour du mot de passe.');
      }

      setError('');
console.log('Redirection vers Etudiant'); // Vérifiez si ce message apparaît dans la console
navigation.replace('Etudiant');
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>verification du compte</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {step === 1 && (
          <>
            <Text style={styles.label}>Adresse Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Entrez votre email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.button} onPress={handleVerifyEmail} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Envoyer le code</Text>
              )}
            </TouchableOpacity>
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.label}>Code de vérification</Text>
            <TextInput
              style={styles.input}
              placeholder="Entrez le code reçu"
              value={code}
              onChangeText={setCode}
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.button} onPress={handleValidateCode} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Valider le code</Text>
              )}
            </TouchableOpacity>
          </>
        )}

        {step === 3 && (
          <>
            <Text style={styles.label}>Nouveau mot de passe</Text>
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              placeholder="Confirmer le mot de passe"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.button} onPress={handleValidatePasswords} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Mettre à jour</Text>
              )}
            </TouchableOpacity>
          </>
        )}

        {step !== 1 && (
          <TouchableOpacity onPress={() => setStep(1)} style={{ marginTop: 10 }}>
            <Text style={{ textAlign: 'center', color: '#888' }}>← Retour à l'email</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}