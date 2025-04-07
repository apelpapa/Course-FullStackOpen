import { addComment } from "../reducers/blogReducer";
import Toggleable from "./Toggleable";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Button, TextField } from "@mui/material";

const PostCommentForm = ({ blog }) => {
  const [comment, setComment] = useState("");
  const user = useSelector((state => state.user));
  const dispatch = useDispatch();

  return (
    <div>
      <Toggleable buttonLabel={"Add New Comment"} closeLabel={"Cancel"}>
        <label htmlFor="comment">Comment: </label>
        <TextField
            size="small"
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <Button variant="contained" onClick={() => dispatch(addComment(blog, comment, user.token))}>
          Submit
        </Button>
      </Toggleable>
    </div>
  );
};

export default PostCommentForm;
