import { FormEvent, useState } from 'react';
import authService from '../service/auth.service';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const Register = () => {
  const [realName, setRealName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await authService.register({
      realName,
      email,
      password,
    });
    if (res === 200) {
      navigate('/login');
    }
  };

  return (
    <div className="h-screen w-full bg-tertiary flex justify-center items-center">
      <ToastContainer />
      <div className="min-w-[360px] min-h-[60vh] p-5 flex flex-col items-stretch bg-secondary rounded-md shadow-sm">
        <div className="text-center">
          <h2 className="text-24 font-bold">
            Welcome to <span className="text-primary">S</span>Chat
          </h2>
          <p className="text-14 italic text-gray-500">
            Create account with email.
          </p>
        </div>
        <form action="" onSubmit={handleRegister} className="flex flex-1">
          <div className="w-full flex flex-col justify-between">
            <div className="flex flex-col gap-3 my-4">
              <input
                type="text"
                value={realName}
                onChange={(e) => setRealName(e.target.value)}
                placeholder="Name"
                className={`px-4 py-3 border border-slate-300 rounded-lg placeholder:text-14 ${
                  realName !== '' ? 'border-primary' : 'focus:border-primary'
                } `}
                spellCheck={false}
                required
              />
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
            </div>
            <div>
              <div className="my-4 p-0.5  bg-gradient-to-br from-primary to-blue-300 rounded-lg">
                <button className="w-full px-4 py-3 text-primary uppercase font-semibold border rounded-md bg-white transition-all duration-300 hover:bg-gray-50 hover:scale-[0.99]">
                  Register
                </button>
              </div>
              <div className="text-center">
                <Link
                  to={'/login'}
                  className="text-14 text-gray-500 underline hover:text-primary"
                >
                  Login now.
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
