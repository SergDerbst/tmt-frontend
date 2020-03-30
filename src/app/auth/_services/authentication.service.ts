import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {User} from "../_data/authenticated";

@Injectable()
export class AuthenticationService {
	execChange: Subject<User> = new Subject<User>();
	
	update(data: User) {
		this.execChange.next(data);
	}
}