import apiClient from "./ClientApi";
import UserApi from "./UserApi";

const getAllPosts = async (refreshToken: string) => {
    apiClient.setHeader('authorization', 'Bearer ' + refreshToken)
    const data: any = await apiClient.get('/auth/refresh')
    apiClient.setHeader('authorization', 'Bearer ' + data.data['accessToken'])
    const res: any = await apiClient.get('/post')
    var posts = res.data;
    
    return {Posts: posts, refreshToken: data.data.refreshToken}
}

const getUserPosts = async (creator_id: string, refreshToken: string) => {
    apiClient.setHeader('authorization', 'Bearer ' + refreshToken)
    const data: any = await apiClient.get('/auth/refresh')
    apiClient.setHeader('authorization', 'Bearer ' + data.data['accessToken'])
    const res: any = await apiClient.get('/post', {creator_id: creator_id})
    var posts = res.data;
    
    return {Posts: posts, refreshToken: data.data.refreshToken}
}

const getSpecificPost = async(refreshToken: string, post_id: string) => {
    apiClient.setHeader('authorization', 'Bearer ' + refreshToken)
    const data: any = await apiClient.get('/auth/refresh')
    apiClient.setHeader('authorization', 'Bearer ' + data.data['accessToken'])
    const res: any = await apiClient.get('/post/' + post_id)
    console.log(res.data)
    if(res.ok){
        return {result: res.data, refreshToken: data.data.refreshToken}
    }
    return false
        
}

const addPost = async (post: any, refreshToken: string) => {
    apiClient.setHeader('Authorization', 'Bearer ' + refreshToken)
    const data: any = await apiClient.get('/auth/refresh')
    apiClient.setHeader('Authorization', 'Bearer ' + data.data.accessToken)
    const res: any = await apiClient.post('/post', post)
    if(res.ok){
        return {refreshToken: data.data.refreshToken}
    }
    return false
}

const deletePost = async(postID: string, refreshToken: string) => {
    apiClient.setHeader('Authorization', 'Bearer ' + refreshToken)
    const data: any = await apiClient.get('/auth/refresh')
    console.log(data.data)
    apiClient.setHeader('Authorization', 'Bearer ' + data.data.accessToken)
    const res: any = await apiClient.delete('/post/' + postID)
    if(res.ok){
        return {refreshToken: data.data.refreshToken}
    }
}

const updatePost = async(post: any, refreshToken: string, postID: string) => {
    apiClient.setHeader('Authorization', 'Bearer ' + refreshToken)
    const data: any = await apiClient.get('/auth/refresh')
    console.log(data.data)
    apiClient.setHeader('Authorization', 'Bearer ' + data.data.accessToken)
    const res: any = await apiClient.put('/post/' + postID,  post)
    console.log("UPDATE ______" + res)
    if(res.ok){
        return {refreshToken: data.data.refreshToken}
    }
}

const uploadImage = async(image: any) => {
    return await apiClient.post("/file/file", image, {headers:{"Content-Type": 'multipart/form-data'}})
}

export default {
    getAllPosts,
    getUserPosts,
    addPost,
    getSpecificPost,
    deletePost,
    updatePost,
    uploadImage
}