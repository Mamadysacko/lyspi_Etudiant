// components/WorkshopScreen.js

import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons'; // Icônes interactives

const workshops = [
  {
    id: '1',
    title: 'Atelier de Développement Web',
    company: 'Tech Academy',
    description: 'Apprenez les bases du développement web en 4 semaines avec des experts du secteur.',
    logo: 'https://example.com/logo_tech_academy.png', // Remplace par l'URL de l'image
    image: 'https://example.com/workshop_image_1.jpg', // Remplace par l'URL de l'image
  },
  {
    id: '2',
    title: 'Atelier d\'Intelligence Artificielle',
    company: 'AI Institute',
    description: 'Découvrez les concepts fondamentaux de l\'IA et comment les appliquer dans des projets réels.',
    logo: 'https://example.com/logo_ai_institute.png', // Remplace par l'URL de l'image
    image: 'https://example.com/workshop_image_2.jpg', // Remplace par l'URL de l'image
  },
  {
    id: '3',
    title: 'Atelier de Design UX/UI',
    company: 'Design School',
    description: 'Apprenez à concevoir des interfaces utilisateur intuitives et attrayantes.',
    logo: 'https://example.com/logo_design_school.png', // Remplace par l'URL de l'image
    image: 'https://example.com/workshop_image_3.jpg', // Remplace par l'URL de l'image
  },
];

const WorkshopScreen = () => {
  const renderWorkshop = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: item.logo }} style={styles.logo} />
        <View style={styles.headerText}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.company}>{item.company}</Text>
        </View>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      <TouchableOpacity style={styles.applyButton}>
        <FontAwesome name="check-square-o" size={24} color="green" />
        <Text style={styles.applyText}>S'inscrire</Text>
      </TouchableOpacity>
    </Card>
  );

  return (
    <FlatList
      data={workshops}
      renderItem={renderWorkshop}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerText: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 14,
    color: 'gray',
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  applyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
  },
  applyText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
   color:'green'
   },
});

export default WorkshopScreen;
