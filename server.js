var packagename = 'soundcloud-nodejs-api-wrapper';

NpmSoundcloud = Npm.require(packagename);

Soundcloud = (function () {
  var   config,
        accessToken,
        sc,
        client;

  function setConfig(obj) {
    config = obj;

    // sett accessToken directly
    if(config.access_token) {
        accessToken = config.access_token;
    }
  }

  function getAccessToke() {
    return accessToken;
  }

  function getClient() {
    if(!client) {
        if(!accessToken) {
            fetchAccessToken();
        }
        client = sc.client({access_token : accessToken});
        extendClientObject();
    }

    return client;
  }

  function extendClientObject() {
    // add wrappers for GET
    client.getSync = Meteor.wrapAsync(client.get);
    client.getAsync = function(path, filters, callback) {
      var wrappedCallback = Meteor.bindEnvironment(callback);
      this.get(path, filters, wrappedCallback);
    }

    // add wrappers for POST
    client.postSync = Meteor.wrapAsync(client.post);
    client.postAsync = function(path, post_body, callback) {
      var wrappedCallback = Meteor.bindEnvironment(callback);
      this.post(path, post_body, wrappedCallback);
    }

    // add wrappers for PUT
    client.putSync = Meteor.wrapAsync(client.put);
    client.putAsync = function(path, post_body, callback) {
      var wrappedCallback = Meteor.bindEnvironment(callback);
      this.put(path, post_body, wrappedCallback);
    }

    // add wrappers for DELETE
    client.deleteSync = Meteor.wrapAsync(client.delete);
    client.deleteAsync = function(path, callback) {
      var wrappedCallback = Meteor.bindEnvironment(callback);
      this.delete(path, wrappedCallback);
    }

    // add wrappers for a generic REQUEST
    client.requestSync = Meteor.wrapAsync(client.request);
    client.requestAsync = function(method, path, post_body, filters, callback) {
      var wrappedCallback = Meteor.bindEnvironment(callback);
      this.request(method, path, post_body, filters, wrappedCallback);
    }
  }

  function fetchAccessToken() {
    sc = new NpmSoundcloud(config);
    var tokenClient = sc.client();

    tokenClient.exchangeTokenSync = Meteor.wrapAsync(tokenClient.exchange_token);
    accessToken = tokenClient.exchangeTokenSync();
  }

  return {
      setConfig: setConfig,
      getClient: getClient
  };
})();