let defaults = {
  wrapperId: "notification-wrapper",
  animationDuration: 300,
  timeout: 5000,
  zIndex: 1000,
  top: 0, // Controls the offset from top of viewport.
  colors: {
    error: {
      color: "#FFFFFF",
      backgroundColor: "#E54D42",
    },
    success: {
      color: "#FFFFFF",
      backgroundColor: "#42A85F",
    },
    warning: {
      color: "#FFFFFF",
      backgroundColor: "#f48a06",
    },
    info: {
      color: "#FFFFFF",
      backgroundColor: "#187FE7",
    },
  },
}

function mergeOptions(options) {
  defaults = Object.assign(defaults, options)
}

export { defaults, mergeOptions }
