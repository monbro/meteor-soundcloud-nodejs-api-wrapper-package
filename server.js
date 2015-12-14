var packagename = 'soundcloud-nodejs-api-wrapper';

NpmSoundcloud = Npm.require(packagename);

Soundcloud = {
  config: {},
  accessToken: '',
  sc: null,
  client: null,

  setConfig: function(obj) {
    this.config = obj;

    // sett accessToken directly
    if(this.config.access_token) {
        this.accessToken = this.config.access_token;
    }
  },

  getClient: function() {
    if(!this.client) {
        if(!this.accessToken) {
            this.fetchAccessToken();
        }
        this.client = this.sc.client({access_token : this.accessToken});
        this.extendClientObject();
    }

    return this.client;
  },

  getAccessToke: function() {
    return this.accessToken;
  },

  extendClientObject: function() {
    // add wrappers for GET
    this.client.getSync = Meteor.wrapAsync(this.client.get);
    this.client.getAsync = function(path, filters, callback) {
      var wrappedCallback = Meteor.bindEnvironment(callback);
      this.get(path, filters, wrappedCallback);
    }

    // add wrappers for POST
    this.client.postSync = Meteor.wrapAsync(this.client.post);
    this.client.postAsync = function(path, post_body, callback) {
      var wrappedCallback = Meteor.bindEnvironment(callback);
      this.post(path, post_body, wrappedCallback);
    }

    // add wrappers for PUT
    this.client.putSync = Meteor.wrapAsync(this.client.put);
    this.client.putAsync = function(path, post_body, callback) {
      var wrappedCallback = Meteor.bindEnvironment(callback);
      this.put(path, post_body, wrappedCallback);
    }

    // add wrappers for DELETE
    this.client.deleteSync = Meteor.wrapAsync(this.client.delete);
    this.client.deleteAsync = function(path, callback) {
      var wrappedCallback = Meteor.bindEnvironment(callback);
      this.delete(path, wrappedCallback);
    }

    // add wrappers for a generic REQUEST
    this.client.requestSync = Meteor.wrapAsync(this.client.request);
    this.client.requestAsync = function(method, path, post_body, filters, callback) {
      var wrappedCallback = Meteor.bindEnvironment(callback);
      this.request(method, path, post_body, filters, wrappedCallback);
    }
  },

  fetchAccessToken: function() {
    this.sc = new NpmSoundcloud(this.config);
    var tokenClient = this.sc.client();

    tokenClient.exchangeTokenSync = Meteor.wrapAsync(tokenClient.exchange_token);
    this.accessToken = tokenClient.exchangeTokenSync();
  }
};