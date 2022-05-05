import { View, Text, Button } from "react-native";
import loginWithFacebook from "../auth/facebook";
import { getAuth, signOut } from "firebase/auth";
import { storeHighScore } from "../highscore/rtdb";
import { FacebookSocialButton } from "react-native-social-buttons";
const HighscoresScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const onPressLoginWithFacebook = () => loginWithFacebook();
  const onPressSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };
  return (
    <View>
      {!user ? (
        <View>
          <FacebookSocialButton
            buttonViewStyle={{ alignSelf: "center" }}
            onPress={onPressLoginWithFacebook}
          ></FacebookSocialButton>
        </View>
      ) : (
        <View>
          <Text style={{ alignSelf: "center" }}>
            {user?.displayName + "<="}
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

export default HighscoresScreen;
