import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { Button, ButtonGroup, LinearProgress, List, ListItem } from '@material-ui/core';
import MaterialTable from 'material-table';

import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { UserManager } from "../../app/models/UserManager";



export default observer(function UserManagerList() {
    const { UserManagerStore } = useStore();
    const { loadItems,  itemList } = UserManagerStore;

    const TableColumns = [
        {
          title: "User Name",
          field: "username",          
          defaultSort: "asc",
        //   filtering: false,
        },
        {
          title: "DisplayName",
          field: "displayName",
          //render : (values: UserManager) => { return <NavLink to={`/UserManagerDetails/${values.username}` } >{values.displayName}</NavLink> },
        },
        {
          title: "Email",
          field: "email",         
        },

    ];

    useEffect(() => {
        loadItems();
    }, [loadItems])

    if (UserManagerStore.loadingInitial) return <LoadingComponent content='Loading To Do List..' />

    return (   
        <List>
        <ListItem divider>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button >
            <NavLink to="/createUserManager/" >Add New</NavLink> 
          </Button>
          <Button onClick={ () => { loadItems(); }}>Refresh</Button>
        </ButtonGroup>
        </ListItem>
        
        <ListItem divider>
          <div className={"tabcontainers1"}>
            <div className={"tabcontainers2"} >     
              {TableColumns.length>0  &&   
              <MaterialTable                    
                title="Application Configration"
                data={itemList}
                columns={TableColumns as any}
                options={{ sorting:true, search: true, paging: true, filtering: true, exportButton: true, pageSize:10 }}            
              />
            }
            </div>
          </div>
        </ListItem>
      </List>  
    )
})
