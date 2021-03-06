import {initialVideoState} from "./video.state";
import {VideoActions, VideoActionTypes} from "./video.actions";
import {StrategicReducer} from "../../../_store/reducers/strategic.reducer";

const doNothing = StrategicReducer.doNothing;
const reducer = new StrategicReducer(VideoActionTypes, {
	[VideoActionTypes.VideoLoad]: doNothing,
	[VideoActionTypes.VideoPut]: putVideo,
	[VideoActionTypes.VideoPrepareForPlayer]: prepareVideoPlayer,
	__default__: (state, action) => initialVideoState
});

export const videoReducer = (
	state = initialVideoState,
	action: VideoActions
) => {
	let videoState = reducer.reduce(state, action);
	return videoState;
}

function putVideo(state, action)  {
	return {
		...state,
		video: action.payload.video
	};
}

function prepareVideoPlayer(state, action) {
	return {
		...state,
		video: {
			...state.video,
			header: {
				...state.video.header,
				domain: action.payload.domain,
				videoId: action.payload.videoId,
			}
		}
	};
}