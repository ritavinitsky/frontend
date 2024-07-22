import React, { FC, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';

const FoodMenu: FC<{ route: any, navigation: any }> = ({ navigation, route }) => {
    const [recipes, setRecipes] = useState<any[]>([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('https://backend-69iy.onrender.com/api/recipes'); // Ensure this matches the backend URL
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRecipes(data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };

        fetchRecipes();
    }, []);

    return (
        <>
            <Text style={styles.text}>מתכונים</Text>
            <FlatList 
                data={recipes}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.recipeContainer}>
                        <Image source={{ uri:"../assets"+"/"+ item.img }} style={styles.image} />
                        <Text style={styles.recipeName}>{item.name}</Text>
                        <Text style={styles.recipeDetail}><b>מרכיבים:</b> <br />{item.ingredients}</Text>
                        <Text style={styles.recipeDetail}><b>הוראות:</b> <br /> {item.instructions}</Text>
                    </View>
                )}
            />
        </>
    );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center', 
  },
  text: {
      textAlign: 'center',
      fontSize: 24,
      color: '#000',
      marginVertical: 20,
  },
  recipeContainer: {
      borderBottomWidth: 1,
      width: '80%', // Adjust width as needed
      alignItems: 'center',
      marginHorizontal: 'auto', // Center horizontally
      marginBottom: 80, // Add margin to separate each recipe container
      marginTop: 20,
      overflowY: 'hidden', // Hide overflow
  },
  recipeName: {
      fontSize: 20,
      padding:5,
      fontWeight: 'bold',
      textAlign: 'center', // Center text
  },
  recipeDetail: {
      padding:5,
      fontSize: 16,
      textAlign: 'right', // Align text to the right
      width: '100%', // Ensure text spans the full width of the container
  },
  image: {
      width: 500, // Adjust as needed
      height: 300, // Adjust as needed
      marginBottom: 10,
  },
});

export default FoodMenu;
