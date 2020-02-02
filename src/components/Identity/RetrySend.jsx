import React from "react"
import PropTypes from "prop-types"
import { Button, Collapse, Typography } from "@material-ui/core"
import { ExpandLess, ExpandMore } from "@material-ui/icons"
import api from "../../api"
import { notify } from "../Toast"

const RetrySend = ({ hash, username }) => {
  const retryIn = 60

  const [collapse, setCollapse] = React.useState(false)
  function toggle() {
    setCollapse(!collapse)
  }

  // @see https://dev.to/zhiyueyi/how-to-create-a-simple-react-countdown-timer-4mc3
  const [counter, setCounter] = React.useState(retryIn)
  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
  }, [counter])

  // button functionality
  const [isSubmitting, setSubmitting] = React.useState(false)
  const retry = (event) => {
    event.preventDefault()
    setSubmitting(true)

    api
      .emailConfirm({
        hash,
        username,
        origin: window.location.origin,
      })
      .then(() => {
        notify.success("Email sent successfully")
      })
      .catch((err) => {
        if ([400, 403, 404].includes(err.status)) {
          notify.error(err.message)
        } else {
          notify.error("Error! Something went wrong, please try again")
        }
      })
      .finally(() => {
        setSubmitting(false)
        setCounter(retryIn)
      })
  }

  if (!hash || !username) {
    return null
  }

  return (
    <>
      <Typography variant="body2" color="error" onClick={toggle} className="flex cursor-pointer">
        Email did not arrive?
        {collapse ? <ExpandLess /> : <ExpandMore />}
      </Typography>
      <Collapse in={collapse} timeout="auto">
        <Typography paragraph variant="body2" className="leading-normal">
          Please check the spam folder as well. <br />
          Also, you can resend the confirmation email using the button below.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          disabled={!!counter || isSubmitting}
          onClick={retry}
        >
          {!!counter && <span>Retry in {counter} seconds</span>}
          {!counter && <span>Retry now</span>}
        </Button>
      </Collapse>
    </>
  )
}

RetrySend.propTypes = {
  hash: PropTypes.string,
  username: PropTypes.string,
}

RetrySend.defaultProps = {
  hash: "",
  username: "",
}

export default RetrySend
