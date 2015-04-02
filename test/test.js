var animemap = require('../lib/animemap');

require('should');

describe('animemap', function() {
  describe('get', function() {
    it('should return response', function(done) {
      animemap.get('tokyo')
        .then(function() { done(); })
    });
  });
});
