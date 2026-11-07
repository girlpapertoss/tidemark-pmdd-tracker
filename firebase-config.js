/* Firebase settings for this copy of Tidemark.
   Paste the values from Firebase console > Project settings > General > Your apps > SDK setup and configuration > Config.
   These values identify your Firebase project. They are not passwords: who can read or write data is
   controlled by firestore.rules, which lets each signed-in person reach only their own log.
   While apiKey is empty, Tidemark runs in device-only mode and saves entries in the browser. */
window.TIDEMARK_FIREBASE = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
