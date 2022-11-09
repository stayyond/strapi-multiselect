import React from 'react';
import PropTypes from 'prop-types';
import { Stack } from '@strapi/design-system/Stack';
import { Field, FieldHint, FieldError, FieldLabel, FieldInput } from '@strapi/design-system/Field';
import { useIntl } from 'react-intl';
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios'
import pluginId from '../../pluginId';
const getTrad = (id) => `${pluginId}.${id}`;

export default class MultiselectInput extends React.Component {
    state = {
        list: []
    }

    componentDidMount() {
        let url = this.props.attribute.endpoint
        if (url) {
            axios.get(url)
            .then(res => {
                const list = res.data?.results;
                console.log('list', res.data.results)
                this.setState({ list });
            })
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
    let preselect = this.props.value ? JSON.parse(this.props.value) : ''
    let name = this.props.name
    let attribute = this.props.attribute
        
    const handleChange = (selectedList, selectedItem) => {
        console.log('changed', selectedList, selectedItem)
        this.props.onChange({ target: { name, value: JSON.stringify(selectedList), type: attribute.type } })
    }

    return (
      <Field
        name={this.props.name}
        id={this.props.name}
        // GenericInput calls formatMessage and returns a string for the error
        error={this.props.error}
        hint={this.props.description}
        >
             <Stack spacing={1}>
               <FieldLabel action={this.props.labelAction} required={this.props.required}>
                {this.props.intlLabel.defaultMessage}
                </FieldLabel> 
                <Multiselect
                    v-if={this.state.list}
                    options={this.state.list} // Options to display in the dropdown
                    displayValue="type" // Property name to display in the dropdown options
                    selectedValues={preselect}
                    onSelect={handleChange} // Function will trigger on select event
                    onRemove={handleChange} // Function will trigger on remove event
                />
                <FieldHint />
                <FieldError />
            </Stack> 
        </Field>
    )
    }
}

// const MultiselectInput = ({
//   attribute,
//   description,
//   disabled,
//   error,
//   intlLabel,
//   labelAction,
//   name,
//   onChange,
//   required,
//   value,
// }) => {
//     const { formatMessage } = useIntl();
//     let options = [{ name: 'Option 1', id: 1 }, { name: 'Option 2', id: 2 }];
//     let preselect = value ? JSON.parse(value) : ''

//     // https://flocc.space/api/v1/amenities

//     const handleChange = (selectedList, selectedItem) => {
//         console.log('changed', selectedList, selectedItem)
//         onChange({ target: { name, value: JSON.stringify(selectedList), type: attribute.type } })
//     }

//     componentDidMount(){
//     // axios.get(`https://jsonplaceholder.typicode.com/users`)
//     //   .then(res => {
//     //     const persons = res.data;
//     //     this.setState({ persons });
//     //   })
//         console.log('componentDidMount')
//   }

//     // let list = await axios.get('https://flocc.space/api/v1/amenities')
//     // console.log('list', list)

//     return (
//         <Field
//         name={name}
//         id={name}
//         // GenericInput calls formatMessage and returns a string for the error
//         error={error}
//         hint={description && formatMessage(description)}
//         >
//         <Stack spacing={1}>
//             <FieldLabel action={labelAction} required={required}>
//             {formatMessage(intlLabel)}
//             </FieldLabel>
//             <Multiselect
//                 options={options} // Options to display in the dropdown
//                 displayValue="name" // Property name to display in the dropdown options
//                 onSelect={handleChange} // Function will trigger on select event
//                 onRemove={handleChange} // Function will trigger on remove event
//                 selectedValues={preselect}
//             />
//             <FieldHint />
//             <FieldError />
//         </Stack>
//         </Field>
//   );
// };

// MultiselectInput.defaultProps = {
//   description: null,
//   disabled: false,
//   error: null,
//   labelAction: null,
//   required: false,
//   value: '',
// };

// MultiselectInput.propTypes = {
//   intlLabel: PropTypes.object.isRequired,
//   onChange: PropTypes.func.isRequired,
//   attribute: PropTypes.object.isRequired,
//   name: PropTypes.string.isRequired,
//   description: PropTypes.object,
//   disabled: PropTypes.bool,
//   error: PropTypes.string,
//   labelAction: PropTypes.object,
//   required: PropTypes.bool,
//   value: PropTypes.string,
// };

// export default MultiselectInput;