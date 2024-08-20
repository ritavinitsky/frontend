import { useState, FC } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, TextInput, StatusBar, Text } from 'react-native';
import LoginRegistrationModel from '../Model/LoginModel';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginPage: FC<{ navigation: any }> = ({ navigation }) => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);


  const onSave = async () => {
    try {
      // Attempt login
      const user = { email, password };
      const result = await LoginRegistrationModel.login(user.email, user.password);

      // Ensure result is correctly structured
      if (result && result.accessToken && result.refreshToken) {
        console.log("Login successful - AccessToken:", result.accessToken, "RefreshToken:", result.refreshToken);
        navigation.navigate('DrawerNavigator', {
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          user_id: result.user_id
        });
      } else {
        console.log("Login failed - Result:", result);
        alert("Incorrect email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("Login Error", "An error occurred during login");
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('Forgot');

  };



  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.innerContainer}>
        <TextInput
          style={[styles.input, styles.inputRight]}
          onChangeText={onChangeEmail}
          placeholder="אימייל"
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.inputRight, styles.passwordInput]}
            onChangeText={onChangePassword}
            placeholder="סיסמה"
            value={password}
            secureTextEntry={!passwordVisible}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeButton}>
            <Icon name={passwordVisible ? 'eye-outline' : 'eye-off-outline'} size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>שכחת סיסמה?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onSave}>
          <Text style={styles.buttonText}>כניסה</Text>
        </TouchableOpacity>
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
    color: '#333',
  },
  inputRight: {
    textAlign: 'right',
  },
  passwordContainer: {
    position: 'relative', // Required for absolute positioning
  },
  passwordInput: {
    paddingRight: 40, // Add padding to prevent text from overlapping with the icon
  },
  eyeButton: {
    position: 'absolute',
    right: 10, // Position the icon on the right side
    top: '21%', // Center vertically
  },
  forgotPasswordContainer: {
    marginVertical: 10, 
  },
  forgotPasswordText: {
    color: '#007BFF',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginPage;