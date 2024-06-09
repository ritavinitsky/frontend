import React, { FC, useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, StatusBar, Alert } from 'react-native';


const ComingSoon: FC<{ route: any, navigation: any }> = ({ navigation, route }) => {
    return (
        <View style={styles.container}>
          <Text style={styles.text}>בקרוב</Text>
        </View>
      );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    text: {
      fontSize: 24,
      color: '#000',
    },
  });
  
  export default ComingSoon;