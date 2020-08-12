import {VideoData} from "../video.data";

export const initialVideoState: VideoState = {
	video: undefined
};

export interface VideoState {
	readonly video: VideoData;
}