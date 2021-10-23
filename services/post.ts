import axios from 'axios';

const api = axios.create({baseURL: 'http://192.168.0.22:8000'});

const listPosts = async () => {
  return (await api.get('/projects')).data;
};

const createComment = async (payload: TComment) => {
  return await api.post('/coments', payload);
};

const createPost = async (payload: TPost) => {
  const bodyFormData = new FormData();
  console.log('TEST => ', payload);
  bodyFormData.append('project_name', payload.project_name);
  bodyFormData.append('file', payload.file);
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
  project_name: string;
  file: any;
  user: number;
};

export {createPost, createComment, listPosts};
