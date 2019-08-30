# Masterplanner

Masterplanner is built with some of the following technologies:

- React for the app frontend
- FaunaDB for the cloud backend with a NoSQL environment
- Netlify for automatic deployment from a Git repo
- Netlify Lambda for serverless functions
- Netlify Identity for user management
- AWS Cloudwatch for remote logging and storage

## Quick start

After installing the project dependencies, run the following commands.

```bash
export REACT_APP_FAUNADB_SERVER_SECRET="Your Fauna Server Secret"
npm start
```

## Logging

We use **AWS Cloudwatch** for remote logging and storage.

To handle the asynchronous nature of logging in lambda functions, we use basic HTTP POST requests to AWS logging, signed with aws4.
Using it in a lambda function is a two step process (both asynchronous):

1. get the next logging sequence token
2. push the log events to AWS Cloudwatch using the token

```bash
exports.handler = async (event) => {
  const sequenceToken = await getSequenceToken()
  await putLogEvents("Foo", sequenceToken)

  return { statusCode: 200 }
}
```

## Notify

We use **Material UI Snackbars** to notify its users of various messages.

To implement the snackbar in a React component, see the example below:

### Current

```bash
export default function Foo() {
  const [snackbar, notify] = useState({ open: false, message: '' })

  const someAction = () => {
    notify({ open: !snackbar.open, message: 'Hello world' })
  }

  return (
    <div>
      [...]
      <SnackbarWrapper openSnackbar={snackbar.open} message={snackbar.message} />
    </div>
  )
}
```

### Deprecated

```bash
class Foo extends React.Component {
  snackbarRef = React.createRef();

  someAction = () => {
    this.snackbarRef.current.openSnackBar("Hello world");
  }

  [...]

  render() {
    return (
      <div>
        [...]
        <Notify ref={this.snackbarRef} />
      </div>
    );
  }
}
```

## Testing

Tests are available for critical business logic and components.

- determining the taxes a participant needs to pay
- components with forms, snackbar notifications and others using enzyme

```bash
npm run test
```

## Further development

- [replace API methods with explicit ones](https://refactoring.com/catalog/removeFlagArgument.html)
- [consider throwing errors instead of empty object in pure functions](https://dev.to/carlillo/refactoring-guard-clauses-4ee6)
