'use strict';

const {promisify} = require('es6-promisify');
const fs = require('fs');

const stat = promisify(fs.stat);
const writeFile = promisify(fs.writeFile);

const safeWrite = (filePath, cnt) => {
  return existsFile(filePath).then((has) => {
    if (!has) {
      return writeFile(filePath, cnt, 'utf-8');
    }
  });
};

const existsFile = (filePath) => {
  return new Promise((resolve) => {
    stat(filePath)
      .then((statObj) => {
        resolve(statObj.isFile());
      })
      .catch(() => {
        resolve(false);
      });
  });
};

module.exports = {
  safeWrite,
  existsFile
};
