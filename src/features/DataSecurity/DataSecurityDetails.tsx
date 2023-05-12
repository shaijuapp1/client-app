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
import UserSelect from "../../app/common/form/UserSelect";


export default observer(function DataSecurityDetails() {
    const { DataSecurityStore, TableNameStore } = useStore();
    const { loadItem, item, loading, updateItem, createItem, deleteItem } = DataSecurityStore;
    const { id } = useParams();
    const navigate = useNavigate();
    //const [accessList, setAccessList] = useState<string[]>([])

    const [DataSecurity, setDataSecurity] = useState<DataSecurity>({
        id: '',
        tableId: '',
        accessType:'',
        access:'',
        accessList : [],

        statusId:'',        
        filedId:'',
        userID:[],       
        userIdList:[],
        itemList: []
    });
    
    const validationSchema = Yup.object({
        tableId: Yup.string().required('The event title is required'),       
    });

    useEffect(() => {
        
        if(!TableNameStore.itemList.length){
            TableNameStore.loadItems()
        }

        if (id){
            loadItem(id).then(it =>{ 
                //debugger;               
                let accList:string[]= []                
                if(it?.access){
                    it.accessList = it?.access.split(";");
                }                               
                let userId:string[] = []                  
                // if(it) {
                //     it.userIdList = it?.userID
                //     // for(let i=0;i<it.userID.length;i++){
                //     //     userId.push(it.userID[i])
                //     // }
                //     // it.userIdList = userId;
                // }               
                setDataSecurity(it!)                       
            });
        }
        
    }, [id, loadItem])

    function handleFormSubmit(DataSecurity: DataSecurity, action : any) {
        debugger

        DataSecurity.access = DataSecurity.accessList.join(';');

        if (DataSecurity.id.length === 0) {
            let newDataSecurity = {
                ...DataSecurity
            };

            newDataSecurity.access = DataSecurity.accessList.join(';');

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

    if (  TableNameStore.itemList.length > 0 && DataSecurityStore.loadingInitial) return <LoadingComponent content='Loading DataSecurity details' />

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
                            TableNameStore.itemList?.map( ds => {
                                    return {
                                        key: ds.id,
                                        text: ds.title,
                                        value: ds.id
                                    }
                                })
                            }                         
                            name='tableId' placeholder='Table Name' /> 

                        <MyDropdownInput  label="Access Type" options={DataSecurityAccessType}                             
                            name='accessType' placeholder='Access Type' />

                        <MyDropdownInput  label="Access" options={DataSecurityAccess}                             
                            name='accessList' placeholder='Access'  multiple={true}/>

                        <UserSelect label="User/Group"                             
                            name='userID' placeholder='Access'  multiple={true} showGroup={true} />
                        
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
