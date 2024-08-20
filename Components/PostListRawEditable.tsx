import React, { FC } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

const PostListRawEditable: FC<{
  post_title: string,
  post_text: string,
  imgURL: string,
  imgContent: string,
  id: string,
  user_name: string,
  onItemSelected: (id: string) => void,
  onItemDeleted: (id: string) => void,
  onItemChanged: (id: string, post_title_: string, post_text: string) => void
}> = ({ user_name, post_title, post_text, imgURL, imgContent, id, onItemSelected, onItemDeleted, onItemChanged }) => {

  const handleSave = () => {
    const titleElement = document.getElementById(post_title_$,{id}) as HTMLInputElement;
    const textElement = document.getElementById(post_text_$,{id}) as HTMLInputElement;
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
      <TextInput id={post_title_$,{id}} style={styles.input} defaultValue={post_title} placeholder="הכנס כותרת" />
      <Text style={styles.userName}>מאת: {user_name}</Text>
      {imgURL === "" 
        ? null
        : <Image style={styles.postImage} source={{ uri: imgContent }} resizeMode="contain" />}
      <TextInput id={post_text_$,{id}} style={styles.input} defaultValue={post_text} placeholder="הכנס טקסט" />
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
    backgroundColor: '#000000',
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
    height: 200, // Adjust height as needed
    width: '100%',
    borderRadius: 10,
    resizeMode: 'contain', // or 'cover' depending on your preference

  },

  userName: {
    marginBottom: 10,
    fontSize: 16,
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