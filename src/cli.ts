import * as readline from 'readline';
import { Calculator } from './calculator';

const calculator: Calculator = new Calculator();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu(): void {
  console.log('\nMead Calculator\n');
  console.log('1. Enter batch size');
  console.log('2. Enter ammount of honey');
  console.log('3. Enter additional sugars');
  console.log('4. Enter yeast potential (default 16%)');
  console.log('5. Calculate values');
  console.log('6. Exit');
  console.log('Enter your choice (1-6):');
}

async function handleUserInput(choice: string): Promise<void> {
  switch (choice.trim()) {
    case '1':
      await enterBatchSize();
      break;
    case '2':
      await enterHoneyAmmount();
      break;
    case '3':
      await enterAdditionalSugars();
      break;
    case '4':
      await enterYeastPotential();
      break;
    case '5':
      await calculateBatch();
      break;
    case '6':
      console.log('Exiting...');
      rl.close();
      return;
    default:
      console.log('Invalid choice, please choose 1-3.');
  }
  if (choice.trim() !== '6') {
    setTimeout(() => {
      showMenu();
      waitForUserInput();
    }, 500); // slight delay for better user experience
  }
}

function questionAsync(questionText: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(questionText, resolve);
  });
}

async function enterBatchSize(): Promise<void> {
  const batchSize = await questionAsync('Enter batch size in liters: ');
  calculator.setBatchSize(Number(batchSize));
}

async function enterHoneyAmmount(): Promise<void> {
  const honeyAmmount = await questionAsync('Enter honey ammount in kg: ');
  calculator.setHoneyAmmount(Number(honeyAmmount));
}

async function enterAdditionalSugars(): Promise<void> {
  const additionalSugars = await questionAsync('Enter additional sugars in g: ');
  calculator.setAdditionalSugars(Number(additionalSugars));
}

async function enterYeastPotential(): Promise<void> {
  const yeastPotential = await questionAsync('Enter yeast potential in %: ');
  calculator.setYeastPotential(Number(yeastPotential));
}

async function calculateBatch(): Promise<void> {
  console.log(calculator.printTable());
}

function waitForUserInput(): void {
  rl.once('line', handleUserInput);
}

// Start the app
showMenu();
waitForUserInput();
