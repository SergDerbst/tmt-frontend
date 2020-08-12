import {Action} from "@ngrx/store";

export type ContentActions = ContentInitializeComponentAction;

export enum ContentActionTypes {
	ContentInitializeComponentAction = '[Content] Initialize Component',
}

export class ContentInitializeComponentAction implements Action {
	type = ContentActionTypes.ContentInitializeComponentAction;
}