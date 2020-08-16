import {initialVideoState} from "./video.state";
import {VideoActions, VideoActionTypes} from "./video.actions";
import {StrategicReducer} from "../../../_store/reducers/strategic.reducer";

const doNothing = StrategicReducer.doNothing;
	const reducer = new StrategicReducer(VideoActionTypes, {
		[VideoActionTypes.VideoCreate]: doNothing,
	[VideoActionTypes.VideoCreatedSuccess]: handleVideoCreatedSuccess,
	[VideoActionTypes.VideoCreatedError]: handleVideoCreatedError,
	[VideoActionTypes.VideoLoad]: doNothing,
	[VideoActionTypes.VideoLoadedSuccess]: handleVideoLoadedSuccess,
	[VideoActionTypes.VideoLoadedError]: handleVideoLoadedError,
	__default__: (state, action) => initialVideoState
});

export const videoReducer = (
	state = initialVideoState,
	action: VideoActions
) => {
	let videoState = reducer.reduce(state, action);
	console.log('reduced: ', videoState);
	return videoState;
}

function handleVideoCreatedSuccess(state, action) {
	return {
		...state,
		video: action.payload.video
	}
}

function handleVideoCreatedError(state, action) {
	return state;
	//TODO create error effect (redirect or error message and shit)
}

function handleVideoLoadedSuccess(state, action)  {
	console.log('arsch mit keks', state, action.payload.video, {
		...state,
		video: action.payload.video
	});
	return {
		...state,
		video: action.payload.video
	};
}

function handleVideoLoadedError(state, action) {
	return state;
	//TODO create error effect (redirect or error message and shit)
}
