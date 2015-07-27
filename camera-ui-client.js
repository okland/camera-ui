/**
 * Helper function for uploading base 64 image to server.
 * @summary Take base 64 data and return blob of the given content type
 * @param b64Data
 * @param contentType
 * @param sliceSize
 * @returns {*}
 */
MeteorCameraUI.b64toBlob = function(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob;
  try {
    blob = new Blob(byteArrays, {type: contentType});
  }
  catch (e) {
    // TypeError old chrome and FF
    window.BlobBuilder = window.BlobBuilder ||
      window.WebKitBlobBuilder ||
      window.MozBlobBuilder ||
      window.MSBlobBuilder;
    if (e.name == 'TypeError' && window.BlobBuilder) {
      var bb = new BlobBuilder();
      bb.append(byteArrays);
      blob = bb.getBlob(contentType);
    }
    else if (e.name == "InvalidStateError") {
      // InvalidStateError (tested on FF13 WinXP)
      blob = new Blob(byteArrays, {type: contentType});
    }
    else {
      // We're screwed, blob constructor unsupported entirely
      console.error('b64toBlob: blob constructor unsupported entirely');
    }
  }
  return blob;
};

/**
 * @summary Just use regular MeteorCamera.getPicture method
 * @param {Object}   options  Options - Optional
 * @param {Number} options.height The minimum height of the image
 * @param {Number} options.width The minimum width of the image
 * @param {Number} options.quality [description]
 * @type {Function}
 */
MeteorCameraUI.getPictureNoUI = MeteorCamera.getPicture;

