const levenshteinDistance = (a, b) => {
  var tmp;
  if (a.length === 0) {
    return b.length;
  }
  if (b.length === 0) {
    return a.length;
  }
  if (a.length > b.length) {
    tmp = a;
    a = b;
    b = tmp;
  }

  var i, j, res, alen = a.length, blen = b.length, row = Array(alen);
  for (i = 0; i <= alen; i++) {
    row[i] = i;
  }

  for (i = 1; i <= blen; i++) {
    res = i;
    for (j = 1; j <= alen; j++) {
      tmp = row[j - 1];
      row[j - 1] = res;
      res = b[i - 1] === a[j - 1] ? tmp : Math.min(tmp + 1, Math.min(res + 1, row[j] + 1));
    }
  }
  return res;
};

const sortByLevenshteinDistance = (value, a, b) => {
  const aLower = a.toLowerCase();
  const bLower = b.toLowerCase();
  if (aLower.startsWith(value) || bLower.startsWith(value)) {
    return -1;
  }
  if (aLower.endsWith(value) || bLower.endsWith(value)) {
    return 1;
  }

  const distance1 = levenshteinDistance(value, value.length, aLower, aLower.length);
  const distance2 = levenshteinDistance(value, value.length, bLower, bLower.length);

  return distance1 - distance2;
};
export default sortByLevenshteinDistance;