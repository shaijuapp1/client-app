import React from 'react';
import {useField} from "formik";
import {Dropdown, Form, Label, Select} from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    options: any;
    label?: string;
}

export default function MyDropdownInput(props: Props) {
    const [field, meta, helpers] = useField(props.name);

    const renderLabel = (option: any) => ({
        text: option.title,
        value: option.id,    
      })

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>          
            <Dropdown
                options={props.options}
                value={field.value || null}
                onChange={(e, d) => {helpers.setValue(d.value)}}
                onBlur={() => helpers.setTouched(true)}
                placeholder={props.placeholder}
                fluid
                search
                selection   
            />

  
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}
// https://react.semantic-ui.com/modules/dropdown/#types-search-selection