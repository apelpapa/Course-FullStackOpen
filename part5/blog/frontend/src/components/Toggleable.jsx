import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from 'prop-types'

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
    <button style={{marginBottom:5}} onClick={changeVisibility}>{props.closeLabel}</button>
    {props.children}
  </>
  )
}

return(
    <button onClick={changeVisibility}>{props.buttonLabel}</button>
)
})

Toggleable.displayName = 'Toggleable'

Toggleable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    closeLabel: PropTypes.string.isRequired
}

export default Toggleable;
