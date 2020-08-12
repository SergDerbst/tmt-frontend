import {VideoState} from "../videoFM/_store/video.state";
import {ContentConfig} from "../content.config";
import {ContentFilter, ContentType} from "../../_utils/data/enums";
import {SearchboxConfig} from "../filter/searchbox/searchbox.config";

export const searchBoxPlaceHolderPrefix = 'content.filter.searchbox.placeholderPrefix.';

export const initialContentState = {
	contentConfig: new ContentConfig({
		contentTypes: [
			ContentType.Article,
			ContentType.Video,
			ContentType.Podcast
		],
		contentFilters: [
			ContentFilter.All,
			ContentFilter.Recent,
			ContentFilter.Published,
			ContentFilter.Unpublished
		],
		searchboxConfig: new SearchboxConfig({
			placeholderPrefix: searchBoxPlaceHolderPrefix,
			contentType: ContentType.Article,
			contentFilter: ContentFilter.Recent
		})
	}),
	videoState: undefined
};

export interface ContentState {
	contentConfig: ContentConfig;
	videoState: VideoState;
}