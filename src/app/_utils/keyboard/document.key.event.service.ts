import {Injectable, OnDestroy, OnInit} from "@angular/core";

/**
 * The action mapping from keys to action.
 */
export class KeyAction {
	order: { [key: number]: boolean };
	action: () => void;
	
	constructor(action: {
		order: { [key: number]: boolean }, action: () => void
	}) {
		this.order = action.order;
		this.action = action.action;
	}
}

/**
 * Holds an action or handler of a specific order, a combination of pressed keys,
 * that will be executed when the expected keys have been currently pressed.
 *
 * The whole thing works like a sad version of chain of responsiblity.
 */
export class KeysDownAction {
	private readonly orderKeys: string[];
	private readonly orderLength: number;
	readonly execute: () => void;
	
	constructor(order: { [key: number]: boolean }, execute: () => void) {
		this.orderKeys = Object.keys(order);
		this.orderLength = this.orderKeys.length;
		this.execute = execute;
	}
	
	/**
	 * Checks if the action to be executed was ordered (if all currently pressed
	 * keys match the keys of the expected order).
	 *
	 * @param keysDown
	 */
	isOrdered(keysDown: { [key: number]: boolean }):boolean {
		let ordered = true;
		for (let i = 0, len = this.orderKeys.length; i < len; i++) {
			if (keysDown[this.orderKeys[i]] !== true) {
				ordered = false;
			}
		}
		return ordered;
	}
}

/**
 * Service for handling global key events as shortcuts. Since the keydown
 * and keyup event handlers are attached to the document, it must be used
 * with care. Other elements that react on key events must prevent default
 * and stop propagation of the events to prevent unwanted behavior.
 *
 * The event handlers are being removed from the document element when this
 * service is destroyed.
 */
@Injectable()
export class DocumentKeyEventService implements OnDestroy {
	private readonly keysDown: { [key: string]: boolean };
	private readonly actions: KeysDownAction[];
	
	constructor() {
		this.keysDown = {};
		this.actions = [];
		document.addEventListener('keydown', this.keyDown());
		document.addEventListener('keyup', this.keyUp());
	}
	
	addAction(action: KeyAction) {
		this.actions.push(new KeysDownAction(action.order, action.action));
	}
	
	ngOnDestroy(): void {
		document.removeEventListener('keydown', this.keyDown());
		document.removeEventListener('keyup', this.keyUp());
	}
	
	private checkOrder(order: { [key: number]: boolean}) {
		for (let i = 0, len = this.actions.length; i < len; i++) {
			let action = this.actions[i];
			if (action.isOrdered(order)) {
				action.execute();
			}
		}
	}
	
	private keyDown(): (event: KeyboardEvent)=>void {
		let that = this;
		return (event: KeyboardEvent) => {
			that.keysDown[event.keyCode] = true;
			that.checkOrder(that.keysDown);
		};
	}
	
	private keyUp(): (event: KeyboardEvent)=>void {
		let that = this;
		return (event: KeyboardEvent) => {
			that.keysDown[event.keyCode] = false;
		};
	}
}
