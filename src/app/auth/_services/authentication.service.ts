import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {User} from "../_data/authenticated";
import {HttpClient} from "@angular/common/http";
import {DataValidationService} from "../../_ui/form/services/data/data.validation.service";
import {AppConfigService} from "../../app.config.service";

@Injectable()
export class AuthenticationService implements DataValidationService<string> {
	execChange: Subject<User> = new Subject<User>();
	
	constructor(private http: HttpClient,
	            private appConfigService: AppConfigService) {}
	
	update(data: User) {
		this.execChange.next(data);
	}
	
	validate(requestData: { toValidate: string; fieldName: string; url: string }): Observable<Object> {
		return this.http.post(this.appConfigService.apiBaseUrl() + requestData.url, { [requestData.fieldName]: requestData.toValidate });
	}
}