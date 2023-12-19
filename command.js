
import { Command } from  'commander';
const program = new Command();
import { addBroItem, getBroItem } from './service.js';
import chalk from 'chalk';

program.command('add')
  .description('Add a note')
  .argument('<string>', 'note to add')
  .action(async(str, options) => {
    await addBroItem(str);
    console.log(chalk.greenBright('Added it bro!'))
    process.exit(0);
  });

program.command('get')
  .description('Get a note')
  .argument('<string>', 'note to add')
  .action(async(str, options) => {
    const broItem = await getBroItem(str);
    console.log(broItem)
    process.exit(0);
  })

export { program };