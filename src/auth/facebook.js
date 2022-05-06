// Import the functions you need from the SDKs you need
import { auth } from "./firebase";
import { FacebookAuthProvider, signInWithCredential } from "firebase/auth";
import * as Facebook from "expo-facebook";

async function loginWithFacebook(setUser) {
  const appId = "498173242097723";
  await Facebook.initializeAsync({ appId });

  const { type, token } = await Facebook.logInWithReadPermissionsAsync({
    permissions: ["public_profile"],
  });

  if (type === "success") {
    // Build Firebase credential with the Facebook access token.
    const credential = FacebookAuthProvider.credential(token);

    // Sign in with credential from the Facebook user.
    signInWithCredential(auth, credential)
      .then(() => setUser(auth.currentUser))
      .catch((error) => {
        console.log(error);
      });
  }
  // return auth;
}

export default loginWithFacebook;
