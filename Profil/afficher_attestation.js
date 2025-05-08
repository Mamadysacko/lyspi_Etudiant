import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Assure-toi que ce package est installé

const CertificationsList = () => {
  const [idEtudiant, setIdEtudiant] = useState(null);
  const [certifications, setCertifications] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

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

    const fetchCertifications = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/cert-attes/etudiant/${idEtudiant}`);
        setCertifications(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des certificats", error);
      }
    };

    fetchCertifications();
  }, [idEtudiant]);

  const openModal = (cert) => {
    setSelectedCert(cert);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedCert(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mes Certifications</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications.map((cert) => (
          <div key={cert.id} className="border rounded-xl p-4 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">{cert.type_certificat}</h2>
            <p className="text-gray-600 mb-2">{cert.description}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => openModal(cert)}
            >
              Voir
            </button>
          </div>
        ))}
      </div>

      {isOpen && selectedCert && (
        <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
              <Dialog.Title className="text-lg font-bold">{selectedCert.type_certificat}</Dialog.Title>
              <div className="mt-4 space-y-2">
                <p><strong>Description :</strong> {selectedCert.description}</p>
                <p><strong>Date d'obtention :</strong> {new Date(selectedCert.date_obtention).toLocaleDateString()}</p>
                <p><strong>Délivré par :</strong> {selectedCert.delivre}</p>

                {selectedCert.diplome_url && (
                  <img
                    src={selectedCert.diplome_url}
                    alt="Diplôme"
                    className="mt-4 w-full h-auto rounded"
                  />
                )}
              </div>

              <button
                className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
                onClick={closeModal}
              >
                Fermer
              </button>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default CertificationsList;
