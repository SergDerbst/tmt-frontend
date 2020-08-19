import {StrategicReducer} from "../../../_store/reducers/strategic.reducer";
import {VideoActionTypes} from "../../videoFM/_store/video.actions";
import {initialTransciptState} from "./transcript.state";
import {TranscriptActions, TranscriptActionTypes} from "./transcript.actions";

const doNothing = StrategicReducer.doNothing;
const reducer = new StrategicReducer(VideoActionTypes, {
	[TranscriptActionTypes.TranscriptBegin]: beginTranscript,
	__default__: (state, action) => initialTransciptState
})

export const transcriptReducer = (
	state= initialTransciptState,
	action: TranscriptActions
) => {
	let transcriptState = reducer.reduce(state, action);
	return transcriptState;
}

function beginTranscript(state, action) {
	return state; //TODO some more action
}