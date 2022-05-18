import { GoogleSocialButton } from "react-native-social-buttons";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/auth";

const GoogleLoginButton = ({
  buttonViewStyle,
  setUser,
  setDisabled,
  disabled,
}) => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "757230829578-3dq8g736piopuu5dn0hdo5slq38aeuu9.apps.googleusercontent.com",
  });
  const handlePress = () => {
    setDisabled(true);
    promptAsync().finally(() => {
      setDisabled(false);
    });
  };

  useEffect(() => {
    if (response?.type === "success") {
      // Build Firebase credential with the Google ID token.
      const { id_token } = response.params;

      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          setUser(auth.currentUser);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
  return (
    <GoogleSocialButton
      buttonViewStyle={buttonViewStyle}
      onPress={handlePress}
      disabled={disabled}
    />
  );
};

export default GoogleLoginButton;
