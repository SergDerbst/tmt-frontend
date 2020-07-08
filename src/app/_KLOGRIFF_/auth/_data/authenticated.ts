import * as moment from "moment";
import {Sex, Title, UserRole} from "../../../_data/enums";
import {KeyValue} from "@angular/common";

export class Authenticated {
	user: User;
	redirectTo: string;
	
	constructor(config: {
		user: User,
		redirectTo?: string
	}) {
		this.user = config.user;
		this.redirectTo = config.redirectTo || undefined;
	}
}

export class User {
	personalData: PersonalData;
	credentials: Credentials;
	roles: Role[];
	preferredLanguage: string;
	
	constructor(config: {
		personalData: PersonalData,
		credentials: Credentials,
		roles?: Role[],
		preferredLanguage: string
	}) {
		this.personalData = config.personalData;
		this.credentials = config.credentials;
		this.roles = config.roles || [];
		this.preferredLanguage = config.preferredLanguage;
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
	accessToken: string;
	refreshToken: string;
	
	constructor(config: {
		username: string,
		email: string,
		accessToken?: string,
		refreshToken?: string
  }) {
		this.username = config.username;
		this.email = config.email;
		this.accessToken = config.accessToken || undefined;
		this.refreshToken = config.refreshToken || undefined;
	}
}

export class Role {
	id: number;
	name: UserRole;
	permissions: Permission[];
	
	constructor(config: {
		id?: number,
		name: UserRole,
		permissions?: Permission[]
	}) {
		this.id = config.id || null;
		this.name = config.name;
		this.permissions = config.permissions || []
	}
}

export class Permission {
	id: number;
	name: string;
	configuration: KeyValue<string, string>[];
	
	constructor(config: {
		id?: number,
		name: string,
		configuration?: KeyValue<string, string>[]
	}) {
		this.id = config.id || null;
		this.name = config.name;
		this.configuration = config.configuration || [];
	}
}