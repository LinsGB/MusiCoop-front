import axios from 'axios';

const api = axios.create({baseURL: 'http://192.168.0.22:8000'});

const listPosts = async () => {
  return (await api.get('/projects')).data;
};

const createComment = async (payload: TComment) => {
  return await api.post('/comments', payload);
};

const createPost = async (payload: any) => {
  const bodyFormData = new FormData();
<<<<<<< HEAD
  console.log('TEST => ', file);
  bodyFormData.append('post_name', post_name);
  bodyFormData.append('file', file);
  return await api.post('/projects', bodyFormData, {
=======
  console.log('TEST => ', payload);
  bodyFormData.append('post_name', "teste");
  bodyFormData.append("file", payload);
  return api.post('/posts', bodyFormData, {
>>>>>>> 21c6542eef8894af16d034217f214af2a8d7033b
    headers: {
      accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
};

type TComment = {
  project: number;
  comment: string;
};

type TPost = {
  post_name: string;
  file: any;
  user: number;
  size: number,
  type: string
};

export {createPost, createComment, listPosts};
