import { axiosClient } from './apis.service';

class MessageService {
  public getAllByChatId = async (chatId: number) => {
    try {
      const res = await axiosClient.get(`/messages/get/chat/${chatId}`);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };
}

export default new MessageService();
