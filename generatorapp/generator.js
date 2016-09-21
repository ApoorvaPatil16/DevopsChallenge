var highland = require('highland');

var doubled = highland([1, 2, 3, 4]).map(function(x) {
  return x * 2;
});
// doubled.toArray(function(y) {
//   console.log(y);
// })
console.log(highland.map(doubled, [1, 2, 3, 4]))
