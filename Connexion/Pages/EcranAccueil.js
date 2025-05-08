import React from 'react';
import { SafeAreaView, Text, Image, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Card } from 'react-native-paper';
import styles from '../Styles/EcranAccueil_style'; // Assurez-vous que le chemin d'importation est correct/

export default function EcranAccueil({ navigation }) {
  return (
    <ImageBackground
      source={require('../../assets/batiment_unc.jpeg')} // Ton image d’arrière-plan
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <Card style={styles.card}>
        <Text style={styles.header}>Bienvenue sur <Text style={styles.lyspi}>LYSPI</Text></Text>
          <Image source={require('../../assets/icone unc.jpg')} style={styles.image} />



          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Etudiant')} //EcranTypeConnexion
              style={styles.button}
            >
              <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('CompteEtudiant')}
              style={[styles.button, styles.secondaryButton]}
            >
              <Text style={styles.buttonText}>Créer un compte</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.slogan}>
            Avec LYSPI: Un Étudiant, Un Emploi!
          </Text>
        </Card>
      </SafeAreaView>
    </ImageBackground>
  );
}
