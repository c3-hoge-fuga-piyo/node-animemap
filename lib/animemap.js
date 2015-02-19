'use strict';

var http = require('http');

var ANIMEMAP_API_BASE_URL = 'http://animemap.net/api/table';

function get(prefectureOfJapan, options) {
  options = options || {};
  var timeout = options.timeout || false;

  return new Promise(function(resolve, reject) {
    var url = ANIMEMAP_API_BASE_URL + '/' + prefectureOfJapan + '.json';

    var request = http.get(url, function(response) {
      var body = '';
      response.setEncoding('utf8');

      response.on('data', function(chunk) { body += chunk; });

      response.on('end', function() {
        var json;
        try {
          json = JSON.parse(body);
        } catch (e) {
          reject(e);
          return;
        }

        resolve(json);
      });
    });

    if (timeout) {
      request.on('timeout', function() { request.abort(); });
      request.setTimeout(timeout);
    }

    request.on('error', function(e) { reject(e); });
  });
}

module.exports = { get: get };
