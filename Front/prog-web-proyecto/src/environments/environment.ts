// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL: 'http://localhost:8000/api',
  firebase: {
    apiKey: "AIzaSyDJHXR2fbK5hARYDq6KUtUAXa6GycxzSOI",
    authDomain: "prog-web-proyecto.firebaseapp.com",
    projectId: "prog-web-proyecto",
    storageBucket: "prog-web-proyecto.appspot.com",
    messagingSenderId: "1043220652675",
    appId: "1:1043220652675:web:c89588f0558767997bb1b6"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
