import axios from 'axios';

const api = axios.create({baseURL: 'https://musicoop-api.herokuapp.com'});

const getMusic = async (id: number) => {
  return await api.get(`/musics/${id}`);
};

const getContribution = async (id: number) => {
  return await api.get(`/musics?contribuition_id=${id}`);
};

export {getMusic, getContribution};
