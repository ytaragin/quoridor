import { QuoridorPage } from './app.po';

describe('quoridor App', () => {
  let page: QuoridorPage;

  beforeEach(() => {
    page = new QuoridorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
