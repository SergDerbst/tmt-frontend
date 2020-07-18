import {User} from "../auth/auth.data";
import {ContentStatus, ContentType} from "../_utils/data/enums";

/**
 * Abstract base class for all content data models.
 */
export abstract class ContentData<Header extends ContentHeader, Metadata extends ContentMetadata> {
	header: Header;
	metadata: Metadata;
	
	protected constructor(config: {
		header: Header;
		metadata: Metadata;
	}) {
		this.header = config.header;
		this.metadata = config.metadata;
	}
}

/**
 * Abstract base class for all content header data models.
 */
export abstract class ContentHeader {
	id: number;
	owner: User;
	createdAt: Date;
	publishedAt: Date;
	status: ContentStatus;
	type: ContentType;
	
	protected constructor(config: {
		id: number;
		owner: User;
		createdAt?: Date;
		publishedAt?: Date;
		status: ContentStatus;
		type: ContentType
	}) {
		this.id = config.id;
		this.owner = config.owner;
		this.createdAt = config.createdAt || new Date();
		this.publishedAt = config.publishedAt || null;
		this.status = config.status;
		this.type = config.type;
	}
}


/**
 * Abstract base class for all content metadata models.
 */
export abstract class ContentMetadata {
	description: string;
	
	protected constructor(config: {
		description: string;
	}) {
		this.description = config.description;
	}
}