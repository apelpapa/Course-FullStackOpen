const Total = (props) =>{
  const initialValue = 0
  const totalExercises = props.content.reduce((accumulator, currentValue) => accumulator+currentValue.exercises, initialValue)
  return <p><strong>Total of {totalExercises} Exercises</strong></p>
}

const Part = (props) => {
  return (
    <p key={props.id}>
      {props.name} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <>
      {props.content.map((part) => (
        <Part key={part.id} id={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

const Header = (props) => {
  return <h1>{props.head}</h1>;
};

const Course = (props) => {
  return (
    <>
      <Header head={props.course.name} />
      <Content content={props.course.parts} />
      <Total content={props.course.parts} />
    </>
  );
};

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return(
  <>
    {courses.map(course => {
      return <Course key = {course.id} course={course} />;
    })}
    </>
  )
};

export default App;
