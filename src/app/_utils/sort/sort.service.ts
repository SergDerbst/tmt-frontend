import { Injectable } from '@angular/core';
import {KeyValue} from "@angular/common/common";

@Injectable({
  providedIn: 'root'
})
export class SortService {

  constructor() {}

  designatedOrder = (a: KeyValue<number, any>, b: KeyValue<number, any>): number => {
    return a.value.order - b.value.order;
  };
}
