// components/InternshipScreen.js

import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons'; // Icônes interactifs

const internshipOffers = [
  {
    id: '1',
    title: 'Stagiaire en Ingénierie Aérospatiale',
    company: 'SpaceX',
    location: 'Hawthorne, CA',
    description: 'Assister l’équipe d’ingénierie dans la conception et l’analyse des systèmes de propulsion.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/SpaceX-Logo.svg/1920px-SpaceX-Logo.svg.png',
    image: 'https://www.spacex.com/static/images/share.jpg',
  },
  {
    id: '2',
    title: 'Stagiaire en Développement Logiciel',
    company: 'Stripe',
    location: 'San Francisco, CA',
    description: 'Travailler sur des projets de développement de solutions de paiement en ligne.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png',
    image: 'https://stripe.com/img/v3/home/twitter.png',
  },
  {
    id: '3',
    title: 'Stagiaire en Recherche IA',
    company: 'OpenAI',
    location: 'San Francisco, CA',
    description: 'Participer à la recherche et au développement d’algorithmes d’intelligence artificielle.',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1920px-OpenAI_Logo.svg.png',
    image: 'https://openai.com/content/images/2023/01/chatgpt-share.jpg',
  },
];

const InternshipScreen = () => {
  const renderInternshipOffer = ({ item }) => (
    <Card style={styles.card}>
      {/* En-tête : Logo + Nom + Secteur */}
      <View style={styles.header}>
        <Image source={{ uri: item.logo }} style={styles.logo} />
        <View style={styles.headerText}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.company}>{item.company}</Text>
          <Text style={styles.location}>{item.location}</Text>
        </View>
      </View>

      {/* Description */}
      <Text style={styles.description}>{item.description}</Text>

      {/* Image principale */}
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />

      {/* Boutons d'interaction */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome name="heart" size={24} color="red" />
          <Text style={styles.actionText}>Like</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome name="comment" size={24} color="blue" />
          <Text style={styles.actionText}>Commentaire</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.applyButton}>
          <FontAwesome name="check-square-o" size={24} color="green" />
          <Text style={styles.applyText}>Postuler</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <FlatList
      data={internshipOffers}
      renderItem={renderInternshipOffer}
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
  location: {
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
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default InternshipScreen;
