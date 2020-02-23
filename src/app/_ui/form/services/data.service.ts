import { KeyValue } from '@angular/common';
import { Observable } from 'rxjs';

export interface DataService<Q> {

	fetch(requestData: Q): Observable<KeyValue<string, string>[]>;
}