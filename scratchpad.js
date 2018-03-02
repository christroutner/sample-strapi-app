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
        identifier: 'admin',
        password: '123456'
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
//explorePermissions();


// Used to explore the details of a manually created role.
async function explorePermissions2() {
  try {
    let options = {
      method: 'POST',
      uri: LOCALHOST+'/auth/local',
      resolveWithFullResponse: true,
      json: true,
      body: {
        identifier: 'admin',
        password: '123456'
      }
    };

    let result = await rp(options);

    //console.log(`result stringified: ${JSON.stringify(result,null,2)}`);

    user.id = result.body.user._id;
    user.jwt = result.body.jwt;

    options = {
      method: 'GET',
      uri: LOCALHOST+'/users-permissions/roles/5a99d4927945f3234f8faeb2',
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
//explorePermissions2();


// Used to programmatically create a new permission/role.
async function createRole() {
  try {
    let options = {
      method: 'POST',
      uri: LOCALHOST+'/auth/local',
      resolveWithFullResponse: true,
      json: true,
      body: {
        identifier: 'admin',
        password: '123456'
      }
    };

    let result = await rp(options);

    //console.log(`result stringified: ${JSON.stringify(result,null,2)}`);

    user.id = result.body.user._id;
    user.jwt = result.body.jwt;

    const roleData = {
      name: 'NormalUser',
      description: 'Permissions for a normal user'
    };

    options = {
      method: 'POST',
      uri: LOCALHOST+'/users-permissions/roles/',
      resolveWithFullResponse: true,
      json: true,
      headers: {
        Authorization: `Bearer ${user.jwt}`
      },
      body: {
        roleData
      }
    };

    result = await rp(options);

    console.log(`result stringified: ${JSON.stringify(result,null,2)}`);

  } catch(err) {
    console.error('Error: ',err);
    console.log(`err stringified: ${JSON.stringify(err,null,2)}`);
  }
}
createRole();
