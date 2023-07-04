"use strict";

module.exports = ({ strapi }) => {
  // registeration phase
  strapi.customFields.register({
    name: "select",
    plugin: "multiselect",
    type: "json",
  });
};
