import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Image, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api'; // Remplace avec l'URL de ton serveur

const CertAttes_liste = () => {
  const [certifications, setCertifications] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Récupérer les certificats d'un étudiant
  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const idEtudiant = await AsyncStorage.getItem('id_etudiant');
        if (!idEtudiant) throw new Error('ID étudiant non trouvé');

        const response = await axios.get(`${BASE_URL}/certificats/etudiantliste/${idEtudiant}`);
        setCertifications(response.data);
      } catch (error) {
        console.error('Erreur de chargement des certificats :', error);
      }
    };

    fetchCertifications();
  }, []);

  const openModal = (cert) => {
    setSelectedCert(cert);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCert(null);
  };

  const renderCertificationItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => openModal(item)}>
      <Text style={styles.type}>{item.type_certificat}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.date}>
        {item.date_obtention ? new Date(item.date_obtention).toLocaleDateString() : 'Date non spécifiée'}
      </Text>
      <Text style={styles.delivre}>{item.delivre}</Text>
     
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={certifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCertificationItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Modal pour voir le diplôme + détails */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContent}>
          {selectedCert && (
  <>
    <Text style={styles.modalTitle}>{selectedCert.type_certificat}</Text>
    <Text style={styles.modalDetail}>Description : {selectedCert.description}</Text>
    <Text style={styles.modalDetail}>Date d'obtention : {new Date(selectedCert.date_obtention).toLocaleDateString()}</Text>
    <Text style={styles.modalDetail}>Delivre : {selectedCert.delivre}</Text>

    <Text style={styles.modalDetail}> {selectedCert.id_type_cert_attes}</Text>

    {selectedCert.diplome_url ? (
      <Image
        source={{ uri: selectedCert.diplome_url }}
        style={styles.image}
        resizeMode="contain"
      />
    ) : (
      <Text style={{ marginVertical: 10 }}>Aucun diplôme disponible.</Text>
    )}

    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
      <Text style={styles.closeButtonText}>Fermer</Text>
    </TouchableOpacity>
  </>
)}

          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default CertAttes_liste;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#e6f0ff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  type: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
  },
  description: {
    marginTop: 4,
    fontSize: 14,
    color: '#555',
  },
  date: {
    marginTop: 2,
    fontSize: 13,
    color: '#888',
  },
  delivre: {
    marginTop: 4,
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalDetail: {
    fontSize: 16,
    color: '#333',
    marginVertical: 4,
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 400,
    marginVertical: 15,
    borderRadius: 10,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#003366',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});