import { AxiosResponse } from 'axios';
import { axiosClient } from './apis.service';
import { PrivateChat } from '~/interfaces';

class ChatService {
  createPrivateChat = async (user1Id: number, user2Id: number): Promise<PrivateChat | null> => {
    try {
      const res: AxiosResponse = await axiosClient.post(
        `/get/create/private/chat?user1Id=${user1Id}&user2Id=${user2Id}`,
      );
      return res.data.data as PrivateChat;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}

export default new ChatService();
