import { View, Text, Button } from "react-native";
import loginWithFacebook from "../highscore/init";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";

const HighscoresScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [message, setMessage] = useState("");
  return (
    <View>
      {!user ? (
        <View>
          <Text>{message}</Text>
          <Button
            style={{ alignSelf: "center" }}
            title={"Login"}
            onPress={() => loginWithFacebook(setMessage)}
          ></Button>
        </View>
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
