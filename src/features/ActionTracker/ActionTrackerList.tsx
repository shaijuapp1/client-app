import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { Button, ButtonGroup, LinearProgress, List, ListItem } from '@material-ui/core';
import MaterialTable from 'material-table';

import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { AppConfigType } from "../../app/models/AppConfigType";



export default observer(function ActionTrackerList() {
    const { AppConfigTypeStore } = useStore();
    const { loadItems,  itemList } = AppConfigTypeStore;

    const TableColumns = [
        {
          title: "id",
          field: "id",          
          defaultSort: "asc",
        //   filtering: false,
        },
        {
          title: "Title",
          field: "title",
          render : (values: AppConfigType) => { return <NavLink to={`/AppConfigTypedetails/${values.id}` } >{values.title}</NavLink> },
        }
    ];

    useEffect(() => {
        loadItems();
    }, [loadItems])

    if (AppConfigTypeStore.loadingInitial) return <LoadingComponent content='Loading To Do List..' />

    return (   
        <List>
        <ListItem divider>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button >
            <NavLink to="/createAppConfigType/" >Add New</NavLink> 
          </Button>
          <Button onClick={ () => { loadItems(); }}>Refresh</Button>
        </ButtonGroup>
        </ListItem>
        
        <ListItem divider>
          <div className={"tabcontainers1"}>
            <div className={"tabcontainers2"} >     
              {TableColumns.length>0  &&   
              <MaterialTable

                title="Configration Types"
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
