import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';
import { ActionTask } from "../models/ActionTask";
import { TableName } from "../models/TableName";

export default class TableNameStore {

    activityRegistry = new Map<string, TableName>();
    selectedActivity?: ActionTask = undefined;

    editMode = false;
    loading = false;
    loadingInitial = false;
    itemList: TableName[] = [];
    item?: TableName = undefined;

    constructor() {
        makeAutoObservable(this)
    } 
    
    loadItems = async () => {
        this.setLoadingInitial(true);
        try {            
            this.itemList =  await agent.TableNames.list();;
            this.setLoadingInitial(false);
            return this.itemList;
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadItem = async (id: string) => {
        this.setLoadingInitial(true);
        try {            
            this.item =  await agent.TableNames.details(id);
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

    createItem = async (item: TableName) => {
        debugger
        this.loading = true;       
        try {
            var newID =  await agent.TableNames.create(item);
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

    updateItem = async (item: TableName) => {
        this.loading = true;
        try {
            debugger
            await agent.TableNames.update(item)
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
            await agent.TableNames.delete(id);
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

