import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Header, Segment } from "semantic-ui-react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { ActionTrackerAuditLog } from "../../app/models/ActionTrackerAuditLog";
import { Link, useNavigate, useParams } from "react-router-dom";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyDateInput from "../../app/common/form/MyDateInput";



export default observer(function ActionTrackerAuditLogDetails() {
    const { ActionTrackerAuditLogStore } = useStore();
    const { loadItem, item, loading, updateItem, createItem, deleteItem } = ActionTrackerAuditLogStore;
    const { id } = useParams();
    const navigate = useNavigate();

    const [ActionTrackerAuditLog, setActionTrackerAuditLog] = useState<ActionTrackerAuditLog>({
        id: '',
        taskID: '',
        action: '',
        actionBy: '',
        actionTime: '',
        comment: '',
    });
    
    const validationSchema = Yup.object({
        title: Yup.string().required('The event title is required'),       
    });

    useEffect(() => {
             
        if (id){
            loadItem(id).then(it =>{ 
                debugger;
                setActionTrackerAuditLog(it!)
            });
        } 
        
    }, [id, loadItem])

    function handleFormSubmit(ActionTrackerAuditLog: ActionTrackerAuditLog, action : any) {
        debugger
        if (ActionTrackerAuditLog.id.length === 0) {
            let newActionTrackerAuditLog = {
                ...ActionTrackerAuditLog
            };

            createItem(newActionTrackerAuditLog).then( (newID) => {
                action.setSubmitting(false)
                navigate(`/ActionTrackerAuditLogDetails/${newID}`)
            } )
        } else {            
            updateItem(ActionTrackerAuditLog).then(() => {
                action.setSubmitting(false)
                navigate(`/ActionTrackerAuditLogDetails/${ActionTrackerAuditLog.id}`)
            })

        }
    }

    function handleDelete() {
        if (id) deleteItem(id).then(() => navigate('/ActionTrackerAuditLogList/'))
    }

    if (ActionTrackerAuditLogStore.loadingInitial) return <LoadingComponent content='Loading ActionTrackerAuditLog details' />

    return (
        <Segment clearing>
            <Header content='ActionTrackerAuditLog Details' sub color='teal' />
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={ActionTrackerAuditLog}
                onSubmit={(values, action) => handleFormSubmit(values, action)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <ButtonGroup variant="contained"  aria-label="contained primary button group">
                            <Button disabled={ isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit' />                                                
                            <Button onClick={handleDelete} content='Delete' floated='right' type='button' />
                            <Button as={Link} to='/ActionTrackerAuditLogList' floated='right' type='button' content='Cancel' /> 
                        </ButtonGroup>
                        
                    </Form>
                )}
            </Formik>
        </Segment>        
    )
})
