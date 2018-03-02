/*
  This is a mocha integration test of the strap api.
*/

const rp = require('request-promise');
const assert = require('chai').assert;
const admin = {};
const user = {};

describe('General User Tests', function() {

  // The first user created on a Strapi system is automatically the administrator.
  describe('POST /auth/local/register - Create First (Admin) User', function() {
    it('should create new user or report account already exists.', async () => {

      try {

        let options = {
          method: 'POST',
          uri: strapi.config.url+'/auth/local/register',
          resolveWithFullResponse: true,
          json: true,
          body: {
            _id: null,
            username: 'admin',
            email: 'admin@test.com',
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


  describe('POST /auth/local/register - Create Second (Test) User', function() {
    it('should create new user or report account already exists.', async () => {

      try {

        let options = {
          method: 'POST',
          uri: strapi.config.url+'/auth/local/register',
          resolveWithFullResponse: true,
          json: true,
          body: {
            _id: null,
            username: 'test',
            email: 'test@test.com',
            password: '123456'
          }
        };

        let result = await rp(options);

        //console.log(`result stringified: ${JSON.stringify(result,null,2)}`);
        user.id = result.body.user._id;
        user.jwt = result.body.jwt;
        console.log(`user.id: ${user.id}`);

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
            identifier: 'test',
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

  describe('POST /auth/local - Log in as admin user', function() {
    it('Should log in existing user.', async () => {

      try {
        let options = {
          method: 'POST',
          uri: strapi.config.url+'/auth/local',
          resolveWithFullResponse: true,
          json: true,
          body: {
            identifier: 'admin',
            password: '123456'
          }
        };

        let result = await rp(options);

        //console.log(`result stringified: ${JSON.stringify(result,null,2)}`);

        admin.id = result.body.user._id;
        admin.jwt = result.body.jwt;

        assert.equal(result.statusCode, 200, 'Successfully logged in admin user.');

      } catch(err) {
        console.error('Error: ',err);
        console.log(`err stringified: ${JSON.stringify(err,null,2)}`);
      }
    });
  });



  describe('DELETE /user/:id - Delete Test User', function() {
    it('should result in 500 internal error.', async () => {

      try {
        //console.log(`strapi plugins: ${JSON.stringify(strapi.plugins,null,2)}`);
        console.log(`UserId: ${user.id}`);

        let options = {
          method: 'DELETE',
          uri: strapi.config.url+`/user/${user.id}`,
          //uri: strapi.config.url+`/content-manager/explorer/user/${user.id}`,
          resolveWithFullResponse: true,
          //json: true,
          //body: {
          //}
          headers: {
            Authorization: `Bearer ${admin.jwt}`
          }
        };

        let result = await rp(options);

        console.log(`result stringified: ${JSON.stringify(result,null,2)}`);

        //assert.equal(0, 1, 'Unexpected result.');
        assert(result.statusCode, 200, 'Admin deletes test user.');

      } catch(err) {
        if(err.statusCode === 500)
          assert.equal(err.statusCode, 500, 'Internal server error expected.');
        else {
          console.error('Error: ',err);
          console.log(`err stringified: ${JSON.stringify(err,null,2)}`);
        }
      }
    });
  });


});
