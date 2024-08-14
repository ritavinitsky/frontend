import React, { FC, useState,useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import UserApi from '../api/UserApi';

const Program: FC<{ route: any, navigation: any }> = ({ navigation, route }) => {
  const [gender, setGender] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<string>('');
  const [targetWeight, setTargetWeight] = useState<string>('');
  const [targetTime, setTargetTime] = useState<string>('');
  const [dailyCalories, setDailyCalories] = useState<number>(0);
  const [user_name, onChangeName] = useState('');
  const [user_age, onChangeAge] = useState('');
  const [user_email, onChangeEmail] = useState('');
  

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
      alert('אנא הכנס מין תקף');
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
        alert('אנא הכנס רמת פעילות תקפה');
        return;
    }

    const dailyMaintenanceCalories = bmr * activityMultiplier;
    const totalCaloriesNeeded = dailyMaintenanceCalories * 7 * targetTimeNum;
    const totalCaloricDeficit = (weightNum - targetWeightNum) * 7700;
    const dailyCaloricIntake = (totalCaloriesNeeded - totalCaloricDeficit) / (7 * targetTimeNum);

    setDailyCalories(dailyCaloricIntake);
    console.log("inside calculateCalories end " + dailyCaloricIntake);
    return dailyCaloricIntake;
    
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const result = await UserApi.getUser(route.params.user_id, route.params.refreshToken);
      if (result) {
        onChangeName(result.currentUser.name);
        onChangeEmail(result.currentUser.email);
        onChangeAge(result.currentUser.age);
      } else {
        Alert.alert('שגיאה', 'נכשל בטעינת פרופיל המשתמש');
      }
    };
    fetchUserProfile();
    console.log("inside useEffect");
    
  }, []);


  const user = route.params.user;
  const onSave = async () => {
    const res = calculateCalories();
    
    const result = await UserApi.updateUser(
      { id: route.params.user_id, email: user_email, name: user_name, age: user_age, dailyCal: res },
      route.params.refreshToken
    );
    if (result ) {
      console.log( 'הפרופיל עודכן בהצלחה');
    } else {
      console.log('שגיאה');
    }
    };


  


  return (
    <View style={styles.container}>
      <Text>מין (זכר/נקבה):</Text>
      <TextInput style={styles.input} value={gender} onChangeText={setGender} />
      
      <Text>גובה (ס"מ):</Text>
      <TextInput style={styles.input} value={height} onChangeText={setHeight} keyboardType="numeric" />
      
      <Text>משקל (ק"ג):</Text>
      <TextInput style={styles.input} value={weight} onChangeText={setWeight} keyboardType="numeric" />
      
      <Text>גיל:</Text>
      <TextInput style={styles.input} value={age} onChangeText={setAge} keyboardType="numeric" />
      
      <Text>רמת פעילות (יושבני, קל, מתון, פעיל, פעיל מאוד):</Text>
      <TextInput style={styles.input} value={activityLevel} onChangeText={setActivityLevel} />
      
      <Text>משקל יעד (ק"ג):</Text>
      <TextInput style={styles.input} value={targetWeight} onChangeText={setTargetWeight} keyboardType="numeric" />
      
      <Text>זמן יעד (שבועות):</Text>
      <TextInput style={styles.input} value={targetTime} onChangeText={setTargetTime} keyboardType="numeric" />
      
      <Button title="שלח" onPress={onSave} />
      
      {dailyCalories !== null && (
        <Text>צריכת קלוריות יומית: {dailyCalories.toFixed(2)} קלוריות</Text>
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
