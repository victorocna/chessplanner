import React, { Component } from "react"
import PropTypes from "prop-types"
import Suggestions from "./Suggestions"
import TextField from "@material-ui/core/TextField"
import { i18n } from "../../locale"
import api from "../../api"

class Autocomplete extends Component {
  constructor(props) {
    super(props)
    this.timeout = 0
    this.state = {
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

  isReadyToShow = () => {
    // If maxSuggestions is 0, always show
    return !this.state.maxSuggestions || this.state.suggestions.length < this.state.maxSuggestions
  }

  updateInputValue = (newValue) => {
    // Promised setState
    return new Promise((resolve) => {
      this.setState(
        {
          userInput: newValue,
        },
        resolve
      )
    })
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
  hasDeletedChars = (prevInput) => {
    const prevLength = prevInput.length
    const newLength = this.state.userInput.length
    return newLength < prevLength
  }
  hasSuggestions = () => {
    // return !!this.state.filteredSuggestions.length
    return !(this.state.bottomMessage === i18n("Participant not found"))
  }
  shouldComputeAgain = (prevInput) => {
    // Should only handle inputchange if there are suggestions.
    // If there aren't, search suggestions only if the user has deleted chars
    if (this.hasSuggestions()) {
      return true
    }
    return this.hasDeletedChars(prevInput)
  }
  onChange = async (event) => {
    // First, call the onChange function inhereted from the parent
    if (typeof this.props.onChange === "function") {
      this.props.onChange(event)
    }
    const userInput = event.currentTarget.value
    if (this.isReadyToSearch()) {
      this.timeout = setTimeout(async () => {
        const suggestions = await api.search(userInput)
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
  handleArrowNav = (e) => {
    e.preventDefault()
    const arrowType = e.keyCode === 38 ? "up" : "down"
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
  completePlayerName = (playerName) => {
    return new Promise((resolve) => {
      this.setState(
        {
          userInput: playerName,
        },
        resolve
      )
    })
  }
  changeActiveSuggestion = (newIndex) => {
    this.setState({
      activeSuggestion: newIndex,
    })
  }
  jobDone = () => {
    /*
    Called when submitting, resets suggestions.
     */
    this.setState({
      activeSuggestion: 0,
      suggestions: [],
      showSuggestions: false,
      showBottomMessage: false,
    })
  }
  handleSubmit = (e) => {
    if (e) {
      e.preventDefault()
    }
    const { activeSuggestion, suggestions } = this.state
    const activePlayer = suggestions[activeSuggestion]
    let activePlayerName = activePlayer ? activePlayer.name : this.state.userInput.toUpperCase()
    let updateObj = activePlayer ? this.getUpdateObj(activePlayer) : { name: activePlayerName }
    this.completePlayerName(activePlayerName).then(() => {
      this.jobDone()
      this.onSubmit(updateObj)
    })
  }
  getUpdateObj = (player) => {
    // FIXME: component is changing a controlled input
    const { name, federation, yob } = player
    return { name, federation, yob }
  }
  onKeyDown = (e) => {
    switch (e.keyCode) {
      case 9: // TAB
      case 13: // ENTER
        this.handleSubmit(e)
        break
      case 38: // Arrow Up
      case 40: // Arrow Down
        this.handleArrowNav(e)
        break
      default:
    }
  }
  onClick = (e) => {
    this.handleSubmit(e)
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
          inputProps={{
            autoComplete: "off",
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
