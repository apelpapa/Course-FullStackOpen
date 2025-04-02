import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postAnecdote } from "../requests";
import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);

  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: postAnecdote,
    onError: (error) => {
      notificationDispatch({
        type: "DISPLAY",
        payload: `Error: ${error}. This might be because the anecdote is too short (minimum 5 characters required).`,
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 5000);
    },
    onSuccess: (newAnecdote) => {
        const anecdotes = queryClient.getQueryData(["anecdotes"]);
        console.log(`dat`);
        queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
        notificationDispatch({
          type: "DISPLAY",
          payload: `You Added Anecdote: ${newAnecdote.content}`,
        });
        setTimeout(() => {
          notificationDispatch({ type: "CLEAR" });
        }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate(content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
