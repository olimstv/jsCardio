const performanceTest = (fn, iter) => {
  // for the performance testing
  console.time('function test');
  for (let i = 0; i < iter; i++) {
    fn;
  }
  console.timeEnd('function test');
};

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
// console.time('myFunc');
// camelize(longString);
// console.timeEnd('myFunc');
// console.time('hisFunc');
// camelize2(longString);
// console.timeEnd('hisFunc');

// *********************************
// Filter range
// *********************************
// Write a function filterRange(arr, a, b) that gets an array arr, looks for elements with values higher or equal to a and lower or equal to b and return a result as an array.
// The function should not modify the array. It should return the new array.

// slower variant
const filterRange = (arr, a, b) => {
  let filteredArray = arr.filter(el => {
    return el >= a && el <= b;
  });
  return filteredArray;
};

const filterRange2 = (arr, a, b) => {
  // added brackets around the expression for better readability
  return arr.filter(item => a <= item && item <= b);
};

let arr = [5, 3, 8, 1];

// console.log(`output`, filterRange(arr, 1, 4));
// console.time('hisFunc');
// filterRange2(arr);
// console.timeEnd('hisFunc');
// console.time('myFunc');
// filterRange(arr);
// console.timeEnd('myFunc');

// *********************************
// Filter range "in place"
// *********************************
// Write a function filterRangeInPlace(arr, a, b) that gets an array arr and removes from it all values except those that are between a and b. The test is: a ≤ arr[i] ≤ b.
// The function should only modify the array. It should not return anything.

//

// muFunc is slower
const filterRangeInPlace = (arr, a, b) => {
  for (let i = 0; i < arr.length; i++) {
    arr[i] >= a && arr[i] <= b ? arr[i] : arr.splice(i, 1);
  }
};

// hisFunc is faster
const filterRangeInPlace2 = (arr, a, b) => {
  for (let i = 0; i < arr.length; i++) {
    let val = arr[i];

    // remove if outside of the interval
    if (val < a || val > b) {
      arr.splice(i, 1);
      i--;
    }
  }
};

// console.log(`His function`);
// performanceTest(filterRangeInPlace2(arr, 1, 4), 100000);
// console.log(`My function`);
// performanceTest(filterRangeInPlace(arr, 1, 4), 100000);
