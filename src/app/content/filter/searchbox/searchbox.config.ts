import {ContentFilter, ContentType} from "../../../_data/_enums";

export class SearchboxConfig {
	placeholderPrefix: string;
	contentType: ContentType;
	contentFilter: ContentFilter;
	
	constructor(config: {
		placeholderPrefix: string,
		contentType: ContentType,
		contentFilter: ContentFilter
	}) {
		this.placeholderPrefix = config.placeholderPrefix;
		this.contentType = config.contentType;
		this.contentFilter = config.contentFilter;
	}
}