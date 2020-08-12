export class LoginFormData {
	login: {
		username: string;
		password: string;
	}
	
	constructor(config: {
		username: string,
		password: string,
	}) {
		this.login.username = config.username;
		this.login.password = config.password;
	}
}