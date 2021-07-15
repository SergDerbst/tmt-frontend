import {Component, OnInit} from "@angular/core";
import {VideoPatchbay} from "./video.patchbay";

@Component({
	selector: 'tmt-video-container',
	templateUrl: 'video.container.html'
})
export class VideoContainer implements OnInit {
	
	constructor(private readonly pbay: VideoPatchbay) {}
	
	ngOnInit(): void {
	}
}
