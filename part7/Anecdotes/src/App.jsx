import { useState } from "react";
import { Route, Routes, useMatch, useNavigate } from "react-router-dom";
import Menu from "./Components/Menu";
import AnecdoteList from "./Components/AnecdoteList";
import Footer from "./Components/Footer";
import About from "./Components/About";
import CreateNew from "./Components/CreateNew";
import Anecdote from "./Components/Anecdote";

const Notification = ({ notification }) =>{
  return <p>{notification}</p>
}

const App = () => {
  const navigate = useNavigate();
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  // eslint-disable-next-line no-unused-vars
  const [notification, setNotification] = useState("");
  
  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`You added the Anecdote ${anecdote.content}`)
    setTimeout(() => {
      setNotification('')
    }, 5000);
    navigate('/');
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  // eslint-disable-next-line no-unused-vars
  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const match = useMatch('/anecdotes/:id')
  match ? console.log(match) : null
  const anecdote = match ? anecdotes.find((anecdote) => Number(match.params.id) === anecdote.id) : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification} />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
