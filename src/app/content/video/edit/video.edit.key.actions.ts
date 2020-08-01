import {Injectable} from "@angular/core";
import {DocumentKeyEventService, KeyActionsPreparer} from "../../../_utils/keyboard/document.key.event.service";
import {KeyCode} from "../../../_utils/keyboard/keys";

@Injectable()
export class VideoEditKeyActions extends KeyActionsPreparer {
	
	constructor(protected documentKeyEventService: DocumentKeyEventService) {
		super(documentKeyEventService);
	}
	
	prepareActions() {
		this.documentKeyEventService.addAction({
			[KeyCode.Shift]: true,
			[KeyCode.Ctrl]: true,
		}, () => {
			console.log('arsch brut galore!');
		});
	}
}