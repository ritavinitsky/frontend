import { create } from "apisauce";

const apiClient = create({
 baseURL: 'http://10.200.204.230:3000',
 headers: { Accept: 'application/vnd.github.v3+json'},
})


export default apiClient

