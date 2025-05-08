// components/NotificationScreen.js

import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';

const notifications = [
  {
    id: '1',
    company: 'SpaceX',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/SpaceX-Logo.svg/1920px-SpaceX-Logo.svg.png',
    message: 'Vous avez reçu une nouvelle candidature pour le poste d\'Ingénieur Aérospatial.',
    date: '2025-02-20',
  },
  {
    id: '2',
    company: 'OpenAI',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1920px-OpenAI_Logo.svg.png',
    message: 'Votre demande de partenariat a été acceptée par OpenAI.',
    date: '2025-02-19',
  },
  {
    id: '3',
    company: 'Stripe',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png',
    message: 'Nouveau message dans votre messagerie.',
    date: '2025-02-18',
  },
  {
    id: '4',
    company: 'Stripe',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png',
    message: 'Le stage chez Stripe a été mis à jour.',
    date: '2025-02-17',
  },
];

const NotificationScreen = () => {
  const handleNotificationPress = (item) => {
    Alert.alert('Notification', `Vous avez sélectionné : ${item.message}`);
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity style={styles.notification} onPress={() => handleNotificationPress(item)}>
      <View style={styles.header}>
        <Image source={{ uri: item.logo }} style={styles.logo} />
        <View style={styles.headerText}>
          <Text style={styles.company}>{item.company}</Text>
          <Text style={styles.message}>{item.message}</Text>
        </View>
      </View>
      <Text style={styles.date}>{item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
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
  notification: {
    flexDirection: 'column',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerText: {
    marginLeft: 10,
  },
  company: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
});

export default NotificationScreen;
