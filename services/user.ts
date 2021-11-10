import axios from 'axios';

const api = axios.create({
  baseURL: 'https://musicoop-api.herokuapp.com',
});

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
    return api.get('/auth/token')
      .then((response) => response)
  },
  async createUser(payload: any){
    return api.post('/user', payload)
      .then((response) => response)
      .catch((err) => err.response)
  },
}
