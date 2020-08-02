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
				console.log('begin snippet');
			}
		}
	}
}