import React from "react"
import store from "store"
import { Route, Switch } from "react-router-dom"
import PrivateRoute from "./Identity/PrivateRoute"
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
import AuthScreen from "./Identity/AuthScreen"
import NotFound from "./NotFound"
import ComingSoon from "./ComingSoon"

export default function Main() {
  const [settings, setSettings] = React.useState({})
  React.useEffect(() => {
    async function fetchData() {
      const all_settings = await store.get("all_settings_by_key")
      if (all_settings && all_settings.length > 0) {
        setSettings(() => ({ settings: all_settings[0].data }))
      }
    }
    fetchData()
  }, [])

  return (
    <AppContext.Provider value={settings}>
      <Switch>
        <PrivateRoute exact path="/" component={Participants} />
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

        <Route path="/login" component={AuthScreen} />
        <Route path="/coming-soon" component={ComingSoon} />
        <Route path="*" component={NotFound} />
      </Switch>
    </AppContext.Provider>
  )
}
