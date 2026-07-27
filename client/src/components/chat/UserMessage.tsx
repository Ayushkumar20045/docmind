import Message from "./Message";

interface UserMessageProps {
  content: string;
}

export default function UserMessage({
  content,
}: UserMessageProps) {
  return (
    <Message isUser>
      <p className="whitespace-pre-wrap break-words">
        {content}
      </p>
    </Message>
  );
}