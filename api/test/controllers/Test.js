'use strict';

/**
 * Test.js controller
 *
 * @description: A set of functions called "actions" for managing `Test`.
 */

module.exports = {

  /**
   * Retrieve test records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.test.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a test record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    const data = await strapi.services.test.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an test record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.test.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an test record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.test.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an test record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.test.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
