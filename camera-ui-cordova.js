/******************** Private functions ****************************/

var devicePlatform = window && window.device && window.device.platform;

var isAndroidDevice = function () {
  return devicePlatform == 'Android';
};

var isIosDevice = function () {
  return devicePlatform == 'iOS';
};

/**
 * Check whether ios or android device and give the specific options for it.
 * @param {Object} options  Options - Optional
 * @param {Object} options.iosOptions {special options only for ios}
 * @param {Object} options.androidOptions {special options only for android}
 * @returns {{}}
 */
var getOptionsPerDevice = function (options) {
  options = options || {};
  if (isAndroidDevice() && options.androidOptions) {
    options = _.extend({}, options.androidOptions, options);
  } else if (isIosDevice() && options.iosOptions) {
    options = _.extend({}, options.iosOptions, options);
  }
  return options;
};

/**
 * @summary Create action sheet options setting for taking image
 * @param {Object} options  Options - Optional
 * @param {String} options.takeImage - Text of take image button
 * @param {String} options.imageLibrary - Text of image library button
 * @param {String} options.cancel - Text of cancel button
 * @returns {{buttonLabels: Array, androidEnableCancelButton: boolean, winphoneEnableCancelButton: boolean, addCancelButtonWithLabel: *}}
 */
var getActionsSheetOptions = function (options) {
  options = options || {};

  var buttonTexts = {
    takeImage: options.takeImage || 'Take Image',
    imageLibrary: options.imageLibrary || 'Image Library',
    cancel: options.cancel || 'Cancel'
  };
  return {
    'buttonLabels': [
      buttonTexts.takeImage,
      buttonTexts.imageLibrary
    ],
    'androidEnableCancelButton': true, // default false
    'winphoneEnableCancelButton': true, // default false
    'addCancelButtonWithLabel': buttonTexts.cancel
  };
};

var takePicture = function (options, usingPhotoLibrary, callback) {
  var pictureOptions = getOptionsPerDevice(options);
  if (usingPhotoLibrary) {
    pictureOptions.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
  }
  MeteorCamera.getPicture(pictureOptions, callback);
};

/******************** Public functions *****************************/

/**
 * @summary Get a picture from the device's default camera.
 *          Show ActionSheet to ask whether to take the image from camera or imageLibrary.
 *          Same as MeteorCamera.getPicture just allow to give
 *          special options using options.androidOptions or options.iosOptions.
 * @param {Object}   options  Options - Optional
 * @param {Number} options.height The minimum height of the image
 * @param {Number} options.width The minimum width of the image
 * @param {Number} options.quality [description]
 * @param {Object} options.buttonTexts {cancel:String, takeImage:String, imageLibrary:String}
 * @param {Object} options.iosOptions {special options only for ios}
 * @param {Object} options.androidOptions {special options only for android}
 * @param  {Function} callback A callback that is called with two arguments:
 * 1. error, an object that contains error.message and possibly other properties
 * depending on platform
 * 2. data, a Data URI string with the image encoded in JPEG format, ready to
 * use as the `src` attribute on an `<img />` tag.
 */
MeteorCameraUI.getPicture = function (options, callback) {
  // Checks whether device support actionsheet plugin
  if (window && window.plugins && window.plugins.actionsheet) {
    var actionSheetOptions = getActionsSheetOptions(options);
    window.plugins.actionsheet.show(actionSheetOptions, function (buttonIndex) {
      setTimeout(function () {
        var usingPhotoLibrary = false;
        // Like other Cordova plugins (prompt, confirm) the buttonIndex is 1-based (first button is index 1)
        if (buttonIndex) {
          // Image library button clicked
          if (buttonIndex === 2) {
            usingPhotoLibrary = true;
          } else if (buttonIndex === 3) {
            // Cancel button clicked
            callback();
            return;
          }
        }
        takePicture(options, usingPhotoLibrary, callback);
      }, 1);
    });
  } else {
    // Use default Meteor Camera
    MeteorCamera.getPicture(options, callback);
  }
};



