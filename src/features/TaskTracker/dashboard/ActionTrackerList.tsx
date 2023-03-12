import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import {Button, Item, Label, Segment} from "semantic-ui-react";
import { useStore } from '../../../app/stores/store';
import MaterialTable from "material-table";


export default observer(function ActionTrackerList() {
    
    // const {actionTrackerStore} = useStore();
    // const {deleteActivity, activitiesByDate, loading} = actionTrackerStore;
    
    // const [target, setTarget] = useState('');

    // function handleDeleteActivity(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    //     setTarget(e.currentTarget.name);
    //     deleteActivity(id)
    // }

    const data = [
        { name: "Mohammad", surname: "Faisal", birthYear: 1995 },
        { name: "Nayeem Raihan ", surname: "Shuvo", birthYear: 1994 },
      ];
      
      const columns = [
        { title: "Title", field: "title" },
        { startDate: "Start Date", field: "startDate" },
      ];

      const d1 = [
        { title: 'fff', startDate: 'Baran', birthYear: 1987, birthCity: 63 },
        { title: 'Zerya aaa', startDate: 'Baran', birthYear: 2017, birthCity: 34 },
      ];

    return (
        <Segment>

{/* <MaterialTable
    title="Custom Filtering Algorithm Preview"
    columns={[
    {
        title: 'Title', 
        field: 'title',
        //customFilterAndSearch: (term, rowData) => term == rowData.title.length
    },
    { 
        title: 'Start Date', 
        field: 'startDate', 
        type: 'datetime',
      },
    {
        title: 'Title',
        field: 'title',
        lookup: { 34: 'E 2 1	', 63: '222' },
    },
    ]}
    data={activitiesByDate}
    options={{
        filtering: true
    }}
/> */}


            {/* <Item.Group divided>
                {activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.startDate}</Item.Meta>
                            <Item.Description>
                                <div>{activity.title}</div>
                                <div>{activity.title}, {activity.title}</div>
                            </Item.Description>
                            <Item.Extra>
                                 <Button as={Link} to={`/activities/${activity.id}`} floated='right' content='View' color='blue'/>
                                 <Button loading={loading && target === activity.id}
                                        name={activity.id} floated='right' content='Delete'
                                        color='red'
                                        onClick={(e) => handleDeleteActivity(e, activity.id)}/>
                                <Label basic content={activity.title}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group> */}
        </Segment>
    )
})