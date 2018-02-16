const request = require('co-supertest');

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
