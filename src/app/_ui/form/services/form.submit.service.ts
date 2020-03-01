import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

import { AppConfigService } from "../../../app.config.service";

@Injectable()
export class FormSubmitService  {
	
	constructor(
		private http: HttpClient,
		private appConfigService: AppConfigService) {}
	
	submit(requestData: {}, path:string, method?:string): Observable<any> {
		return this.http.post(this.appConfigService.apiBaseUrl() + path, this.prepareData(requestData));
	}
	
	private prepareData(data: {}):any {
		let preparedData = {};
		Object.keys(data).forEach((key:string) => {
			preparedData[this.prepareKey(key)] = typeof data[key] === 'object' ?
				this.prepareData(data[key]) : data[key];
		});
		return preparedData;
	}
	
	private prepareKey(key: string):string {
		let split = key.split('\\.');
		let nKey = split[0];
		for (let i = 1, len = split.length; i < len; i++) {
			nKey = nKey + split[i].toUpperCase();
		}
		return key;
	}
}