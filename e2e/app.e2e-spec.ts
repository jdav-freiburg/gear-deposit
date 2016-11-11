import { GearDeposit2Page } from './app.po';

describe('gear-deposit2 App', function() {
  let page: GearDeposit2Page;

  beforeEach(() => {
    page = new GearDeposit2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
