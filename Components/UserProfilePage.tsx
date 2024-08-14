import React, { FC, useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import UserApi from '../api/UserApi';

const UserProfilePage: FC<{ route: any, navigation: any }> = ({ navigation, route }) => {
  const [name, onChangeName] = useState('');
  const [age, onChangeAge] = useState('');
  const [email, onChangeEmail] = useState('');
  const [dailyCal, onChangedailyCal] = useState('');
  

  useEffect(() => {
    const fetchUserProfile = async () => {
      const result = await UserApi.getUser(route.params.user_id, route.params.refreshToken);
      if (result) {
        onChangeName(result.currentUser.name);
        onChangeEmail(result.currentUser.email);
        onChangeAge(result.currentUser.age);
        onChangedailyCal(result.currentUser.dailyCal);
      } else {
        Alert.alert('שגיאה', 'נכשל בטעינת פרופיל המשתמש');
      }
    };
    fetchUserProfile();
  }, []);

  const onSave = async () => {
    const result = await UserApi.updateUser(
      { id: route.params.user_id, email, name, age,dailyCal },
      route.params.refreshToken
    );
    if (result) {
      Alert.alert('הצלחה', 'הפרופיל עודכן בהצלחה');
    } else {
      Alert.alert('שגיאה', 'נכשל בעדכון הפרופיל');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>אימייל:</Text>
      <TextInput
        style={[styles.input, styles.inputRight]}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="הכנס את האימייל שלך"
      />
      <Text style={styles.label}>שם:</Text>
      <TextInput
        style={[styles.input, styles.inputRight]}
        onChangeText={onChangeName}
        value={name}
        placeholder="הכנס את שמך"
      />
      <Text style={styles.label}>גיל:</Text>
      <TextInput
        style={[styles.input, styles.inputRight]}
        onChangeText={onChangeAge}
        value={age}
        placeholder="הכנס את גילך"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>חזרה</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSave}>
          <Text style={styles.buttonText}>שמור</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
    textAlign: 'right',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  inputRight: {
    textAlign: 'right',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
  },
  backButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default UserProfilePage;
