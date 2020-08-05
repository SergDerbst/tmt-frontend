import {Injectable} from "@angular/core";
import {DocumentKeyEventService, KeyAction} from "../../_utils/keyboard/document.key.event.service";
import {KeyCode} from "../../_utils/keyboard/keys";
import {TranscriptPlayer} from "./transcript.player";
import {TranscriptService, TranscriptStatus} from "./transcript.service";

@Injectable()
export class TranscriptKeyActions {
	
	constructor(private documentKeyEventService: DocumentKeyEventService,
	            private transcriptService: TranscriptService) {
	}
	
	prepareActions(transcriptPlayer: TranscriptPlayer) {
		this.transcriptService.setPlayer(transcriptPlayer);
		this.documentKeyEventService.addAction(this.startTranscriptionAction());
		this.documentKeyEventService.addAction(this.beginSnippetAction());
		this.documentKeyEventService.addAction(this.endSnippetAction());
	}
	
	private startTranscriptionAction(): KeyAction {
		return {
			order: {
				[KeyCode.Ctrl]: true,
				[KeyCode.Shift]: true,
				[KeyCode.Space]: true
			},
			action: () => {
				if (this.transcriptService.status === TranscriptStatus.ReadyForTranscription) {
					this.transcriptService.player.startPlayback();
				}
			}
		};
	}
	
	private beginSnippetAction(): KeyAction {
		return {
			order: {
				[KeyCode.Ctrl]: true,
				[KeyCode.Shift]: true,
				[KeyCode.Add]: true
			},
			action: () => {
				if (this.transcriptService.status === TranscriptStatus.ReadyForSnippet) {
					this.transcriptService.beginSnippet();
					this.transcriptService.updateStatus(TranscriptStatus.SnippetTriggered);
				}
			}
		}
	}
	
	private endSnippetAction() {
		return {
			order: {
				[KeyCode.Ctrl]: true,
				[KeyCode.Shift]: true,
				[KeyCode.Enter]: true
			},
			action: () => {
				if (this.transcriptService.status === TranscriptStatus.SnippetTriggered) {
					this.transcriptService.endSnippet();
					this.transcriptService.updateStatus(TranscriptStatus.SnippetEdit);
				}
			}
		}
	}
}