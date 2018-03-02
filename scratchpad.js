'use strict';

const rp = require('request-promise');

const LOCALHOST = 'http://localhost:1337';
let user = {};

async function explorePermissions() {
  try {
    let options = {
      method: 'POST',
      uri: LOCALHOST+'/auth/local',
      resolveWithFullResponse: true,
      json: true,
      body: {
        identifier: 'trout',
        password: 'test'
      }
    };

    let result = await rp(options);

    //console.log(`result stringified: ${JSON.stringify(result,null,2)}`);

    user.id = result.body.user._id;
    user.jwt = result.body.jwt;

    options = {
      method: 'GET',
      uri: LOCALHOST+'/users-permissions/roles/',
      resolveWithFullResponse: true,
      json: true,
      headers: {
        Authorization: `Bearer ${user.jwt}`
      }
    };

    result = await rp(options);

    console.log(`result stringified: ${JSON.stringify(result,null,2)}`);

  } catch(err) {
    console.error('Error: ',err);
    console.log(`err stringified: ${JSON.stringify(err,null,2)}`);
  }
}
explorePermissions();
