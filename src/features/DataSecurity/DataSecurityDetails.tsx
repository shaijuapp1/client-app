import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Header, Segment } from "semantic-ui-react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { DataSecurity } from "../../app/models/DataSecurity";
import { Link, useNavigate, useParams } from "react-router-dom";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyDropdownInput from "../../app/common/form/MyDropdownInput";
import { DataSecurityAccessType } from "../../app/common/options/DataSecurityAccessType";
import { DataSecurityAccess } from "../../app/common/options/DataSecurityAccess";


export default observer(function DataSecurityDetails() {
    const { DataSecurityStore, AppConfigTypeStore } = useStore();
    const { loadItem, item, loading, updateItem, createItem, deleteItem } = DataSecurityStore;
    const { id } = useParams();
    const navigate = useNavigate();

    const [DataSecurity, setDataSecurity] = useState<DataSecurity>({
        id: '',
        tableId: '',
        statusId:'',
        asccessType:'',
        filedId:'',
        userId:'',
        access:'',
        itemList: []
    });
    
    const validationSchema = Yup.object({
        tableId: Yup.string().required('The event title is required'),       
    });

    useEffect(() => {
        if(!AppConfigTypeStore.itemList.length){
            AppConfigTypeStore.loadItems()
        }

        if (id){
            loadItem(id).then(it =>{ 
                debugger;
                setDataSecurity(it!)
            });
        } 
        
    }, [id, loadItem])

    function handleFormSubmit(DataSecurity: DataSecurity, action : any) {
        debugger
        if (DataSecurity.id.length === 0) {
            let newDataSecurity = {
                ...DataSecurity
            };

            createItem(newDataSecurity).then( (newID) => {
                action.setSubmitting(false)
                navigate(`/DataSecurityList`)
            } )
        } else {            
            updateItem(DataSecurity).then(() => {
                action.setSubmitting(false)
                navigate(`/DataSecurityList`)
            })

        }
    }

    function handleDelete() {
        if (id) deleteItem(id).then(() => navigate('/DataSecurityList/'))
    }

    if (AppConfigTypeStore.itemList.length > 0 && DataSecurityStore.loadingInitial) return <LoadingComponent content='Loading DataSecurity details' />

    return (
        <Segment clearing>
            <Header content='DataSecurity Details' sub color='teal' />
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={DataSecurity}
                onSubmit={(values, action) => handleFormSubmit(values, action)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        
                         <MyDropdownInput  label="Table Name" options={                            
                            AppConfigTypeStore.itemList?.map( ds => {
                                    return {
                                        key: ds.id,
                                        text: ds.title,
                                        value: ds.id
                                    }
                                })
                            }                             
                            name='tableId' placeholder='Table Name' />

                        <MyDropdownInput  label="Access Type" options={DataSecurityAccessType}                             
                            name='filedType' placeholder='Access Type' />

                        <MyDropdownInput  label="Access" options={DataSecurityAccess}                             
                            name='itemList' placeholder='Access'  multiple={true}/>

{/*
                        <MyDropdownInput  label="Status Config Name" options={                            
                            AppConfigTypeStore.itemList?.map( ds => {
                                    return {
                                        key: ds.id,
                                        text: ds.title,
                                        value: ds.id
                                    }
                                })
                            }                             
                            name='statusId' placeholder='Status Config Name' />



                         <MyDropdownInput  label="Table" options={                            
                            TableNameStore.itemList?.map( ds => {
                                    return {
                                        key: ds.id,
                                        text: ds.title,
                                        value: ds.id
                                    }
                                })
                            }                             
                            name='TableId' placeholder='Table' />

                        <MyDropdownInput  label="Table" options={                            
                            TableNameStore.itemList?.map( ds => {
                                    return {
                                        key: ds.id,
                                        text: ds.title,
                                        value: ds.id
                                    }
                                })
                            }                             
                            name='statusId' placeholder='Status' />
                            <MyTextInput name='title' placeholder='Title' />

                            */}

                        
                        <ButtonGroup variant="contained"  aria-label="contained primary button group">
                            <Button disabled={ isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit' />                                                
                            <Button onClick={handleDelete} content='Delete' floated='right' type='button' />
                            <Button as={Link} to='/DataSecurityList' floated='right' type='button' content='Cancel' /> 
                        </ButtonGroup>
                        
                    </Form>
                )}
            </Formik>
        </Segment>        
    )
})
