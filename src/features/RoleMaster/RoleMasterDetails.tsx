import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Confirm, Header, List, ListItem, Segment } from "semantic-ui-react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { RoleMaster, RoleUser, UserRole } from "../../app/models/RoleMaster";
import { Link, useNavigate, useParams } from "react-router-dom";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyDateInput from "../../app/common/form/MyDateInput";
import MaterialTable from "material-table";
import UserSelect from "../../app/common/form/UserSelect";



export default observer(function RoleMasterDetails() {
    const { RoleMasterStore } = useStore();
    const { loadItem, item, loading, updateItem, createItem, deleteItem, GroupUserList, RemoveUserFromRole, AddUserToRole } = RoleMasterStore;
    const { id } = useParams();
    const navigate = useNavigate();

    
    const [showConfirm, setShowConfirm] = useState<boolean>(false)
    const [userRoleDel, setUserRoleDel] = useState<UserRole>({
        UserName: '',
        RoleName: '',
    });

    const [userRole, setUserRole] = useState<UserRole>({
        UserName: '',
        RoleName: '',
    });

    const [roleUserList, setRoleUserList] = useState<RoleUser[]>()
    
    const validationSchema = Yup.object({
        UserName: Yup.string().required('User is required'),       
    });

    const TableColumns = [
        {
          title: "Display Name",
          field: "displayName",          
          defaultSort: "asc",
        //   filtering: false,
        },
        {
          title: "User Name",
          field: "username",          
        },
        {
          title: "Email",
          field: "email",          
        }
    ];

    function RefreshUsersInRole(){
        if(id){
            GroupUserList(id).then( (users) => {
                setRoleUserList(users)
            })
            userRole.RoleName = id;
            setUserRole(userRole)
        } 
    }

    useEffect(() => {
        RefreshUsersInRole()        
    }, [id, GroupUserList])

    function handleFormSubmit(item: UserRole, action : any) {
        debugger
        item.UserName = item.UserName.replace("U:", "")
        AddUserToRole(item).then((item)=>{
            RefreshUsersInRole()
        })        
    }

    function handleDelete() {
        if (id) deleteItem(id).then(() => navigate('/RoleMasterList/'))
    }

    if (RoleMasterStore.loadingInitial) return <LoadingComponent content='Loading RoleMaster details' />

    return (
        <Segment clearing>
            <Header content={'Role Users'} sub color='teal' />
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={userRole}
                onSubmit={(values, action) => handleFormSubmit(values, action)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>

                        <UserSelect label="Select User"                              
                            name='UserName' placeholder='Select User'   />
                            
                        <ButtonGroup variant="contained"  aria-label="contained primary button group">
                            <Button disabled={ isSubmitting || !dirty || !isValid} loading={loading} floated='right' positive type='submit' content='Add User to Group' />                                                
                            <Button as={Link} to='/RoleMasterList' floated='right' type='button' content='Cancel' /> 
                        </ButtonGroup>
                        
                    </Form>
                )}
            </Formik>
            <List>
                <ListItem divider>
                    <ButtonGroup variant="contained"  aria-label="contained primary button group">                        
                            <Button as={Link} to='/RoleMasterList' floated='right' type='button' content='Cancel' /> 
                    </ButtonGroup>
                </ListItem>
                <ListItem divider>
                    <div className={"tabcontainers1"}>
                        <div className={"tabcontainers2"} >     
                        { id && roleUserList  &&   
                        <MaterialTable                    
                            title={`Group : ${id}`}
                            data={roleUserList}
                            columns={TableColumns as any}
                            options={{ sorting:true, search: true, paging: true, filtering: true, exportButton: true, pageSize:10, actionsColumnIndex: -1 }}            
                            actions={[
                                {                                    
                                  icon: 'delete',
                                  tooltip: 'Delete',
                                  onClick: (event, rowData) => {
                                    setUserRoleDel({RoleName : id, UserName:rowData.username})  
                                    setShowConfirm(true)                                    
                                  }
                                }
                              ]}                            
                        />
                        }

                        <Confirm
                            open={showConfirm}
                            onCancel={ () => { setShowConfirm(false)} }
                            onConfirm={ () => {  
                                setShowConfirm(false)                                                                  
                                RemoveUserFromRole(userRoleDel).then((r)=> {
                                    RefreshUsersInRole()
                                })
                            } }
                        />
        
                        </div>
                    </div>
                </ListItem>
            </List>
            
        </Segment>        
    )
})


/*
localhost:5000/api/RoleMasters/AddUserToRole

{	
	"RoleName": "t2",
  "UserName": "shaiju"
}

localhost:5000/api/RoleMasters/RemoveUserFromRole

{	
	"RoleName": "t2",
  "UserName": "shaiju"
}

{role: 'All Users', user: 'test3'}

*/