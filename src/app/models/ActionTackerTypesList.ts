export interface ActionTackerTypesList {
	id: string
	title: string
	typeID: string
	actionType: string
	ParentID: string
	startDate: Date | null
	endDate:  Date | null
	statusId: string
	actionCreaedBy?: string
	actionCreatedTime?: string
	detailsJson: string
	actionTitle?: string
	actionComment?: string
	projectOwner?: string
	stakeHoldersList?: string[]
	ActionModifiedTime?:  Date | null

}
