import {Action} from "@ngrx/store";

export type HeaderActions = FlashHintAction | ReplaceHintAction | UpdateHintFromUrlAction;
export enum HeaderActionTypes {
	FlashHint = '[Header] Flash Hint',
	ReplaceHint = '[Header] Replace Hint',
	SetHintFromUrl = '[Header] Set Hint From Url',
}

/**
 * Replaces the hintKey with the given messageKey.
 * Note: This action triggers an effect, which will dispatch another
 * UpdateHintFromUrlAction from a timeout, so that the
 * flashed hint will be replaced with the standard hint.
 */
export class FlashHintAction implements Action {
	readonly type = HeaderActionTypes.FlashHint;
	constructor(public payload: {
		messageKey: string,
		milliseconds?: number
	}) {}
}

/**
 * Replaces the hintKey with the given messageKey.
 */
export class ReplaceHintAction implements Action {
	readonly type = HeaderActionTypes.ReplaceHint
	
	constructor(public payload: {
		messageKey: string
	}) {}
}

/**
 * Sets the global hintKey from the current router url path.
 */
export class UpdateHintFromUrlAction implements Action {
	readonly type = HeaderActionTypes.SetHintFromUrl;
	constructor(public payload: {
		url: string
	}) {}
}
