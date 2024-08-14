import { useState, FC } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput, StatusBar } from 'react-native';

const StudentAddPage: FC<{ navigation: any }> = ({ navigation }) => {
  const [name, onChangeName] = useState('');
  const [age, onChangeAge] = useState('');
  const [password, onChangePassword] = useState('');
  const [email, onChangeEmail] = useState('');

  const onSave = async () => {
    const user = {
        name,
        age,
        email,
        password,
        dailyCal: '0',
    };

    try {
        const response = await fetch('http://backend-69iy.onrender.com/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });

        // Log the response status and content
        console.log("Response Status:", response.status);

        let result;
        const contentType = response.headers.get('Content-Type');

        // Check if response is JSON
        if (contentType && contentType.includes('application/json')) {
            result = await response.json();
            console.log("Response JSON:", result);
        } else {
            const text = await response.text();
            console.log("Response Text:", text);
            alert(text);
            throw new Error(text);
        }

        if (response.status === 200) {
            let user_id = result.user_id;
            console.log("user_id: " + user_id);
            
            // Registration successful
            alert("Registered successfully");
            navigation.navigate('Program', { 
              accessToken: result.accessToken, 
              refreshToken: result.refreshToken, 
              user_id: result.user_id 
             });
        } else if (response.status === 409) {
            Alert.alert("Registration Error", result.message || "Email already exists");
        } else {
            // Handle other errors
            Alert.alert("Registration Error", result.message || "An unexpected error occurred.");
        }
    } catch (error) {
        console.error("Error during registration:", error);
        Alert.alert("Error", error.message || "An unexpected error occurred.");
    }
};

  
  

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.innerContainer}>
        <TextInput
          style={[styles.input, styles.inputRight]}
          onChangeText={onChangeName}
          value={name}
          placeholder='הכנס שם'
          autoCapitalize="words"
        />
        <TextInput
          style={[styles.input, styles.inputRight]}
          onChangeText={onChangeAge}
          value={age}
          placeholder='הכנס גיל'
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, styles.inputRight]}
          onChangeText={onChangeEmail}
          value={email}
          placeholder='הכנס כתובת אימייל'
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.input, styles.inputRight]}
          onChangeText={onChangePassword}
          value={password}
          placeholder='הכנס סיסמה'
          secureTextEntry
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={onSave}>
          <Text style={styles.buttonText}>הרשמה</Text>
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
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StudentAddPage;
