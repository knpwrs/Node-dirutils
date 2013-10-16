var path = require('path');

// Setup dirutils
require('../');

describe('dirutils tests', function () {
  // Sandbox path
  var sandbox = path.join(__dirname, 'sandbox');
  // Ensure current working directory is the sandbox before each test
  beforeEach(function () {
    process.chdir(sandbox);
    // Reset stack
    process.dirs(true);
  });

  it('should define `pushdir` as a function', function () {
    expect(process.pushdir).to.be.a('Function');
  });

  it('should define `popdir` as a function', function () {
    expect(process.popdir).to.be.a('Function');
  });

  it('should define `dirs` as a function', function () {
    expect(process.dirs).to.be.a('Function');
  });

  it('should support standard push and pop', function () {
    expect(process.cwd()).to.equal(sandbox);
    ['a', 'b', 'c'].map(function (dir) {
      var stack = process.pushdir(dir);
      var current = stack[stack.length - 1];
      expect(current).to.equal(process.cwd());
      expect(path.basename(current)).to.equal(dir);
      return dir; // cheap chaining trick
    }).reverse().forEach(function (dir) {
      var stack = process.dirs();
      var current = stack[stack.length - 1];
      expect(current).to.equal(process.cwd());
      expect(path.basename(current)).to.equal(dir);
      process.popdir();
    });
  });

  it('should support pushing to a specific index', function () {
    var dirs = process.dirs();
    expect(dirs.length).to.equal(1);
    process.pushdir('a');
    expect(dirs.length).to.equal(2);
    process.pushdir(0);
    expect(dirs.length).to.equal(2);
    var actual = ['a', 'sandbox'];
    for (var i = 0; i < actual.length; i++) {
      expect(path.basename(dirs[i])).to.equal(actual[i]);
    }
  });

  it('should support popping a specific index', function () {
    var dirs = process.dirs();
    expect(dirs.length).to.equal(1);
    process.pushdir('a');
    expect(dirs.length).to.equal(2);
    process.popdir(0);
    expect(dirs.length).to.equal(1);
    expect(dirs[dirs.length - 1]).to.equal(process.cwd());
  });

  it('should return the directory stack, and reset if passed a truthy value', function () {
    var dirs = process.dirs();
    expect(dirs).to.be.an('Array');
    expect(dirs.length).to.equal(1);
    process.pushdir('a');
    expect(dirs.length).to.equal(2);
    var newDirs = process.dirs(true);
    expect(newDirs.length).to.equal(1);
    expect(newDirs).to.not.eql(dirs);
  });
});
