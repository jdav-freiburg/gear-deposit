import { GearDepositPage } from './app.po';

describe('gear-deposit App', function () {
    let page: GearDepositPage;

    beforeEach(() => {
        page = new GearDepositPage();
    });

    it('should have startpage link "Depot"', () => {
        page.navigateTo();
        expect(page.getStartpageLink()).not.toBeNull();
        expect(page.getStartpageLink().getText()).toEqual('Depot');
    });
});
