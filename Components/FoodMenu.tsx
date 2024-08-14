import React, { FC, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableOpacity, Alert, Button } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import UserApi from '../api/UserApi';

const { width: screenWidth } = Dimensions.get('window');

const FoodMenu: FC<{ route: any, navigation: any }> = ({ navigation, route }) => {
    const [recipes, setRecipes] = useState<any[]>([]);
    const [allRecipes, setAllRecipes] = useState<any[]>([]); // Store all recipes for filtering
    const [starCounts, setStarCounts] = useState<number[]>([]);
    const [user, setUser] = useState(null);
    const [calorieRange, setCalorieRange] = useState<string>(''); // State for calorie range
    const [isVegetarian, setIsVegetarian] = useState<boolean>(false); // State for vegetarian filter
    const [isVegan, setIsVegan] = useState<boolean>(false); // State for vegan filter

    useEffect(() => {
        const fetchUserProfile = async () => {
            const result = await UserApi.getUser(route.params.user_id, route.params.refreshToken);
            if (result) {
                console.log('result-foodcom:', result);
                setUser(result);
            } else {
                Alert.alert('שגיאה', 'נכשל בטעינת פרופיל המשתמש');
            }
        };

        const fetchRecipes = async () => {
            try {
                const response = await fetch('https://backend-69iy.onrender.com/api/recipes');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAllRecipes(data); // Store all recipes
                setRecipes(data); // Set the initially displayed recipes
                setStarCounts(Array(data.length).fill(0)); // Initialize star counts
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };

        fetchUserProfile().then(fetchRecipes);
    }, [route.params.user_id, route.params.refreshToken]);

    const handleCalorieFilter = (range: string) => {
        setCalorieRange(range);
        
        if (!range) {
            setRecipes(allRecipes); // Reset to all recipes
            return;
        }

        const [minCal, maxCal] = range.split('-').map(Number);
        const filteredRecipes = allRecipes.filter(recipe => {
            const calories = recipe.cal;
            return calories >= minCal && calories <= maxCal;
        });

        setRecipes(filteredRecipes); // Update the displayed recipes
    };

    const handleDietaryFilter = () => {
        let filteredRecipes = allRecipes;

        // If both filters are not active, return all recipes
        if (isVegetarian && isVegan) {
            filteredRecipes = allRecipes; // Show all recipes
        } else {
            // Filter based on vegetarian and/or vegan
            filteredRecipes = filteredRecipes.filter(recipe => {
                return (isVegetarian && recipe.isVegetarian) || (isVegan && recipe.isVegan);
            });
        }

        setRecipes(filteredRecipes); // Update the displayed recipes
    };

    const images = {
        'pancake.jpg': require('../assets/pancake.jpg'),
        'pasta.webp': require('../assets/pasta.webp'),
    };

    return (
        <View style={styles.container}>
            <View style={styles.dietFilterContainer}>
                <Button 
                    title={isVegetarian ? "remove vegatarian filter" : "vegetarian"}
                    onPress={() => {
                        setIsVegetarian(!isVegetarian);
                        {isVegetarian ? setRecipes(allRecipes) : setRecipes(allRecipes.filter(recipe => recipe.isVegetarian))}
                    }} 
                />
                <Button 
                    title={isVegan ?  "remove vegan filter" : "vegan"}
                    onPress={() => {
                        setIsVegan(!isVegan);
                        {isVegan ? setRecipes(allRecipes) : setRecipes(allRecipes.filter(recipe => recipe.isVegan))}
                    }} 
                />
            </View>

            <View style={styles.filterContainer}>
                <Button title="200-300 קלוריות" onPress={() => handleCalorieFilter('200-300')} />
                <Button title="300-400 קלוריות" onPress={() => handleCalorieFilter('300-400')} />
                <Button title="כל המתכונים" onPress={() => handleCalorieFilter('')} />
            </View>

            <FlatList
                data={recipes}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => (
                    <View style={styles.recipeContainer}>
                        <Image source={images[item.img]} style={styles.image} />
                        <Text style={styles.recipeName}>{item.name}</Text>
                        <Text style={styles.recipeDetail}>
                            <Text style={styles.bold}>מרכיבים:</Text> {'\n'}{item.ingredients}
                        </Text>
                        <Text style={styles.recipeDetail}>
                            <Text style={styles.bold}>הוראות:</Text> {'\n'} {item.instructions}
                        </Text>
                        <Text style={styles.recipeDetail}> קלוריות: {item.cal} </Text>

                        <View style={styles.starContainer}>
                            {[...Array(5)].map((_, starIndex) => (
                                <TouchableOpacity key={starIndex} onPress={() => toggleStarColor(index, starIndex)}>
                                    <MaterialIcons
                                        name={starIndex < starCounts[index] ? 'star' : 'star-border'}
                                        size={24}
                                        color={starIndex < starCounts[index] ? 'yellow' : 'lightgray'}
                                        style={{ marginRight: 10 }}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#f5f5f5',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 20,
    },
    dietFilterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 20,
    },
    recipeContainer: {
        borderBottomWidth: 1,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    recipeName: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 5,
    },
    recipeDetail: {
        fontSize: 16,
        textAlign: 'right',
        width: '100%',
        marginVertical: 5,
    },
    image: {
        width: screenWidth * 0.9,
        height: 200,
        marginBottom: 10,
        borderRadius: 8,
    },
    bold: {
        fontWeight: 'bold',
    },
    listContent: {
        paddingBottom: 20,
    },
    starContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
});

export default FoodMenu;
