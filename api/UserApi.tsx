import apiClient from "./ClientApi";
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


/*const getUser = async (id: string, refreshToken: string) => {
    apiClient.setHeader('Authorization', 'Bearer ' + refreshToken)
    const data: any = await apiClient.get('/user/' + id)
    apiClient.setHeader('Authorization', 'Bearer ' + data.data['accessToken'])
    return data.data;
    //return await apiClient.get('/user/' + id)

}
*/

/*
const getUser = async(refreshToken: string, id: string) => {
    apiClient.setHeader('Authorization', 'Bearer ' + refreshToken)
    const data: any = await apiClient.get('/auth/refresh')
    apiClient.setHeader('Authorization', 'Bearer ' + data.data['accessToken'])
    const res: any = await apiClient.get('/user/' + id)
    console.log(res.data)
    if(res.ok){
        return {result: res.data, refreshToken: data.data.refreshToken}
    }
    return false
        
}
*/

const getUser = async (id: string, refreshToken: string) => {
    apiClient.setHeader('authorization', 'Bearer ' + refreshToken)
    const data: any = await apiClient.get('/auth/refresh')
    apiClient.setHeader('authorization', 'Bearer ' + data.data['accessToken'])
    const user = await apiClient.get('/user/' + id)
    console.log(user.data)
    if(user)
        return { currentUser: user.data }
    else{
        return false
    }
}

const updateUser = async (user: any, refreshToken: string) => {
    console.log(user)
    apiClient.setHeader('authorization', 'Bearer ' + refreshToken)
    const data: any = await apiClient.get('/auth/refresh')
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
    updateUser
    //getUserById
}