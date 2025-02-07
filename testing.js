//Generate a function to add two numbers
function add(a, b) {
  return a + b;
}

add(a, b);

//Generate an array of all the colors from the rainbow
const rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

// print out the colors in rainbow array
rainbow.forEach((color) => {
  console.log(color);
});

// generate a function that returns a random number between 1 and 10
function randomNum() {
  return Math.floor(Math.random() * 10) + 1;
}


const userInput = "2 + 2"; // This would typically come from an untrusted source, such as user input

try {
    const result = eval(userInput); // Using eval on untrusted input is dangerous
    console.log(`The result is: ${result}`);
} catch (e) {
    console.error('Error evaluating input:', e);
}
