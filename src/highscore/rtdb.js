import { getDatabase, ref, onValue, set, get } from "firebase/database";

export const getAllHighScores = async () => {
  const reference = ref(db, "users/");
  return await get(reference);
};

export const storeHighScore = (user, score) => {
  console.log(user);
  if (user != null) {
    const db = getDatabase();
    console.log("hi");
    const reference = ref(db, "users/" + user.displayName);
    set(reference, {
      highscore: score,
    });
  }
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
