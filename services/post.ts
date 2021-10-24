import axios from 'axios';

const api = axios.create({baseURL: 'http://192.168.0.5:8000'});

const listPosts = async () => {
  return (await api.get('/posts')).data;
};

const createComment = async (payload: TComment) => {
  return await api.post('/comments', payload);
};

const createPost = async (payload: any) => {
  const bodyFormData = new FormData();
  console.log('TEST => ', payload);
  bodyFormData.append('post_name', "teste");
  bodyFormData.append("file", payload);
  return api.post('/posts', bodyFormData, {
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
