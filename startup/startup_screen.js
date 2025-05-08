import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import Afficher from './Afficher'; // Correction du nom du fichier
import EnvoiStartup from './envoi_stratup'; // Correction du nom du fichier

const StartupScreen = () => {
  const [refreshKey, setRefreshKey] = useState(0); // Utilisé pour forcer le rafraîchissement

  // Fonction pour actualiser les startups
  const fetchStartups = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Change la clé pour forcer le rafraîchissement
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Formulaire d'envoi */}
        <EnvoiStartup onRefresh={fetchStartups} />

        {/* Section d'affichage */}
        <Section title="Liste des Startups">
          <Afficher key={refreshKey} /> {/* Utilisation de la clé pour forcer le rafraîchissement */}
        </Section>
      </ScrollView>
    </View>
  );
};

// Composant Section pour éviter la répétition
const Section = ({ title, children }) => (
  <View style={styles.block}>
    <Text style={styles.blockTitle}>{title}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flexGrow: 1,
    padding: 10,
  },
  block: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  blockTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
});

export default StartupScreen;