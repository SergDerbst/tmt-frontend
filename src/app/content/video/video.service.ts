import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {VideoCreationData} from "./video.data";
import {AppConfigService} from "../../app.config.service";

@Injectable()
export class VideoService {
	
	constructor(private appConfigService: AppConfigService,
	            private httpClient: HttpClient) {}
	
	createVideo(data: VideoCreationData) {
		return this.httpClient.post(this.appConfigService.apiBaseUrl() + '/content/video/create', data);
	}
}