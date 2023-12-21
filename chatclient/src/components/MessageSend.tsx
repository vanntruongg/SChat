import { formatLongToTime } from '../utils/dateTimeUtils';

interface MessageProps {
  message: string;
  time: string;
}

const MessageSend = ({ message, time }: MessageProps) => {
  return (
    <div className="inline px-3 py-1 bg-primary rounded-b-xl rounded-tl-xl">
      <span className="">{message}</span>
      <p className="text-10 text-right">{formatLongToTime(time)}</p>
    </div>
  );
};

export default MessageSend;
