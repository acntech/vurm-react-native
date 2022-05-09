import {
  getDatabase,
  ref,
  onValue,
  set,
  get,
  remove,
  child,
} from "firebase/database";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import { orderByChild, query } from "firebase/database";

const getReference = (path) => {
  try {
    const db = getDatabase();
    return ref(db, path);
  } catch (error) {
    console.log(error);
  }
};

export const getUsersReference = () => {
  return getReference("users/");
};

export const getUserReference = (user) => {
  return getReference("users/" + user.uid);
};

export const getUserData = (user) => {
  return get(getUserReference(user));
};

export const deleteUserData = (user) => {
  if (user != null) {
    remove(getUserReference(user));
  }
};

export const setUserData = async (user, data) => {
  if (user != null) {
    const userReference = getUserReference(user);
    const randomName = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      style: "capital",
      separator: "",
    }); // BigRedDonkey
    const augmented_data = { name: randomName, ...data };
    await set(userReference, augmented_data, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }
};

export const getUserRank = async (user, setCallback) => {
  const ref = query(getUsersReference(), orderByChild("score"));
  console.log(ref);
  get(ref).then((snapshot) => {
    let rank = Object.keys(snapshot.val()).length;
    snapshot.forEach((child) => {
      rank--;
      if (child.key == user.uid) {
        setCallback(rank);
        return;
      }
    });
  });
};

export const getUserProperty = async (
  user,
  propertyName,
  defaultValue,
  setCallback
) => {
  let property = null;
  if (user != null) {
    const db = getDatabase();
    const reference = ref(db, "users/");
    await get(child(reference, user.uid))
      .then((snapshot) => {
        if (snapshot.exists()) {
          property = snapshot.val()[propertyName];
        } else {
          property = defaultValue;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  setCallback(property);
  return property;
};

function setupHighscoreListener(user) {
  if (user != null) {
    const reference = getUserReference(user);
    onValue(reference, (snapshot) => {
      const highscore = snapshot.val().highscore;
      console.log("New high score: " + highscore);
    });
  }
}
