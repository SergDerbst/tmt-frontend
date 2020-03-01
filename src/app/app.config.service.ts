import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AppConfigService {
	private appConfig: any;
	
	constructor(private http: HttpClient) {}
	
	loadConfig() {
		return this.http.get('/assets/tmt.config.json')
			.toPromise()
			.then(data => {
				this.appConfig = data;
			});
	}
	
	apiBaseUrl() {
		if (!this.appConfig) {
			this.loadConfig().then(data => {
				if (!this.appConfig) {
					throw Error('Config file could not be loaded, bitch!');
				}
			});
		}
		return this.appConfig.apiBaseUrl;
	}
}