import { useState } from "react";

const Persons = (props) => {
  return (
    <>
      {props.persons.map((person) => {
        return (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        );
      })}
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const currentNameChange = (event) => {
    setNewName(event.target.value);
  };

  const currentNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const currentFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const handleSubmitClick = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    const dupFilter = persons.filter(
      (person) => person.name === newPerson.name
    );
    if (dupFilter.length > 0) {
      alert(`${newPerson.name} Already Exists`);
      setNewName("");
      return;
    }

    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter By Name:{" "}
        <input onChange={currentFilterChange} value={newFilter} />
      </div>
      <h2>Add New:</h2>
      <form>
        <div>
          name: <input onChange={currentNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={currentNumberChange} value={newNumber} />
        </div>
        <div>
          <button onClick={handleSubmitClick}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  );
};

export default App;
