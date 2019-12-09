import React from "react"
import PropTypes from "prop-types"
import { DndProvider } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"
import TouchBackend from "react-dnd-touch-backend"

function DndWrapper(props) {
  const { chips, renderChip } = props

  /**
   * Mobile/Desktop switch for DND (drag-and-drop) functionality
   * @see https://stackoverflow.com/a/3540295/6884801
   */
  const isMobile = (ua) => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
      return true
    }
    return false
  }
  const whichBackend = (ua) => {
    return isMobile(ua) ? TouchBackend : HTML5Backend
  }

  return (
    <DndProvider backend={whichBackend(navigator.userAgent)} className="mt-2">
      {chips.map((chip, i) => renderChip(chip, i))}
    </DndProvider>
  )
}

DndWrapper.propTypes = {
  chips: PropTypes.array,
  renderChip: PropTypes.func,
}

DndWrapper.defaultProps = {
  chips: [],
  renderChip: () => {},
}

export default DndWrapper
