import {Injectable} from "@angular/core";
import {JwtHelperService} from "@auth0/angular-jwt";
import {RegisterFormData} from "./register/register.form.data";
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "../app.config.service";
import {LoginFormData} from "./login/login.form.data";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {
	
	constructor(private appConfigService: AppConfigService,
	            private http: HttpClient,
	            private jwtHelper: JwtHelperService) {}
	public isAuthenticated(): boolean {
		const token = localStorage.getItem('tmt-token');
		return !this.jwtHelper.isTokenExpired(token);
	}
	
	public register(data: RegisterFormData) {
		return this.http.post(this.appConfigService.apiBaseUrl() + '/auth/register', data);
	}
	
	public login(data: LoginFormData) {
		return this.http.post(this.appConfigService.apiBaseUrl() + '/auth/login', data.login, {
			observe: 'response'
		});
	}
}