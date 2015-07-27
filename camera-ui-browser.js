/**
 * @summary Get a picture from the device's default camera.
 *          Same as MeteorCamera.getPicture just allow to give
 *          special options using options.browserOptions.
 * @param  {Object}   options  Options
 * @param {Number} options.height The minimum height of the image
 * @param {Number} options.width The minimum width of the image
 * @param {Number} options.quality [description]
 * @param {Object} options.browserOptions [special options only for browser]
 * @param  {Function} callback A callback that is called with two arguments:
 * 1. error, an object that contains error.message and possibly other properties
 * depending on platform
 * 2. data, a Data URI string with the image encoded in JPEG format, ready to
 * use as the `src` attribute on an `<img />` tag.
 */
MeteorCameraUI.getPicture = function (options, callback) {
  // If browser options exists use them
  if (options && options.browserOptions) {
    options = _.extend({}, options.browserOptions, options);
  }
  MeteorCamera.getPicture(options, callback);
};
