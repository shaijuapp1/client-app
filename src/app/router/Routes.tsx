import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";
import HomePage from "../../features/home/HomePage";
import ActionTrackerDashboard from "../../features/TaskTracker/dashboard/ActionTrackerDashboard";
import App from "../layout/App";

import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import TestErrors from "../../features/errors/TestErrors";
import LoginForm from "../../features/users/LoginForm";
import ToDoList from "../../features/ToDo/ToDoList";
import ToDoDetails from "../../features/ToDo/ToDoDetails";
import AppConfigTypeList from '../../features/AppConfigType/AppConfigTypeList';
import AppConfigTypeDetails from '../../features/AppConfigType/AppConfigTypeDetails';
import AdminHome from "../../features/Admin/AdminHome";
import AppConfigList from "../../features/AppConfig/AppConfigList";
import AppConfigDetails from "../../features/AppConfig/AppConfigDetails";
import TableNameList from '../../features/TableName/TableNameList';
import TableNameDetails from '../../features/TableName/TableNameDetails';
import TableFieldList from '../../features/TableField/TableFieldList';
import TableFieldDetails from '../../features/TableField/TableFieldDetails';
import DataSecurityList from '../../features/DataSecurity/DataSecurityList';
import DataSecurityDetails from '../../features/DataSecurity/DataSecurityDetails';
import UserManagerList from '../../features/UserManager/UserManagerList';
import UserManagerDetails from '../../features/UserManager/UserManagerDetails';
import UserManagerNew from "../../features/UserManager/UserManagerNew";
import RoleMasterList from '../../features/RoleMaster/RoleMasterList';
import RoleMasterDetails from '../../features/RoleMaster/RoleMasterDetails';
import ActionTrackerList from "../../features/ActionTracker/ActionTrackerList";
import ActionTrackerDetails from "../../features/ActionTracker/ActionTrackerDetails";
import ActionTrackerAuditLogList from '../../features/ActionTrackerAuditLog/ActionTrackerAuditLogList';
import ActionTrackerAuditLogDetails from '../../features/ActionTrackerAuditLog/ActionTrackerAuditLogDetails';
import ActionTackerTypesListList from '../../features/ActionTackerTypesList/ActionTackerTypesListList';
import ActionTackerTypesListDetails from '../../features/ActionTackerTypesList/ActionTackerTypesListDetails';
import ActionTackerTaskListList from '../../features/ActionTackerTaskList/ActionTackerTaskListList';
import ActionTackerTaskListDetails from '../../features/ActionTackerTaskList/ActionTackerTaskListDetails';
//##RouteImport##

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [

            {path: 'AdminHome', element: <AdminHome />},

            {path: 'activities', element: <ActivityDashboard />},
            {path: 'activities/:id', element: <ActivityDetails />},
            {path: 'createActivity', element: <ActivityForm key='create' />},
            {path: 'manage/:id', element: <ActivityForm key='manage' />},
            {path: 'login', element: <LoginForm />},


            {path: 'errors', element: <TestErrors />},
            {path: 'not-found', element: <NotFound />},
            {path: 'server-error', element: <ServerError />},
            {path: '*', element: <Navigate replace to='/not-found' />},

            {path: 'ActionTracker', element: <ActionTrackerDashboard />},

            {path: 'toDolist', element: <ToDoList />},
            {path: 'toDodetails/:id', element: <ToDoDetails />},
            {path: 'createToDo', element: <ToDoDetails  key='create'/>},

			{path: 'AppConfigTypeList', element: <AppConfigTypeList />},
			{path: 'AppConfigTypeDetails/:id', element: <AppConfigTypeDetails />},
			{path: 'CreateAppConfigType', element: <AppConfigTypeDetails  key='create'/>},

            {path: 'AppConfigList', element: <AppConfigList />},
			{path: 'AppConfigDetails/:id', element: <AppConfigDetails />},
			{path: 'CreateAppConfig', element: <AppConfigDetails  key='create'/>},

			{path: 'TableNameList', element: <TableNameList />},
			{path: 'TableNameDetails/:id', element: <TableNameDetails />},
			{path: 'CreateTableName', element: <TableNameDetails  key='create'/>},

			{path: 'TableFieldList', element: <TableFieldList />},
			{path: 'TableFieldDetails/:id', element: <TableFieldDetails />},
			{path: 'CreateTableField', element: <TableFieldDetails  key='create'/>},
            
			{path: 'DataSecurityList', element: <DataSecurityList />},
			{path: 'DataSecurityDetails/:id', element: <DataSecurityDetails />},
			{path: 'CreateDataSecurity', element: <DataSecurityDetails  key='create'/>},
            
			{path: 'UserManagerList', element: <UserManagerList />},
			{path: 'UserManagerDetails/:id', element: <UserManagerDetails />},
			{path: 'CreateUserManager', element: <UserManagerNew  key='create'/>},
            
			{path: 'RoleMasterList', element: <RoleMasterList />},
			{path: 'RoleMasterDetails/:id', element: <RoleMasterDetails />},
			{path: 'CreateRoleMaster', element: <RoleMasterDetails  key='create'/>},

            {path: 'ActionTrackerList', element: <ActionTrackerList />},
			{path: 'ActionTrackerDetails/:id', element: <ActionTrackerDetails />},
			{path: 'CreateActionTracker', element: <ActionTrackerDetails  key='create'/>},

			{path: 'ActionTrackerAuditLogList', element: <ActionTrackerAuditLogList />},
			{path: 'ActionTrackerAuditLogDetails/:id', element: <ActionTrackerAuditLogDetails />},
			{path: 'CreateActionTrackerAuditLog', element: <ActionTrackerAuditLogDetails  key='create'/>},

			{path: 'Projects', element: <ActionTackerTypesListList />},
			{path: 'Projects/:id', element: <ActionTackerTypesListDetails />},
			{path: 'NewProject', element: <ActionTackerTypesListDetails  key='create'/>},

			{path: 'Tasks', element: <ActionTackerTaskListList />},
			{path: 'Tasks/:id', element: <ActionTackerTaskListDetails />},
			{path: 'NewTask', element: <ActionTackerTaskListDetails  key='create'/>},

			//##Route##
           

        ]
    }
]

export const router = createBrowserRouter(routes);











