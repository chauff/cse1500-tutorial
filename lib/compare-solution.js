require('colors');

const path = require('path');
const diff = require('diff');

const run = require(path.join(__dirname, 'run-solution'));

function generateDiff(solution, attempt) {
  const parts = diff.diffChars(solution, attempt);

  let result = '';

  parts.forEach((part) => {
    if (part.added) {
      result += part.value.bgRed;
    } else if (part.removed) {
      result += part.value.bgGreen;
    } else {
      result += part.value;
    }
  });

  return result;
}

module.exports = function fn(solution, attempt, cb) {
  run(solution, (err, solutionResult) => {
    if (err) {
      return cb(false);
    }

    run(attempt, (err, attemptResult) => {
      if (err && err.code !== 8) {
        return cb(false);
      }

      if (solutionResult === attemptResult) {
        return cb(true);
      }

      cb(false, {
        solution: solutionResult,
        attempt: err || attemptResult,
        diff: generateDiff(solutionResult, attemptResult),
      });
    });
  });
};
