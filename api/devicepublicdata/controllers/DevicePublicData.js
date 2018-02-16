'use strict';

/**
 * DevicePublicData.js controller
 *
 * @description: A set of functions called "actions" for managing `DevicePublicData`.
 */

module.exports = {

  /**
   * Retrieve devicePublicData records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.devicePublicData.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a devicePublicData record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    const data = await strapi.services.devicePublicData.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an devicePublicData record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.devicePublicData.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an devicePublicData record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.devicePublicData.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an devicePublicData record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.devicePublicData.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
