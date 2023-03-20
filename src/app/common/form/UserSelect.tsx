import React, { useEffect, useState } from 'react';
import {useField} from "formik";
import {Dropdown, Form, Label, Select} from "semantic-ui-react";
import { useStore } from '../../stores/store';
import { DropDownList } from '../../models/DropDownList';

interface Props {
    placeholder: string;
    name: string;
    options: any;
    label?: string;
    multiple?:boolean;
    showGroup?:boolean;
    
}


const userList:DropDownList[] = []

export default function UserSelect(props: Props) {
    const [field, meta, helpers] = useField(props.name);

    const { UserManagerStore, RoleMasterStore } = useStore();
    const { refreshAllUsers } = UserManagerStore;
    const { refreshAllRoles } = RoleMasterStore;

    // const [UserList, setUserList] = useState<DropDownList[]>()    
    // function refreshUsers(searchQuery: string) {

    //     let userList:DropDownList[] = []

    //     refreshAllUsers().then( (itms) =>{

    //         searchQuery = searchQuery.toLocaleLowerCase()
    //         itms?.map( (itm) =>{
    //             if(itm.displayName.toLocaleLowerCase().includes(searchQuery)){
    //                 userList.push({
    //                     text :itm.displayName,
    //                     key :itm.username,
    //                     value : itm.username
    //                 })
    //             }                
    //         })
    //         debugger
    //         setUserList(userList)
    //     })
    // }


    useEffect(() => {
        refreshAllUsers().then((itms)=>{            
            itms?.forEach( (itm) => {
                userList.push({
                    text :"U:" + itm.displayName,
                    key :"U:" + itm.username,
                    value : "U:" + itm.username
                })
            })
            
            if(props.showGroup){
                refreshAllRoles().then((itms1)=>{   
                    itms1?.forEach( (itm) => {
                        userList.push({
                            text :"G:" + itm.name,
                            key : "G:" + itm.name,
                            value : "G:" + itm.name
                        })
                    })
                })
            }
        });       
    }, [refreshAllUsers])
    
  

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>          
            <Dropdown
                options={userList}
                value={field.value || null}

                // onSearchChange={(e, { searchQuery }) => {
                //     debugger;
                //     console.log(searchQuery)
                //     refreshUsers(searchQuery)
                // }}

                onChange={(e, d) => {
                    debugger;
                    helpers.setValue(d.value)}
                }
                onBlur={(e, d) => {
                    debugger;
                    helpers.setTouched(true)
                }}
                placeholder={props.placeholder}
                fluid
                search
                selection
                multiple={props.multiple}   
            />

            

  
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}
// https://react.semantic-ui.com/modules/dropdown/#types-search-selection