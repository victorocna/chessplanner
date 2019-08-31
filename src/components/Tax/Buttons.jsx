import React from "react"
import PropTypes from "prop-types"
import { Button } from "@material-ui/core"
import { TaxContext } from "../../context"
import WhatsNext from "../WhatsNext"

function TaxButtons({ push }) {
  const { isSubmitting, submitCount } = React.useContext(TaxContext)

  return (
    <div className="flex mt-2">
      <Button
        variant="outlined"
        color="primary"
        className="mr-1"
        onClick={push}
        disabled={isSubmitting}
      >
        Add rule
      </Button>
      <Button
        variant="contained"
        color="secondary"
        type="submit"
        className="mr-1"
        disabled={isSubmitting}
      >
        Save tax
      </Button>

      {!!submitCount && !isSubmitting && <WhatsNext path="/#/taxes" />}
    </div>
  )
}

TaxButtons.propTypes = {
  push: PropTypes.func,
}

TaxButtons.defaultProps = {
  push: () => {},
}

export default TaxButtons
