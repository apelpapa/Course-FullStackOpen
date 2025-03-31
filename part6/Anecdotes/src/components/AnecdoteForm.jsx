import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const newAnecdote = (event) => {
    event.preventDefault();
    dispatch(createAnecdote(event.target.newAnecdote.value));
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
