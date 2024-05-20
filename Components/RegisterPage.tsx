import { useState, FC, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, StatusBar, Button} from 'react-native';
import StudentModel, { User } from '../Model/UserModel';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import LoginRegistrationModel from '../Model/LoginModel';


const StudentAddPage: FC<{navigation: any}> = ({navigation}) => {

    const [name, onChangeName] = useState('');
    const [age, onChangeAge] = useState('');
    const [password, onChangePassword] = useState('');
    const [email, onChangeEmail] = useState('');
    const [avatarUri, setAvatarUri] = useState('');

    const askPermission = async () => {
      try {
        const res = await ImagePicker.getCameraPermissionsAsync()
        if(!res.granted){
          alert("Camera permission is required!!!")
        }
      } catch (error) {
        console.log("askPermmition error: " + error)
      }
    }


    const openCamera = async () => {
      try{
        const res = await ImagePicker.launchCameraAsync()
        if(!res.canceled && res.assets.length>0){
          const uri = res.assets[0].uri
          setAvatarUri(uri)
        }
      }catch(err){
        console.log("open camera error: " + err)
      }
      
    }

    const openGallery = async() => {
      try{
        const res = await ImagePicker.launchImageLibraryAsync()
        if(!res.canceled && res.assets.length>0){
          const uri = res.assets[0].uri
          setAvatarUri(uri)
        }
      }catch(err){
        console.log("open camera error: " + err)
      }
    }

    useEffect(() => {
      askPermission()
    }, [])
  
    const onSave = async() => {
      console.log(avatarUri)
      let user = {
        name: name,
        age: age,
        email: email,
        password: password,
        //imgUrl: "url"
      }
      try {
        if(avatarUri != ""){
          console.log("uploading image")
          const url = await StudentModel.uploadImage(avatarUri)
          //user.imgUrl = url
        }
      }catch(err){
        console.log(err)
      }
      const result: string = await LoginRegistrationModel.registration(user);
      if(result != null){
        console.log("registered")
        //navigation.navigate("StudentListPage", result)
      }else{
        Alert.alert("Login Error:", "Your email or password are incorrect")
      }
    }
    return(    
    <View style={styles.container}>

      <View>
        {avatarUri == "" && <Image style={styles.avatar} source={require('../assets/avatar.jpeg')}/>}
        {avatarUri != "" && <Image style={styles.avatar} source={{uri: avatarUri}}/>}
        <TouchableOpacity onPress={openGallery}>
          <Ionicons name={"image"} style={styles.cameraButton} size={50}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={openCamera}>
          <Ionicons name={"camera"} style={styles.cameraButton} size={50}/>
        </TouchableOpacity>
        
      </View>
        
        <TextInput
          style={styles.input}
          onChangeText={onChangeName}
          value={name}
          placeholder='Enter your name'
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeAge}
          placeholder='Enter your age'
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          placeholder='Enter your email'
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          placeholder='Enter your password'
        />
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={onSave}>
            <Text style={styles.button}>REGISTER</Text>
          </TouchableOpacity>
        </View>
  
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      marginTop: StatusBar.currentHeight,
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#fff',
      
    },
    avatar: {
      height: 250,
      resizeMode: "contain",
      alignSelf: 'center',
      width: '100%'
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold'
    },
    image: {
      alignSelf: 'center',
      width: 200,
      height: 200,
      borderRadius: 100
    },
    cameraButton: {
      position: 'absolute',
      bottom: -10,
      left: 10,
      width: 50,
      height: 50,
    },
    galleryButton: {
      position: 'absolute',
      bottom: -10,
      right: 10,
      width: 50,
      height: 50,
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    buttons: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    button: {
      padding: 10
    }
})

export default StudentAddPage;