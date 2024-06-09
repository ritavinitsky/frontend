/*import { StyleSheet, View, StatusBar, Button, ScrollView, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FC, useEffect } from 'react';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import PostAddPage from './Components/PostAddPage';
import PostListPage from './Components/PostListPage';
import UserProfilePage from './Components/UserProfilePage';
import UsersPostListPage from './Components/UsersPostListPage';
import apiClient from './api/ClientApi';

const testConnection = async () => {
  try {
    const response = await apiClient.get('/');
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
const Drawer = createDrawerNavigator();

const MainRefreshToken = { refreshToken: "" };

const MainScreen: FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.buttonContainer}>
          <Button
            title="Login"
            onPress={() => navigation.navigate('LoginPage')}
          />
          <Button
            title="Register"
            onPress={() => navigation.navigate('RegisterPage')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const DrawerNavigator: FC<{route: any, navigation: any }> = ({ navigation, route }) => (
  <Drawer.Navigator initialRouteName="PostListPage">
    <Drawer.Screen
      name="PostListPage"
      component={PostListPage}
      options={{ title: 'All Posts' }}
      initialParams={route.params}
    />
    <Drawer.Screen
      name="UserProfilePage"
      component={UserProfilePage}
      options={{ title: 'User Profile' }}
      initialParams={route.params}
    />
    <Drawer.Screen
      name="UsersPostListPage"
      component={UsersPostListPage}
      options={{ title: 'User\'s Post List' }}
      initialParams={route.params}
    />
  </Drawer.Navigator>
);

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
        <Stack.Screen
          name="DrawerNavigator"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
});

export { MainRefreshToken };
export default App;
*/
/*
import { StyleSheet, View, StatusBar, Button, ScrollView, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FC, useEffect } from 'react';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import PostAddPage from './Components/PostAddPage';
import PostListPage from './Components/PostListPage';
import UserProfilePage from './Components/UserProfilePage';
import UsersPostListPage from './Components/UsersPostListPage';
import apiClient from './api/ClientApi';

const testConnection = async () => {
  try {
    const response = await apiClient.get('/');
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
const Drawer = createDrawerNavigator();

const MainRefreshToken = { refreshToken: "" };

const MainScreen: FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginPage')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterPage')}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const DrawerNavigator: FC<{ route: any, navigation: any }> = ({ navigation, route }) => (
  <Drawer.Navigator initialRouteName="PostListPage">
    <Drawer.Screen
      name="PostListPage"
      component={PostListPage}
      options={{ title: 'All Posts' }}
      initialParams={route.params}
    />
    <Drawer.Screen
      name="UserProfilePage"
      component={UserProfilePage}
      options={{ title: 'User Profile' }}
      initialParams={route.params}
    />
    <Drawer.Screen
      name="UsersPostListPage"
      component={UsersPostListPage}
      options={{ title: 'User\'s Post List' }}
      initialParams={route.params}
    />
  </Drawer.Navigator>
);

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
        <Stack.Screen
          name="DrawerNavigator"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PostAddPage"
          component={PostAddPage}
          options={{ title: 'Post Add Page' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    width: '80%',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export { MainRefreshToken };
export default App;
*/
import { StyleSheet, View, StatusBar, Button, ScrollView, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FC, useEffect } from 'react';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import PostAddPage from './Components/PostAddPage';
import PostListPage from './Components/PostListPage';
import UserProfilePage from './Components/UserProfilePage';
import UsersPostListPage from './Components/UsersPostListPage';
import apiClient from './api/ClientApi';
import ComingSoon from './Components/ComingSoon';

const testConnection = async () => {
  try {
    const response = await apiClient.get('/');
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
const Drawer = createDrawerNavigator();

const MainRefreshToken = { refreshToken: "" };

const MainScreen: FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginPage')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterPage')}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const DrawerNavigator: FC<{ route: any, navigation: any }> = ({ navigation, route }) => (
  <Drawer.Navigator initialRouteName="PostListPage">
    <Drawer.Screen
      name="Home"
      component={ComingSoon}
      options={{ title: 'עמוד ראשי' }}
      initialParams={route.params}
    />
    <Drawer.Screen
      name="UserProfilePage"
      component={UserProfilePage}
      options={{ title: 'פרופיל' }}
      initialParams={route.params}
    />
    <Drawer.Screen
      name="Proccess"
      component={ComingSoon}
      options={{ title: 'תהליך' }}
      initialParams={route.params}
    />
    <Drawer.Screen
      name="PostListPage"
      component={PostListPage}
      options={{ title: 'פורום' }}
      initialParams={route.params}
    />
    
    <Drawer.Screen
      name="UsersPostListPage"
      component={UsersPostListPage}
      options={{ title: 'הפוסטים שלי' }}
      initialParams={route.params}
    />

    <Drawer.Screen
      name="Fasting"
      component={ComingSoon}
      options={{ title: 'צום לסירוגין' }}
      initialParams={route.params}
    />
    <Drawer.Screen
      name="Recipes"
      component={ComingSoon}
      options={{ title: 'מתכונים' }}
      initialParams={route.params}
    />
    <Drawer.Screen
      name="Calculators"
      component={ComingSoon}
      options={{ title: 'מחשבונים' }}
      initialParams={route.params}
    />
    <Drawer.Screen
      name="About"
      component={ComingSoon}
      options={{ title: 'תקנון' }}
      initialParams={route.params}
    />
  </Drawer.Navigator>
);

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
        <Stack.Screen
          name="DrawerNavigator"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="PostAddPage"
          component={PostAddPage}
          options={{ title: 'Add post' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    width: '80%',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export { MainRefreshToken };
export default App;
