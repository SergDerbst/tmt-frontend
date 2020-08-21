import {Junction, JunctionFactory} from "../../_junction/junction";
import {Keys} from "./keys";
import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class KeysJunctionFactory implements JunctionFactory {
	
	constructor(private readonly keys: Keys) {}
	
	create = (): Junction => {
		return {
			enter: (keyCode: number, handler: () => Observable<any>) => {
				if (this.keys.isEnter(keyCode)) {
					return handler();
				}
				return of();
			}
		}
	}
}
