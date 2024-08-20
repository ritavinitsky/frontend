import apiClient from "./ClientApi";
import UserApi from "./UserApi";
import { MainRefreshToken } from "../App";

const getAllPosts = async (refreshToken: string) => {
    if(MainRefreshToken.refreshToken != ""){
        console.log("using MainRefreshToken " + MainRefreshToken.refreshToken);
        refreshToken = MainRefreshToken.refreshToken;
    }
    console.log("getAllPosts API refreshToken: " + refreshToken)
    apiClient.setHeader('authorization', 'Bearer ' + refreshToken)
    const data: any = await apiClient.get('/auth/refresh')
    MainRefreshToken.refreshToken = data.data.refreshToken;
    apiClient.setHeader('authorization', 'Bearer ' + data.data['accessToken'])
    const res: any = await apiClient.get('/post')
    var posts = res.data;
    
    return {Posts: posts, refreshToken: data.data.refreshToken}
}

const getUserPosts = async (creator_id: string, refreshToken: string) => {
    if(MainRefreshToken.refreshToken != ""){
        console.log("using MainRefreshToken " + MainRefreshToken.refreshToken);
        refreshToken = MainRefreshToken.refreshToken;
    }
    console.log("refreshToken in getUserPosts: ", refreshToken);
    apiClient.setHeader('authorization', 'Bearer ' + refreshToken)
    const data: any = await apiClient.get('/auth/refresh');
    console.log("refreshToken in getUserPosts:", data.data.refreshToken);
    MainRefreshToken.refreshToken = data.data.refreshToken;
    apiClient.setHeader('authorization', 'Bearer ' + data.data['accessToken'])
    const res: any = await apiClient.get('/post', {creator_id: creator_id})
    var posts = res.data;
    
    return {Posts: posts, refreshToken: data.data.refreshToken}
}

const addPost = async (post: any, refreshToken: string) => {
    if(MainRefreshToken.refreshToken != ""){
        console.log("using MainRefreshToken " + MainRefreshToken.refreshToken);
        refreshToken = MainRefreshToken.refreshToken;
    }
    apiClient.setHeader('authorization', 'Bearer ' + refreshToken)
    const data: any = await apiClient.get('/auth/refresh')
    MainRefreshToken.refreshToken = data.data.refreshToken;
    apiClient.setHeader('authorization', 'Bearer ' + data.data.accessToken)
    const res: any = await apiClient.post('/post', post)
    if(res.ok){
        return {refreshToken: data.data.refreshToken}
    }
    return false
}

const getSpecificPost = async(refreshToken: string, post_id: string) => {
    if(MainRefreshToken.refreshToken != ""){
        console.log("using MainRefreshToken " + MainRefreshToken.refreshToken);
        refreshToken = MainRefreshToken.refreshToken;
    }
    apiClient.setHeader('authorization', 'Bearer ' + refreshToken)
    const data: any = await apiClient.get('/auth/refresh')
    MainRefreshToken.refreshToken = data.data.refreshToken;
    apiClient.setHeader('authorization', 'Bearer ' + data.data['accessToken'])
    const res: any = await apiClient.get('/post/' + post_id)
    console.log(res.data)
    if(res.ok){
        return {result: res.data, refreshToken: data.data.refreshToken}
    }
    return false
        
}

const deletePost = async(postID: string, refreshToken: string) => {
    if(MainRefreshToken.refreshToken != ""){
        console.log("using MainRefreshToken " + MainRefreshToken.refreshToken);
        refreshToken = MainRefreshToken.refreshToken;
    }
    apiClient.setHeader('authorization', 'Bearer ' + refreshToken)
    const data: any = await apiClient.get('/auth/refresh')
    MainRefreshToken.refreshToken = data.data.refreshToken;
    console.log(data.data);
    apiClient.setHeader('authorization', 'Bearer ' + data.data.accessToken)
    const res: any = await apiClient.delete('/post/' + postID)
    if(res.ok){
        return {refreshToken: data.data.refreshToken}
    }
}

const updatePost = async(post: any, refreshToken: string, postID: string) => {
    if(MainRefreshToken.refreshToken != ""){
        console.log("using MainRefreshToken " + MainRefreshToken.refreshToken);
        refreshToken = MainRefreshToken.refreshToken;
    }
    apiClient.setHeader('authorization', 'Bearer ' + refreshToken)
    const data: any = await apiClient.get('/auth/refresh')
    MainRefreshToken.refreshToken = data.data.refreshToken;
    console.log(data.data)
    apiClient.setHeader('authorization', 'Bearer ' + data.data.accessToken)
    const res: any = await apiClient.put('/post/' + postID,  post)
    console.log("UPDATE ______" + res)
    if(res.ok){
        return {refreshToken: data.data.refreshToken}
    }
}

const uploadImage = async(image: any, refreshToken: string) => {
    if(MainRefreshToken.refreshToken != ""){
        console.log("using MainRefreshToken " + MainRefreshToken.refreshToken);
        refreshToken = MainRefreshToken.refreshToken;
    }
    apiClient.setHeader('authorization', 'Bearer ' + refreshToken)
    const data: any = await apiClient.get('/auth/refresh')
    MainRefreshToken.refreshToken = data.data.refreshToken;
    console.log(data.data)
    apiClient.setHeader('authorization', 'Bearer ' + data.data.accessToken)
    return await apiClient.post("/file/file", image, {headers:{"Content-Type": 'multipart/form-data'}})
}

export default {
    getAllPosts,
    getUserPosts,
    addPost,
    deletePost,
    updatePost,
    getSpecificPost,
    uploadImage
}