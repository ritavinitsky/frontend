import { useState, FC } from 'react';
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