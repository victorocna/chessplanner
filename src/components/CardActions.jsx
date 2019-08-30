import React from "react"
import PropTypes from "prop-types"
import { CardActions, IconButton } from "@material-ui/core"
import { ExpandMore, DeleteForever, ClearOutlined, DoneOutlined } from "@material-ui/icons"
import useStyles from "./useStyles"
import clsx from "clsx"

function TaxRulesActions({ remove, index, expanded, handleExpand }) {
  const classes = useStyles()
  const [deleteConfirm, setDeleteConfirm] = React.useState(false)
  function handleDeleteClick() {
    setDeleteConfirm(!deleteConfirm)
  }

  return (
    <CardActions disableSpacing>
      <IconButton
        className={clsx({ red: deleteConfirm })}
        onClick={handleDeleteClick}
        aria-label="Delete"
      >
        <DeleteForever />
      </IconButton>
      <div className={deleteConfirm ? "" : "hidden"}>
        <IconButton onClick={() => remove(index)}>
          <DoneOutlined />
        </IconButton>
        <IconButton onClick={handleDeleteClick}>
          <ClearOutlined />
        </IconButton>
      </div>
      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
        onClick={handleExpand}
        aria-expanded={expanded}
        aria-label="Show more"
      >
        <ExpandMore />
      </IconButton>
    </CardActions>
  )
}

TaxRulesActions.propTypes = {
  index: PropTypes.number,
  expanded: PropTypes.bool,
  handleExpand: PropTypes.func,
  remove: PropTypes.func,
}

TaxRulesActions.defaultProps = {
  index: 0,
  expanded: true,
  handleExpand: () => {},
  remove: () => {},
}

export default TaxRulesActions
