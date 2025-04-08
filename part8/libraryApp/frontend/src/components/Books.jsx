import { useQuery } from "@apollo/client"
import { GET_BOOKS } from "../queries"

const Books = (props) => {
  const results = useQuery(GET_BOOKS)

  if(results.loading){
    return <div>Loading...</div>
  }

  if (!props.show) {
    return null
  }



  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {results.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
