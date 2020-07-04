import { createHttpFactory, HttpMethod } from '@ngneat/spectator';
import { SpectatorHttp } from "@ngneat/spectator/public_api";
import { CountryDataService } from './country.data.service';
import {AppConfigService} from "../../../../../app.config.service";

describe('CountryDataService', () => {
	let spectator: SpectatorHttp<CountryDataService>;
	const createHttp = createHttpFactory({
		service: CountryDataService,
		providers: [
			AppConfigService
		]
	});
	
	beforeEach(() => spectator = createHttp());
	
	it('should get country data', () => {
		spectator.service.fetch('rubbish').subscribe();
		spectator.expectOne('http://localhost:8080/geo/country/names?typed=rubbish', HttpMethod.GET);
	});
});