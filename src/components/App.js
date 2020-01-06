import React from "react"
import { HashRouter } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import Notifications from "./Toast"
import Nav from "./Nav"
import Main from "./Main"

const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
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
}))

export default function App() {
  const classes = useStyles()

  return (
    <div>
      <HashRouter>
        <div className="flex">
          <Nav />
          <main className="flex-grow">
            <div className={classes.toolbar} />
            <Main />
          </main>
        </div>
      </HashRouter>
      <Notifications options={{ top: "80px", right: "0", width: "auto", margin: "0 20px" }} />
    </div>
  )
}
