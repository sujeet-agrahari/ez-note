#!/usr/bin/env node

import gradient from 'gradient-string';
import figlet from 'figlet';
import * as prompts from '@clack/prompts';
import chalk from 'chalk';
import { addBroItem, getBroItem } from './service.js';
import { program } from './command.js';

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  await figlet('EzNote', (err, data) => {
    console.log(gradient.pastel.multiline(data) + '\n');
  });

  console.log(
    'Made by: ' +
      '\u001b]8;;https://github.com/sujeet-agrahari\u0007Sujeet Agrahari\u001b]8;;\u0007'
  );

  console.log(`
    ${chalk.bgMagenta(chalk.white(' EzNote 📝 - Capturing thoughts with ease, effortlessly! '))}
  `);
}

async function askBro(question, action) {
  const broItem = await prompts.text({
    message: question,
    hint: 'some information',
    validate(value) {
      return value.length === 0 ? 'tell me bro!' : undefined;
    },
  });
  return broItem;
}

async function handleCancel(value) {
  if (prompts.isCancel(value)) {
    prompts.cancel('See you later!');
    process.exit(0);
  }
}

async function performAction(action, actionQuestion, actionHandler) {
  const item = await askBro(actionQuestion, action);
  await handleCancel(item);
  const result = await actionHandler(item);
  prompts.note(result || chalk.greenBright('added'));
}

async function main() {
  if (process.argv.slice(2).length) {
    program.parse();
  } else {
    await welcome();
    let askMore = true;
    while (askMore) {
      await prompts.intro(chalk.bgCyan(chalk.bold(chalk.black(' So... '))));

      const actionType = await prompts.select({
        message: "What's the matter?",
        options: [
          { value: 'add', label: 'Add something' },
          { value: 'get', label: 'Get something' },
          // { value: 'delete', label: 'Delete something', hint: 'oh no' },
        ],
      });

      await handleCancel(actionType);

      switch (actionType) {
        case 'add':
          await performAction('Add', 'What to add?', addBroItem);
          break;
        case 'get':
          await performAction('Get', 'What to get?', getBroItem);
          break;
      }
      askMore = await prompts.confirm({
        message: 'Anything else?',
      });
      await handleCancel(askMore);
    }
    await prompts.outro(
      chalk.bgCyan(chalk.bold(chalk.black('\n Take care... \n\n')))
    );
  }
}

main().catch((err) => console.log(err));
