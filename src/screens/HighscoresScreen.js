import { View, Text, Button } from "react-native";
import { useEffect } from "react";
import loginWithFacebook from "../highscore/init";
import { getAuth, signOut } from "firebase/auth";

const HighscoresScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return (
    <View>
      {!user ? (
        <Button
          style={{ alignSelf: "center" }}
          title={"Login"}
          onPress={loginWithFacebook}
        ></Button>
      ) : (
        <View>
          <Text style={{ alignSelf: "center" }}>
            {user?.displayName + "<="}
          </Text>
          <Button
            style={{ alignSelf: "center" }}
            title={"Logout"}
            onPress={() => {
              signOut(auth)
                .then(() => {
                  // signed out successfully
                })
                .catch((error) => {
                  // what now?
                });
            }}
          ></Button>
        </View>
      )}
    </View>
  );
};

export default HighscoresScreen;
