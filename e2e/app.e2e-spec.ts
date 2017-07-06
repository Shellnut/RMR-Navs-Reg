import { RMRNavsRegPage } from './app.po';

describe('rmr-navs-reg App', () => {
  let page: RMRNavsRegPage;

  beforeEach(() => {
    page = new RMRNavsRegPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
