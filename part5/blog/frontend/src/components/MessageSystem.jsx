const MessageSystem = (props) => {
    if (!props.message) return;
    return props.message.startsWith("Error: ") ? (
      <h2 className="errorMessage">{props.message}</h2>
    ) : (
      <h2 className="normalMessage">{props.message}</h2>
    );
  };

  export default MessageSystem