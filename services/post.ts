import axios from 'axios';

const api = axios.create({baseURL: 'http://192.168.0.22:8000'});

const listPosts = async () => {
  return (await api.get('/projects')).data;
};

const createComment = async (payload: TComment) => {
  return await api.post('/comments', payload);
};

const createPost = async (post_name: string, file: any) => {
  const bodyFormData = new FormData();
  console.log('TEST => ', file);
  bodyFormData.append('post_name', post_name);
  bodyFormData.append('file', file);
  return await api.post('/projects', bodyFormData, {
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
};

export {createPost, createComment, listPosts};
