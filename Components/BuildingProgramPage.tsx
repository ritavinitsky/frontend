import React, { FC ,useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Program: FC<{ route: any, navigation: any }> = ({ navigation, route }) => {
    const [gender, setGender] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<string>('');
  const [targetWeight, setTargetWeight] = useState<string>('');
  const [targetTime, setTargetTime] = useState<string>('');
  const [dailyCalories, setDailyCalories] = useState<number | null>(null);

  const calculateCalories = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseInt(age);
    const targetWeightNum = parseFloat(targetWeight);
    const targetTimeNum = parseInt(targetTime);
    
    let bmr: number;

    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weightNum) + (4.799 * heightNum) - (5.677 * ageNum);
    } else if (gender === 'female') {
      bmr = 447.593 + (9.247 * weightNum) + (3.098 * heightNum) - (4.330 * ageNum);
    } else {
      alert('Please enter a valid gender');
      return;
    }

    let activityMultiplier: number;

    switch (activityLevel) {
      case 'sedentary':
        activityMultiplier = 1.2;
        break;
      case 'light':
        activityMultiplier = 1.375;
        break;
      case 'moderate':
        activityMultiplier = 1.55;
        break;
      case 'active':
        activityMultiplier = 1.725;
        break;
      case 'very active':
        activityMultiplier = 1.9;
        break;
      default:
        alert('Please enter a valid activity level');
        return;
    }

    const dailyMaintenanceCalories = bmr * activityMultiplier;
    const totalCaloriesNeeded = dailyMaintenanceCalories * 7 * targetTimeNum;
    const totalCaloricDeficit = (weightNum - targetWeightNum) * 7700;
    const dailyCaloricIntake = (totalCaloriesNeeded - totalCaloricDeficit) / (7 * targetTimeNum);

    setDailyCalories(dailyCaloricIntake);
  };

  return (
    <View style={styles.container}>
      <Text>Gender (male/female):</Text>
      <TextInput style={styles.input} value={gender} onChangeText={setGender} />
      
      <Text>Height (cm):</Text>
      <TextInput style={styles.input} value={height} onChangeText={setHeight} keyboardType="numeric" />
      
      <Text>Weight (kg):</Text>
      <TextInput style={styles.input} value={weight} onChangeText={setWeight} keyboardType="numeric" />
      
      <Text>Age:</Text>
      <TextInput style={styles.input} value={age} onChangeText={setAge} keyboardType="numeric" />
      
      <Text>Activity Level (sedentary, light, moderate, active, very active):</Text>
      <TextInput style={styles.input} value={activityLevel} onChangeText={setActivityLevel} />
      
      <Text>Target Weight (kg):</Text>
      <TextInput style={styles.input} value={targetWeight} onChangeText={setTargetWeight} keyboardType="numeric" />
      
      <Text>Target Time (weeks):</Text>
      <TextInput style={styles.input} value={targetTime} onChangeText={setTargetTime} keyboardType="numeric" />
      
      <Button title="Submit" onPress={calculateCalories} />
      
      {dailyCalories !== null && (
        <Text>Daily Caloric Intake: {dailyCalories.toFixed(2)} kcal</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});
 
export default Program;
