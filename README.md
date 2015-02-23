meteor-soundcloud-nodejs-api-wrapper-package
============================================

This is a package for the awesome full stack framework [meteorjs](https://www.meteor.com/).

The package provides an easy way to access data according to your profile on soundcloud while using oauth. This soundcloud API wrapper does not need any callback url or client / frontend side interaction.

### Dependencies

* Meteor >1.0
* NPM package [soundcloud-nodejs-api-wrapper](https://www.npmjs.com/package/soundcloud-nodejs-api-wrapper) >0.2.2

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

### Initialise the client without a access token

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

  client.get('/me', {limit : 1}, function(err, result) {
    if (err) console.error(err);
    console.log(result); // should show some data of your user
  });

}
```

### Initialise the client with a access token

``` js
if (Meteor.isServer) {
  // change the following credential to make this demo work
  Soundcloud.setConfig({
    client_id : "CLIENTID",
    client_secret : "CLIENTSECRET",
    access_token : "ACCESSTOKEN"
  });

  var client = Soundcloud.getClient();
}
```

#### Synchron Example for a API call after the client has been initialised
``` js
if (Meteor.isServer) {
  var res = client.getSync('/me', {limit : 1});
  console.log(res);
}
```

#### Asynchron Example with callback for a API call after the client has been initialised
This is good to use if you have some single tasks to do. For example to get for a couple of tracks all the comments and save them somewhere.
``` js
if (Meteor.isServer) {
  client.getAsync('/tracks/190455882', {limit : 1}, function(err, res) {
    if (err) console.error(err);
    console.log(res);
  });
}
```