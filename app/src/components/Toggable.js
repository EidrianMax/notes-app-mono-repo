import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import i18n from '../i18n'

const Toggable = forwardRef(({ children, buttonLabel }, ref) => {
  const [isVisible, setIsVisible] = useState(false)

  const showWhenIsVisible = { display: isVisible ? '' : 'none' } // estilos condicionales
  const hideWhenIsVisible = { display: isVisible ? 'none' : '' } // estilos condicionales

  const toggleVisibility = () => setIsVisible(!isVisible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenIsVisible}>
        <button onClick={toggleVisibility}>Open {buttonLabel}</button>
      </div>

      <div style={showWhenIsVisible}>
        {children}
        <button onClick={toggleVisibility}>
          {i18n.TOGGABLE.CANCEL_BUTTON} {buttonLabel}
        </button>
      </div>
    </div>
  )
})

Toggable.displayName = 'Toggable'

Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Toggable
