import React from "react"
import PropTypes from "prop-types"
import { Box, Typography } from "@material-ui/core"
import { Formik } from "formik"
import { notify } from "../Toast"
import DangerZone from "../DangerZone"
import ParticipantFormik from "./Formik"
import { participantSchema } from "../../schema/"
import { participantValues } from "../../data/initial-values"
import api from "../../api"
import WhatsNext from "../WhatsNext"

const ParticipantWrapper = (props) => {
  const [initialValues, setInitialValues] = React.useState(participantValues)

  const [state, setState] = React.useState({
    action: "create",
    title: "New participant",
    showNext: false,
  })
  React.useEffect(() => {
    if (props.match.params.id) {
      setState({ action: "update", title: "Update participant" })
      api.read("participants", props.match.params.id).then((item) => {
        setInitialValues(item.data)
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
        notify.success("Success! Everything has been saved.")
        setState((state) => ({ ...state, showNext: true }))
      })
      .catch((err) => {
        notify.error(err)
        actions.setSubmitting(false)
      })
      .finally(() => {
        if (state.action === "update") {
          actions.setSubmitting(false)
        }
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
      <DangerZone instance="participants" id={props.match.params.id} />

      {state.showNext && <WhatsNext path="/#/" />}
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
