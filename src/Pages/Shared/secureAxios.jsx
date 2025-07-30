import axios from 'axios';

export default function getSecureAxios(baseURL = 'https://matremony-server.vercel.app') {
  return axios.create({
    baseURL,
    withCredentials: true,
  });
}
