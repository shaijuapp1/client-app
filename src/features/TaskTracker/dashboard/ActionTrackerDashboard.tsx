import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { useStore } from "../../../app/stores/store";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActionTrackerList from "./ActionTrackerList";

// import ActivityDetails from "../details/ActivityDetails";
// import ActivityForm from "../form/ActivityForm";
// import ActivityList from './ActivityList';

export default observer(function ActionTrackerDashboard() {

    // const {actionTrackerStore} = useStore();
    // const {loadActivities, activityRegistry} = actionTrackerStore;

    // useEffect(() => {
    //     if (activityRegistry.size <= 1) loadActivities();
    // }, [loadActivities])

    // if (actionTrackerStore.loadingInitial) return <LoadingComponent content='Loading app...' />


    return (
        <Grid>
            <Grid.Column width='16'>
                <ActionTrackerList />
            </Grid.Column>
        </Grid>
    )
})
