import React from "react"
import PropTypes from "prop-types"
import fromStore from "../../utils/fromStore"
import { notify } from "../Toast"
import DangerZone from "../DangerZone"
import { Box, Button, Typography } from "@material-ui/core"
import ToPrint from "./ToPrint"
import printStyles from "./print-styles"

const ParticipantSheet = (props) => {
  const [subject, setSubject] = React.useState({})

  React.useEffect(() => {
    async function fetchData(id) {
      const all_participants = await fromStore("participants")
      const participant = all_participants.filter((item) => item["ref"]["@ref"]["id"] === id + "")

      if (participant.length !== 1) {
        notify.error("Error! Cannot read participant")
        return
      }

      setSubject(() => ({ ...participant[0].data }))
    }
    fetchData(props.match.params.id)
    // eslint-disable-next-line
  }, [props.match.params.id])

  const print = () => {
    var content = document.getElementById("section-to-print")
    var pri = document.getElementById("print-helper").contentWindow
    pri.document.open()
    pri.document.write(content.outerHTML)
    pri.document.write(printStyles())
    pri.document.close()
    pri.focus()
    pri.print()
  }
  const edit = () => {
    window.location.href = "/#/edit/" + props.match.params.id
  }

  return (
    <Box m={2}>
      <Typography variant="h6">Participant Sheet</Typography>

      <Button variant="contained" color="secondary" className="mr-1 mt-1" onClick={print}>
        Print
      </Button>
      <Button variant="outlined" color="primary" className="mr-1 mt-1" onClick={edit}>
        Update participant
      </Button>

      <DangerZone instance="participants" id={props.match.params.id} />

      <ToPrint subject={subject} />
      <iframe id="print-helper" title="print-helper" />
    </Box>
  )
}

ParticipantSheet.propTypes = {
  match: PropTypes.any,
}

export default ParticipantSheet
