import axios from "axios";

const Instance = axios.create({
    baseURL:"http://localhost:8001/",
})
export default Instance;