import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';
import { ActionTask } from "../models/ActionTask";
import { ActionTrackerAuditLog } from "../models/ActionTrackerAuditLog";

export default class ActionTrackerAuditLogStore {

    activityRegistry = new Map<string, ActionTrackerAuditLog>();
    selectedActivity?: ActionTask = undefined;

    editMode = false;
    loading = false;
    loadingInitial = false;
    itemList: ActionTrackerAuditLog[] = [];
    item?: ActionTrackerAuditLog = undefined;

    constructor() {
        makeAutoObservable(this)
    }
    
    loadItems = async () => {
        this.setLoadingInitial(true);
        try {            
            this.itemList =  await agent.ActionTrackerAuditLogs.list();;
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
            this.item =  await agent.ActionTrackerAuditLogs.details(id);
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

    createItem = async (item: ActionTrackerAuditLog) => {
        debugger
        this.loading = true;       
        try {
            var newID =  await agent.ActionTrackerAuditLogs.create(item);
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

    updateItem = async (item: ActionTrackerAuditLog) => {
        this.loading = true;
        try {
            debugger
            await agent.ActionTrackerAuditLogs.update(item)
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
            await agent.ActionTrackerAuditLogs.delete(id);
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

