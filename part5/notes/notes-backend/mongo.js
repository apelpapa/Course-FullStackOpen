const config = require('./utils/config')
const mongoose = require('mongoose')

const url = config.TEST_MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
  const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
  })

  const Note = mongoose.model('Note', noteSchema)

  // Note.find({}).then(result => {
  //   result.forEach(note => {
  //     console.log(note)
  //   })
  //   mongoose.connection.close()
  // })

  const note = new Note ({
    content: 'HTML is easy',
    important: true
  })

  note.save()
    .then(result => {
      console.log(`idk remember, but I got this back: ${result}`)
      mongoose.connection.close()
    })
})

