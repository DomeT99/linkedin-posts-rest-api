const fs = require("fs");

const checkFile = (path) => fs.existsSync(path);

const deleteFile = (path, message) =>
  fs.unlink(path, (err, data) => {
    if (err) {
      throw err;
    } else {
      console.log(message);
    }
  });

const writeFile = (path, content) => fs.writeFileSync(path, content);

module.exports = { checkFile, deleteFile, writeFile };
