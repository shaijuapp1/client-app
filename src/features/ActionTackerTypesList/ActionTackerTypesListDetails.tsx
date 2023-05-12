import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Grid, Header, Segment, Table } from "semantic-ui-react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { format } from 'date-fns';

import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { ActionTackerTypesList } from "../../app/models/ActionTackerTypesList";
import { Link, useNavigate, useParams } from "react-router-dom";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyDateInput from "../../app/common/form/MyDateInput";
import MyDropdownInput from "../../app/common/form/MyDropdownInput";
import comFun from "../../app/common/functions/comFun";
import { UserManager } from "../../app/models/UserManager";
import { toast } from "react-toastify";
import UserSelect from "../../app/common/form/UserSelect";

export default observer(function ActionTackerTypesListDetails() {
    const { ActionTackerTypesListStore, UserManagerStore } = useStore();
    const { refreshAllUsers } = UserManagerStore;
    const { loadItem, item, loading, updateItem, createItem, deleteItem, projectStatusList, loadProjectStatusList, auditLogList } = ActionTackerTypesListStore;
    const { id } = useParams();
    const navigate = useNavigate();    
    const [UserList, setUserList] = useState<UserManager[]>() 

    const [ActionTackerTypesList, setActionTackerTypesList] = useState<ActionTackerTypesList>({
        id: '',
        title: '',
        typeID: '',
        actionType: '',
        ParentID: '',
        startDate: null,
        endDate: null,
        statusId: '',
        detailsJson: '',
        actionComment : '',
        stakeHoldersList:[]
    });
    
    const validationSchema = Yup.object({
        title: Yup.string().required('TTitle is required'),
        startDate : Yup.string().required('Start Date is required'), 
        endDate: Yup.string().required('End Date is required'), 
        statusId: Yup.string().required('Status is required'), 
    }); 

    useEffect(() => {

        refreshAllUsers().then((usrLst)=>{
            setUserList(usrLst);           
        })
 
        if(id){
            loadItem(id).then(it =>{ 
                debugger;   
                if(it && it.startDate) 
                    it.startDate = new Date(it.startDate);    
                if(it && it.endDate) 
                    it.endDate = new Date(it.endDate);                                 

                setActionTackerTypesList(it!)
            });
        }
        else{
            loadProjectStatusList();
        }

    }, [id, loadItem])

    const GetUserName = (id:string):string => {
      
        var res = ""
        if(UserList){
            const user = UserList.filter(usr => {
                return usr.id === id;
            });

            if(user.length > 0){
                res = user[0].displayName;
            }
            
        }
       return res;
    }

    function handleFormSubmit(ActionTackerTypesList: ActionTackerTypesList, action : any) {
        debugger

        ActionTackerTypesList.ActionModifiedTime = new Date();

        ActionTackerTypesList.startDate = comFun.setDate(ActionTackerTypesList.startDate);
        ActionTackerTypesList.endDate = comFun.setDate(ActionTackerTypesList.endDate);

        // if(ActionTackerTypesList.startDate){
        //     ActionTackerTypesList.startDate = new Date(Date.UTC(
        //         ActionTackerTypesList.startDate.getFullYear(), 
        //         ActionTackerTypesList.startDate.getMonth(), 
        //         ActionTackerTypesList.startDate.getDate()));
        // }

        // if(ActionTackerTypesList.endDate){
        //     ActionTackerTypesList.endDate = new Date(Date.UTC(
        //         ActionTackerTypesList.endDate.getFullYear(), 
        //         ActionTackerTypesList.endDate.getMonth(), 
        //         ActionTackerTypesList.endDate.getDate()));
        // }

        if (ActionTackerTypesList.id.length === 0) {
                         
            ActionTackerTypesList.actionTitle = "Created"

            createItem(ActionTackerTypesList).then( (newID) => {
                action.setSubmitting(false)
                if(newID){
                    navigate(`/Projects/${newID}`)
                }
                else{
                    alert("Error")
                }                
            } )
        } else {

            ActionTackerTypesList.actionTitle = "Save"
            updateItem(ActionTackerTypesList).then(() => {
                action.setSubmitting(false)
                //toast.info('Updated')
                navigate(`/Projects`) 
            })

        }
    }

    function handleDelete() {
        if (id) deleteItem(id).then(() => navigate('/Projects/'))
    }

    //if (  projectStatusList.length > 0) return <LoadingComponent content='Loading DataSecurity details' />


    if (ActionTackerTypesListStore.loadingInitial) return <LoadingComponent content='Loading ActionTackerTypesList details' />

    return (
        <Segment clearing>
            <Header as='h2' content='Project Details'  color='teal' />
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={ActionTackerTypesList}
                onSubmit={(values, action) => handleFormSubmit(values, action)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        
                        <Grid>
                            <Grid.Column width='8'>
                                <MyTextInput name='title' placeholder='Title' label="Title" />
                            </Grid.Column>

                            <Grid.Column width='8'>
                                <MyDropdownInput  label="Status" options={                            
                                    projectStatusList?.map( ds => {
                                            return {
                                                key: ds.id,
                                                text: ds.title,
                                                value: ds.id
                                            }
                                        })
                                    }
                                    name='statusId' placeholder='Status' /> 
                            </Grid.Column>

                            <Grid.Column width='8'>                              
                                <UserSelect label="Project Owner"                             
                                    name='projectOwner' placeholder='Project Owner'  multiple={false} showGroup={true} />
                            </Grid.Column>

                            <Grid.Column width='8'>                              
                                <UserSelect label="Stake Holders"                             
                                    name='stakeHoldersList' placeholder='Stake Holders'  multiple={true} showGroup={true} />
                            </Grid.Column>
                            
                            <Grid.Column width='8'>                              
                                <MyDateInput name='startDate' placeholderText='Start Date'  
                                    peekNextMonth showYearDropdown showMonthDropdown dropdownMode="select" 
                                    showTimeSelect={false} dateFormat='MMMM d, yyyy'
                                     />
                            </Grid.Column>

                            <Grid.Column width='8'>
                                <MyDateInput 
                                    name='endDate' 
                                    placeholderText='End Date' peekNextMonth showYearDropdown showMonthDropdown 
                                    dropdownMode="select"  showTimeSelect={false}  dateFormat='d-MMMM-yyyy' />                        
                            </Grid.Column>


                            <Grid.Column width='16'>
                                <MyTextInput name='actionComment' placeholder='Comment' label="Comment" />
                            </Grid.Column>

                        </Grid>

                        <ButtonGroup className="FromBtnGrp" variant="contained"  aria-label="contained primary button group">
                            <Button disabled={ isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit' />                                                
                            <Button onClick={handleDelete} content='Delete' floated='right' type='button' />
                            <Button as={Link} to='/Projects' floated='right' type='button' content='Cancel' /> 

                            <Button as={Link} to={`/NewTask?src=P${ActionTackerTypesList.id}`} floated='right' type='button' content='Add Task' primary /> 
                        </ButtonGroup>
                        
                    </Form>
                )}
            </Formik>

            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Action Time</Table.HeaderCell>
                        <Table.HeaderCell>Action</Table.HeaderCell>
                        <Table.HeaderCell>Action By</Table.HeaderCell>
                        <Table.HeaderCell>Comment</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>  
                    {
                        auditLogList.map( al => (
                            <Table.Row>
                                <Table.Cell>{comFun.dateFormateString(al.actionTime)}</Table.Cell>
                                <Table.Cell>{al.action}</Table.Cell>
                                <Table.Cell>{ GetUserName(al.actionBy) }</Table.Cell>
                                <Table.Cell>{al.comment}</Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>

            </Table>
        </Segment>        
    )
})
