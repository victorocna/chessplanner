import React from "react"
import PropTypes from "prop-types"
import { Box, Typography } from "@material-ui/core"
import { Formik } from "formik"
import SnackbarWrapper from "../SnackbarWrapper"
import DangerZone from "../DangerZone"
import TournamentFormik from "./Formik"
import { tournamentSchema } from "../../schema/"
import { tournamentValues } from "../../data/initial-values"
import api from "../../api"

const TournamentWrapper = (props) => {
  const [snackbar, notify] = React.useState({ open: false, message: "" })
  const [initialValues, setInitialValues] = React.useState(tournamentValues)

  const [state, setState] = React.useState({ action: "create", title: "New tournament" })
  React.useEffect(() => {
    if (props.match.params.id) {
      setState({ action: "update", title: "Update tournament" })
      api.read("tournaments", props.match.params.id).then((item) => {
        setInitialValues(item.data)
      })
    } else {
      setInitialValues(tournamentValues)
    }
  }, [props.match.params.id, setState])

  const saveTournament = (values, id) => {
    if (state.action === "update") {
      return api.update("tournaments", id, values)
    }
    if (state.action === "create") {
      return api.create("tournaments", values)
    }
  }
  const handleSubmit = (values, actions) => {
    const id = props.match.params.id || null
    saveTournament(values, id)
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
        validationSchema={tournamentSchema}
        initialValues={initialValues}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
        render={(props) => <TournamentFormik {...props} />}
      />
      <SnackbarWrapper openSnackbar={snackbar.open} message={snackbar.message} />
      <DangerZone instance="tournaments" id={props.match.params.id} />
    </Box>
  )
}

TournamentWrapper.propTypes = {
  match: PropTypes.any,
}

TournamentWrapper.defaultProps = {
  match: {
    params: {
      id: null,
    },
  },
}

export default TournamentWrapper
