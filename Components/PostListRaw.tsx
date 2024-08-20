import { useState, FC } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';

const PostListRaw: FC<{
  post_title: string, 
  post_text: string, 
  imgURL: string,
  imgContent: string,
  id: string,
  user_name: string,
  onItemSelected: (id: string) => void
}> = ({ user_name, post_title, post_text, imgURL, imgContent, id, onItemSelected }) => {

  const onPress = () => {
    onItemSelected(id);
  }

  return (
    <TouchableHighlight onPress={onPress} underlayColor={'#f0f0f0'}>
      <View style={styles.listRow}>
        <Text style={styles.title}>{post_title}</Text>
        <Text style={styles.userName}>מאת: {user_name}</Text>
        <View style={styles.imageContainer}> 
          {imgURL !== "" && <Image style={styles.postImage} source={{ uri: imgContent }} />}
        </View>
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
  imageContainer: {
    alignItems: 'flex-end', // Aligns the image to the right side
    marginTop: 10,
  },
  postImage1: {
    height: 150, // Increased height for a larger image
    width: 300,  // Increased width for a larger image
    borderRadius: 10,
    resizeMode: 'cover',
  },
  postImage: {
    marginVertical: 10,
    height: 200, // Adjust height as needed
    width: '100%',
    borderRadius: 10,
    resizeMode: 'contain', // or 'cover' depending on your preference

  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
  },
  userName: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    textAlign: 'right',
  },
  postText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'right',
  }
});

export default PostListRaw;