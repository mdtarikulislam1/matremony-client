import axios from 'axios';

export default function getSecureAxios(baseURL = 'http://localhost:3000') {
  return axios.create({
    baseURL,
    withCredentials: true,
  });
}
