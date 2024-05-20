/*import { StyleSheet, Text, View, Image, TouchableOpacity, Button, Alert, TextInput, StatusBar } from 'react-native';
import React, { useState, FC, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StudentAddPage from './Components/StudentAddPage';
import StudentDetailsPage from './Components/StudentDetailsPage';
import StudentListPage from './Components/StudentListPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import apiClient from './api/ClientApi'

const testConnection = async () => {
  try {
    const response = await apiClient.get('/'); // שלח בקשה ל-root URL
    if (response.ok) {
      console.log('חיבור לשרת הצליח:', response.data);
    } else {
      console.log('חיבור לשרת נכשל:', response.problem);
    }
  } catch (error) {
    console.error('שגיאה בחיבור לשרת:', error);
  }
};

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const StudentsListStack = createNativeStackNavigator();

const StudentsListScreen: FC = () => {
  return (
    <StudentsListStack.Navigator>
      <StudentsListStack.Screen name="StudentListPage" component={StudentListPage} options={{ title: 'Students List' }} />
      <StudentsListStack.Screen name="StudentDetailsPage" component={StudentDetailsPage} options={{ title: 'Student Details' }} />
      <StudentsListStack.Screen name="StudentAddPage" component={StudentAddPage} options={{ title: 'Add New Student' }} />
    </StudentsListStack.Navigator>
  );
}

export default function App() {

  useEffect(() => {
    testConnection();
  }, []);
  return (
  
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="StudentsListScreen" component={StudentsListScreen} options={{ headerShown: false }} />
        <Tab.Screen name="StudentAddPage" component={StudentAddPage} options={{ title: 'Add New Student' }} />
      </Tab.Navigator>
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    flexDirection: 'column',
  },

});



*/

/*
import { StyleSheet, View, StatusBar, Text, Button} from 'react-native';
//import PostListPage from './Components/PostListPage';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { FC,useEffect } from 'react';
import StudentAddPage from './Components/StudentAddPage';
//import PostDetailsPage from './Components/PostDetailsPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
//import PostAddPage from './Components/PostAddPage';
//import PostEditPage from './Components/PostEditPage';
import apiClient from './api/ClientApi'


const testConnection = async () => {
  try {
    const response = await apiClient.get('/'); // שלח בקשה ל-root URL
    if (response.ok) {
      console.log('חיבור לשרת הצליח:', response.data);
    } else {
      console.log('חיבור לשרת נכשל:', response.problem);
    }
  } catch (error) {
    console.error('שגיאה בחיבור לשרת:', error);
  }
}; 

//const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const StudentListStack = createNativeStackNavigator()

const TestFunctions: FC = () => {
  return(
    <View>
      <Text>PostList</Text>
    </View>
  )
}

const StudentListScreen: FC = () => {
  return (
    <StudentListStack.Navigator>
      <StudentListStack.Screen name="LoginPage" component={LoginPage} options={{title: 'Login'}}/>
      <StudentListStack.Screen name="RegisterPage" component={RegisterPage} options={{title: 'Register'}}/>
    </StudentListStack.Navigator>
  );
}

export default function App() {

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <StudentListStack.Screen name="StudentListScreen" component={StudentListScreen} options={{title: 'Login', headerShown: false}}/>
        <StudentListStack.Screen name="RegisterPage" component={RegisterPage} options={{title: 'Register'}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },

});

*/

import { StyleSheet, View, StatusBar, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FC, useEffect } from 'react';
import StudentAddPage from './Components/StudentAddPage';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import apiClient from './api/ClientApi';

const testConnection = async () => {
  try {
    const response = await apiClient.get('/'); // שלח בקשה ל-root URL
    if (response.ok) {
      console.log('חיבור לשרת הצליח:', response.data);
    } else {
      console.log('חיבור לשרת נכשל:', response.problem);
    }
  } catch (error) {
    console.error('שגיאה בחיבור לשרת:', error);
  }
};

const Stack = createNativeStackNavigator();

const MainScreen: FC = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Login"
        onPress={() => navigation.navigate('LoginPage')}
      />
      <Button
        title="Register"
        onPress={() => navigation.navigate('RegisterPage')}
      />
    </View>
  );
};

const App = () => {
  useEffect(() => {
    testConnection();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="RegisterPage"
          component={RegisterPage}
          options={{ title: 'Register' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
});

export default App;
