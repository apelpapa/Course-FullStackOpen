import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/userReducer";
import MessageSystem from "./MessageSystem";

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>BlogMania</h2>
      <MessageSystem />
      <p>
        {user.name} is Logged in{" "}
        <button
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </button>
      </p>
    </div>
  );
};

export default Header;
