import { shuffle } from './shuffle';

// Get Random Number up to a max number
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const createEquations = (count) => {
  // Randomly choose how many correct equations there should be
  const correctEquations = getRandomInt(count);
  console.log('correct equations:', correctEquations);
  // Set amount of wrong equations
  const wrongEquations = count - correctEquations;
  console.log('wrong equations:', wrongEquations);

  let equations = [];
  // Loop through, multiply random numbers up to 9, push to array
  for (let i = 0; i < correctEquations; i++) {
    const firstNumber = getRandomInt(9);
    const secondNumber = getRandomInt(9);
    console.log('firstNumber', firstNumber);
    console.log('secondNumber', secondNumber);
    const equationValue = firstNumber * secondNumber;
    const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
    console.log('equation', equation);

    equations.push({ value: equation, evaluated: true });

  }
  // Loop through, mess with the equation results, push to array
  for (let i = 0; i < wrongEquations; i++) {
    const wrongFormat = [];
    const firstNumber = getRandomInt(9);
    const secondNumber = getRandomInt(9);
    const equationValue = firstNumber * secondNumber;
    wrongFormat[0] = `${firstNumber} x ${secondNumber + 1} = ${equationValue}`;
    wrongFormat[1] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`;
    wrongFormat[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`;
    const formatChoice = getRandomInt(3);
    const equation = wrongFormat[formatChoice];

    equations.push({ value: equation, evaluated: false });

  }
  return shuffle(equations);
};