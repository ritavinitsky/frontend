import {FC, useEffect, useState} from "react";
import {FlatList, StatusBar, Text, View, StyleSheet, Button} from "react-native"
import PostListRawEditable from "./PostListRawEditable";
import PostModel, { Post } from "../Model/PostModel";


const UsersPostListPage: FC<{route:any, navigation: any, }> = ({navigation, route}) => {
    const [data, setData] = useState<Post[]>([])
    const onItemSelected = (id: string) => {
        console.log('Item selected: ' + id);
        navigation.navigate('PostDetailsPage', {id: id, refreshToken: route.params.refreshToken, userID: route.params.user_id});
    }
    const onItemDeleted = async (id: string) => {
        console.log('Item deleted: ' + id);
        const res: any = await PostModel.deletePost(id, route.params.refreshToken);
        const posts: any = await PostModel.getUserPosts(route.params.user_id, route.params.refreshToken);

        console.log(posts)
        setData(posts.Posts)
    }
    const onItemChanged = async (id: string, post_title: string, post_text: string) => {
        console.log('Item changed: ' + id + " " + post_title + " " + post_text);
        const res: any = await PostModel.updatePost({post_title: post_title, post_text: post_text}, route.params.refreshToken, id);
    }
    
    let refToken = ''
    useEffect(()=>{
        const unsubsribe = navigation.addListener('focus',async()=>{
        try{
            const posts: any = await PostModel.getUserPosts(route.params.user_id, route.params.refreshToken);

            console.log(posts)
            setData(posts.Posts)
            navigation.setParams({refreshToken: posts.refreshToken})
        }catch(err){
            console.log(err)
        }
        console.log("screen in focus")
        navigation.setOptions(
            {
                headerTitle: "Posts"
            }
        )
        })
        return unsubsribe
        },[navigation, route.params])

    return(
        <FlatList 
            style={styles.flatstyle}
            data = {data}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                <PostListRawEditable user_name={item.user_name} post_title={item.post_title} post_text={item.post_text} imgURL={item.imgUrl} id={item.id} onItemSelected={onItemSelected} onItemDeleted={onItemDeleted} onItemChanged={onItemChanged}/>
            )}
        />
    )
}

const styles = StyleSheet.create({
    flatstyle: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    }
});

export default UsersPostListPage