import PropTypes from "prop-types";

const MessageSystem = (props) => {
  if (!props.message) return null;
  return props.message.startsWith("Error: ") ? (
    <h2 className="errorMessage">{props.message}</h2>
  ) : (
    <h2 className="normalMessage">{props.message}</h2>
  );
};

MessageSystem.propTypes = {
  message: PropTypes.string,
};

export default MessageSystem;
