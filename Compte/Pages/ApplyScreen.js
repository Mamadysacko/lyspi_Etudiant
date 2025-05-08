import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Alert,
  Platform,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Card,
  Button,
  Text,
  Provider as PaperProvider,
} from 'react-native-paper';
import { WebView } from 'react-native-webview';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function ApplyScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { offer } = route.params;

  const [cv, setCv] = useState(null);
  const [letter, setLetter] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewUri, setPreviewUri] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('id_etudiant').then((id) => {
      if (!id) Alert.alert('Erreur', 'Utilisateur non connecté.');
      else setUserId(id);
    });
  }, []);

  const pickFile = async (type) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: true,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const file = result.assets[0];
      type === 'cv' ? setCv(file) : setLetter(file);
    }
  };

  const createBlobFromUri = async (uri) => {
    const response = await fetch(uri);
    return await response.blob();
  };

  const handleSubmit = async () => {
    if (!cv || !letter || !userId || !offer?.id) {
      Alert.alert('Champs manquants', 'Veuillez ajouter votre CV et lettre de motivation.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('id_offre', offer.id.toString());
    formData.append('id_etudiant', userId.toString());

    try {
      if (Platform.OS === 'web') {
        const cvBlob = await createBlobFromUri(cv.uri);
        const letterBlob = await createBlobFromUri(letter.uri);

        formData.append('cv', new File([cvBlob], cv.name || 'cv.pdf', { type: 'application/pdf' }));
        formData.append('lettre_motivation', new File([letterBlob], letter.name || 'lettre.pdf', { type: 'application/pdf' }));
      } else {
        formData.append('cv', {
          uri: cv.uri,
          type: 'application/pdf',
          name: cv.name || 'cv.pdf',
        });
        formData.append('lettre_motivation', {
          uri: letter.uri,
          type: 'application/pdf',
          name: letter.name || 'lettre.pdf',
        });
      }

      const response = await fetch('http://localhost:3000/api/etudiant/postuler', {
        method: 'POST',
        body: formData,
        ...(Platform.OS === 'web' ? {} : {
          headers: { 'Content-Type': 'multipart/form-data' },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setCv(null);
        setLetter(null);
      } else {
        Alert.alert('Erreur', data.message || 'Erreur lors de l’envoi.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  const openPdfPreview = async (file) => {
    if (Platform.OS === 'web') {
      const blob = await fetch(file.uri).then(res => res.blob());
      const url = URL.createObjectURL(blob);
      setPreviewUri(url);
    } else {
      setPreviewUri(file.uri);
    }
  };

  const renderFileCard = (label, file, key) => (
    <Card style={styles.card} key={key}>
      <Card.Title title={label} />
      <Card.Content>
        {file ? (
          <>
            <Text>{file.name}</Text>
            <View style={styles.actions}>
              <Button onPress={() => openPdfPreview(file)}>Voir</Button>
              <Button onPress={() => key === 'cv' ? setCv(null) : setLetter(null)} textColor="red">
                Supprimer
              </Button>
            </View>
            <Button mode="contained" onPress={() => pickFile(key)} style={styles.replaceBtn}>
              Remplacer
            </Button>
          </>
        ) : (
          <Button mode="contained" onPress={() => pickFile(key)}>Choisir un fichier</Button>
        )}
      </Card.Content>
    </Card>
  );

  if (previewUri) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Button onPress={() => setPreviewUri(null)} style={{ margin: 10 }}>⬅ Retour</Button>
        {Platform.OS === 'web' ? (
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: 'center', margin: 10 }}>Aperçu PDF</Text>
            <iframe src={previewUri} style={{ flex: 1, width: '100%', height: '100%' }} title="Aperçu PDF" />
          </View>
        ) : (
          <WebView source={{ uri: previewUri }} style={{ flex: 1 }} />
        )}
      </SafeAreaView>
    );
  }

  if (submitted) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.successMessage}>Candidature envoyée avec succès pour : {offer?.title}</Text>
        <Button mode="contained" onPress={() => navigation.goBack()} style={styles.submitBtn}>
          Retour
        </Button>
      </SafeAreaView>
    );
  }

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Soumettre ma candidature</Text>
        {renderFileCard('CV', cv, 'cv')}
        {renderFileCard('Lettre de motivation', letter, 'letter')}
        <Button
          mode="contained"
          onPress={handleSubmit}
          disabled={!cv || !letter || loading}
          style={styles.submitBtn}
        >
          Envoyer
        </Button>
      </SafeAreaView>
    </PaperProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f4f7',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    marginBottom: 15,
    padding: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  replaceBtn: {
    marginTop: 10,
  },
  submitBtn: {
    marginTop: 30,
  },
  successMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});
