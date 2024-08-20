import React, { FC, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

const Calculators: FC<{ route: any, navigation: any }> = ({ navigation, route }) => {
    const [weight, setWeight] = useState<number>(40);
    const [height, setHeight] = useState<number>(100);
    const [age, setAge] = useState<number>(16);
    const [gender, setGender] = useState<string>('male');
    const [bmi, setBmi] = useState<number | null>(null);
    const [bmr, setBmr] = useState<number | null>(null);
    const [maleImage, setMaleImage] = useState(require('../assets/bluemale.jpg'));
    const [femaleImage, setFemaleImage] = useState(require('../assets/pinkfemale.jpg'));

    const calculateBMI = () => {
        const weightInKg = weight;
        const heightInMeters = height / 100;
        if (weightInKg && heightInMeters) {
            const bmiValue = weightInKg / (heightInMeters * heightInMeters);
            setBmi(bmiValue);
        }
    };

    const calculateBMR = () => {
        const weightInKg = weight;
        const heightInCm = height;
        const ageInYears = age;
        if (weightInKg && heightInCm && ageInYears && gender) {
            let bmrValue: number;
            if (gender === 'male') {
                bmrValue = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * ageInYears);
            } else if (gender === 'female') {
                bmrValue = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * ageInYears);
            }
            setBmr(Math.round(bmrValue));  // עיגול תוצאת ה-BMR למספר שלם
        }
    };

    const renderValueAboveThumb = (value: number) => (
        <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{Math.round(value)}</Text>
        </View>
    );

    const getBmiCategory = (bmi: number): string => {
        if (bmi < 18.5) return 'תת משקל';
        if (bmi >= 18.5 && bmi < 25) return 'משקל תקין';
        if (bmi >= 25 && bmi < 30) return 'עודף משקל';
        if (bmi >= 30 && bmi < 35) return 'השמנה דרגה 1';
        if (bmi >= 35 && bmi < 40) return 'השמנה דרגה 2';
        return 'השמנה דרגה 3';
    };

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
                        step={1}
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

                <View style={styles.buttonContainer}>
                    <Text style={styles.saveButton} onPress={calculateBMI}>
                        חשב BMI
                    </Text>
                </View>
                {bmi !== null && (
                    <View style={styles.resultContainer}>
                        <Text style={styles.heading}>{bmi.toFixed(1)}</Text>
                        <Text style={styles.bmiCategory}>{getBmiCategory(bmi)}</Text>
                    </View>
                )}

                <View style={styles.buttonContainer}>
                    <Text style={styles.saveButton} onPress={calculateBMR}>
                        חשב BMR
                    </Text>
                </View>
                {bmr !== null && (
                    <Text style={styles.heading}>{bmr} קלוריות ליום</Text>
                )}

                <Text style={styles.heading}>BMI (Body Mass Index)</Text>
                <Text style={styles.description}>
                    מדד זה משמש להערכה כללית של הרכב הגוף, ומסייע לקבוע אם האדם נמצא במשקל תקין, תת משקל, עודף משקל או השמנה.
                </Text>

                <Text style={styles.heading}>BMR (Basal Metabolic Rate)</Text>
                <Text style={styles.description}>
                    זהו מספר הקלוריות שהגוף זקוק להן במצב מנוחה מוחלט כדי לשמור על תפקוד רגיל, כמו פעימות לב ונשימה.
                </Text>

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
    heading: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
        color: '#333',
    },
    description: {
        fontSize: 12,
        color: '#333',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    gender: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 20,
    },
    hover: {
        alignItems: 'center',
        marginHorizontal: 5,
    },
    genderImage: {
        width: 70,
        height: 70,
    },
    slider: {
        width: '100%',
        height: 40,
        marginVertical: 10,
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
        alignItems: 'center',
        marginVertical: 10,
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
    result: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 10,
        color: '#333',
    },
    resultContainer: {
        marginVertical: 20, // Adjust this value to control spacing
        alignItems: 'center',
    },
    bmiCategory: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default Calculators;