import { axiosClient } from './apis.service';

class UserChat {
  public getAllChatByUserId = async (userId: number | undefined) => {
    try {
      const res = await axiosClient.get(`/user/get/chats/${userId}`);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };
}

export default new UserChat();
