/*import { useState, FC } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, StatusBar, Button, TouchableHighlight} from 'react-native';

const PostListRawEditable: FC<{
    post_title: string, 
    post_text:string, 
    imgURL: string,
    id: string,
    user_name: string,
    onItemSelected: (id: string) => void,
    onItemDeleted: (id: string) => void,
    onItemChanged: (id: string, post_title_: string, post_text: string) => void
}> = ({user_name, post_title, post_text, imgURL, id, onItemSelected, onItemDeleted, onItemChanged}) => {

const onPress = () => {
    onItemSelected(id)
}
  return(
    <View style={styles.listrow}>
        <Button onPress={() => onItemDeleted(id) } title="Delete"  />
        <Button onPress={() => onItemChanged(id, document.getElementById('post_title_'+id).value, document.getElementById('post_text_'+id).value) } title="Save"  />
        
        <TextInput id={"post_title_"+id} style={styles.input} defaultValue={post_title}  />
        <Text style={styles.name}>User Name: {user_name}</Text>
        
        {imgURL == "url" && <Image style={styles.post_image} source={require('../assets/avatar.jpeg')}/>}
        {imgURL != "url" && <Image style={styles.post_image} source={{uri: imgURL}}/>}
            
        <TextInput id={"post_text_"+id} style={styles.input} defaultValue={post_text} />

    </View>
  )
}

const styles = StyleSheet.create({

  listrow: {
    marginHorizontal: 5,
    flexDirection: 'column',
    elevation: 1,
    borderRadius: 2,
    marginVertical: 1,
    alignItems: 'center',
    backgroundColor: 'bisque'
  },
  post_image: {
    margin: 10,
    height: 200,
    width: 200,
  },
  name: {
    marginBottom: 5,
    fontSize:25,
    fontWeight: 'bold'
  },
  id: {
    marginBottom: 5,
    fontSize:20,
    borderColor: 'black',
  },
  cont: {
    marginBottom: 5,
    fontSize:20,
    borderColor: 'black',
    alignSelf: 'flex-start'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },


});

export default PostListRawEditable;
*/

/*
import React, { FC } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from 'react-native';

const PostListRawEditable: FC<{
  post_title: string,
  post_text: string,
  imgURL: string,
  id: string,
  user_name: string,
  onItemSelected: (id: string) => void,
  onItemDeleted: (id: string) => void,
  onItemChanged: (id: string, post_title_: string, post_text: string) => void
}> = ({ user_name, post_title, post_text, imgURL, id, onItemSelected, onItemDeleted, onItemChanged }) => {

  const handleSave = () => {
    const titleElement = document.getElementById(`post_title_${id}`) as HTMLInputElement;
    const textElement = document.getElementById(`post_text_${id}`) as HTMLInputElement;
    if (titleElement && textElement) {
      onItemChanged(id, titleElement.value, textElement.value);
    }
  };

  return (
    <View style={styles.listRow}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => onItemDeleted(id)}>
          <Text style={styles.buttonText}>Delete Post</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <TextInput id={`post_title_${id}`} style={styles.input} defaultValue={post_title} placeholder="Enter Title" />
      <Text style={styles.userName}>by: {user_name}</Text>
      {imgURL === "url" 
        ? <Image style={styles.postImage} source={require('../assets/avatar.jpeg')} />
        : <Image style={styles.postImage} source={{ uri: imgURL }} />}
      <TextInput id={`post_text_${id}`} style={styles.input} defaultValue={post_text} placeholder="Enter Text" />
    </View>
  );
};

const styles = StyleSheet.create({
  listRow: {
    marginHorizontal: 10,
    flexDirection: 'column',
    elevation: 2,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  postImage: {
    marginVertical: 1,
    height: 1,
    width: 1,
    borderRadius: 10,
  },
  userName: {
    marginBottom: 10,
    fontSize: 12,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    width: '100%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
});

export default PostListRawEditable;
*/
/*
import React, { FC } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from 'react-native';

const PostListRawEditable: FC<{
  post_title: string,
  post_text: string,
  imgURL: string,
  id: string,
  user_name: string,
  onItemSelected: (id: string) => void,
  onItemDeleted: (id: string) => void,
  onItemChanged: (id: string, post_title_: string, post_text: string) => void
}> = ({ user_name, post_title, post_text, imgURL, id, onItemSelected, onItemDeleted, onItemChanged }) => {

  const handleSave = () => {
    const titleElement = document.getElementById(`post_title_${id}`) as HTMLInputElement;
    const textElement = document.getElementById(`post_text_${id}`) as HTMLInputElement;
    if (titleElement && textElement) {
      onItemChanged(id, titleElement.value, textElement.value);
    }
  };

  return (
    <View style={styles.listRow}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => onItemDeleted(id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <TextInput id={`post_title_${id}`} style={styles.input} defaultValue={post_title} placeholder="Enter Title" />
      <Text style={styles.userName}>by: {user_name}</Text>
      {imgURL === "url" 
        ? <Image style={styles.postImage} source={require('../assets/avatar.jpeg')} />
        : <Image style={styles.postImage} source={{ uri: imgURL }} />}
      <TextInput id={`post_text_${id}`} style={styles.input} defaultValue={post_text} placeholder="Enter Text" />
    </View>
  );
};

const styles = StyleSheet.create({
  listRow: {
    marginHorizontal: 10,
    flexDirection: 'column',
    elevation: 2,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  postImage: {
    marginVertical: 1,
    height: 1,
    width: 1,
    borderRadius: 10,
  },
  userName: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    width: '100%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
});

export default PostListRawEditable;
*/

import React, { FC } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

const PostListRawEditable: FC<{
  post_title: string,
  post_text: string,
  imgURL: string,
  id: string,
  user_name: string,
  onItemSelected: (id: string) => void,
  onItemDeleted: (id: string) => void,
  onItemChanged: (id: string, post_title_: string, post_text: string) => void
}> = ({ user_name, post_title, post_text, imgURL, id, onItemSelected, onItemDeleted, onItemChanged }) => {

  const handleSave = () => {
    const titleElement = document.getElementById(`post_title_${id}`) as HTMLInputElement;
    const textElement = document.getElementById(`post_text_${id}`) as HTMLInputElement;
    if (titleElement && textElement) {
      onItemChanged(id, titleElement.value, textElement.value);
    }
  };

  return (
    <View style={styles.listRow}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => onItemDeleted(id)}>
          <Text style={styles.buttonText}>מחק</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>שמור</Text>
        </TouchableOpacity>
      </View>
      <TextInput id={`post_title_${id}`} style={styles.input} defaultValue={post_title} placeholder="הכנס כותרת" />
      <Text style={styles.userName}>מאת: {user_name}</Text>
      {imgURL === "url" 
        ? <Image style={styles.postImage} source={require('../assets/avatar.jpeg')} />
        : <Image style={styles.postImage} source={{ uri: imgURL }} />}
      <TextInput id={`post_text_${id}`} style={styles.input} defaultValue={post_text} placeholder="הכנס טקסט" />
    </View>
  );
};

const styles = StyleSheet.create({
  listRow: {
    marginHorizontal: 10,
    flexDirection: 'column',
    elevation: 2,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  postImage: {
    marginVertical: 10,
    height: 100,
    width: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  userName: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  input: {
    height: 50,
    width: '100%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    textAlign: 'right',
  },
});

export default PostListRawEditable;
