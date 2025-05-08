import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EcranStartupAjout({ onRefresh }) {
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [startupName, setStartupName] = useState('');
  const [website, setWebsite] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [description, setDescription] = useState('');
  const [problematic, setProblematic] = useState('');
  const [solution, setSolution] = useState('');
  const [file, setFile] = useState(null);
  const [idEtudiant, setIdEtudiant] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
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

    const fetchDomains = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/domaines');
        setDomains(response.data);
      } catch (error) {
        console.error('Erreur récupération des domaines :', error);
      }
    };

    fetchIdEtudiant();
    fetchDomains();
  }, []);

  const handlePickFile = async () => {
    if (Platform.OS === 'web') {
      fileInputRef.current.click();
    } else {
      const result = await launchImageLibrary({ mediaType: 'photo' });
      if (!result.didCancel && result.assets.length > 0) {
        const img = result.assets[0];
        setFile({ uri: img.uri, name: img.fileName ?? 'startup.jpg', type: img.type ?? 'image/jpeg' });
      }
    }
  };

  const handleFileSelectedWeb = (e) => {
    const file = e.target.files[0];
    if (file) setFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedDomain || !startupName || !description || !problematic || !solution || !idEtudiant) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const formData = new FormData();
    formData.append('id_domaine', selectedDomain);
    formData.append('nom', startupName);
    formData.append('site_web', website);
    formData.append('date_creation', creationDate);
    formData.append('description', description);
    formData.append('problematique', problematic);
    formData.append('solution', solution);
    formData.append('id_etudiant', idEtudiant);
    if (file) {
      if (Platform.OS === 'web') formData.append('fichier', file);
      else formData.append('fichier', { uri: file.uri, name: file.name, type: file.type });
    }

    try {
      const response = await axios.post('http://localhost:3000/api/startups/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.status === 201) {
        alert('Startup enregistrée !');
        setSelectedDomain('');
        setStartupName('');
        setWebsite('');
        setCreationDate('');
        setDescription('');
        setProblematic('');
        setSolution('');
        setFile(null);

        // Actualiser les données après l'enregistrement
        if (onRefresh) {
          onRefresh();
        }
      }
    } catch (err) {
      console.error(err);
      alert('Erreur serveur');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setFormVisible(!formVisible)} style={styles.toggleButton}>
          <Text style={styles.toggleButtonText}>{formVisible ? 'Fermer le formulaire' : 'Créer une Startup'}</Text>
        </TouchableOpacity>

        {formVisible && (
          <View style={styles.formContainer}>
            <Text style={styles.title}>Ajouter une Startup</Text>

            <Picker
              selectedValue={selectedDomain}
              onValueChange={(itemValue) => setSelectedDomain(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Sélectionner un domaine" value="" />
              {domains.map((domain) => (
                <Picker.Item key={domain.id} label={domain.nom} value={domain.id} />
              ))}
            </Picker>

            <TextInput
              style={styles.input}
              placeholder="Nom de la startup"
              value={startupName}
              onChangeText={setStartupName}
            />
            <TextInput
              style={styles.input}
              placeholder="Site Web (URL)"
              value={website}
              onChangeText={setWebsite}
            />
            <TextInput
              style={styles.input}
              placeholder="Date de création (YYYY-MM-DD)"
              value={creationDate}
              onChangeText={setCreationDate}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              multiline
            />
            <TextInput
              style={styles.input}
              placeholder="Problématique"
              value={problematic}
              onChangeText={setProblematic}
              multiline
            />
            <TextInput
              style={styles.input}
              placeholder="Solution"
              value={solution}
              onChangeText={setSolution}
              multiline
            />

            <TouchableOpacity onPress={handlePickFile} style={styles.fileButton}>
              <Text style={styles.fileButtonText}>Choisir un fichier (Image, PDF, etc.)</Text>
            </TouchableOpacity>

            {file && (
              <Text style={styles.fileName}>{file.name}</Text>
            )}
            {Platform.OS === 'web' && (
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*, .pdf"
                style={{ display: 'none' }}
                onChange={handleFileSelectedWeb}
              />
            )}

            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Enregistrer Startup</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20 },
  formContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  input: {
    width: '100%',
    padding: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  toggleButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  fileButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
  },
  fileButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  fileName: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});