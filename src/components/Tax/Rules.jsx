import React from "react"
import { Card, CardHeader, Collapse } from "@material-ui/core"
import { FieldArray } from "formik"
import { TaxContext } from "../../context"
import useStyles from "../useStyles"
import { i18n } from "../../locale"
import TaxRulesContent from "./RulesContent"
import CardActions from "../CardActions"
import TaxButtons from "./Buttons"

function TaxRules() {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(true)
  function handleExpand() {
    setExpanded(!expanded)
  }

  const { values } = React.useContext(TaxContext)
  const emptyRule = { name: "", key: "", eq: "==", val: "" }

  const title = (name) => {
    return `${i18n("Rule")} "${name || "N/A"}"`
  }

  return (
    <FieldArray
      name="rules"
      render={({ push, remove }) => (
        <div>
          {values.rules &&
            values.rules.length > 0 &&
            values.rules.map((rule, index) => (
              <Card key={index} className={classes.card}>
                <CardHeader title={title(rule.name)} />
                <CardActions
                  index={index}
                  remove={remove}
                  expanded={expanded}
                  handleExpand={handleExpand}
                />
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <TaxRulesContent index={index} />
                </Collapse>
              </Card>
            ))}
          <TaxButtons push={() => push(emptyRule)} />
        </div>
      )}
    />
  )
}

export default TaxRules
