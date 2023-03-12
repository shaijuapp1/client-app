import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Header, Segment } from "semantic-ui-react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { TableField } from "../../app/models/TableField";
import { Link, useNavigate, useParams } from "react-router-dom";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyDateInput from "../../app/common/form/MyDateInput";
import MyDropdownInput from "../../app/common/form/MyDropdownInput";
import { TableFideldTypes } from "../../app/common/options/TableFideldTypes";
import MySelectInput from "../../app/common/form/MySelectInput";
import MyCheckbox from "../../app/common/form/MyCheckbox";



export default observer(function TableFieldDetails() {
    const { TableFieldStore, TableNameStore } = useStore();
    const { loadItem, item, loading, updateItem, createItem, deleteItem } = TableFieldStore;
    const { id } = useParams();
    const navigate = useNavigate();

    const [TableField, setTableField] = useState<TableField>({
        id: '',
        tableId: '',
        title:'',
        filedType:'',
    });
    
    const validationSchema = Yup.object({
        title: Yup.string().required('The event title is required'),       
    });

    useEffect(() => {
             
        if(!TableNameStore.itemList.length){
            TableNameStore.loadItems()
        }

        if (id){
            loadItem(id).then(it =>{ 
                debugger;
                setTableField(it!)
            });
        } 
        
    }, [id, loadItem])

    function handleFormSubmit(TableField: TableField, action : any) {
        debugger
        if (TableField.id.length === 0) {
            let newTableField = {
                ...TableField
            };

            createItem(newTableField).then( (newID) => {
                action.setSubmitting(false)
                navigate(`/TableFieldList`)
            } )
        } else {            
            updateItem(TableField).then(() => {
                action.setSubmitting(false)
                navigate(`/TableFieldList`)
            })

        }
    }

    function handleDelete() {
        if (id) deleteItem(id).then(() => navigate('/TableFieldList/'))
    }

    if (TableNameStore.itemList.length > 0 && TableFieldStore.loadingInitial) return <LoadingComponent content='Loading TableField details' />

    return (
        <Segment clearing>
            <Header content='TableField Details' sub color='teal' />
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={TableField}
                onSubmit={(values, action) => handleFormSubmit(values, action)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        
                         <MyDropdownInput  label="Table" options={                            
                            TableNameStore.itemList?.map( ds => {
                                    return {
                                        key: ds.id,
                                        text: ds.title,
                                        value: ds.id
                                    }
                                })
                            }                             
                            name='tableId' placeholder='Table' />

                        <MyTextInput name='title' placeholder='Filed Name'  label="Filed Name" />

                        <MyDropdownInput  label="Table" options={TableFideldTypes}                             
                            name='filedType' placeholder='Filed Type' />

                        <MyCheckbox label="Required" name="required" />

                        
                        <ButtonGroup variant="contained"  aria-label="contained primary button group">
                            <Button disabled={ isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit' />                                                
                            <Button onClick={handleDelete} content='Delete' floated='right' type='button' />
                            <Button as={Link} to='/TableFieldList' floated='right' type='button' content='Cancel' /> 
                        </ButtonGroup>
                        
                    </Form>
                )}
            </Formik>
        </Segment>        
    )
})
