import PostApi from "../api/PostApi";
import UserApi from "../api/UserApi"
import FormData from 'form-data';

export type Post = {
    creator_id: string,
    post_title: string,
    post_text: string,
    imgUrl: string,
    imgContent: string,
    id: string,
    user_name: string
}


const getAllPosts = async (refreshToken: string) => {
    console.log("getAllPosts")
    let data = Array<Post>()
    try {
        const posts: any = await PostApi.getAllPosts(refreshToken)
        if(posts.Posts){
            for (let index = 0; index < posts.Posts.length; index++) {
                const pst: Post = {
                    creator_id: posts.Posts[index].creator_id,
                    post_title: posts.Posts[index].post_title,
                    post_text: posts.Posts[index].post_text,
                    imgUrl: posts.Posts[index].imgUrl,
                    imgContent: posts.Posts[index].imgContent,
                    id: posts.Posts[index]._id
                }
                const user = await UserApi.getUser(pst.creator_id, refreshToken);
                if(user.currentUser != null){
                    pst.user_name = user.currentUser.name;
                    data.push(pst);
                }
            }
        }
        return {Posts: data, refreshToken: posts.refreshToken}
    } catch (error) {
        console.log("Fail reading posts from server: " + error)
    }
    return data
}

const getUserPosts = async (creator_id: string, refreshToken: string) => {
    console.log("getUserPosts")
    let data = Array<Post>()
    try {
        const posts: any = await PostApi.getUserPosts(creator_id, refreshToken)
        if(posts.Posts){
            for (let index = 0; index < posts.Posts.length; index++) {
                const pst: Post = {
                    creator_id: posts.Posts[index].creator_id,
                    post_title: posts.Posts[index].post_title,
                    post_text: posts.Posts[index].post_text,
                    imgUrl: posts.Posts[index].imgUrl,
                    imgContent: posts.Posts[index].imgContent,
                    id: posts.Posts[index]._id
                }
                const user = await UserApi.getUser(pst.creator_id, refreshToken);
                pst.user_name = user.currentUser.name;
                data.push(pst)
            }
        }
        return {Posts: data, refreshToken: posts.refreshToken}
    } catch (error) {
        console.log("Fail reading posts from server: " + error)
    }
    return data
}

const getPost = async(id: string, refreshToken: string) => {
    const defPost: Post = {
        creator_id: '0',
        post_title: '0',
        post_text: '0',
        imgUrl: '0',
        id: '0'}
    try {
        const post: any = await PostApi.getSpecificPost(refreshToken, id)
        console.log(post)
        if(post.result){
            const pst: Post = {
                creator_id: post.result.creator_id,
                post_title: post.result.post_title,
                post_text: post.result.post_text,
                imgUrl: post.result.imgUrl,
                id: post.result._id
            }
            console.log(pst)
            return {dispPost: pst, refreshToken: post.refreshToken}
        }
        return defPost
    }catch(err){
        console.log("Fail reading post from server: " + err)
    }
    return defPost
}


const addPost = async (post: Post, refreshToken: string) => {
    console.log("addPost");
    console.log(post);
    const data = {creator_id: post.creator_id, post_title: post.post_title, imgUrl: post.imgUrl, post_text: post.post_text}
    try {
        const res = await PostApi.addPost(data, refreshToken) 
        if(res == false){
            return false
        }
        else{
            return res
        }
    } catch (error) {
        console.log(error)
    }
    
}

const deletePost = async(postID: string, refreshToken: string) => {
    console.log("deletePost")
    try {
        const res = await PostApi.deletePost(postID, refreshToken) 
        console.log(res)
        if(!res){
            return false
        }
        else{
            return res
        }
    } catch (error) {
        console.log(error)
    }
}

const updatePost = async(post: any, refreshToken: string, id: string) => {
    console.log("updatePost")
    try {
        const res = (await PostApi.updatePost(post, refreshToken, id))
        console.log(res?.refreshToken)
        if(!res){
            return false
        }
        else{
            return res
        }
    } catch (error) {
        console.log(error)
    }
}

const uploadImage = async(imageURI: String, refreshToken: string) => {
        var body = new FormData();
        body.append('file', JSON.stringify({name: "name",type: 'image/jpeg', "uri": imageURI}));
        try{
            console.log(body)
            console.log("Post Model upload image")
            const res = await PostApi.uploadImage(body, refreshToken);
            if(!res.ok){
                console.log("save failed " + res.problem)
            }else{
                if(res.data){
                    const d:any = res.data
                    return d.url
                }
            }
        }catch(err){
            console.log("save failed " + err)
        }
        return ""     
}





export default {getAllPosts, getUserPosts, uploadImage, getPost, addPost, deletePost, updatePost}