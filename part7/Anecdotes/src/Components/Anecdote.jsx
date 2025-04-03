const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <h3>By: {anecdote.author}</h3>
      <p>Has {anecdote.votes} Votes</p>
      <p>
        For More Information, Go To: <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  );
};

export default Anecdote;
