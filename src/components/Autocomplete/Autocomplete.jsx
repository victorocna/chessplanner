import React, { Component } from "react"
import PropTypes from "prop-types"
import { InputAdornment, CircularProgress, TextField } from "@material-ui/core"
import Suggestions from "./Suggestions"
import { i18n } from "../../locale"
import api from "../../api"

class Autocomplete extends Component {
  constructor(props) {
    super(props)
    this.timeout = 0
    this.state = {
      loadingSuggestions: false,
      // When to start searching for suggestions
      minLetters: 3,
      // When to show suggestions
      maxSuggestions: 20,
      // What the user has typed in autocomplete input
      userInput: this.props.value,
      // Index of active filteredSuggestion
      activeSuggestion: 0,
      // Array of suggestions based on input
      suggestions: [],
      // Flag to show Suggestions component
      showSuggestions: false,
      // Flag to show Message component
      showBottomMessage: true,
      // Bottom message to show when Suggestions hidden
      bottomMessage: i18n("Please type 3 letters to view suggestions"),
    }
  }
  componentDidUpdate(previousProps) {
    if (previousProps.value !== this.props.value) {
      this.setState({ ...this.state, userInput: this.props.value })
      this.hideBottomMessage()
    }
  }
  hideBottomMessage = () => {
    this.setState({
      showBottomMessage: false,
      bottomMessage: "",
    })
  }
  onSubmit = (index) => {
    const emptyInput = this.state.userInput.length === 0
    if (!emptyInput) {
      this.hideBottomMessage()
      this.props.onSubmit(index)
    }
  }
  isReadyToSearch = () => {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    return this.state.userInput.length >= this.state.minLetters
  }
  triggerShow = (suggestions) => {
    this.setState({
      suggestions,
      showSuggestions: true,
      showBottomMessage: false,
      activeSuggestion: 0,
      bottomMessage: "",
    })
  }
  triggerTooMany = () => {
    this.setState({
      showSuggestions: false,
      showBottomMessage: true,
      bottomMessage: i18n("More than 20 suggestions. Please continue typing"),
    })
  }
  triggerNoResults = () => {
    this.setState({
      showSuggestions: false,
      showBottomMessage: true,
      bottomMessage: i18n("Participant not found"),
    })
  }
  triggerHide = () => {
    this.setState({
      showSuggestions: false,
      showBottomMessage: true,
      bottomMessage: i18n("Please type 3 letters to view suggestions"),
    })
  }
  onChange = async (event) => {
    // First, call the onChange function inhereted from the parent
    if (typeof this.props.onChange === "function") {
      this.props.onChange(event)
    }
    const userInput = event.currentTarget.value
    if (this.isReadyToSearch()) {
      this.timeout = setTimeout(async () => {
        this.setState({ loadingSuggestions: true })
        const suggestions = await api.search(userInput)
        this.setState({ loadingSuggestions: false })

        if (suggestions.length === 0) {
          return this.triggerNoResults()
        }
        if (suggestions.length > 20) {
          return this.triggerTooMany()
        }
        return this.triggerShow(suggestions)
      }, 500)
    } else {
      return this.triggerHide()
    }
  }
  handleArrowNav = (event) => {
    event.preventDefault()
    const arrowType = event.keyCode === 38 ? "up" : "down"
    const { activeSuggestion, suggestions } = this.state
    if (arrowType === "down") {
      const lastSuggestionIsActive = activeSuggestion === suggestions.length - 1
      if (lastSuggestionIsActive) {
        return
      }
      this.setState({ activeSuggestion: activeSuggestion + 1 })
    } else if (arrowType === "up") {
      const firstSuggestionIsActive = activeSuggestion === 0
      if (firstSuggestionIsActive) {
        return
      }
      this.setState({ activeSuggestion: activeSuggestion - 1 })
    }
  }
  changeActiveSuggestion = (newIndex) => {
    this.setState({
      activeSuggestion: newIndex,
    })
  }
  jobDone = () => {
    this.setState({
      activeSuggestion: 0,
      suggestions: [],
      showSuggestions: false,
      showBottomMessage: false,
    })
  }
  handleSubmit = (event) => {
    if (event) {
      event.preventDefault()
    }
    const { activeSuggestion, suggestions } = this.state
    const activePlayer = suggestions[activeSuggestion]

    if (!activePlayer) {
      return false
    }

    this.jobDone()
    this.onSubmit(this.getUpdateObj(activePlayer))
  }
  getUpdateObj = (player) => {
    const { name, federation, yob, title, profile } = player
    return { name, federation, yob, title, profile }
  }
  onKeyDown = (event) => {
    switch (event.keyCode) {
      case 9: // TAB
      case 13: // ENTER
        this.handleSubmit(event)
        break
      case 38: // Arrow Up
      case 40: // Arrow Down
        this.handleArrowNav(event)
        break
      default:
    }
  }
  onClick = (event) => {
    this.handleSubmit(event)
  }
  render() {
    const {
      onChange,
      changeActiveSuggestion,
      onClick,
      onKeyDown,
      onKeyUp,
      state: { activeSuggestion, suggestions, showSuggestions, bottomMessage, userInput },
    } = this

    return (
      <>
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment className={this.state.loadingSuggestions ? "block" : "hidden"} position="end">
                <CircularProgress size={20} />
              </InputAdornment>
            ),
          }}
          className="autocomplete-input"
          label={i18n("Name")}
          helperText={bottomMessage}
          margin="normal"
          spellCheck="false"
          onChange={onChange}
          onBlur={this.props.onBlur}
          name={this.props.name}
          error={this.props.error}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          value={userInput}
          autoComplete="new-password"
          autoFocus
        />
        {showSuggestions && (
          <Suggestions
            suggestions={suggestions}
            changeActiveSuggestion={changeActiveSuggestion}
            onClick={onClick}
            activeSuggestion={activeSuggestion}
          />
        )}
      </>
    )
  }
}

Autocomplete.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func, // Formik prop
  onBlur: PropTypes.func, // Formik prop
  onSubmit: PropTypes.func,
  name: PropTypes.string, // Formik prop
  error: PropTypes.any, // Formik prop
  suggestions: PropTypes.object,
}

Autocomplete.defaultValues = {
  value: "",
}

export default Autocomplete
