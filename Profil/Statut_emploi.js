import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-picker/picker'; // <-- AJOUT pour le menu déroulant

const StatutEtudiant = () => {
  const [studentStatus, setStudentStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingField, setEditingField] = useState('');
  const [newValue, setNewValue] = useState('');
  const [idEtudiant, setIdEtudiant] = useState(null);

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

  useEffect(() => {
    if (!idEtudiant) return;

    const fetchStudentStatus = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/statut_etudiantget/${idEtudiant}`);
        const data = await response.json();
        setStudentStatus(data);
      } catch (error) {
        console.error('Erreur de récupération des données :', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentStatus();
  }, [idEtudiant]);

  const handleEdit = (field, currentValue) => {
    setEditingField(field);
    setNewValue(currentValue || '');
    setModalVisible(true);
  };

  const handleSave = async () => {
    try {
      if (!idEtudiant) {
        alert('ID étudiant introuvable.');
        return;
      }

      const updatedStatus = { ...studentStatus, [editingField]: newValue };

      const response = await fetch(`http://localhost:3000/api/statut_etudiant/${idEtudiant}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStatus),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || 'Mise à jour réussie.');
        setStudentStatus(updatedStatus);
        setModalVisible(false);
      } else {
        alert(data.error || 'Erreur lors de la mise à jour.');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
      alert('Erreur lors de la mise à jour.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <ScrollView style={styles.infoContainer}>
        {[
          ['Nom de l\'entreprise', studentStatus?.nom_entreprise, () => handleEdit('nom_entreprise', studentStatus?.nom_entreprise)],
          ['Contact', studentStatus?.contact, () => handleEdit('contact', studentStatus?.contact)],
          ['Poste', studentStatus?.poste, () => handleEdit('poste', studentStatus?.poste)],
          ['Durée d\'emploi', studentStatus?.duree_emploi, () => handleEdit('duree_emploi', studentStatus?.duree_emploi)],
          ['Etat d\'emploi', studentStatus?.type_emploi, () => handleEdit('type_emploi', studentStatus?.type_emploi)],
        ].map(([label, value, onEdit], idx) => (
          <InfoRow key={idx} label={label} value={value || 'Non renseigné'} onEdit={onEdit} />
        ))}
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Modifier {editingField}</Text>

            {editingField === 'type_emploi' ? (
              <Picker
                selectedValue={newValue}
                onValueChange={(itemValue) => setNewValue(itemValue)}
                style={styles.input}
              >
                <Picker.Item label="Sélectionner un etat" value="" />
                <Picker.Item label="Employé" value="employé" />
                <Picker.Item label="Stagiaire" value="stagiaire" />
                <Picker.Item label="Stagiaire" value="chomage" />
              </Picker>
            ) : (
              <TextInput
                style={styles.input}
                value={newValue}
                onChangeText={setNewValue}
                placeholder="Entrer une nouvelle valeur"
              />
            )}

            <View style={styles.modalButtons}>
              <Button title="Annuler" onPress={() => setModalVisible(false)} />
              <Button title="Sauvegarder" onPress={handleSave} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const InfoRow = ({ label, value, onEdit }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label} :</Text>
    <View style={styles.valueContainer}>
      <Text style={styles.value}>{value}</Text>
      <TouchableOpacity onPress={onEdit}>
        <MaterialIcons name="edit" size={20} color="#007bff" style={{ marginLeft: 8 }} />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    alignSelf: 'center',
  },
  infoContainer: {
    marginTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
    paddingBottom: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    width: '45%',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  value: {
    fontSize: 14,
    color: '#444',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#777',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000055',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
    borderRadius: 8,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default StatutEtudiant;
