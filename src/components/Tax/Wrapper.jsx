import React from "react"
import PropTypes from "prop-types"
import { Box, Typography } from "@material-ui/core"
import { Formik } from "formik"
import SnackbarWrapper from "../SnackbarWrapper"
import DangerZone from "../DangerZone"
import TaxFormik from "./Formik"
import { taxSchema } from "../../schema/"
import { taxValues } from "../../data/initial-values"
import api from "../../api"

const TaxWrapper = (props) => {
  const [snackbar, notify] = React.useState({ open: false, message: "" })
  const [initialValues, setInitialValues] = React.useState(taxValues)

  const [state, setState] = React.useState({ action: "create", title: "New tax" })
  React.useEffect(() => {
    if (props.match.params.id) {
      setState({ action: "update", title: "Update tax" })
      api.read("taxes", props.match.params.id).then((item) => {
        setInitialValues(item.data)
      })
    } else {
      setInitialValues(taxValues)
    }
  }, [props.match.params.id, setState])

  const saveTax = (values, id) => {
    if (state.action === "update") {
      return api.update("taxes", id, values)
    }
    if (state.action === "create") {
      return api.create("taxes", values)
    }
  }
  const handleSubmit = (values, actions) => {
    const id = props.match.params.id || null
    saveTax(values, id)
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
        validationSchema={taxSchema}
        initialValues={initialValues}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
        render={(props) => <TaxFormik {...props} />}
      />
      <SnackbarWrapper openSnackbar={snackbar.open} message={snackbar.message} />
      <DangerZone instance="taxes" id={props.match.params.id} />
    </Box>
  )
}

TaxWrapper.propTypes = {
  match: PropTypes.any,
}

TaxWrapper.defaultProps = {
  match: {
    params: {
      id: null,
    },
  },
}

export default TaxWrapper
