# Front-end Engineer Pair Programming Exercise

## Running project 🏃‍♂️

The project includes both a `package-lock.json` and a `yarn.lock` files meaning that you can use either `npm` or `yarn` to run the project.

If using `npm`:

```bash
npm install
npm start
```

If using `yarn`:

```bash
yarn install
yarn start
```

Both `package-lock.json` and `yarn.lock` are up to date to match the dependencies found in `package.json`.
You will notice that the project includes an `.npmrc` file that includes the line `save-exact=true`. This ensures that exact versions of dependencies are installed.

## Running tests 🧪

If using `npm`:

```bash
npm test
```

If using `yarn`:

```bash
yarn test
```

## Additional dependencies not included in original boilerplate project

- `crypto-js` and `crypto-browserify` was used to create `messageToSHA256` which generates a SHA256 hash. I originally was planning on using the [Web Crypto API `digest` function](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#basic_example) but this didn not play too well with Jest and React Testing Library.
- `@testing-library/dom`, `@testing-library/jest-dom` and `@testing-library/react` (all dev dependencies) were used to test React components and user interactions.
- `redux-mock-store` (dev dependency) was used to test redux action creators.
- `react-error-overlay` (dev dependency) was used to circumvent an issue introduced by `react-scripts` where HMR would add an `iframe` into the DOM (the joys of `create-react-app`). [GitHub issue here](https://github.com/facebook/create-react-app/issues/11773).
- various `@types` dev dependencies were installed for TypeScript goodness.

## Original `readme.md` content below ⬇️

## Preface

At Qudini we utilise a range of front-end technologies which make up our stack. We're evolving our existing and greenfield applications to make use of a more modern set of technologies. We make use of React on both the web with React-DOM and on mobile devices using React-Native.

This exercise is intended to give you an idea into the technology stack we're currently using along with experiencing the domain we apply these technologies towards. This is not seen as a test and there are no right or wrong answers, we're open to your ideas and opinions in regards to how you feel the below problem could be best solved.

## The exercise

Within this repository you will find a project created with create-react-app, some of the features have been partially implemented however we would like you to revisit them and complete the implementation.

The new Queues screen feature should have the following capabilities:

- Ability to list the current customers within a Queue.
  - This has been partially implemented.
- Make a request to the Qudini Mock API and display the list of customers along with their expected time.
  - A `<Customer />` component was created by the previous engineer which you can use to render the content.
- Fetch the profile image of the customer using the Gravatar Image request API (https://en.gravatar.com/site/implement/images).
- Ability to filter the list of returned customers using a text input component above the list.
- Ability to refresh the list of customers every `30 seconds`.
- Styling

We would like to see the following practised within the implementation:

- TDD / BDD
- Test coverage applied where needed.
- Some form of state management.

You’re free to use any 3rd part library or framework if you can justify the need.

## Submition

The completed project should be shared via a public `Github` repo.
