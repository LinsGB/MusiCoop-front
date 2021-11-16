import axios from 'axios';
import {AsyncStorage} from 'react-native';

const api = axios.create({
  baseURL: 'https://musicoop-api.herokuapp.com',
});

function authHeaders(token:string) {
  return {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      ContentType: 'application/json',
    },
  };
}

const listPosts = async () => {
  return (await api.get('/posts', authHeaders(await AsyncStorage.getItem('token')))).data;
};

const findPost = async (postId:number) => {
  return (await api.get(`/post?post_id=${postId}`, authHeaders(await AsyncStorage.getItem('token')))).data;
};

const createContribuition = async (id: number, payload: any) => {
  const bodyFormData = new FormData();
  const {name, description, file} = payload;
  bodyFormData.append('name', name);
  bodyFormData.append('description', description);
  bodyFormData.append('file', file);
  return await api.post(`/contribuitions?post_id=${id}`, bodyFormData, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};


const createPost = async (payload: any) => {
  const bodyFormData = new FormData();
  const {post_name, description, file} = payload;
  bodyFormData.append('post_name', post_name);
  bodyFormData.append('description', description);
  bodyFormData.append('file', file);
  return await api.post('/posts', bodyFormData, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export {createPost, createContribuition, listPosts, findPost};
