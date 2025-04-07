import { addComment } from "../reducers/blogReducer";
import Toggleable from "./Toggleable";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const PostCommentForm = ({ blog }) => {
  const [comment, setComment] = useState("");
  const user = useSelector((state => state.user));
  const dispatch = useDispatch();

  return (
    <div>
      <Toggleable buttonLabel={"Add New Comment"} closeLabel={"Cancel"}>
        <label htmlFor="comment">Comment: </label>
        <input
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button onClick={() => dispatch(addComment(blog, comment, user.token))}>
          Submit
        </button>
      </Toggleable>
    </div>
  );
};

export default PostCommentForm;
