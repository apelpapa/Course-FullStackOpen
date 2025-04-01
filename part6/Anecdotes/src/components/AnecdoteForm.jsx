import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { removeMessage, showMessage } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const newAnecdote = (event) => {
    event.preventDefault();
    dispatch(createAnecdote(event.target.newAnecdote.value));
    dispatch(showMessage(`You Added The Anecdote: ${event.target.newAnecdote.value}`))
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000);
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
