/*
 * JBoss, Home of Professional Open Source.
 * Copyright Red Hat, Inc., and individual contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

exports.defineAutoTests = function () {
  var deviceType = navigator.userAgent.match(/Android/i)[0];
  describe('navigator.externalstorage', function () {

    if (deviceType === 'Android') {
      it("should exist", function () {
        expect(navigator.externalstorage).toBeDefined();
      });
      it("should contain a enable function", function () {
        expect(navigator.externalstorage.enable).toBeDefined();
      });
      beforeEach(function (done) {
        var value;
        navigator.externalstorage.enable(function (result) {
          value = result;
          done();
        });
      });
      it("enable function should return a path", function (done) {
        navigator.externalstorage.enable(function (result) {
          expect(result).toBeDefined();
          expect(new String(result.path).length > 0).toBe(true);
          done();
        });
      });
    }
  });
};

exports.defineManualTests = function (contentEl, createActionButton) {
  var logMessage = function (message, color) {
    var log = document.getElementById('info');
    var logLine = document.createElement('div');
    if (color) {
      logLine.style.color = color;
    }
    logLine.innerHTML = message;
    log.appendChild(logLine);
  }

  var clearLog = function () {
    var log = document.getElementById('info');
    log.innerHTML = '';
  }

  var device_tests = '<h3>Press "External Storage" button to get location</h3>' +
    '<div id="output"></div>' +
    'Expected result: The path to the storage area on android';

  contentEl.innerHTML = '<div id="info"></div>' + device_tests;

  createActionButton('External Storage', function () {
    clearLog();
    navigator.externalstorage.enable(function (result) {
      logMessage(result.path);
    }, function (err) {
      logMessage(err, 'red');
    });
  }, "output");
};