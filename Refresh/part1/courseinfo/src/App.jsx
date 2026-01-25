const Header = (props) => {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  );
};

const Content = (props) => {
  return (
    <>
      {props.parts.map((a) => {
        return (
          <p>
            {a.name} {a.exercises}
          </p>
        );
      })}
    </>
  );
};

const Total = (props) => {
  const totalArray = props.parts.map((a) => a.exercises);
  const total = totalArray.reduce((acc, curVal) => acc + curVal);
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
