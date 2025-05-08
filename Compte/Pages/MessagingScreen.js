// components/MessagingScreen.js

import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

const contacts = [
  {
    id: '1',
    name: 'SpaceX',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/SpaceX-Logo.svg/1920px-SpaceX-Logo.svg.png',
  },
  {
    id: '2',
    name: 'Stripe',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png',
  },
  {
    id: '3',
    name: 'OpenAI',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1920px-OpenAI_Logo.svg.png',
  },
];

const MessagingScreen = () => {
  const renderContact = ({ item }) => (
    <TouchableOpacity style={styles.contact}>
      <Image source={{ uri: item.logo }} style={styles.logo} />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Messagerie</Text>
      <FlatList
        data={contacts}
        renderItem={renderContact}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6F00',
    padding: 10,
  },
  contact: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  name: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default MessagingScreen;
