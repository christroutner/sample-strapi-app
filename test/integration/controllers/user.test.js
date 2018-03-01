/*
  This is a mocha integration test of the strap api.
*/

const rp = require('request-promise');
const assert = require('chai').assert;
const user = {};

describe('User', function() {

  describe('POST /auth/local/register - Create Test User', function() {
    it('should create new user or report account already exists.', async () => {

      try {

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

        //console.log(`result stringified: ${JSON.stringify(result,null,2)}`);

        assert(result.statusCode, 200, 'Creates new user.');

      } catch(err) {

        if(err.statusCode === 400)
          assert(err.error.message, 'Email is already taken.', 'User account already created. Got expected response.');
        else {
          console.error('Error: ',err);
          console.log(`err stringified: ${JSON.stringify(err,null,2)}`);
        }
      }
    });
  });


  describe('POST /auth/local - Log in as test user', function() {
    it('Should log in existing user.', async () => {

      try {
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

        //console.log(`result stringified: ${JSON.stringify(result,null,2)}`);

        user.id = result.body.user._id;
        user.jwt = result.body.jwt;

        assert.equal(result.statusCode, 200, 'Successfully logged in test user.');

      } catch(err) {
        console.error('Error: ',err);
        console.log(`err stringified: ${JSON.stringify(err,null,2)}`);
      }
    });
  });


  describe('DELETE /user/:id - Delete Own Account', function() {
    it('should return 401 status code', async () => {

      try {
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

        assert.equal(0, 1, 'Unexpected result.');

      } catch(err) {
        if(err.statusCode === 401)
          assert.equal(err.statusCode, 401, 'User not allowed to delete their own account.');
        else {
          console.error('Error: ',err);
          console.log(`err stringified: ${JSON.stringify(err,null,2)}`);
        }
      }
    });
  });


});
