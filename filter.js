import fs from 'fs';

async function filterAndSave(data, filePath) {
  try {
    // Filter the data to only keep the elements with userID not equal to "0"
    const filteredData = data.filter(element => element.userID !== "0");
    // Convert the filtered data to JSON and write it to the file
    await fs.promises.writeFile(filePath, JSON.stringify(filteredData));
  } catch (err) {
    console.error(err);
  }
}

filterAndSave(JSON.parse(fs.readFileSync('./friends.json', 'utf8')), './friends.json');

