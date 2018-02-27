/*
  This is a mocha integration test of the strap api.
*/

const rp = require('request-promise');
const assert = require('chai').assert;


describe('Endpoint with request-promise', function() {
  describe('GET /test', function() {
    it('should return 200 status code', async () => {
      let options = {
        uri: strapi.config.url,
        resolveWithFullResponse: true
      };
      let result = await rp(options);
      //console.log(`result stringified: ${JSON.stringify(result,null,2)}`);
      assert.equal(result.statusCode, 200);
    });
  });
});
