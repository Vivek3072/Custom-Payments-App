module.exports = function generateRandomNum(lower, upper) {
  let num = Math.floor(Math.random() * (upper - lower + 1) + lower);
  return num;
};
