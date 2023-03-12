import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { Button, ButtonGroup, LinearProgress, List, ListItem } from '@material-ui/core';
import MaterialTable from 'material-table';

import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { ToDo } from "../../app/models/ToDo";



export default observer(function ToDoList() {
    const { toDoStore } = useStore();
    const { loadItems,  itemList } = toDoStore;

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
          render : (values: ToDo) => { return <NavLink to={`/toDodetails/${values.id}` } >{values.title}</NavLink> },
        }
    ];

    useEffect(() => {
        loadItems();
    }, [loadItems])

    if (toDoStore.loadingInitial) return <LoadingComponent content='Loading To Do List..' />

    return (   
        <List>
        <ListItem divider>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button >
            <NavLink to="/createToDo/" >Add New</NavLink> 
          </Button>
          {/* <Button onClick={ () => { AppConfigStore.getList(); }}>Refresh</Button>           */}
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
                options={{ sorting:true, search: true, paging: true, filtering: true, exportButton: true, pageSize:100 }}            
              />
            }
            </div>
          </div>
        </ListItem>
      </List>  
    )
})