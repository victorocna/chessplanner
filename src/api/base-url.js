/**
 * Base URL for netlify functions needs to be specified for development environments
 */
export default process.env.NODE_ENV === "production" ? "" : "http://localhost:9000"
