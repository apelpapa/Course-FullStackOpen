import { useResource } from "./hooks";
import { useEffect, useState } from "react";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const App = () => {
  const noteService = useResource("http://localhost:3005/notes")
  const personService = useResource("http://localhost:3005/persons")
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  const [notes, setNotes] = useState([]);
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const getResources = async () => {
      const noteResponse = await noteService.getAll();
      const personResponse = await personService.getAll();
      setNotes(noteResponse);
      setPersons(personResponse);
    };
    getResources();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNoteSubmit = async (event) => {
    event.preventDefault()
    const newNote = await noteService.create({ content: content.value })
    setNotes(prevNotes => prevNotes.concat(newNote))
  }
  const handlePersonSubmit = async (event) => {
    event.preventDefault()
    const newPerson = await personService.create({ name: name.value, number: number.value})
    setPersons(prevPersons => prevPersons.concat(newPerson))
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  );
};

export default App;
