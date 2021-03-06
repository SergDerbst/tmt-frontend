import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthRouteGuard implements CanActivate {
	
	constructor(private auth: AuthService,
	            private router: Router) {}
	
	canActivate(route: ActivatedRouteSnapshot,
	            state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (!this.auth.isAuthenticated()) {
			let p = this.router.navigate(['auth/login']);
			return false;
		}
		return true;
	}
}