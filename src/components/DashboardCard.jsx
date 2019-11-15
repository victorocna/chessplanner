import React from "react"
import PropTypes from "prop-types"
import { Avatar, Card, CardHeader, CardContent, CardActions } from "@material-ui/core"
import pattern from "../static/pattern.png"

const DashboardCard = (props) => {
  const { item, background, title, children } = props
  const description = children[0] || ""
  const actions = children[1] || ""

  const [count, setCount] = React.useState(0)
  React.useEffect(() => {
    const items = JSON.parse(localStorage.getItem(item)) || ""
    setCount(items.length)
  }, [item])

  return (
    <Card className="mt-1">
      <CardHeader
        avatar={
          <Avatar
            style={{
              background,
            }}
          >
            {count}
          </Avatar>
        }
        title={title}
        // subheader="you can add a maximum of 30"
      />
      <div className="py-4">
        <div
          style={{
            height: "80px",
            width: "100%",
            background: `${background} url(${pattern}) repeat center center`,
            opacity: ".75",
          }}
        ></div>
      </div>
      <CardContent>{description}</CardContent>
      <CardActions className="dashboard-card">{actions}</CardActions>
    </Card>
  )
}

DashboardCard.propTypes = {
  children: PropTypes.any,
  item: PropTypes.string,
  background: PropTypes.string,
  title: PropTypes.string,
}

export default DashboardCard
