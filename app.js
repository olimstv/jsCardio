//  A maximal subarray
// The input is an array of numbers, e.g. arr = [1, -2, 3, 4, -9, 6].
// The task is: find the contiguous subarray of arr with the maximal sum of items.
// Write the function getMaxSubSum(arr) that will return that sum.

const getMaxSubSum = arr => {
  let partialSum = 0;
  let maxSum = 0;

  for (let i of arr) {
    partialSum += i;
    partialSum > 0 ? (maxSum = Math.max(partialSum, maxSum)) : (partialSum = 0);
  }
  return maxSum;
};

// console.log('maxSum:>> ', getMaxSubSum([-1, 2, 3, -9])); // 5
// console.log('maxSum:>> ', getMaxSubSum([-1, 2, 3, -9, 11])); // 11
// console.log('maxSum:>> ', getMaxSubSum([-2, -1, 1, 2])); // 3
// console.log('maxSum:>> ', getMaxSubSum([100, -9, 2, -3, 5])); // 100
// console.log('maxSum:>> ', getMaxSubSum([1, 2, 3])); // 6
// console.log('maxSum:>> ', getMaxSubSum([-1, -2, -3])); // 0

// ****************************************************************
// Translate border-left-width to borderLeftWidth (camelSize Task)
// ****************************************************************
// Write the function camelize(str) that changes dash-separated words like “my-short-string” into camel-cased “myShortString”.
// That is: removes all dashes, each word after dash becomes uppercased.
const longString =
  'border-left-width-border-left-width-border-left-width-border-left-width-border-left-width-border-left-width-border-left-width-border-left-width-border-left-width-border-left-width-border-left-width-border-left-width-border-left-width-border-left-width-border-left-width-border-left-width-border-left-width-border-left-width-border-left-width-border-left-width-border-left-width-border-left-width-border-left-width-border-left-width-border-left-width-border-left-width-border-left-width-border-left-width-border-left-width';

// performs longer
const camelize = str => {
  let splittedStr = str.split('-');
  console.log('splittedStr:', splittedStr);
  for (let i = 1; i < splittedStr.length; i++) {
    splittedStr[i] =
      splittedStr[i].charAt(0).toUpperCase() + splittedStr[i].slice(1);
  }
  return splittedStr.join('');
};

// performs Faster
const camelize2 = str => {
  return str
    .split('-')
    .map((el, idx) => {
      idx === 0 ? el : el[0].toUpperCase();
    })
    .join('');
};
console.time('myFunc');
camelize(longString);
console.timeEnd('myFunc');
console.time('hisFunc');
camelize2(longString);
console.timeEnd('hisFunc');
