import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Header, Segment } from "semantic-ui-react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { TableName } from "../../app/models/TableName";
import { Link, useNavigate, useParams } from "react-router-dom";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyDateInput from "../../app/common/form/MyDateInput";
import MyDropdownInput from "../../app/common/form/MyDropdownInput";



export default observer(function TableNameDetails() {
    const { TableNameStore, AppConfigTypeStore } = useStore();
    const { loadItem, item, loading, updateItem, createItem, deleteItem } = TableNameStore;
    const { id } = useParams();
    const navigate = useNavigate();

    const [TableName, setTableName] = useState<TableName>({
        id: '',
        title: '',
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
                debugger;
                setTableName(it!)
            });
        } 
        
    }, [id, loadItem])

    function handleFormSubmit(TableName: TableName, action : any) {
        debugger
        if (TableName.id.length === 0) {
            let newTableName = {
                ...TableName
            }; 

            createItem(newTableName).then( (newID) => {
                action.setSubmitting(false)
                navigate(`/TableNameList`)
            } )
        } else {            
            updateItem(TableName).then(() => {
                action.setSubmitting(false)
                navigate(`/TableNameList`)
            })

        }
    }

    function handleDelete() {
        if (id) deleteItem(id).then(() => navigate('/TableNameList/'))
    }

    if (AppConfigTypeStore.itemList.length > 0 &&  TableNameStore.loadingInitial) return <LoadingComponent content='Loading TableName details' />

    return (
        <Segment clearing>
            <Header content='TableName Details' sub color='teal' />
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={TableName}
                onSubmit={(values, action) => handleFormSubmit(values, action)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder='Title' />

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

                        <ButtonGroup variant="contained"  aria-label="contained primary button group">
                            <Button disabled={ isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit' />                                                
                            <Button onClick={handleDelete} content='Delete' floated='right' type='button' />
                            <Button as={Link} to='/TableNameList' floated='right' type='button' content='Cancel' /> 
                        </ButtonGroup>                       
                    </Form>
                )}
            </Formik>
        </Segment>        
    )
})
