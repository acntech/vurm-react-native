import { FacebookSocialButton } from "react-native-social-buttons";
import * as Facebook from "expo-auth-session/providers/facebook";
import { FacebookAuthProvider, signInWithCredential } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/auth";
import { ResponseType } from "expo-auth-session";
const FacebookLoginButton = ({
  buttonViewStyle,
  setUser,
  setDisabled,
  disabled,
}) => {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    responseType: ResponseType.Token,
    clientId: "498173242097723",
  });
  const handlePress = () => {
    setDisabled(true);
    promptAsync().finally(() => {
      setDisabled(false);
    });
  };

  useEffect(() => {
    if (response?.type === "success") {
      // Build Firebase credential with the Facebook access token.
      const { access_token } = response.params;

      const credential = FacebookAuthProvider.credential(access_token);
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
    <FacebookSocialButton
      buttonViewStyle={buttonViewStyle}
      onPress={handlePress}
      disabled={disabled}
    />
  );
};

export default FacebookLoginButton;
