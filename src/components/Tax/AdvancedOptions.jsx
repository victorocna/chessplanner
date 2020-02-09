import React from "react"
import { Typography, Collapse, FormControlLabel, Checkbox } from "@material-ui/core"
import { ExpandLess, ExpandMore } from "@material-ui/icons"
import FormikInput from "../Formik/Input"
import TaxContext from "../../context/tax-context"
import { i18n } from "../../locale"

const AdvancedOptions = () => {
  const { values } = React.useContext(TaxContext)
  React.useEffect(() => {
    const { roomShare } = values
    if (roomShare) {
      setChecked(roomShare)
    }
  }, [values])

  const [collapse, setCollapse] = React.useState(false)
  function toggle() {
    setCollapse(!collapse)
  }

  const [checked, setChecked] = React.useState(false)
  function toggleChecked() {
    setChecked(!checked)
  }

  return (
    <div className="max-width-420">
      <Typography variant="body2" onClick={toggle} className="flex cursor-pointer mt-4">
        Advanced options
        {collapse ? <ExpandLess /> : <ExpandMore />}
      </Typography>
      <Collapse in={collapse} timeout="auto">
        <FormikInput
          className="flex mt-4"
          name="priority"
          label="Priority"
          helper="Between 1 and 50. Taxes with high priorities will be applied first"
        />
        <FormControlLabel
          className="advanced-options"
          label={i18n("Apply this tax based on room share?")}
          control={
            <Checkbox name="roomShare" checked={checked} onChange={toggleChecked} color="primary" />
          }
        />
      </Collapse>
    </div>
  )
}

export default AdvancedOptions
