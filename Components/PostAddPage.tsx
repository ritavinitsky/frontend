import { useState, FC, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, StatusBar, Image } from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import PostModel, { Post } from '../Model/PostModel';

// const PostAddPage: FC<{ route: any, navigation: any }> = ({ navigation, route }) => {

//   const [title, onChangeTitle] = useState('');
//   const [txt, onChangeTxt] = useState('');
//   const [avatarUri, setAvatarUri] = useState<string | null>(null);



//   useEffect(() => {
//     console.log("Current avatarUri:", avatarUri);
//   }, [avatarUri]);


//   const askPermission = async () => {
//     try {
//       const res = await ImagePicker.getCameraPermissionsAsync();
//       if (!res.granted) {
//         alert("יש צורך בהרשאת מצלמה");
//       }
//     } catch (error) {
//       console.log("שגיאה בהרשאה: " + error);
//     }
//   };

//   const openCamera = async () => {
//     try {
//       const res = await ImagePicker.launchCameraAsync();
//       if (!res.canceled && res.assets.length > 0) {
//         const uri = res.assets[0].uri;
//         setAvatarUri(uri);
//       }
//     } catch (err) {
//       console.log("שגיאה בפתיחת מצלמה: " + err);
//     }
//   };

//   const openGallery = async () => {
//     try {
//       const res = await ImagePicker.launchImageLibraryAsync();
//       if (!res.canceled && res.assets.length > 0) {
//         const uri = res.assets[0].uri;
//         setAvatarUri(uri);
//       }
//     } catch (err) {
//       console.log("שגיאה בפתיחת גלריה: " + err);
//     }
//   };

//   useEffect(() => {
//     askPermission();
//     navigation.setOptions({
//       headerLeft: (props: any) => (
//         <HeaderBackButton {...props} onPress={() => navigation.navigate("PostListPage", { refreshToken: route.params.refreshToken, userID: route.params.userID })} />
//       )
//     });
//   }, []);

//   const onCancel = () => {
//     navigation.navigate("PostListPage", { refreshToken: route.params.refreshToken, userID: route.params.userID });
//   };

//   const onSave = async () => {
//     console.log(avatarUri)

//     let post: Post = {
//       creator_id: route.params.userID,
//       post_title: title,
//       post_text: txt,
//       imgUrl: '',
//       id: ''
//     };
//     console.log(post.imgUrl)
//     try {
//       if (avatarUri != "") {
//         console.log("מעלה תמונה");
//         //console.log(avatarUri)
//         const urlResponse = await PostModel.uploadImage(avatarUri, route.params.refreshToken);
//         console.log(urlResponse);
//         console.log(urlResponse.url);
//         post.imgUrl = urlResponse;

//       }else{
//         post.imgUrl = "url"
//       }
//     } catch (err) {
//       console.log(err);
//     }

    
//     const result = await PostModel.addPost(post, route.params.refreshToken);
//     console.log("add post result");
//     console.log(result);
//     if (result) {
//       navigation.navigate("PostListPage", { refreshToken: result.refreshToken, userID: route.params.userID });
//     } else {
//       Alert.alert("משהו השתבש ביצירת הפוסט. אנא נסה שוב");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={[styles.input, styles.inputRight]}
//         onChangeText={onChangeTitle}
//         placeholder='הכנס כותרת'
//         value={title}
//       />
//       <TextInput
//         style={[styles.input, styles.textArea, styles.inputRight]}
//         onChangeText={onChangeTxt}
//         placeholder='הכנס טקסט'
//         value={txt}
//         multiline={true}
//       />

//         {avatarUri && avatarUri != null && (<Image style={styles.avatar} source={{uri: avatarUri}}/>)}

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity onPress={openGallery}>
//           <Ionicons name={"image"} style={styles.galleryButton} size={50} />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={openCamera}>
//           <Ionicons name={"camera"} style={styles.cameraButton} size={50} />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.actionButtons}>
//         <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
//           <Text style={styles.buttonText}>ביטול</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={onSave}>
//           <Text style={styles.buttonText}>שמור</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: StatusBar.currentHeight,
//     padding: 20,
//     backgroundColor: '#f9f9f9',
//   },
//   input: {
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     marginVertical: 10,
//     paddingHorizontal: 15,
//     backgroundColor: '#fff',
//   },
//   inputRight: {
//     textAlign: 'right',
//   },
//   textArea: {
//     height: 100,
//   },
//   avatar: {
//     height: 250,
//     resizeMode: "contain",
//     alignSelf: 'center',
//     width: '100%'
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginVertical: 20,
//   },
//   cameraButton: {
//     marginHorizontal: 10,
//     width: 50,
//     height: 50,
//   },
//   galleryButton: {
//     marginHorizontal: 10,
//     width: 50,
//     height: 50,
//   },
//   actionButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   button: {
//     flex: 1,
//     marginHorizontal: 5,
//     height: 50,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#000000',
//   },
//   cancelButton: {
//     backgroundColor: '#000000',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default PostAddPage;


const PostAddPage: FC<{ route: any, navigation: any }> = ({ navigation, route }) => {
  const [title, onChangeTitle] = useState('');
  const [txt, onChangeTxt] = useState('');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const askPermission = async () => {
    try {
      const res = await ImagePicker.getCameraPermissionsAsync();
      if (!res.granted) {
        alert("יש צורך בהרשאת מצלמה");
      }
    } catch (error) {
      console.log("Error in permission: " + error);
    }
  };

  const openCamera = async () => {
    try {
      const res = await ImagePicker.launchCameraAsync({ base64: true });
      if (!res.canceled && res.assets.length > 0) {
        const uri = res.base64;
        setAvatarUri(uri);
      }
    } catch (err) {
      console.log("שגיאה בפתיחת מצלמה: " + err);
    }
  };

  const openGallery = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({ base64: true });
      if (!res.canceled) {
        const uri = res.base64;
        setAvatarUri(uri);
      }
    } catch (err) {
      console.log("שגיאה בפתיחת גלריה: " + err);
    }
  };

  useEffect(() => {
    askPermission();
    navigation.setOptions({
      headerLeft: (props: any) => (
        <HeaderBackButton {...props} onPress={() => navigation.navigate("PostListPage", { refreshToken: route.params.refreshToken, userID: route.params.userID })} />
      )
    });
  }, []);

  const onCancel = () => {
    navigation.navigate("PostListPage", { refreshToken: route.params.refreshToken, userID: route.params.userID });
  };

  const onSave = async () => {
    let post: Post = {
      creator_id: route.params.userID,
      post_title: title,
      post_text: txt,
      imgUrl: '',
      id: ''
    };

    try {
      if (avatarUri) {
        console.log("Uploading image:", avatarUri);
        const urlResponse = await PostModel.uploadImage(avatarUri, route.params.refreshToken);
        console.log("Image URL response:", urlResponse);
        post.imgUrl = urlResponse;
      } else {
        post.imgUrl = ""; // or leave it as empty string
      }

      const result = await PostModel.addPost(post, route.params.refreshToken);
      if (result) {
        navigation.navigate("PostListPage", { refreshToken: result.refreshToken, userID: route.params.userID });
      } else {
        Alert.alert("Something went wrong while creating the post. Please try again.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, styles.inputRight]}
        onChangeText={onChangeTitle}
        placeholder='הכנס כותרת'
        value={title}
      />
      <TextInput
        style={[styles.input, styles.textArea, styles.inputRight]}
        onChangeText={onChangeTxt}
        placeholder='הכנס טקסט'
        value={txt}
        multiline={true}
      />
      {avatarUri && (
        <Image style={styles.avatar} source={{ uri: avatarUri }} />
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={openGallery}>
          <Ionicons name={"image"} style={styles.galleryButton} size={50} />
        </TouchableOpacity>
        <TouchableOpacity onPress={openCamera}>
          <Ionicons name={"camera"} style={styles.cameraButton} size={50} />
        </TouchableOpacity>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
          <Text style={styles.buttonText}>ביטול</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSave}>
          <Text style={styles.buttonText}>שמור</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  inputRight: {
    textAlign: 'right',
  },
  textArea: {
    height: 100,
  },
  avatar: {
    height: 250,
    resizeMode: "contain",
    alignSelf: 'center',
    width: '100%'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  cameraButton: {
    marginHorizontal: 10,
    width: 50,
    height: 50,
  },
  galleryButton: {
    marginHorizontal: 10,
    width: 50,
    height: 50,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  cancelButton: {
    backgroundColor: '#000000',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PostAddPage;
