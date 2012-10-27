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
 *  to the pushed directory. Alternately takes a number argument  
 * @param {string} input The directory 
 * @param {number} input The index of the stack to change the current working
 *  directory to.
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
};