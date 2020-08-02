import {SimpleTime} from "../../_utils/data/date.and.time";
import {KeyValue} from "@angular/common";
import {TranscriptPlayer} from "./transcript.player";

/**
 * DTO representing a video's or podcast's transcript.
 */
export class Transcript {
	snippets: Snippet[];
	player: TranscriptPlayer;
	
	constructor() {
		this.snippets = [];
	}
	
	addSnippet(snippet: Snippet) {
		this.snippets.push(snippet);
		//TODO insert snippet, or split snippet
	}
	
	getSnippet(index: number) {
		return this.snippets[index];
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