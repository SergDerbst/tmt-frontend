import {VideoState} from "../../videoFM/_store/video.state";
import {ContentFilter, ContentType} from "../../../_utils/data/enums";

/**
 * Content Filter State
 */
export const searchBoxPlaceHolderPrefix = 'content.filter.searchbox.placeholderPrefix.';
export const contentFilters = [
	ContentFilter.Recent,
	ContentFilter.All,
	ContentFilter.Published,
	ContentFilter.Unpublished,
];
export const initialFilterState = {
	placeholderPrefix: searchBoxPlaceHolderPrefix,
	contentFilters: contentFilters,
	selectedFilter: contentFilters[0]
};
export interface ContentFilterState {
	placeholderPrefix: string;
	contentFilters: ContentFilter[];
	selectedFilter: ContentFilter;
}

/**
 * Content Administration State
 */
export const contentTypes = [
	ContentType.Article,
	ContentType.Video,
	ContentType.Podcast,
];
export const initialContentAdminState = {
	contentTypes: contentTypes,
	selectedType: contentTypes[0],
};
export interface ContentTypeState {
	contentTypes: ContentType[];
	selectedType: ContentType;
}

/**
 *  Admin State.
 */
export interface AdminState {
	contentTypeState: ContentTypeState;
	contentFilterState: ContentFilterState;
}
export const initialAdminState = {
	contentTypeState: initialContentAdminState,
	contentFilterState: initialFilterState,
};