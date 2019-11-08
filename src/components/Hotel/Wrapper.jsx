import React from "react"
import PropTypes from "prop-types"
import { Box, Typography } from "@material-ui/core"
import { Formik } from "formik"
import { notify } from "../Toast"
import DangerZone from "../DangerZone"
import HotelFormik from "./Formik"
import { hotelSchema } from "../../schema/"
import { hotelValues } from "../../data/initial-values"
import api from "../../api"
import WhatsNext from "../WhatsNext"

const HotelWrapper = (props) => {
  const [initialValues, setInitialValues] = React.useState(hotelValues)

  const [state, setState] = React.useState({
    action: "create",
    title: "New hotel",
    showNext: false,
  })
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
        notify.success("Success! Everything has been saved.")
        setState((state) => ({ ...state, showNext: true }))
      })
      .catch(() => {
        notify.error("Error. Something went wrong!")
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
        validationSchema={hotelSchema}
        initialValues={initialValues}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
        render={(props) => <HotelFormik {...props} />}
      />
      <DangerZone instance="hotels" id={props.match.params.id} />

      {state.showNext && <WhatsNext path="/#/hotels" />}
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
