# NgleafApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## OAuth (social sign-in)

Declare the provider client ids in the `LeafConfig` given to `LeafModule`. They must
match the ones configured on the Leaf back-end (`leaf.oauth.*.clientId`). A provider
left empty is simply not offered:

```ts
const leafConfig: LeafConfig = {
  // ...
  oauth: {
    google: { clientId: environment.OAUTH_GOOGLE_CLIENT_ID },
    apple: { clientId: environment.OAUTH_APPLE_CLIENT_ID, locale: 'en_US' },
  },
};
```

`LeafSocialLoginModule` then exposes `<leaf-social-login>`, which loads the provider
SDKs on demand and renders their official buttons:

```html
<leaf-social-login></leaf-social-login>
```

| Input                  | Default                            | Description                                              |
| ---------------------- | ---------------------------------- | -------------------------------------------------------- |
| `mode`                 | `login`                            | `login` signs in, `link` only emits `onCredential`        |
| `skipRedirect`         | `false`                            | Do not navigate after a successful sign-in                |
| `showGoogle`           | `true`                             | Hide the Google button when false                         |
| `showApple`            | `true`                             | Hide the Apple button when false                          |
| `showSeparator`        | `true`                             | Draw the "or continue with" separator                     |
| `separatorLabel`       | `leaf.social-login.separatorLabel` | Translation key of the separator label                    |
| `googleButtonOptions`  | icon / outline / large             | Forwarded to `google.accounts.id.renderButton`            |

Outputs: `onSuccess` (provider), `onFailure` (`{ provider, error }`) and `onCredential`
(the provider credential, emitted in `link` mode instead of signing in).

`AccountSettingsConnectedAccountsModule` provides the settings page letting a user list,
link and unlink their social identities. Unlinking is refused while it is the only way
left to sign in — an account created through a social sign-in has no password until the
user defines one through the "forgotten password" flow.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
