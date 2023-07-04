import React from "react";
import PropTypes from "prop-types";
import { Stack } from "@strapi/design-system/Stack";
import {
  Field,
  FieldHint,
  FieldError,
  FieldLabel,
  FieldInput,
} from "@strapi/design-system/Field";
import { useIntl } from "react-intl";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";
import pluginId from "../../pluginId";
const getTrad = (id) => `${pluginId}.${id}`;

export default class MultiselectInput extends React.Component {
  state = {
    list: [],
  };

  async componentDidMount() {
    let type = this.props.attribute?.options?.type;
    if (type) {
      // type is lists.list-with-gds-code so needs extra field
      let gds = ["bedSize", "bookableView", "bookableType"].includes(type)
        ? "gdsCode"
        : "";
      let query = `query {
                list {
                    data {
                        attributes {
                                ${type} (sort: "name:desc", pagination: { limit: 1000 }) {
                                    name
                                    id
                                    icon
                                    ${gds}
                                }
                            }
                        }
                    }
                }`;
      await axios({
        url: `https://admin.yond.site/graphql`,
        method: "post",
        proxy: false,
        data: {
          query: query,
        },
      })
        .then(({ data, status }) => {
          console.log(data);
          if (
            status == 200 &&
            data?.data?.list?.data?.attributes &&
            data?.data?.list?.data?.attributes[type]
          ) {
            let list = data.data.list.data.attributes[type];
            console.log(list);
            //   let list = null;
            //   if (res?.data?.attributes) {
            //     let obj = res.data.attributes;
            //     list = Object.keys(obj).find((key) => typeof value == array);
            //   } else if (res.data?.results) {
            //     list = res.data?.results;
            //   }
            this.setState({ list });
          }
        })
        .catch((e) => console.error("multiselect error", e));
    }
  }

  render() {
    // PROPS:
    // attribute,
    // description,
    // disabled,
    // error,
    // intlLabel,
    // labelAction,
    // name,
    // onChange,
    // required,
    // value,
    // const { formatMessage } = useIntl();
    let preselect = this.props.value ? JSON.parse(this.props.value) : "";
    let name = this.props.name;
    let attribute = this.props.attribute;

    const handleChange = (selectedList, selectedItem) => {
      console.log("changed", selectedList, selectedItem);
      this.props.onChange({
        target: {
          name,
          value: JSON.stringify(selectedList),
          type: attribute.type,
        },
      });
    };

    return (
      <Field
        name={this.props.name}
        id={this.props.name}
        // GenericInput calls formatMessage and returns a string for the error
        error={this.props.error}
        hint={this.props.description}
      >
        <Stack spacing={1}>
          <FieldLabel
            action={this.props.labelAction}
            required={this.props.required}
          >
            {this.props.intlLabel
              ? this.props.intlLabel.defaultMessage
              : "Field"}
          </FieldLabel>
          <Multiselect
            v-if={this.state && this.state.list && this.state.list.length > 0}
            options={this.state.list} // Options to display in the dropdown
            displayValue="name" // Property name to display in the dropdown options
            selectedValues={preselect}
            onSelect={handleChange} // Function will trigger on select event
            onRemove={handleChange} // Function will trigger on remove event
          />
          <FieldHint />
          <FieldError />
        </Stack>
      </Field>
    );
  }
}
