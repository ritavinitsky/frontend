import React, { FC, useState, useEffect } from 'react';
import { View,ScrollView, Text, Button, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import UserApi from '../api/UserApi';
import Slider from '@react-native-community/slider';  // You need to install this library
import { Picker } from '@react-native-picker/picker';


const Program: FC<{ route: any, navigation: any }> = ({ navigation, route }) => {
  const [gender, setGender] = useState<string>('');
  const [height, setHeight] = useState<number>(160);  // Default value as a number
  const [weight, setWeight] = useState<number>(60);   // Default value as a number
  const [age, setAge] = useState<number>(25);         // Default value as a number
  const [activityLevel, setActivityLevel] = useState<string>('sedentary');
  const [targetWeight, setTargetWeight] = useState<number>(55);  // Default value as a number
  const [targetTime, setTargetTime] = useState<number>(12);      // Default value as a number
  const [dailyCalories, setDailyCalories] = useState<number>(0);
  const [user_name, onChangeName] = useState('');
  const [user_age, onChangeAge] = useState('');
  const [user_email, onChangeEmail] = useState('');

  const [maleImage, setMaleImage] = useState(require('../assets/bluemale.jpg'));
  const [femaleImage, setFemaleImage] = useState(require('../assets/pinkfemale.jpg'));

  const calculateCalories = () => {
    // No changes needed here
    const weightNum = weight;
    const heightNum = height;
    const ageNum = age;
    const targetWeightNum = targetWeight;
    const targetTimeNum = targetTime;

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
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);
    const ageNum = parseFloat(age);
    const targetWeightNum = parseFloat(targetWeight);
    const targetTimeNum = parseInt(targetTime);
    const res = calculateCalories();
  
    const bmi = targetWeightNum / ((heightNum / 100) * (heightNum / 100));
  
    // Check if BMI is too low
    if (bmi < 18.5) {
      alert("משקל היעד נמוך ביחס לגובה")
      return; 
    }
  
    // Check if the weight change is reasonable for the target time
    const weightDifference = Math.abs(weightNum - targetWeightNum);
    const requiredWeeklyLoss = weightDifference / targetTimeNum; 

    
  
    if (requiredWeeklyLoss > 0.5) {
      alert('הזמן שהוקצב לתהליך קצר מדי עבור משקל היעד. אנא הגדל את זמן התהליך.');
      return; 
    }
  
    // Check for minimum calories
  if (gender === 'female' && res < 1200) {
    alert("כמות הקלוריות נמוכה מדי. עליך להגדיל את זמן התהליך או את משקל היעד.");
    return;
  }
  if (gender === 'male' && res < 1500) {
    alert("כמות הקלוריות נמוכה מדי. עליך להגדיל את זמן התהליך או את משקל היעד.");
    return;
  }
  
    const result = await UserApi.updateUser(
      { id: route.params.user_id, email: user_email, name: user_name, age: user_age, dailyCal: res },
      route.params.refreshToken
    );
  
    if (result) {
      console.log('הפרופיל עודכן בהצלחה');
    } else {
      console.log('שגיאה');
    }
  };

  const renderValueAboveThumb = (value: number) => (
    <View style={styles.valueContainer}>
      <Text style={styles.valueText}>{Math.round(value)}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>

    <View style={styles.container}>
      <View style={styles.gender}>
        <TouchableOpacity 
          style={styles.hover} 
          onPress={() => { 
            setGender('male'); 
            setMaleImage(require('../assets/bluemale.jpg')); 
            setFemaleImage(require('../assets/female.jpg')); 
          }}
        >
          <Image source={maleImage} style={styles.genderImage} resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.hover} 
          onPress={() => { 
            setGender('female'); 
            setFemaleImage(require('../assets/pinkfemale.jpg')); 
            setMaleImage(require('../assets/male.jpg')); 
          }}
        >
          <Image source={femaleImage} style={styles.genderImage} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>גיל</Text>
      <View style={styles.sliderContainer}>
        {renderValueAboveThumb(age)}
        <Slider
          style={styles.slider}
          minimumValue={16}
          maximumValue={80}
          value={age}
          onValueChange={setAge}
          minimumTrackTintColor="#d3d3d3"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#000"
        />
      </View>

      <Text style={styles.label}>גובה (cm)</Text>
      <View style={styles.sliderContainer}>
        {renderValueAboveThumb(height)}
        <Slider
          style={styles.slider}
          minimumValue={100}
          maximumValue={220}
          value={height}
          step={1}
          onValueChange={setHeight}
          minimumTrackTintColor="#d3d3d3"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#000"
        />
      </View>

      <Text style={styles.label}>משקל (kg)</Text>
      <View style={styles.sliderContainer}>
        {renderValueAboveThumb(weight)}
        <Slider
          style={styles.slider}
          minimumValue={40}
          maximumValue={170}
          value={weight}
          step={1}
          onValueChange={setWeight}
          minimumTrackTintColor="#d3d3d3"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#000"
        />
      </View>

      <Text style={styles.label}>משקל יעד (kg)</Text>
      <View style={styles.sliderContainer}>
        {renderValueAboveThumb(targetWeight)}
        <Slider
          style={styles.slider}
          minimumValue={40}
          maximumValue={130}
          value={targetWeight}
          step={1}
          onValueChange={setTargetWeight}
          minimumTrackTintColor="#d3d3d3"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#000"
        />
      </View>

      <Text style={styles.label}>זמן  (שבועות)</Text>
      <View style={styles.sliderContainer}>
        {renderValueAboveThumb(targetTime)}
        <Slider
          style={styles.slider}
          minimumValue={4}
          maximumValue={52}
          value={targetTime}
          step={1}
          onValueChange={setTargetTime}
          minimumTrackTintColor="#d3d3d3"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#000"
        />
      </View>

      <Text style={[styles.label, { textAlign: 'right' }]}>רמת פעילות</Text>
<View style={styles.pickerWrapper}>
  <Picker
    selectedValue={activityLevel}
    style={styles.picker}
    onValueChange={(itemValue) => setActivityLevel(itemValue)}
    mode="dropdown"
  >
    <Picker.Item label="אין פעילות" value="sedentary" />
    <Picker.Item label="קלה" value="light" />
    <Picker.Item label="בינונית" value="moderate" />
    <Picker.Item label="גבוהה" value="active" />
    <Picker.Item label="גבוהה מאוד" value="very active" />
  </Picker>
</View>

      <View style={styles.buttonContainer}>
  <Text style={styles.saveButton} onPress={onSave}>
    אישור
  </Text>
</View>
      
    </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  gender: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 20,
  },
  hover: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  genderImage: {
    width: 85,
    height: 85,
  },
  slider: {
    width: '100%',
    height: 40,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#000',
    color: '#fff',
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sliderContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  valueContainer: {
    position: 'absolute',
    top: -30,
    backgroundColor: 'transparent',
    padding: 5,
    alignItems: 'center',
  },
  valueText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center', // Centers the button horizontally
    marginTop: 20, // Optional, to add some space above the button
  },
  saveButton: {
    backgroundColor: '#000',
    color: '#fff',
    padding: 10,
    textAlign: 'center',
    borderRadius: 8,
    fontSize: 18,
    fontWeight: 'bold',
    width: '80%',
  },
  pickerWrapper: {
    position: 'relative',
    backgroundColor: '#f0f0f0',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor:"transparent",
    borderWidth: 0,      // Maintain the border width
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 14, // Font size is set to 12
    textAlign: 'right',
  },
  pickerItem: {
    fontSize: 18, // Larger font size for emphasis
    fontWeight: 'bold', // Bold text
    textAlign: 'right', // Align text to the right
    color: '#000', // Text color (black)
  },
  
 
});

export default Program;