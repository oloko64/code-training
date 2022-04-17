// map()

// Simple array map()
const numbers = [4, 9, 16, 25];
const newNumbers = numbers.map((element) => element.toString());

console.log("// Simple array map()", newNumbers);

// Simple object map()
const users = [
  { name: "John", email: "john@example.com" },
  { name: "Jane", email: "john@example.com" },
  { name: "Joe", email: "john@example.com" },
];

const newUsers = users.map((element) => element.name);
const remapUsers = users.map(({ name, email }) => {
  return {
    newName: name,
    newEmail: email,
  };
});

console.log("// Simple object map()", newUsers);
console.log("// Simple object map()", remapUsers);

// Array filter()
const ages = [32, 33, 16, 40];
const newAges = ages.filter((age) => age >= 18);

const nameAges = [
  { name: "John", age: 32 },
  { name: "Jane", age: 33 },
  { name: "Joe", age: 16 },
  { name: "Jack", age: 40 },
];
const newNameAges = nameAges.filter(person => person.age >= 18); // Same as: const newNameAges = nameAges.filter(({age}) => age >= 18);

console.log("// Array filter()", newAges);
console.log("// Array filter()", newNameAges);
