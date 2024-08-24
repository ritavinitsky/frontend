import React, { useState, useEffect, useCallback, FC } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image, Dimensions, AppState } from 'react-native';
import UserApi from '../api/UserApi';
import axios from 'axios';

const HomePage: FC<{ route: any; navigation: any }> = ({ navigation, route }) => {
  const [inputs, setInputs] = useState<{ food: string; cal: string }[]>([{ food: '', cal: '' }]);
  const [waterColors, setWaterColors] = useState<string[]>(Array(8).fill('blue'));
  const [remaningCalories, setRemaningCalories] = useState<number>(0);
  const [initialCalories, setInitialCalories] = useState<number>(0);
  const [isProfileFetched, setIsProfileFetched] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null); // Added userId state

  const fullGlass = require('../assets/full.png');
  const emptyGlass = require('../assets/empty.png');
  const pencilIcon = require('../assets/pencil.png');

  const { width } = Dimensions.get('window');

  const fetchUserProfile = async () => {
    try {
      const { user_id, refreshToken } = route.params;
      setUserId(user_id); // Set the user ID

      // Fetch the logged-in user's profile
      const result = await UserApi.getUser(user_id, refreshToken);

      console.log('API Result:', result); // Log entire result object

      if (result && result.currentUser && result.currentUser.dailyCal) {
        const dailyCalories = parseFloat(result.currentUser.dailyCal);
        console.log('dailyCalories:', dailyCalories);
        console.log('RemaningCalories:', result.currentUser.remaningCal);

        if (isNaN(dailyCalories)) {
          console.error('Invalid daily calories:', result.currentUser.dailyCal);
          Alert.alert('Error', 'Invalid daily calories data');
          return;
        }

        setInitialCalories(dailyCalories);
        setIsProfileFetched(true);
        if(parseFloat(result.currentUser.remaningCal) === 0 || isNaN(result.currentUser.remaningCal)) {
          setRemaningCalories(dailyCalories);
          console.log('remaningCalories:if', remaningCalories);
        } else {
          setRemaningCalories(result.currentUser.remaningCal);
          console.log('remaningCalories:else', remaningCalories);
        }
      } else {
        Alert.alert('Error', 'Failed to load user profile or daily calories data is missing');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const saveData = useCallback(async () => {
    try {
      const currentDate = new Date();
      const isMidnight = currentDate.getHours() === 0 && currentDate.getMinutes() === 0;

      if (isMidnight) {
        if (remaningCalories === 0) {
          await axios.post('http://backend-69iy.onrender.com/prograss', {
            date: currentDate.toISOString(),
            passed: "true",
          });
        } else {
          await axios.post('http://backend-69iy.onrender.com/prograss', {
            date: currentDate.toISOString(),
            passed: "false",
          });
        }

        // Reset states
        setInputs([{ food: '', cal: '' }]);
        setWaterColors(Array(8).fill('blue'));
        setRemaningCalories(initialCalories);

        Alert.alert('Progress Saved', 'Your progress has been saved.');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }, [inputs, remaningCalories, initialCalories, waterColors, userId]);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'inactive' || nextAppState === 'background') {
        saveData();
      }
    };

    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      saveData(); // Ensure data is saved when component unmounts
      appStateSubscription.remove();
    };
  }, [saveData]);

  useEffect(() => {
    if (!isProfileFetched) {
      fetchUserProfile();
    }
  }, [isProfileFetched]);


  const addInputFields = async () => {
    try {
      // Calculate total consumed calories
      const totalConsumedCalories = inputs.reduce((total, input) => {
        const calValue = parseFloat(input.cal) || 0;
        return total + calValue;
      }, 0);
      
      let newRemainingCalories;
      if(remaningCalories === 0 || isNaN(remaningCalories)) {
      // Calculate remaining calories
       newRemainingCalories = initialCalories - totalConsumedCalories;
      setRemaningCalories(newRemainingCalories);
      }else{
         newRemainingCalories = remaningCalories - totalConsumedCalories;
        setRemaningCalories(newRemainingCalories);
      }
      // Update remaining calories in the database
      if (userId) {
        await axios.post('https://backend-69iy.onrender.com/user/updateRemaningCalories', {
          userId,
          remaningCalories: newRemainingCalories,
          inputs: inputs,
        });
      }
  
      setRemaningCalories(newRemainingCalories);

      // Add new input field
      setInputs([...inputs, { food: '', cal: '' }]);
    } catch (error) {
      console.error('Error updating remaining calories:', error);
    }
  };
  

  const handleChange = (index: number, field: 'food' | 'cal', value: string) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
    console.log('newinputs', newInputs);
  };


  const toggleWaterColor = (index: number) => {
    const newColors = [...waterColors];
    newColors[index] = newColors[index] === 'blue' ? 'gray' : 'blue';
    setWaterColors(newColors);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.header, { fontSize: width * 0.27 }]}>
        {isProfileFetched ? Math.floor(remaningCalories) : ' '}
      </Text>

      {inputs.map((input, index) => (
        <View key={index} style={styles.inputContainer}>
          <TextInput
            style={input.food ? [styles.inputWithText, { width: width * 0.4 }] : [styles.input, { width: width * 0.4 }]}
            placeholder="אוכל"
            value={input.food}
            onChangeText={(value) => handleChange(index, 'food', value)}
            textAlign="right"
            textAlignVertical="center"
            placeholderTextColor="gray"
          />
          <TextInput
            style={input.cal ? [styles.inputWithText, { width: width * 0.4 }] : [styles.input, { width: width * 0.4 }]}
            placeholder="קלוריות"
            value={input.cal}
            keyboardType="numeric"
            onChangeText={(value) => handleChange(index, 'cal', value)}
            textAlign="right"
            textAlignVertical="center"
            placeholderTextColor="gray"
          />
        </View>
      ))}

      <TouchableOpacity style={styles.plusButton} onPress={addInputFields}>
        <Image source={pencilIcon} style={[styles.pencilIcon, { width: width * 0.1, height: width * 0.15 }]} />
      </TouchableOpacity>

      <View style={[styles.waterContainer, { width: '100%' }]}>
        {waterColors.map((color, index) => (
          <TouchableOpacity key={index} onPress={() => toggleWaterColor(index)}>
            <Image
              source={color === 'blue' ? fullGlass : emptyGlass}
              style={[styles.waterImage, { width: width * 0.12, height: width * 0.12 }]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    height: '100%',
    backgroundColor: 'white',
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: '90%',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    marginHorizontal: '2.5%',
    height: 40,
  },
  inputWithText: {
    borderWidth: 0,
    paddingVertical: 10,
    paddingHorizontal: 65,
    textAlign: 'center',
    textAlignVertical: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    marginHorizontal: '2.5%',
    height: 40,
  },
  plusButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    backgroundColor: 'white',
  },
  pencilIcon: {
    resizeMode: 'contain',
  },
  waterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  waterImage: {
    marginHorizontal: '0%',
  },
});

export default HomePage;