import { getDatabase, ref, onValue, set } from "firebase/database";

function storeHighScore(user, score) {
  if (user != null) {
    const db = getDatabase();
    const reference = ref(db, "users/" + user);
    set(reference, {
      highscore: score,
    });
  }
}

function setupHighscoreListener(user) {
  if (user != null) {
    const db = getDatabase();
    const reference = ref(db, "users/" + user);
    onValue(reference, (snapshot) => {
      s;
      const highscore = snapshot.val().highscore;
      console.log("New high score: " + highscore);
    });
  }
}
