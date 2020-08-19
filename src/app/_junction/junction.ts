import {Observable} from "rxjs";
import {Router} from "@angular/router";

export enum JunctionType {
	Data = 'data',
	Logic = 'logic',
	Router = 'router',
	Store = 'store',
}

export interface Juncture<Input, Output> {
	(input?: Input): Observable<Output>;
}

export interface Junction {
	[key: string]: Juncture<any, any>;
}

export interface JunctionProvider<J extends Junction> {
	(junction?: J): J;
}

export abstract class JunctionBox<
	D extends Junction,
	L extends Junction,
	R extends Junction,
	S extends Junction> {
	private readonly junctions: { [key: string]: Junction };
	
	protected constructor() {
		this.junctions = {};
	}
	
	protected addJunction = (name: string, junction: Junction): void => {
		this.junctions[name] = junction;
	}
	
	protected join = (name: string): Junction => {
		return this.junctions[name];
	}
	
	data: JunctionProvider<D> = (junction?: D): D => {
		if (junction) {
			this.junctions[JunctionType.Data] = junction;
		}
		return this.junctions[JunctionType.Data] as D;
	}
	
	logic: JunctionProvider<L> = (junction?: L): L => {
		if (junction) {
			this.junctions[JunctionType.Logic] = junction;
		}
		return this.junctions[JunctionType.Logic] as L;
	}
	
	route: JunctionProvider<R> = (junction?: R): R => {
		if (junction) {
			this.junctions[JunctionType.Router] = junction;
		}
		return this.junctions[JunctionType.Router] as R;
	}
	
	store: JunctionProvider<S> = (junction?: S): S => {
		if (junction) {
			this.junctions[JunctionType.Store] = junction;
		}
		return this.junctions[JunctionType.Store] as S;
	}
}
