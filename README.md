## Deprecation Notice
This repository has been deprecated and is not being maintained. It should not be used. If you have any questions, please get in touch with the collaborators.

fh-cordova-plugin-external-storage
==================================

A cordova plugin to get the external storage path on Android.

## Run tests
1. Use your existing cordova app, or create a new one.
1. Add the plugin and the tests:

  ```bash
  cordova plugin add https://github.com/feedhenry/fh-cordova-plugin-external-storage.git
  cordova plugin add https://github.com/feedhenry/fh-cordova-plugin-external-storage.git#:/tests
  ```

1. Add this plugin:
  ```bash
  cordova plugin add http://git-wip-us.apache.org/repos/asf/cordova-plugin-test-framework.git
  ```
  
1. Change the start page in `config.xml` with `<content src="cdvtests/index.html" />` or navigate to cdvtests/index.html from within your app.
