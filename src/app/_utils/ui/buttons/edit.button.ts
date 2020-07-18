import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {faCheck, faPen} from "@fortawesome/free-solid-svg-icons";

@Component({
	selector: 'tmt-edit-button',
	templateUrl: './edit.button.html',
	styleUrls: ['./edit.button.scss']
})
export class EditButton implements OnInit {
	@Input() editControl: { [key: string]: boolean };
	@Input() controlKey: string;
	@ViewChild('editButton') editButton;
	faCheck = faCheck;
	faPen = faPen;
	
	ngOnInit(): void {
	}
	
	toggleEdit() {
		this.editControl[this.controlKey] = !this.editControl[this.controlKey];
		this.editButton.nativeElement.blur();
	}
}