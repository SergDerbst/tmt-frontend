import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {VideoCreationData, VideoData} from "../video.data";
import {AppConfigService} from "../../../app.config.service";
import {of, ReplaySubject} from "rxjs";

@Injectable()
export class VideoDataService {
	private readonly baseUrl: string;
	
	constructor(private appConfigService: AppConfigService,
	            private httpClient: HttpClient) {
		this.baseUrl = this.appConfigService.apiBaseUrl() + '/content/video';
	}
	
	createVideo(data: VideoCreationData) {
		return this.httpClient.post<VideoData>(this.baseUrl, data);
	}
	
	loadVideo(id: number) {
		return this.httpClient.get<VideoData>(this.baseUrl + '/' + id);
	}
	
	updateVideo(video: VideoData) {
		return this.httpClient.put<VideoData>(this.baseUrl, video);
	}
}