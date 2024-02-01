const fs = require("fs");

const handleFileSystem = (posts, path) => {
  if (_checkFile(path)) {
    _deleteFile(path, "File deleted!");
    _writeFile(path, JSON.stringify(posts));
  }
};

const _checkFile = (path) => fs.existsSync(path);
const _deleteFile = (path, message) =>
  fs.unlink(path, (err, data) => {
    if (err) {
      throw err;
    } else {
      console.log(message);
    }
  });
const _writeFile = (path, content) => fs.writeFileSync(path, content);

module.exports = { handleFileSystem };
