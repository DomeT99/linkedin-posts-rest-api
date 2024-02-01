const isBlankArray = (arr) => {
  if (arr.length === 0) {
    return true;
  }
  return false;
};
const isUndefined = (obj) => {
  if (obj === undefined) {
    return true;
  }
  return false;
};

module.exports = {
  isBlankArray,
  isUndefined,
};
