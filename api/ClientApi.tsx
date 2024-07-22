import { create } from "apisauce";

const apiClient = create({
<<<<<<< HEAD
 baseURL: 'http://localhost:3000',
=======
 baseURL: 'http://172.20.10.2:3000',
>>>>>>> f31084f (client v5)
 headers: { Accept: 'application/vnd.github.v3+json'},
})


export default apiClient

