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

// *******************************
// Sort in decreasing order
// *******************************
let numArr = [5, 2, 1, -10, 8];

// console.log(
//   `Numbers in decreasing order:>> `,
//   numArr.sort((a, b) => b - a)
// );

// *******************************
//  Copy and sort array
// *******************************
// We have an array of strings arr. We’d like to have a sorted copy of it, but keep arr unmodified.
// Create a function copySorted(arr) that returns such a copy.

let strArr = ['HTML', 'JavaScript', 'CSS'];

const copySorted2 = arr => {
  return arr.slice().sort();
};

// performanceTest(copySorted(strArr));
// performanceTest(copySorted2(strArr));
// *******************************
//  Create an extendable calculator
// *******************************

// Create a constructor function Calculator that creates “extendable” calculator objects.
// The task consists of two parts.
// 1. Implement the method calculate(str) that takes a string like "1 + 2" in the format “NUMBER operator NUMBER” (space-delimited) and returns the result. Should understand plus + and minus -.
// 2. Then add the method addMethod(name, func) that teaches the calculator a new operation. It takes the operator name and the two-argument function func(a,b) that implements it.

function Calculator() {
  this.methods = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b
  };

  this.calculate = function (str) {
    let split = str.split(' '),
      a = +split[0],
      op = split[1],
      b = +split[2];

    if (!op || isNaN(a) || isNaN(b)) {
      return NaN;
    }
    return this.methods[op](a, b);
  };

  this.addMethod = function (name, func) {
    this.methods[name] = func;
  };
}

const myCalc = new Calculator();
myCalc.addMethod('*', (a, b) => a * b);
myCalc.addMethod('/', (a, b) => a / b);
myCalc.addMethod('**', (a, b) => a ** b);

// let powerCalc = new Calculator();

// let result = powerCalc.calculate('5 + 5');
// console.log(`5 + 5 = `, result);
// result = powerCalc.calculate('56 - 8');
// console.log(`56 - 8 = `, result);
// powerCalc.addMethod('*', (a, b) => a * b);
// powerCalc.addMethod('/', (a, b) => a / b);
// powerCalc.addMethod('**', (a, b) => a ** b);
// result = powerCalc.calculate('3 * 3');
// console.log(`3 * 3 = `, result);
// result = powerCalc.calculate('2 ** 2');
// console.log(`2 ** 2 = `, result);
// result = powerCalc.calculate('108 / 16');
// console.log(`108 / 16 = `, result);

// *******************************
//  Map to names
// *******************************

// You have an array of user objects, each one has user.name. Write the code that converts it into an array of names.

// let john = { name: 'John', age: 25 };
// let pete = { name: 'Pete', age: 30 };
// let mary = { name: 'Mary', age: 28 };

// let users = [john, pete, mary];
// let names = users.map(user => user.name);
// console.log(`names`, names);

// *******************************
//  Map to objects
// *******************************
// You have an array of user objects, each one has name, surname and id.
// Write the code to create another array from it, of objects with id and fullName, where fullName is generated from name and surname.

/*
let john = { name: 'John', surname: 'Smith', id: 1 };
let pete = { name: 'Pete', surname: 'Hunt', id: 2 };
let mary = { name: 'Mary', surname: 'Key', id: 3 };

let users = [john, pete, mary];

let usersMapped = users.map(user => ({
  fullName: user.name + ' ' + user.surname,
  id: user.id
}));

console.log(`userMapped`, usersMapped);
console.log(`userMapped`, usersMapped[1].fullName);
*/

// *******************************
//  Sort users by age
// *******************************
// Write the function sortByAge(users) that gets an array of objects with the age property and sorts them by age.

// let john = { name: 'John', age: 25 };
// let pete = { name: 'Pete', age: 30 };
// let mary = { name: 'Mary', age: 28 };

// let arrUsers = [pete, john, mary];

// const sortByAge = arr => {
//   arr.sort((user1, user2) => user1.age - user2.age);
// };
// sortByAge(arrUsers);
// console.log(`arrUsers[0]`, arrUsers[0]);
// console.log(`arrUsers[1]`, arrUsers[1]);
// console.log(`arrUsers[2]`, arrUsers[2]);
// *******************************
//  Shuffle an array
// *******************************
// Write the function shuffle(array) that shuffles (randomly reorders) elements of the array.
const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
    // console.log(`arr`, arr);
  }
};

let count = {};

for (let i = 0; i < 100000; i++) {
  let array = [1, 2, 3];

  shuffle(array);
  if (count[array.join('')]) {
    count[array.join('')]++;
  } else {
    count[array.join('')] = 1;
  }
}

// for (let key in count) {
//   console.log(`${key}: ${count[key]}`);
// }
// for (let i = 0; i < Object.keys(count).length; i++) {
//   let key = Object.keys(count)[i],
//     value = count[[key][i]];
//   console.log(`${i + 1}) ${key}: ${count[key]}`);
//   // console.log('log');
// }
// console.log(`count`, count);
// console.log(shuffle([1, 2, 3]));
// console.log(shuffle([1, 2, 3]));
// console.log(shuffle([1, 2, 3]));
// console.log(shuffle([1, 2, 3]));
// *******************************
// Get average age
// *******************************
// Write the function getAverageAge(users) that gets an array of objects with property age and returns the average age
// The formula for the average is (age1 + age2 + ... + ageN) / N.

// let john = { name: 'John', age: 25 };
// let john1 = { name: 'John', age: 23 };
// let pete = { name: 'Pete', age: 30 };
// let pete1 = { name: 'Pete', age: 35 };
// let mary = { name: 'Mary', age: 22 };
// let mary1 = { name: 'Mary', age: 50 };

// let usersArr = [john, pete, mary, john1, pete1, mary1];

// const getAverageAge = users => {
//   return users.reduce((acc, user) => acc + user.age, 0) / users.length;
// };

// console.log(getAverageAge(usersArr));
//  *******************************
//  Filter unique array members
//  *******************************
// Let arr be an array.
// Create a function unique(arr) that should return an array with unique items of arr.
// let strings = [
//   'Hare',
//   'Krishna',
//   'Hare',
//   'Krishna',
//   'Krishna',
//   'Krishna',
//   'Hare',
//   'Hare',
//   ':-O'
// ];
// const unique = arr => {
//   let uniqueItems = [];
//   for (let item of arr) {
//     !uniqueItems.includes(item) ? uniqueItems.push(item) : null;
//   }
//   return uniqueItems;
// };
// console.log(`unique items`, unique(strings));

// *******************************
// Create keyed object from array
// *******************************
// Let’s say we received an array of users in the form {id:..., name:..., age:... }.
// Create a function groupById(arr) that creates an object from it, with id as the key, and array items as values.

let users = [
  { id: 'john', name: 'John Smith', age: 20 },
  { id: 'ann', name: 'Ann Smith', age: 24 },
  { id: 'pete', name: 'Pete Peterson', age: 31 }
];
//  slower
const groupById = arr => {
  let groupedItems = {};
  arr.forEach(element => {
    groupedItems[element.id] = element;
  });
  return groupedItems;
};

// faster
const groupById1 = arr => {
  return arr.reduce((obj, value) => {
    obj[value.id] = value;
    return obj;
  }, {});
};
// console.log(`groupById(users)`, groupById(users));
performanceTest(groupById(users));
