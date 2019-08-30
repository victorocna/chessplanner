import React, { useRef } from "react"
import PropTypes from "prop-types"
import { Chip } from "@material-ui/core"
import { DragIndicator } from "@material-ui/icons"
import { useDrag, useDrop } from "react-dnd"
import useStyles from "../useStyles"

const ChipWrapper = ({ id, text, index, moveChip, onDelete, required }) => {
  const classes = useStyles()
  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: "ChipWrapper",
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveChip(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    item: { type: "ChipWrapper", id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0.33 : 1
  drag(drop(ref))
  return (
    <div ref={ref} className={classes.chip} style={{ opacity }}>
      {required ? (
        <Chip
          icon={<DragIndicator />}
          variant="outlined"
          color="primary"
          label={text}
          // no delete method for required chips
        />
      ) : (
        <Chip
          icon={<DragIndicator />}
          variant="outlined"
          color="primary"
          label={text}
          onDelete={onDelete}
        />
      )}
    </div>
  )
}

ChipWrapper.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string,
  index: PropTypes.number,
  moveChip: PropTypes.func,
  onDelete: PropTypes.func,
  required: PropTypes.bool,
}

ChipWrapper.defaultProps = {
  onDelete: () => {}, // noop
  required: false,
}

export default ChipWrapper
