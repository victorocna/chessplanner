import React from "react"
import { Box, Typography, Button } from "@material-ui/core"
import DashboardCard from "./DashboardCard"

function Dashboard() {
  return (
    <Box m={2}>
      <Typography variant="h6">Dashboard</Typography>
      <div className="">
        <DashboardCard item="all_participants_by_key" background="#50854d" title="Participants">
          <Typography variant="body2" color="textSecondary" component="p">
            Participants are the people that are taking part in your event. You can add players, as
            well as companions, coaches and others.
          </Typography>
          <div>
            <Button size="small" color="primary" className="font-bold" href="/#/new">
              Add new
            </Button>
            <Button size="small" color="primary" className="font-bold" href="/#/participants">
              List
            </Button>
          </div>
        </DashboardCard>

        <DashboardCard item="all_tournaments_by_key" background="#3f51b5" title="Tournaments">
          <Typography variant="body2" color="textSecondary" component="p">
            You can have two types of tournaments: main and side. Players must be assigned one main
            tournament and any number of side ones.
          </Typography>
          <div>
            <Button size="small" color="primary" className="font-bold" href="/#/new-tournament">
              Add new
            </Button>
            <Button size="small" color="primary" className="font-bold" href="/#/tournaments">
              List
            </Button>
          </div>
        </DashboardCard>

        <DashboardCard item="all_hotels_by_key" background="#512DA8" title="Hotels">
          <Typography variant="body2" color="textSecondary" component="p">
            The accommodation you provide for the participants. You can add multiple room types for
            every accommodation you register.
          </Typography>
          <div>
            <Button size="small" color="primary" className="font-bold" href="/#/new-hotel">
              Add new
            </Button>
            <Button size="small" color="primary" className="font-bold" href="/#/hotels">
              List
            </Button>
          </div>
        </DashboardCard>

        <DashboardCard item="all_taxes_by_key" background="#BF360C" title="Taxes">
          <Typography variant="body2" color="textSecondary" component="p">
            Taxes can be applied to every tournament or you can define custom taxes. You can also
            define complex rules, like 50% off for GMs.
          </Typography>
          <div>
            <Button size="small" color="primary" className="font-bold" href="/#/new-tax">
              Add new
            </Button>
            <Button size="small" color="primary" className="font-bold" href="/#/taxes">
              List
            </Button>
          </div>
        </DashboardCard>
      </div>
    </Box>
  )
}

export default Dashboard
