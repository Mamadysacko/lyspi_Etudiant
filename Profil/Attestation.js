import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'; // <- AJOUT

export default function EcranCertificatAjout({ navigation }) {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [description, setDescription] = useState('');
  const [delivre, setDelivre] = useState('');
  const [dateObtention, setDateObtention] = useState('');
  const [photo, setPhoto] = useState(null);
  const [idEtudiant, setIdEtudiant] = useState(null); // <- AJOUT
  const [showForm, setShowForm] = useState(false); // <- NOUVEAU
  const fileInputRef = useRef();

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
    const fetchTypes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/types-certificats');
        setTypes(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTypes();
  }, [idEtudiant]);

  const handlePickImage = async () => {
    if (Platform.OS === 'web') {
      fileInputRef.current.click();
    } else {
      const result = await launchImageLibrary({ mediaType: 'photo' });
      if (!result.didCancel && result.assets.length > 0) {
        const img = result.assets[0];
        setPhoto({ uri: img.uri, name: img.fileName ?? 'diplome.jpg', type: img.type ?? 'image/jpeg' });
      }
    }
  };

  const handleImageSelectedWeb = (e) => {
    const file = e.target.files[0];
    if (file) setPhoto(file);
  };

  const handleSubmit = async () => {
    if (!selectedType || !description || !delivre) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    if (!idEtudiant) {
      alert("ID étudiant introuvable, veuillez réessayer plus tard.");
      return;
    }
    const formData = new FormData();
    formData.append('id_etudiant', idEtudiant);
    formData.append('id_type_cert_attes', selectedType);
    formData.append('description', description);
    formData.append('delivre', delivre);
    if (dateObtention) formData.append('date_obtention', dateObtention);
    if (photo) {
      if (Platform.OS === 'web') formData.append('diplome', photo);
      else formData.append('diplome', { uri: photo.uri, name: photo.name, type: photo.type });
    }
    try {
      const response = await axios.post('http://localhost:3000/api/certificats/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.status === 201) {
        alert('Certificat enregistré !');
        // Réinitialiser les champs après enregistrement
        setSelectedType('');
        setDescription('');
        setDelivre('');
        setDateObtention('');
        setPhoto(null);
        navigation.goBack();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setSelectedType('');
    setDescription('');
    setDelivre('');
    setDateObtention('');
    setPhoto(null);
  };

  return (
    <View style={styles.container}>
      {/* Bouton pour afficher / cacher le formulaire */}
      <TouchableOpacity
        onPress={() => {
          if (showForm) resetForm(); // Réinitialiser les champs si on masque le formulaire
          setShowForm(!showForm);
        }}
        style={styles.dropdownButton}
      >
        <Text style={styles.dropdownButtonText}>
          {showForm ? 'Masquer le formulaire ▲' : 'Afficher le formulaire ▼'}
        </Text>
      </TouchableOpacity>

      {/* Formulaire visible seulement si showForm est true */}
      {showForm && (
        <>
          <Picker
            selectedValue={selectedType}
            onValueChange={(itemValue) => setSelectedType(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Sélectionner un type" value="" />
            {types.map((type) => (
              <Picker.Item key={type.id} label={type.nom} value={type.id} />
            ))}
          </Picker>

          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <TextInput
            style={styles.input}
            placeholder="Délivré par"
            value={delivre}
            onChangeText={setDelivre}
          />
          <TextInput
            style={styles.input}
            placeholder="Date d'obtention (YYYY-MM-DD)"
            value={dateObtention}
            onChangeText={setDateObtention}
          />

          <TouchableOpacity onPress={handlePickImage} style={styles.button}>
            <Text style={styles.buttonText}>Choisir une Image Diplôme</Text>
          </TouchableOpacity>

          {photo && (
            <Image
              source={{ uri: Platform.OS === 'web' ? URL.createObjectURL(photo) : photo.uri }}
              style={styles.imagePreview}
            />
          )}
          {Platform.OS === 'web' && (
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageSelectedWeb}
            />
          )}

          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Enregistrer Certificat</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  dropdownButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  dropdownButtonText: { color: '#fff', fontSize: 16 },
  picker: { height: 50, width: '90%', marginBottom: 10 },
  input: {
    width: '90%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontSize: 16 },
  imagePreview: { width: 120, height: 120, marginTop: 10, borderRadius: 10 },
});
