import React from "react"
import PropTypes from "prop-types"
import Switch from "@material-ui/core/Switch"
import FormControlLabel from "@material-ui/core/FormControlLabel"

function Column(props) {
  const { label, value, checked, onSwitchChange, color } = props
  const handleChange = (event) => {
    onSwitchChange(event.target.checked, event.target.value)
  }

  return (
    <FormControlLabel
      label={label}
      control={<Switch checked={checked} onChange={handleChange} value={value} color={color} />}
    />
  )
}

Column.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  onSwitchChange: PropTypes.func,
  color: PropTypes.string,
}

Column.defaultProps = {
  color: "primary",
}

export default Column
