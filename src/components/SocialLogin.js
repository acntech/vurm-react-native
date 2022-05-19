import { View, Text, Button, Alert, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { onValue, orderByChild, query } from "firebase/database";
import { auth } from "../firebase/auth";
import { useState, useEffect } from "react";
import {
  deleteUserData,
  getUsersReference,
  extractDataFromUsersSnapshot,
} from "../firebase/rtdb";
import FacebookLoginButton from "./FacebookLoginButton";
import GoogleLoginButton from "./GoogleLoginButton";

export default SocialLogin = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [deleteMyDataButtonDisabled, setDeleteMyDataButtonDisabled] =
    useState(true);

  const unsubscribeOnAuthStateChanged = onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  useEffect(() => {
    const usersReferenceOrderedByScore = query(
      getUsersReference(),
      orderByChild("score")
    );

    const unsubscribeUserData = onValue(
      usersReferenceOrderedByScore,
      (usersSnapshot) => {
        const userLeaderboardData = extractDataFromUsersSnapshot(
          usersSnapshot,
          user?.uid,
          0
        );
        !userLeaderboardData.length
          ? setDeleteMyDataButtonDisabled(true)
          : setDeleteMyDataButtonDisabled(false);
      }
    );
    return () => {
      unsubscribeUserData();
      unsubscribeOnAuthStateChanged();
    };
  }, [user]);

  const onPressSignOut = () => {
    signOut(auth).catch((error) => {
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
            deleteUserData(user);
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
          <FacebookLoginButton
            setUser={setUser}
            setDisabled={setLoginInProgress}
            buttonViewStyle={{ alignSelf: "center" }}
            disabled={loginInProgress}
          />
          <GoogleLoginButton
            setUser={setUser}
            setDisabled={setLoginInProgress}
            buttonViewStyle={{ alignSelf: "center" }}
            disabled={loginInProgress}
          ></GoogleLoginButton>
        </View>
      ) : (
        <View>
          {/* <HorizontalSeparator
            text={` ${user.displayName}  `}
          ></HorizontalSeparator> */}
          {/* 
          <Text style={{ alignSelf: "center" }}>
            Signed in as {user?.displayName}
          </Text> */}

          <Button
            style={{ alignSelf: "center" }}
            title={"Sign Out"}
            onPress={onPressSignOut}
          ></Button>
          {!deleteMyDataButtonDisabled ? (
            <Button
              style={{ alignSelf: "center" }}
              title={"Delete My Data"}
              color={"red"}
              onPress={onPressDeleteMyData}
            ></Button>
          ) : (
            <Text style={{ alignSelf: "center" }}>
              No data stored for {user.displayName}
            </Text>
          )}
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
