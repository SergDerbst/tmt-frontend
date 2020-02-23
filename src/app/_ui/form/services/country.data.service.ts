import { Injectable } from '@angular/core';
import { KeyValue } from '@angular/common';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { DataService } from './data.service';

@Injectable()
export class CountryDataService implements DataService<string> {

  constructor(private http: HttpClient) {}

  fetch(requestData: string): Observable<KeyValue<string, string>[]> {
    return this.http.get('http://localhost:8080/geo/country/names?typed=' + requestData) as Observable<KeyValue<string, string>[]>;
  }
}
