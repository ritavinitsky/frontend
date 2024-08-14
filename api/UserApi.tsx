import apiClient from "./ClientApi";
import { MainRefreshToken } from "../App";
import { User } from '../Model/UserModel';


const getAllStudents = async () => {
    return await apiClient.get('/student')
}

/*const getUserById = async (userId: string) => {
   //return await apiClient.get("user/" + userId);
   const res:any = await apiClient.get("user/" + userId);
   return res.data;
  };
*/


  


  const getUser = async (id: string, refreshToken: string) => {
    if(MainRefreshToken.refreshToken){
        console.log("using MainRefreshToken " + MainRefreshToken.refreshToken);
        refreshToken = MainRefreshToken.refreshToken;
    }
    apiClient.setHeader('authorization', 'Bearer ' + refreshToken)
    const data: any = await apiClient.get('/auth/refresh')
    MainRefreshToken.refreshToken = data.data.refreshToken;
    apiClient.setHeader('authorization', 'Bearer ' + data.data['accessToken'])
    const user = await apiClient.get('/user/' + id)
    console.log(user.data)
    if(user)
        return { currentUser: user.data,refreshToken: MainRefreshToken.refreshToken}
    else{
        return false
    }
}

const updateUser = async (user: any, refreshToken: string) => {
    if(MainRefreshToken.refreshToken != ""){
        console.log("using MainRefreshToken " + MainRefreshToken.refreshToken);
        refreshToken = MainRefreshToken.refreshToken;
    }
    console.log(user)
    apiClient.setHeader('authorization', 'Bearer ' + refreshToken)
    const data: any = await apiClient.get('/auth/refresh')
    MainRefreshToken.refreshToken = data.data.refreshToken;
    apiClient.setHeader('authorization', 'Bearer ' + data.data['accessToken'])
    const result = await apiClient.put('/user/' + user.id, user)
    if(result)
        return {refreshToken: data.data.refreshToken}
    else
        return false
}

const addStudent = async (student: any) => {
    return await apiClient.post('/user', student)
}

const uploadImage = async(image: any) => {
    return await apiClient.post("/file/file", image, {headers:{"Content-Type": 'multipart/form-data'}})
}

export default {
    getAllStudents,
    addStudent,
    uploadImage,
    getUser,
    updateUser,
}