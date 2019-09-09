import { DbslitmusPage } from './app.po';

describe('dbslitmus App', () => {
  let page: DbslitmusPage;

  beforeEach(() => {
    page = new DbslitmusPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
