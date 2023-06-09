import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { Button, ButtonGroup, LinearProgress, List, ListItem } from '@material-ui/core';
import MaterialTable from 'material-table';

import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { RoleMaster } from "../../app/models/RoleMaster";



export default observer(function RoleMasterList() {
    const { RoleMasterStore } = useStore();
    const { loadItems,  itemList } = RoleMasterStore;

    const TableColumns = [       
        {
          title: "Name",
          field: "name",
          render : (values: RoleMaster) => { return <NavLink to={`/RoleMasterdetails/${values.name}` } >{values.name}</NavLink> },
        }
    ];

    useEffect(() => {
        loadItems().then( () => {
          
        });
    }, [loadItems])

    if (RoleMasterStore.loadingInitial) return <LoadingComponent content='Loading To Do List..' />

    return (   
        <List>
        <ListItem divider>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button >
            <NavLink to="/createRoleMaster/" >Add New</NavLink> 
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

*/