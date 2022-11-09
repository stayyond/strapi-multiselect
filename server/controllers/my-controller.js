'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('multiselect')
      .service('myService')
      .getWelcomeMessage();
  },
});
