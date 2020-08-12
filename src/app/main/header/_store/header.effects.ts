import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Store} from "@ngrx/store";
import {AppState} from "../../../_store/state/app.state";
import {FlashHintAction, HeaderActionTypes, UpdateHintFromUrlAction} from "./header.actions";
import {map, switchMap, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {globalHintFlashingTime} from "./header.state";
import {of} from "rxjs";
import {DoNothingAction} from "../../../_store/actions/app.actions";

@Injectable()
export class HeaderEffects {
	
	constructor(private actions$: Actions,
	            private router: Router,
	            private store: Store) {}
	
	@Effect()
	flashHint = this.actions$.pipe(
		ofType<FlashHintAction>(HeaderActionTypes.FlashHint),
		map(action => action.payload),
		// @ts-ignore
		switchMap((payload) => {
			setTimeout(() => {
				this.store.dispatch(new UpdateHintFromUrlAction( { url: this.router.url }));
			}, payload.milliseconds || globalHintFlashingTime);
			return of(new DoNothingAction());
		})
	);
}