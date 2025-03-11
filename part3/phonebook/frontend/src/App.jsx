import personServer from "./services/personServerAccess";
import { useEffect } from "react";
import { useState } from "react";

const Persons = (props) => {
  return (
    <>
      {props.persons.map((person) => {
        return (
          <p key={person.id}>
            {person.name} {person.number}
            <button onClick={() => props.handleDelete(person)}>Delete</button>
          </p>
        );
      })}
    </>
  );
};

const PersonForm = (props) => {
  return (
    <form>
      <div>
        name: <input onChange={props.currentNameChange} value={props.newName} />
      </div>
      <div>
        number:{" "}
        <input onChange={props.currentNumberChange} value={props.newNumber} />
      </div>
      <div>
        <button onClick={props.handleSubmitClick}>add</button>
      </div>
    </form>
  );
};

const Filter = (props) => {
  return (
    <div>
      Filter By Name:
      <input onChange={props.currentFilterChange} value={props.newFilter} />
    </div>
  );
};

const Notification = ({ message }) => {
  if (message === null) {
    return;
  }
  if (message.includes("Error:")) {
    return (
      <div>
        <h2 className="error">{message}</h2>
      </div>
    );
  }
  return (
    <div>
      <h2 className="notification">{message}</h2>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [filterStatus, setFilterStatus] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personServer.get().then((response) => {
      setPersons(response);
    });
  }, []);

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
      if (
        confirm(
          `${dupFilter[0].name} already exists, Would you like to update their phone number?`
        )
      ) {
        personServer.putPerson(dupFilter[0].id, newPerson).then((response) => {
          setPersons(
            persons.map((person) => {
              return person.name === response.name ? response : person;
            })
          );
        });
      }
      return;
    }

    personServer
    .post(newPerson)
    .then((response) => {
      setPersons(persons.concat(response));
      setNewName("");
      setNewNumber("");
      setMessage(`Added ${newPerson.name} Successfully`);
      setTimeout(() => {
        setMessage(null);
      }, 1500);
    });
  };

  const handleDelete = (person) => {
    if (confirm(`Are you sure you want to delete: ${person.name}?`)) {
      personServer
        .deletePerson(person.id)
        .then((response) => {
          setMessage(`Deleted ${response.data.name} Successfully`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch(() => {
          setMessage(
            `Error: ${person.name} was already deleted from the server`
          );
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });

      setPersons(
        persons.filter((personFilter) => personFilter.id != person.id)
      );
    }
  };

  const currentNameChange = (event) => {
    setNewName(event.target.value);
  };

  const currentNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const currentFilterChange = (event) => {
    const tempFilter = event.target.value;
    setNewFilter(tempFilter);
    tempFilter.length > 0 ? setFilterStatus(true) : setFilterStatus(false);
  };

  const peopleToShow = filterStatus
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      )
    : persons;

  if (!persons) {
    return null;
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter currentFilterChange={currentFilterChange} newFilter={newFilter} />
      <h3>Add New:</h3>
      <PersonForm
        currentNameChange={currentNameChange}
        newName={newName}
        newNumber={newNumber}
        handleSubmitClick={handleSubmitClick}
        currentNumberChange={currentNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={peopleToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
