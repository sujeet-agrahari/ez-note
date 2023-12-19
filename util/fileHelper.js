import fs from 'fs/promises';
const filePath = 'data.json';

async function  writeToPath(data) {
  try {
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
      await fs.writeFile(filePath, '[]', 'utf-8');
      return [];
    }

    console.error(`Error reading from ${filePath}: ${error.message}`);
    return null;
  }
}

export { writeToPath, readFromPath };