import {Socket, SocketFactory} from "../../_patchbay/patchbay";
import {Keys} from "./keys";
import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class KeysSocketFactory implements SocketFactory {
	
	constructor(private readonly keys: Keys) {}
	
	create = (): Socket => {
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
