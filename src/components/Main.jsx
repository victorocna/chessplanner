import React from "react"
import store from "store"
import { Route, Switch } from "react-router-dom"
import { Account, Confirm, Forgot, Reset, PrivateRoute, Signup, ThankYou } from "./Identity"
import Participants from "./Tables/Participants"
import Taxes from "./Tables/Taxes"
import Tournaments from "./Tables/Tournaments"
import TaxWrapper from "./Tax/Wrapper"
import TournamentWrapper from "./Tournament/Wrapper"
import HotelWrapper from "./Hotel/Wrapper"
import Hotels from "./Tables/Hotels"
import LazyUpload from "./Upload/LazyUpload"
import SettingsWrapper from "./Settings/Wrapper"
import ParticipantSheet from "./Participant/Sheet"
import ParticipantWrapper from "./Participant/Wrapper"
import AppContext from "../context/app-context"
import NotFound from "./NotFound"
import ComingSoon from "./ComingSoon"
import Dashboard from "./Dashboard"

export default function Main() {
  const [settings, setSettings] = React.useState({})
  React.useEffect(() => {
    async function fetchData() {
      const all_settings = await store.get("settings")
      if (all_settings && all_settings.length > 0) {
        setSettings(() => ({ settings: all_settings[0].data }))
      }
    }
    fetchData()
  }, [])

  return (
    <AppContext.Provider value={settings}>
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
        <PrivateRoute path="/participants" component={Participants} />
        <PrivateRoute path="/new/" component={ParticipantWrapper} />
        <PrivateRoute path="/edit/:id" component={ParticipantWrapper} />
        <PrivateRoute path="/view/:id" component={ParticipantSheet} />

        <PrivateRoute path="/hotels" component={Hotels} />
        <PrivateRoute path="/edit-hotel/:id" component={HotelWrapper} />
        <PrivateRoute path="/new-hotel" component={HotelWrapper} />

        <PrivateRoute path="/tournaments" component={Tournaments} />
        <PrivateRoute path="/edit-tournament/:id" component={TournamentWrapper} />
        <PrivateRoute path="/new-tournament" component={TournamentWrapper} />

        <PrivateRoute path="/taxes" component={Taxes} />
        <PrivateRoute path="/edit-tax/:id" component={TaxWrapper} />
        <PrivateRoute path="/new-tax" component={TaxWrapper} />

        <PrivateRoute path="/upload-participants" component={LazyUpload} />
        <PrivateRoute path="/settings" component={SettingsWrapper} />

        <Route path="/account/:expired" component={Account} />
        <Route path="/account" component={Account} />
        <Route path="/confirm/:hash" component={Confirm} />
        <Route path="/forgot" component={Forgot} />
        <Route path="/reset/:hash" component={Reset} />
        <Route path="/signup" component={Signup} />
        <Route path="/thank-you" component={ThankYou} />

        <Route path="/coming-soon" component={ComingSoon} />
        <Route path="*" component={NotFound} />
      </Switch>
    </AppContext.Provider>
  )
}
