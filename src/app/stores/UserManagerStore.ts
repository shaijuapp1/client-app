import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';
import { ActionTask } from "../models/ActionTask";
import { UserManager } from "../models/UserManager";

export default class UserManagerStore {

    activityRegistry = new Map<string, UserManager>();
    selectedActivity?: ActionTask = undefined;

    editMode = false;
    loading = false;
    loadingInitial = false;
    itemList: UserManager[] = [];
    item?: UserManager = undefined;

    constructor() {
        makeAutoObservable(this)
    }
    
    loadItems = async () => {
        this.setLoadingInitial(true);
        try {            
            this.itemList =  await agent.UserManagers.list();;
            this.setLoadingInitial(false);
            return this.item;
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    refreshAllUsers = async () => {
        //debugger;
        if( this.itemList.length > 0){
            return this.itemList;
        }
        else{
            this.setLoadingInitial(true);
            try {            
                this.itemList =  await agent.UserManagers.list();
                this.setLoadingInitial(false);
                return this.itemList;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    loadItem = async (id: string) => {
        this.setLoadingInitial(true);
        try {            
            this.item =  await agent.UserManagers.details(id);
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

    createItem = async (item: UserManager) => {
        debugger
        this.loading = true;       
        try {
            var newID =  await agent.UserManagers.create(item);
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

    updateItem = async (item: UserManager) => {
        this.loading = true;
        try {
            debugger
            await agent.UserManagers.update(item)
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
            await agent.UserManagers.delete(id);
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

