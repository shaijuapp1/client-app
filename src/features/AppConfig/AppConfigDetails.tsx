import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Header, Segment } from "semantic-ui-react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { AppConfig } from "../../app/models/AppConfig";
import { Link, useNavigate, useParams } from "react-router-dom";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyDateInput from "../../app/common/form/MyDateInput";
import MySelectInput from "../../app/common/form/MySelectInput";
import { categoryOptions } from "../../app/common/options/categoryOptions";
import { AppConfigType } from "../../app/models/AppConfigType";
import MyDropdownInput from "../../app/common/form/MyDropdownInput";



export default observer(function AppConfigDetails() {
    const { AppConfigStore, AppConfigTypeStore } = useStore();
    const { loadItem, item, loading, updateItem, createItem, deleteItem } = AppConfigStore;
   
    const { id } = useParams();
    const navigate = useNavigate();

    const [AppConfigType, setAppConfigType] = useState<AppConfigType[]>()

    const [AppConfig, setAppConfig] = useState<AppConfig>({
        id: '',
        title: '',
        configTypeId:'',
        val1 :''
    });
    
    const validationSchema = Yup.object({
        title: Yup.string().required('The event title is required'),       
    });

    useEffect(() => {

        if(!AppConfigTypeStore.itemList.length){
            AppConfigTypeStore.loadItems()
        }

        if (id){
            loadItem(id).then(it =>{ 
                //debugger;
                setAppConfig(it!)
            });
        }  

        // AppConfigTypeStore.loadItems().then( (tms) =>{                 
        //     setAppConfigType(tms)
        //     if (id){
        //         loadItem(id).then(it =>{ 
        //             //debugger;
        //             setAppConfig(it!)
        //         });
        //     }           
        // })        
    }, [id, loadItem])

    function handleFormSubmit(AppConfig: AppConfig, action : any) {
        debugger
        if (AppConfig.id.length === 0) {
            let newAppConfig = {
                ...AppConfig
            }; 

            createItem(newAppConfig).then( (newID) => {
                action.setSubmitting(false)
                navigate(`/AppConfigList`)
            } )
        } else {            
            updateItem(AppConfig).then(() => {
                action.setSubmitting(false)
                navigate(`/AppConfigList`)
            })

        }
    }

    function handleDelete() {
        if (id) deleteItem(id).then(() => navigate('/AppConfigList/'))
    }

    if (AppConfigStore.loadingInitial) return <LoadingComponent content='Loading AppConfig details' />

    return (
        <Segment clearing>
            <Header content='AppConfig Details' sub color='teal' />
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={AppConfig}
                onSubmit={(values, action) => handleFormSubmit(values, action)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder='Title' label="Title"  />
                        {/* <MyTextInput name='configTypeId' placeholder='configTypeId' /> */}

                        <MyDropdownInput  label="Config Type" options={                            
                            AppConfigTypeStore.itemList?.map( ds => {
                                    return {
                                        key: ds.id,
                                        text: ds.title + " - " + ds.id,
                                        value: ds.id
                                    }
                                })
                            }                             
                            name='configTypeId' placeholder='Category' />
                        <MyTextInput name='val1' placeholder='Value 1' label="Value 1"  />
                        <MyTextInput name='val2' placeholder='Value 2' label="Value 2"  />
                        <MyTextInput name='val3' placeholder='Value 3' label="Value 3"  />
                        <MyTextInput name='val4' placeholder='Value 4' label="Value 4"  />
                        <MyTextInput name='val5' placeholder='Value 5' label="Value 5"  />
                        <MyTextInput name='order' placeholder='Order' label="Order"  />

                        <ButtonGroup variant="contained"  aria-label="contained primary button group">
                            <Button disabled={ isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit' />                                                
                            <Button onClick={handleDelete} content='Delete' floated='right' type='button' />
                            <Button as={Link} to='/AppConfigList' floated='right' type='button' content='Cancel' /> 
                        </ButtonGroup>
                        
                    </Form>
                )}
            </Formik>
        </Segment>        
    )
})
