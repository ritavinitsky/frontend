import { create } from "apisauce";

const port = process.env.PORT || 3000;


// baseURL: 'https://backend-69iy.onrender.com/',
// baseURL: 'http://212.116.187.226:3000',


const apiClient = create({
    baseURL: 'https://backend-69iy.onrender.com/',
    headers: { Accept: 'application/vnd.github.v3+json'},
})


export default apiClient

