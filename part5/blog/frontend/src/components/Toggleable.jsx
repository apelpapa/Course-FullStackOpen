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
    <button style={{marginBottom:5}} onClick={changeVisibility}>{props.closeLabel || 'Cancel'}</button>
    {props.children}
  </>
  )
}

return(
    <button onClick={changeVisibility}>{props.buttonLabel}</button>
)
})

export default Toggleable;
