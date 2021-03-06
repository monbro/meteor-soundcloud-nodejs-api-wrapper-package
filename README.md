meteor-soundcloud-nodejs-api-wrapper-package
============================================

This is a package for the awesome full stack framework [meteorjs](https://www.meteor.com/).

The package provides an easy way to access and modify data according to your profile on soundcloud while using oauth. This soundcloud API wrapper does not need any callback url or client / frontend side interaction when the username and password is provided. Instead of the credentials you could use an access token as well.

### Dependencies

* Meteor >1.0
* NPM package [soundcloud-nodejs-api-wrapper](https://www.npmjs.com/package/soundcloud-nodejs-api-wrapper) >0.2.4

### Installation in your meteor app

Use `meteor add monbro:soundcloud-nodejs-api-wrapper` to add the package to your meteor app

### Installation in your own meteor package

Simply add the following to your package.js file

``` js
Package.onUse(function(api) {
  api.use('monbro:soundcloud-nodejs-api-wrapper', 'server');
});

```

### Usage

The package will expose a variable `Soundcloud` which you can use as showed in the following example. In addition the NPM Package itself is exposed into the variable `NpmSoundcloud`. Use this one if the Meteor Adapter does not work for your needs.

All avialable API requests are listed in the [Soundcloud Docs](https://developers.soundcloud.com/docs/api/reference#connect).

### Initialise the client without an access token

``` js
if (Meteor.isServer) {
  // change the following credential to make this demo work
  Soundcloud.setConfig({
    client_id : "CLIENTID",
    client_secret : "CLIENTSECRET",
    username : 'USERNAME',
    password: 'PASSWORD'
  });

  var client = Soundcloud.getClient();

  // some api calls like the following examples would belong to here
}
```

### Initialise the client with an existing access token

``` js
if (Meteor.isServer) {
  // change the following credential to make this demo work
  Soundcloud.setConfig({
    client_id : "CLIENTID",
    client_secret : "CLIENTSECRET",
    access_token : "ACCESSTOKEN"
  });

  var client = Soundcloud.getClient();

  // some api calls like the following examples belong to here
}
```

#### Synchron Example for a API call after the client has been initialised
``` js
if (Meteor.isServer) {
  // note that there is no need to use Meteor.wrapAsync or Meteor.bindEnvironment, this is done for you when using this function
  var res = client.getSync('/me', {limit : 1});
  console.log(res);

  // and lets try to create a new empty playlist
  var jsonString = '{"playlist":{"title":"My brand new playlist"}}';
  var newPlaylistObject = client.postSync('/playlists', jsonString);
  console.log(newPlaylistObject);
}
```

#### Asynchron Example with callback for a API call after the client has been initialised
This is good to use if you have some single tasks to do. For example to get for a couple of tracks all the comments and save them somewhere.
``` js
if (Meteor.isServer) {
  // note that there is no need to use Meteor.wrapAsync or Meteor.bindEnvironment, this is done for you when using this function
  client.getAsync('/tracks/190455882', {limit : 1}, function(err, res) {
    if (err) console.error(err);
    console.log(res);
  });

  // and lets try to create a new empty playlist
  var jsonString = '{"playlist":{"title":"My brand new playlist"}}';
  var newPlaylistObject = client.postAsync('/playlists', jsonString , function(err, res) {
    if (err) console.error(err);
    console.log(res);
  }););
}
```