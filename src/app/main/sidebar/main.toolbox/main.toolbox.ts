import {Component, OnInit} from "@angular/core";
import {faStream} from "@fortawesome/free-solid-svg-icons/faStream";
import {faPen} from "@fortawesome/free-solid-svg-icons/faPen";
import {faUsers} from "@fortawesome/free-solid-svg-icons/faUsers";
import {faUserFriends} from "@fortawesome/free-solid-svg-icons/faUserFriends";

@Component({
	selector: 'tmt-main-toolbox',
	templateUrl: './main.toolbox.html',
	styleUrls: ['./main.toolbox.scss']
})
export class MainToolbox implements OnInit {
	faStream = faStream;
	faPen = faPen;
	faUserFriends = faUserFriends;
	faUsers = faUsers;
	
	
	constructor() {}
	
	ngOnInit(): void {}
}