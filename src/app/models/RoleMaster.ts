export interface RoleMaster {
	id: string
	name: string
}

export interface RoleUser {
	DisplayName: string;
	Username: string;
	Email?: string;
	PhoneNumber?: string;   
    LockoutEnabled: string;
    IsActive?: string;       
}
