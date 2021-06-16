/* eslint-disable global-require */
const tutorials = require('workshopper-adventure')({
  title: 'CSE1500 Tutorials',
  appDir: __dirname,
  header: require('workshopper-adventure/default/header'),
  footer: require('./lib/footer'),
  menu: {
    bg: 'black',
    fg: 'red',
  },
});

const problem = require('./lib/problem');

tutorials.addAll(require('./menu.json').map((name) => ({
  name,
  fn() {
    const p = name.toLowerCase().replace(/\s/g, '-');
    const dir = require('path').join(__dirname, 'problems', p);
    return problem(dir);
  },
})));

module.exports = tutorials;
