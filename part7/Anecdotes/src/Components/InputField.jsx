import { useField } from "../hooks";

const InputField = ({ type, name }) => {
    const input = useField(type, name)
  return (
  <div>
      <label htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
      <input {...input} />
  </div>
)

};

export default InputField;
