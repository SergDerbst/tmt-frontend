import {ContentFilter, ContentType} from "../data/_enums";
import {SearchboxConfig} from "./filter/searchbox/searchbox.config";

export class ContentConfig {
	contentTypes: ContentType[];
	selectedType: ContentType;
	contentFilters: ContentFilter[];
	selectedFilter: ContentFilter;
	searchboxConfig: SearchboxConfig;
	
	constructor(config: {
		contentTypes: ContentType[],
		contentFilters: ContentFilter[],
		searchboxConfig: SearchboxConfig,
	}) {
		this.contentTypes = config.contentTypes;
		this.contentFilters = config.contentFilters;
		this.selectedType = config.contentTypes[0];
		this.selectedFilter = config.contentFilters[0];
		this.searchboxConfig = config.searchboxConfig;
	};
}