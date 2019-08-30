import React from "react"
import PropTypes from "prop-types"
import { Box, Typography } from "@material-ui/core"
import { Formik } from "formik"
import SnackbarWrapper from "../SnackbarWrapper"
import DangerZone from "../DangerZone"
import ParticipantFormik from "./Formik"
import { participantSchema } from "../../schema/"
import { participantValues } from "../../data/initial-values"
import api from "../../api"

const ParticipantWrapper = (props) => {
  const [snackbar, notify] = React.useState({ open: false, message: "" })
  const [initialValues, setInitialValues] = React.useState(participantValues)

  const [state, setState] = React.useState({ action: "create", title: "New participant" })
  React.useEffect(() => {
    if (props.match.params.id) {
      setState({ action: "update", title: "Update participant" })
      api.read("participants", props.match.params.id).then((item) => {
        setInitialValues(item.data)
        console.log(item.data)
      })
    } else {
      setInitialValues(participantValues)
    }
  }, [props.match.params.id, setState])

  const saveParticipant = (values, id) => {
    if (state.action === "update") {
      return api.update("participants", id, values)
    }
    if (state.action === "create") {
      return api.create("participants", values)
    }
  }
  const handleSubmit = (values, actions) => {
    const id = props.match.params.id || null
    saveParticipant(values, id)
      .then(() => {
        notify({ open: !snackbar.open, message: "Success! Everything has been saved." })
      })
      .catch(() => {
        notify({ open: !snackbar.open, message: "Error. Something went wrong!" })
      })
      .finally(() => {
        actions.setSubmitting(false)
      })
  }

  return (
    <Box m={2}>
      <Typography variant="h6">{state.title}</Typography>
      <Formik
        enableReinitialize
        validationSchema={participantSchema}
        initialValues={initialValues}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
        render={(props) => <ParticipantFormik {...props} />}
      />
      <SnackbarWrapper openSnackbar={snackbar.open} message={snackbar.message} />
      <DangerZone instance="participants" id={props.match.params.id} />
    </Box>
  )
}

ParticipantWrapper.propTypes = {
  match: PropTypes.any,
}

ParticipantWrapper.defaultProps = {
  match: {
    params: {
      id: null,
    },
  },
}

export default ParticipantWrapper
