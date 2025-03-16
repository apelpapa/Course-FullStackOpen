import { useState, forwardRef, useImperativeHandle } from "react";

const Toggleable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const changeVisibility = () => {
    visible ? setVisible(false) : setVisible(true)
  }

  useImperativeHandle(refs, () => {
    return{
        changeVisibility
    }
  })

if(visible){
  return (
  <>
    {props.children}
    <button style={{marginBottom:5}} onClick={changeVisibility}>Cancel</button>
  </>
  )
}

return(
    <button onClick={changeVisibility}>{props.buttonLabel}</button>
)
})

export default Toggleable;
