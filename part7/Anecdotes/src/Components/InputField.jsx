import { useField } from "../hooks";

const InputField = ({ type, name }) => {
    const input = useField(type, name)
    const filteredInput = {...input}
    delete filteredInput.reset
  return (
  <div>
      <label htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
      <input {...filteredInput} />
  </div>
)

};

export default InputField;