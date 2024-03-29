import React from "react"
import { Box, Typography } from "@material-ui/core"
import { Formik } from "formik"
import { notify } from "../Toast"
import SettingsFormik from "./Formik"
import { settingSchema } from "../../schema/"
import { settingValues } from "../../data/initial-values"
import api from "../../api"
import { i18n } from "../../locale"
import fromStore from "../../utils/fromStore"

const SettingsWrapper = () => {
  const [initialValues, setInitialValues] = React.useState(settingValues)

  const [settingsId, setId] = React.useState(false)
  React.useEffect(() => {
    async function fetchData() {
      const all_settings = await fromStore("settings")
      if (
        typeof all_settings[0] !== "undefined" &&
        typeof all_settings[0]["ref"]["@ref"]["id"] !== "undefined"
      ) {
        setId(all_settings[0]["ref"]["@ref"]["id"])

        const settings = all_settings[0]["data"]
        setInitialValues(settings)
      }
    }
    fetchData()
  }, [])

  const saveSettings = (values, id) => {
    const action = settingsId ? "update" : "create"
    if (action === "update") {
      return api.update("settings", id, values)
    }
    if (action === "create") {
      return api.create("settings", values)
    }
  }
  const handleSubmit = (values, actions) => {
    const id = settingsId || null
    saveSettings(values, id)
      .then(() => {
        notify.success("Settings updated successfully. Refreshing")
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      })
      .catch(() => {
        notify.error("Error! Failed to update settings")
      })
      .finally(() => {
        actions.setSubmitting(false)
      })
  }

  return (
    <Box m={2}>
      <Typography variant="h6">{i18n("Settings")}</Typography>
      <Typography variant="body2" className="mb-4">
        {i18n("Default settings for your account")}
      </Typography>

      <Formik
        enableReinitialize
        validationSchema={settingSchema}
        initialValues={initialValues}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
        render={(props) => <SettingsFormik {...props} />}
      />
    </Box>
  )
}

export default SettingsWrapper
