import React from "react"
import ChipWrapper from "./ChipWrapper"
import update from "immutability-helper"
import columns from "../Settings/possible-columns"
import AppContext from "../../context/app-context"
import shouldShow from "../../utils/shouldShow"

const useChip = (options) => {
  const { settings } = React.useContext(AppContext)
  const [chips, setChips] = React.useState([])

  React.useEffect(() => {
    const filtered = options.filter((option) => {
      if (Object.keys(columns).includes(option.key)) {
        if (!shouldShow(option.key).basedOn(settings)) {
          return false
        }
      }
      return true
    })
    setChips(filtered)
  }, [settings])

  const handleDelete = (item) => {
    setChips(chips.filter((label) => label.key !== item.key))
  }

  /**
   * @see http://react-dnd.github.io/react-dnd/examples/sortable/simple
   */
  const moveChip = React.useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = chips[dragIndex]
      setChips(
        update(chips, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        })
      )
    },
    [chips]
  )

  const renderChip = (chip, index) => {
    return (
      <ChipWrapper
        key={index}
        index={index}
        id={chip.id}
        text={chip.text}
        required={chip.required}
        moveChip={moveChip}
        onDelete={() => handleDelete(chip)}
      />
    )
  }

  return { chips, setChips, renderChip }
}

export default useChip
