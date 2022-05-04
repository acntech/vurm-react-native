// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  FacebookAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import * as Facebook from "expo-facebook";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4i87NzfL1Pk_V2UpD5FSe1vwWV3-LBNs",
  authDomain: "leaderboard-rn.firebaseapp.com",
  databaseURL: "https://leaderboard-rn-default-rtdb.firebaseio.com",
  projectId: "leaderboard-rn",
  storageBucket: "leaderboard-rn.appspot.com",
  messagingSenderId: "1014828410467",
  appId: "1:1014828410467:web:35d753c749c30ee2e77a56",
  measurementId: "G-8D8MHJ3FZT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Listen for authentication state to change.
onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }

  // Do other things
});

async function loginWithFacebook() {
  const appId = "674426183529757";
  await Facebook.initializeAsync({ appId });

  const { type, token } = await Facebook.logInWithReadPermissionsAsync({
    permissions: ["public_profile"],
  });

  if (type === "success") {
    // Build Firebase credential with the Facebook access token.
    const credential = FacebookAuthProvider.credential(token);

    // Sign in with credential from the Facebook user.
    signInWithCredential(auth, credential).catch((error) => {
      console.log(error);
    });
  }
  // return auth;
}

export default loginWithFacebook;
