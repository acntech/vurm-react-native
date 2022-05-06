import {
  getDatabase,
  ref,
  onValue,
  set,
  get,
  remove,
  child,
} from "firebase/database";

export const getAllHighScores = () => {
  const reference = ref(db, "users/");
  return get(reference);
};

export const deleteUserData = (user) => {
  if (user != null) {
    const db = getDatabase();
    const reference = ref(db, "users/" + user.uid);
    remove(reference);
  }
};

export const setUserHighscore = async (user, score) => {
  if (user != null) {
    const db = getDatabase();
    const reference = ref(db, "users/" + user.uid);
    await set(reference, {
      name: user.displayName,
      score: score,
    });
  }
};

export const getUserScore = (user) => {
  const highscore = null;
  if (user != null) {
    const db = getDatabase();
    const reference = ref(db, "users/" + user.uid);
    get(child(reference, "score"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          highscore = snapshot.val();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return highscore;
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
