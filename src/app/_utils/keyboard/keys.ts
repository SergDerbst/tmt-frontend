export function isArrow(code:number):boolean {
	return code === KeyCode.LeftArrow || code === KeyCode.RightArrow ||
				 code === KeyCode.DownArrow || code === KeyCode.UpArrow;
}

export function isArrowLeftRight(code:number):boolean {
	return code === KeyCode.LeftArrow || code === KeyCode.RightArrow;
}

export function isArrowUpDown(code:number):boolean {
	return code === KeyCode.UpArrow || code === KeyCode.DownArrow;
}

export function isBackspace(code:number):boolean {
	return code === KeyCode.Backspace;
}

export function isCharacter(code: number):boolean {
	return code >= KeyCode.A && code <= KeyCode.Z;
}

export function isDelete(code:number):boolean {
	return code === KeyCode.Delete;
}

export function isEnter(code:number):boolean {
	return code === KeyCode.Enter;
}

export function isEsc(code:number):boolean {
	return code === KeyCode.Escape;
}

export function isLiteral(code: number):boolean {
	return (code >= KeyCode.A && code <= KeyCode.Z) ||
				 code === KeyCode.Shift ||
				 code === KeyCode.Backspace ||
				 code === KeyCode.Delete
}

export function isNumeric(code: number):boolean {
	return (code >= KeyCode.Zero && code <= KeyCode.Nine) ||
				 (code >= KeyCode.NumpadZero && code <= KeyCode.NumpadNine);
}

export enum Key {

}

export enum KeyCode {
	Backspace = 8,
	Tab = 9,
	Enter = 13,
	Shift = 16,
	Ctrl = 17,
	Alt = 18,
	Pause = 19,
	CapsLock = 20,
	Escape= 27,
	Space = 32,
	PageUp = 33,
	PageDown = 34,
	End = 35,
	Home = 36,
	LeftArrow = 37,
	UpArrow = 38,
	RightArrow = 39,
	DownArrow = 40,
	Insert = 45,
	Delete = 46,
	Zero = 48,
	One = 49,
	Two = 50,
	Three = 51,
	Four = 52,
	Five = 53,
	Six =  54,
	Seven = 55,
	Eight = 56,
	Nine = 57,
	A = 65,
	B =66,
	C = 67,
	D = 68,
	E = 69,
	F = 70,
	G = 71,
	H= 72,
	I = 73,
	J = 74,
	K = 75,
	L = 76,
	M = 77,
	N = 78,
	O = 79,
	P = 80,
	Q = 81,
	R = 82,
	S = 83,
	T = 84,
	U = 85,
	V = 86,
	W = 87,
	X = 88,
	Y = 89,
	Z = 90,
	LeftWindow = 91,
	RightWindow = 92,
	NumpadZero = 96,
	NumpadOne = 97,
	NumpadTwo = 98,
	NumpadThree = 99,
	NumpadFour = 100,
	NumpadFive = 101,
	NumpadSix = 102,
	NumpadSeven = 103,
	NumpadEight = 104,
	NumpadNine = 105,
	Multiply = 106,
	Add = 107,
	Subtract = 109,
	DecimalPoint = 110,
	Divide = 111,
	F1 = 112,
	F2 = 113,
	F3 = 114,
	F4 = 115,
	F5 = 116,
	F6 = 117,
	F7 = 118,
	F8 = 119,
	F9 = 120,
	F10 = 121,
	F11 = 122,
	F12 = 123,
	NumLock = 144,
	ScrollLock = 145,
	SemiColon = 186,
	PlusSign = 187,
	Comma = 188,
	Dash = 189,
	Period = 190,
	ForwardSlash = 191,
	GraveAccent = 192,
	OpenBracket = 219,
	BackSlash = 220,
	CloseBracket = 221,
	SingleQuote = 222
}