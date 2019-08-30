import React, { Component } from "react"
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
    const { filteredSuggestions, activeSuggestion, onClick } = this.props
    return (
      <List disablePadding={true} className="suggestions">
        {filteredSuggestions.map((suggestion, index) => {
          let className
          if (index === activeSuggestion) {
            className = "suggestion-active"
          }
          const suggestionText = `${suggestion.name} (n. ${suggestion.birthYear})`
          return (
            <ListItem
              suggestionindex={index}
              originalindex={suggestion.originalIndex}
              className={"dropdown-entry " + className}
              key={suggestion.name + "" + suggestion.birthday}
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

export default Suggestions
