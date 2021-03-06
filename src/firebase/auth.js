import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  // NOTE: This API-key is not a secret, see https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public/37484053#37484053
  apiKey: "AIzaSyB4i87NzfL1Pk_V2UpD5FSe1vwWV3-LBNs",
  authDomain: "leaderboard-rn.firebaseapp.com",
  databaseURL: "https://leaderboard-rn-default-rtdb.firebaseio.com",
  projectId: "leaderboard-rn",
  storageBucket: "leaderboard-rn.appspot.com",
  messagingSenderId: "1014828410467",
  appId: "1:1014828410467:web:35d753c749c30ee2e77a56",
  measurementId: "G-8D8MHJ3FZT",
};
//Initialize Firebase Application with our config
initializeApp(firebaseConfig);

// Listen for authentication state to change.
onAuthStateChanged(getAuth(), (user) => {
  if (user != null) {
    console.log("We are authenticated now!");
    // console.log(user);
  }
});

export const auth = getAuth();
