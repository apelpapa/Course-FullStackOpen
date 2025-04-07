import { Button } from "@mui/material";
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
        <Button
          variant="contained"
          size="small"
          style={style}
          onClick={changeVisibility}
        >
          {props.closeLabel}
        </Button>
        {props.children}
      </>
    );
  }

  return (
    <Button variant="contained" size="small" onClick={changeVisibility}>
      {props.buttonLabel}
    </Button>
  );
});

Toggleable.displayName = "Toggleable";

export default Toggleable;
