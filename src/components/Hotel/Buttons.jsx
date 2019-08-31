import React from "react"
import PropTypes from "prop-types"
import { Button } from "@material-ui/core"
import { HotelContext } from "../../context"
import WhatsNext from "../WhatsNext"

function HotelButtons({ push }) {
  const { isSubmitting, submitCount } = React.useContext(HotelContext)

  return (
    <div className="flex mt-2">
      <Button
        variant="outlined"
        color="primary"
        className="mr-1"
        onClick={push}
        disabled={isSubmitting}
      >
        Add room
      </Button>
      <Button
        variant="contained"
        color="secondary"
        type="submit"
        className="mr-1"
        disabled={isSubmitting}
      >
        Save hotel
      </Button>

      {!!submitCount && !isSubmitting && <WhatsNext path="/#/taxes" />}
    </div>
  )
}

HotelButtons.propTypes = {
  push: PropTypes.func,
}

HotelButtons.defaultProps = {
  push: () => {},
}

export default HotelButtons
