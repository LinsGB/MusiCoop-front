import axios from 'axios';

const api = axios.create({baseURL: 'http://192.168.0.61:8000'});

const listPosts = async () => {
  return (await api.get('/projects')).data;
};

const createComment = async (payload: TComment) => {
  return await api.post('/coments', payload);
};

const createPost = async (payload: TPost) => {
  return await api.post('/projects', payload);
};

type TComment = {
  project: number;
  comment: string;
};

type TPost = {
  project_name: string;
  file: string;
  user: number;
};

export {createPost, createComment, listPosts};
