export interface TableField {
	id: string
	tableId: string
	title: string
	filedType: string
	dataSecurityId?: string
	required?: boolean
	customValidationId?: string
}
