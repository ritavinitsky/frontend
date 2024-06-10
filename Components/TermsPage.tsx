import React, { FC, useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, StatusBar, Alert } from 'react-native';

const Terms: FC<{ route: any, navigation: any }> = ({ navigation, route }) => {

    return (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.heading}>תקנון אפליקציה לבניית תוכנית לירידה במשקל</Text>
          
          <Text style={styles.sectionTitle}>ברוכים הבאים לאפליקציית בניית תוכנית לירידה במשקל ("האפליקציה")!</Text>
          <Text style={styles.text}>לפני השימוש באפליקציה, אנא קראו בעיון את תנאי השימוש הבאים. השימוש באפליקציה מעיד על הסכמתכם לתנאים אלו.</Text>
          
          <Text style={styles.sectionTitle}>1. הסכמה לתנאים</Text>
          <Text style={styles.text}>בשימוש באפליקציה, אתם מאשרים שקראתם, הבנתם והסכמתם להיות כפופים לתנאי השימוש הללו. אם אינכם מסכימים לתנאים, אינכם רשאים להשתמש באפליקציה.</Text>
          
          <Text style={styles.sectionTitle}>2. ייעוץ רפואי</Text>
          <Text style={styles.text}>התכנים והשירותים המוצעים באפליקציה מסופקים למטרות מידע והכוונה בלבד ואינם מהווים ייעוץ רפואי, תזונתי או בריאותי מקצועי. לפני התחלת כל תוכנית לירידה במשקל או כל שינוי בתזונה או בפעילות גופנית, מומלץ להתייעץ עם רופא או מומחה מוסמך אחר.</Text>
          
          <Text style={styles.sectionTitle}>3. המלצות והתחייבות לתוצאות</Text>
          <Text style={styles.text}>האפליקציה מספקת תוכניות לירידה במשקל והמלצות המבוססות על מידע כללי ושיטות מוכרות בתחום. אין באפשרותנו להתחייב לתוצאות בטוחות, מהירות או ספציפיות. כל שינוי במשקל, בתזונה או באורח החיים הנו אישי ותלוי בגורמים רבים ואינדיבידואליים.</Text>
          
          <Text style={styles.sectionTitle}>4. שימוש אישי</Text>
          <Text style={styles.text}>האפליקציה מיועדת לשימוש אישי בלבד. אין לעשות שימוש מסחרי או להפיץ את התכנים והשירותים המסופקים באפליקציה ללא אישור מראש ובכתב מאיתנו.</Text>
          
          <Text style={styles.sectionTitle}>5. סודיות ופרטיות</Text>
          <Text style={styles.text}>אנו מתחייבים לשמור על פרטיותכם ולא להעביר את פרטיכם האישיים לצד שלישי ללא הסכמתכם, למעט כפי שנדרש על פי חוק או כדי לספק לכם את השירותים באפליקציה.</Text>
          
          <Text style={styles.sectionTitle}>6. שינויים ועדכונים</Text>
          <Text style={styles.text}>אנו שומרים לעצמנו את הזכות לעדכן או לשנות את תנאי השימוש באפליקציה בכל עת וללא הודעה מוקדמת. המשך השימוש באפליקציה לאחר השינויים מהווה הסכמה לתנאים המעודכנים.</Text>
          
          <Text style={styles.sectionTitle}>7. הגבלת אחריות</Text>
          <Text style={styles.text}>השימוש באפליקציה נעשה על אחריות המשתמש בלבד. האפליקציה, מנהליה, עובדיה, שותפיה וספקיה אינם אחראים לכל נזק ישיר, עקיף, מקרי, תוצאתי או מיוחד הנובע או קשור לשימוש באפליקציה.</Text>
          
          <Text style={styles.sectionTitle}>8. זכויות קניין רוחני</Text>
          <Text style={styles.text}>כל הזכויות באפליקציה, לרבות התכנים, העיצוב, הלוגו והקוד, שמורות לנו. אין להעתיק, להפיץ, לשדר או לשכפל כל חלק מהאפליקציה ללא אישור מראש ובכתב.</Text>
          
          <Text style={styles.sectionTitle}>9. צור קשר</Text>
          <Text style={styles.text}>אם יש לכם שאלות בנוגע לתנאי השימוש או בנוגע לאפליקציה, אתם מוזמנים לפנות אלינו בכתובת הדוא"ל: [example@example.com].</Text>
          
          <Text style={styles.sectionTitle}>תודה שבחרתם להשתמש באפליקציית בניית תוכנית לירידה במשקל שלנו. אנו מאחלים לכם הצלחה רבה בדרככם לבריאות טובה ואורח חיים בריא!</Text>
          
          <Text style={styles.text}>תאריך עדכון אחרון: [תאריך]</Text>
        </ScrollView>
      );
}


const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    heading: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
    },
    text: {
      fontSize: 16,
      lineHeight: 24,
      textAlign: 'right',
    },
  });

export default Terms;
