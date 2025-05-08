import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '80%', // plus responsive que 30% pour mobile
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    height: 50,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fafafa',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  button: {
    backgroundColor: 'rgba(12, 50, 241, 0.77)',
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },

  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  successText: {
    color: 'green',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 10,
  },
  forgotPassword: {
    marginTop: 15,
    alignSelf: 'center',
  },
  forgotPasswordText: {
    color: '#007BFF',
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  bottomContainer: {
    marginTop: 'auto', // Pousse l'élément vers le bas
    alignItems: 'center',
    marginBottom: 20, // Ajoute un espace en bas
  },
});

export default styles;
