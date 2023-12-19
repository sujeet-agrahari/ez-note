import { readFromPath, writeToPath } from "./util/fileHelper.js";
import fuzzysort from 'fuzzysort';
import chalk from 'chalk';


async function addBroItem(broItem) {
  const data = await readFromPath();
  data.push(broItem)
  await writeToPath(data);
}

async function getBroItem(broItem) {
  const data = await readFromPath();
  const topHit =  fuzzysort.go(broItem, data)[0];
  if (!topHit) {
    return chalk.redBright('Nothing found bro!')
  }
  return chalk.greenBright(topHit.target)
}
export { addBroItem, getBroItem }