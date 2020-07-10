/**
 * Abstract base class for key-value configurations.
 */
export abstract class KeyValueConfiguration<T> {
	config: { [key: string]: T };
	
	protected constructor() {
		this.config = {};
	}
	
	/**
	 * Sets the configuration. Warning: it will overwrite any given configration.
	 *
	 * @param config
	 */
	setConfiguration(config: { [key: string]: T }): void {
		this.config = config;
	}
	
	/**
	 * Returns the configured value for the given key.
	 *
	 * @param key
	 */
	getParameter(key: string): any {
		return this.config[key];
	}
}