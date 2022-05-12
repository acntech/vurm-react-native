import { GoogleSocialButton } from "react-native-social-buttons";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../firebase/auth";
const GoogleLoginButton = ({
  buttonViewStyle,
  setUser,
  setLoginButtonDisabled,
  disabled,
}) => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "757230829578-3dq8g736piopuu5dn0hdo5slq38aeuu9.apps.googleusercontent.com",
  });

  useEffect(() => {
    setLoginButtonDisabled(true);
    if (response?.type === "success") {
      // Build Firebase credential with the Facebook access token.
      const { id_token } = response.params;

      const credential = GoogleAuthProvider.credential(id_token);
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
  });
  return (
    <GoogleSocialButton
      buttonViewStyle={buttonViewStyle}
      onPress={() => {
        setLoginButtonDisabled(true);
        promptAsync().then(setLoginButtonDisabled(false));
      }}
      disabled={disabled}
    />
  );
};

export default GoogleLoginButton;
