import { BellAlertIcon } from '@heroicons/react/24/solid';

const Notification = () => {
  return (
    <div>
      <button className="size-10 flex justify-center items-center text-secondary rounded-full hover:bg-secondary hover:bg-opacity-20 transition-all duration-200">
        <BellAlertIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Notification;
