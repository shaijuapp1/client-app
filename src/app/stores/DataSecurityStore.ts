import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';
import { ActionTask } from "../models/ActionTask";
import { DataSecurity } from "../models/DataSecurity";

export default class DataSecurityStore {

    activityRegistry = new Map<string, DataSecurity>();
    selectedActivity?: ActionTask = undefined;

    editMode = false;
    loading = false;
    loadingInitial = false;
    itemList: DataSecurity[] = [];
    item?: DataSecurity = undefined;

    constructor() {
        makeAutoObservable(this)
    }
    
    loadItems = async () => {
        this.setLoadingInitial(true);
        try {            
            this.itemList =  await agent.DataSecuritys.list();;
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
            this.item =  await agent.DataSecuritys.details(id);
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

    createItem = async (item: DataSecurity) => {
        debugger
        this.loading = true;       
        try {
            var newID =  await agent.DataSecuritys.create(item);
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

    updateItem = async (item: DataSecurity) => {
        this.loading = true;
        try {
            debugger
            await agent.DataSecuritys.update(item)
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
            await agent.DataSecuritys.delete(id);
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

