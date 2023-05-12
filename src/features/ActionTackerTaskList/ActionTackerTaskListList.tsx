import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { Button, ButtonGroup, LinearProgress, List, ListItem } from '@material-ui/core';
import MaterialTable from 'material-table';

import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { ActionTackerTaskList } from "../../app/models/ActionTackerTaskList";
import comFun from "../../app/common/functions/comFun";
import { UserManager } from "../../app/models/UserManager";
import { RoleMaster } from "../../app/models/RoleMaster";

export default observer(function ActionTackerTaskListList() {
    const { ActionTackerTaskListStore , UserManagerStore, RoleMasterStore  } = useStore();
    const { loadItems,  itemList, taskStatusList } = ActionTackerTaskListStore;
    const { refreshAllUsers } = UserManagerStore;
    const { refreshAllRoles } = RoleMasterStore;
    const [usrLst, setUserList] = useState<UserManager[]>() 
    const [grpLst, setGrpList] = useState<RoleMaster[]>()
    
    const TableColumns = [
        {
          title: "id",
          field: "id",          
          defaultSort: "asc",
          //cellStyle: { width: '12%' }
        
        //   filtering: false,
        },
        {
          title: "Start Date",
          field: "startDate",
          render : (values: ActionTackerTaskList) => {
            return comFun.dateFormate(values.startDate)
          }
        },
        {
          title: "Title",
          field: "title",
          render : (values: ActionTackerTaskList) => { return <NavLink to={`/Tasks/${values.id}` } >{values.title}</NavLink> },
        },
        {
          title: "Responsibility",
          field: "title",
          render : (values: ActionTackerTaskList) => { 
            return comFun.GetUserNameFromList(values.responsibilityList, usrLst, grpLst) 
          },
        },
        {
          title: "Stakeholder",
          field: "title",
          render : (values: ActionTackerTaskList) => {  
            return comFun.GetUserNameFromList(values.stakeholderList, usrLst, grpLst) 
          },
        },
        {
          title: "Last Update",
          field: "modifiedDate",
          render : (values: ActionTackerTaskList) => { 
            return comFun.dateFormate(values.modifiedDate)
          },
        },
        {
          title: "Target Date",
          field: "complectionDate",
          render : (values: ActionTackerTaskList) => {
            return comFun.dateFormate(values.startDate)
          }
        },
        {
          title: "status",
          field: "statusId",
          render : (values: ActionTackerTaskList) => { return <span >{GetConFigTitle(values.statusId)}</span> },
          //lookup: { 11: 'Not Started', 12: 'In Progress', 13: 'Complected', 14: 'Complected' }
          lookup: comFun.getConfigArray(taskStatusList) //{...taskStatusList} //
        }

        
    ];

    const GetConFigTitle = (id:string):string => {
      
      const GetStatus = taskStatusList.filter(typ => {
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

      refreshAllUsers().then((usrLst)=>{
          setUserList(usrLst);           
      })

      refreshAllRoles().then((grpLst)=>{
        setGrpList(grpLst);           
      })

        loadItems(); 
    }, [loadItems])

    if (ActionTackerTaskListStore.loadingInitial) return <LoadingComponent content='Loading To Do List..' />

    return (   
        <List>
        <ListItem divider>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button >
            <NavLink to="/NewTask/" >Add New Task</NavLink> 
          </Button>

          {/* <Button onClick={ () => { loadItems(); }}>Not Started</Button>
          <Button onClick={ () => { loadItems(); }}>In Progress</Button>
          <Button onClick={ () => { loadItems(); }}>All</Button> */}

          <Button onClick={ () => { loadItems(); }}>Refresh</Button>
        </ButtonGroup>
        </ListItem>
        
        <ListItem divider>
          <div className={"tabcontainers1"}>
            <div className={"tabcontainers2"} >     
              {TableColumns.length>0  &&   
              <MaterialTable                               
                title="Task List"
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
