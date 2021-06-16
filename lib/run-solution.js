const fs = require('fs');
const { exec } = require('child_process');

/**
 * @param {!string} filePath
 * @return {Promise}
 */
function exists(filePath) {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, d) => {
      if (err) {
        resolve(false);
      }

      resolve(true);
    });
  });
}

/**
 *
 */
function executeSolution(filePath) {
  return new Promise((resolve, reject) => {
    exec(`node "${filePath}"`, (err, stdout, stderr) => {
      if (err) {
        return reject(err);
      }

      return resolve(stdout);
    });
  });
}

/**
 * @param {string} solutionPath
 * @param {function} cb
 */
module.exports = function fn(solutionPath, cb) {
  exists(solutionPath).then((solutionExists) => {
    if (!solutionExists) {
      throw new Error(`The provided solution file ${solutionPath} does not exist.`);
    }

    return executeSolution(solutionPath);
  }).then((stdout) => {
    cb(null, stdout);
  }).catch(cb);
};
