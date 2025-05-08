import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, ActivityIndicator, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Remplace par l'URL de ton serveur

const screenWidth = Dimensions.get('window').width; // Largeur de l'écran
const screenHeight = Dimensions.get('window').height; // Hauteur de l'écran

const Performances = () => {
  const [idEtudiant, setIdEtudiant] = useState(null); // ID de l'étudiant
  const [licenceMoyennes, setLicenceMoyennes] = useState([]);
  const [topMatieres, setTopMatieres] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);

  // Récupérer l'ID étudiant depuis AsyncStorage
  useEffect(() => {
    const fetchIdEtudiant = async () => {
      try {
        const studentId = await AsyncStorage.getItem('id_etudiant');
        if (!studentId) throw new Error('ID étudiant non trouvé');
        setIdEtudiant(studentId);
      } catch (error) {
        console.error('Erreur récupération ID étudiant :', error);
      }
    };

    fetchIdEtudiant();
  }, []);

  // Charger les données dès que l'ID étudiant est disponible
  useEffect(() => {
    if (!idEtudiant) return;

    const fetchData = async () => {
      try {
        const [moyennesRes, topMatiereRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/licences/moyennes/${idEtudiant}`),
          axios.get(`${API_BASE_URL}/licences/top-matiere/${idEtudiant}`),
        ]);

        setLicenceMoyennes(moyennesRes.data);
        setTopMatieres(topMatiereRes.data);
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idEtudiant]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Chargement...</Text>
      </View>
    );
  }

  const lineData = {
    labels: licenceMoyennes.map((item) => item.licence),
    datasets: [
      {
        data: licenceMoyennes.map((item) => item.moyenne_generale),
        strokeWidth: 2,
      },
    ],
  };

  
  return (
    <ScrollView style={styles.container}>

      {licenceMoyennes.map((item, index) => (
        <View key={index} style={styles.yearContainer}>
          <Text style={styles.yearTitle}>{item.licence}</Text>
          <Text>- Moyenne Générale : {item.moyenne_generale}/10</Text>
          <Text>- Mention : {item.mention}</Text>

          {showMore && (
            <>
              <Text style={{ marginTop: 5, fontWeight: 'bold' }}>📈 Meilleure matière :</Text>
              {topMatieres
                .filter((matiere) => matiere.licence === item.licence)
                .map((matiere, idx) => (
                  <Text key={idx}>
                    - {matiere.matiere} : {matiere.meilleure_note}/10
                  </Text>
                ))}
            </>
          )}
        </View>
      ))}

      <Button
        title={showMore ? "Voir moins" : "Voir plus"}
        onPress={() => setShowMore((prev) => !prev)}
      />

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Évolution des Moyennes par Licence</Text>
        <LineChart
          data={lineData}
          width={screenWidth * 0.9} // 90% de la largeur de l'écran
          height={screenHeight * 0.3} // 30% de la hauteur de l'écran
          chartConfig={chartConfig}
          bezier
        />
      </View>

     
    </ScrollView>
  );
};

const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#ffcc00',
  backgroundGradientTo: '#ffcc00',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: { borderRadius: 16 },
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 10,
    textAlign: 'center',
  },
  yearContainer: {
    marginBottom: 20,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
  },
  yearTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  chartContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});

export default Performances;