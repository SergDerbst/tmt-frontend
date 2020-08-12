import {initialVideoState} from "./video.state";
import {VideoActions, VideoActionTypes} from "./video.actions";
import {ContentStatus} from "../../../_utils/data/enums";
import {Transcript} from "../../transcriptFM/transcript.data";
import {VideoData} from "../video.data";

export const videoReducer = (
	state = initialVideoState,
	action: VideoActions
) => {
	switch(action.type) {
		case VideoActionTypes.VideoInitializeComponent:
			return state;
		case VideoActionTypes.VideoLoadedSuccess:
			return {
				...state,
				video: prepareVideo(action.payload.video)
			}
		case VideoActionTypes.VideoLoadedError:
			return state;
			//TODO create error effect (redirect or error message and shit)
		default:
			return state;
	}
}

function prepareVideo(video: VideoData) {
	if (video.header.status === ContentStatus.Created) {
		video.header.status = ContentStatus.InProcess;
	}
	if (!video.transcript) {
		video.transcript = new Transcript();
	}
	return video;
}