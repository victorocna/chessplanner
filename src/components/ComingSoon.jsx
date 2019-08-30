import React from "react"
import { Typography, Box, Button, Link } from "@material-ui/core"
import useStyles from "./useStyles"

export default function ComingSoon() {
  const classes = useStyles()
  return (
    <Box m={2}>
      <Typography variant="h4">Coming soon</Typography>
      <Typography paragraph variant="body2">
        This page is not ready yet, but we are working on launching it ASAP. In the meantime, here
        is what you can do
      </Typography>
      <Button href="/#/" variant="contained" color="secondary" className={classes.inlineButton}>
        Back home
      </Button>
      <Link href="https://chesscoders.com/#!/contact" target="_blank" rel="noopener noreferrer">
        Report this issue
      </Link>
    </Box>
  )
}
