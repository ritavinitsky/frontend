import React, { FC, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, AppState } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Timers: FC<{ route: any; navigation: any }> = ({ navigation, route }) => {
    const initialTimes = { timer1: 16 * 60 * 60 * 1000, timer2: 14 * 60 * 60 * 1000, timer3: 12 * 60 * 60 * 1000 };

    const [timeRemaining, setTimeRemaining] = useState<{ [key: string]: number }>({
        timer1: initialTimes.timer1,
        timer2: initialTimes.timer2,
        timer3: initialTimes.timer3,
    });

    const [isRunning, setIsRunning] = useState<{ [key: string]: boolean }>({
        timer1: false,
        timer2: false,
        timer3: false,
    });

    const [intervalIds, setIntervalIds] = useState<{ [key: string]: NodeJS.Timeout | null }>({
        timer1: null,
        timer2: null,
        timer3: null,
    });

    useEffect(() => {
        const loadTimers = async () => {
            try {
                for (let timerKey of ['timer1', 'timer2', 'timer3']) {
                    const startTime = await AsyncStorage.getItem(`${timerKey}_start`);
                    if (startTime) {
                        const elapsedTime = Date.now() - parseInt(startTime, 10);
                        const remainingTime = initialTimes[timerKey] - elapsedTime;
                        if (remainingTime > 0) {
                            setTimeRemaining((prev) => ({ ...prev, [timerKey]: remainingTime }));
                            startTimer(timerKey, true); // startTimer with already running flag
                        } else {
                            resetTimer(timerKey);
                        }
                    }
                }
            } catch (error) {
                console.error('Error loading timers from AsyncStorage', error);
            }
        };

        loadTimers();

        const handleAppStateChange = async (nextAppState: string) => {
            if (nextAppState === 'background' || nextAppState === 'inactive') {
                try {
                    for (let timerKey of ['timer1', 'timer2', 'timer3']) {
                        if (isRunning[timerKey]) {
                            await AsyncStorage.setItem(`${timerKey}_start`, Date.now().toString());
                        }
                    }
                } catch (error) {
                    console.error('Error saving timers to AsyncStorage', error);
                }
            }
        };

        const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            appStateSubscription.remove(); // Properly remove subscription
            for (let id of Object.values(intervalIds)) {
                if (id) clearInterval(id);
            }
        };
    }, [isRunning, intervalIds]);

    const startTimer = (timerKey: string, alreadyRunning = false) => {
        if (isRunning[timerKey]) return;

        setIsRunning((prev) => ({ ...prev, [timerKey]: true }));

        if (!alreadyRunning) {
            AsyncStorage.setItem(`${timerKey}_start`, Date.now().toString())
                .catch(error => console.error('Error setting timer start time', error));
        }

        const id = setInterval(() => {
            setTimeRemaining((prev) => {
                const updatedTime = Math.max(0, prev[timerKey] - 1000);
                if (updatedTime === 0) {
                    clearInterval(id);
                }
                return { ...prev, [timerKey]: updatedTime };
            });
        }, 1000);

        setIntervalIds((prev) => ({ ...prev, [timerKey]: id }));
    };

    const resetTimer = (timerKey: string) => {
        if (intervalIds[timerKey]) {
            clearInterval(intervalIds[timerKey]!);
        }
        AsyncStorage.removeItem(`${timerKey}_start`)
            .catch(error => console.error('Error removing timer start time', error));
        setTimeRemaining((prev) => ({ ...prev, [timerKey]: initialTimes[timerKey] }));
        setIsRunning((prev) => ({ ...prev, [timerKey]: false }));
        setIntervalIds((prev) => ({ ...prev, [timerKey]: null }));
    };

    const formatTime = (milliseconds: number): string => {
        const hours = Math.floor(milliseconds / (1000 * 60 * 60));
        const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <View style={styles.container}>
            {['timer1', 'timer2', 'timer3'].map((timerKey, index) => (
                <View key={index} style={styles.timerContainer}>
                    <TouchableOpacity
                        onPress={() => (isRunning[timerKey] ? resetTimer(timerKey) : startTimer(timerKey))}
                    >
                        <ImageBackground
                            source={require('../assets/timer.jpg')}
                            style={styles.timer}
                            imageStyle={styles.imageStyle}
                        >
                            <Text style={[styles.timerText, isRunning[timerKey] && styles.runningText]}>
                                {isRunning[timerKey] ? formatTime(timeRemaining[timerKey]) : `${initialTimes[timerKey] / (60 * 60 * 1000)}h`}
                            </Text>
                            <Icon
                                name={isRunning[timerKey] ? 'repeat' : 'play'}
                                size={30}
                                color="black"
                                style={styles.iconStyle}
                            />
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    timerContainer: {
        alignItems: 'center',
    },
    timer: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        borderRadius: 100,
    },
    timerText: {
        fontSize: 24,
        color: 'red',
        fontWeight: 'bold',
        fontFamily: 'monospace',
    },
    runningText: {
        fontSize: 15, // Smaller font size when running
    },
    iconStyle: {
        marginTop: 10,
    },
});

export default Timers;
