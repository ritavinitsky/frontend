// BMRCBMICalculator.tsx
import React, { FC, useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';

const Calculators: FC<{ route: any, navigation: any }> = ({ navigation, route }) => {
    const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmr, setBmr] = useState<number | null>(null);

  const calculateBMI = () => {
    const weightInKg = parseFloat(weight);
    const heightInMeters = parseFloat(height) / 100;
    if (weightInKg && heightInMeters) {
      const bmiValue = weightInKg / (heightInMeters * heightInMeters);
      setBmi(bmiValue);
    }
  };

  const calculateBMR = () => {
    const weightInKg = parseFloat(weight);
    const heightInCm = parseFloat(height);
    const ageInYears = parseInt(age);
    if (weightInKg && heightInCm && ageInYears && gender) {
      let bmrValue: number;
      if (gender.toLowerCase() === 'male') {
        bmrValue = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * ageInYears);
      } else if (gender.toLowerCase() === 'female') {
        bmrValue = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * ageInYears);
      } else {
        return;
      }
      setBmr(bmrValue);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>מחשבון BMR ו-BMI</Text>
      
      <TextInput
        style={styles.input}
        placeholder="משקל בקילוגרמים"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      <TextInput
        style={styles.input}
        placeholder="גובה"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />
      <TextInput
        style={styles.input}
        placeholder="גיל"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="מין (male/female)"
        value={gender}
        onChangeText={setGender}
      />

      <View style={styles.buttonContainer}>
        <Button title="חשב BMI" onPress={calculateBMI} />
      </View>
      {bmi !== null && (
        <Text style={styles.result}>BMI שלך: {bmi.toFixed(2)}</Text>
      )}

      <View style={styles.buttonContainer}>
        <Button title="חשב BMR" onPress={calculateBMR} />
      </View>
      {bmr !== null && (
        <Text style={styles.result}>BMR שלך: {bmr.toFixed(2)} קלוריות ליום</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  result: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
  },
});

export default Calculators;
