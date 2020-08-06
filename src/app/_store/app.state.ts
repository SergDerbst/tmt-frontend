/**
 * Rootstate of the whole TMT app.
 */
export interface AppState {
	readonly headerState: HeaderState;
	readonly footerState: FooterState;
	readonly securityState: SecurityState;
}

/**
 * Global state for everything authentication, etc.
 */
export interface SecurityState {

}

/**
 * Base state for the ever visible application header.
 */
export interface HeaderState {
	/**
	 * Message key, normally created from the path of the current router url.
	 */
	readonly globalHintMsgKey: string;
}

/**
 * Base state for the ever visible application footer.
 */
export interface FooterState {

}

/**
 * Base state for the ever visible content.
 */
export interface ContentState {

}