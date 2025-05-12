import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Modal, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FormationScreen = () => {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idEtudiant, setIdEtudiant] = useState(null);
  const [participations, setParticipations] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [likedFormations, setLikedFormations] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchFormations();
    fetchIdEtudiant();
  }, []);

  const fetchFormations = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/get_formations');
      const data = await response.json();
      setFormations(data);
    } catch (error) {
      console.error("Erreur chargement formations :", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchIdEtudiant = async () => {
    try {
      const studentId = await AsyncStorage.getItem('id_etudiant');
      if (!studentId) throw new Error('ID étudiant non trouvé');
      setIdEtudiant(studentId);
      fetchParticipations(studentId);
      fetchLikedFormations(studentId);
    } catch (error) {
      console.error('Erreur récupération ID étudiant :', error);
    }
  };

  const fetchParticipations = async (etudiantId) => {
    if (!etudiantId) {
      console.warn('ID étudiant manquant pour la récupération des participations');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/etat_participation/${etudiantId}`);

      if (!response.ok) {
        throw new Error(`Erreur serveur : ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data.participations)) {
        setParticipations(data.participations.map((participation) => participation.id_formation));
      } else {
        setParticipations([]);
      }
    } catch (error) {
      console.error('Erreur récupération participations :', error.message || error);
      setParticipations([]);
    }
  };

  const fetchLikedFormations = async (etudiantId) => {
    try {
      const response = await fetch('http://localhost:3000/api/aimer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_etudiant: etudiantId,
          mode: 'get',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setLikedFormations(data.aimer.map((item) => item.id_formation));
      } else {
        console.error('Erreur récupération des formations aimées:', data.message);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des formations aimées:', error);
    }
  };

  const handleParticiper = async (idFormation) => {
    if (!idEtudiant) {
      Alert.alert('Erreur', 'ID étudiant non disponible');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/participation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_etudiant: idEtudiant,
          id_formation: idFormation
        })
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Succès', 'Participation enregistrée !');
        fetchParticipations(idEtudiant);
      } else {
        Alert.alert('Erreur', result.message || 'Erreur lors de la participation');
      }
    } catch (error) {
      console.error('Erreur participation :', error);
      Alert.alert('Erreur', 'Impossible de participer à la formation');
    }
  };

  const handleLike = async (idFormation) => {
    try {
      const response = await fetch('http://localhost:3000/api/aimer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_etudiant: idEtudiant,
          id_formation: idFormation,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Succès', 'Formation ajoutée aux favoris !');
        fetchLikedFormations(idEtudiant);
      } else {
        Alert.alert('Erreur', data.message || 'Impossible d\'ajouter aux favoris');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout aux favoris:', error);
      Alert.alert('Erreur', 'Une erreur est survenue');
    }
  };

  const confirmParticipation = (idFormation) => {
    setSelectedFormation(idFormation);
    setShowConfirmation(true);
  };

  const handleConfirmParticipation = () => {
    if (selectedFormation) {
      handleParticiper(selectedFormation);
    }
    setShowConfirmation(false);
    setSelectedFormation(null);
  };

  const handleCancelParticipation = () => {
    setShowConfirmation(false);
    setSelectedFormation(null);
  };

  const isParticipating = (idFormation) => {
    return participations.includes(idFormation);
  };

  const renderWorkshop = ({ item, index }) => (
    <Card style={styles.card}>
      <Text style={styles.index}>Formation #{index + 1} (ID: {item.formation.id})</Text>

      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.navigate('FormationDetails', {
          formation: item.formation,
          entreprise: item.entreprise
        })}
      >
        {item.entreprise.logo_url && (
          <Image source={{ uri: item.entreprise.logo_url }} style={styles.logo} />
        )}
        <View style={styles.headerText}>
          <Text style={styles.title}>{item.formation.titre}</Text>
          <Text style={styles.company}>{item.entreprise.nom_entreprise}</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.description}>{item.formation.description}</Text>

      {item.formation.image_url && (
        <Image source={{ uri: item.formation.image_url }} style={styles.image} resizeMode="cover" />
      )}

      <View style={styles.iconBar}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => handleLike(item.formation.id)}
          disabled={likedFormations.includes(item.formation.id)}
        >
          <FontAwesome
            name={likedFormations.includes(item.formation.id) ? 'heart' : 'heart-o'}
            size={24}
            color="red"
          />
          <Text style={styles.iconText}>
            {likedFormations.includes(item.formation.id) ? 'Aimé' : 'Aimer'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => confirmParticipation(item.formation.id)}
          disabled={isParticipating(item.formation.id)}
        >
          <FontAwesome name="handshake-o" size={24} color="green" />
          <Text style={styles.iconText}>
            {isParticipating(item.formation.id) ? 'Déjà inscrit' : 'Participer'}
          </Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <FlatList
          data={formations}
          renderItem={renderWorkshop}
          keyExtractor={(item) => item.formation.id.toString()}
        />
      )}

      <Modal
        visible={showConfirmation}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCancelParticipation}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Voulez-vous vraiment participer à cette formation ?</Text>
            <View style={styles.modalButtons}>
              <Button title="Annuler" onPress={handleCancelParticipation} color="red" />
              <Button title="Confirmer" onPress={handleConfirmParticipation} color="green" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#fff',
  },
  index: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'blue'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerText: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 14,
    color: 'gray',
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  iconBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default FormationScreen;
