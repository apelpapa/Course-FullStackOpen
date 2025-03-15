let currentToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IllveW9NY0dlZTIiLCJpZCI6IjY3ZDRmMjE1MWJjOWQzN2JjOGM1NjI2YiIsImlhdCI6MTc0MjAyNzE1NiwiZXhwIjoxNzQyMDMwNzU2fQ.KoJgHHXwqTaFmpJPoYo2o9tvedRBkzy3X0C8C2rkBts'

const initialUsers = [
  {
    username: 'User1',
    name: 'User1',
    password: 'User1'
  },
  {
    username: 'User2',
    name: 'User2',
    password: 'User2'
  }
]

const validUserToAdd = {
  'username': 'YoyoMcGee',
  'name': 'Yoyo McGee',
  'password': 'Open@door83'
}

const validLogin = {
  'username': 'User1',
  'password': 'User1'
}

const invalidUsernameToAdd = {
  'username': 'Yo',
  'name': 'Yoyo McGee',
  'password': 'Open@door83'
}

const invalidPasswordToAdd = {
  'username': 'YoyoMcGee',
  'name': 'Yoyo McGee',
  'password': 'PP'
}

module.exports = { initialUsers, validUserToAdd, invalidPasswordToAdd, invalidUsernameToAdd, currentToken, validLogin }