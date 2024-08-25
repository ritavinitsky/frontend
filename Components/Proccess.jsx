// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import axios from 'axios';

// const ProcessPage: FC<{ route: any, navigation: any }> = ({ navigation, route }) => {
//   const [progressData, setProgressData] = useState([]);
//   const [markedDates, setMarkedDates] = useState({});
//   const [currentDay, setCurrentDay] = useState('');

//   useEffect(() => {
//     const fetchProgressData = async () => {
//       try {
//         const response = await axios.get('http://backend-69iy.onrender.com/prograss');
//         const data = response.data;
//         setProgressData(data);
//         setCurrentDay(data[0].date.split('T')[0]);

//         // Create an object for markedDates
//         const newMarkedDates = data.reduce((acc, item) => {
//           const date = item.date.split('T')[0];
//           acc[date] = {
//             selected: true,
//             selectedColor: item.passed ? 'green' : 'red',
//           };
//           return acc;
//         }, {});

//         setMarkedDates(newMarkedDates);
//       } catch (error) {
//         console.error('Error fetching progress data:', error);
//       }
//     };

//     fetchProgressData();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Calendar
//         current={currentDay}
//         minDate={'2023-01-01'}
//         maxDate={'2025-12-31'}
//         monthFormat={'MM yyyy'}
//         markedDates={markedDates}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 10,
//   },
// });

// export default ProcessPage;

import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';

const ProcessPage: FC<{ route: any, navigation: any }> = ({ navigation, route }) => {
  const [progressData, setProgressData] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const response = await axios.get('http://backend-69iy.onrender.com/prograss');
        const data = response.data;

        // Filter the data based on the user ID
        const userProgressData = data.filter(item => item.userId === route.params.user_id);

        // Log the entire response data
        console.log('Full API response:', data);

           // Log the filtered user progress data
      console.log('id', route.params.user_id);

           // Log the filtered user progress data
      console.log('User progress data:', userProgressData);

        // Set the currentDay to the first date of the filtered data
        if (userProgressData.length > 0) {
          setCurrentDay(userProgressData[0].date.split('T')[0]);
        }

        // Create an object for markedDates
        const newMarkedDates = userProgressData.reduce((acc, item) => {
          const date = item.date.split('T')[0];
          acc[date] = {
            selected: true,
            selectedColor: item.passed ? 'green' : 'red',
          };
          return acc;
        }, {});

          // Log the marked dates object
      console.log('Marked dates:', newMarkedDates);

        setMarkedDates(newMarkedDates);
      } catch (error) {
        console.error('Error fetching progress data:', error);
      }
    };

    fetchProgressData();
  }, [route.params.user_id]);

  return (
    <View style={styles.container}>
      <Calendar
        current={currentDay}
        minDate={'2023-01-01'}
        maxDate={'2025-12-31'}
        monthFormat={'MM yyyy'}
        markedDates={markedDates}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});

export default ProcessPage;
