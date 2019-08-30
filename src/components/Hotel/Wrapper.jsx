import React from "react"
import PropTypes from "prop-types"
import { Box, Typography } from "@material-ui/core"
import { Formik } from "formik"
import SnackbarWrapper from "../SnackbarWrapper"
import DangerZone from "../DangerZone"
import HotelFormik from "./Formik"
import { hotelSchema } from "../../schema/"
import { hotelValues } from "../../data/initial-values"
import api from "../../api"

const HotelWrapper = (props) => {
  const [snackbar, notify] = React.useState({ open: false, message: "" })
  const [initialValues, setInitialValues] = React.useState(hotelValues)

  const [state, setState] = React.useState({ action: "create", title: "New hotel" })
  React.useEffect(() => {
    if (props.match.params.id) {
      setState({ action: "update", title: "Update hotel" })
      api.read("hotels", props.match.params.id).then((item) => {
        setInitialValues(item.data)
      })
    } else {
      setInitialValues(hotelValues)
    }
  }, [props.match.params.id, setState])

  const saveHotel = (values, id) => {
    if (state.action === "update") {
      return api.update("hotels", id, values)
    }
    if (state.action === "create") {
      return api.create("hotels", values)
    }
  }
  const handleSubmit = (values, actions) => {
    const id = props.match.params.id || null
    saveHotel(values, id)
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
        validationSchema={hotelSchema}
        initialValues={initialValues}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
        render={(props) => <HotelFormik {...props} />}
      />
      <SnackbarWrapper openSnackbar={snackbar.open} message={snackbar.message} />
      <DangerZone instance="hotels" id={props.match.params.id} />
    </Box>
  )
}

HotelWrapper.propTypes = {
  match: PropTypes.any,
}

HotelWrapper.defaultProps = {
  match: {
    params: {
      id: null,
    },
  },
}

export default HotelWrapper