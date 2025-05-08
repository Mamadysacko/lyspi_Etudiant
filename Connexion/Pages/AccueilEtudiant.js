import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';

// Importation des écrans de l'application (assurez-vous que ces fichiers existent)
import HomeScreen from '../../accueil/HomeScreen';
import ProfileScreen from '../../Profil/Profile_Screen';
import MessagingScreen from '../../Compte/Pages/MessagingScreen';
import OffersScreen from '../../offre/OffersScreen';
import InternshipScreen from '../../Compte/Pages/InternshipScreen';
import NotificationScreen from '../../Compte/Pages/NotificationScreen';
import startup_screen from '../../startup/startup_screen';
import WorkshopScreen from '../../Compte/Pages/WorkshopScreen';

// Création des navigateurs
const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Composant de la barre supérieure avec les boutons "Profil" et "Messagerie"
const TopBar = ({ navigation }) => (
  <View style={styles.topBarContainer}>
    <TouchableOpacity onPress={() => navigation.navigate('Profil')} style={styles.tab}>
      <MaterialIcons name="person" size={24} color="#007BFF" />
      <Text style={styles.tabText}>Profil</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Messagerie')} style={styles.tab}>
      <MaterialIcons name="message" size={24} color="#007BFF" />
      <Text style={styles.tabText}>Messagerie</Text>
    </TouchableOpacity>
  </View>
);

// StackNavigator pour l'écran d'accueil avec la barre supérieure
const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="TopBar" component={TopBar} />
    <Stack.Screen name="Accueil" component={HomeScreen} options={{ headerShown: false }}  />
    <Stack.Screen name="Profil" component={ProfileScreen} />
    <Stack.Screen name="Messagerie" component={MessagingScreen} />
  </Stack.Navigator>
);

// BottomTabNavigator pour gérer la navigation entre les différents écrans
const AppTabs = () => (
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
    <BottomTab.Screen name="Accueil" component={MainStack} options={{ headerShown: true }} />
    <BottomTab.Screen name="Emploi" component={OffersScreen} />
    <BottomTab.Screen name="Stage" component={InternshipScreen} />
    <BottomTab.Screen name="Notifications" component={NotificationScreen} />
    <BottomTab.Screen name="Startup" component={startup_screen} />
    <BottomTab.Screen name="Atelier" component={WorkshopScreen} />
  </BottomTab.Navigator>
);

export default function AccueilEtudiant() {
  return <AppTabs />;
}

const styles = StyleSheet.create({
  topBarContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  tabText: {
    marginLeft: 5,
    color: '#007BFF',
    fontWeight: 'bold',
  },
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
    fontWeight: 'bold',
  },
});