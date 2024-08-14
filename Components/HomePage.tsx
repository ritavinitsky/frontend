import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import UserApi from '../api/UserApi';

const HomePage: FC<{ route: any, navigation: any }> = ({ navigation, route }) =>{
  const [inputs, setInputs] = useState([{ food: '', cal: '' }]);
  const [waterColors, setWaterColors] = useState(Array(8).fill('blue'));
  const [remainingCalories, setRemainingCalories] = useState('200');
  const [caloriesDepleted, setCaloriesDepleted] = useState(false); // Flag to track if calories have reached zero



  useEffect(() => {
    const fetchUserProfile = async () => {
      const result = await UserApi.getUser(route.params.user_id, route.params.refreshToken);
      console.log('Fetched User Data:', result); // Log the result
      if (result) {
        setRemainingCalories(result.currentUser.dailyCal);
        
      } else {
        alert('שגיאה', 'נכשל בטעינת פרופיל המשתמש');
      }
    };
    fetchUserProfile();
    console.log("inside useEffect");
    
  }, []);

  
  // console.log("remainingCalories:",remainingCalories);


  // Reset time at 12 AM (midnight)
  const resetHour = 0; // 0 is 12 AM (midnight)

  useEffect(() => {
    const now = new Date();
    const timeUntilReset = getNextResetTime(now);

    const timer = setTimeout(() => {
      resetState();
    }, timeUntilReset);

    return () => clearTimeout(timer);
  }, []);

  const getNextResetTime = (currentDate) => {
    const resetTime = new Date(currentDate);
    resetTime.setHours(resetHour, 0, 0, 0); // Set to 12 AM (midnight)

    if (resetTime <= currentDate) {
      resetTime.setDate(resetTime.getDate() + 1); // Move to next day if it's already past reset time today
    }

    return resetTime - currentDate; // Return time difference in milliseconds
  };

  const resetState = () => {
    console.log('State Reset at:', new Date()); // Log the date and time of the reset
    setInputs([{ food: '', cal: '' }]);
    setWaterColors(Array(8).fill('blue'));
    setRemainingCalories(initialCalories);
    setCaloriesDepleted(false); // Reset the flag for the next day
  };

  const addInputFields = () => {
    setInputs([...inputs, { food: '', cal: '' }]);
  };

  const handleChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
    updateRemainingCalories(newInputs);
  };

  const updateRemainingCalories = (newInputs) => {
    let totalCal = initialCalories;
    newInputs.forEach((input) => {
      if (input.cal && !isNaN(input.cal)) {
        totalCal -= parseInt(input.cal);
      }
    });

    // Ensure remainingCalories does not go below 0
    if (totalCal < 0) {
      totalCal = 0;
    }

    setRemainingCalories(totalCal);

    // Check if remaining calories have reached zero
    if (totalCal === 0 && !caloriesDepleted) {
      setCaloriesDepleted(true);
      console.log('Calories depleted for today:', new Date()); // Log when calories are depleted for the day
      // You can perform additional actions here, such as saving to storage or triggering notifications
    }
  };

  const toggleWaterColor = (index) => {
    const newColors = [...waterColors];
    newColors[index] = newColors[index] === 'blue' ? 'gray' : 'blue';
    setWaterColors(newColors);
  };



  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{remainingCalories}</Text>
      
      {inputs.map((input, index) => (
        <View key={index} style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Food" 
            value={input.food} 
            onChangeText={(value) => handleChange(index, 'food', value)} 
          />
          <TextInput 
            style={styles.input} 
            placeholder="Calories" 
            value={input.cal} 
            keyboardType="numeric" 
            onChangeText={(value) => handleChange(index, 'cal', value)} 
          />
        </View>
      ))}
      
      <Button title="+" onPress={addInputFields} />

      <View style={styles.waterContainer}>
        {waterColors.map((color, index) => (
          <TouchableOpacity key={index} onPress={() => toggleWaterColor(index)}>
            <MaterialIcons name="local-drink" size={24} color={color} style={{ marginRight: 10 }} />
          </TouchableOpacity>
        ))}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
    padding: 10,
    flex: 1,
  },
  waterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default HomePage;
