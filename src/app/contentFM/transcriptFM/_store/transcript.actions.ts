import {Action} from "@ngrx/store";

export type TranscriptActions =
	TranscriptBeginAction;

export enum TranscriptActionTypes {
	TranscriptBegin = '[Transcript] Begin'
}

export class TranscriptBeginAction implements Action {
	readonly type = TranscriptActionTypes.TranscriptBegin;
}