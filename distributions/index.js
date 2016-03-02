'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _nodeNotifier = require('node-notifier');

var _nodeNotifier2 = _interopRequireDefault(_nodeNotifier);

var _through = require('through2');

var _through2 = _interopRequireDefault(_through);

var _tapParser = require('tap-parser');

var _tapParser2 = _interopRequireDefault(_tapParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_PASSED_OPTIONS = {
  title: 'Test passed.',
  icon: _path2.default.resolve(__dirname, '../passed.png'),
  sound: false
};

var DEFAULT_FAILED_OPTIONS = {
  title: 'Test failed!',
  icon: _path2.default.resolve(__dirname, '../failed.png'),
  sound: 'Basso'
};

var createReporter = function createReporter() {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var passed = _ref.passed;
  var failed = _ref.failed;

  var passedOptions = _extends({}, DEFAULT_PASSED_OPTIONS, passed);
  var failedOptions = _extends({}, DEFAULT_FAILED_OPTIONS, failed);
  var p = (0, _tapParser2.default)();
  var stream = (0, _through2.default)(function (chunk, enc, next) {
    this.push(chunk);
    next();
  });
  var errorOccuredAt = null;

  stream.pipe(p);

  p.on('assert', function (assert) {
    if (assert.ok) return;

    errorOccuredAt = assert.diag.at;
  });

  p.on('complete', function (result) {
    if (result.ok) {
      _nodeNotifier2.default.notify(_extends({
        message: result.pass + ' of ' + result.count + ' tests passed.'
      }, passedOptions));
    } else {
      _nodeNotifier2.default.notify(_extends({
        message: (result.fail || 0) + ' of ' + result.count + ' tests failed' + (errorOccuredAt ? ' at ' + errorOccuredAt : '')
      }, failedOptions));
    }
  });

  return stream;
};

exports.default = createReporter;
module.exports = exports['default'];