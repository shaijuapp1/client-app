import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { Button, ButtonGroup, LinearProgress, List, ListItem } from '@material-ui/core';
import MaterialTable from 'material-table';
import { format } from "date-fns";

import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { ActionTackerTypesList } from "../../app/models/ActionTackerTypesList";
import comFun from "../../app/common/functions/comFun";

export default observer(function ActionTackerTypesListList() {
    const { ActionTackerTypesListStore } = useStore();
    const { loadItems,  itemList, projectStatusList } = ActionTackerTypesListStore;

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
          render : (values: ActionTackerTypesList) => { return <NavLink to={`/Projects/${values.id}` } >{values.title}</NavLink> },
        },
        {
          title: "Start Date",
          field: "startDate",
          render : (values: ActionTackerTypesList) => {              
              return comFun.dateFormate(values.startDate) 
            }
        },
        {
          title: "End Date",
          field: "endDate",
          render : (values: ActionTackerTypesList) => {              
            return comFun.dateFormate(values.endDate)
          }
        },
        {
          title: "status",
          field: "statusId",
          render : (values: ActionTackerTypesList) => { return <span >{GetConFigTitle(values.statusId)}</span> },
        }
    ];

    const GetConFigTitle = (id:string):string => {
      
      const GetStatus = projectStatusList.filter(typ => {
          return typ.id === id;
      });

      if(GetStatus.length > 0){
          return GetStatus[0].title
      }
      else{
          return ""
      }
    }

    



    useEffect(() => {
        loadItems();
    }, [loadItems])

    if (ActionTackerTypesListStore.loadingInitial) return <LoadingComponent content='Loading ..' />

    return (   
        <List>
        <ListItem divider>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button >
            <NavLink to="/NewProject/" >Add New</NavLink> 
          </Button>
          <Button onClick={ () => { loadItems(); }}>Refresh</Button>
        </ButtonGroup>
        </ListItem>
        
        <ListItem divider>
          <div className={"tabcontainers1"}>
            <div className={"tabcontainers2"} >     
              {TableColumns.length>0  &&   
              <MaterialTable                    
                title="Project List"
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
