var watch = require('nodewatch');
var util = require('util');
var exec = require('child_process').exec;

watch
  .add("./test", true)
  .add("./src", true)
  .onChange(function(file, prev, curr, action) {
    exec("make all", function(error, stdout, stderr) {
      util.print('stdout: ' + stdout);
      util.print('stderr: ' + stderr);

      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
});
