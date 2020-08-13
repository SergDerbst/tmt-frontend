import {VideoData, VideoHeader, VideoMetadata} from "../video.data";
import {Transcript} from "../../transcriptFM/transcript.data";

export const initialVideoState: VideoState = {
	video: undefined
};

export interface VideoState {
	readonly video: VideoData;
}