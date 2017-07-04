import { TradingBookAppPage } from './app.po';

describe('trading-book-app App', () => {
  let page: TradingBookAppPage;

  beforeEach(() => {
    page = new TradingBookAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
