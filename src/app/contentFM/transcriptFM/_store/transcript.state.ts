import {Transcript} from "../transcript.data";

export const initialTransciptState: TranscriptState = {
	transcript: undefined
};

export interface TranscriptState {
	readonly transcript: Transcript;
}