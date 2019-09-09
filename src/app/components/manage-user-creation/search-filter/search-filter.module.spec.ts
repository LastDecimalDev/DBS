import { SearchFilterModule } from './search-filter.module';

describe('SearchFilterModule', () => {
  let searchFilterModule: SearchFilterModule;

  beforeEach(() => {
    searchFilterModule = new SearchFilterModule();
  });

  it('should create an instance', () => {
    expect(searchFilterModule).toBeTruthy();
  });
});
