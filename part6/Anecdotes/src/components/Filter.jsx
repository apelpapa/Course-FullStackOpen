import { useDispatch } from "react-redux"
import { filterInput } from "../reducers/filterReducer"

const Filter = () => {
    const dispatch = useDispatch()
    
    const handleChange = (event) => {
      event.preventDefault()
      dispatch(filterInput(event.target.value))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        Filter: <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter