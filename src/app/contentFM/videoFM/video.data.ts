import {User} from "../../authFM/auth.data";
import {ContentStatus, ContentType} from "../../_utils/data/enums";
import {ContentData, ContentHeader, ContentMetadata} from "../content.data";
import {Transcript} from "../transcriptFM/transcript.data";

export interface VideoCreateData {
	title: string,
	url: string
}

export class VideoData extends ContentData<VideoHeader, VideoMetadata> {
	header: VideoHeader;
	metadata: VideoMetadata;
	transcript: Transcript;
	
	constructor(config: {
		header: VideoHeader,
		metadata: VideoMetadata,
		transcript: Transcript
	}) {
		super(config);
		this.transcript = config.transcript || new Transcript();
	}
}

export class VideoHeader extends ContentHeader {
	title: string;
	url: string;
	domain: VideoDomain;
	videoId: string;
	
	constructor(config: {
		id: number;
		owner: User;
		createdAt?: Date;
		publishedAt?: Date;
		status: ContentStatus;
		type: ContentType,
		title: string;
		url: string;
	}) {
		super(config);
		this.title = config.title;
		this.url = config.url;
	}
}

export class VideoMetadata extends ContentMetadata {
	
	constructor(config: {
		description: string;
	}) {
		super(config);
	}
}

export class VideoCreationData {
	title: string;
	url: string;
	
	constructor(title: string, url: string) {
		this.title = title;
		this.url = url;
	}
}

export enum VideoDomain {
	Youtube = 'youtube.com'
}