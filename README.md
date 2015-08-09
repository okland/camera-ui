# Meteor Camera UI Package

Add it to your [Meteor](http://meteor.com) app with `meteor add okland:camera-ui`. This package is mobile UI expanded version of [mdg:camera](https://atmospherejs.com/mdg/camera) package.

There are only four methods in this package :


### MeteorCameraUI.getPicture([options], callback)

Prompt the user to take a photo with their device and get the picture as a Data URI in JPEG format.
On mobile show actionsheet that asks the user whether he wants to take a picture or use image gallery.
This function expand the Meteor.Camera.getPicture so it allows to specify different options per ios, android or browser.

#### options

`options` is an optional argument that is an Object with the following possible keys:

- `width` An integer that specifies the minimum width of the returned photo.
- `height` An integer that specifies the minimum height of the returned photo.
- `quality` A number from 0 to 100 specifying the desired quality of JPEG encoding.

- `iosOptions` An Object - Special options only for ios {width:Int, height:Int, quality: ...}
- `androidOptions` An Object - Special options only for android {width:Int, height:Int, quality: ...}
- `browserOptions` An Object - Special options only for browser {width:Int, height:Int, quality: ...}

- `buttonTexts` An Object - Allow to override the actionsheet button texts {cancel:String, takeImage:String, imageLibrary:String}

#### callback(error, data)

`callback` is a required argument that is a function that takes two arguments:

- `error` A [Meteor.Error](http://docs.meteor.com/#meteor_error) with a platform-specific error message.
- `data` A base64-encoded data URI for the image taken by the camera. This parameter can be used directly in the 'src' attribute of an image tag.




### MeteorCameraUI.getPictureNoUI([options], callback)

Just to regular take photo function of MeteorCamera.
Prompt the user to take a photo with their device and get the picture as a Data URI in JPEG format.

#### options

`options` is an optional argument that is an Object with the following possible keys:

- `width` An integer that specifies the minimum width of the returned photo.
- `height` An integer that specifies the minimum height of the returned photo.
- `quality` A number from 0 to 100 specifying the desired quality of JPEG encoding.

#### callback(error, data)

`callback` is a required argument that is a function that takes two arguments:

- `error` A [Meteor.Error](http://docs.meteor.com/#meteor_error) with a platform-specific error message.
- `data` A base64-encoded data URI for the image taken by the camera. This parameter can be used directly in the 'src' attribute of an image tag.


### MeteorCameraUI.dataURIToBlob(dataURI)

An helper function to convert the dataURI of the image received from camera to blob with specific contentType.
Commonly used on cordova apps in order to upload the image that was taken.


### MeteorCameraUI.b64toBlob(b64Data, contentType, sliceSize)

An helper function to convert base64 data to blob with specific contentType.
Commonly used on cordova apps in order to upload the image that was taken.

Please note :
If you take the a base64-encoded data URI for the image taken by the camera, you should give this function only the part that follows the ','