import {SimpleDate} from "../../_utils/data/date.and.time";
import {Sex, Title} from "../../_utils/data/enums";

export class RegisterFormData {
	id: number;
	credentials: {
		email: string;
		emailConfirm: string;
		password: string;
		passwordConfirm: string;
		username: string;
	};
	personalData: {
		dayOfBirth: SimpleDate,
		firstName: string,
		lastName: string,
		middleName: string,
		sex: Sex,
		title: Title
	};
	
	constructor(config: {
		id?: number;
		credentials: {
			email: string;
			emailConfirm: string;
			password: string;
			passwordConfirm: string;
			username: string;
		},
		personalData: {
			dayOfBirth: SimpleDate,
			firstName: string,
			lastName: string,
			middleName: string,
			sex: Sex,
			title: Title
		}
	}) {
		this.id = config.id || null;
		this.credentials = config.credentials;
		this.personalData = config.personalData;
	}
}