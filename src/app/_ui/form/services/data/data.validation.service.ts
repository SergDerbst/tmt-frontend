import {Observable} from "rxjs";

export interface DataValidationService<T> {
	
	validate(requestData: { toValidate: T, fieldName: string, url: string}):Observable<Object>;
}