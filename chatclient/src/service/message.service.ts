import { AxiosResponse } from 'axios';
import { axiosClient } from './apis.service';

class MessageService {
  public getAllByChatId = async (chatId: number): Promise<[]> => {
    try {
      const res: AxiosResponse = await axiosClient.get(`/messages/get/chat/${chatId}`);
      console.log(res);

      return res.data.data ?? [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };
}

export default new MessageService();
