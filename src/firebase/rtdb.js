import { getDatabase, ref, set, get, remove, child } from "firebase/database";

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

export const extractDataFromUsersSnapshot = (usersSnapshot, userUid, topN) => {
  console.log("extract");
  let processedData = [];
  if (!usersSnapshot.hasChildren()) {
    return processedData;
  }
  let negRank = 0;
  let idx = 0;
  let prevScore = 0;
  let adjustedTopN = Object.keys(usersSnapshot.val()).length - topN - 1;

  usersSnapshot.forEach((child) => {
    const childValue = child.val();
    if (prevScore < childValue?.score) {
      negRank--;
      prevScore = childValue.score;
    }
    const youIndicator = child?.key == userUid ? " (You)" : "";
    childData = [
      negRank,
      childValue?.name + youIndicator,
      childValue?.score,
      child?.key,
    ];
    if (idx > adjustedTopN || child?.key == userUid) {
      processedData.push(childData);
    }
    idx++;
  });

  if (processedData.length > 0) {
    negRankIdx = 0;
    minNegRank = processedData[processedData.length - 1][negRankIdx];
    for (let i = 0; i < processedData.length; i++) {
      processedData[i][negRankIdx] += Math.abs(minNegRank) + 1;
    }
  }
  return processedData.reverse();
};
