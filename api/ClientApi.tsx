import { create } from "apisauce";

const port = process.env.PORT || 3000;

// `http://localhost:${port}`


const apiClient = create({
 baseURL: 'https://backend-69iy.onrender.com/',
 headers: { Accept: 'application/vnd.github.v3+json'},
})


export default apiClient

