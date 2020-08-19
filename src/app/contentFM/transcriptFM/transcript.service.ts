import {Injectable} from "@angular/core";
import {TranscriptPlayer} from "./transcript.player";
import {BehaviorSubject} from "rxjs";
import {Snippet, Transcript} from "./transcript.data";

/**
 * Respresents the current status of a transcription during editing or playback.
 */
export enum TranscriptStatus {
	WaitingForPlayer, //player not ready yet, no transcription possible
	ReadyForTranscription, //player is ready, transcription can be started
	ReadyForSnippet, //transcription and playback started, ready to begin snippet
	SnippetTriggered, //snippet start point set, waiting for endpoint
	SnippetEdit, //snippet start and end points set, editing
	SnippetDone//snippet done editing,
}

@Injectable()
export class TranscriptService {
	player: TranscriptPlayer;
	status: TranscriptStatus;
	statusChanged: BehaviorSubject<TranscriptStatus>;
	transcript: Transcript;
	
	constructor() {
		this.status = TranscriptStatus.WaitingForPlayer;
		this.statusChanged = new BehaviorSubject<TranscriptStatus>(TranscriptStatus.WaitingForPlayer);
	}
	
	beginSnippet() {
		let snippet = new Snippet(this.player.currentTime());
		this.transcript.beginSnippet(snippet);
	}
	
	endSnippet() {
		this.transcript.endSnippet(this.player.currentTime());
	}
	
	listenToTime() {
		this.player.listenToTime().subscribe(time => {
			switch (this.status) {
				case TranscriptStatus.ReadyForSnippet:
					this.transcript.currentSnippet().start = time;
					break;
				case TranscriptStatus.SnippetTriggered:
					this.transcript.currentSnippet().end = time;
					break;
			}
		});
	}
	
	setPlayer(transcriptPlayer: TranscriptPlayer) {
		this.player = transcriptPlayer;
	}
	
	setTranscript(transcript: Transcript) {
		this.transcript = transcript;
	}
	
	updateStatus(status: TranscriptStatus) {
		this.status = status;
		this.statusChanged.next(this.status);
	}
}