/*import { useState, FC } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput, StatusBar, Button, TouchableHighlight} from 'react-native';

const PostListRaw: FC<{
    post_title: string, 
    post_text:string, 
    imgURL: string,
    id: string,
    user_name: string,
    onItemSelected: (id: string) => void
}> = ({user_name, post_title, post_text, imgURL, id, onItemSelected}) => {

const onPress = () => {
    onItemSelected(id)
}
  return(
    <TouchableHighlight onPress={onPress}
    underlayColor={'grey'}>
        <View style={styles.listrow}>
            <Text style={styles.name}>{post_title}</Text>
            <Text style={styles.name}>User Name: {user_name}</Text>
            {imgURL == "url" && <Image style={styles.post_image} source={require('../assets/avatar.jpeg')}/>}
            {imgURL != "url" && <Image style={styles.post_image} source={{uri: imgURL}}/>}
            <Text numberOfLines={2} style={styles.id}>{post_text}</Text>  
        </View>
    </TouchableHighlight>
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
    margin: 1,
    height: 1,
    width: 1,
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
  }

});

export default PostListRaw;
*/
import { useState, FC } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';

const PostListRaw: FC<{
  post_title: string, 
  post_text: string, 
  imgURL: string,
  id: string,
  user_name: string,
  onItemSelected: (id: string) => void
}> = ({ user_name, post_title, post_text, imgURL, id, onItemSelected }) => {

  const onPress = () => {
    onItemSelected(id);
  }

  return (
    <TouchableHighlight onPress={onPress} underlayColor={'#f0f0f0'}>
      <View style={styles.listRow}>
        <Text style={styles.title}>{post_title}</Text>
        <Text style={styles.userName}>by: {user_name}</Text>
        {imgURL === "url" 
          ? <Image style={styles.postImage} source={require('../assets/avatar.jpeg')} />
          : <Image style={styles.postImage} source={{ uri: imgURL }} />
        }
        <Text numberOfLines={2} style={styles.postText}>{post_text}</Text>  
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  listRow: {
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  postImage: {
    marginTop: 1,
    height: 1,
    width: 1,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userName: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
  },
  postText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  }
});

export default PostListRaw;
