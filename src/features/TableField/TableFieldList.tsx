import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { Button, ButtonGroup, LinearProgress, List, ListItem } from '@material-ui/core';
import MaterialTable from 'material-table';
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import { TableField } from "../../app/models/TableField";

export default observer(function TableFieldList() {
    const { TableFieldStore, TableNameStore } = useStore();
    const { loadItems,  itemList } = TableFieldStore;

    const TableColumns = [
        {
          title: "id",
          field: "id",          
          defaultSort: "asc",
        //   filtering: false,
        },
        {
          title: "Table",
          field: "tableId",
          render : (values: TableField) => { return  GetTableName(values.tableId) },
        },
        {
          title: "Title",
          field: "title",
          render : (values: TableField) => { return <NavLink to={`/TableFielddetails/${values.id}` } >{values.title}</NavLink> },
        }
    ];

    const GetTableName = (id:string):string => {
    
      const filtItems = TableNameStore.itemList.filter(itm => {
        return itm.id === id;
      });

      if(filtItems.length > 0){
        return filtItems[0].id + " - " + filtItems[0].title
      }
      else{
        return id
      }
    }

    useEffect(() => {

      if(TableNameStore.itemList.length == 0){
        TableNameStore.loadItems()
      }

        loadItems();
    }, [loadItems])

    if (TableFieldStore.loadingInitial) return <LoadingComponent content='Loading To Do List..' />

    return (   
        <List>
        <ListItem divider>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button >
            <NavLink to="/createTableField/" >Add New</NavLink> 
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
                options={{ sorting:true, search: true, paging: true, filtering: true, exportButton: true, pageSize:10, grouping: true }}            
              />
            }
            </div>
          </div>
        </ListItem>
      </List>  
    )
})
