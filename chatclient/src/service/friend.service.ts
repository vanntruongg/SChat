import { axiosClient } from './apis.service';

class FriendService {
  public friendRequest = async (senderId: number, receiverId: number) => {
    const formData = new FormData();
    formData.append('senderId', senderId.toString());
    formData.append('receiverId', receiverId.toString());
    try {
      const res = await axiosClient.post('/friend/request', formData);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  public confirmFriendRequest = async (friendId: number) => {
    try {
      const res = await axiosClient.post(`/confirm/friend/request/${friendId}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
  public cancelFriendRequest = async (friendId: number) => {
    try {
      const res = await axiosClient.post(`/cancel/friend/request/${friendId}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };
  public deleteFriendRequest = async (friendId: number) => {
    try {
      const res = await axiosClient.post(`/delete/friend/request/${friendId}`);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  public deleteFriend = async (user1Id: number, user2Id: number) => {
    const formData = new FormData();
    formData.append('user1Id', user1Id.toString());
    formData.append('user2Id', user2Id.toString());
    try {
      const res = await axiosClient.post(`/delete/friend`, formData);
      return res.data.data;
    } catch (error) {
      console.error(error);
    }
  };
}

export default new FriendService();
