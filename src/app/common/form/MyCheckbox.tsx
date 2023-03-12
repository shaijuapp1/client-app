import React from 'react';
import {useField} from "formik";
import {Checkbox, Form, Label} from "semantic-ui-react";
import { debug } from 'console';

interface Props {    
    name: string;
    label?: string;
    type?: string;
}

export default function MyCheckbox(props: Props) {

    const [field, meta, helpers] = useField(props.name);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            {/* <label>{props.label}</label>            
            <input {...field} {...props}/> */}
            <Checkbox label={props.label}
                onChange={(e, d) => {
                    debugger;
                    helpers.setValue(d.checked)
                }}
                checked={field.value}
           
               
             />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}