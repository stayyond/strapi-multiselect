import { prefixPluginTranslations } from "@strapi/helper-plugin";
// import pluginPkg from '../../package.json';
import pluginId from "./pluginId";
import MultiselectIcon from "./components/Multiselect/MultiselectIcon";

// const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.customFields.register({
      name: "multiselect",
      pluginId: "multiselect", // the custom field is created by a multiselect plugin
      type: "json", // the selection will be stored as a json
      intlLabel: {
        id: "multiselect.multiselect.label",
        defaultMessage: "Multiselect",
      },
      intlDescription: {
        id: "multiselect.multiselect.description",
        defaultMessage: "Select any items",
      },
      icon: MultiselectIcon, // don't forget to create/import your icon component
      components: {
        Input: async () => import("./components/Multiselect/MultiselectInput"),
      },
      options: {
        // declare options here
        base: [
          /*
            Declare settings to be added to the "Base settings" section
            of the field in the Content-Type Builder
          */
          {
            /*
              Add a "endpoint" url field
            */
            name: "options.endpoint",
            intlLabel: {
              id: "multiselect.multiselect.options.endpoint.label",
              defaultMessage: "Endpoint Url",
            },
            intlDescription: {
              id: "multiselect.multiselect.options.endpoint.description",
              defaultMessage:
                "Enter the endpoint you wish to get the list of options from",
            },
            type: "string",
          },
        ],
      },
    });
  },

  bootstrap(app) {},
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
