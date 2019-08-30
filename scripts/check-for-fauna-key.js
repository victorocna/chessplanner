require('dotenv').config()
const chalk = require('chalk')

function checkForFaunaKey() {
  if (!process.env.REACT_APP_FAUNADB_SERVER_SECRET) {
    console.log(chalk.yellow(
      'Required REACT_APP_FAUNADB_SERVER_SECRET enviroment variable not found.'))
    console.log(`
=========================

You can create fauna DB keys here: https://dashboard.fauna.com/db/keys

In your terminal run the following command:

export REACT_APP_FAUNADB_SERVER_SECRET=YourFaunaDBKeyHere

=========================
`)

    process.exit(1)
  }
}

checkForFaunaKey()
