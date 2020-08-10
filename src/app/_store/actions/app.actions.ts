import {Action} from "@ngrx/store";

export type AppActions = DoNothingAction;
export enum AppActionTypes {
	DoNothing = '[App] Do Nothing',
}

/**
 * An action that does absolutely nothing at all.
 */
export class DoNothingAction implements Action {
	readonly type = AppActionTypes.DoNothing;
}