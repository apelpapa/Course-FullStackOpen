import { useSelector, useDispatch } from "react-redux";
import { upVote } from "../reducers/anecdoteReducer";
import { notificationManager } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.filter === ""
      ? state.anecdotes
      : state.anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
        )
  );
  const dispatch = useDispatch();
  const vote = (anecdote) => {
    dispatch(upVote(anecdote.id));
    dispatch(notificationManager(`You Upvoted: ${anecdote.content}`, 5))
  };
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);
  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          {/* {console.log(anecdote)} */}
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
