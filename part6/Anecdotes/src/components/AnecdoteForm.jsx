import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { notificationManager} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const newAnecdote = async (event) => {
    event.preventDefault();
    const response = await dispatch(createAnecdote(event.target.newAnecdote.value))
    dispatch(notificationManager(`You Added The Anecdote: ${response.content}`, 5))
    event.target.newAnecdote.value = "";
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div>
          <input name="newAnecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
