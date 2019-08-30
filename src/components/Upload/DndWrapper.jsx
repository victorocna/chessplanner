import React from "react"
import { DndProvider } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"
import TouchBackend from "react-dnd-touch-backend"
import useChip from "./useChip"

function DndWrapper() {
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

  const { chips, renderChip } = useChip()
  return (
    <DndProvider backend={whichBackend(navigator.userAgent)} className="mt-2">
      {chips.map((chip, i) => renderChip(chip, i))}
    </DndProvider>
  )
}

export default DndWrapper
