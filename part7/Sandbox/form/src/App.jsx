import { useState } from "react";

const useField = (type, id) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
    id
  };
};

const App = () => {
  const name = useField("text", 'name');
  const birthday = useField("date", 'birthday');
  const height = useField("number", 'height');

  return (
    <div>
      <form>
        <label htmlFor={name.id}>Name:</label>
        <input {...name} /><br />
        <label htmlFor={birthday.id}>Birthday:</label>
        <input {...birthday} /><br />
        <label htmlFor={height.id}>Height:</label>
        <input {...height}/>
      </form>
      <p>{name.value}{height.value}{birthday.value}</p>
    </div>
  );
};

export default App;
