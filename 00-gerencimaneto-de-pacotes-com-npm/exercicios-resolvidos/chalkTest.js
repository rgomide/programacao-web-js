const { Chalk } = require('chalk');
const chalk = new Chalk();


console.log(chalk.red('Hello, world!'));
console.log(chalk.green('Hello, world!'));
console.log(chalk.blue('Hello, world!'));
console.log(chalk.yellow('Hello, world!'));
console.log(chalk.magenta('Hello, world!'));
console.log(chalk.cyan('Hello, world!'));
console.log(chalk.white('Hello, world!'));
console.log(chalk.black('Hello, world!'));
console.log(chalk.gray('Hello, world!'));
console.log(chalk.redBright('Hello, world!'));
console.log(chalk.greenBright('Hello, world!'));
console.log(chalk.blueBright('Hello, world!'));
console.log('--------------------------------');
console.log(`${chalk.red('D')}${chalk.green('e')}${chalk.blue('n')}${chalk.yellow('e')}${chalk.magenta('c')}${chalk.cyan('l')}${chalk.white('e')}${chalk.underline.bgBlue('y')}`);