/*

import React, {FC, useState, useEffect } from 'react';

import { StyleSheet, Text, TextInput, View, Button, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import UserModel, { User } from '../Model/UserModel';
import UserApi from '../api/UserApi';

interface UserProfilePageProps {
  navigation: NavigationProp<ParamListBase>;
}

const UserProfilePage: FC<{route:any, navigation: any, }> = ({navigation, route}) => {
  //const [user, setUser] = useState<User | null>(null);
  //const [loading, setLoading] = useState(true);
  const [name, onChangeName] = useState('');
  const [age, onChangeAge] = useState('');
  const [password, onChangePassword] = useState('');
  const [email, onChangeEmail] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      //const result = await UserApi.getUser(route.params.id,route.params.refreshToken);
      console.log("route.params.user_id: " + route.params.user_id)
      console.log("refreshToken: " + route.params.refreshToken);
      console.log(route.params);
      const result = await UserApi.getUser(route.params.user_id, route.params.refreshToken);

      if (result) {
        onChangeName(result.currentUser.name);
        onChangeEmail(result.currentUser.email);
        onChangeAge(result.currentUser.age);

      } else {
        Alert.alert('Error', 'Failed to load user profile');
      }
     
    };

    fetchUserProfile();
  }, []);

  
 


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <TextInput style={styles.input} onChangeText={onChangeEmail} value={email} placeholder='Enter your Email'/>
      <Text style={styles.label}>Name:</Text>
      <TextInput style={styles.input} onChangeText={onChangeName} value={name} placeholder='Enter your Name'/>
      <Text style={styles.label}>Age:</Text>
      <TextInput style={styles.input} onChangeText={onChangeAge} value={age} placeholder='Enter your Age'/>
      
      <Button title="Back" onPress={() => navigation.goBack()} />
      <Button title="Save" onPress={() => UserApi.updateUser({"id": route.params.user_id, "email": email, "name": name, "age": age}, route.params.refreshToken)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default UserProfilePage;

*/
import React, { FC, useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import UserApi from '../api/UserApi';

interface UserProfilePageProps {
  navigation: NavigationProp<ParamListBase>;
}

const UserProfilePage: FC<{ route: any, navigation: any }> = ({ navigation, route }) => {
  const [name, onChangeName] = useState('');
  const [age, onChangeAge] = useState('');
  const [email, onChangeEmail] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const result = await UserApi.getUser(route.params.user_id, route.params.refreshToken);
      if (result) {
        onChangeName(result.currentUser.name);
        onChangeEmail(result.currentUser.email);
        onChangeAge(result.currentUser.age);
      } else {
        Alert.alert('Error', 'Failed to load user profile');
      }
    };
    fetchUserProfile();
  }, []);

  const onSave = async () => {
    const result = await UserApi.updateUser(
      { id: route.params.user_id, email, name, age },
      route.params.refreshToken
    );
    if (result) {
      Alert.alert('Success', 'Profile updated successfully');
    } else {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="Enter your Email"
      />
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        placeholder="Enter your Name"
      />
      <Text style={styles.label}>Age:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeAge}
        value={age}
        placeholder="Enter your Age"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSave}>
          <Text style={styles.buttonText}>Save</Text>
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
