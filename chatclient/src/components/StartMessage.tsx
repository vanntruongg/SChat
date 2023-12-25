import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/solid';

const StartMessage = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex">
        <ChatBubbleBottomCenterTextIcon className="size-32" />
        <h5 className="text-18 flex items-end -translate-x-10">
          Please select a chat or user to start the conversation.
        </h5>
      </div>
    </div>
  );
};

export default StartMessage;
