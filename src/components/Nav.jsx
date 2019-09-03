import React from "react"
import PropTypes from "prop-types"
import {
  AppBar,
  Badge,
  Box,
  CssBaseline,
  Collapse,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import { AllInclusive, ExpandLess, ExpandMore } from "@material-ui/icons"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import { Link as RouterLink } from "react-router-dom"
import "typeface-noto-sans"
import IdentityContext from "../context/identity-context"
import { i18n } from "../locale"

const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  header: {
    fontFamily: '"Noto Sans", sans-serif',
    cursor: "pointer",
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
  toolbarTop: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
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
    padding: theme.spacing(3),
  },
}))

class ListItemLink extends React.Component {
  // eslint-disable-next-line react/display-name
  renderLink = React.forwardRef((itemProps, ref) => (
    <RouterLink to={this.props.to} {...itemProps} ref={ref} />
  ))

  render() {
    const { primary } = this.props
    return (
      <li>
        <ListItem button component={this.renderLink}>
          <ListItemText primary={primary} />
        </ListItem>
      </li>
    )
  }
}

ListItemLink.propTypes = {
  primary: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
}

export default function Nav(props) {
  const { isLoggedIn } = React.useContext(IdentityContext)
  const { container } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }

  function closeDrawer() {
    setMobileOpen(false)
  }

  const [open, setOpen] = React.useState(false)
  function toggleNested() {
    setOpen(!open)
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button onClick={toggleNested}>
          <ListItemText primary={i18n("Add new")} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List className={classes.nested} onClick={closeDrawer}>
            <ListItemLink primary={i18n("Participant")} to="/new" />
            <ListItemLink primary={i18n("Tournament")} to="/new-tournament" />
            <ListItemLink primary={i18n("Hotel")} to="/new-hotel" />
            <ListItemLink primary={i18n("Tax")} to="/new-tax" />
          </List>
        </Collapse>
      </List>

      <Divider />
      <List onClick={closeDrawer}>
        <ListItemLink primary={i18n("Participants")} to="/" />
        <ListItemLink primary={i18n("Tournaments")} to="/tournaments" />
        <ListItemLink primary={i18n("Hotels")} to="/hotels" />
        <ListItemLink primary={i18n("Taxes")} to="/taxes" />
      </List>

      <Divider />
      <List onClick={closeDrawer}>
        <ListItemLink
          primary={
            <Badge color="secondary" badgeContent="Beta" className="right-20">
              {i18n("Upload")}
            </Badge>
          }
          to="/upload-participants"
        />
      </List>

      <Divider />
      <List onClick={closeDrawer}>
        <ListItemLink primary={i18n("Settings")} to="/settings" />
        <ListItemLink primary={isLoggedIn ? i18n("Logout") : i18n("Login")} to="/login" />
      </List>

      <Divider />
      <Box px={2} pt={2}>
        <Typography variant="body2">
          <span>{i18n("created by")} </span>
          <a href="https://chesscoders.com" target="_blank" rel="noopener noreferrer">
            Chess Coders
          </a>
        </Typography>
      </Box>
    </div>
  )

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbarTop}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            onClick={() => (window.location.href = "/#/")}
            variant="h6"
            noWrap
            className={classes.header}
          >
            <AllInclusive />
            masterplanner {process.env.REACT_APP_DEMO_ACCOUNT && <span> | demo</span>}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="Mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  )
}

Nav.propTypes = {
  container: PropTypes.object,
}
