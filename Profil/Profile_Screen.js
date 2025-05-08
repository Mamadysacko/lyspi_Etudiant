import React, { useState, useLayoutEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Modal, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

// Importation des composants
import CoverPhoto from './Profil_photo';
import PersonalInfo from './Info_personnel';
import Documents from './Documents';
import Attest_cert from './Attestation';
import Statut_Etudiant from './Statut_emploi';
import Performance from './Performance';
import CertAttes_liste from './Attestion_liste';

// Fonction pour configurer l'entête
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

const ProfileScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  // Configuration du header
  useLayoutEffect(() => {
    navigation.setOptions(getHeaderOptions('Mon Profil', true));
  }, [navigation]);

  // Fonction pour ouvrir une page avec délai après fermeture du menu
  const openPage = (pageName) => {
    setMenuVisible(false); // Fermer le menu
    setTimeout(() => {
      navigation.navigate(pageName); // Naviguer après un court délai
    }, 300);
  };

  return (
    <View style={styles.container}>
      {/* Menu modal */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem} onPress={() => openPage('Apropos')}>
              <Icon name="info" size={22} color="#2980b9" style={styles.icon} />
              <Text style={styles.menuText}>À propos de LYSPI</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => openPage('Contacter')}>
              <Icon name="mail" size={22} color="#27ae60" style={styles.icon} />
              <Text style={styles.menuText}>Nous contacter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => openPage('Quitter')}>
              <Icon name="logout" size={22} color="#e74c3c" style={styles.icon} />
              <Text style={styles.menuText}>Déconnexion</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Contenu principal */}
      <ScrollView>
        <CoverPhoto />
        <View style={styles.contentContainer}>
          <Section title="🧑 Informations Personnelles">
            <PersonalInfo />
          </Section>
          <Section title="🗂️ Documents">
            <Documents />
          </Section>
          <Section title="🏅 Attestations, certificats, expériences">
            <Attest_cert />
          </Section>
          <Section title="📝 Listes">
            <CertAttes_liste />
          </Section>
          <Section title="🚀 Statuts Emploi">
            <Statut_Etudiant />
          </Section>
          <Section title="📊 Performance">
            <Performance />
          </Section>
        </View>
      </ScrollView>

      {/* Bouton flottant pour ouvrir le menu */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setMenuVisible(true)}
      >
        <Icon name="more-vert" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

// Composant Section pour éviter la répétition
const Section = ({ title, children }) => (
  <View style={styles.block}>
    <Text style={styles.blockTitle}>{title}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  imageContainer: {
    marginRight: 10,
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 50,
    paddingRight: 10,
  },
  menu: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    width: 180,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  contentContainer: {
    padding: 10,
  },
  block: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 8,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  blockTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 25,
    right: 20,
    backgroundColor: 'rgba(217, 131, 26, 0.9)',
    width: 55,
    height: 55,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  icon: {
    marginRight: 12,
  },
});

export default ProfileScreen;
