import ActivityStore from "./activityStore";
import {createContext, useContext} from "react";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import CommonStore from "./CommonStore";
import ToDoStore from "./ToDoStore";
import AppConfigTypeStore from './AppConfigTypeStore';
import AppConfigStore from "./AppConfigStore";
import TableNameStore from './TableNameStore';

import TableFieldStore from './TableFieldStore';
import DataSecurityStore from './DataSecurityStore';
import UserManagerStore from './UserManagerStore';
import RoleMasterStore from './RoleMasterStore';
import ActionTrackerAuditLogStore from './ActionTrackerAuditLogStore';
import ActionTackerTypesListStore from './ActionTackerTypesListStore';
import ActionTackerTaskListStore from './ActionTackerTaskListStore';
//##StoreImport##"

interface Store {
    activityStore: ActivityStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    toDoStore: ToDoStore;
	AppConfigTypeStore: AppConfigTypeStore;
    AppConfigStore: AppConfigStore;
	TableNameStore: TableNameStore;
	TableFieldStore: TableFieldStore;
	DataSecurityStore: DataSecurityStore;
	UserManagerStore: UserManagerStore;
	RoleMasterStore: RoleMasterStore;
	ActionTrackerAuditLogStore: ActionTrackerAuditLogStore;
	ActionTackerTypesListStore: ActionTackerTypesListStore;
	ActionTackerTaskListStore: ActionTackerTaskListStore;
	//##StoreImportInterface##
}

export const store: Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    toDoStore: new ToDoStore(),
	AppConfigTypeStore: new AppConfigTypeStore(),
    AppConfigStore: new AppConfigStore(),
	TableNameStore: new TableNameStore(),
	TableFieldStore: new TableFieldStore(),
	DataSecurityStore: new DataSecurityStore(),
	UserManagerStore: new UserManagerStore(),
	RoleMasterStore: new RoleMasterStore(),
	ActionTrackerAuditLogStore: new ActionTrackerAuditLogStore(),
	ActionTackerTypesListStore: new ActionTackerTypesListStore(),
	ActionTackerTaskListStore: new ActionTackerTaskListStore(),
	//##StoreImportConst##"
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}











