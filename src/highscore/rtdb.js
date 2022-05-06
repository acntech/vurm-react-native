import { async } from "@firebase/util";
import { getDatabase, ref, onValue, set, get, remove } from "firebase/database";

export const getAllHighScores = async () => {
  const reference = ref(db, "users/");
  return await get(reference);
};

export const deleteUserData = async (user) => {
  if (user != null) {
    const db = getDatabase();
    const reference = ref(db, "users/" + user.uid);
    await remove(reference);
  }
};

export const setUserHighscore = async (user, score) => {
  if (user != null) {
    const db = getDatabase();
    const reference = ref(db, "users/" + user.uid);
    await set(reference, {
      name: user.dispalyName,
      score: score,
    });
  }
};

export const getUserHighscore = async (user) => {
  if (user != null) {
    const db = getDatabase();
    const reference = ref(db, "users/" + user.uid);
    return await get(reference);
  }
};

export const processUsersSnapshot = (usersSnapshot) => {
  processedData = [];
  if (!usersSnapshot.hasChildren()) {
    return processedData;
  }
  usersSnapshot.forEach((child) => {
    const childValue = child.val();
    processedData.push([childValue?.name, childValue?.score]);
  });
  return processedData;
};

function setupHighscoreListener(user) {
  if (user != null) {
    const db = getDatabase();
    const reference = ref(db, "users/" + user);
    onValue(reference, (snapshot) => {
      const highscore = snapshot.val().highscore;
      console.log("New high score: " + highscore);
    });
  }
}
