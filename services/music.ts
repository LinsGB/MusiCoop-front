import axios from 'axios'

const api = axios.create({baseURL: 'http://192.168.0.22:8000'})

const getMusic = async (id: number) => {
    return await api.get(`/musics/${id}`)
}