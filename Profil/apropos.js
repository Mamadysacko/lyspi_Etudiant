import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

export default function Apropos() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Titre */}
      <Text style={styles.title}>📌 À propos de LYSPI</Text>

      {/* Informations sur l'application */}
      <Text><Text style={styles.bold}>Nom de l’application</Text>: LYSPI (Insertion des Jeunes Étudiants à la Vie Professionnelle de l’Université Nongo Conakry)</Text>
      <Text><Text style={styles.bold}>Version actuelle</Text>: 1.0.0</Text>
      <Text><Text style={styles.bold}>Développée par</Text>: Ismael Kamano & Mamady Sacko</Text>
      <Text><Text style={styles.bold}>Année de création</Text>: 2025</Text>
      <Text><Text style={styles.bold}>Contact</Text>: [Adresse e-mail]</Text>

      {/* Mission */}
      <Text style={styles.subtitle}>🧭 Notre mission</Text>
      <Text>
        LYSPI est une plateforme numérique dédiée à l’accompagnement professionnel des étudiants de l’Université Nongo Conakry, depuis leur parcours universitaire jusqu’à leur insertion sur le marché du travail.
      </Text>

      {/* Objectifs */}
      <Text style={styles.subtitle}>🎯 Objectifs</Text>
      <Text>• Centraliser l’accès aux offres de stage, d’emploi et de formation</Text>
      <Text>• Mettre en valeur les projets entrepreneuriaux étudiants</Text>
      <Text>• Offrir des recommandations personnalisées</Text>
      <Text>• Faciliter les échanges via une messagerie intégrée</Text>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Mamady Sacko & Ismael Kamano. Tous droits réservés.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#fff', // Fond blanc classique
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'orange',
  },
  bold: {
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: 'orange',
  },
  footer: {
    marginTop: 30,
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 15,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: 'orange',
    fontWeight: 'bold',
  },
});
