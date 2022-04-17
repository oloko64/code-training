function myDisplayer(some) {
  console.log("myDisplayer", some);
}

function myDisplayerPlus(some) {
  console.log("myDisplayerPlus", some + 20);
}

function myCalculator(num1, num2, myCallback) {
  let sum = num1 + num2;
  myCallback(sum);
}

myCalculator(5, 5, myDisplayer);
myCalculator(5, 5, myDisplayerPlus);
