import chalk from 'chalk';
import readline from 'readline';

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const clearTerminalLine = () => {
  readline.moveCursor(process.stdout, 0, 0);
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
};

export const writeNewLine = (text: string) => {
  terminal.prompt(true);
  terminal.write(text);
};

export const warn = (text: string) => {
  console.log(chalk.yellow(text));
};

export const error = (text: string) => {
  console.log(chalk.red(text));
};

export const success = (text: string) => {
  console.log(chalk.green(text));
};

export default terminal;
