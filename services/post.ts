import axios from 'axios';

const api = axios.create({
  baseURL: 'https://musicoop-api.herokuapp.com',
});

const listPosts = async () => {
  return (await api.get('/posts')).data;
};

const createContribuition = async (id: number, payload: TContribuition) => {
  return await api.post(`/contribuitions?post_id=${id}`, payload);
};

const createPost = async (payload: any) => {
  const bodyFormData = new FormData();
  const {post_name, description, file} = payload
  bodyFormData.append('post_name', post_name);
  bodyFormData.append('description', description);
  bodyFormData.append("file", file);
  return await api.post('/posts', bodyFormData, {
    headers: {
      accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
};

type TContribuition = {
  name: number;
  description: string;
};

type TPost = {
  post_name: string;
  file: any;
  user: number;
  size: number,
  type: string
};

export {createPost, createContribuition, listPosts};
