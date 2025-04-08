import { useMutation, useQuery } from '@apollo/client'
import { EDIT_BORN, GET_AUTHORS } from '../queries'
import { useState } from 'react'

const Authors = ({ show }) => {
  if (!show) {
    return null
  }

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const results = useQuery(GET_AUTHORS)
  const [ editAuthor ] = useMutation(EDIT_BORN,{
    refetchQueries: [{query: GET_AUTHORS}]
  })

  if (results.loading) {
    return <div>Loading...</div>
  }

  const submit = (e) => {
    e.preventDefault()
    editAuthor({variables:{name, setBornTo: Number(born)}})
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {results.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Set Birth Year</h3>
        <form onSubmit={submit}>
          <select value={name} onChange={({target})=>setName(target.value)} >
            <option value=''>Select Name</option>
            {results.data.allAuthors.map((a) => {
              return(
                <option key={a.name} value={a.name} >{a.name}</option>
              )
            })}
          </select>
          <br />
          <label htmlFor="born">Born: </label>
          <input
            type="number"
            name="born"
            id="born"
            onChange={({ target }) => setBorn(target.value)}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
