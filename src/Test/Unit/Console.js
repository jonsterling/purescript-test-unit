/* global exports */
"use strict";

// module Test.Unit.Console

exports.exit = function exit(rv) {
  return function() {
    try { process.exit(rv); } catch (e) {
      try { phantom.exit(rv); } catch (e) {}
    };
  };
};

var hasStderr;
try { hasStderr = !!process.stderr; } catch (e) { hasStderr = false; }
exports.hasStderr = hasStderr;

exports.consoleLog = function consoleLog(s) {
  return function() {
    console.log(s);
  };
};
exports.consoleError = function consoleError(s) {
  return function() {
    console.error(s);
  };
};
exports.savePos = function savePos() {
  process.stderr.write("\x1b[s");
};
exports.restorePos = function restorePos() {
  process.stderr.write("\x1b[u");
};
exports.eraseLine = function eraseLine() {
  process.stderr.write("\x1b[K");
};
exports.print = function print(s) {
  return function() {
    process.stderr.write("\x1b[33m" + s + "\x1b[0m");
  };
};
exports.printLabel = function printLabel(s) {
  return function() {
    process.stderr.write("\x1b[33;1m" + s + "\x1b[0m");
  };
};
exports.printFail = function printFail(s) {
  return function() {
    process.stderr.write("\x1b[31;1m" + s + "\x1b[0m");
  };
};
exports.printPass = function printPass(s) {
  return function() {
    process.stderr.write("\x1b[32m" + s + "\x1b[0m");
  };
};
