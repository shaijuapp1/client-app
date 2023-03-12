import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Header, Segment } from "semantic-ui-react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { AppConfigType } from "../../app/models/AppConfigType";
import { Link, useNavigate, useParams } from "react-router-dom";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyDateInput from "../../app/common/form/MyDateInput";



export default observer(function AppConfigTypeDetails() {
    const { AppConfigTypeStore } = useStore();
    const { loadItem, item, loading, updateItem, createItem, deleteItem } = AppConfigTypeStore;
    const { id } = useParams();
    const navigate = useNavigate();

    const [AppConfigType, setAppConfigType] = useState<AppConfigType>({
        id: '',
        title: '',
    });
    
    const validationSchema = Yup.object({
        title: Yup.string().required('The event title is required'),       
    });

    useEffect(() => {
             
        if (id){
            loadItem(id).then(it =>{ 
                debugger;
                setAppConfigType(it!)
            });
        } 
        
    }, [id, loadItem])

    function handleFormSubmit(AppConfigType: AppConfigType, action : any) {
        debugger
        if (AppConfigType.id.length === 0) {
            let newAppConfigType = {
                ...AppConfigType
            };

            createItem(newAppConfigType).then( (newID) => {
                action.setSubmitting(false)
                navigate(`/AppConfigTypeDetails/${newID}`)
            } )
        } else {            
            updateItem(AppConfigType).then(() => {
                action.setSubmitting(false)
                navigate(`/AppConfigTypeDetails/${AppConfigType.id}`)
            })

        }
    }

    function handleDelete() {
        if (id) deleteItem(id).then(() => navigate('/AppConfigTypeList/'))
    }

    if (AppConfigTypeStore.loadingInitial) return <LoadingComponent content='Loading AppConfigType details' />

    return (
        <Segment clearing>
            <Header content='AppConfigType Details' sub color='teal' />
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={AppConfigType}
                onSubmit={(values, action) => handleFormSubmit(values, action)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder='Title' />
                        <ButtonGroup variant="contained"  aria-label="contained primary button group">
                            <Button disabled={ isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit' />                                                
                            <Button onClick={handleDelete} content='Delete' floated='right' type='button' />
                            <Button as={Link} to='/AppConfigTypeList' floated='right' type='button' content='Cancel' /> 
                        </ButtonGroup>
                        
                    </Form>
                )}
            </Formik>
        </Segment>        
    )
})
