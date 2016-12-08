#!/usr/bin/env node
'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = { passed: {}, failed: {} };

var args = process.argv.slice(2);

for (var i = 0; i < args.length; i++) {
    var array = args[0].split('=');
    switch (array[0]) {
        case 'tag':
            var tag = array[1];
            options.passed.title = '[' + tag + '] Test passed.';
            options.failed.title = '[' + tag + '] Test failed! ';
            break;
        default:
            break;
    }
}

var reporter = (0, _index2.default)(options);

process.stdin.pipe(reporter).pipe(process.stdout);

process.on('exit', function (status) {
    if (status === 1 || reporter.isFailed) process.exit(1);
});