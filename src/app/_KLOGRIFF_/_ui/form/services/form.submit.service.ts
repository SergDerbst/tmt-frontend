import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

import { AppConfigService } from "../../../../app.config.service";

export declare interface SubmitFn {
	(requestData: {}, path:string, method?:string): void;
}

@Injectable()
export class FormSubmitService  {
	
	constructor(
		private http: HttpClient,
		private appConfigService: AppConfigService) {}
	
	submit(requestData: {}, path:string, method?:string):Observable<Object> {
		const data = this.prepareData(requestData);
		return this.http.post(this.appConfigService.apiBaseUrl() + path, data);
	}
	
	private prepareData(data: {}):any {
		let preparedData = {};
		Object.keys(data).forEach((key:string) => {
			preparedData[this.prepareKey(key)] = this.prepareValue(data[key]);
		});
		
		return preparedData;
	}
	
	private prepareValue(data: any) {
		if(!data) {
			return data;
		} else if (data instanceof Array) {
			return this.prepareArray(data);
		} else if (typeof data === 'object') {
			return this.prepareData(data);
		} else {
			return data;
		}
	}
	
	private prepareArray(data: Array<any>) {
		let array = [];
		for (let i = 0, len = data.length; i < len; i++) {
			array.push(this.prepareData(data[i]));
		}
		return array;
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