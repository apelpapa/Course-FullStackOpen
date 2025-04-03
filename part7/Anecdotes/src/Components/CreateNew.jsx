import { useField } from "../hooks";
import InputField from "./InputField";

const CreateNew = (props) => {
  const content = useField('text', 'content');
  const author = useField('text', 'author');
  const info = useField('text', 'info');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: e.target.content.value,
      author: e.target.author.value,
      info: e.target.info.value,
      votes: 0,
    });
  };

  const clear = (e) => {
    e.preventDefault();
    content.reset();
    author.reset();
    info.reset();
  }

  return (
    <div>
      <h2>Create a New Anecdote</h2>
      <form onSubmit={handleSubmit}>
        <InputField name='content' type='text'/>
        <InputField name='author' type='text'/>
        <InputField name='info' type='text'/>
        <button type="submit">Create</button>
        <button type="button" onClick={clear}>Clear</button>
      </form>
    </div>
  );
};

export default CreateNew;