import { View, Text, Button, Alert } from "react-native";
import loginWithFacebook from "../auth/facebook";
import { getAuth, signOut } from "firebase/auth";
import { FacebookSocialButton } from "react-native-social-buttons";
import { useState } from "react";
import { deleteUserData } from "../highscore/rtdb";

export default Social = () => {
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
      .catch((error) => {
        Alert.alert("Failed to sign out", [
          {
            text: "OK",
          },
        ]);
      });
  };
  const onPressDeleteMyData = () => {
    Alert.alert(
      "Are you sure you wish to delete your data?",
      "This can't be undone",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            deleteUserData(auth.currentUser);
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View>
      {!user ? (
        <View>
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
          <Button
            style={{ alignSelf: "center" }}
            title={"Delete My Data"}
            color={"red"}
            onPress={onPressDeleteMyData}
          ></Button>
        </View>
      )}
    </View>
  );
};
