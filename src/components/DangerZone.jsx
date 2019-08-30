import React from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import { Box, Typography, Button, Collapse, FormControlLabel, Checkbox } from "@material-ui/core"
import { ExpandLess, ExpandMore } from "@material-ui/icons"
import SnackbarWrapper from "./SnackbarWrapper"
import api from "../api"
import Loading from "./Loading"
import { i18n } from "../locale"

const DangerZone = (props) => {
  const [snackbar, notify] = React.useState({
    open: false,
    message: "",
  })

  const [collapse, setCollapse] = React.useState(false)
  function toggle() {
    setCollapse(!collapse)
  }
  const [isLoading, setIsLoading] = React.useState(false)
  const [disabled, setDisabled] = React.useState(true)
  const [checked, setChecked] = React.useState(false)
  function toggleChecked() {
    setChecked(!checked)

    !checked ? setDisabled(false) : setDisabled(true)
  }

  const handleClick = (event) => {
    event.preventDefault()
    setDisabled(true)
    setIsLoading(true)
    api
      .remove(props.instance, props.id)
      .then(() => {
        notify({ open: !snackbar.open, message: i18n("Success! Item has been deleted") })
        setTimeout(() => {
          setIsLoading(false)
          props.history.goBack()
        }, 2000)
      })
      .catch(() => {
        notify({ open: !snackbar.open, message: i18n("Error! Cannot delete item") })
        setIsLoading(false)
      })
  }

  if (!props.id) {
    return null
  }
  const loadingComponent = isLoading ? <Loading /> : null
  return (
    <Box mt={2} className="flex flex-col">
      {loadingComponent}
      <span>
        <Typography
          paragraph
          color="error"
          onClick={toggle}
          style={{
            display: "flex",
            cursor: "pointer",
            float: "left",
          }}
        >
          {i18n("More settings")}
          {collapse ? <ExpandLess /> : <ExpandMore />}
        </Typography>
      </span>

      <Collapse
        in={collapse}
        timeout="auto"
        unmountOnExit
        style={{
          float: "left",
          width: "100%",
        }}
      >
        <Typography paragraph variant="body2">
          {i18n("Once you delete this item, there is no going back")}
        </Typography>
        <FormControlLabel
          label={i18n("I am 100% sure")}
          control={<Checkbox checked={checked} onChange={toggleChecked} color="primary" />}
        />
        <Button variant="contained" color="primary" onClick={handleClick} disabled={disabled}>
          {i18n("Delete")}
        </Button>
      </Collapse>
      <SnackbarWrapper openSnackbar={snackbar.open} message={snackbar.message} />
    </Box>
  )
}

DangerZone.propTypes = {
  instance: PropTypes.string,
  id: PropTypes.string,
  history: PropTypes.any,
}

export default withRouter(DangerZone)
