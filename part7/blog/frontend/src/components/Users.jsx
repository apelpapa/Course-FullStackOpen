import { useDispatch, useSelector } from "react-redux";
import { initializeAllUsers } from "../reducers/allUsersReducer";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.allUsers);
  console.log(users);

  useEffect(() => {
    dispatch(initializeAllUsers());
  }, []);
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Number Blog Posts</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogPosts.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
