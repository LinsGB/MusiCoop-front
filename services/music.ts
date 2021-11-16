import axios from 'axios';
import {AsyncStorage} from 'react-native';

const api = axios.create({baseURL: 'https://musicoop-api.herokuapp.com'});


const getMusic = async (id: number) => {
  return await api.get(`/musics?post_id=${id}`);
};

const getContribution = async (id: number) => {
  return await api.get(`/musics?contribuition_id=${id}`);
};

export {getMusic, getContribution};
