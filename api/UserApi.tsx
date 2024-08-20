import apiClient from "./ClientApi";
import { MainRefreshToken } from "../App";
import { User } from '../Model/UserModel';

const getAllStudents = async () => {
    return await apiClient.get('/student')
}

const updateUserPasswordByEmail = async (email: string, newPassword: string) => {
    try {
        console.log(`Fetching user details for email: ${email}`);
        const response = await apiClient.get(`/user/email/${email}`);

        if (response.status !== 200 || !response.data) {
            console.error(`User not found for email: ${email}`);
            return false;
        }

        // Send the new password directly to the backend
        console.log('Updating password for user');
        const updateResponse = await apiClient.put(`/user/email/${email}/password`, { password: newPassword });

        if (updateResponse.status === 200) {
            console.log('Password updated successfully');
            return updateResponse.data;
        } else {
            console.error(`Failed to update password: ${updateResponse.status}`);
            return false;
        }
    } catch (error) {
        console.error('Error updating password:', error);
        throw error;
    }
};

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
    // uploadImage,
    getUser,
    updateUser,
    updateUserPasswordByEmail
}