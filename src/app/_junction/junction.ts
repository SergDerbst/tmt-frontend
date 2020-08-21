import {Observable} from "rxjs";

export enum JunctionType {
	Auth = 'auth',
	Data = 'data',
	Error = 'error',
	Logic = 'logic',
	Router = 'router',
	Store = 'store',
}

export interface Juncture<Input, Output> {
	(input?: Input, callback?: (v?: any) => Observable<Output>): Observable<Output>;
}

export interface Junction {
	[key: string]: Juncture<any, any>;
}

export interface AuthJunction extends Junction {}
export interface DataJunction extends Junction {}
export interface ErrorJunction extends Junction {}
export interface LogicJunction extends Junction {}
export interface RouteJunction extends Junction {}
export interface StoreJunction extends Junction {}

export interface JunctionFactory {
	create: (junction?: Junction) => Junction;
}

export interface JunctionProvider<J extends Junction> {
	(junction?: J): J;
}

export abstract class JunctionBox<
	A extends AuthJunction,
	D extends DataJunction,
	E extends ErrorJunction,
	L extends LogicJunction,
	R extends RouteJunction,
	S extends StoreJunction> {
	protected readonly junctions: { [key: string]: Junction };
	
	protected constructor() {
		this.junctions = {};
	}
	
	protected addJunction = (name: string, junction: Junction): void => {
		this.junctions[name] = junction;
	}
	
	protected join = (name: string): Junction => {
		return this.junctions[name];
	}
	
	auth: JunctionProvider<A> = (junction?: A): A => {
		if (junction) {
			this.junctions[JunctionType.Auth] = junction;
		}
		return this.junctions[JunctionType.Auth] as A;
	}
	
	data: JunctionProvider<D> = (junction?: D): D => {
		if (junction) {
			this.junctions[JunctionType.Data] = junction;
		}
		return this.junctions[JunctionType.Data] as D;
	}
	
	error: JunctionProvider<E> = (junction?:E): E => {
		if (junction) {
			this.junctions[JunctionType.Error] = junction;
		}
		return this.junctions[JunctionType.Error] as E;
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
