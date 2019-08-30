import React from "react"
import { HashRouter } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import { useNetlifyIdentity } from "react-netlify-identity"
import IdentityContext from "../context/identity-context"
import Nav from "./Nav"
import Main from "./Main"

const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
  },
}))

export default function App() {
  const classes = useStyles()
  const identity = useNetlifyIdentity(process.env.REACT_APP_NETLIFY_AUTH_URL)

  return (
    <IdentityContext.Provider value={identity}>
      <HashRouter>
        <div className={classes.root}>
          <Nav />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Main />
          </main>
        </div>
      </HashRouter>
    </IdentityContext.Provider>
  )
}