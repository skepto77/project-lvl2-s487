import commander from 'commander';
const program = commander;
export default () => {
program 
    .version('0.0.1')
    .arguments('<firstConfig> <secondConfig>')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'Output format')
    .action(() => {
      console.log('hello');
    })
    .parse(process.argv)
  };
console.log('test');