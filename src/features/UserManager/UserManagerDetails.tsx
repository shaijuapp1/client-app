import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Header, Segment } from "semantic-ui-react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { UserManager } from "../../app/models/UserManager";
import { Link, useNavigate, useParams } from "react-router-dom";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyDateInput from "../../app/common/form/MyDateInput";



export default observer(function UserManagerDetails() {
    const { UserManagerStore } = useStore();
    const { loadItem, item, loading, updateItem, createItem, deleteItem } = UserManagerStore;
    const { id } = useParams();
    const navigate = useNavigate();

    const [UserManager, setUserManager] = useState<UserManager>({
        id: '',
        username: '',
        email: '',
        displayName: ''
    });
    
    const validationSchema = Yup.object({
        title: Yup.string().required('The event title is required'),       
    });

    useEffect(() => {
             
        if (id){
            loadItem(id).then(it =>{ 
                debugger;
                setUserManager(it!)
            });
        } 
        
    }, [id, loadItem])

    function handleFormSubmit(UserManager: UserManager, action : any) {
        debugger
        if (UserManager.id.length === 0) {
            let newUserManager = {
                ...UserManager
            };

            createItem(newUserManager).then( (newID) => {
                action.setSubmitting(false)
                navigate(`/UserManagerDetails/${newID}`)
            } )
        } else {            
            updateItem(UserManager).then(() => {
                action.setSubmitting(false)
                navigate(`/UserManagerDetails/${UserManager.id}`)
            })

        }
    }

    function handleDelete() {
        if (id) deleteItem(id).then(() => navigate('/UserManagerList/'))
    }

    if (UserManagerStore.loadingInitial) return <LoadingComponent content='Loading UserManager details' />

    return (
        <Segment clearing>
            <Header content='UserManager Details' sub color='teal' />
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={UserManager}
                onSubmit={(values, action) => handleFormSubmit(values, action)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder='Title' />
                        <ButtonGroup variant="contained"  aria-label="contained primary button group">
                            <Button disabled={ isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit' />                                                
                            <Button onClick={handleDelete} content='Delete' floated='right' type='button' />
                            <Button as={Link} to='/UserManagerList' floated='right' type='button' content='Cancel' /> 
                        </ButtonGroup>
                        
                    </Form>
                )}
            </Formik>
        </Segment>        
    )
})
