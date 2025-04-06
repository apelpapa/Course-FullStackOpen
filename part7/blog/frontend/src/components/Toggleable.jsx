import { useState, forwardRef, useImperativeHandle } from "react";

const Toggleable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const changeVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility: changeVisibility,
    };
  });

  const style = {
    marginBottom: 5,
  };

  if (visible) {
    return (
      <>
        <button style={style} onClick={changeVisibility}>
          {props.closeLabel}
        </button>
        {props.children}
      </>
    );
  }

  return <button onClick={changeVisibility}>{props.buttonLabel}</button>;
});

Toggleable.displayName = "Toggleable";

export default Toggleable;
