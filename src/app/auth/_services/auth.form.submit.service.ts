import { FormSubmitService } from "../../_ui/form/_services/form.submit.service";
import { Observable } from "rxjs";

export class AuthFormSubmitService implements FormSubmitService {
	submit(requestData: {}, target?:string): Observable<any> {
		console.log('arsch kauptt');
		console.log(requestData);
		return undefined;
	}
}