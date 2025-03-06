import { useState } from "react";

const StatisticLine = (props) => {
  return (
    <td>
      {props.text}: {props.value}
    </td>
  );
};

const Statistics = (props) => {
  const good = props.good;
  const neutral = props.neutral;
  const bad = props.bad;
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = good / total;
  if (total > 0) {
    return (
      <>
        <h1>Statistics</h1>
        <table>
          <tbody>
          <tr>
            <StatisticLine text="Good" value={good} />
          </tr>
          <tr>
            <StatisticLine text="neutral" value={neutral} />
          </tr>
          <tr>
            <StatisticLine text="bad" value={bad} />
          </tr>
          <tr>
            <StatisticLine text="total" value={total} />
          </tr>
          <tr>
            <StatisticLine text="average" value={average} />
          </tr>
          <tr>
            <StatisticLine text="positive" value={positive * 100} />
          </tr>
          </tbody>
        </table>
      </>
    );
  }
  {
    return (
      <>
        <h1>Statistics</h1>
        <p>No Feedback Given</p>
      </>
    );
  }
};

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="Good"></Button>
      <Button onClick={() => setNeutral(neutral + 1)} text="Neutral"></Button>
      <Button onClick={() => setBad(bad + 1)} text="Bad"></Button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
