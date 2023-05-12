import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';
import { ActionTask } from "../models/ActionTask";
import { ActionTackerTypesList } from "../models/ActionTackerTypesList";
import { AppConfig } from "../models/AppConfig";
import { ActionTrackerAuditLog } from "../models/ActionTrackerAuditLog";

export default class ActionTackerTypesListStore {

    activityRegistry = new Map<string, ActionTackerTypesList>();
    selectedActivity?: ActionTask = undefined;

    editMode = false;
    loading = false;
    loadingInitial = false;
    itemList: ActionTackerTypesList[] = [];
    item?: ActionTackerTypesList = undefined;

    projectStatusList: AppConfig[] = [];
    auditLogList: ActionTrackerAuditLog[] = [];


    constructor() {
        makeAutoObservable(this)
    }

    loadProjectStatusList = async () => {
        this.setLoadingInitial(true);
        try {            
            this.projectStatusList =  await agent.AppConfigs.loadConfigItems("ProjectStatus");

            debugger;
            this.setLoadingInitial(false);
            return this.projectStatusList;
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    
    loadItems = async () => {
        this.setLoadingInitial(true);
        try {      
            this.projectStatusList =  await agent.AppConfigs.loadConfigItems("ProjectStatus");
                  
            this.itemList =  await agent.ActionTackerTypesLists.list();
            
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
            this.projectStatusList =  await agent.AppConfigs.loadConfigItems("ProjectStatus");
            this.auditLogList =  await agent.AppConfigs.loadAuditLog("ProjectList", id);
            debugger;
            
            this.item =  await agent.ActionTackerTypesLists.details(id);
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

    createItem = async (item: ActionTackerTypesList) => {
        debugger
        this.loading = true;       
        try {
            var newID =  await agent.ActionTackerTypesLists.create(item);
            debugger;
            // runInAction(() => {               
            //     this.editMode = false;
            //     this.loading = false;
            // })
            this.loading = false;
            return newID;
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false
            });
        }
    }

    updateItem = async (item: ActionTackerTypesList) => {
        this.loading = true;
        try {
            debugger
            await agent.ActionTackerTypesLists.update(item)
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
            await agent.ActionTackerTypesLists.delete(id);
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

