import {SimpleTime} from "../../_utils/data/date.and.time";
import {KeyValue} from "@angular/common";
import {TranscriptPlayer} from "./transcript.player";
import {VideoDomain} from "../videoFM/video.data";

/**
 * DTO representing a video's or podcast's transcript.
 */
export class Transcript {
	snippets: Snippet[];
	current: number;
	
	constructor() {
		this.snippets = [];
		this.current = -1;
	}
	
	beginSnippet(snippet: Snippet): void {
		if (this.current <= 0) {
			this.snippets.push(snippet);
			this.current = 0;
		}
		//TODO insert snippet, or split snippet, sort snippets, all that jazz
	}
	
	endSnippet(endTime: SimpleTime) {
		if (this.current >= 0) {
			this.snippets[this.current].end = endTime;
		}
	}
	
	getSnippet(index: number) {
		return this.snippets[index];
	}
	
	currentSnippet() {
		return this.snippets[this.current];
	}
}

/**
 * DTO representing a single unit of a transcript.
 */
export class Snippet {
	start: SimpleTime;
	end: SimpleTime;
	text: string;
	properties: SnippetProperties;
	comment: TranscribersComment;
	
	constructor(start: SimpleTime) {
		this.start = start;
		this.text = '';
		this.properties = new SnippetProperties();
		this.comment = new TranscribersComment();
	}
}

/**
 * DTO representing properties of a Snippet.
 */
export class SnippetProperties {
	speaker: string;
	style: string;
	properties: KeyValue<string, string>[];
	
	constructor() {
		this.properties = [];
	}
}

/**
 * DTO representing a transcriber's comment on the Snippet.
 */
export class TranscribersComment {
	text: string;
}