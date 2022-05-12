import {
  getDatabase,
  ref,
  onValue,
  set,
  get,
  remove,
  child,
} from "firebase/database";

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
    await set(userReference, data, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }
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
