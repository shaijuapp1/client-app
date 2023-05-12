import { format } from "date-fns";
import { number } from "yup";
import { AppConfig } from "../../models/AppConfig";
import { RoleMaster } from "../../models/RoleMaster";
import { UserManager } from "../../models/UserManager";

export default class comFun {


    public static dateFormate = (date?: Date | null) : string => {
        let ret:  string  = ""
        if(date){
            ret = format(new Date(date), "dd-MMM-yy");
        }
        return ret;
    }

    public static dateTimeFormate = (date: Date) => {
        return format(new Date(date), "dd-MMM-yyyy h:mm aa");
    }

    public static dateFormateString = (date: string) => {
        return format(new Date(date), "dd-MMM-yyyy");
    }

    public static dateTimeFormateString = (date: string) => {
        return format(new Date(date), "dd-MMM-yyyy h:mm aa");
    }
    
    public static setDate = (dt?: Date | null): Date  | null => {
        let ret:  Date | null = null

        if(dt){
            ret = new Date(Date.UTC(
                dt.getFullYear(), 
                dt.getMonth(), 
                dt.getDate()));
        }    
        
        return ret;
    }

    //User Functions comFun.GetUserName
    public static GetUserName = (userId: string, userList?:UserManager[]) => {
        var res = null;
        if(userList && userList?.length>0){
            for(var i=0;i<userList.length;i++){
                if(userList[i].id == userId){
                    res = userList[i];
                    break;
                }
            }
        }      
        return res;
    }

    //User Functions comFun.GetUserNameFromList
    public static GetUserNameFromList = (selUser?:string[], userList?:UserManager[], roleList?:RoleMaster[]) => {
        var res = "";
        if(selUser && userList && userList?.length>0){
            
            selUser.forEach(uId => {
                var uid = uId.replace("U:", "")
                uid = uid.replace("G:", "")

                for(var i=0;i<userList.length;i++){
                    if(userList[i].id == uid){
                        if(res){
                            res += ", "
                        }
                        res += userList[i].displayName
                        break;
                    }
                }

                if(roleList){
                    for(var i=0;i<roleList.length;i++){
                        if(roleList[i].id == uid){
                            if(res){
                                res += ", "
                            }
                            res += roleList[i].name
                            break;
                        }
                    }
                }
                
            })            
        }      
        return res;
    }

    //Config  comFun.getConfigArray(taskStatusList)
    public static getConfigArray = (cArr: AppConfig[]): any  => {
        var ret = cArr.reduce(function(acc:any, cur, i) {
            acc[cur.id] = cur.title;
            return acc;
        }, {});
        return ret;
    }

}