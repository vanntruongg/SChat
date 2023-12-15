import { jwtDecode } from 'jwt-decode';
import authService from './auth.service';
import { axiosClient } from './apis.service';
import User from '~/interfaces/user';
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

  public getUserByEmail = async (): Promise<User | undefined> => {
    try {
      const email = this.getEmailFromToken();
      if (email) {
        const res: AxiosResponse = await axiosClient.get(
          `/user/get/email/${email}`,
        );
        return res.data.data;
      }
    } catch (error) {
      console.log('Get user by email error: ', error);
    }
  };
}

export default new UserService();
