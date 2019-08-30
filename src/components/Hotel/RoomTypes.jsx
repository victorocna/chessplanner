import React from "react"
import { Card, CardHeader, Collapse } from "@material-ui/core"
import { FieldArray } from "formik"
import { HotelContext } from "../../context"
import useStyles from "../useStyles"
import { i18n } from "../../locale"
import { Buttons, RoomTypesContent } from "./"
import CardActions from "../CardActions"
import { currency } from "../../defaults"

function RoomTypes() {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(true)
  function handleExpand() {
    setExpanded(!expanded)
  }

  const { values } = React.useContext(HotelContext)
  const emptyRoomType = { name: "", capacity: "", price: "", currency }

  const title = (name) => {
    return `${i18n("Room")} "${name || "N/A"}"`
  }

  return (
    <FieldArray
      name="roomTypes"
      render={({ push, remove }) => (
        <div>
          {values.roomTypes &&
            values.roomTypes.length > 0 &&
            values.roomTypes.map((roomType, index) => (
              <Card key={index} className={classes.card}>
                <CardHeader title={title(roomType.name)} />
                <CardActions
                  index={index}
                  remove={remove}
                  expanded={expanded}
                  handleExpand={handleExpand}
                />
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <RoomTypesContent index={index} />
                </Collapse>
              </Card>
            ))}
          <Buttons push={() => push(emptyRoomType)} />
        </div>
      )}
    />
  )
}

export default RoomTypes
