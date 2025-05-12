// ...imports
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Écrans
import EcranAccueil from '../../accueil/EcranAccueil';
import ProfileScreen from '../../Profil/Profile_Screen';
import MessagingScreen from '../../Compte/Pages/MessagingScreen';
import OffersScreen from '../../offre/OffersScreen';
import StageScreen from '../../offre/StagesScreen';
import startup_screen from '../../startup/startup_screen';
import WorkshopScreen from '../../Compte/Pages/FormationScreen';
import FormationDetailsScreen from '../../Compte/Pages/FormationDetailsScreen';
import OffersScreenDetail from '../../offre/OffersScreenDetail';
import AccueilDetail from '../../accueil/AccueilDetail';
import StageDetail from '../../offre/StagesScreenDetail';

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

// ✅ Barre supérieure personnalisée
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

// ✅ Stack pour Accueil
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Accueil"
      component={EcranAccueil}
      options={({ navigation }) => ({
        headerTitle: 'Accueil',
        headerRight: () => <TopBar navigation={navigation} />,
        headerStyle: { backgroundColor: '#fff' },
        headerTitleStyle: { fontWeight: 'bold' },
      })}
    />
    <Stack.Screen name="Profil" component={ProfileScreen} />
    <Stack.Screen name="Messagerie" component={MessagingScreen} />
    <Stack.Screen
      name="AccueilDetail"
      component={AccueilDetail}
      options={{ headerTitle: 'Détails de la publication' }}      />



  </Stack.Navigator>
);

// ✅ Stack pour Atelier avec navigation vers les détails
const WorkshopStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Atelier"
      component={WorkshopScreen}
      options={{ headerTitle: 'Ateliers' }}
    />
    <Stack.Screen
      name="FormationDetails"
      component={FormationDetailsScreen}
      options={{ headerTitle: 'Détails de la publication' }}
    />
  </Stack.Navigator>
);
const OffreStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Emploi"
      component={OffersScreen}
      options={{
        headerTitle: 'Emploi' // Personnalisation du texte du bouton de retour
      }}
    />
    <Stack.Screen
      name="FormationDetails"
      component={OffersScreenDetail}
      options={{
        headerTitle: 'Détails de la publication'
      }}
    />
  </Stack.Navigator>
);
const StageStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Stage"
      component={StageScreen}
      options={{
        headerTitle: 'Stage' // Personnalisation du texte du bouton de retour
      }}
    />
    <Stack.Screen
      name="StageDetails"
      component={StageDetail}
      options={{
        headerTitle: 'Détails de la publication'
      }}
    />
  </Stack.Navigator>
);



// ✅ Onglets
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
          case 'Accueil': iconName = 'home'; break;
          case 'Emploi': iconName = 'work'; break;
          case 'Stage': iconName = 'school'; break;
          case 'Startup': iconName = 'business'; break;
          case 'Atelier': iconName = 'build'; break;
          default: iconName = 'help';
        }
        return <MaterialIcons name={iconName} size={24} color={color} />;
      },
    })}
  >
    <BottomTab.Screen name="Accueil" component={HomeStack} />
    <BottomTab.Screen name="Emploi" component={OffreStack} />
    <BottomTab.Screen name="Stage" component={StageStack} />
    <BottomTab.Screen name="Startup" component={startup_screen} />
    <BottomTab.Screen name="Atelier" component={WorkshopStack} />
  </BottomTab.Navigator>
);

export default function AccueilEtudiant() {
  return <AppTabs />;
}

const styles = StyleSheet.create({
  topBarContainer: {
    flexDirection: 'row',
    marginRight: 10,
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
