export const isEqualCoords = (firstCoord, secondCoord) => {
  if (firstCoord == null || secondCoord == null) {
    return false;
  }
  return firstCoord?.x == secondCoord?.x && firstCoord?.y == secondCoord?.y;
};

export const constainsCoord = (arr, coord) => {
  for (let toCompareCoord of arr) {
    if (isEqualCoords(coord, toCompareCoord)) {
      return true;
    }
  }
  return false;
};
