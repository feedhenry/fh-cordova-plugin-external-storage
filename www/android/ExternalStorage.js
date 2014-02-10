/**
 * enables the sandbox storage location and returns the path.
 * @type {*}
 */
var exec = require("cordova/exec");
module.exports = {
  enable : function (success, fail){
      exec(success,fail,"ExternalStorage","enable",[]);
  }
};