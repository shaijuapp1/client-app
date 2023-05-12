export interface ActionTackerTaskList {
	id: string
	parentID: string
	statusId: string
	title: string
	description: string
	taskType: string	
	startDate: Date | null
	complectionDate: Date | null
	actualComplectionDate: Date | null			
	responsibilityList?: string[]
	stakeholderList?: string[]
	detailsJson: string
	actionTitle?: string
	actionComment?: string
	modifiedDate?: Date | null

}
