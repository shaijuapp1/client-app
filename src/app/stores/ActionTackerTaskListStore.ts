import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';
import { ActionTask } from "../models/ActionTask";
import { ActionTackerTaskList } from "../models/ActionTackerTaskList";
import { AppConfig } from "../models/AppConfig";
import { ActionTrackerAuditLog } from "../models/ActionTrackerAuditLog";

export default class ActionTackerTaskListStore {

    activityRegistry = new Map<string, ActionTackerTaskList>();
    selectedActivity?: ActionTask = undefined;

    editMode = false;
    loading = false;
    loadingInitial = false;
    itemList: ActionTackerTaskList[] = [];
    item?: ActionTackerTaskList = undefined;
    taskStatusList: AppConfig[] = [];
    taskLogList: ActionTrackerAuditLog[] = [];

    
    constructor() {
        makeAutoObservable(this)
    }
    
    loadTaskStatusList = async () => {
        this.setLoadingInitial(true);
        try {            
            this.taskStatusList =  await agent.AppConfigs.loadConfigItems("TaskStatus");
            debugger;
            this.setLoadingInitial(false);
            return this.taskStatusList;
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadItems = async () => {
        this.setLoadingInitial(true);
        try {            
            this.taskLogList = [];
            this.taskStatusList =  await agent.AppConfigs.loadConfigItems("TaskStatus");
            this.itemList =  await agent.ActionTackerTaskLists.list();            
            //debugger;
            this.setLoadingInitial(false);
            return this.item;
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadItem = async (id: string) => {
        this.setLoadingInitial(true);
        try {            
            this.item =  await agent.ActionTackerTaskLists.details(id);
            this.taskStatusList =  await agent.AppConfigs.loadConfigItems("TaskStatus");
            this.taskLogList =  await agent.AppConfigs.loadAuditLog("TaskList", id);

            debugger;
            this.setLoadingInitial(false);
            return this.item;
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createItem = async (item: ActionTackerTaskList) => {
        debugger
        this.loading = true;       
        try {
            var newID =  await agent.ActionTackerTaskLists.create(item);
            debugger;
            // runInAction(() => {               
            //     this.editMode = false;
            //     this.loading = false;
            // })
            this.loading = false;
            return newID;
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    updateItem = async (item: ActionTackerTaskList) => {
        this.loading = true;
        try {
            debugger
            await agent.ActionTackerTaskLists.update(item)
            runInAction(() => {               
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    deleteItem = async (id: string) => {
        this.loading = true;
        try {
            await agent.ActionTackerTaskLists.delete(id);
            runInAction(() => {                
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }


}

