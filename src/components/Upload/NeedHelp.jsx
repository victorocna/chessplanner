import React from "react"
import { Box, Typography, ButtonGroup, Button, Collapse } from "@material-ui/core"
import { ExpandLess, ExpandMore } from "@material-ui/icons"
import { i18n } from "../../locale"

const NeedHelp = () => {
  const [collapse, setCollapse] = React.useState(false)
  const toggle = () => {
    setCollapse(!collapse)
  }

  const downloadCsv = () => {
    downloadFile("/upload-sample.csv")
  }
  const downloadExcel = () => {
    downloadFile("/upload-sample.xlsx")
  }
  const downloadFile = (filename) => {
    const link = document.createElement("a")
    link.href = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Box my={2}>
      <Typography
        paragraph
        color="error"
        onClick={toggle}
        style={{
          display: "flex",
          cursor: "pointer",
          float: "left",
        }}
      >
        {i18n("Need help?")}
        {collapse ? <ExpandLess /> : <ExpandMore />}
      </Typography>

      <Collapse
        in={collapse}
        timeout="auto"
        unmountOnExit
        style={{
          float: "left",
          width: "100%",
        }}
      >
        <Typography paragraph variant="body2">
          {i18n("Download sample documents that will guarantee your import will go smoothly")}
        </Typography>
        <ButtonGroup size="small">
          <Button onClick={downloadCsv}>Download CSV</Button>
          <Button onClick={downloadExcel}>Download Excel</Button>
        </ButtonGroup>
        <br />
        <br />
      </Collapse>
    </Box>
  )
}

export default NeedHelp
