function SeriesSum(n) {
  let runningN = 1 + (n - 1) * 3;
  let ans = 1;
  if (n == 0) {
    return "0.00";
  }
  for (i = 0; i < n; i++) {
    if (n == 1) {
      ans = 1;
    } else {
      while (runningN > 3) {
        ans = ans + 1 / runningN;
        runningN = runningN - 3;
      }
    }
  }
  return ans.toFixed(2);
}
