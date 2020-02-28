import { Observable } from "rxjs";

export interface FormSubmitService  {
	submit(requestData: {}): Observable<any>;
}