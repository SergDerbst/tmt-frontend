import {initialVideoState} from "./video.state";
import {VideoActions, VideoActionTypes} from "./video.actions";
import {ContentStatus} from "../../../_utils/data/enums";
import {Transcript} from "../../transcriptFM/transcript.data";
import {VideoData} from "../video.data";
import {StrategicReducer} from "../../../_store/reducers/strategic.reducer";

const reducer = new StrategicReducer(VideoActionTypes, {
	[VideoActionTypes.VideoCreate]: createVideo,
	[VideoActionTypes.VideoCreatedSuccess]: handleVideoCreatedSuccess,
	[VideoActionTypes.VideoCreatedError]: handleVideoCreatedError,
	[VideoActionTypes.VideoInitializeEditComponent]: initializeEditVideoState,
	[VideoActionTypes.VideoLoadedSuccess]: handleVideoLoadedSuccess,
	[VideoActionTypes.VideoLoadedError]: handleVideoLoadedError,
	__default__: (state, action) => initialVideoState
});

export const videoReducer = (
	state = initialVideoState,
	action: VideoActions
) => {
	return reducer.reduce(state, action);
}

function createVideo(state, action) {
	return state; //the real 'action' happens in effect
}

function handleVideoCreatedSuccess(state, action) {
	return {
		...state,
		video: action.payload
	}
}

function handleVideoCreatedError(state, action) {
	return state;
	//TODO create error effect (redirect or error message and shit)
}

function initializeEditVideoState(state, action) {
	return state;
}

function handleVideoLoadedSuccess(state, action)  {
	return {
		...state,
		video: prepareVideoForEdit(action.payload.video)
	};
	
	function prepareVideoForEdit(video: VideoData) {
		if (video.header.status === ContentStatus.Created) {
			video.header.status = ContentStatus.InProcess;
		}
		if (!video.transcript) {
			video.transcript = new Transcript();
		}
		return video;
	}
}

function handleVideoLoadedError(state, action) {
	return state;
	//TODO create error effect (redirect or error message and shit)
}
