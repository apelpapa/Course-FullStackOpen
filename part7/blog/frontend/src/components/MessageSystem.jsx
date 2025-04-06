import { useSelector } from "react-redux";

const MessageSystem = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification) return null;
  
  return notification.startsWith("Error: ") ? (
    <h2 className="errorMessage">{notification}</h2>
  ) : (
    <h2 className="normalMessage">{notification}</h2>
  );
};
export default MessageSystem;
