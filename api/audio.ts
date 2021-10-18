import api from '../config/axios/AudioAxios';

class AudioApi {
  public getAudio = async (): Promise<any> => {
    try {
      const response = await api.get('musics');

      return response.data;
    } catch (error: any) {
      throw error;
    }
  };
}
export default new AudioApi();
