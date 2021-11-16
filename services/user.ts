import axios from 'axios';
import {AsyncStorage} from 'react-native';

const api = axios.create({
  baseURL: 'https://musicoop-api.herokuapp.com',
});

interface Users {
  email:string,
  username:string,
  name:string,
  password:string
}

function authHeaders(token:string) {
  return {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      ContentType: 'application/json',
    },
  };
}

export const apiUser = {
  async logInGetToken(email: string, password: string,) {
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);

    return api.post('/login', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((response) => response)
      .catch((err) => err.response)
  },
  async getToken(token: string) {
    return api.get('/auth/token', authHeaders(token))
      .then((response) => response)
  },
  async createUser(payload: Users){
    return api.post('/user', payload)
      .then((response) => response)
      .catch((err) => err.response)
  },
  async getUserById(id:number){
    return api.get(`/user?id=${id}`, authHeaders(await AsyncStorage.getItem('token')))
  }
}
