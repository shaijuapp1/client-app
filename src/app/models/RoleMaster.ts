export interface RoleMaster {
	id: string
	name: string
}

export interface RoleUser {
	displayName: string;
	username: string;
	email?: string;
	phoneNumber?: string;   
    lockoutEnabled: string;
    isActive?: string;       
}

export interface UserRole {
	RoleName: string;
	UserName: string	
}
