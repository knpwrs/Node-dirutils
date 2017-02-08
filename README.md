# Node dirutils
## Overview

[![Greenkeeper badge](https://badges.greenkeeper.io/knpwrs/Node-dirutils.svg)](https://greenkeeper.io/)
`dirutils` is a simple module for Node.JS which adds methods to the `process`
object which mimic the behavior of `pushd`, `popd`, and `dirs` in unix-like
systems. The methods provided by this module are `pushdir`, `popdir`, and
`dirs`. The first two methods are named to match the naming of `chdir` which
is provided by Node.JS.

## Usage
To use `dirutils` just install it with `npm install dirutils` and require it
with `require('dirutils')`. There is no need to save the result of
`require('dirutils')` to a variable as there are no exports from this module,
it adds methods directly to the `process` object.

### pushdir
The `pushdir` method changes to the directory passed as its first argument and
places that directory on top of the directory stack. For example:

    // Go into the `lib` directory relative to the current working directory.
    process.pushdir('lib');

    // Go to the absolute path `/bin` process.pushdir('/bin');

    // Go to the user's home directory process.pushdir(process.env.HOME);

The `pushdir` method can also accept a `number` argument (integers only, no
decimals) indicating an index in the stack to change the current working
directory to. The directory at that index is moved to the top of the stack.

`popdir` returns the current stack as a mutable array. This should only be
used for reference and even though you can change the array, it is highly
recommended that you do not.

### popdir
The `popdir` method removes the directory on the top of the stack and then
changes into the directory now on top of the stack. It also optionally accepts
an optional `number` argument indicating which index in the stack to remove --
the current working directory will not change when a directory is removed from
the stack in this fashion.

    // Continuing the example above (in the user's home directory) process. //
    Remove `/bin` from the directory stack. process.popdir(2); // Go into the
    `lib` directory: process.popdir(); // Go into the original starting
    directory: process.popdir();

`popdir` returns the current stack as a mutable array. This should only be
used for reference and even though you can change the array, it is highly
recommended that you do not.

### dirs
Takes an optional `boolean` argument indicating to reset the stack. If you
call `process.dirs(true)` the stack will be reinitialized with the current
working directory as the only value on the stack.

Regardless of if a boolean is passed in or not, `dirs` returns the current
stack as a mutable array. This should only be used for reference and even
though you can change the array, it is highly recommended that you do not.

## Running the Tests
To run the tests, you must have `testem` and `mocha` installed globally:

    npm i -g testem mocha

Once those are installed, you should run `npm install` from this project's
root directory. Once that is done you can run `testem` or `npm test` to run
the tests.

## License
**The MIT License**

Copyright (c) 2012 Kenneth Powers <mail@kenpowers.net>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
