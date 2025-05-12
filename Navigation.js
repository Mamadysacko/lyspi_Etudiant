import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Image, StyleSheet, View } from 'react-native';
import EcranAccueil from './Connexion/Pages/EcranAccueil';
import ConnexionEtudiant from './Connexion/Pages/ConnexionEtudiant';
import EcranCompteEtudiant from './Connexion/Pages/EcranCompteEtudiant';
import Confirmation from './Connexion/Pages/Confirmation';
import Motdepasse from './Connexion/Pages/Motdepasse';
import AccueilEtudiant from './Connexion/Pages/Navigation_etudiant'; 
import Apropos from './Profil/apropos';
import Contacter from './Profil/contacter';
import Quitter from './Profil/quitter';
import ApplyScreen from './Compte/Pages/Postuler';

// Création du stack navigator
const Stack = createStackNavigator();

// Fonction pour générer dynamiquement les options d'en-tête
const getHeaderOptions = (title, isMainScreen = false) => ({
  headerShown: true,
  title: title,
  headerStyle: {
    backgroundColor: 'rgba(217, 131, 26, 0.8)', // Fond de l'en-tête
  },
  headerRight: () => (
    <View style={styles.imageContainer}>
      <Image
        source={require('./assets/icone unc.jpg')} // Assurez-vous que ce chemin est correct
        style={styles.headerImage}
      />
    </View>
  ),
  headerTitleStyle: {
    color: '#fff',
    fontSize: isMainScreen ? 27 : 20, // Taille différente pour LYSPI
    fontWeight: isMainScreen ? 'bold' : 'normal', // Gras pour LYSPI
  },
});

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LYSPI">
      <Stack.Screen
    name="LYSPI"
    component={EcranAccueil}
    options={getHeaderOptions('LYSPI', true)} // true pour LYSPI
  />
        <Stack.Screen
          name="Etudiant"
          component={ConnexionEtudiant}
          options={getHeaderOptions('Etudiant')} // false par défaut
        />
        <Stack.Screen
          name="CompteEtudiant"
          component={EcranCompteEtudiant}
          options={getHeaderOptions('Compte Etudiant')} // false par défaut
        />
        <Stack.Screen
          name="Confirmation"
          component={Confirmation}
          options={getHeaderOptions('Confirmation')} // false par défaut
        />
        <Stack.Screen
          name="Motdepasse"
          component={Motdepasse}
          options={getHeaderOptions('Mot de passe')} // false par défaut
        />
        <Stack.Screen
          name="Accueil"
          component={AccueilEtudiant}
          options={{ headerShown: false }} // Supprime l'en-tête pour AccueilEtudiant
        />
        <Stack.Screen
          name="Apropos"
          component={Apropos}
          options={getHeaderOptions('À Propos')}
        />
        <Stack.Screen
          name="Contacter"
          component={Contacter}
          options={getHeaderOptions('Nous Contacter')}
        />
        <Stack.Screen
          name="Quitter"
          component={Quitter}
          options={getHeaderOptions('Quitter')}
        />
        <Stack.Screen
          name="ApplyScreen"
          component={ApplyScreen}
          options={getHeaderOptions('ApplyScreen')}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    marginRight: 10,
  },
  headerImage: {
    width: 55,
    height: 55,
    borderRadius: 20,
    overflow: 'hidden',
  },
});
