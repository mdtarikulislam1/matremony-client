import axios from "axios"

export const saveUserDb = async users =>{
const {data}=await axios.post(`${import.meta.env.VITE_api_url}/users`,users)
}