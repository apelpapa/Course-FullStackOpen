import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, voteAnecdote } from "./requests";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import NotificationContext from "./NotificationContext";
import { useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'DISPLAY': {
      return action.payload
    }
    case 'CLEAR': {
      return ''
    }
  }
}

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, "");
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        anecdotes.map((anecdote) =>
          anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
        )
      );
      notificationDispatch({
        type: "DISPLAY",
        payload: `You Upvoted: ${updatedAnecdote.content}`,
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 5000);
    },
  });

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
  });

  if (result.isError) {
    notificationDispatch({ type: "DISPLAY", payload: "Error fetching anecdotes." });
    return (
      <NotificationContext.Provider value={[notification, notificationDispatch]}>
        <div>
          <h3>Anecdote app</h3>
          <Notification />
        </div>
      </NotificationContext.Provider>
    );
  }

  if (result.isLoading) {
    return <div>Still Loading...</div>;
  }

  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    newAnecdoteMutation.mutate(anecdote);
  };

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <div>
        <h3>Anecdote app</h3>
        <Notification />
        <AnecdoteForm />
        {anecdotes.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export default App;