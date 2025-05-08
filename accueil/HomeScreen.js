import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

// Import des écrans
import startup_screen from '../startup/startup_screen';
import ProfileScreen from '../Profil/Profile_Screen';
import OffersScreen from '../offre/OffersScreen';

import InternshipScreen from '../Compte/Pages/InternshipScreen';
import NotificationScreen from '../Compte/Pages/NotificationScreen';
import MessagingScreen from '../Compte/Pages/MessagingScreen';
import WorkshopScreen from '../Compte/Pages/WorkshopScreen'; // Assurez-vous que le chemin d'importation est correct
import ApplyScreen from './../Compte/Pages/ApplyScreen';

// Fonction pour personnaliser l'entête
const getHeaderOptions = (title, isMainScreen = false) => ({
  headerShown: true,
  title: title,
  headerStyle: {
    backgroundColor: 'rgba(217, 131, 26, 0.8)',
  },
  headerRight: () => (
    <View style={styles.imageContainer}>
      <Image
        source={require('../assets/icone unc.jpg')}
        style={styles.headerImage}
      />
    </View>
  ),
  headerTitleStyle: {
    color: '#fff',
    fontSize: isMainScreen ? 27 : 20,
    fontWeight: isMainScreen ? 'bold' : 'normal',
  },
});

// Écran d'accueil avec bouton vers Profil et Messagerie
const HomeScreen = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 18, marginBottom: 20 }}>Bienvenue sur la page d'accueil</Text>
    <TouchableOpacity onPress={() => navigation.navigate('Profil')}>
      <Text style={styles.link}>Aller au profil</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Messagerie')}>
      <Text style={styles.link}>Aller à la messagerie</Text>
    </TouchableOpacity>
  </View>
);

// Stack principal
const Stack = createStackNavigator();
const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="AccueilPrincipal"
      component={HomeScreen}
      options={getHeaderOptions('LYSPI', true)}
    />
    <Stack.Screen
      name="Profil"
      component={ProfileScreen}
      options={getHeaderOptions('Profil')}
    />
    <Stack.Screen
      name="Messagerie"
      component={MessagingScreen}
      options={getHeaderOptions('Messagerie')}
    />
  </Stack.Navigator>
);

// Onglets du bas
const BottomTab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: styles.tabBarStyle,
          tabBarActiveTintColor: '#FF6F00',
          tabBarInactiveTintColor: '#007BFF',
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarIcon: ({ color }) => {
            let iconName;
            switch (route.name) {
              case 'Accueil':
                iconName = 'home';
                break;
              case 'Emploi':
                iconName = 'work';
                break;
              case 'Stage':
                iconName = 'school';
                break;
              case 'Notifications':
                iconName = 'notifications';
                break;
              case 'Startup':
                iconName = 'business';
                break;
              case 'Atelier':
                iconName = 'build';
                break;
              default:
                iconName = 'help';
            }
            return <MaterialIcons name={iconName} size={24} color={color} />;
          },
        })}
      >
        <BottomTab.Screen 
          name="Accueil" 
          component={MainStack} 
          options={{ headerShown: true }} // Activez l'en-tête ici
        />
        <BottomTab.Screen 
          name="Emploi" 
          component={OffersScreen} 
          options={getHeaderOptions('Offres d\'emploi')} 
        />
        <BottomTab.Screen 
          name="Stage" 
          component={InternshipScreen} 
          options={getHeaderOptions('Stages')} 
        />
        <BottomTab.Screen 
          name="Notifications" 
          component={NotificationScreen} 
          options={getHeaderOptions('Notifications')} 
        />
        <BottomTab.Screen 
          name="Startup" 
          component={startup_screen} 
          options={getHeaderOptions('Startup')} 
        />
        <BottomTab.Screen 
          name="Atelier" 
          component={WorkshopScreen} 
          options={getHeaderOptions('Ateliers')} 
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginRight: 10,
  },
  headerImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  link: {
    color: '#007BFF',
    fontSize: 16,
    marginVertical: 8,
  },
});
