import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Grid, Header, Segment, Table } from "semantic-ui-react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { ActionTackerTaskList } from "../../app/models/ActionTackerTaskList";
import { Link, useNavigate, useParams } from "react-router-dom";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyDateInput from "../../app/common/form/MyDateInput";
import MyDropdownInput from "../../app/common/form/MyDropdownInput";
import UserSelect from "../../app/common/form/UserSelect";
import UserManagerStore from "../../app/stores/UserManagerStore";
import MyTextAreaInput from "../../app/common/form/MyTextArea";
import comFun from "../../app/common/functions/comFun";
import { UserManager } from "../../app/models/UserManager";

export default observer(function ActionTackerTaskListDetails() {
    const { ActionTackerTaskListStore, UserManagerStore } = useStore();
    const { refreshAllUsers } = UserManagerStore;
    
    const { loadItem, item, loading, updateItem, createItem, deleteItem, taskStatusList, loadTaskStatusList, taskLogList } = ActionTackerTaskListStore;
    const { id } = useParams();
    const navigate = useNavigate();
    const [UserList, setUserList] = useState<UserManager[]>() 

    const [ActionTackerTaskList, setActionTackerTaskList] = useState<ActionTackerTaskList>({
        id: '',
        parentID: '0',
        statusId: '',
        title: '',
        description: '',
        taskType: '',
        startDate: null,
        complectionDate: null,
        actualComplectionDate :null,
        responsibilityList: [],
        stakeholderList:[],
        detailsJson: '',        
    });
    
    const validationSchema = Yup.object({
        title: Yup.string().required('The event title is required'),       
    });

    useEffect(() => {
             
        refreshAllUsers().then((usrLst)=>{
            setUserList(usrLst);           
        })

        if (id){
            debugger
            loadItem(id).then(it =>{ 
                debugger;
                if(it && it.startDate) 
                    it.startDate = new Date(it.startDate);    
                if(it && it.complectionDate) 
                    it.complectionDate = new Date(it.complectionDate);
                if(it && it.actualComplectionDate) 
                    it.actualComplectionDate = new Date(it.actualComplectionDate);
                setActionTackerTaskList(it!)
            });
        } 
        else{
            loadTaskStatusList()
        }
        
    }, [id, loadItem])

    function handleFormSubmit(ActionTackerTaskList: ActionTackerTaskList, action : any) {
        debugger

        ActionTackerTaskList.startDate = comFun.setDate(ActionTackerTaskList.startDate);
        ActionTackerTaskList.complectionDate = comFun.setDate(ActionTackerTaskList.complectionDate);
        ActionTackerTaskList.actualComplectionDate = comFun.setDate(ActionTackerTaskList.actualComplectionDate);

        if (ActionTackerTaskList.id.length === 0) {
            let newActionTackerTaskList = {
                ...ActionTackerTaskList
            };

            newActionTackerTaskList.actionTitle = "Created"

            createItem(newActionTackerTaskList).then( (newID) => {
                action.setSubmitting(false)
                navigate(`/Tasks`)
            } )
        } else {         
            ActionTackerTaskList.actionTitle = "Save"    
            updateItem(ActionTackerTaskList).then(() => {
                action.setSubmitting(false)
                navigate(`/Tasks`)
                //navigate(`/ActionTackerTaskListDetails/${ActionTackerTaskList.id}`)
            })

        }
    }

    function handleDelete() {
        if (id) deleteItem(id).then(() => navigate('/Tasks/'))
    }

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

    if (ActionTackerTaskListStore.loadingInitial) return <LoadingComponent content='Loading ActionTackerTaskList details' />

    return (
        <Segment clearing>
            <Header as='h2' content='Task Details' color='teal' />
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={ActionTackerTaskList}
                onSubmit={(values, action) => handleFormSubmit(values, action)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>

                        <Grid>
                            <Grid.Column width='4'>                              
                                <MyDateInput name='startDate' placeholderText='Start Date'  
                                    peekNextMonth showYearDropdown showMonthDropdown dropdownMode="select" 
                                    showTimeSelect={false} dateFormat='MMMM d, yyyy'
                                />
                            </Grid.Column>
                            <Grid.Column width='4'>                              
                                <MyDateInput name='complectionDate' placeholderText='Planned Target'  
                                    peekNextMonth showYearDropdown showMonthDropdown dropdownMode="select" 
                                    showTimeSelect={false} dateFormat='MMMM d, yyyy'
                                />
                            </Grid.Column>
                            <Grid.Column width='4'>                              
                                <MyDateInput name='actualComplectionDate' placeholderText='Actual Completion'  
                                    peekNextMonth showYearDropdown showMonthDropdown dropdownMode="select" 
                                    showTimeSelect={false} dateFormat='MMMM d, yyyy'
                                />
                            </Grid.Column>

                            <Grid.Column width='4'>                              
                                <MyDropdownInput  label="Status" options={                            
                                    taskStatusList?.map( ds => {
                                            return {
                                                key: ds.id,
                                                text: ds.title,
                                                value: ds.id
                                            }
                                        })
                                    }
                                    name='statusId' placeholder='Status' />
                            </Grid.Column>

                            <Grid.Column width='16'>                              
                                <UserSelect label="Responsibility"                             
                                    name='responsibilityList' placeholder='Responsibility'  multiple={true} showGroup={true} />
                            </Grid.Column>

                            <Grid.Column width='16'>                              
                                <UserSelect label="Stakeholder"                             
                                    name='stakeholderList' placeholder='Stakeholder'  multiple={true} showGroup={true} />
                            </Grid.Column>
                        
                            <Grid.Column width='16'>
                                <MyTextInput name='title' placeholder='Title' label="Title" />
                            </Grid.Column>

                            <Grid.Column width='16'>
                                <MyTextAreaInput rows={3} name='description' placeholder='Description' label="Description" />
                            </Grid.Column>

                            <Grid.Column width='16'>
                                <MyTextInput name='actionComment' placeholder='Comment' label="Comment" />
                            </Grid.Column>

                        </Grid>
                        
                        
                        <ButtonGroup className="FromBtnGrp" variant="contained"  aria-label="contained primary button group">
                            <Button disabled={ isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Submit' />                                                
                            <Button onClick={handleDelete} content='Delete' floated='right' type='button' />
                            <Button as={Link} to='/Tasks' floated='right' type='button' content='Cancel' /> 
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
                        taskLogList.map( al => (
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

