import {Injectable} from "@angular/core";
import {TranscriptPlayer} from "./transcript.player";
import {BehaviorSubject} from "rxjs";

/**
 * Respresents the current status of a transcription during editing or playback.
 */
export enum TranscriptStatus {
	WaitingForPlayer, //player not ready yet, no transcription possible
	ReadyForTranscription, //player is ready, transcription can be started
	ReadyForSnippet, //transcription and playback started, ready to begin snippet
	SnippetTriggered, //snippet start point set, waiting for endpoint
	SnippetEdit, //snippet start and end points set, editing
}

/**
 * Central service to handle status and playback of transcription among different compoents.
 */
@Injectable()
export class TranscriptService {
	player: TranscriptPlayer;
	status: TranscriptStatus;
	statusChanged: BehaviorSubject<TranscriptStatus>;
	
	constructor() {
		this.status = TranscriptStatus.WaitingForPlayer;
		this.statusChanged = new BehaviorSubject<TranscriptStatus>(TranscriptStatus.WaitingForPlayer);
	}
	
	setPlayer(transcriptPlayer: TranscriptPlayer) {
		this.player = transcriptPlayer;
	}
	
	updateStatus(status: TranscriptStatus) {
		this.status = status;
		this.statusChanged.next(this.status);
	}
}