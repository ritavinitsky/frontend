/*import { useState, FC, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, StatusBar, Button} from 'react-native';
import StudentModel, { User } from '../Model/UserModel';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import LoginRegistrationModel from '../Model/LoginModel';
import PostAddPage from './PostAddPage';


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
        navigation.goBack();
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
*/

/*
import { useState, FC, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, StatusBar } from 'react-native';
import StudentModel, { User } from '../Model/UserModel';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import LoginRegistrationModel from '../Model/LoginModel';

const StudentAddPage: FC<{ navigation: any }> = ({ navigation }) => {
  const [name, onChangeName] = useState('');
  const [age, onChangeAge] = useState('');
  const [password, onChangePassword] = useState('');
  const [email, onChangeEmail] = useState('');
  const [avatarUri, setAvatarUri] = useState('');

  const askPermission = async () => {
    try {
      const res = await ImagePicker.getCameraPermissionsAsync();
      if (!res.granted) {
        alert("Camera permission is required!!!");
      }
    } catch (error) {
      console.log("askPermission error: " + error);
    }
  };

  const openCamera = async () => {
    try {
      const res = await ImagePicker.launchCameraAsync();
      if (!res.canceled && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        setAvatarUri(uri);
      }
    } catch (err) {
      console.log("open camera error: " + err);
    }
  };

  const openGallery = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync();
      if (!res.canceled && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        setAvatarUri(uri);
      }
    } catch (err) {
      console.log("open gallery error: " + err);
    }
  };

  useEffect(() => {
    askPermission();
  }, []);

  const onSave = async () => {
    console.log(avatarUri);
    let user = {
      name: name,
      age: age,
      email: email,
      password: password,
    };
    try {
      if (avatarUri != "") {
        console.log("uploading image");
        const url = await StudentModel.uploadImage(avatarUri);
        // user.imgUrl = url
      }
    } catch (err) {
      console.log(err);
    }
    const result: string = await LoginRegistrationModel.registration(user);
    if (result != null) {
      console.log("registered");
      navigation.goBack();
    } else {
      Alert.alert("Registration Error:", "There was an error registering your account.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.innerContainer}>
        <View style={styles.avatarContainer}>
          {avatarUri == "" && <Image style={styles.avatar} source={require('../assets/avatar.jpeg')} />}
          {avatarUri != "" && <Image style={styles.avatar} source={{ uri: avatarUri }} />}
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={openGallery}>
              <Ionicons name={"image"} style={styles.icon} size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={openCamera}>
              <Ionicons name={"camera"} style={styles.icon} size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeName}
          value={name}
          placeholder='Enter your name'
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeAge}
          value={age}
          placeholder='Enter your age'
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder='Enter your email'
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder='Enter your password'
          secureTextEntry
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={onSave}>
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
  },
  icon: {
    color: '#007BFF',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StudentAddPage;
*/
import { useState, FC, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, StatusBar } from 'react-native';
import StudentModel, { User } from '../Model/UserModel';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import LoginRegistrationModel from '../Model/LoginModel';

const StudentAddPage: FC<{ navigation: any }> = ({ navigation }) => {
  const [name, onChangeName] = useState('');
  const [age, onChangeAge] = useState('');
  const [password, onChangePassword] = useState('');
  const [email, onChangeEmail] = useState('');
  const [avatarUri, setAvatarUri] = useState('');

  const askPermission = async () => {
    try {
      const res = await ImagePicker.getCameraPermissionsAsync();
      if (!res.granted) {
        alert("Camera permission is required!!!");
      }
    } catch (error) {
      console.log("askPermission error: " + error);
    }
  };

  const openCamera = async () => {
    try {
      const res = await ImagePicker.launchCameraAsync();
      if (!res.canceled && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        setAvatarUri(uri);
      }
    } catch (err) {
      console.log("open camera error: " + err);
    }
  };

  const openGallery = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync();
      if (!res.canceled && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        setAvatarUri(uri);
      }
    } catch (err) {
      console.log("open gallery error: " + err);
    }
  };

  useEffect(() => {
    askPermission();
  }, []);

  const onSave = async () => {
    console.log(avatarUri);
    let user = {
      name: name,
      age: age,
      email: email,
      password: password,
    };
    try {
      if (avatarUri != "") {
        console.log("uploading image");
        const url = await StudentModel.uploadImage(avatarUri);
        // user.imgUrl = url
      }
    } catch (err) {
      console.log(err);
    }
    const result: string = await LoginRegistrationModel.registration(user);
    if (result != null) {
      console.log("registered");
      navigation.goBack();
    } else {
      Alert.alert("Registration Error:", "There was an error registering your account.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.innerContainer}>
        <View style={styles.avatarContainer}>
          {avatarUri == "" && <Image style={styles.avatar} source={require('../assets/avatar.jpeg')} />}
          {avatarUri != "" && <Image style={styles.avatar} source={{ uri: avatarUri }} />}
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={openGallery}>
              <Ionicons name={"image"} style={styles.icon} size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={openCamera}>
              <Ionicons name={"camera"} style={styles.icon} size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeName}
          value={name}
          placeholder='Enter your name'
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeAge}
          value={age}
          placeholder='Enter your age'
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder='Enter your email'
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder='Enter your password'
          secureTextEntry
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={onSave}>
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
  },
  icon: {
    color: '#007BFF',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StudentAddPage;
