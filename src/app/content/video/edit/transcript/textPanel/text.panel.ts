import {Component, Input, OnInit} from "@angular/core";
import {Snippet} from "../transcript.data";
import {
	faAlignCenter,
	faAlignLeft,
	faAlignRight,
	faBold,
	faItalic,
	faTrash,
	faUnderline
} from "@fortawesome/free-solid-svg-icons";

@Component({
	selector: 'tmt-text-panel',
	templateUrl: './text.panel.html',
	styleUrls: ['./text.panel.scss']
})
export class TextPanel implements OnInit {
	@Input() snippet: Snippet;
	@Input() formId: string;
	
	faTrash = faTrash;
	faBold = faBold;
	faItalic = faItalic;
	faUnderline = faUnderline;
	faAlignLeft = faAlignLeft;
	faAlignCenter = faAlignCenter;
	faAlignRight = faAlignRight;
	
	constructor() {}
	
	ngOnInit(): void {
	
	}
}