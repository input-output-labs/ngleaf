// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const USE_LOCAL = true;

export const environment = {
  production: false,
  serverWSBrokerUrl: USE_LOCAL
    ? "ws://localhost:8080/ws"
    : "wss://blank.io-labs.fr/ws",
  serverUrl: USE_LOCAL
    ? "http://localhost:8080/api"
    : "https://blank.io-labs.fr/api",
  API_KEY_PIXABAY: "21558043-ea93c1b6a6e88758325a9fcb2",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
