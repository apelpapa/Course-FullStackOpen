import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { removeMessage, showMessage } from "../reducers/notificationReducer";
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const newAnecdote = async (event) => {
    event.preventDefault();
    const newAnecdote = await anecdoteService.newAnecdote(event.target.newAnecdote.value)
    dispatch(createAnecdote(newAnecdote));
    dispatch(showMessage(`You Added The Anecdote: ${newAnecdote}`))
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
