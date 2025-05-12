// screens/FormationDetailsScreen.js

import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const FormationDetailsScreen = ({ route }) => {
  const { formation, entreprise } = route.params;

  return (
    <ScrollView style={styles.container}>
      {formation.image_url && (
        <Image source={{ uri: formation.image_url }} style={styles.image} />
      )}
      <Text style={styles.title}>{formation.titre}</Text>
      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.text}>{formation.description}</Text>

      <Text style={styles.sectionTitle}>Détails Formation</Text>
      <Text style={styles.text}>Localisation : {formation.localisation}</Text>
      <Text style={styles.text}>Début : {formation.date_debut}</Text>
      <Text style={styles.text}>Fin : {formation.date_fin}</Text>
      <Text style={styles.text}>Prérequis : {formation.prerequis}</Text>
      <Text style={styles.text}>Contact : {formation.email_contact}</Text>

      <Text style={styles.sectionTitle}>Entreprise</Text>
      {entreprise.logo_url && (
        <Image source={{ uri: entreprise.logo_url }} style={styles.logo} />
      )}
      <Text style={styles.text}>Nom : {entreprise.nom_entreprise}</Text>
      <Text style={styles.text}>Utilisateur : {entreprise.nom_complet_user}</Text>
      <Text style={styles.text}>Sigle : {entreprise.sigle}</Text>
      <Text style={styles.text}>Email : {entreprise.mail}</Text>
      <Text style={styles.text}>Téléphone : {entreprise.tel}</Text>
      <Text style={styles.text}>Site web : {entreprise.site_web}</Text>
      <Text style={styles.text}>Domaine : {entreprise.domaine_intervention}</Text>
      <Text style={styles.text}>Type : {entreprise.type_entreprise}</Text>
      <Text style={styles.text}>Secteur géographique : {entreprise.secteur_geographique}</Text>
      <Text style={styles.text}>Domaine entreprise : {entreprise.domaine_entreprise}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 15 },
  text: { fontSize: 16, marginVertical: 2 },
  image: { width: '100%', height: 200, borderRadius: 10, marginBottom: 10 },
  logo: { width: 80, height: 80, borderRadius: 40, marginVertical: 10 },
});

export default FormationDetailsScreen;
