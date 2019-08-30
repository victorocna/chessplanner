import React from "react"
import fromStore from "../../../../utils/fromStore"
import { HotelName, HotelRoom, Timeframe, Contribution } from "../Hotel"
import { ParticipantContext } from "../../../../context"

function Hotel() {
  const { values } = React.useContext(ParticipantContext)

  const [hidden, setHidden] = React.useState(false)
  React.useEffect(() => {
    const shouldHide = values.hotel.name === "" || values.hotel.name === "no"
    setHidden(shouldHide)
  }, [values.hotel])

  const [hotels, setHotels] = React.useState([])
  React.useEffect(() => {
    async function fetchData() {
      const all_hotels = await fromStore("all_hotels_by_key")
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
