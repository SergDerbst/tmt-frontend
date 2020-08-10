import {Component, Input, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
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
	selector: 'tmt-comment-panel',
	templateUrl: './comment.panel.html',
	styleUrls: ['./comment.panel.scss']
})
export class CommentPanel implements OnInit {
	@Input() snippet: Snippet;
	@Input() formId: string;
	faTrash = faTrash;
	faBold = faBold;
	faItalic = faItalic;
	faUnderline = faUnderline;
	faAlignLeft = faAlignLeft;
	faAlignCenter = faAlignCenter;
	faAlignRight = faAlignRight;
	
	constructor(public translate: TranslateService) {
	}
	
	ngOnInit(): void {
	}
}