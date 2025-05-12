import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

const idEtudiant = 1; // Remplace par l'ID réel de l'étudiant connecté

const AtalieScreen = () => {
  const [data, setData] = useState([]);
  const [likedItems, setLikedItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/get_atalie')
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error('Erreur chargement atalie:', err));

    fetchLikedAtalie();
  }, []);

  const fetchLikedAtalie = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/atalie_aimer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_etudiant: idEtudiant,
          mode: 'get',
        }),
      });

      const json = await response.json();
      const liked = json.aimer.map((item) => item.id_atalie);
      setLikedItems(liked);
    } catch (err) {
      console.error('Erreur récupération likes:', err);
    }
  };

  const handleLike = async (idAtalie) => {
    if (likedItems.includes(idAtalie)) return;

    try {
      const response = await fetch('http://localhost:3000/api/atalie_aimer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_etudiant: idEtudiant,
          id_atalie: idAtalie,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Succès', 'Ajouté aux favoris !');
        fetchLikedAtalie();
      } else {
        Alert.alert('Erreur', data.message || 'Échec de l\'ajout');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
      Alert.alert('Erreur', 'Une erreur est survenue');
    }
  };

  const handleOpen = async (fileUrl) => {
    const supported = await Linking.canOpenURL(fileUrl);
    if (supported) {
      Linking.openURL(fileUrl);
    } else {
      Alert.alert('Erreur', 'Impossible d’ouvrir le fichier.');
    }
  };

  const renderItem = ({ item }) => {
    const fileUrl = item.fichierUrl;
    const fileName = fileUrl?.split('/').pop() || 'document.pdf';
    const isLiked = likedItems.includes(item.id);

    if (!fileUrl) return null;

    return (
      <View style={styles.card}>
        <Text style={styles.title}>{item.nom}</Text>
        <Text style={styles.description}>{item.descriptions}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleLike(item.id)}
            disabled={isLiked}
          >
            <FontAwesome
              name={isLiked ? 'heart' : 'heart-o'}
              size={24}
              color="red"
            />
            <Text style={styles.iconText}>{isLiked ? 'Aimé' : 'Aimer'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleOpen(fileUrl)}
          >
            <FontAwesome name="file-pdf-o" size={24} color="orange" />
            <Text style={styles.iconText}>Ouvrir</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 10 }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    alignItems: 'center',
  },
  iconText: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default AtalieScreen;
