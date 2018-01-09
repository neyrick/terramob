import { TerramobPage } from './app.po';

describe('terramob App', () => {
  let page: TerramobPage;

  beforeEach(() => {
    page = new TerramobPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
