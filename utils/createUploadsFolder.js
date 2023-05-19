const fs = require('fs');

const createUploadsFolder = () => {
  const folderPath = 'uploads/';
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
};

module.exports = { createUploadsFolder };