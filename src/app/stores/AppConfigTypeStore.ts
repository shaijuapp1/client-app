import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';
import { ActionTask } from "../models/ActionTask";
import { AppConfigType } from "../models/AppConfigType";

export default class AppConfigTypeStore {

    activityRegistry = new Map<string, AppConfigType>();
    selectedActivity?: ActionTask = undefined;

    editMode = false;
    loading = false;
    loadingInitial = false;
    itemList: AppConfigType[] = [];
    item?: AppConfigType = undefined;

    constructor() {
        makeAutoObservable(this)
    }
    
    loadItems = async () => {
        this.setLoadingInitial(true);
        try {            
            this.itemList =  await agent.AppConfigTypes.list();            
            this.setLoadingInitial(false);
            return this.itemList
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadItem = async (id: string) => {
        this.setLoadingInitial(true);
        try {            
            this.item =  await agent.AppConfigTypes.details(id);
            //debugger;
            this.loading = false;
            this.setLoadingInitial(false);
            return this.item;
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
        //this.loading = false;  
    }

    createItem = async (item: AppConfigType) => {
        debugger
        this.loading = true;       
        try {
            var newID =  await agent.AppConfigTypes.create(item);
            //debugger;
            // runInAction(() => {               
            //     this.editMode = false;
            //     this.loading = false;
            // })
            return newID;
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    updateItem = async (item: AppConfigType) => {
        this.loading = true;
        try {
            debugger
            await agent.AppConfigTypes.update(item)
            this.setLoadingInitial(false);
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
            await agent.AppConfigTypes.delete(id);
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

