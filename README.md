soundcloud-nodejs-api-wrapper
=============================

This package will provide a easy way to access sensible data according to your profile on soundcloud while using oauth. This soundcloud API wrapper does not need any callback url or client / frontend side interaction.

# Dependencies

* Meteor >1.0
* NPM package soundcloud-nodejs-api-wrapper >0.2.0

# Installation

Use `meteor add monbro:soundcloud-nodejs-api-wrapper` to add the package to your meteor app

# Usage

## Example using the wrapper somewhere in your meteor app

``` js
// change the following credential to make this demo work
var sc = new SC({
  client_id : "CLIENTID",
  client_secret : "CLIENTSECRET",
  username : 'USERNAME',
  password: 'PASSWORD'
});

var client = sc.client();

client.exchange_token(function(err, results) {

  var access_token = arguments[3].access_token;
  console.log('Our new access token "'+access_token+'" will expire in '+expires_in); // should show your new user token and when it will expire

  console.log('Full API auth response was:');
  console.log(arguments);

  // we need to create a new client object which will use the access token now
  var clientnew = sc.client({access_token : access_token});

  clientnew.get('/me', {limit : 1}, function(err, result) {
    if (err) console.error(err);
    console.log(result); // should show some data of your user
  });

});
```