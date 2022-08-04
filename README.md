cloned from https://github.com/LucasAndrad/gapi-script-live-example

# React example for Google Login using gapi-script npm package

This example was created with create-react-app.

[Live example](https://deez-nutz-8675309.herokuapp.com/)

**This example only uses the login and logout features from Google gapi; it does not collect or store any of your data in third party applications.**

---

### Setup

Create your google project [here at this link](https://developers.google.com/identity/sign-in/web/sign-in) (choose the Web Browser option)
Required config:

There are only two sections that must be configured:

## 1. OAuth consent screen

- First, select user type 'external' and then choose the 'web browser' option.
- You might have to add the `openid` scope. Not 100% sure you need it, but if you have trouble at first, maybe try adding it.
- Then, add some test users. You can use a couple of your own email accounts.

## 2. Credentials

### Authorized JavaScript origins

- If running a published app, add the base uri of published app, i.e., `https://my-app.herokuapp.com`
- If running locally, add `http://localhost` and `http://localhost:{PORT}` (replace `{PORT}` with whatever port you are using.)
- You can add all of the above.

### Authorised redirect URIs

- `https://my-app.herokuapp.com`
- `https://my-app.herokuapp.com/api/auth/callback/google`

I highly recommend saving the json file they offer after creating credentials. It contains more than just your client ID and secret.

Then get your Client id and save it in your `.env` file, and name it `REACT_APP_GOOGLE_CLIENT_ID`.

Then run the commands below:

```script
yarn install

yarn start
```

or

```
npm i

npm start
```
