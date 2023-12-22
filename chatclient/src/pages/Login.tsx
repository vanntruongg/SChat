import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import authService from '../service/auth.service';
import userService from '../service/user.service';
import { IUser } from '../interfaces/index';
import { login } from '../redux/authSlice';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res: any = await authService.login({
      email: email,
      password: password,
    });

    if (res.status === 200) {
      navigate('/schat');
      const user: IUser | undefined = await userService.getUserByEmail();
      if (user) {
        dispatch(login(user));
      }
    } else {
      toast('Email or Password invalid!');
    }
  };

  return (
    <div className="h-screen w-full bg-tertiary flex justify-center items-center">
      <ToastContainer />
      <div className="min-w-[360px] min-h-[60vh] p-5 flex flex-col items-stretch bg-secondary rounded-md shadow-sm">
        <div className="text-center">
          <h2 className="text-24 font-bold">
            {/* Welcome back */}
            <span className="text-primary">S</span>Chat
          </h2>
          <p className="text-14 italic text-gray-500">Login to continue</p>
        </div>
        <form action="" onSubmit={handleLogin} className="flex flex-1">
          <div className="w-full flex flex-col justify-between">
            <div className="flex flex-col gap-3 my-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className={`px-4 py-3 border border-slate-300 rounded-lg placeholder:text-14 ${
                  email !== '' ? 'border-primary' : 'focus:border-primary'
                } `}
                spellCheck={false}
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={`px-4 py-3 border border-slate-300 rounded-lg placeholder:text-14 ${
                  password !== '' ? 'border-primary' : 'focus:primary'
                } `}
                required
              />
              <div className="flex justify-end">
                <a
                  href=""
                  className="text-12 text-gray-500 underline hover:underline hover:text-blue-700"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div>
              <div className="my-4 p-0.5  bg-gradient-to-br from-primary to-blue-300 rounded-lg">
                <button className="w-full px-4 py-3 text-primary uppercase font-semibold border rounded-md bg-white transition-all duration-300 hover:bg-gray-50 hover:scale-[0.99]">
                  Login
                </button>
              </div>
              <div className="text-center">
                <Link to={'/register'} className="text-14 text-gray-500 hover:text-primary">
                  Create a new account?
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
