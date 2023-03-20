import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Header, Segment } from "semantic-ui-react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { RoleMaster } from "../../app/models/RoleMaster";
import { Link, useNavigate, useParams } from "react-router-dom";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyDateInput from "../../app/common/form/MyDateInput";



export default observer(function RoleMasterDetails() {
    const { RoleMasterStore } = useStore();
    const { loadItem, item, loading, updateItem, createItem, deleteItem } = RoleMasterStore;
    const { id } = useParams();
    const navigate = useNavigate();

    const [RoleMaster, setRoleMaster] = useState<RoleMaster>({
        id: '',
        name: '',
    });
    
    const validationSchema = Yup.object({
        name: Yup.string().required('The event title is required'),       
    });

    useEffect(() => {
             
        if (id){
            loadItem(id).then(it =>{ 
                debugger;
                setRoleMaster(it!)
            });
        } 
        
    }, [id, loadItem])

    function handleFormSubmit(RoleMaster: RoleMaster, action : any) {
        debugger
        if (RoleMaster.id.length === 0) {
            let newRoleMaster = {
                ...RoleMaster
            };

            createItem(newRoleMaster).then( (newID) => {
                action.setSubmitting(false)
                navigate(`/RoleMasterList`)
            } )
        } else {            
            updateItem(RoleMaster).then(() => {
                action.setSubmitting(false)
                navigate(`/RoleMasterList`)
            })

        }
    }

    function handleDelete() {
        if (id) deleteItem(id).then(() => navigate('/RoleMasterList/'))
    }

    if (RoleMasterStore.loadingInitial) return <LoadingComponent content='Loading RoleMaster details' />

    return (
        <Segment clearing>
            <Header content='RoleMaster Details' sub color='teal' />
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={RoleMaster}
                onSubmit={(values, action) => handleFormSubmit(values, action)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='name' placeholder='Name' />
                        <ButtonGroup variant="contained"  aria-label="contained primary button group">
                            <Button disabled={ isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit' />                                                
                            <Button onClick={handleDelete} content='Delete' floated='right' type='button' />
                            <Button as={Link} to='/RoleMasterList' floated='right' type='button' content='Cancel' /> 
                        </ButtonGroup>
                        
                    </Form>
                )}
            </Formik>
        </Segment>        
    )
})
