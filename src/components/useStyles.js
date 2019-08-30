import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  button: {
    marginTop: theme.spacing(2),
  },
  inlineButton: {
    marginRight: theme.spacing(2),
  },
  textField: {
    display: "flex",
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(3),
  },
  secondaryField: {
    display: "flex",
    marginRight: theme.spacing(1),
    marginTop: 0,
  },
  grouped: {
    borderLeft: "solid 2px #3f51b5",
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(1),
  },
  chip: {
    margin: theme.spacing(1),
  },
  dndProvider: {
    marginTop: theme.spacing(2),
  },
  hidden: {
    display: "none",
  },
  card: {
    maxWidth: 345,
    marginBottom: "20px",
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}))

export default useStyles
