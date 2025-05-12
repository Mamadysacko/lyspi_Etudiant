import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';

export default function StageScreenDetail({ route }) {
  const { offre, entreprise } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo entreprise */}
      {entreprise.logo_url && (
        <Image source={{ uri: entreprise.logo_url }} style={styles.logo} />
      )}

      {/* Image de la publication */}
      {/* Nom entreprise */}
      <Text style={styles.entreprise}>{entreprise.nom_entreprise}</Text>
      <Text style={styles.sigle}>{entreprise.sigle}</Text>

      {/* Poste */}
      <Text style={styles.sectionTitle}>Poste :</Text>
      <Text style={styles.text}>{offre.poste}</Text>

      {/* Description */}
      <Text style={styles.sectionTitle}>Description :</Text>
      <Text style={styles.text}>{offre.description}</Text>

      {/* Compétences */}
      <Text style={styles.sectionTitle}>Compétences requises :</Text>
      <Text style={styles.text}>{offre.competences}</Text>

      {/* Dates */}
      <Text style={styles.sectionTitle}>Date de début :</Text>
      <Text style={styles.text}>{offre.date_debut}</Text>

      <Text style={styles.sectionTitle}>Date limite :</Text>
      <Text style={styles.text}>{offre.date_limite}</Text>

      {/* Contact */}
      <Text style={styles.sectionTitle}>Contact :</Text>
      <Text style={styles.text}>{offre.contact}</Text>

      {/* Tags */}
      <Text style={styles.sectionTitle}>Tags :</Text>
      <Text style={styles.text}>{offre.tags}</Text>

      {/* Fichier joint */}
   {offre.fichier_url &&(
        <Image source={{ uri: offre.fichier_url }} style={styles.offreImage} />
      )}
      {/* Type d'offre */}
      <Text style={styles.sectionTitle}>Type d'offre :</Text>
      <Text style={styles.text}>{offre.type_offre}</Text>

      <View style={styles.separator} />

      {/* Info entreprise complète */}
      <Text style={styles.sectionTitle}>À propos de l'entreprise</Text>

      <Text style={styles.subTitle}>Nom complet du responsable :</Text>
      <Text style={styles.text}>{entreprise.nom_complet_user}</Text>

      <Text style={styles.subTitle}>Description :</Text>
      <Text style={styles.text}>{entreprise.description}</Text>

      <Text style={styles.subTitle}>Email :</Text>
      <Text style={styles.text}>{entreprise.mail}</Text>

      <Text style={styles.subTitle}>Téléphone :</Text>
      <Text style={styles.text}>{entreprise.tel}</Text>

      {entreprise.site_web && (
        <>
          <Text style={styles.subTitle}>Site web :</Text>
          <TouchableOpacity onPress={() => Linking.openURL(entreprise.site_web)}>
            <Text style={styles.link}>{entreprise.site_web}</Text>
          </TouchableOpacity>
        </>
      )}

      <Text style={styles.subTitle}>Domaine d'intervention :</Text>
      <Text style={styles.text}>{entreprise.domaine_intervention}</Text>

      <Text style={styles.subTitle}>Type d'entreprise :</Text>
      <Text style={styles.text}>{entreprise.type_entreprise}</Text>

      <Text style={styles.subTitle}>Secteur géographique :</Text>
      <Text style={styles.text}>{entreprise.secteur_geographique}</Text>

      <Text style={styles.subTitle}>Domaine de l'entreprise :</Text>
      <Text style={styles.text}>{entreprise.domaine_entreprise}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 50,
    backgroundColor: '#fff',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 16,
  },
  offreImage: {
    width: '100%',
    aspectRatio: 16 / 9, // Maintains aspect ratio for responsiveness
    resizeMode: 'cover',
    marginBottom: 16,
  },
  entreprise: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sigle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 12,
    color: '#222',
  },
  subTitle: {
    marginTop: 10,
    fontWeight: '600',
    color: '#333',
  },
  text: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
  },
  link: {
    color: '#1e90ff',
    textDecorationLine: 'underline',
    marginTop: 4,
  },
  separator: {
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
