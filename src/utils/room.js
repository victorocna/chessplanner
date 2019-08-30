const roomName = (hotelValues) => {
  let name = hotelValues.name
  if (hotelValues.room.type) {
    name += " " + hotelValues.room.type
  }
  return name
}
const roomPrice = (hotelValues) => {
  const contribution = hotelValues.room.contribution || null
  const price = +hotelValues.room.price || 0
  const nights = +hotelValues.nights || 0
  const capacity = +hotelValues.room.capacity || 1

  switch (contribution) {
    case "empty":
      return 0
    case "full":
      return Math.round(price * nights)
    default:
      return Math.round((price * nights) / capacity)
  }
}

export { roomName, roomPrice }
