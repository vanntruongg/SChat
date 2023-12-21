import { formatLongToTime } from '../utils/dateTimeUtils';

interface MessageProps {
  message: string;
  time: string;
}

const MessageReceive = ({ message, time }: MessageProps) => {
  return (
    <div className="inline px-3 py-1 bg-secondary text-quaternary rounded-b-xl rounded-tr-xl">
      <span className="">{message}</span>
      <p className="text-10">{formatLongToTime(time)}</p>
    </div>
  );
};

export default MessageReceive;
