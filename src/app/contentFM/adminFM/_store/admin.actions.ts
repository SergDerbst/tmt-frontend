import {Action} from "@ngrx/store";

export type AdminActions = ContentSelectContentTypeAction;

export enum ContentActionTypes {
	SelectContentType = '[Content] Select Type',
	SelectFilterType = '[Content] Select Filter',
}

export class ContentSelectContentTypeAction implements Action {
	type = ContentActionTypes.SelectContentType;
	constructor(public payload: { index: number }) {}
}

export class ContentSelectContentFilterAction implements Action {
	type = ContentActionTypes.SelectFilterType;
	constructor(public payload: { index: number }) {}
}