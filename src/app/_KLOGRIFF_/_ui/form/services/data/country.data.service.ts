import { Injectable } from '@angular/core';
import { KeyValue } from '@angular/common';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { DataService } from './data.service';
import { AppConfigService } from "../../../../../app.config.service";

@Injectable()
export class CountryDataService implements DataService<string> {

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService
  ) {}

  fetch(requestData: string): Observable<KeyValue<string, string>[]> {
    return this.http.get(this.appConfigService.apiBaseUrl() +
                          '/geo/country/names?typed=' + requestData +
                          '&lang=' + this.appConfigService.appLanguage()) as Observable<KeyValue<string, string>[]>;
  }
}
