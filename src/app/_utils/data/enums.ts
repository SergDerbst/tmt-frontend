export enum DateTimeUnit {
	year = 'year',
	month = 'month',
	day = 'day',
	hour = 'hour',
	minute = 'minute',
	second = 'second',
	milliseconds = 'millisecond',
}

export enum Operator {
	LessThan, MoreThan, EqualTo
}

export enum Direction {
	Left = 'left', Right = 'right', Up = 'up', Down = 'down'
}

export enum Sex {
	Male = 'Male',
	Female = 'Female',
	Other = 'Other'
}

export enum Title {
	Mr = 'MaleTitle',
	Ms = 'FemaleTitle'
}

export enum UserRole {
	Reader = 'Reader',
	Voter = 'Voter',
	Translator = 'Translator',
	Author = 'Author',
	Moderator = 'Moderator',
	Admin = 'Admin',
	Developer = 'Developer',
	God = 'God'
}

export enum ContentType {
	Article = 'article',
	Video = 'video',
	Podcast = 'podcast'
}

export enum ContentFilter {
	Recent = 'recent',
	Unpublished = 'unpublished',
	Published = 'published',
	All = 'all'
}

export enum ContentStatus {
	Created = 'Created',
	InProcess = 'InProcess',
	InReview = 'InReview',
	Reviewed = 'Reviewed',
	Scheduled = 'Scheduled',
	Published = 'Published',
	Unpublished = 'Unpublished'
}