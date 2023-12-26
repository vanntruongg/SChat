import { axiosClient } from './apis.service';
import { PrivateChat } from '~/interfaces';
import { PrivateChatResponse } from '~/types';

class ChatService {
  createPrivateChat = async (user1Id: number, user2Id: number): Promise<PrivateChat | null> => {
    try {
      const res = await axiosClient.post(
        `/get/create/private/chat?user1Id=${user1Id}&user2Id=${user2Id}`,
      );
      return res.data.data as PrivateChat;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  getAllPrivateChatByUserId = async (userId: number): Promise<PrivateChatResponse[] | []> => {
    try {
      const res = await axiosClient.get(`/chats/private/${userId}`);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  getChatId = async (user1Id: number, user2Id: number): Promise<number | null> => {
    try {
      const res = await axiosClient.get(
        `/get/id/private/chat?user1Id=${user1Id}&user2Id=${user2Id}`,
      );
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  getPrivateRoomName = async (user1Id: number, user2Id: number): Promise<string | ''> => {
    try {
      const res = await axiosClient.get(
        ` /get/private/room-name?user1Id=${user1Id}&user2Id=${user2Id}`,
      );
      return res.data.data;
    } catch (error) {
      console.error(error);
      return '';
    }
  };
}

export default new ChatService();
