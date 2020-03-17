import {Injectable} from "@angular/core";
import {KeycloakAuthGuard, KeycloakService} from "keycloak-angular";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService extends KeycloakAuthGuard implements CanActivate {
	
	constructor(protected router: Router,
	            protected keycloakService: KeycloakService) {
		super(router, keycloakService);
	}
	
	isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
		return new Promise<boolean|UrlTree>((resolve, reject) => {
			if (!this.authenticated) {
				this.keycloakService.login().catch((e) => {
					throw new Error(e)
				});
				return reject(false);
			}
			
			const requiredRoles:string[] = route.data.roles;
			if (!requiredRoles || requiredRoles.length === 0)  {
				return resolve(true);
			} else {
				if (!this.roles || this.roles.length === 0) {
					resolve(false);
				}
				resolve(requiredRoles.every(role => this.roles.indexOf(role) > -1));
			}
		});
	}
}