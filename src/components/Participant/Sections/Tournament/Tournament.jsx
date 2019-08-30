import React from "react"
import fromStore from "../../../../utils/fromStore"
import { Typography } from "@material-ui/core"
import { Main, Side } from "../Tournament"

function Tournament() {
  const [tournaments, setTournaments] = React.useState([])
  React.useEffect(() => {
    async function fetchData() {
      const all_tournaments = await fromStore("all_tournaments_by_key")
      const tournaments = all_tournaments.map((item) => ({
        ...item.data,
        id: item["ref"]["@ref"]["id"],
      }))

      setTournaments(tournaments)
    }
    fetchData()
  }, [])

  return (
    <div>
      {tournaments.length > 0 && (
        <div>
          <Main tournaments={tournaments} />
          <Side tournaments={tournaments} />
        </div>
      )}

      {tournaments.length === 0 && (
        <Typography variant="body2">
          <span>No tournaments found. </span>
          <a href="/#/new-tournament">Did you forget to add a tournament?</a>
        </Typography>
      )}
    </div>
  )
}

export default Tournament
