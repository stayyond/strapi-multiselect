'use strict';

module.exports = ({ strapi }) => {
  // registeration phase
  strapi.customFields.register({
      name: 'multiselect',
      plugin: 'multiselect',
      type: 'json',
  });
};
