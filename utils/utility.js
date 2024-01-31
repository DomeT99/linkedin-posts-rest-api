const fs = require("fs");

const checkFile = (path) => fs.existsSync(path);

const deleteFile = (path, message) =>
  fs.unlink(path, () => console.log(message));

const writeFile = (path, content) => fs.writeFileSync(path, content);

module.exports = { checkFile, deleteFile, writeFile };
