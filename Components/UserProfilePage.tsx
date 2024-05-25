/*import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, StatusBar } from 'react-native';
import React, { useState, FC, useEffect } from 'react';
import StudentModel from '../Model/StudentModel';
import UserModel from '../Model/UserModel';



const UserDetailsPage: FC<{ route: any, navigation: any }> = ({ route, navigation }) => {
    const user = UserModel.getUserById(route.params.id,route.params.tokens[0]);
    useEffect(() => {
        navigation.setOptions({
            title: user.name,
            headerRight: () => (
                <Button
                    onPress={() => navigation.navigate('StudentAddPage')}
                    title="Edit"
                />
            ),
        })
    }, [])



    return (
        <View style={styles.container}>
            <Image style={styles.avatar} source={require('../assets/avatar.jpeg')} />
            <Text style={styles.input}>{user?.name}</Text>
            <Text style={styles.input}>{user?.id}</Text>
            <Text style={styles.input}>{user?.imgUrl}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight,
        flex: 1,
        flexDirection: 'column',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        backgroundColor: 'blue',
    },
    avatar: {
        alignSelf: 'center',
        height: 200,
        width: 200,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    buttons: {
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
    },
    buttonText: {
        padding: 10
    }

});

export default UserDetailsPage;
*/
// Pages/UserProfilePage.tsx

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

