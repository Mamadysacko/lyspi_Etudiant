import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  card: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 16,
    width: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },

  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#444',
  },

  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    color: '#000',
  },

  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});
