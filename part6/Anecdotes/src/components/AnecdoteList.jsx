import { useSelector, useDispatch } from "react-redux";
import { castVote } from "../reducers/anecdoteReducer";
import { removeMessage, showMessage } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    );
  });
  const dispatch = useDispatch();
  const vote = (anecdote) => {
    dispatch(castVote(anecdote.id));
    dispatch(showMessage(`You Upvoted: ${anecdote.content}`));
    setTimeout(() => {
      dispatch(removeMessage());
    }, 5000);
  };
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);
  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
