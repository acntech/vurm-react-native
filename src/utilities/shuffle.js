//Fischer-Yates algorithm
export default shuffle = (arr) => {
  let n = arr.length,
    j;
  for (let i = n - 1; i > 1; i--) {
    j = Math.floor(i * Math.random());
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};
