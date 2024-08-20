import { FC, useEffect, useState } from "react";
import { FlatList, StatusBar, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import PostListRaw from "./PostListRaw";
import PostModel, { Post } from "../Model/PostModel";

const PostListPage: FC<{ route: any, navigation: any }> = ({ navigation, route }) => {
    const [data, setData] = useState<Post[]>([]);
    const onItemSelected = (id: string) => {
        console.log('Item selected' + id);
        navigation.navigate('PostDetailsPage', { id: id, refreshToken: route.params.refreshToken, userID: route.params.user_id });
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            try {
                console.log("refreshToken: " + route.params.refreshToken);
                const posts: any = await PostModel.getAllPosts(route.params.refreshToken);
                console.log(posts);
                setData(posts.Posts);
                navigation.setParams({ refreshToken: posts.refreshToken });
            } catch (err) {
                console.log(err);
            }

            navigation.setOptions({
                headerTitle: "Posts",
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('PostAddPic', { refreshToken: route.params.refreshToken, userID: route.params.userID })}
                        style={styles.plusButtonContainer}
                    >
                        <Text style={styles.plusButton}>+</Text>
                    </TouchableOpacity>
                ),
            });
        });
        return unsubscribe;
    }, [navigation, route.params]);

    return (
        <FlatList
            style={styles.flatstyle}
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <PostListRaw user_name={item.user_name} post_title={item.post_title} post_text={item.post_text} imgURL={item.imgUrl} imgContent={item.imgContent} id={item.id} onItemSelected={onItemSelected} />
            )}
        />
    );
};

const styles = StyleSheet.create({
    flatstyle: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
    },
    plusButtonContainer: {
        marginRight: 15, // Adds space between the button and the right edge of the screen
    },
    plusButton: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000', // Black color for the plus symbol
    },
});

export default PostListPage;