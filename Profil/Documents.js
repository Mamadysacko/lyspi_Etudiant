import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FaFileAlt, FaFileUpload, FaEye, FaTimes } from 'react-icons/fa';

const BASE_URL = 'http://localhost:3000'; // Remplacez par l'URL de votre API

const DocumentUpload = () => {
  const [idEtudiant, setIdEtudiant] = useState(null);
  const [documents, setDocuments] = useState({});
  const [preview, setPreview] = useState({ show: false, url: '', title: '' });

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
    chargerDocuments();
  }, [idEtudiant]);

  const chargerDocuments = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/etudiant/documents/${idEtudiant}`);
      setDocuments(res.data);
    } catch (error) {
      console.error('Erreur chargement des documents :', error);
    }
  };

  const handleUpload = async (type, file) => {
    if (!idEtudiant || !file) return;

    const formData = new FormData();
    formData.append(type, file);

    try {
      await axios.put(`${BASE_URL}/api/etudiant/documents_put/${idEtudiant}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      chargerDocuments();
    } catch (err) {
      console.error(err);
      alert('Erreur lors du téléversement');
    }
  };

  const handlePreview = (url, title) => {
    setPreview({ show: true, url: `${BASE_URL}${url}`, title });
  };

  const closePreview = () => {
    setPreview({ show: false, url: '', title: '' });
  };

  const renderUploadField = (label, field) => (
    <div key={field} style={styles.uploadField}>
      <div style={styles.fieldInfo}>
        <FaFileAlt size={24} color="#4A90E2" />
        <div>
          <div style={{ fontWeight: 'bold', fontSize: 16 }}>{label}</div>
          {documents[field] && (
            <span style={{ fontSize: 13, color: '#666' }}>
              Fichier existant
            </span>
          )}
        </div>
      </div>

      <div style={styles.buttonGroup}>
        {documents[field] && (
          <button onClick={() => handlePreview(documents[field], label)} style={styles.previewButton}>
            <FaEye />
            Aperçu
          </button>
        )}

        <label style={styles.uploadLabel}>
          <FaFileUpload />
          <span>Téléverser</span>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.gif"
            onChange={(e) => handleUpload(field, e.target.files[0])}
            style={{ display: 'none' }}
          />
        </label>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>

      <div style={styles.uploadGrid}>
        {renderUploadField('Diplôme Baccalauréat', 'dipl_baccalaureat')}
        {renderUploadField('Extrait de Naissance', 'extrait_naissance')}
        {renderUploadField('Relevé de Notes', 'releve_notes')}
        {renderUploadField('Diplôme Licence', 'dipl_licence')}
        {renderUploadField('Diplôme Master', 'dipl_master')}
      </div>

      {preview.show && (
        <div style={styles.previewOverlay}>
          <div style={styles.previewBox}>
            <button onClick={closePreview} style={styles.closeButton}>
              <FaTimes />
            </button>
            <h3 style={{ marginTop: 0 }}>{preview.title}</h3>
            <img
              src={preview.url}
              alt={preview.title}
              style={styles.previewImage}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/400x400?text=Image+non+disponible';
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 900,
   
   
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f6f8',
    borderRadius: 12,
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  uploadGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 20,
  },
  uploadField: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    border: '1px solid #ddd',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    boxSizing: 'border-box',
  },
  fieldInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  buttonGroup: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
  },
  previewButton: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '8px 14px',
    borderRadius: 6,
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  uploadLabel: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '8px 14px',
    borderRadius: 6,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  previewOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent
    display: 'flex',
    alignItems: 'center', // Centrer verticalement
    justifyContent: 'center', // Centrer horizontalement
    zIndex: 1000, // Assure que l'aperçu est au-dessus des autres éléments
  },
  previewBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    maxWidth: '90vw', // Largeur dynamique
    maxHeight: '90vh', // Hauteur dynamique pour s'adapter à l'écran
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // Empêche le débordement
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
  previewImage: {
    maxWidth: '100%',
    maxHeight: '100%', // S'assure que l'image reste dans la boîte
    display: 'block',
    margin: '0 auto',
  },
};

export default DocumentUpload;
