import React from "react"
import fromStore from "../../../../utils/fromStore"
import { HotelName, HotelRoom, Timeframe, Contribution } from "../Hotel"
import { ParticipantContext } from "../../../../context"
import { hasAccommodation } from '../../../../functions'

function Hotel() {
  const { values } = React.useContext(ParticipantContext)

  const [hidden, setHidden] = React.useState(false)
  React.useEffect(() => {
    const shouldHide = !hasAccommodation(values.hotel.name)
    setHidden(shouldHide)
  }, [values.hotel])

  const [hotels, setHotels] = React.useState([])
  React.useEffect(() => {
    async function fetchData() {
      const all_hotels = await fromStore("hotels")
      const hotels = all_hotels.map((item) => ({
        ...item.data,
        id: item["ref"]["@ref"]["id"],
      }))

      setHotels(hotels)
    }
    fetchData()
  }, [])

  const [roomTypes, setRoomTypes] = React.useState([])
  React.useEffect(() => {
    const activeHotel = hotels.filter((item) => item.name === values.hotel.name)
    if (activeHotel.length > 0) {
      setRoomTypes(activeHotel[0]["roomTypes"])
    }
  }, [values.hotel, hotels])

  return (
    <div>
      <HotelName hotels={hotels} />
      <HotelRoom roomTypes={roomTypes} hidden={hidden} />
      <Timeframe hidden={hidden} />
      <Contribution hidden={hidden} />
    </div>
  )
}

export default Hotel
