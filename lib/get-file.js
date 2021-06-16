const fs = require('fs');

module.exports = function fn(filepath) {
  return fs.readFileSync(filepath, 'utf8')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
};
