import fs from 'fs/promises';
import path from 'path';
import os from 'os';

const fileName = '.data.json';
const homeDirectory = os.homedir();
const dataDirectory = path.join(homeDirectory, 'bhaiya');
const filePath = path.join(dataDirectory, fileName);

async function ensureDirectoryExists(directory) {
  try {
    await fs.access(directory);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // Directory doesn't exist, create it
      await fs.mkdir(directory, { recursive: true });
    } else {
      throw error;
    }
  }
}

async function writeToPath(data) {
  try {
    // Ensure the directory exists
    await ensureDirectoryExists(dataDirectory);

    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonData, 'utf-8');
  } catch (error) {
    console.error(`Error writing to ${filePath}: ${error.message}`);
  }
}

async function readFromPath() {
  try {
    const jsonData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(jsonData);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, create it with an empty array
      await ensureDirectoryExists(dataDirectory);
      await fs.writeFile(filePath, '[]', 'utf-8');
      return [];
    }

    console.error(`Error reading from ${filePath}: ${error.message}`);
    return null;
  }
}

export { writeToPath, readFromPath };