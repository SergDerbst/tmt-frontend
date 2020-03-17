import {Component, OnInit} from "@angular/core";
import {faPen} from "@fortawesome/free-solid-svg-icons/faPen";

@Component({
	selector: 'tmt-main-toolbox',
	templateUrl: './main.toolbox.html',
	styleUrls: ['./main.toolbox.scss']
})
export class MainToolbox implements OnInit {
	faPen = faPen;
	
	constructor() {}
	
	ngOnInit(): void {}
}