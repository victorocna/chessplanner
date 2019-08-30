import React, { Component } from "react"
import PropTypes from "prop-types"
import Suggestions from "./Suggestions"
import TextField from "@material-ui/core/TextField"
import { i18n } from "../../locale"
import "./Autocomplete.css"

class Autocomplete extends Component {
  constructor(props) {
    super(props)
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
      filteredSuggestions: [],
      // Flag to show Suggestions component
      showSuggestions: false,
      // Flag to show Message component
      showBottomMessage: true,
      // Bottom message to show when Suggestions hidden
      bottomMessage: i18n("Please type 3 letters to view suggestions"),
    }
  }
  componentDidUpdate(previousProps) {
    if (this.props.value && previousProps.value !== this.props.value) {
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
    return this.state.userInput.length >= this.state.minLetters
  }

  isReadyToShow = () => {
    // If maxSuggestions is 0, always show
    return (
      !this.state.maxSuggestions ||
      this.state.filteredSuggestions.length < this.state.maxSuggestions
    )
  }

  loadSuggestions = (userInput) => {
    const allSuggestions = this.props.suggestions
    const firstLetters = userInput.substr(0, this.state.minLetters).toUpperCase()
    // Returning empty array is necessary to avoid fatal error when using suggestions.length
    return allSuggestions[firstLetters] ? allSuggestions[firstLetters] : []
  }
  filterSuggestions = (suggestions, userInput) => {
    let filteredArr = []
    for (let i = 0; i < suggestions.length; i++) {
      if (suggestions[i].name.includes(userInput.toUpperCase())) {
        filteredArr.push(suggestions[i])
        // Stop looking for suggestions if we already hit maxSuggestions limit.
        if (filteredArr.length === this.state.maxSuggestions) {
          return filteredArr
        }
      }
    }
    return filteredArr
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
  updateSuggestions = (filteredSuggestions) => {
    // Better to reject when no suggestions, for better inputchange handling
    return new Promise((resolve, reject) => {
      this.setState(
        {
          filteredSuggestions,
        },
        filteredSuggestions.length ? resolve : reject
      )
    })
  }
  triggerShow = () => {
    this.setState({
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
  onChange = (event) => {
    // First, call the onChange function inhereted from the parent
    if (typeof this.props.onChange === "function") {
      this.props.onChange(event)
    }

    const userInput = event.currentTarget.value
    const prevInput = this.state.userInput
    this.updateInputValue(userInput).then(() => {
      // Exit function if there is no chance of finding new suggestions
      if (!this.shouldComputeAgain(prevInput)) {
        return
      }
      if (this.isReadyToSearch()) {
        const suggestions = this.loadSuggestions(userInput)
        const filteredSuggestions = this.filterSuggestions(suggestions, userInput)
        this.updateSuggestions(filteredSuggestions)
          // If at least one valid suggestion
          .then(() => {
            if (this.isReadyToShow()) {
              this.triggerShow()
            } else {
              this.triggerTooMany()
            }
          })
          // If no valid suggestion
          .catch(() => {
            this.triggerNoResults()
          })
      } else {
        this.triggerHide()
      }
    })
  }
  handleArrowNav = (e) => {
    e.preventDefault()
    const arrowType = e.keyCode === 38 ? "up" : "down"
    const { activeSuggestion, filteredSuggestions } = this.state
    if (arrowType === "down") {
      const lastSuggestionIsActive = activeSuggestion === filteredSuggestions.length - 1
      if (lastSuggestionIsActive) {
        return
      }
      this.setState({ activeSuggestion: activeSuggestion + 1 })
      // document.querySelector('.suggestions').scrollBy(0, 25)
    } else if (arrowType === "up") {
      const firstSuggestionIsActive = activeSuggestion === 0
      if (firstSuggestionIsActive) {
        return
      }
      this.setState({ activeSuggestion: activeSuggestion - 1 })
      // document.querySelector('.suggestions').scrollBy(0, -25)
    }
  }
  completePlayerName = (playerName) => {
    // const newUserInput = player.name
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
      filteredSuggestions: [],
      showSuggestions: false,
      showBottomMessage: false,
    })
  }
  handleSubmit = (e) => {
    if (e) {
      e.preventDefault()
    }
    const { activeSuggestion, filteredSuggestions } = this.state
    const activePlayer = filteredSuggestions[activeSuggestion]
    let activePlayerName = activePlayer ? activePlayer.name : this.state.userInput.toUpperCase()
    let updateObj = activePlayer ? this.getUpdateObj(activePlayer) : { name: activePlayerName }
    this.completePlayerName(activePlayerName).then(() => {
      this.jobDone()
      this.onSubmit(updateObj)
    })
  }
  getUpdateObj = (player) => ({
    name: player.name,
    gender: player.sex,
    club: player.club.name,
    yob: player.birthYear,
    federation: "ROU",
    isMedaliat: player.isMedaliat,
    isTitrat: ["GM", "IM", "WGM", "WIM"].includes(player.rating.title),
  })
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
      state: { activeSuggestion, filteredSuggestions, showSuggestions, bottomMessage, userInput },
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
            filteredSuggestions={filteredSuggestions}
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
