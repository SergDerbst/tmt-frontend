import {Injectable} from "@angular/core";
import {DocumentKeyEventService} from "../../../_utils/keyboard/document.key.event.service";
import {KeyCode} from "../../../_utils/keyboard/keys";

@Injectable()
export class VideoEditKeyActions {
	
	constructor(private documentKeyEventService: DocumentKeyEventService) {}
	
	prepareActions() {
		this.documentKeyEventService.addAction({
			[KeyCode.Shift]: true,
			[KeyCode.Ctrl]: true,
		}, () => {
			console.log('arsch brut galore!');
		});
	}
}