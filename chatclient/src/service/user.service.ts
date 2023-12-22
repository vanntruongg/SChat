import { jwtDecode } from 'jwt-decode';
import authService from './auth.service';
import { axiosClient } from './apis.service';
import { IUser, IFriend } from '../interfaces/index';
import { AxiosResponse } from 'axios';

class UserService {
  public getEmailFromToken = (): string | null => {
    try {
      const token = authService.getAccessToken();
      if (token) {
        const tokenDecoded = jwtDecode(token);
        return tokenDecoded.sub ?? null;
      } else return null;
    } catch (error) {
      console.log('getEmailFromToken: ', error);
      return null;
    }
  };

  public getUserByEmail = async (): Promise<IUser | undefined> => {
    try {
      const email = this.getEmailFromToken();
      if (email) {
        const res: AxiosResponse = await axiosClient.get(`/user/get/email/${email}`);
        return res.data.data;
      }
    } catch (error) {
      console.log('Get user by email error: ', error);
    }
  };
  public getUserById = async (userId: number | undefined): Promise<IUser | undefined> => {
    try {
      const email = this.getEmailFromToken();
      if (email) {
        const res: AxiosResponse = await axiosClient.get(`/user/get/${userId}`);
        return res.data.data;
      }
    } catch (error) {
      console.log('Get user by email error: ', error);
    }
  };

  public getAllUserNotFriends = async (userId: number): Promise<IUser[]> => {
    try {
      const res: AxiosResponse = await axiosClient.get(`/user/get/not/friends/${userId}`);
      return res.data.data;
    } catch (error) {
      console.log('Get all user not friend error:', error);
      return [];
    }
  };

  public getAllFriends = async (userId: number): Promise<IFriend[]> => {
    try {
      const res: AxiosResponse = await axiosClient.get(`/friends/${userId}`);
      return res.data.data;
    } catch (error) {
      console.log('Get all friend error:', error);
      return [];
    }
  };

  public getAllFriendRequestSent = async (userId: number): Promise<IFriend[]> => {
    try {
      const res: AxiosResponse = await axiosClient.get(`/friends/request/sent/${userId}`);
      return res.data.data;
    } catch (error) {
      console.log('Get all friend error:', error);
      return [];
    }
  };

  public getAllFriendRequestRecevied = async (userId: number): Promise<IFriend[]> => {
    try {
      const res: AxiosResponse = await axiosClient.get(`/friends/request/received/${userId}`);
      return res.data.data;
    } catch (error) {
      console.log('Get all friend error:', error);
      return [];
    }
  };
}

export default new UserService();
