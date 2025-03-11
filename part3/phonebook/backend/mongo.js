const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://apelpapa:${password}@cluster0.mzfwz.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const PhonebookEntry = mongoose.model('PhonebookEntry', phonebookSchema)

if (name) {
  const phonebookEntry = new PhonebookEntry({
    name: name,
    number: number,
  })
  phonebookEntry.save().then(() => {
    console.log(`Added ${name}, Number: ${number} to Phonebook`)
    mongoose.connection.close()
  })
} else {
  PhonebookEntry.find({}).then((result) => {
    result.forEach((entry) => {
      console.log(entry)
    })
    mongoose.connection.close()
  })
}
