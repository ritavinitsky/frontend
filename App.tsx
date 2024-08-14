import { StyleSheet, View, StatusBar, Button, ScrollView, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FC, useEffect } from 'react';
import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import HomePage from './Components/HomePage';
import PostAddPage from './Components/PostAddPage';
import PostListPage from './Components/PostListPage';
import UserProfilePage from './Components/UserProfilePage';
import UsersPostListPage from './Components/UsersPostListPage';
import apiClient from './api/ClientApi';
import FoodMenu from './Components/FoodMenu';
import ComingSoon from './Components/ComingSoon';
import Timers from './Components/TimersPage';
import Terms from './Components/TermsPage';
import Calculators from './Components/CalculatorsPage';
import Program from './Components/BuildingProgramPage';
import Proccess from './Components/Proccess';

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
            <Text style={styles.buttonText}>התחברות</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterPage')}>
            <Text style={styles.buttonText}>הרשמה</Text>
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
      component={HomePage}
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
      component={Proccess}
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
      component={Timers}
      options={{ title: 'צום לסירוגין' }}
      initialParams={route.params}
    />
    <Drawer.Screen
      name="Recipes"
      component={FoodMenu}
      options={{ title: 'מתכונים' }}
      initialParams={route.params}
    />
    <Drawer.Screen
      name="Calculators"
      component={Calculators}
      options={{ title: 'מחשבונים' }}
      initialParams={route.params}
    />
     <Drawer.Screen
      name="Program"
      component={Program}
      options={{ title: 'יצירת תכנית' }}
      initialParams={route.params}
    />
    <Drawer.Screen
      name="About"
      component={Terms}
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
          options={{ title: 'ברוכים הבאים' }}
        />
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ title: 'התחברות' }}
        />
        <Stack.Screen
          name="RegisterPage"
          component={RegisterPage}
          options={{ title: 'הרשמה' }}
        />
        <Stack.Screen
          name="DrawerNavigator"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="PostAddPage"
          component={PostAddPage}
          options={{ title: 'הוספת פוסט' }}
        />
         <Stack.Screen
          name="Program"
          component={Program}
          options={{ title: 'יצירת תכנית' }}
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
