import axios from 'axios';

const api = axios.create({
  baseURL: 'https://musicoop-api.herokuapp.com',
});

const listPosts = async () => {
  return (await api.get('/posts')).data;
};

const createComment = async (payload: TComment) => {
  return await api.post('/comments', payload);
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
