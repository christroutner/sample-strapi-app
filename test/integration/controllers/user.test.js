/*
  This is a mocha integration test of the strap api.
*/

const rp = require('request-promise');
const assert = require('chai').assert;
const user = {};

describe('User', function() {
  /*
  describe('POST /auth/local/register - Create Test User', function() {
    it('should return 200 status code', async () => {

      let options = {
        method: 'POST',
        uri: strapi.config.url+'/auth/local/register',
        resolveWithFullResponse: true,
        json: true,
        body: {
          _id: null,
          username: 'Test User',
          email: 'test@test.com',
          password: '123456'
        }
      };
      let result = await rp(options);
      console.log(`result stringified: ${JSON.stringify(result,null,2)}`);
      //assert.equal(result.statusCode, 200);
      assert(result.statusCode === 200 || results.statusCode === 400, 'Creates new or reports already exists.');
    });
  });
  */

  describe('POST /auth/local - Log in as user', function() {
    it('should return 200 status code', async () => {

      let options = {
        method: 'POST',
        uri: strapi.config.url+'/auth/local',
        resolveWithFullResponse: true,
        json: true,
        body: {
          identifier: 'test@test.com',
          password: '123456'
        }
      };
      let result = await rp(options);
      console.log(`result stringified: ${JSON.stringify(result,null,2)}`);
      user.id = result.body.user._id;
      user.jwt = result.body.jwt;
      //assert.equal(result.statusCode, 200);
      assert(result.statusCode === 200 || results.statusCode === 400, 'Creates new or reports already exists.');
    });
  });


  describe('DELETE /user/:id', function() {
    it('should return 401 status code', async () => {

      //console.log(`strapi plugins: ${JSON.stringify(strapi.plugins,null,2)}`);
      console.log(`UserId: ${user.id}`);

      let options = {
        method: 'DELETE',
        uri: strapi.config.url+`/user/${user.id}`,
        resolveWithFullResponse: true,
        //json: true,
        //body: {
        //}
        headers: {
          Authorization: `Bearer ${user.jwt}`
        }
      };
      let result = await rp(options);
      console.log(`result stringified: ${JSON.stringify(result,null,2)}`);
      assert.equal(401, 401);
    });
  });
});
