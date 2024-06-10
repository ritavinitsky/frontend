import React, { FC, useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, StatusBar, Alert } from 'react-native';

const Timers: FC<{ route: any, navigation: any }> = ({ navigation, route }) => {

    const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  
    const startTimer = (duration: number) => {
      if (timerId) clearInterval(timerId);
      const startTime = Date.now();
      const endTime = startTime + duration * 60 * 60 * 1000;
  
      const id = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, endTime - now);
        if (remaining === 0) clearInterval(id);
        setTimeRemaining(remaining);
      }, 1000);
  
      setTimerId(id);
    };

    useEffect(() => {
        return () => {
          if (timerId) clearInterval(timerId);
        };
      }, [timerId]);
    
      const formatTime = (milliseconds: number): string => {
        const hours = Math.floor(milliseconds / (1000 * 60 * 60));
        const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
        return `${hours} שעות ${minutes} דקות ${seconds} שניות`;
      };

      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 24, marginBottom: 20 }}>
            {timeRemaining ? `זמן נותר: ${formatTime(timeRemaining)}` : 'לחץ על לחצן כדי להתחיל טיימר'}
          </Text>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#FF5733' }]} onPress={() => startTimer(16)}>
            <Text style={styles.buttonText}>16 שעות</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#33FFC7' }]} onPress={() => startTimer(14)}>
            <Text style={styles.buttonText}>14 שעות</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#335CFF' }]} onPress={() => startTimer(12)}>
            <Text style={styles.buttonText}>12 שעות</Text>
          </TouchableOpacity>
        </View>
      );
}

const styles = StyleSheet.create({
    button: {
      width: 100,
      height: 100,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    buttonText: {
      fontSize: 18,
      color: 'white',
    },
  });
  
  export default Timers;
