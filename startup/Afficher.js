import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Image, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Afficher() {
  const [idEtudiant, setIdEtudiant] = useState(null);
  const [startups, setStartups] = useState([]);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Récupération de l'ID étudiant
  useEffect(() => {
    const fetchIdEtudiant = async () => {
      try {
        const studentId = await AsyncStorage.getItem('id_etudiant');
        if (!studentId) throw new Error('ID étudiant non trouvé');
        setIdEtudiant(studentId);
      } catch (error) {
        console.error('Erreur récupération ID étudiant :', error);
      }
    };

    fetchIdEtudiant();
  }, []);

  // Récupération des startups
  useEffect(() => {
    if (!idEtudiant) return;

    const fetchStartups = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/startups/partenaires/${idEtudiant}`);
        setStartups(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des startups partenaires', error);
      }
    };
    

    fetchStartups();
  }, [idEtudiant]);

  // Ouvrir le modal
  const openModal = (startup) => {
    setSelectedStartup(startup);
    setIsOpen(true);
  };

  // Fermer le modal
  const closeModal = () => {
    setIsOpen(false);
    setSelectedStartup(null);
  };

  const handleDownload = (url) => {
    Alert.alert('Téléchargement', `Télécharger le fichier depuis ${url}`);
  };

  return (
    <View>
   <FlatList
  data={startups}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <View style={styles.card}>
    <Text style={styles.cardTitle}>{item.nom}</Text>
    <Text style={styles.cardSubtitle}>Domaine : {item.domaine_nom}</Text> {/* Domaine affiché ici */}
    <Text style={styles.cardDescription}>{item.description}</Text>
    <TouchableOpacity style={styles.button} onPress={() => openModal(item)}>
      <Text style={styles.buttonText}>Voir</Text>
    </TouchableOpacity>
  </View>
  )}
  ListEmptyComponent={<Text style={styles.emptyText}>Aucune startup trouvée.</Text>}
/>

      {/* Modal pour afficher les détails */}
      <Modal visible={isOpen} transparent animationType="slide" onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedStartup && (
              <>
                <Text style={styles.modalTitle}>{selectedStartup.nom}</Text>
                <Text style={styles.modalText}>
                  <Text style={styles.bold}>Description :</Text> {selectedStartup.description}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.bold}>Date de création :</Text>{' '}
                  {new Date(selectedStartup.date_creation).toLocaleDateString()}
                </Text>
                {selectedStartup.site_web && (
                  <Text style={styles.modalText}>
                    <Text style={styles.bold}>Site Web :</Text>{' '}
                    <Text style={styles.link} onPress={() => Alert.alert('Ouvrir le site', selectedStartup.site_web)}>
                      {selectedStartup.site_web}
                    </Text>
                  </Text>
                )}
                {selectedStartup.entreprise && (
  <>
    <Text style={styles.modalText}>
      <Text style={styles.bold}>Entreprise partenaire :</Text> {selectedStartup.entreprise.nom}
    </Text>
    <Text style={styles.modalText}>
      <Text style={styles.bold}>Email :</Text> {selectedStartup.entreprise.mail}
    </Text>
    <Text style={styles.modalText}>
      <Text style={styles.bold}>À propos :</Text> {selectedStartup.entreprise.description}
    </Text>
  </>
)}

                {selectedStartup.fichier_url && (
                  <View style={styles.fileContainer}>
                    {selectedStartup.fichier_url.endsWith('.pdf') ? (
                      <TouchableOpacity onPress={() => handleDownload(selectedStartup.fichier_url)}>
                        <Text style={styles.downloadButton}>Télécharger PDF</Text>
                      </TouchableOpacity>
                    ) : (
                      <Image
                        source={{ uri: selectedStartup.fichier_url }}
                        style={styles.image}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                )}
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.closeButtonText}>Fermer</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    fontStyle: 'italic',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  bold: {
    fontWeight: 'bold',
  },
  link: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  fileContainer: {
    marginTop: 10,
  },
  downloadButton: {
    color: '#007BFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  closeButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});