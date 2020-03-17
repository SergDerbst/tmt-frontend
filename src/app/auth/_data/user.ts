import * as moment from "moment";
import {Sex, Title, UserRole} from "../../_data/_enums";

export class User {
	personalData: PersonalData;
	credentials: Credentials;
	roles: UserRole[];
	constructor(config: {
		personalData: PersonalData
	}) {
		this.personalData = config.personalData;
	}
}

export class PersonalData {
	title: Title;
	firstName: string;
	middleNames: string;
	lastName: string;
	dayOfBirth: moment.Moment;
	sex: Sex;
	constructor(config: {
		title: Title,
		firstName: string,
		middleNames?: string,
		lastName: string,
		dayOfBirth: moment.Moment;
		sex: Sex
	}) {
		this.title = config.title;
		this.firstName = config.firstName;
		this.middleNames = config.middleNames || '';
		this.lastName = config.lastName;
		this.dayOfBirth = config.dayOfBirth;
		this.sex = config.sex;
	}
}

export class Credentials {
	username: string;
	email: string;
}
