// import React, { FC, useState, useEffect } from 'react';
// import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableOpacity, Alert, Button } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons';
// import UserApi from '../api/UserApi';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const { width: screenWidth } = Dimensions.get('window');

// const FoodMenu: FC<{ route: any, navigation: any }> = ({ navigation, route }) => {
//     const [recipes, setRecipes] = useState<any[]>([]);
//     const [allRecipes, setAllRecipes] = useState<any[]>([]); // Store all recipes for filtering
//     const [starCounts, setStarCounts] = useState<number[]>([]);

//     const [veganRecipes, setVeganRecipes] = useState<any[]>([]); // Store vegan recipes
//     const [vegetarianRecipes, setVegetarianRecipes] = useState<any[]>([]); // Store vegetarian recipes

//     const [user, setUser] = useState(null);
//     const [calorieRange, setCalorieRange] = useState<string>(''); // State for calorie range
//     const [isVegetarian, setIsVegetarian] = useState<boolean>(false); // State for vegetarian filter
//     const [isVegan, setIsVegan] = useState<boolean>(false); // State for vegan filter

//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             const result = await UserApi.getUser(route.params.user_id, route.params.refreshToken);
//             if (result) {
//                 console.log('result-foodcom:', result);
//                 setUser(result);
//             } else {
//                 Alert.alert('שגיאה', 'נכשל בטעינת פרופיל המשתמש');
//             }
//         };

//         const fetchRecipes = async () => {
//             try {
//                 const response = await fetch('https://backend-69iy.onrender.com/api/recipes');
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const data = await response.json();
//                 setAllRecipes(data); // Store all recipes
//                 setRecipes(data); // Set the initially displayed recipes

//                 // Load star counts from AsyncStorage
//                 const storedStarCounts = await AsyncStorage.getItem('starCounts');
//                 if (storedStarCounts) {
//                     setStarCounts(JSON.parse(storedStarCounts));
//                 } else {
//                     setStarCounts(Array(data.length).fill(0)); // Initialize star counts if not found in AsyncStorage
//                 }

//                 const veganFiltered = data.filter(recipe => recipe.isVegan === 'true');
//                 setVeganRecipes(veganFiltered);

//                 const vegeterianFiltered = data.filter(recipe => recipe.isVegetarian === 'true');
//                 setVegetarianRecipes(vegeterianFiltered);
//             } catch (error) {
//                 console.error("Error fetching recipes:", error);
//             }
//         };

//         fetchUserProfile().then(fetchRecipes);
//     }, [route.params.user_id, route.params.refreshToken]);

//     const handleCalorieFilter = (range: string) => {
//         setCalorieRange(range);
//         let filteredRecipes = allRecipes;

//         if (range) {
//             const [minCal, maxCal] = range.split('-').map(Number);
//             filteredRecipes = filteredRecipes.filter(recipe => recipe.cal >= minCal && recipe.cal <= maxCal);
//         }

//         if (isVegan) {
//             filteredRecipes = filteredRecipes.filter(recipe => recipe.isVegan === 'true');
//         }

//         if (isVegetarian) {
//             filteredRecipes = filteredRecipes.filter(recipe => recipe.isVegetarian === 'true');
//         }

//         setRecipes(filteredRecipes); // Update the displayed recipes
//     };

//     const handleVeganFilter = () => {
//         if (!isVegan) {
//             setIsVegan(true);
//             setIsVegetarian(false); // Deactivate vegetarian filter
//             const filteredRecipes = allRecipes.filter(recipe => recipe.isVegan === 'true');
//             setRecipes(filteredRecipes); // Update the displayed recipes
//         } else {
//             setIsVegan(false);
//             handleCalorieFilter(calorieRange); // Reapply calorie filter
//         }
//     };

//     const handleVegetarianFilter = () => {
//         if (!isVegetarian) {
//             setIsVegetarian(true);
//             setIsVegan(false); // Deactivate vegan filter
//             const filteredRecipes = allRecipes.filter(recipe => recipe.isVegetarian === 'true');
//             setRecipes(filteredRecipes); // Update the displayed recipes
//         } else {
//             setIsVegetarian(false);
//             handleCalorieFilter(calorieRange); // Reapply calorie filter
//         }
//     };

//     const toggleStarColor = async (recipeIndex: number, starIndex: number) => {
//         const updatedStarCounts = [...starCounts];
//         updatedStarCounts[recipeIndex] = starIndex + 1; // Set stars from 1 to the clicked star index

//         setStarCounts(updatedStarCounts);

//         // Save the updated star counts to AsyncStorage
//         await AsyncStorage.setItem('starCounts', JSON.stringify(updatedStarCounts));
//     };

//     const images = {
//         'pancake.jpg': require('../assets/pancake.jpg'),
//         'pasta.webp': require('../assets/pasta.webp'),
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.dietFilterContainer}>
//                 <Button 
//                     title={isVegetarian ? "Remove Vegetarian Filter" : "Vegetarian"}
//                     onPress={handleVegetarianFilter} 
//                 />

//                 <Button 
//                     title={isVegan ? "Remove Vegan Filter" : "Vegan"}
//                     onPress={handleVeganFilter} 
//                 />
//             </View>

//             <View style={styles.filterContainer}>
//                 <Button title="200-300 Calories" onPress={() => handleCalorieFilter('200-300')} />
//                 <Button title="300-400 Calories" onPress={() => handleCalorieFilter('300-400')} />
//                 <Button title="All Recipes" onPress={() => handleCalorieFilter('')} />
//             </View>

//             <FlatList
//                 data={recipes}
//                 keyExtractor={(item) => item._id}
//                 renderItem={({ item, index }) => (
//                     <View style={styles.recipeContainer}>
//                         <Image source={images[item.img]} style={styles.image} />
//                         <Text style={styles.recipeName}>{item.name}</Text>
//                         <Text style={styles.recipeDetail}>
//                             <Text style={styles.bold}>Ingredients:</Text> {'\n'}{item.ingredients}
//                         </Text>
//                         <Text style={styles.recipeDetail}>
//                             <Text style={styles.bold}>Instructions:</Text> {'\n'} {item.instructions}
//                         </Text>
//                         <Text style={styles.recipeDetail}> Calories: {item.cal} </Text>

//                         <View style={styles.starContainer}>
//                             {[...Array(5)].map((_, starIndex) => (
//                                 <TouchableOpacity key={starIndex} onPress={() => toggleStarColor(index, starIndex)}>
//                                     <MaterialIcons
//                                         name={starIndex < starCounts[index] ? 'star' : 'star-border'}
//                                         size={24}
//                                         color={starIndex < starCounts[index] ? 'yellow' : 'lightgray'}
//                                         style={{ marginRight: 10 }}
//                                     />
//                                 </TouchableOpacity>
//                             ))}
//                         </View>
//                     </View>
//                 )}
//                 contentContainerStyle={styles.listContent}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingHorizontal: 10,
//         backgroundColor: '#f5f5f5',
//     },
//     filterContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         margin: 20,
//     },
//     dietFilterContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         margin: 20,
//     },
//     recipeContainer: {
//         borderBottomWidth: 1,
//         width: '100%',
//         alignItems: 'center',
//         marginBottom: 20,
//         padding: 10,
//         backgroundColor: '#fff',
//         borderRadius: 8,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     recipeName: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         marginVertical: 5,
//     },
//     recipeDetail: {
//         fontSize: 16,
//         textAlign: 'right',
//         width: '100%',
//         marginVertical: 5,
//     },
//     image: {
//         width: screenWidth * 0.9,
//         height: 200,
//         marginBottom: 10,
//         borderRadius: 8,
//     },
//     bold: {
//         fontWeight: 'bold',
//     },
//     listContent: {
//         paddingBottom: 20,
//     },
//     starContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: 20,
//     },
// });

// export default FoodMenu;



import React, { FC, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import UserApi from '../api/UserApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: screenWidth } = Dimensions.get('window');

const FoodMenu: FC<{ route: any, navigation: any }> = ({ navigation, route }) => {
    const [recipes, setRecipes] = useState<any[]>([]);
    const [allRecipes, setAllRecipes] = useState<any[]>([]); // Store all recipes for filtering
    const [starCounts, setStarCounts] = useState<number[]>([]);

    const [veganRecipes, setVeganRecipes] = useState<any[]>([]); // Store vegan recipes
    const [vegetarianRecipes, setVegetarianRecipes] = useState<any[]>([]); // Store vegetarian recipes

    const [user, setUser] = useState(null);
    const [calorieRange, setCalorieRange] = useState<string>(''); // State for calorie range
    const [isVegetarian, setIsVegetarian] = useState<boolean>(false); // State for vegetarian filter
    const [isVegan, setIsVegan] = useState<boolean>(false); // State for vegan filter
    const [showFilters, setShowFilters] = useState<boolean>(false); // State to control visibility of filters

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

                // Load star counts from AsyncStorage
                const storedStarCounts = await AsyncStorage.getItem('starCounts');
                if (storedStarCounts) {
                    setStarCounts(JSON.parse(storedStarCounts));
                } else {
                    setStarCounts(Array(data.length).fill(0)); // Initialize star counts if not found in AsyncStorage
                }

                const veganFiltered = data.filter(recipe => recipe.isVegan === 'true');
                setVeganRecipes(veganFiltered);

                const vegeterianFiltered = data.filter(recipe => recipe.isVegetarian === 'true');
                setVegetarianRecipes(vegeterianFiltered);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };

        fetchUserProfile().then(fetchRecipes);

        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
                    <Image source={require('../assets/filtering.jpg')} style={{ width: 24, height: 24, marginRight: 15 }} />
                </TouchableOpacity>
            ),
        });

    }, [route.params.user_id, route.params.refreshToken,navigation, showFilters]);

    const handleCalorieFilter = (range: string) => {
        setCalorieRange(range);
        let filteredRecipes = allRecipes;

        if (range) {
            const [minCal, maxCal] = range.split('-').map(Number);
            filteredRecipes = filteredRecipes.filter(recipe => recipe.cal >= minCal && recipe.cal <= maxCal);
        }

        if (isVegan) {
            filteredRecipes = filteredRecipes.filter(recipe => recipe.isVegan === 'true');
        }

        if (isVegetarian) {
            filteredRecipes = filteredRecipes.filter(recipe => recipe.isVegetarian === 'true');
        }

        setRecipes(filteredRecipes); // Update the displayed recipes
    };

    const handleVeganFilter = () => {
        if (!isVegan) {
            setIsVegan(true);
            setIsVegetarian(false); // Deactivate vegetarian filter
            const filteredRecipes = allRecipes.filter(recipe => recipe.isVegan === 'true');
            setRecipes(filteredRecipes); // Update the displayed recipes
        } else {
            setIsVegan(false);
            setRecipes(allRecipes); // Reapply calorie filter
        }
    };

    const handleVegetarianFilter = () => {
        if (!isVegetarian) {
            setIsVegetarian(true);
            setIsVegan(false); // Deactivate vegan filter
            const filteredRecipes = allRecipes.filter(recipe => recipe.isVegetarian === 'true');
            setRecipes(filteredRecipes); // Update the displayed recipes
        } else {
            setIsVegetarian(false);
            setRecipes(allRecipes); // Reset to all recipes
        }
    };

    const toggleStarColor = async (recipeIndex: number, starIndex: number) => {
        const updatedStarCounts = [...starCounts];
        updatedStarCounts[recipeIndex] = starIndex + 1; // Set stars from 1 to the clicked star index

        setStarCounts(updatedStarCounts);

        // Save the updated star counts to AsyncStorage
        await AsyncStorage.setItem('starCounts', JSON.stringify(updatedStarCounts));
    };

    const images = {
        'burekas.png': require('../assets/burekas.jpg'),
        'pizza.png': require('../assets/pizza.jpg'),
        'kinoasalat.png': require('../assets/kinoasalat.jpg'),
        'mukpaz.png': require('../assets/mukpaz.jpg'),
        'marakadashim.png': require('../assets/marakadashim.jpg'),
        'havita.png': require('../assets/havita.jpg'),
        'granola.png': require('../assets/granola.jpg'),
        'shake.png': require('../assets/shake.jpg'),
        'salmon.jpg': require('../assets/salmon.jpg'),
        'tostavocado.png': require('../assets/tostavocado.jpg'),
        'hatifgranola.png': require('../assets/hatifgranola.jpg'),
        'shake2.png': require('../assets/shake2.jpg')
    };

    return (
        <View style={styles.container}>
            {showFilters && (
                <>
                    <View style={styles.dietFilterContainer}>
                        <TouchableOpacity style={styles.blackButton} onPress={handleVegetarianFilter}>
                            <Text style={styles.buttonText}>צמחוני</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.blackButton} onPress={handleVeganFilter}>
                            <Text style={styles.buttonText}>טבעוני</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.filterContainer}>
                        <TouchableOpacity style={styles.blackButton} onPress={() => handleCalorieFilter('200-300')}>
                            <Text style={styles.buttonText}>200-300 קלוריות</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.blackButton} onPress={() => handleCalorieFilter('300-400')}>
                            <Text style={styles.buttonText}>300-400 קלוריות</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.blackButton} onPress={() => handleCalorieFilter('')}>
                            <Text style={styles.buttonText}>הכל</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}

            <FlatList
                data={recipes}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => (
                    <View style={styles.recipeContainer}>
                        <View>
                            <Image source={images[item.img]} style={styles.image} />
                            {item.isVegan === 'true' && (
                                <Image source={require('../assets/vegan.jpg')} style={styles.iconInImage} />
                            )}
                            {item.isVegetarian === 'true' && (
                                <Image source={require('../assets/vegetarian.jpg')} style={styles.iconInImage} />
                            )}
                        </View>
                        <Text style={styles.recipeName}>{item.name}</Text>
                        <Text style={styles.recipeDetail}>
                            <Text style={styles.bold}>מרכיבים:</Text> {'\n'}{item.ingredients}
                        </Text>
                        <Text style={styles.recipeDetail}>
                            <Text style={styles.bold}>הוראות הכנה:</Text> {'\n'} {item.instructions}
                        </Text>
                        <Text style={styles.bold}>קלוריות:{item.cal} </Text>

                        <View style={styles.starContainer}>
                            {[...Array(5)].map((_, starIndex) => (
                                <TouchableOpacity key={starIndex} onPress={() => toggleStarColor(index, starIndex)}>
                                    <MaterialIcons
                                        name={starIndex < starCounts[index] ? 'star' : 'star-border'}
                                        size={24}
                                        color={starIndex < starCounts[index] ? '#FFD700' : 'lightgray'}
                                        style={{ marginRight: 10 }}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
    },
    recipeContainer: {
        marginBottom: 30,
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: '#fff',
    },
    recipeName: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'right',
    },
    recipeDetail: {
        fontSize: 16,
        marginBottom: 8,
        textAlign: 'right',
    },
    bold: {
        fontWeight: 'bold',
    },
    starContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 10,
    },
    filterContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 10,
        alignItems: 'center',
    },
    blackButton: {
        backgroundColor: 'black',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 5,
    },
    dietFilterContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    image: {
        width: screenWidth - 40,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 8,
        marginBottom: 10,
    },
    iconInImage: {
        width: 24,
        height: 24,
        position: 'absolute',
        bottom: 10,
        left: 5,
    }
});

export default FoodMenu;
