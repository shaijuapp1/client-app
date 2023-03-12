import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { Button, ButtonGroup, LinearProgress, List, ListItem } from '@material-ui/core';
import MaterialTable from 'material-table';

import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { DataSecurity } from "../../app/models/DataSecurity";



export default observer(function DataSecurityList() {
    const { DataSecurityStore } = useStore();
    const { loadItems,  itemList } = DataSecurityStore;

    const TableColumns = [
        {
          title: "id",
          field: "id",          
          defaultSort: "asc",
        //   filtering: false,
        },
        {
          title: "tableId",
          field: "tableId",
          render : (values: DataSecurity) => { return <NavLink to={`/DataSecuritydetails/${values.id}` } >{values.tableId}</NavLink> },
        }
    ];

    useEffect(() => {
        loadItems();
    }, [loadItems])

    if (DataSecurityStore.loadingInitial) return <LoadingComponent content='Loading To Do List..' />

    return (   
        <List>
        <ListItem divider>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button >
            <NavLink to="/createDataSecurity/" >Add New</NavLink> 
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
