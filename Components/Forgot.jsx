import React, { useState, FC } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, TextInput, StatusBar, Text } from 'react-native';
import UserApi from '../api/UserApi';


const Forgot: FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const [email, setEmail] = useState(route.params?.email || '');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading indicator
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;


  const handleForgotPassword = async () => {
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid email address');
      return;
    }

    if (!passwordRegex.test(password)) {
      Alert.alert('error','must be at least 6 characters long and include letters, numbers, and special characters');
      return;
    }

    setLoading(true); // Set loading to true when starting the request

    try {
      // Call API to update password by email
      const updateResult = await UserApi.updateUserPasswordByEmail(email, password);

      if (updateResult) {
        console.log('pass:',password);
        };

        setFormSubmitted(true);
        setPassword('');
    }catch(error){
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to update password');
    } finally {
      setLoading(false); // Set loading to false after request is complete
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>איפוס סיסמה</Text>

        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          placeholder="מייל"
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          placeholder="סיסמה חדשה"
          value={password}
          secureTextEntry
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handleForgotPassword} disabled={loading}>
          <Text style={styles.buttonText}>
            {loading ? 'שולח...' : 'שלח'}
          </Text>
        </TouchableOpacity>

        {formSubmitted && (
          <Text style={styles.successMessage}>
            הסיסמה עודכנה בהצלחה ,אם המייל קיים במערכת
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    textAlign:'right',
    color: '#333',
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successMessage: {
    marginTop: 20,
    textAlign: 'center',
    color: 'green',
  },
});

export default Forgot;
