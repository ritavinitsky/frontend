import { create } from "apisauce";

const port = process.env.PORT || 3000;

const apiClient = create({
 baseURL: `http://localhost:${port}`,
 headers: { Accept: 'application/vnd.github.v3+json'},
})


export default apiClient

