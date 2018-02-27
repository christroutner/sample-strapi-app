const request = require('co-supertest');
const rp = require('request-promise');
//const chai = require('chai');
//let chaiHttp = require('chai-http');
const assert = require('chai').assert;
//const should = chai.should();

describe('MyEndpoint Controller Integration', function() {
  describe('GET /test', function() {
    it('should return 200 status code', function *() {
      yield request(strapi.config.url)
        .get('/test')
        .expect(200)
        .expect('Content-Type', /json/)
        .end();
    });
  });
});

//chai.use(chaiHttp);

describe('Endpoint with request-promise', function() {
  describe('GET /test', function() {
    it('should return 200 status code, second test', async () => {
      let options = {
        uri: strapi.config.url,
        resolveWithFullResponse: true
      };
      let result = await rp(options);
      console.log(`result stringified: ${JSON.stringify(result,null,2)}`);
      //result.expect(200);
      //result.expect('Content-Type', /json/);
      //assert.
      assert.equal(result.statusCode, 200);
    });
  });
});
