import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
    
  card: {
    width: '80%', // plus responsive que 30% pour mobile
    padding: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Blanc avec 50% de transparence
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'rgba(243, 145, 7, 0.75)',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: 'center',
  },

  slogan: {
    fontSize: 14,
    color: 'blue',
    textAlign: 'center',
  },
});
