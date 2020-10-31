import {Injectable} from "@angular/core";
import {TranscriptPlayer} from "./transcript.player";
import {BehaviorSubject} from "rxjs";
import {Snippet, Transcript} from "./transcript.data";
import {VideoDomain} from "../videoFM/video.data";
import {YoutubePlayer} from "../videoFM/edit/player/youtube/youtube.player";

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
	private readonly players: { [key: string]: TranscriptPlayer };
	private domain: VideoDomain;
	private transcriptPlayer: TranscriptPlayer;
	status: TranscriptStatus;
	statusChanged: BehaviorSubject<TranscriptStatus>;
	transcript: Transcript;
	
	constructor(private readonly youtubePlayer: YoutubePlayer) {
		this.status = TranscriptStatus.WaitingForPlayer;
		this.statusChanged = new BehaviorSubject<TranscriptStatus>(TranscriptStatus.WaitingForPlayer);
		this.players = { [VideoDomain.Youtube]: youtubePlayer	};
	}
	
	beginSnippet() {
		let snippet = new Snippet(this.player().currentTime());
		this.transcript.beginSnippet(snippet);
	}
	
	endSnippet() {
		this.transcript.endSnippet(this.player().currentTime());
	}
	
	listenToTime() {
		this.player().listenToTime().subscribe(time => {
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
		this.transcriptPlayer = transcriptPlayer;
	}
	
	startPlayback() {
		this.transcriptPlayer.startPlayback();
	}
	
	updateStatus(status: TranscriptStatus) {
		this.status = status;
		this.statusChanged.next(this.status);
	}
	
	private player(): TranscriptPlayer {
		return this.players[this.domain];
	}
}