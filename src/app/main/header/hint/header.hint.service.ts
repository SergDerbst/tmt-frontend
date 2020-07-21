import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {HintData} from "./header.hint.data";

/**
 * Singleton to manage app hints in the header navbar which ain't no navbar.
 * It's a freakin' hintbar.
 */
@Injectable({
	providedIn: 'root'
})
export class HeaderHintService {
	hintPrefix = 'app.header.hint';
	hint: HintData;
	
	constructor(private router: Router) {
		this.hint = new HintData('.home');
		
		this.router.events.subscribe(value => {
			this.hint.key  = this.hintFromUrl(this.router.url);
		});
	}
	
	/**
	 * Overwrites the actual hint with the given key. The overwritten hint will be reseted
	 * to the previous one after an optional period of given milliseconds or not at all
	 * until the hint is reseted or overwritten again.
	 *
	 * @param key
	 * @param milliseconds
	 */
	overwriteHint(key: string, milliseconds?: number) {
		this.hint.key = key;
		if (milliseconds) {
			let that = this;
			
			setTimeout(function () {
				that.resetHint();
			}, milliseconds);
		}
	}
	
	/**
	 * Extends the actual hint with the given extension. The extension will be reseted
	 * after the the optional milliseconds or not at all until the hint is reseted or
	 * overwritten again.
	 *
	 * @param extension
	 * @param milliseconds
	 */
	extendHint(extension: string, milliseconds?: number) {
		this.overwriteHint(this.hint.key + extension, milliseconds);
	}
	
	/**
	 * Resets the hint according to the actual location path.
	 */
	resetHint() {
		this.hint.key = this.hintFromUrl();
	}
	
	private hintFromUrl(url?: string) {
		url = url || location.pathname;
		if (url === '/') {
			return this.hintPrefix + '.home';
		} else {
			let s = '';
			let array = url.split(/\//g);
			for (let i = 0, len = array.length; i < len; i++) {
				if (isNaN(Number(array[i]))) {
					s = s + array[i];
					if (i != len-1) {
						s = s + '.';
					}
				}
			}
			return this.hintPrefix + '.' + s;
		}
	}
}