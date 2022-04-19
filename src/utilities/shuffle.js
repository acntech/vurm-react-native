export default shuffle = (arr) => {
  let n = arr.length,
    tmp,
    j;
  for (let i = n - 1; i > 1; i--) {
    j = Math.floor(i * Math.random());
    tmp = arr[j];
    arr[j] = arr[i];
    arr[i] = tmp;
  }
};
