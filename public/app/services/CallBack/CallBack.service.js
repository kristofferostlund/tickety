(function () {
'use strict'

angular.module('ticketyApp')
.factory('CallBack', ['$q', '$http', function ($q, $http) {

  var _statuses;
  var _reasonsToPromote;
  var _reasonsToDetract;

  var CALLBACK_OPTIONS_KEY = 'callbackOptions';

  var _options;

  /**
   * Gets the stored options from localStorage.
   *
   * @return {Object}
   */
  function getStoredOptions() {
    var _data = _.attempt(function () { return JSON.parse(localStorage.getItem(CALLBACK_OPTIONS_KEY)); });
    return _.isError(_data)
      ? {}
      : _data;
  }


  /**
   * Sets the stored options to localStorage.
   *
   * @param {Object} options
   * @return {Object}
   */
  function setStoredOptions(options) {
    var _data = !!options
      ? JSON.stringify(options)
      : null;

    localStorage.setItem(CALLBACK_OPTIONS_KEY, _data);
    return getStoredOptions();
  }

  function getOptions() {
    if (!_options) {
      _options = getStoredOptions();
    }

    return _options;
  }

  function setOptions(options) {
    _options = setStoredOptions(options);

    return _options;
  }

  return {

    /**
     * Updates the callBack object at *callBackId* with *calBackObj*.
     *
     * @param {Number} callBackId
     * @param {Object} callBackObj
     * @return {Promise} -> {Object}
     */
    set: function (callBackId, callBackObj) {
      return $q(function (resolve, reject) {
        $http.put('/api/callBacks/:id'.replace(':id', (!!callBackId ? callBackId : '')), callBackObj)
        .success(resolve)
        .error(reject);
      });
    },

    /**
     * Returns a promise of an array of call back statuses.
     * If there's a cached version, it is returned, otherwise the server is requested.
     *
     * @return {Promise} -> {Array}
     */
    getStatuses: function () {
      return $q(function (resolve, reject) {

        // Return cached version if it exists.
        if (_statuses) {
          return resolve(_statuses);
        }

        $http.get('/api/callBackStatus')
        .success(function (data) {
          _statuses = data;
          resolve(data);
        })
        .error(reject);
      });
    },

    /**
     * Returns a promise of an array of reasons to promote.
     * If there's a cached version, it is returned, otherwise the server is requested.
     *
     * @return {Promise} -> {Array}
     */
    getReasonsToPromote: function () {
      return $q(function (resolve, reject) {

        // Return cached version if it exists.
        if (_reasonsToPromote) {
          return resolve(_reasonsToPromote);
        }

        $http.get('/api/reasonToPromote')
        .success(function (data) {
          _reasonsToPromote = data;
          resolve(data);
        })
        .error(reject);
      });
    },

    /**
     * Returns a promise of an array of reasons to detract.
     * If there's a cached version, it is returned, otherwise the server is requested.
     *
     * @return {Promise} -> {Array}
     */
    getReasonsToDetract: function () {
      return $q(function (resolve, reject) {

        // Return cached version if it exists.
        if (_reasonsToDetract) {
          return resolve(_reasonsToDetract);
        }

        $http.get('/api/reasonToDetract')
        .success(function (data) {
          _reasonsToDetract = data;
          resolve(data);
        })
        .error(reject);
      });
    },

    setOptions: setOptions,
    getOptions: getOptions,
  };

}]);

})();

