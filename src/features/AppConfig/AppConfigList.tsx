import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { Button, ButtonGroup, LinearProgress, List, ListItem } from '@material-ui/core';
import MaterialTable from 'material-table';

import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { AppConfig } from "../../app/models/AppConfig";
import { type } from "os";



export default observer(function AppConfigList() {
    const { AppConfigStore, AppConfigTypeStore } = useStore();
    const { loadItems,  itemList } = AppConfigStore;

    const TableColumns = [
        {
          title: "ID",
          field: "id",          
          defaultSort: "asc",          
        //   filtering: false,
        },
        {
          title: "Title",
          field: "title",
          render : (values: AppConfig) => { return <NavLink to={`/AppConfigdetails/${values.id}` } >{values.title}</NavLink> },
        },
        {
          title: "Config Type",
          field: "configTypeId",
          //render : (values: AppConfig) => { return <span >{GetStatus(values.configTypeId)}</span> },
          //lookup : AppConfigTypeStore.itemList
          render : (values: AppConfig) => { return <span >{GetStatus(values.configTypeId)}</span> },
        }
    ];
//render : (values: AppConfig) => { return GetStatus(values.configTypeId) },
    const GetStatus = (id:string):string => {
     
      const GetStatus = AppConfigTypeStore.itemList.filter(typ => {
        return typ.id === id;
      });

      if(GetStatus.length > 0){
        return GetStatus[0].id + " - " + GetStatus[0].title
      }
      else{
        return ""
      }
    }

    useEffect(() => {

      if(!AppConfigTypeStore.itemList.length){
        AppConfigTypeStore.loadItems()
      }

        loadItems();
    }, [loadItems])

    if (AppConfigStore.loadingInitial) return <LoadingComponent content='Loading To Do List..' />

    return (   
        <List>
        <ListItem divider>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button >
            <NavLink to="/CreateAppConfig/" >Add New</NavLink> 
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
                options={{ sorting:true, search: true, paging: true, 
                  filtering: true, exportButton: true, pageSize:10,
                   }}  

               
              />
            }
            </div>
          </div>
        </ListItem>
      </List>  
    )
})
