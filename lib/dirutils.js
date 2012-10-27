/**
 * dirutils.js 0.0.0
 * @author Kenneth Powers <mail@kenpowers.net>
 */

 /**
  * Require the path module.
  */
var path = require('path');

/**
 * Initialize directory stack with current working directory.
 */
var dirs = [process.cwd()];

/**
 * Pushes a directory on to the stack and changes the current working directory
 *  to the pushed directory. Alternately takes a number argument representing
 *  the index of the directory in the stack to switch to -- this new directory
 *  is then moved to the top of the stack.
 * @param {string} input The directory 
 * @param {number} input The index of the stack to change the current working
 *  directory to.
 * @return {Array} The current directory stack.
 * @throws {Error} Throws an {Error} if the operation fails for any reason.
 */
process.pushdir = function (input) {
  var type = typeof input;
  if (type === 'string') {
    if (input[0] !== '/') {
      input = path.join(process.cwd(), input);
    }
    process.chdir(input);
    dirs.push(input);
  } else if (type === 'number') {
    if (input >= dirs.length || input < 0) {
      throw new Error('Cannot switch to directoy index outside the range of the stack.');
    }
    var dir = dirs.splice(input, 1)[0];
    process.chdir(dir);
    dirs.push(dir);
  } else {
    throw new Error('Illegal argument. Please use a string or a number.');
  }
  return dirs;
};

/**
 * Pops the top directory off the stack and then changes the current working
 *  directory to the directory now on top of the stack. Alternately takes
 *  a number indicating the index of the directory in the stack to remove --
 *  the current working directory will not change in this case.
 * @param {number} input Optional index indicating which directory to remove
 *  from the stack.
 * @return {Array} The current directory stack.
 * @throws {Error} Throws an {Error} if the operation fails for any reason.
 */
process.popdir = function (input) {
  if (dirs.length === 1) {
    throw new Error('Cannot pop from directory stack if it will become empty');
  }
  var type = typeof input;
  if (type === 'undefined') {
    dirs.pop();
    process.chdir(dirs[dirs.length - 1]);
  } else if (type === 'number') {
    if (input >= dirs.length || input < 0) {
      throw new Error('Cannot pop directory index outside the range of the stack.');
    }
    dirs.splice(input, 1);
  } else {
    throw new Error('Illegal argument. Please use either a number or no arguments.');
  }
  return dirs;
};