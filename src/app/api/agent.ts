import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { User, UserFormValues } from '../models/user';
import { router } from '../router/Routes';
import { store } from '../stores/store';

import { Activity } from '../models/activity';
import { ToDo } from '../models/ToDo';
import { AppConfigType } from '../models/AppConfigType'
import { AppConfig } from '../models/AppConfig';
import { TableName } from '../models/TableName'
import { TableField } from '../models/TableField'
import { DataSecurity } from '../models/DataSecurity'
import { UserManager } from '../models/UserManager'
import { RoleMaster, RoleUser } from '../models/RoleMaster'
//##AgentHeader##

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL //process.env.REACT_APP_API_URL; //"http://localhost:5000/api" //process.env.REACT_APP_API_URL;

try{
    var vevUrl = process.env.REACT_APP_API_URL
    console.log("process.env.REACT_APP_API_URL " + process.env.REACT_APP_API_URL)
}catch{}
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    if (process.env.NODE_ENV === 'development') await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                router.navigate('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401: 
            toast.error('unauthorised')
            break;
        case 403:
            toast.error('forbidden')
            break;
        case 404:
            router.navigate('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;
    }
    return Promise.reject(error);
})

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Activities = {
    list: () => requests.get<Activity[]>(`/activities`),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post<void>(`/activities`, activity),
    update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del<void>(`/activities/${id}`)
}

const ToDos = {
    list: () => requests.get<ToDo[]>(`/ToDos`),
    details: (id: string) => requests.get<ToDo>(`/ToDos/${id}`),
    create: (todo: ToDo) => {
        const { id: _, ...NewTodo } = todo;
        var res = requests.post<number>(`/ToDos`, NewTodo)
        return res
    },
    update: (todo: ToDo) => requests.put<void>(`/ToDos/${todo.id}`, todo),
    delete: (id: string) => requests.del<void>(`/ToDos/${id}`)
}



const AppConfigTypes = {
    list: () => requests.get<AppConfigType[]>(`/AppConfigTypes`),
    details: (id: string) => requests.get<AppConfigType>(`/AppConfigTypes/${id}`),
    create: (todo: AppConfigType) => {
        const { id: _, ...NewTodo } = todo;
        var res = requests.post<number>(`/AppConfigTypes`, NewTodo)
        return res
    },
    update: (todo: AppConfigType) => requests.put<void>(`/AppConfigTypes/${todo.id}`, todo),
    delete: (id: string) => requests.del<void>(`/AppConfigTypes/${id}`)
}

const AppConfigs = {
    list: () => requests.get<AppConfig[]>(`/AppConfigs`),
    details: (id: string) => requests.get<AppConfig>(`/AppConfigs/${id}`),
    create: (item: AppConfig) => {
        const { id: _, ...NewItem } = item;
        var res = requests.post<number>(`/AppConfigs`, NewItem)
        return res
    },
    update: (todo: AppConfig) => requests.put<void>(`/AppConfigs/${todo.id}`, todo),
    delete: (id: string) => requests.del<void>(`/AppConfigs/${id}`)
}



const TableNames = {
    list: () => requests.get<TableName[]>(`/TableNames`),
    details: (id: string) => requests.get<TableName>(`/TableNames/${id}`),
    create: (item: TableName) => {
        const { id: _, ...NewTableName } = item;
        var res = requests.post<number>(`/TableNames`, NewTableName)
        return res
    },
    update: (item: TableName) => requests.put<void>(`/TableNames/${item.id}`, item),
    delete: (id: string) => requests.del<void>(`/TableNames/${id}`)
}




const TableFields = {
    list: () => requests.get<TableField[]>(`/TableFields`),
    details: (id: string) => requests.get<TableField>(`/TableFields/${id}`),
    create: (item: TableField) => {
        const { id: _, ...NewTableField } = item;
        var res = requests.post<number>(`/TableFields`, NewTableField )
        return res
    },
    update: (item: TableField) => requests.put<void>(`/TableFields/${item.id}`, item),
    delete: (id: string) => requests.del<void>(`/TableFields/${id}`)
}


const DataSecuritys = {
    list: () => requests.get<DataSecurity[]>(`/DataSecuritys`),
    details: (id: string) => requests.get<DataSecurity>(`/DataSecuritys/${id}`),
    create: (item: DataSecurity) => {
        const { id: _, ...NewDataSecurity } = item;
        var res = requests.post<number>(`/DataSecuritys`, NewDataSecurity )
        return res
    },
    update: (item: DataSecurity) => requests.put<void>(`/DataSecuritys/${item.id}`, item),
    delete: (id: string) => requests.del<void>(`/DataSecuritys/${id}`)
}


const UserManagers = {
    list: () => requests.get<UserManager[]>(`/UserManagers`),
    details: (id: string) => requests.get<UserManager>(`/UserManagers/${id}`),
    create: (item: UserManager) => {
        const { id: _, ...NewUserManager } = item;
        var res = requests.post<number>(`/UserManagers`, NewUserManager )
        return res
    },
    update: (item: UserManager) => requests.put<void>(`/UserManagers/${item.id}`, item),
    delete: (id: string) => requests.del<void>(`/UserManagers/${id}`)
}


const RoleMasters = {
    list: () => requests.get<RoleMaster[]>(`/RoleMasters`),
    details: (id: string) => {
        debugger
        var res = requests.get<RoleMaster>(`/RoleMasters/${id}`)
        return res
    },//requests.get<RoleMaster>(`/RoleMasters/${id}`),
    create: (item: RoleMaster) => {
        const { id: _, ...NewRoleMaster } = item;
        var res = requests.post<number>(`/RoleMasters`, NewRoleMaster )
        return res
    },
    update: (item: RoleMaster) => requests.put<void>(`/RoleMasters/${item.id}`, item),
    delete: (id: string) => requests.del<void>(`/RoleMasters/${id}`),
    RoleUserList : (id: string) => requests.get<RoleUser[]>(`/RoleUserList/${id}`),
}
//##AgentData##

const Account = {
    current: () => requests.get<User>('account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

const agent = {
    Activities,
    Account,
    ToDos, 
	AppConfigTypes, 
    AppConfigs,
	TableNames, 
	TableFields, 
	DataSecuritys, 
	UserManagers, 
	RoleMasters, 
	//##AgentTitle##
    
}

export default agent;







