import { useState } from "react";

const useCounter = () => {
  const [value, setValue] = useState(0);

  const increase = () => {
    setValue(value + 1);
  };

  const decrease = () => {
    setValue(value - 1);
  };

  const zero = () => {
    setValue(0);
  };

  return {
    value,
    increase,
    decrease,
    zero,
  };
};

const App = () => {
  const counter = useCounter();
  const left = useCounter();
  const right = useCounter();

  return (
    <div>
      <div>
        <div>{counter.value}</div>
        <button onClick={counter.increase}>Regular Counter Plus</button>
        <button onClick={counter.decrease}>Regular Counter Minus</button>
        <button onClick={counter.zero}>Regular Counter Zero</button>
      </div>
      <div>
        <div>{left.value}</div>
        <button onClick={left.increase}>left Counter Plus</button>
        <button onClick={left.decrease}>left Counter Minus</button>
        <button onClick={left.zero}>left Counter Zero</button>
      </div>
      <div>
        <div>{right.value}</div>
        <button onClick={right.increase}>right Counter Plus</button>
        <button onClick={right.decrease}>right Counter Minus</button>
        <button onClick={right.zero}>right Counter Zero</button>
      </div>
    </div>
  );
};

export default App;
