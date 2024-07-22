import { create } from "apisauce";

const apiClient = create({

 baseURL: 'http://172.20.10.2:3000',
 headers: { Accept: 'application/vnd.github.v3+json'},
})


export default apiClient

