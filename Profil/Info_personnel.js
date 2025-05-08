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
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;



const Info_personnel = () => {
  const [showMore, setShowMore] = useState(false);
  const [studentInfo, setStudentInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingField, setEditingField] = useState('');
  const [newValue, setNewValue] = useState('');

  useEffect(() => {
    const fetchStudentInfo = async () => {
      try {
        const studentId = await AsyncStorage.getItem('id_etudiant');
        if (!studentId) throw new Error('ID étudiant non trouvé');

        const response = await fetch(`http://localhost:3000/api/etudiant_info/${studentId}`);
        const data = await response.json();
        setStudentInfo(data);
      } catch (error) {
        console.error('Erreur de récupération des données:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentInfo();
  }, []);

  const handleEdit = (field, currentValue) => {
    setEditingField(field);
    setNewValue(currentValue || '');
    setModalVisible(true);
  };

  const handleSave = async () => {
    try {
      const studentId = await AsyncStorage.getItem('id_etudiant');
      if (!studentId) {
        alert('ID étudiant introuvable.');
        return;
      }

      const body = {};
      if (editingField === 'tel') body.tel = newValue;
      if (editingField === 'email') body.email = newValue;
      if (editingField === 'commune') body.commune = newValue;
      if (editingField === 'quartier') body.quartier = newValue;

      const response = await fetch(`http://localhost:3000/api/etudiant_infomodif/${studentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || 'Mise à jour réussie.');
        setStudentInfo((prev) => ({
          ...prev,
          [editingField]: newValue,
        }));
        setModalVisible(false);
      } else {
        alert(data.message || 'Erreur lors de la mise à jour.');
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

  if (!studentInfo?.nom) {
    return <Text style={styles.errorText}>Impossible de charger les données</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowMore(!showMore)} style={styles.header}>
        <Text style={styles.toggleArrow}>{showMore ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {showMore && (
        <ScrollView style={styles.infoContainer}>
          {[
            ['Matricule', studentInfo?.matricule],
            ['Nom', studentInfo?.nom],
            ['Prénom', studentInfo?.prenom],
            ['Sexe', studentInfo?.sexe],
            ['Date de naissance', studentInfo?.date_naissance],
            ['Lieu de naissance', studentInfo?.lieu_naissance],
            ['Nom du père', studentInfo?.nom_pere],
            ['Nom de la mère', studentInfo?.nom_mere],
            ['Nationalité', studentInfo?.nationalite],
            ['Situation matrimoniale', studentInfo?.situation_matrimoniale],
            ['Date d\'inscription', studentInfo?.date_inscription],
            ['Département', studentInfo?.departement],
            ['Licence', studentInfo?.licence],
            ['Téléphone', studentInfo?.tel || 'Non renseigné', () => handleEdit('tel', studentInfo?.tel)],
            ['Email', studentInfo?.email || 'Non renseigné', () => handleEdit('email', studentInfo?.email)],
            ['Commune', studentInfo?.adresse || 'Non renseignée', () => handleEdit('commune', studentInfo?.adresse)],
            ['Quartier', studentInfo?.quartier || 'Non renseigné', () => handleEdit('quartier', studentInfo?.quartier)],
          ].map(([label, value, onEdit], idx) => (
            <InfoRow key={idx} label={label} value={value} onEdit={onEdit} />
          ))}
        </ScrollView>
      )}

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Modifier {editingField}</Text>
            <TextInput
              style={styles.input}
              value={newValue}
              onChangeText={setNewValue}
              placeholder="Entrer une nouvelle valeur"
            />
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
    <Text style={styles.label} numberOfLines={1} ellipsizeMode="tail">
      {label} :
    </Text>
    <View style={styles.valueContainer}>
      <Text style={styles.value} numberOfLines={2} ellipsizeMode="tail">
        {value}
      </Text>
      {onEdit && (
        <TouchableOpacity onPress={onEdit}>
          <MaterialIcons name="edit" size={20} color="#007bff" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      )}
    </View>
  </View>
);


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: screenWidth < 400 ? 8 : 12,
margintop: 10,
    borderRadius: 10,
    elevation: 2,
    width: '95%',
    alignSelf: 'center',
    maxWidth: 600,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
  },
  title: {
    fontSize: screenWidth < 400 ? 16 : 18,
    fontWeight: '600',
    color: '#222',
  },
  toggleArrow: {
    fontSize: screenWidth < 400 ? 16 : 18,
    color: '#666',
  },
  infoContainer: {
    marginTop: 15,
    maxHeight: screenHeight * 0.5, // ajuste dynamiquement à la hauteur de l'écran
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: '#eee',
    paddingBottom: 6,
    flexWrap: 'wrap', // pour éviter l'overflow sur petit écran
  },
  label: {
    fontSize: screenWidth < 400 ? 11 : 12,
    fontWeight: '500',
    color: '#333',
    width: '40%',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '58%',
    flexWrap: 'wrap', // pour éviter que les valeurs ne débordent
  },
  value: {
    fontSize: screenWidth < 400 ? 11 : 12,
    color: '#444',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: screenWidth < 400 ? 14 : 16,
    color: '#888',
    textAlign: 'center',
  },
  errorText: {
    padding: 20,
    textAlign: 'center',
    fontSize: screenWidth < 400 ? 14 : 16,
    color: '#888',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000055',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: screenWidth * 0.9,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: screenWidth < 400 ? 16 : 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: screenWidth < 400 ? 8 : 10,
    fontSize: screenWidth < 400 ? 14 : 16,
    borderRadius: 6,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default Info_personnel;