import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import MultiselectIcon from './components/Multiselect/MultiselectIcon';

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    // app.addMenuLink({
    //   to: `/plugins/${pluginId}`,
    //   icon: PluginIcon,
    //   intlLabel: {
    //     id: `${pluginId}.plugin.name`,
    //     defaultMessage: name,
    //   },
    //   Component: async () => {
    //     const component = await import(/* webpackChunkName: "[request]" */ './pages/App');

    //     return component;
    //   },
    //   permissions: [
    //     // Uncomment to set the permissions of the plugin here
    //     // {
    //     //   action: '', // the action name should be plugin::plugin-name.actionType
    //     //   subject: null,
    //     // },
    //   ],
    // });

    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
    app.customFields.register({
        name: "multiselect",
        pluginId: "multiselect", // the custom field is created by a color-picker plugin
        type: "json", // the color will be stored as a string
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
            Input: async () => import( /* webpackChunkName: "input-component" */ "../src/components/Multiselect/MultiselectInput"),
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
                    name: 'endpoint',
                    intlLabel: {
                        id: 'multiselect.multiselect.endpoint.label',
                        defaultMessage: 'Endpoint',
                    },
                    intlDescription: {
                        id: "multiselect.multiselect.endpoint.description",
                        defaultMessage: "Enter the endpoint you wish to get the list of options from",
                    },
                    type: 'string',
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
