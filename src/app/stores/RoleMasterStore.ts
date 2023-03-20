import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';
import { ActionTask } from "../models/ActionTask";
import { RoleMaster, RoleUser } from "../models/RoleMaster";

export default class RoleMasterStore {

    activityRegistry = new Map<string, RoleMaster>();
    selectedActivity?: ActionTask = undefined;

    editMode = false;
    loading = false;
    loadingInitial = false;
    itemList: RoleMaster[] = [];
    item?: RoleMaster = undefined;

    roleUserList: RoleUser[] = [];

    constructor() {
        makeAutoObservable(this)
    }
    
    loadItems = async () => {
        this.setLoadingInitial(true);
        try {            
            this.itemList =  await agent.RoleMasters.list();;
            this.setLoadingInitial(false);
            return this.itemList;
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    refreshAllRoles = async () => {
        debugger;
        if( this.itemList.length > 0){
            return this.itemList;
        }
        else{
            return this.loadItems()          
        }        
    }



    loadItem = async (id: string) => {
        this.setLoadingInitial(true);
        try {            
            this.item =  await agent.RoleMasters.details(id);
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

    createItem = async (item: RoleMaster) => {
        debugger
        this.loading = true;       
        try {
            var newID =  await agent.RoleMasters.create(item);
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

    updateItem = async (item: RoleMaster) => {
        this.loading = true;
        try {
            debugger
            await agent.RoleMasters.update(item)
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
            await agent.RoleMasters.delete(id);
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

    GroupUserList = async (id: string) => {
        this.setLoadingInitial(true);
        try {            
            this.roleUserList =  await agent.RoleMasters.RoleUserList(id);
            this.setLoadingInitial(false);
            return this.roleUserList;
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

}

