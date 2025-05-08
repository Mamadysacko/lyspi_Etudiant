import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://localhost:3000'; // Ton API ici

const Profil_photo = () => {
  const [idEtudiant, setIdEtudiant] = useState(null);
  const [profil, setProfil] = useState('');
  const [couverture, setCouverture] = useState('');
  const [etudiantInfo, setEtudiantInfo] = useState(null); // Nouvel état pour les infos étudiant

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
    chargerImages();
    chargerInfosEtudiant(); // Charger les infos dès qu'on a l'id
  }, [idEtudiant]);

  const chargerImages = () => {
    axios.get(`${BASE_URL}/api/etudiant/photo/${idEtudiant}`)
      .then(res => {
        if (res.data.photo_profil) {
          setProfil(BASE_URL + res.data.photo_profil + `?${Date.now()}`);
        }
        if (res.data.photo_couverture) {
          setCouverture(BASE_URL + res.data.photo_couverture + `?${Date.now()}`);
        }
      })
      .catch(err => console.error('Erreur chargement images:', err));
  };

  const chargerInfosEtudiant = () => {
    axios.get(`${BASE_URL}/api/etudiant_info_nom/${idEtudiant}`)
      .then(res => {
        setEtudiantInfo(res.data);
      })
      .catch(err => {
        console.error("Erreur récupération des infos étudiant :", err);
      });
  };

  const handleUpload = async (type, file) => {
    if (!idEtudiant || !file) return;

    const formData = new FormData();
    formData.append(type, file);

    try {
      await axios.put(`${BASE_URL}/api/etudiant/photo/${idEtudiant}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      chargerImages();
    } catch (err) {
      console.error(err);
      alert('Erreur lors du téléversement');
    }
  };

  return (
    <div style={{
      maxWidth: 800,
      margin: 'auto',
      fontFamily: 'Arial, sans-serif',
      border: '1px solid #ccc',
      borderRadius: 8,
      overflow: 'hidden',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{ position: 'relative' }}>
        <img
          src={couverture}
          alt="Couverture"
          style={{
            width: '100%',        // Fixe la largeur à 100% du conteneur
            height: 250, // Limite la hauteur maximale à 250px
            objectFit: 'cover', // Maintient le ratio de l'image
            display: 'block',   // Évite les marges indésirables
            margin: '0 auto'    // Centre l'image horizontalement
          }}
        />
        <label style={{
          position: 'absolute',
          top: 10,
          right: 10,
          backgroundColor: '#ffffffcc',
          padding: '6px 10px',
          borderRadius: 6,
          cursor: 'pointer',
          fontSize: 14,
          fontWeight: 'bold'
        }}>
          Modifier la couverture
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              handleUpload('photo_couverture', file);
            }}
            style={{ display: 'none' }}
          />
        </label>

        <div style={{
          position: 'absolute',
          bottom: -50,
          left: 30,
          width: 120,
          height: 120,
          borderRadius: '35%',
          overflow: 'hidden',
          border: '4px solid white',
          boxShadow: '0 0 5px rgba(0,0,0,0.3)',
          backgroundColor: '#eee'
        }}>
          <img
            src={profil}
            alt="Profil"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          <label style={{
            position: 'absolute',
            bottom: 5,
            right: 4,
            width: 30,
            height: 30,
            backgroundColor: 'rgba(0,0,0,0.6)',
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.8)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)'}
          >
            📷
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                handleUpload('photo_profil', file);
              }}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </div>

      <div style={{ padding: '40px 20px 20px 20px', textAlign: 'center' }}>
        {etudiantInfo ? (
          <>
            <h2>{etudiantInfo.nom} {etudiantInfo.prenom}</h2>
            <p>Matricule : {etudiantInfo.matricule}</p>
          </>
        ) : (
          <p>Chargement des informations de l'étudiant...</p>
        )}
      </div>
    </div>
  );
};

export default Profil_photo;
