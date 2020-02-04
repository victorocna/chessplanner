import React from "react"
import PropTypes from "prop-types"
import { TextField, MenuItem } from "@material-ui/core"
import { Field } from "formik"
import { hasError } from "../../../../utils/validation"
import { ParticipantContext } from "../../../../context"

function Room({ roomTypes, hidden }) {
  const { values, setFieldValue } = React.useContext(ParticipantContext)
  React.useEffect(() => {
    const activeRoom = roomTypes.filter((item) => item.name === values.hotel.room.type)
    if (activeRoom && activeRoom[0]) {
      setFieldValue("hotel.room.price", activeRoom[0].price || "")
      setFieldValue("hotel.room.capacity", activeRoom[0].capacity || "")
    }
    // eslint-disable-next-line
  }, [values.hotel.room.type])

  const roomTypesHelperText = (number) => {
    switch (number) {
      case 0:
        return "Nothing found"
      case 1:
        return "1 room type found"
      default:
        return number + " room types found"
    }
  }

  if (hidden) {
    return null
  }

  return (
    <div>
      <Field
        name="hotel.room.type"
        render={({ field, form }) => (
          <TextField
            {...field} // "name", "value", "onChange", "onBlur"
            select
            className="flex w-1/2 mt-8"
            label="Room type"
            error={hasError(form, field.name)}
            helperText={roomTypesHelperText(roomTypes.length)}
          >
            <MenuItem value="">Choose room</MenuItem>
            {roomTypes &&
              roomTypes.map((room, index) => (
                <MenuItem key={index} value={room.name}>
                  {room.name}
                </MenuItem>
              ))}
          </TextField>
        )}
      />
      <Field
        name="hotel.room.number"
        render={({ field, form }) => (
          <TextField
            {...field} // "name", "value", "onChange", "onBlur"
            className="flex w-1/2 mt-8"
            label="Room number"
            error={hasError(form, field.name)}
          />
        )}
      />
    </div>
  )
}

Room.propTypes = {
  roomTypes: PropTypes.array,
  hidden: PropTypes.bool,
}

Room.defaultProps = {
  roomTypes: [],
  hidden: false,
}

export default Room
