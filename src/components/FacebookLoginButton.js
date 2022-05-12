import { FacebookSocialButton } from "react-native-social-buttons";
import { auth } from "../firebase/auth";
import { FacebookAuthProvider, signInWithCredential } from "firebase/auth";
import * as Facebook from "expo-facebook";

const FacebookLoginButton = ({
  buttonViewStyle,
  setUser,
  setLoginButtonDisabled,
  disabled,
}) => (
  <FacebookSocialButton
    buttonViewStyle={buttonViewStyle}
    onPress={() => {
      setLoginButtonDisabled(true);
      loginWithFacebook(setUser, setLoginButtonDisabled).then(
        setLoginButtonDisabled(false)
      );
    }}
    disabled={disabled}
  />
);

async function loginWithFacebook(setUser, setLoginButtonDisabled) {
  const appId = "498173242097723";
  await Facebook.initializeAsync({ appId });

  await setLoginButtonDisabled(true);
  const { type, token } = await Facebook.logInWithReadPermissionsAsync({
    permissions: ["public_profile"],
  });

  if (type === "success") {
    // Build Firebase credential with the Facebook access token.
    const credential = FacebookAuthProvider.credential(token);

    // Sign in with credential from the Facebook user.
    signInWithCredential(auth, credential)
      .then(() => {
        setUser(auth.currentUser);
        setLoginButtonDisabled(false);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    setLoginButtonDisabled(false);
  }

  // return auth;
}

export default FacebookLoginButton;
