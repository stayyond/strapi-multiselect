import { prefixPluginTranslations } from "@strapi/helper-plugin";
// import pluginPkg from '../../package.json';
import pluginId from "./pluginId";
import MultiselectIcon from "./components/Multiselect/MultiselectIcon";

// const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.customFields.register({
      name: "select",
      pluginId: "multiselect", // the custom field is created by a multiselect plugin
      type: "json", // the selection will be stored as a json
      intlLabel: {
        id: "multiselect.select.label",
        defaultMessage: "Multiselect",
      },
      intlDescription: {
        id: "multiselect.select.description",
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
              Add a "type" string field
            */
            name: "options.type",
            intlLabel: {
              id: "multiselect.select.options.type.label",
              defaultMessage:
                "Type (amenities, keyHighlight, propertyStyle, bookableHighlight, bedSize, bookableView, bookableType)",
            },
            intlDescription: {
              id: "multiselect.select.options.type.description",
              defaultMessage:
                "Enter the type you wish to get the list of options from. \n Options are found on the lists page",
            },
            // description:
            //   "Enter the type you wish to get the list of options from. Options are: amenities, keyHighlight, propertyStyle, bookableHighlight, bedSize, bookableView, bookableType",
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
