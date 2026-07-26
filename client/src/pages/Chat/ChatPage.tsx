import ChatInput from "../../components/chat/ChatInput";
import ChatWindow from "../../components/chat/ChatWindow";

function ChatPage() {
  return (
    <div className="flex h-full flex-col">
      <ChatWindow />
      <ChatInput />
    </div>
  );
}

export default ChatPage;