require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
let persons = require("./db.json");
let morgan = require("morgan");
const PhonebookEntry = require("./models/phonebook");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.static("dist"));

morgan.token("customType", (req, res) => JSON.stringify(req.body));

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :customType"
  )
);

app.get("/api/persons", (req, res, next) => {
  PhonebookEntry.find({}).then((result) => {
    res.json(result);
  })
  .catch(error => next(error))
});

app.get("/api/persons/:id", (req, res, next) => {
  PhonebookEntry.findById(req.params.id)
    .then((result) => {
      if(result){
        res.json(result);
      } 
      else {
        res.status(404).json(`ID Doesn't Exist`)
      }
    })
    .catch((error) => next(error));
});

app.get("/info", (req, res, next) => {
  PhonebookEntry.find({}).then((result) => {
    res.send(
      `<h1>The Phonebook Has Info For ${
        result.length
      } People </h1><p>As of: ${new Date()}</p>`
    )
  })
  .catch (error => next(error))
});

app.put("/api/persons/:id", (req, res, next) => {
  const updatedPerson = {
    name: req.body.name,
    number: req.body.number,
  };
  
  PhonebookEntry.findByIdAndUpdate(req.params.id, updatedPerson, {new:true})
  .then(result => {
    if(result){
      res.json(result)
    }
  })
  .catch(error => next(error))
});

app.post("/api/persons/", (req, res, next) => {
  const newPerson = new PhonebookEntry({
    name: req.body.name,
    number: req.body.number,
  });

  PhonebookEntry.find({ name: newPerson.name }).then((result) => {
    if (newPerson.name.length === 0 || newPerson.number.length === 0) {
      res.status(400).json({
        error: "All Inputs Must Be Filled",
      });
    } else if (result.length > 0) {
      res.status(400).json({
        error: "Name Already Exists",
      });
    } else {
      newPerson.save().then((savedPerson) => {
        res.json(savedPerson);
      })
    }
  })
  .catch (error => next(error))
});

app.delete("/api/persons/:id", (req, res, next) => {
  PhonebookEntry.findByIdAndDelete(req.params.id)
  .then(result =>{
    res.status(204).end()
  })
  .catch(error => next(error))
});

app.listen(PORT, (req, res) => {
  console.log(`listening @ ${PORT}`);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);
