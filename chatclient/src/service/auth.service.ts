import { LoginType, RegisterType } from '~/types/login';
import { axiosClient } from './apis.service';
import { jwtDecode } from 'jwt-decode';

class AuthService {
  constructor() {}

  public login = async (loginRequest: LoginType) => {
    try {
      const res = await axiosClient.post('/auth/login', loginRequest);
      console.log(res);
      if (res.data.success) {
        this.setAccessToken(res.data.data.accessToken);
        this.setRefreshToken(res.data.data.refreshToken);
      }
      return res;
    } catch (err) {
      console.log('Login falied: ', err);
      return err;
    }
  };

  public register = async (registerRequest: RegisterType) => {
    try {
      console.log(registerRequest);
      const res = await axiosClient.post('/user/create', registerRequest);
      return res.status;
    } catch (err) {
      console.error('Register falied: ', err);
    }
  };

  public setAccessToken = (accessToken: string) => {
    localStorage.setItem('access_token', accessToken);
  };

  public getAccessToken = (): string | null => {
    return localStorage.getItem('access_token');
  };

  public setRefreshToken = (refreshToken: string) => {
    localStorage.setItem('refresh_token', refreshToken);
  };

  public getRefreshToken = (): string | null => {
    return localStorage.getItem('refresh_token');
  };

  public validateToken = (token: string) => {
    if (!token) {
      return false;
    }
    try {
      const nowSeconds = new Date().getTime() / 1000;
      const tokenDecoded = jwtDecode(token);
      if (typeof tokenDecoded === 'object' && tokenDecoded.exp) {
        return tokenDecoded.exp > nowSeconds;
      }
      return false;
    } catch (error) {
      console.error('Error decode token: ', error);
    }
  };

  public resfreshToken = async (token: string) => {
    try {
      const res = axiosClient.post('/auth/refresh-token', token);
      console.log(res);
    } catch (err) {
      console.error('Refresh Token failed: ', err);
    }
  };

  public isLoggedIn = () => {
    return !!this.getAccessToken();
  };

  public logout = async () => {
    await axiosClient.post('/auth/logout');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };
}

export default new AuthService();
