/*import { useState, FC } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, TextInput, StatusBar, Text } from 'react-native';
import LoginRegistrationModel from '../Model/LoginModel';

const LoginPage: FC<{ navigation: any }> = ({ navigation }) => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  const onSave = async () => {
    const user = {
      email: email,
      password: password
    }
    const result: any = await LoginRegistrationModel.login(user.email, user.password)
    console.log(result)
    if (result !== false) {
      console.log("logged in")
      navigation.navigate('DrawerNavigator', result);
    } else {
      Alert.alert("Login Error:", "Your email or password are incorrect")
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        placeholder="Your email"
        value={email}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        placeholder='Your password'
        value={password}
        secureTextEntry
      />
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={onSave}>
          <Text style={styles.button}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    padding: 10
  }
})

export default LoginPage;
*/
import { useState, FC } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, TextInput, StatusBar, Text } from 'react-native';
import LoginRegistrationModel from '../Model/LoginModel';

const LoginPage: FC<{ navigation: any }> = ({ navigation }) => {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  const onSave = async () => {
    const user = { email, password };
    const result: any = await LoginRegistrationModel.login(user.email, user.password);
    if (result !== false) {
      console.log("logged in");
      navigation.navigate('DrawerNavigator', result);
    } else {
      Alert.alert("Login Error:", "Your email or password are incorrect");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          placeholder="Email"
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          placeholder="Password"
          value={password}
          secureTextEntry
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={onSave}>
          <Text style={styles.buttonText}>LOGIN</Text>
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
