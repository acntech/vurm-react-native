import { View, Text, Button, TouchableWithoutFeedback } from "react-native";
import loginWithFacebook from "../auth/facebook";
import { getAuth, signOut } from "firebase/auth";
import { FacebookSocialButton } from "react-native-social-buttons";
import { useState } from "react";

export default LogInOutButton = () => {
  const auth = getAuth();
  const [user, setUser] = useState(auth.currentUser);
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(false);
  const onPressLoginWithFacebook = () => {
    loginWithFacebook(setUser, setLoginButtonDisabled);
  };
  const onPressSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(auth.currentUser);
      })
      .catch((error) => {});
  };

  return (
    <View>
      {!user ? (
        <View>
          <Text>{!loginButtonDisabled ? "enabled" : "disabled"}</Text>
          <FacebookSocialButton
            buttonViewStyle={{ alignSelf: "center" }}
            onPress={onPressLoginWithFacebook}
            disabled={loginButtonDisabled}
          ></FacebookSocialButton>
        </View>
      ) : (
        <View>
          <Text style={{ alignSelf: "center" }}>
            Signed in as "{user?.displayName}"
          </Text>
          <Button
            style={{ alignSelf: "center" }}
            title={"Sign Out"}
            onPress={onPressSignOut}
          ></Button>
        </View>
      )}
    </View>
  );
};
