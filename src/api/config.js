const getIndexFrom = (instance) => {
  const config = {
    hotels: "all_hotels_by_key",
    taxes: "all_taxes_by_key",
    tournaments: "all_tournaments_by_key",
    participants: "all_participants_by_key",
    settings: "all_settings_by_key",
  }

  if (typeof config[instance] !== "undefined") {
    return config[instance]
  }
  return ""
}

export default { getIndexFrom }
