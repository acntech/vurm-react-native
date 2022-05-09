import { View, Text, Button, Alert, StyleSheet } from "react-native";
import loginWithFacebook from "../auth/facebook";
import { signOut } from "firebase/auth";
import { onValue, orderByChild, query } from "firebase/database";
import { auth } from "../auth/firebase";
import { FacebookSocialButton } from "react-native-social-buttons";
import { useState, useEffect } from "react";
import { deleteUserData, getUsersReference } from "../highscore/rtdb";
import {
  columnFlex,
  extractHighscoreDataFromUsersSnapshot,
} from "./HighscoreTable";
import HorizontalSeparator from "./HorizontalSeparator";
import { Row, Table } from "react-native-table-component";

export default Social = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(false);
  const [deleteMyDataButtonDisabled, setDeleteMyDataButtonDisabled] =
    useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const usersReferenceOrderedByScore = query(
      getUsersReference(),
      orderByChild("score")
    );
    if (user) {
      const unsubscribe = onValue(
        usersReferenceOrderedByScore,
        (usersSnapshot) => {
          const highscoreData = extractHighscoreDataFromUsersSnapshot(
            usersSnapshot,
            user.uid
          );
          !highscoreData.length
            ? setDeleteMyDataButtonDisabled(true)
            : setDeleteMyDataButtonDisabled(false);
          setData(...highscoreData);
        }
      );
      return unsubscribe;
    }
  }, []);

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
            setDeleteMyDataButtonDisabled(true);
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
          <HorizontalSeparator
            text={` ${user.displayName}  `}
          ></HorizontalSeparator>

          {/* <Text style={{ alignSelf: "center" }}>
            Signed in as "{user?.displayName}"
          </Text> */}
          <Table>
            <Row
              flexArr={columnFlex}
              data={data}
              textStyle={styles.text}
              style={{ backgroundColor: "oldlace" }}
            ></Row>
          </Table>
          <Button
            style={{ alignSelf: "center" }}
            title={"Sign Out"}
            onPress={onPressSignOut}
          ></Button>
          <Button
            style={{ alignSelf: "center" }}
            title={"Delete My Data"}
            color={"red"}
            disabled={deleteMyDataButtonDisabled}
            onPress={onPressDeleteMyData}
          ></Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // head: { height: 40, backgroundColor: "coral" },
  text: { margin: 6, color: "coral", textAlign: "center" },
  wrapper: { flexDirection: "row" },
});
