import React, { Component } from "react"
import PropTypes from "prop-types"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"

class Suggestions extends Component {
  addEventListeners() {
    const allSugestions = document.querySelectorAll(".dropdown-entry")
    for (let i = 0; i < allSugestions.length; i++) {
      const newIndex = Number(allSugestions[i].getAttribute("suggestionindex"))
      allSugestions[i].onmouseenter = () => {
        this.props.changeActiveSuggestion(newIndex)
        allSugestions[i].classList.add("suggestion-active")
      }
      allSugestions[i].onmouseleave = () => {
        this.props.changeActiveSuggestion(null)
        allSugestions[i].classList.remove("suggestion-active")
      }
    }
  }
  componentDidMount() {
    this.addEventListeners()
  }
  componentDidUpdate() {
    this.addEventListeners()
  }
  render() {
    const { suggestions, activeSuggestion, onClick } = this.props
    return (
      <List disablePadding={true} className="suggestions">
        {suggestions.map((suggestion, index) => {
          const { name, yob, federation } = suggestion
          let className
          if (index === activeSuggestion) {
            className = "suggestion-active"
          }
          const suggestionText = `${name} (${federation}, ${yob})`
          return (
            <ListItem
              suggestionindex={index}
              originalindex={suggestion.originalIndex}
              className={"dropdown-entry " + className}
              key={name + index}
              onClick={onClick}
            >
              <ListItemText primary={suggestionText} />
            </ListItem>
          )
        })}
      </List>
    )
  }
}

Suggestions.propTypes = {
  suggestions: PropTypes.array,
  activeSuggestion: PropTypes.number,
  onClick: PropTypes.func,
  changeActiveSuggestion: PropTypes.func,
}

Suggestions.defaultProps = {
  suggestions: [],
  activeSuggestion: 0,
  onClick: () => {},
  changeActiveSuggestion: () => {},
}

export default Suggestions
