const user = { name: "Jeff", age: 34 };
const newUser = { name: "Aron", age: 44 };

const objectKeys = Object.keys(user);
const objectValues = Object.values(user);

console.log("objectKeys", objectKeys);
console.log("objectKeys", objectValues);
console.log("entries()", Object.entries(user));
console.log("is()", Object.is(newUser, user));

const target = { a: 1, b: 2 };
const source = { b: 4, c: 5, d: 6 };

const returnedTarget = Object.assign(target, source);

console.log(target);

const emptyObject = {};
const fullObject = { name: "Aron" };

console.log("Empty object", !Object.keys(emptyObject).length);
console.log("Empty object", !Object.keys(fullObject).length);

// Object manipulation

const car = [
  { model: "Ford", year: 2018 },
  { model: "Audi", year: 2017 },
  { model: "Mazda", year: 2016 },
];

const carEntries = Object.entries(car);

function restoreEntries(obj) {
    return obj.map(entry => entry[1])
}

console.log(carEntries);
console.log(restoreEntries(carEntries));
