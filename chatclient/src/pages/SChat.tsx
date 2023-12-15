import Logo from '../assets/Logo.png';
const SChat = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-tertiary select-none pointer-events-none">
      <img src={Logo} alt="" className="opacity-30 object-contain" />
    </div>
  );
};

export default SChat;
