import {ContentFilter, ContentType} from "../../../_utils/data/enums";

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