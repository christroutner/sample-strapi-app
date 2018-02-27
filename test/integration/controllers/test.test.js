const request = require('co-supertest');
const rp = require('request-promise');

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

describe('Endpoint with request-promise', function() {
  describe('GET /test', function() {
    it('should return 200 status code, second test', async () => {
      let result = await rp(strapi.config.url);
      console.log(`result stringified: ${JSON.stringify(result,null,2)}`);
      result.expect(200);
      result.expect('Content-Type', /json/);
    });
  });
});
