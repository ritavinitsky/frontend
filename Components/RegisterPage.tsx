import { useState, FC } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput, StatusBar } from 'react-native';

const RegisterPage: FC<{ navigation: any }> = ({ navigation }) => {
  const [name, onChangeName] = useState('');
  const [age, onChangeAge] = useState('');
  const [password, onChangePassword] = useState('');
  const [email, onChangeEmail] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false); // New state for terms acceptance

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const nameRegex = /^[a-zA-Z0-9]{3,12}$/;
  const passwordRegex = /^.{6,}$/; 

  const onSave = async () => {
    if (!termsAccepted) {
      Alert.alert("תנאי השימוש", "חייב לאשר את תנאי השימוש כדי להמשיך");
      return;
  }


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

        if (!emailRegex.test(email)) {
          Alert.alert('Invalid email address');
          return;
        }

        if (!nameRegex.test(name)) {
          Alert.alert('Invalid name needs to be between 3-12 letters with numbers');
          return;
        }

        if (!passwordRegex.test(password)) {
          Alert.alert('Invalid password', 'Password needs to be at least 6 characters long.');
          return;
        }
        
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
              user_id: result.user_id,
              accessToken: result.accessToken, 
              refreshToken: result.refreshToken, 
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

const toggleTermsAcceptance = () => {
  setTermsAccepted(!termsAccepted);
};

const navigateToTerms = () => {
  navigation.navigate('About'); // Assuming you have a Terms screen
};
  

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.innerContainer}>
        <TextInput
          style={[styles.input, styles.inputRight]}
          onChangeText={onChangeName}
          value={name}
          placeholder='שם'
          autoCapitalize="words"
        />
        <TextInput
          style={[styles.input, styles.inputRight]}
          onChangeText={onChangeAge}
          value={age}
          placeholder='גיל'
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, styles.inputRight]}
          onChangeText={onChangeEmail}
          value={email}
          placeholder='מייל'
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.input, styles.inputRight]}
          onChangeText={onChangePassword}
          value={password}
          placeholder='סיסמא'
          secureTextEntry
          autoCapitalize="none"
        />

        <View style={styles.termsContainer}>
          <TouchableOpacity onPress={toggleTermsAcceptance} style={styles.checkbox}>
            {termsAccepted ? <Text style={styles.checkboxText}>☑</Text> : <Text style={styles.checkboxText}>☐</Text>}
          </TouchableOpacity>
          <Text style={styles.termsText}>
            אני מסכים ל
            <Text style={styles.termsLink} onPress={navigateToTerms}> תנאים והגבלות</Text>
          </Text>
        </View>


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
    backgroundColor: '#000000',
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
  termsContainer: {
    flexDirection: 'row-reverse',
    marginVertical: 10,
  },
  checkbox: {
    marginLeft: 10,
  },
  checkboxText: {
    fontSize: 16,
  },
  termsText: {
    fontSize: 14,
    align:'right',
  },
  termsLink: {
    color: '#ff0000',
    textDecorationLine: 'underline',
  },
});

export default RegisterPage;