const express = require("express");
let persons = require("./db.json");
let morgan = require('morgan')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

morgan.token('customType', (req, res) =>  JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :customType'))

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const person = persons.find((person) => person.id === req.params.id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.get("/info", (req, res) => {
  res.send(
    `Phonebook has info for ${persons.length} people <br /> ${new Date()}`
  );
});

const randIDGen = () => {
  let randId = 1;
  let person = [];
  while (person) {
    randId = Math.floor(Math.random() * 100000);
    person = persons.find((person) => person.id === randId.toString());
  }
  return randId;
};

app.post("/api/persons/", (req, res) => {
  const newPerson = {
    id: randIDGen().toString(),
    name: req.body.name,
    number: req.body.number,
  };
  const personMatch = persons.find((person) => person.name === newPerson.name);

  if (newPerson.name.length === 0 || newPerson.number.length === 0) {
    res.status(400).json({
      error: "All Inputs Must Be Filled",
    });
  } else if (personMatch) {
    res.status(400).json({
      error: "Name Already Exists",
    });
  } else {
    persons = persons.concat(newPerson);
    res.status(201).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const personIndex = persons.findIndex(
    (person) => person.id === req.params.id
  );
  if (personIndex != -1) {
    persons.splice(personIndex, 1);
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});


app.listen(PORT, (req, res) => {
  console.log(`listening @ ${port}`);
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)